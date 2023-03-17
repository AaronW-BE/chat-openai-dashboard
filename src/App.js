import {createBrowserRouter, Link, Outlet, redirect, RouterProvider, useNavigation} from "react-router-dom";
import User from "./views/user";
import UserDetail from "./views/user/userDetail";
import Message from "./views/message";
import NotFound from "./views/error/404";
import React from "react";
import {ConfigProvider} from "antd";
import zhCN from "antd/locale/zh_CN";

import TopBarProgress from "react-topbar-progress-indicator";
import LoginView from "./views/auth/login";
import AuthLayout from "./views/auth/authLayout";
TopBarProgress.config({
  barColors: {
    "0": "#3194f6",
    "1.0": "#3194f6"
  },
  shadowBlur: 1
});

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

const Root = () => {
  const navigation = useNavigation();
  return <div>
    {navigation.state === 'loading' && <TopBarProgress />}

    <div><Outlet /></div>
  </div>
}

Root.loader = () => {
  let token = localStorage.getItem('token');
  console.log('root loader')
  if (!token) {
    console.log('need auth')
    throw redirect('login');
  }
  return true;
}

const ErrorPage = () => <div>Error Page</div>

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: Root.loader,
    children: [
      {
        path: 'dashboard',
        element: <BasicLayout />,
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
        path: "*",
        element: <NotFound />
      }
    ]
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginView />,
      },
      {
        path: "logout",
        element: <div>Login Out</div>
      },
    ],
  },
]);

export default function App() {
  return <ConfigProvider locale={zhCN}>
    <RouterProvider router={router} />
  </ConfigProvider>
}