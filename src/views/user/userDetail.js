import React, {useEffect, useState} from "react";
import {Link, useLoaderData, useParams} from "react-router-dom";
import {UserChatList} from "../../api/user";
import './userDetail.css';
import dayjs from "dayjs";

function UserDetail() {
  const {id} = useParams();
  const msgList = useLoaderData();

  return (
    <div className="user-detail-container">
      <div className='page-title'>
        User <span>{id}</span> 对话记录：
        <Link to={'../'} >Back</Link>
      </div>
      <div className='msg-box'>
        {msgList.map(msg => (
            <div className={`msg-item ${msg.role}`}>
              <div className='msg-time'>{dayjs(msg.createAt).format('YYYY-MM-DD H:m:s')}</div>
              <div className={`msg msg-${msg.role}`}>
                <pre>{msg.content}</pre>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
UserDetail.loader = ({params}) => {
  return new Promise(resolve => {
    UserChatList(params.id).then(result => {
      resolve(result);
    });
  })
}

export default UserDetail;