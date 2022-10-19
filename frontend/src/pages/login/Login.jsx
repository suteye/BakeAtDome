import { Button, Form, Input, message,Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone,UserOutlined } from '@ant-design/icons';
import FormItem from 'antd/lib/form/FormItem';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerSubmit = async (value) => {
    //console.log(value);
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const res = await axios.post('http://localhost:5500/api/auth/login', value);
      dispatch({
        type: "HIDE_LOADING",
      });
      message.success("User Login Successfully!");
      localStorage.setItem("auth", JSON.stringify(res.data));
      navigate("/");
      

    } catch(error) {
      dispatch({
        type: "HIDE_LOADING",
      });
      message.error("Error!")
      console.log(error);
    }
  }

  useEffect(() => {
    if(localStorage.getItem("auth")) {
      localStorage.getItem("auth");
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
