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

export const addUser = () => {
  API.post(endPoint.addUser, {
    up: 0,
    down: 0,
    total: 0,
    remark: "test10",
    enable: true,
    expiryTime: 0,
    listen: "",
    port: 39992,
    protocol: "vmess",
    settings: {
      clients: [
        {
          id: "1b239d27-a261-4479-ecd7-8907abc81854",
          alterId: 0,
        },
      ],
      disableInsecureEncryption: false,
    },
    streamSettings: {
      network: "ws",
      security: "none",
      wsSettings: {
        path: "/",
        headers: {},
      },
    },
    sniffing: {
      enabled: false,
      destOverride: ["http", "tls"],
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
