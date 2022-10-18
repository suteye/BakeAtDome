import { Button, Form, Input, message } from 'antd'
import FormItem from 'antd/lib/form/FormItem'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerSubmit = async (value) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      await axios.post('http://localhost:5500/api/users/register', value);
      //msg from backend ap
      message.success("User Create Successfully!");
      navigate("/login");
      dispatch({
        type: "HIDE_LOADING",
      });
      

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
        <h2>MP POS</h2>
        <p>Register</p>
        <div className="form-group">
          <Form layout='vertical' onFinish={handlerSubmit}>
            <FormItem name="username" label="username">
              <Input/>
            </FormItem>
            <FormItem name="password" label="Password">
              <Input type="password"/>
            </FormItem>
            <FormItem name="confirmPassword" label="Confirm Password">
              <Input type="password"/>
            </FormItem>
            <FormItem name="email" label="Email">
              <Input type='email'/>
            </FormItem>
            <FormItem name="role" label="Role">
              <Input/>
            </FormItem>
            <FormItem name="firstname" label="First Name">
              <Input/>
            </FormItem>
            <FormItem name="lastname" label="Last Name">
              <Input/>
            </FormItem>
            <FormItem name="phone" label="Phone">
              <Input/>
            </FormItem>
            <div className="form-btn-add">
              <Button htmlType='submit' className='add-new'>Register</Button>
              <Link className='form-other' to="/login">Login Here!</Link>
            </div>
          </Form>
        </div>
    </div>
  )
}

export default Register
