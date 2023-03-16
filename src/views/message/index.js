import React from "react";
import {Table} from "antd";
import {columns, datasource} from "./table/messageTable";
import {useLoaderData} from "react-router-dom";


function Message () {
  let msg = useLoaderData();
  return (
    <div>
      <div>
        <Table dataSource={msg} columns={columns} />
      </div>
    </div>
  )
}

Message.loader = function () {
  return new Promise(resolve => {
    resolve(datasource());
  })
};

export default Message;