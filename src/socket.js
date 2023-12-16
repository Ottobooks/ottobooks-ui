import { io } from "socket.io-client";

const URL = "https://ottobooks-api.azurewebsites.net";

export const socket = io(URL);
