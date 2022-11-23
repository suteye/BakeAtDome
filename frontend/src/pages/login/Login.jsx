import { Button, Form, Input,Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone,UserOutlined } from '@ant-design/icons';
import FormItem from 'antd/lib/form/FormItem';
import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import {  useNavigate } from 'react-router-dom';


const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerSubmit = async (value) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      await axios.post('/api/auth/login', value).then((response) => {
        let statusCode = response.status, message = response.data.message;
        if(statusCode === 200) {
          Swal.fire({
            title: 'สำเร็จ',
            text: message,
            icon: 'success',

          });
          localStorage.setItem("authToken", response.data.token);
          navigate('/');
          
        } else {
          Swal.fire({
            title: 'ผิดพลาด',
            text: message,
            icon: 'error',
            confirmButtonText: 'ตกลง'
          });
        }
      }); 
      dispatch({
        type: "HIDE_LOADING",
      });

      

    } catch(error) {
      dispatch({
        type: "HIDE_LOADING",
      });
        if(error.response.status === 401 || error.response.status === 400 || error.response.status === 404) {
          Swal.fire({
            title: 'ผิดพลาด',
            text: error.response.data.error,
            icon: 'error',
            confirmButtonText: 'ตกลง'
          });
        }
      }
  }

  useEffect(() => {
    if(localStorage.getItem("authToken")) {
      localStorage.getItem("authToken");
      navigate("/");
    }
    
  }, [navigate]);


  return (
    <div className='form'>
        <div className="form-group">
          <h1 className='head'>BAKE@DOME</h1>
          <Form layout='vertical' onFinish={handlerSubmit}>
            <FormItem name="username" label="Username">
              <Input size="large" name="username" placeholder="กรุณาใส่ Username"  suffix={<UserOutlined/>}/>
            </FormItem>
            <FormItem name="password" label="Password">
            <Space direction="vertical">
              <Input.Password placeholder="กรุณาใส่ Password" name='password' iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
            </Space>
            </FormItem>
            <div className="form-btn-add">
              <Button htmlType='submit' size='large' block className='login-btn'>Login</Button>
            </div>

          </Form>
        </div>
    </div>
  )
}

export default Login
