import {POST} from "./index";

export const Login = (username, password) => POST("/account/login", {}, {username, password})
