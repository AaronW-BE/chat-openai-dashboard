import {createBrowserRouter, Link, Outlet, RouterProvider, useNavigation} from "react-router-dom";
import User from "./views/user";
import UserDetail from "./views/user/userDetail";
import Message from "./views/message";
import NotFound from "./views/error/404";
import React from "react";
import {ConfigProvider} from "antd";
import zhCN from "antd/locale/zh_CN";

import TopBarProgress from "react-topbar-progress-indicator";
TopBarProgress.config({
  barColors: {
    "0": "#3194f6",
    "1.0": "#3194f6"
  },
  shadowBlur: 1
});


const AuthLayout = () => <div>
  <h1>Auth</h1>
  <Outlet />
</div>

const BasicLayout = () => {
  return <div>
    <ul>
      <li>
        <Link to={"user?page=1"}>Users</Link>
      </li>
      <li>
        <Link to={"message"}>Message</Link>
      </li>
    </ul>
    <div>
      <Outlet />
    </div>
  </div>
}
const Login = () => <div>Login</div>

const Root = () => {
  const navigation = useNavigation();
  return <div>
    <div>Root</div>
    {navigation.state === 'loading' && <TopBarProgress />}

    <Link to={"dashboard"}>Dashboard</Link>
    <div><Outlet /></div>
  </div>
}

const ErrorPage = () => <div>Error Page</div>

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'dashboard',
        element: <BasicLayout />,
        loader: () => {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve(1);
            }, 2000)
          })
        },
        children: [
          {
            path: 'user',
            children: [
              {
                element: <User />,
                index: true,
                loader: User.loader
              },
              {
                path: ':id',
                element: <UserDetail />,
                loader: UserDetail.loader
              }
            ]
          },
          {
            path: "message",
            loader: Message.loader,
            element: <Message />
          },
        ]
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "logout",
            element: <div>Login Out</div>
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  },
]);

export default function App() {
  return <ConfigProvider locale={zhCN}>
    <RouterProvider router={router} />
  </ConfigProvider>
}