import API from "../api/config.js";
import { endPoint } from "../api/endpoints.js";
import { userDatabase } from "../db/userDatabase.js";

export const userBackup = () => {
  API.post(endPoint.userList)
    .then((res) => {
      let data = res.data.obj;
      data?.map((item) => {
        userDatabase.insertUser(item);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
