const tls = require("tls");
const fs = require("fs");

const host = process.env.PG_HOST || "voyaiger-voyaiger.f.aivencloud.com";
const port = parseInt(process.env.PG_PORT || "28475", 10);

const socket = tls.connect({ host, port, rejectUnauthorized: false }, () => {
  console.log("connected to", host, port);
  const cert = socket.getPeerCertificate(true);
  console.log("peer certificate:");
  console.log(" subject:", cert.subject);
  console.log(" issuer:", cert.issuer);
  if (cert.raw) {
    console.log(" raw length:", cert.raw.length);
  }
  if (cert.issuerCertificate) {
    console.log(" issuerCertificate subject:", cert.issuerCertificate.subject);
  }
  socket.end();
});

socket.on("error", (err) => {
  console.error("TLS error:", err.message);
  process.exit(1);
});
