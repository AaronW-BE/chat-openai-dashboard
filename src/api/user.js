import {GET} from "./index";

export const UserList = () => GET("/dashboard/user");

export const UserChatList = (uid) => GET("/dashboard/user/:id/chat", {id: uid});