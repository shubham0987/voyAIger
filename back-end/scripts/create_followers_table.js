require("dotenv").config();
const { sequelize } = require("../models");

async function run() {
  try {
    console.log("Authenticating DB...");
    await sequelize.authenticate();
    console.log(
      "DB authenticated. Running sync({ alter: true }) to create/alter tables..."
    );

    // alter:true will create the table if missing and attempt to make schema changes safely
    await sequelize.sync({ alter: true });

    console.log("Sequelize sync completed. followers table should now exist.");
    process.exit(0);
  } catch (err) {
    console.error("Error during DB sync:", err);
    process.exit(1);
  }
}

run();
