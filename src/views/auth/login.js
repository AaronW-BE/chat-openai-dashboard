import {Outlet, redirect, useNavigate} from "react-router-dom";
import {Button, Form, Input, message} from "antd";
import FormItem from "antd/es/form/FormItem";
import './css/login.css'
import LoginPng from '../../assets/icon/login.png'
import {Login} from "../../api/account";

function LoginView() {
  const navigate = useNavigate();
  const handleLoginSubmit = (values) => {
    const {username, password} = values;
    Login(username, password).then(result => {
      console.log('login result', result)
      localStorage.setItem('token', JSON.stringify({
        value: result.token,
        expireAt: result.expireAt
      }))
      navigate('/dashboard');
    }).catch(e => {
      console.log('login error ', e)
      if (e.response.data) {
        message.error(e.response.data).then();
      }
    })
  }

  return (
    <div className='login-form'>
      <div className='login-form-title'>
        <div>
          <img src={LoginPng} alt="logo" className='login-brand-logo' />
        </div>
        <div style={{marginTop: '10px'}}>
          Welcome,<b> Wall-E Engine</b>
        </div>
      </div>
      <div className='login-form-content'>
        <Form layout={"vertical"} onFinish={handleLoginSubmit}>
          <FormItem label='Username' name="username">
            <Input />
          </FormItem>
          <FormItem label='Password' name="password">
            <Input type="password" />
          </FormItem>
          <FormItem>
            <Button htmlType="submit" type={'default'} block={false}>Sign In</Button>
          </FormItem>
          <FormItem style={{textAlign: "right"}}>
            <a>Forgot password?</a>
          </FormItem>
        </Form>
      </div>
    </div>
  )
}

export default LoginView;