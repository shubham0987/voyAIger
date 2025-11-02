const express = require("express");
const jwt = require("jsonwebtoken");
const { User, Follower, sequelize } = require("../models");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";

// Simple JWT auth middleware: expects Authorization: Bearer <token>
async function authenticateToken(req, res, next) {
  const auth = req.headers.authorization || req.query.token;
  if (!auth) return res.status(401).json({ error: "Unauthorized" });

  let token = null;
  if (auth.startsWith("Bearer ")) token = auth.slice(7);
  else token = auth;

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (!payload || !payload.userid)
      return res.status(401).json({ error: "Invalid token" });
    const user = await User.findOne({ where: { userid: payload.userid } });
    if (!user) return res.status(401).json({ error: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

// POST /api/follows/:targetUserid  -> follow the user identified by targetUserid (uuid)
router.post("/:targetUserid", authenticateToken, async (req, res) => {
  try {
    const target = await User.findOne({
      where: { userid: req.params.targetUserid },
    });
    if (!target)
      return res.status(404).json({ error: "Target user not found" });
    if (target.id === req.user.id)
      return res.status(400).json({ error: "Cannot follow yourself" });

    // upsert: create if not exists
    const [rec, created] = await Follower.findOrCreate({
      where: { follower_id: req.user.id, following_id: target.id },
      defaults: { follower_id: req.user.id, following_id: target.id },
    });

    res.json({ ok: true, created: created });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /api/follows/:targetUserid -> unfollow
router.delete("/:targetUserid", authenticateToken, async (req, res) => {
  try {
    const target = await User.findOne({
      where: { userid: req.params.targetUserid },
    });
    if (!target)
      return res.status(404).json({ error: "Target user not found" });
    const deleted = await Follower.destroy({
      where: { follower_id: req.user.id, following_id: target.id },
    });
    res.json({ ok: true, deleted: deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Helper: resolve a user by public uuid or 404
async function resolveUserOr404(uuid, res) {
  const u = await User.findOne({ where: { userid: uuid } });
  if (!u) {
    res.status(404).json({ error: "User not found" });
    return null;
  }
  return u;
}

// GET /api/follows/:userid/followers -> list followers of userid (by uuid)
// Supports cursor-based pagination via ?limit=<n>&cursor=<last_seen_follower_id>
router.get("/:userid/followers", async (req, res) => {
  try {
    const target = await resolveUserOr404(req.params.userid, res);
    if (!target) return;

    const limit = Math.min(parseInt(req.query.limit || 50, 10), 200);
    const cursor = req.query.cursor ? parseInt(req.query.cursor, 10) : null;

    // Fetch one extra row to know if there's a next page
    const replacements = { id: target.id, limit: limit + 1 };
    let cursorSql = "";
    if (cursor) {
      cursorSql = "AND f.id < :cursor";
      replacements.cursor = cursor;
    }

    const rows = await sequelize.query(
      `SELECT f.id as fid, u.userid, u.name
       FROM followers f
       JOIN users u ON u.id = f.follower_id
       WHERE f.following_id = :id ${cursorSql}
       ORDER BY f.id DESC
       LIMIT :limit`,
      {
        replacements,
        type: sequelize.QueryTypes.SELECT,
      }
    );

    let nextCursor = null;
    let resultRows = rows;
    if (rows.length > limit) {
      // there is more data; trim the extra row and set next cursor
      resultRows = rows.slice(0, limit);
      nextCursor = resultRows[resultRows.length - 1].fid;
    }

    res.json({
      ok: true,
      count: resultRows.length,
      rows: resultRows,
      nextCursor,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/follows/:userid/following -> list who userid is following
// Supports cursor-based pagination via ?limit=<n>&cursor=<last_seen_follow_id>
router.get("/:userid/following", async (req, res) => {
  try {
    const target = await resolveUserOr404(req.params.userid, res);
    if (!target) return;

    const limit = Math.min(parseInt(req.query.limit || 50, 10), 200);
    const cursor = req.query.cursor ? parseInt(req.query.cursor, 10) : null;

    const replacements = { id: target.id, limit: limit + 1 };
    let cursorSql = "";
    if (cursor) {
      cursorSql = "AND f.id < :cursor";
      replacements.cursor = cursor;
    }

    const rows = await sequelize.query(
      `SELECT f.id as fid, u.userid, u.name
       FROM followers f
       JOIN users u ON u.id = f.following_id
       WHERE f.follower_id = :id ${cursorSql}
       ORDER BY f.id DESC
       LIMIT :limit`,
      {
        replacements,
        type: sequelize.QueryTypes.SELECT,
      }
    );

    let nextCursor = null;
    let resultRows = rows;
    if (rows.length > limit) {
      resultRows = rows.slice(0, limit);
      nextCursor = resultRows[resultRows.length - 1].fid;
    }

    res.json({
      ok: true,
      count: resultRows.length,
      rows: resultRows,
      nextCursor,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/follows/:userid/followers/count -> total number of followers
router.get("/:userid/followers/count", async (req, res) => {
  try {
    const target = await resolveUserOr404(req.params.userid, res);
    if (!target) return;
    const rows = await sequelize.query(
      `SELECT COUNT(*)::int as count FROM followers WHERE following_id = :id`,
      {
        replacements: { id: target.id },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    res.json({ ok: true, count: rows[0].count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/follows/:userid/following/count -> total number user is following
router.get("/:userid/following/count", async (req, res) => {
  try {
    const target = await resolveUserOr404(req.params.userid, res);
    if (!target) return;
    const rows = await sequelize.query(
      `SELECT COUNT(*)::int as count FROM followers WHERE follower_id = :id`,
      {
        replacements: { id: target.id },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    res.json({ ok: true, count: rows[0].count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/follows/:userid/mutual/:otherUserid -> true if both follow each other
router.get("/:userid/mutual/:otherUserid", async (req, res) => {
  try {
    const a = await resolveUserOr404(req.params.userid, res);
    if (!a) return;
    const b = await resolveUserOr404(req.params.otherUserid, res);
    if (!b) return;

    const rows = await sequelize.query(
      `SELECT
         SUM(CASE WHEN follower_id = :a_id AND following_id = :b_id THEN 1 ELSE 0 END) as a_follows_b,
         SUM(CASE WHEN follower_id = :b_id AND following_id = :a_id THEN 1 ELSE 0 END) as b_follows_a
       FROM followers
       WHERE (follower_id = :a_id AND following_id = :b_id) OR (follower_id = :b_id AND following_id = :a_id)`,
      {
        replacements: { a_id: a.id, b_id: b.id },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    const r = rows[0] || { a_follows_b: 0, b_follows_a: 0 };
    const mutual =
      parseInt(r.a_follows_b || 0, 10) > 0 &&
      parseInt(r.b_follows_a || 0, 10) > 0;
    res.json({ ok: true, mutual });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/follows/graph/:userid?depth=2 -> return reachable users following graph up to depth
// Uses a recursive CTE to traverse the follow edges in the direction: follower -> following
router.get("/graph/:userid", async (req, res) => {
  try {
    const start = await User.findOne({ where: { userid: req.params.userid } });
    if (!start) return res.status(404).json({ error: "User not found" });
    const maxDepth = Math.min(parseInt(req.query.depth || "2", 10), 5);

    // Recursive CTE: start from users that 'start' follows and walk forward
    const sql = `
      WITH RECURSIVE reach(depth, user_id, path) AS (
        SELECT 1 as depth, f.following_id as user_id, ARRAY[f.follower_id, f.following_id] as path
        FROM followers f
        WHERE f.follower_id = :startId
        UNION ALL
        SELECT r.depth + 1, f.following_id as user_id, r.path || f.following_id
        FROM followers f
        JOIN reach r ON f.follower_id = r.user_id
        WHERE r.depth < :maxDepth AND NOT f.following_id = ANY(r.path)
      )
      SELECT DISTINCT u.userid, u.name, r.depth
      FROM reach r
      JOIN users u ON u.id = r.user_id
      ORDER BY r.depth, u.name
      LIMIT :limit
    `;

    const rows = await sequelize.query(sql, {
      replacements: {
        startId: start.id,
        maxDepth,
        limit: parseInt(req.query.limit || 200, 10),
      },
      type: sequelize.QueryTypes.SELECT,
    });

    res.json({ ok: true, start: start.userid, count: rows.length, rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
