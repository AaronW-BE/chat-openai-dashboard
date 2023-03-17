import {POST} from "./index";

export const Login = (username, password) => POST("/dashboard/account/login", {}, {username, password})

export const ResetPwd = () => POST('/dashboard/account/pwd-reset', {}, {});
