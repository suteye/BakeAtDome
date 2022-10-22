import { Button, Form, Input, Modal, Select, Table, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Layout from '../../components/Layout'
import FormItem from 'antd/lib/form/FormItem'; //customers

const Employees = () => {

  const dispatch = useDispatch();
  const [employeesData, setEmployeesData] = useState([]);
  const [popModal, setPopModal] = useState(false);
  const [editEmployee, setEditEmployee] = useState(false);

  const getAllEmployees = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const {data} = await axios.get('/api/employees/getemployees');
      setEmployeesData(data);
      dispatch({
        type: "HIDE_LOADING",
      });
      console.log(data);

    } catch(error) {
      dispatch({
        type: "HIDE_LOADING",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  const handlerDelete = async (record) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      await axios.post('/api/employees/deleteemployees', {employeeId:record._id});
      message.success("Employees Deleted Successfully!")
      getAllEmployees();
      setPopModal(false);
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

  const columns = [
    {
        title: "รหัสพนักงาน",
        dataIndex: "employeeId"
    },
    {
        title: "ชื่อ-นามสกุล",
        dataIndex: "employeeName",
    }, 
    {
        title: "ตำแหน่ง",
        dataIndex: "employeePosition",
    }
    , 
    {
        title: "เบอร์โทร",
        dataIndex: "employeePhone",
    },
    {
      title: "แก้ไข",
      dataIndex: "_id",
      render:(id, record) => 
      <div>
        <DeleteOutlined className='cart-action' onClick={() => handlerDelete(record)}/>
        <EditOutlined className='cart-edit' onClick={() => {setEditEmployee(record); setPopModal(true)}} />
      </div>
      
  }
  ]

  const handlerSubmit = async (value) => {
    //console.log(value);
    if(editEmployee === null) {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const res = await axios.post('/api/employees/addemployees', value);
        message.success("Employee Added Successfully!")
        getAllEmployees();
        setPopModal(false);
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
    } else {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
       await axios.put('/api/employees/updateemployees', {...value, employeeId:editEmployee._id});
        message.success("Employee Updated Successfully!")
        getAllEmployees();
        setPopModal(false);
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
  }

  return (
    <Layout>
      <Button style={{ backgroundColor: '#EF8355', borderColor: '#EF8355', color: "white", marginBottom: '30px', float: 'right'}} onClick={() => setPopModal(true)}>เพิ่มพนักงาน</Button>
      <Table dataSource={employeesData} columns={columns} bordered />
      
      {
        popModal && 
        <Modal title={`${editEmployee !== null ? "แก้ไขข้อมูลพนักงาน" : "เพิ่มข้อมูลพนักงาน"}`} visible={popModal} onCancel={() => {setEditEmployee(null); setPopModal(false);}} footer={false}>
          <Form layout='vertical' initialValues={editEmployee} onFinish={handlerSubmit}>
            <FormItem name="employeeName" label="ชื่อ-นามสกุล">
              <Input/>
            </FormItem>
            <Form.Item name="employeePosition" label="ตำแหน่ง">
              <Select>
                <Select.Option value="manager">ผู้จัดการ</Select.Option>
                <Select.Option value="assistantManager">ผู้ช่วยผู้จัดการ</Select.Option>
                <Select.Option value="employee">พนักงาน</Select.Option>
              </Select>
            </Form.Item>
            <FormItem name="employeePhone" label="เบอร์โทร">
              <Input/>
            </FormItem>
            
              <Button style={{ backgroundColor: '#EF8355', borderColor: '#EF8355', color: "white"}} htmlType='submit' >เพิ่ม</Button>
          </Form>
        </Modal>
      }

    </Layout>
  )
}

export default Employees