import {Outlet} from "react-router-dom";
import './auth-layout.css'

export default function () {
  return <div className='auth-layout-wrap'>
    <div className='auth-container'>
      <div className='auth-form'>
        <Outlet />
      </div>
      <div className='auth-brand'></div>
    </div>
    <div style={{textAlign: 'center', marginTop: '20px', color: '#787878'}}>
      &copy; {new Date().getFullYear()} BMT
    </div>
  </div>
};