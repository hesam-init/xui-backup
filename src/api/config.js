/* eslint-disable no-undef */
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const URL = `http://${process.env.SERVER}:${process.env.PORT}`;
const COOKIE = process.env.COOKIE;

const API = axios.create({
  baseURL: URL,
  headers: { Cookie: COOKIE },
});

export default API;
