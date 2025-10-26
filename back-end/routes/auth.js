const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { User } = require("../models");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

function signToken(user) {
  // Sequelize uses `id` as primary key
  return jwt.sign({ userid: user.userid }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const existing = await User.findOne({ where: { email } });
    if (existing)
      return res.status(409).json({ error: "Email already registered" });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const userid = uuidv4();
    const user = await User.create({ email, password: hash, name, userid });

    const token = signToken(user);

    res.json({
      token,
      user: { id: userid, name: user.name },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to initiate Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/auth/google/failure",
  }),
  (req, res) => {
    // Successful authentication; generate JWT and redirect or respond
    const token = signToken(req.user);
    // If a frontend is set, redirect with token as query param
    const redirectTo = `${FRONTEND_URL}?token=${token}&user_name=${req.user.name}`;
    // For API clients, prefer JSON when `?raw=1` is set
    if (req.query.raw === "1") {
      return res.json({
        token,
        user: { id: req.user.userid, name: req.user.name },
      });
    }
    res.redirect(redirectTo);
  }
);

router.get("/google/failure", (req, res) => {
  res.status(401).json({ error: "Google authentication failed" });
});

// POST /api/auth/login (email/password)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const user = await User.findOne({ where: { email } });
    if (!user || !user.password)
      return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = signToken(user);
    res.json({
      token,
      user: { id: user.userid, name: user.name },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
