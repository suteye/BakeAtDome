import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout'
import { DeleteOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Button, Form, Modal, Select, Table } from 'antd';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {

    const [subTotal, setSubTotal] = useState(0);
    const [billPopUp, setBillPopUp] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {cartItems} = useSelector(state => state.rootReducer);

    const handlerIncrement = (record) => {
        dispatch({
            type: "UPDATE_CART",
            payload: {...record, quantity: record.quantity + 1}
        });
    };

    const handlerDecrement = (record) => {
        if(record.quantity !== 1){
            dispatch({
                type: "UPDATE_CART",
                payload: {...record, quantity: record.quantity - 1}
            });
        }
    };

    const handlerDelete = (record) => {
        dispatch({
            type: "DELETE_FROM_CART",
            payload: record
        });
    }

    const columns = [
        {
            title: "ชื่อสินค้า",
            dataIndex: "name"
        },
        {
            title: "รูปภาพ",
            dataIndex: "image",
            render:(image, record) => <img src={image} alt={record.name} height={60} width={60} />
        }, 
        {
            title: "ราคา",
            dataIndex: "price",
        }
        , 
        {
            title: "จำนวน",
            dataIndex: "_id",
            render:(id, record) => 
                <div>
                    <MinusCircleOutlined className='cart-minus' onClick={() => handlerDecrement(record)}/>
                    <strong className='cart-quantity'>{record.quantity}</strong>
                    <PlusCircleOutlined className='cart-plus' onClick={() => handlerIncrement(record)} />
                </div>
        }
        , 
        {
            title: "Action",
            dataIndex: "_id",
            render:(id, record) => <DeleteOutlined className='cart-action' onClick={() => handlerDelete(record)} />
        }
    ]

    useEffect(() => {
        let temp = 0;
        cartItems.forEach((product) => (temp = temp + product.price * product.quantity));
        setSubTotal(temp); 

    }, [cartItems]);

    const handlerSubmit = async (value) => {
        console.log(value);
        try {
            const newObject = {
                ...value,
                cartItems,
                subTotal,
                //totalAmount: Number((Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))).toFixed(2)),
                //userId: JSON.parse(localStorage.getItem("auth"))._id
            }
            dispatch({type: "SHOW_LOADING"})
            await axios.post("/api/bills/create", newObject).then(res => {
              let statusCode = res.status, message = res.data.message;
                if(statusCode === 201){
                  dispatch({type: "CHECKOUT"})
                  dispatch({type: "HIDE_LOADING"})
                  setBillPopUp(false);
                  Swal.fire({ 
                    title: 'สำเร็จ',
                    text: message,
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                  }).then(() => {
                    dispatch({type: "HIDE_LOADING"})
                    navigate("/");
                  })
                }
            })
        } catch(error) {
          dispatch({type: "HIDE_LOADING"})
            if(error.response.status === 500) {
              Swal.fire({
                title: 'ผิดพลาด',
                text: error.response.data.message,
                icon: 'error',
                timer: 1500,
                confirmButtonText: 'ลองใหม่อีกครั้ง'
              });
            }
        }
    }
  return (
    <Layout>
      <h2>Cart</h2>
      <Table dataSource={cartItems} columns={columns} bordered />
      <div className="subTotal">
        <h2>รวม: <span>{(subTotal).toFixed(2)} ฿</span></h2>
        <Button onClick={() => setBillPopUp(true)} className='add-new'>ชำระเงิน</Button>
      </div>
      <Modal title="Create Invoice" visible={billPopUp} onCancel={() => setBillPopUp(false)} footer={false}>
        <Form layout='vertical' onFinish={handlerSubmit}>
            <Form.Item name="paymentMethod" label="ประเภทการชำระเงิน">
              <Select>
                <Select.Option value="เงินสด">เงินสด</Select.Option>
                <Select.Option value="คิวอาร์">คิวอาร์ (พร้อมเพย์)</Select.Option>
              </Select>
            </Form.Item>
            <div className="total">
                <h3>รวม: {(subTotal.toFixed(2))} ฿</h3>
            </div>
            <div className="form-btn-add">
              <Button htmlType='submit' className='add-new'>ชำระเงิน</Button>
            </div>  
        </Form>
      </Modal>
    </Layout>
  )
}

export default Cart
