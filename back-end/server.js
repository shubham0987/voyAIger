require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const fs = require("fs");
const path = require("path");

// IMPORTANT: If strict verification still fails due to provider certificate chains,
// you can temporarily disable Node's TLS verification by setting
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'. This is insecure and should only
// be used for development or while troubleshooting. We'll set it only if
// PG_TLS_INSECURE env var is set to 'true'.
//
// If you prefer not to use this, ensure the CA file is the correct bundle from the provider.
if (process.env.PG_TLS_INSECURE === "true") {
  console.warn("Warning: TLS verification is disabled (PG_TLS_INSECURE=true)");
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

// If a CA file is present, tell Node to use it for TLS verification before requiring DB libs
const caEnvPath = process.env.PG_CA_PATH;
const defaultCaPath = path.resolve(__dirname, "certs", "ca.pem");
const resolvedCaPath = caEnvPath
  ? path.resolve(__dirname, caEnvPath)
  : defaultCaPath;
if (resolvedCaPath && fs.existsSync(resolvedCaPath)) {
  // NODE_EXTRA_CA_CERTS must be set before loading native TLS modules
  process.env.NODE_EXTRA_CA_CERTS = resolvedCaPath;
  console.log("Using CA certificate for TLS from:", resolvedCaPath);
}

// initialize Sequelize and models (after NODE_EXTRA_CA_CERTS is set)
const { sequelize } = require("./models");

// load passport strategies (they require the models)
require("./config/passport");

const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use(passport.initialize());

app.get("/", (req, res) => {
  res.json({ ok: true, message: "voyAIger backend running" });
});

app.use("/api/auth", authRoutes);

// Connect to Postgres via Sequelize
async function start() {
  try {
    await sequelize.authenticate();
    console.log("Connected to Postgres via Sequelize");
    // Sync models (in production you may want migrations instead)
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Database connection error:", err.message);
    process.exit(1);
  }
}

start();
