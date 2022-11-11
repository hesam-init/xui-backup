/* eslint-disable no-undef */
import { addUser, userBackup } from "./services/services.js";
import { userDatabase } from "./db/userDatabase.js";
import inquirer from "inquirer";
import dotenv from "dotenv";
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
  {
    name: "Database Check",
    value: "db",
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
      process.stdout.write("\x1Bc");

      const { selected } = answers;
      switch (selected) {
        case "backup":
          userBackup();
          break;

        case "restore":
          addUser();
          break;

        case "db":
          userDatabase.getUsers();
          break;

        default:
          break;
      }
    });
}
