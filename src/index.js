/* eslint-disable no-undef */
import { userBackup } from "./services/services.js";
import inquirer from "inquirer";
import dotenv from "dotenv";
import { userDatabase } from "./db/userDatabase.js";
dotenv.config();

// database config:
userDatabase.createTable();

// cli menu:
const cliMenu = [
  {
    name: "Backup V2ray Users",
    value: "backup",
  },
  {
    name: "Restore V2ray Users",
    value: "restore",
  },
];

if (
  process.env.COOKIE === "" ||
  process.env.SERVER === "" ||
  process.env.PORT === ""
) {
  console.log("Please set all .env value");
} else {
  inquirer
    .prompt([
      {
        type: "list",
        name: "selected",
        message: "Select a Option?",
        choices: cliMenu,
      },
    ])
    .then((answers) => {
      console.clear();

      const { selected } = answers;
      switch (selected) {
        case "backup":
          userBackup();
          break;

        case "restore":
          dataBase();
          break;

        default:
          break;
      }
    });
}
