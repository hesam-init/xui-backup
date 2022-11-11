import sqlite3 from "sqlite3";
import bytes from "bytes";
import { userTable } from "./tables.js";
const db = new sqlite3.Database("database.db");

const jsonTable = (json) => {
  return JSON.stringify(json)
    .replaceAll(`"`, "")
    .replaceAll(":", " ")
    .replaceAll("{", "")
    .replaceAll("}", "");
};

const generateValue = (count) => {
  let values = new Array(count)
    .fill(null)
    .map(() => "?")
    .join(",");

  return values;
};

export class userDatabase {
  // create table:
  static createTable() {
    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS UsersList (${jsonTable(userTable)})`);
    });
  }

  // insert data:
  static insertUser(data) {
    const sql = `
    INSERT INTO UsersList(id,down,enable,expiryTime,listen,port,protocol,remark,settings,sniffing,streamSettings,tag,total,up)
    VALUES (${generateValue(14)})
    `;

    db.run(
      sql,
      [
        data.id,
        data.down,
        data.enable,
        data.expiryTime,
        data.listen,
        data.port,
        data.protocol,
        data.remark,
        data.settings,
        data.sniffing,
        data.streamSettings,
        data.tag,
        data.total,
        data.up,
      ],
      (err) => {
        if (!err) {
          console.log(`user added`);
        }
      }
    );
  }

  // get all data:
  static getUsers() {
    db.all("SELECT * FROM UsersList", (err, rows) => {
      if (rows.length > 1) {
        rows.forEach((row) => {
          console.log(
            `${row.id}: ${row.remark} ${bytes(row.up + row.down)} used`
          );
        });
      } else {
        console.log("No data in table");
      }
    });
  }
}
