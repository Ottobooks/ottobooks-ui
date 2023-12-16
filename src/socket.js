import { io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production"
    ? undefined
    : "https://ottobooks-api.azurewebsites.net";

export const socket = io(URL);
