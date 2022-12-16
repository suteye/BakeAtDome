/* eslint-disable no-unused-vars */
import { Button, Modal, Table, Input} from 'antd';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
//import ReactToPrint from 'react-to-print';
import { useReactToPrint } from 'react-to-print';
import { EyeOutlined} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import Layout from '../../components/Layout'

const Bills = () => {
const componentRef = useRef();
const dispatch = useDispatch();
  const [billsData, setBillsData] = useState([]);
  const [popModal, setPopModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [search, setSearch]  =  useState("")

  const getAllBills = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const {data} = await axios.get('/api/bills/');
      setBillsData(data);
      dispatch({
        type: "HIDE_LOADING",
      });
      //console.log(data);

    } catch(error) {
      dispatch({
        type: "HIDE_LOADING",
      });
      console.log(error);
    }
  };

  useEffect(() => {
      getAllBills();
  }, []); // eslint-disable-line

  

  const columns = [
    {
        title: "จำนวนรายการ",
        dataIndex: "cartItems",
        key: "cartItems",
        render: (cartItems) => cartItems.map((item) => item.quantity).reduce((a, b) => a + b, 0),
    },
    {
        title: "รหัสใบเสร็จ",
        dataIndex: "billId",
        render: (billId) => <b >#{billId}</b>,
    }, 
    {
        title: "วันที่สร้าง",
        dataIndex: "createdAt",
        render: (text) => 
        //date format dd/mm/yyyy
        <div>
          {new Date(text).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
          //return text.split('T')[0];
    },
    {
        title: "ยอดรวม",
        dataIndex: "cartItems",
        //loop cartItems and get price 
        render: (cartItems) => cartItems.map((item) => item.price * item.quantity).reduce((a, b) => a + b, 0),
    },
    {
        title: "ชำระผ่าน",
        dataIndex: "paymentMethod",
    },
    {
        title: "จัดการ",
        dataIndex: "_id",
        render:(id, record) => 
        <div>
          <EyeOutlined className='cart-edit eye' onClick={() => {setSelectedBill(record); setPopModal(true);}} />
        </div>
        
    }
  ]

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Layout>
      
      <div style={{display: 'flex', marginBottom: '50px' }}>
        <p style={{borderRadius: '5px 0px 0px 5px', width: '7rem', border: '1px solid', borderColor: '#cecece', background: '#fafafa', textAlign:"center", marginBottom: '0px', paddingTop: '10px'}}>รหัสใบเสร็จ</p>
        <Input style={{width: '25rem', borderRadius: '0px 5px 5px 0px'}} size="large" placeholder="ค้นหารหัสใบเสร็จ" onChange={e => setSearch(e.target.value)} value={search}/>
      </div>
      <Table dataSource={billsData} columns={columns} bordered />
      {
        popModal && 
        <Modal title="Invoice Details" width={400} pagination={true} visible={popModal} onCancel={() => setPopModal(false)} footer={false}>
          <div className="card" ref={componentRef}>
            <div className="cardHeader">
                <h2 className="logo">BAKE@DOME</h2>
                <div className="invoiceInfo">
                    <div className="left">
                        <p>เลขที่ใบเสร็จ: <b>{selectedBill.billId}</b></p>
                        <p>วันที่สั่งซื้อ: <b>{new Date(selectedBill.createdAt).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}</b></p>
                      </div>
                    <div className="right">
                        <p>ชำระโดย: <b>{selectedBill.paymentMethod}</b></p>
                    </div>
                </div>
            </div>
            <div className="cardBody">
                <h4>รายการสินค้า</h4>
                {selectedBill.cartItems.map((product) => (
                    <>
                        <div className="footerCard">
                            <div className="group">
                                <span>ชื่อสินค้า:</span>
                                <span><b>{product.name}</b></span>
                            </div>
                            <div className="group">
                                <span>Qty:</span>
                                <span><b>{product.quantity}</b></span>
                            </div>
                            <div className="group">
                                <span>ราคา:</span>
                                <span><b>{product.price} ฿</b></span>
                            </div>
                        </div>
                    </>
                ))}
                <div className="footerCardTotal">
                    <div className="group">
                        <h3>รวม:</h3>
                        <h3><b> {selectedBill.cartItems.map((item) => item.price * item.quantity).reduce((a, b) => a + b, 0)} ฿</b></h3>
                    </div>
                </div>
                <div className="footerThanks">
                    <span>Thank You for buying from us</span>
                </div>
                
            </div>
            <div className="cardFooter">
            </div>
          </div>
          <div className="bills-btn-add">
            <Button onClick={handlePrint} htmlType='submit' className='add-new'>พิมพ์ใบเสร็จ</Button>
        </div>  
        </Modal>
      }
    </Layout>
  )
}

export default Bills
