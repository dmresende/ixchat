import axios from "axios";

export const api = axios.create({
  //todo - colocar link prod api primero
  baseURL:
    process.env.NODE_ENV === "production"
      ? "http://localhost:3000/" //IN PRODUCTION
      : "http://localhost:3333/",
});
