import {UserList} from "../../../api/user";
import {Button, Space} from "antd";
import {Link} from "react-router-dom";

export const columns = [
  {
    title: "昵称",
    dataIndex: "nickname",
    key: 'nickname'
  },
  {
    title: "来源平台",
    dataIndex: "originFrom",
    key: 'originFrom'
  },
  {
    title: "最近活动时间",
    dataIndex: "lastActiveAt",
    key: 'lastActiveAt'
  },
  {
    title: "注册时间",
    dataIndex: "createAt",
    key: 'createAt'
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space size='middle'>
        <Link to={`${record._id}`}>详情</Link>
      </Space>
    )
  }
];


export const datasource = () => {
  return UserList();
}