import { Button, Form, Input, Modal, Select, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import Layout from '../../components/Layout'
import FormItem from 'antd/lib/form/FormItem'; //customers

const Employees = () => {

  const dispatch = useDispatch();
  const [employeesData, setEmployeesData] = useState([]);
  const [popModal, setPopModal] = useState(false);
  const [editEmployee, setEditEmployee] = useState(false);
  

{/* get all data */}
  const getAllEmployees = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const {data} = await axios.get('/api/employees/getEmployees');
      console.log(data);
      setEmployeesData(data);
      dispatch({
        type: "HIDE_LOADING",
      });

    } catch(error) {
      dispatch({
        type: "HIDE_LOADING",
      });
      console.log(error);
    }
  }; 

  useEffect(() => {
    getAllEmployees();
  }, []);  // eslint-disable-line

  {/* submit */}
  const handlerSubmit = async (value) => {

    if(editEmployee === false) {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        await axios.post('/api/employees/addEmployees', value).then((res) => {
          let statusCode = res.status, message = res.data.message;
          if(statusCode === 201) {
            Swal.fire({
              title: 'สำเร็จ',
              text: message,
              icon: 'success',
              confirmButtonText: 'ตกลง'
            });
            getAllEmployees();
            setPopModal(false);
          } 
        });
      
        dispatch({
          type: "HIDE_LOADING",
        });
      
      } catch(error) {
        dispatch({
          type: "HIDE_LOADING",
        });

        if(error.response.status === 409) {
          Swal.fire({
            title: 'ผิดพลาด',
            text: error.response.data.message,
            icon: 'error',
            confirmButtonText: 'แก้ไขใหม่'
          });
        }
      }
    } else {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
       await axios.put('/api/employees/updateEmployees', {...value, employeeId:editEmployee._id}).then((res) => {
        let statusCode = res.status, message = res.data.message;
        if(statusCode === 201) {
          Swal.fire({
            title: 'สำเร็จ',
            text: message,
            icon: 'success',
            confirmButtonText: 'ตกลง'
          });
          getAllEmployees();
          setPopModal(false);
        }
       });

        dispatch({
          type: "HIDE_LOADING",
        });
        
  
      } catch(error) {
        dispatch({
          type: "HIDE_LOADING",
        });
        if(error.response.status === 409) {
          Swal.fire({
            title: 'ผิดพลาด',
            text: error.response.data.message,
            icon: 'error',
            confirmButtonText: 'แก้ไขใหม่'
          });
        }
      }
    }
  }

{/* delete */}
  const handlerDelete = async (record) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
     await axios.post('/api/employees/deleteEmployees', {employeeId:record._id}).then((res) => {
      let statusCode = res.status, message = res.data.message;
      if(statusCode === 201) {
        Swal.fire({
          title: 'สำเร็จ',
          text: message,
          icon: 'success',
          confirmButtonText: 'ตกลง'
        });
        getAllEmployees();
        setPopModal(false);
      } 
     });
      dispatch({
        type: "HIDE_LOADING",
      }); 
    } catch(error) {
      dispatch({
        type: "HIDE_LOADING",
      });
      if(error.response.status === 409) {
        Swal.fire({
          title: 'ผิดพลาด',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'แก้ไขใหม่'
        });
      }
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



  return (
    <Layout>
      <Button style={{ backgroundColor: '#EF8355', borderColor: '#EF8355', color: "white", marginBottom: '30px', float: 'right'}} onClick={() => setPopModal(true)}>เพิ่มพนักงาน</Button>
      <Table dataSource={employeesData} columns={columns} bordered />
      
      {
        popModal && 
        <Modal title={`${editEmployee !== false ? "แก้ไขข้อมูลพนักงาน" : "เพิ่มข้อมูลพนักงาน"}`} visible={popModal} onCancel={() => {setEditEmployee(null); setPopModal(false);}} footer={false}>
          <Form layout='vertical' initialValues={editEmployee} onFinish={handlerSubmit}>
            <FormItem label="อีเมล" name="employeeEmail">
              <Input placeholder='อีเมล' name="employeeEmail"/>
            </FormItem>
            <FormItem label="รหัสผ่าน" name="employeePassword">
              <Input.Password placeholder='รหัสผ่าน' name="employeePassword"/>
            </FormItem>
            <Form.Item name="employeePosition" label="ประเภทของพนักงาน">
              <Select>
                <Select.Option value="ผู้จัดการร้าน">ผู้จัดการร้าน</Select.Option>
                <Select.Option value="ผู้ช่วยผู้จัดการ">ผู้ช่วยผู้จัดการ</Select.Option>
                <Select.Option value="พนักงานขาย">พนักงานขาย</Select.Option>
                <Select.Option value="พนักงานฝ่ายผลิต">พนักงานฝ่ายผลิต</Select.Option>
              </Select>
            </Form.Item>
            <FormItem name="employeeName" label="ชื่อ-นามสกุล">
              <Input placeholder="ชื่อ-นามสกุล" name='employeeName'/>
            </FormItem>
            <FormItem name="employeePhone" label="เบอร์โทร" >
              <Input placeholder='เบอร์โทร' name='employeePhone'/>
            </FormItem>
              <Button style={{ backgroundColor: '#EF8355', borderColor: '#EF8355', color: "white"}} htmlType='submit'>เพิ่ม</Button>
          </Form>
        </Modal>
      }

    </Layout>
  )
}

export default Employees