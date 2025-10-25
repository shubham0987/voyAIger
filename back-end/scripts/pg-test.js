require("dotenv").config({ path: __dirname + "/../.env" });
const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

const connection =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
console.log("Using connection:", connection.replace(/:.+@/, ":*****@"));

const caPath = process.env.PG_CA_PATH
  ? path.resolve(__dirname, "..", process.env.PG_CA_PATH)
  : path.resolve(__dirname, "..", "certs", "ca.pem");
let ssl = { rejectUnauthorized: false };
if (fs.existsSync(caPath)) {
  ssl = { ca: fs.readFileSync(caPath), rejectUnauthorized: false };
  console.log("Using CA from", caPath);
}

const client = new Client({ connectionString: connection, ssl });

client
  .connect()
  .then(() => {
    console.log("Connected OK");
    return client.end();
  })
  .catch((err) => {
    console.error("pg client connect error:", err);
    process.exit(1);
  });
