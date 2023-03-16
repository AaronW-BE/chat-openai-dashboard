import {Table} from "antd";
import {columns} from "./table/userTable";
import {useLoaderData} from "react-router-dom";
import {UserList} from "../../api/user";

function User() {
  const users = useLoaderData();
  return (
    <div>
      <Table dataSource={users} columns={columns} rowKey="_id"/>
    </div>
  )
}

User.loader = ({request}) => {
  const url = new URL(request.url);
  let page = url.searchParams.get("page");
  console.log(page);
  return new Promise(resolve => {
    UserList().then(result => {
      resolve(result);
    })
  })
};

export default User;