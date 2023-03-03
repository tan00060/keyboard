const config = {
  user: "user",
  password: "user",
  port: 1433,
  server: "MING",
  database: "keyboards",
  options: {
    trustServerCertificate: true, // change to true for local dev / self-signed certs
    // trustedConnection: true,
  },
};

module.exports = config;
