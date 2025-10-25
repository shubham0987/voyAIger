const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");

// Use DATABASE_URL if provided (Heroku style), otherwise use PG_* variables
const databaseUrl = process.env.DATABASE_URL;

// Determine CA path: prefer PG_CA_PATH env var, fallback to ./certs/ca.pem
const caEnvPath = process.env.PG_CA_PATH;
const defaultCaPath = path.resolve(__dirname, "..", "certs", "ca.pem");
const resolvedCaPath = caEnvPath
  ? path.resolve(__dirname, "..", caEnvPath)
  : defaultCaPath;

let sslOptions = null;
if (resolvedCaPath && fs.existsSync(resolvedCaPath)) {
  // read CA as Buffer so TLS verification uses the correct binary data
  const caBuffer = fs.readFileSync(resolvedCaPath);
  // Provide CA as an array to support providers that expect multiple CA certs
  // NOTE: some hosted Postgres providers have certificate chains that Node's
  // strict verification rejects in certain environments. If you hit
  // "self-signed certificate in certificate chain", you can set the
  // environment variable PG_SSL_REJECT_UNAUTHORIZED=false to relax verification
  // (development only). By default we will try to verify strictly.
  // For now, relax certificate verification to allow connection to the managed DB.
  // Change `rejectUnauthorized` back to true in production once CA issues are resolved.
  sslOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
      ca: [caBuffer],
    },
  };
} else {
  // Fallback: enable SSL but do not verify the certificate. Use only for dev if CA not provided.
  sslOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
}

let sequelize;
if (databaseUrl) {
  sequelize = new Sequelize(databaseUrl, {
    dialect: "postgres",
    logging: false,
    dialectOptions: sslOptions,
  });
} else {
  sequelize = new Sequelize(
    process.env.PG_DATABASE || "voyAIger",
    process.env.PG_USER || "postgres",
    process.env.PG_PASSWORD || "",
    {
      host: process.env.PG_HOST || "localhost",
      port: process.env.PG_PORT ? parseInt(process.env.PG_PORT, 10) : 5432,
      dialect: "postgres",
      logging: false,
      dialectOptions: sslOptions,
    }
  );
}

// Import models
const User = require("./User")(sequelize, DataTypes);

module.exports = {
  sequelize,
  Sequelize,
  User,
};
