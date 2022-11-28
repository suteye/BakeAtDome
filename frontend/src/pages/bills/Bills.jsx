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
      const {data} = await axios.get('/api/bills/getbills');
      setBillsData(data);
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
      getAllBills();
  }, []); // eslint-disable-line

  

  const columns = [
    {
        title: "จำนวนรายการ",
        dataIndex: "amountOrder"
    },
    {
        title: "รหัสใบเสร็จ",
        dataIndex: "billID",
    }, 
    {
        title: "พนักงาน",
        dataIndex: "customerName",
    }
    , 
    {
        title: "วันที่สร้าง",
        dataIndex: "date",
    },
    {
        title: "ยอดรวม",
        dataIndex: "totalAmount",
    },
    {
        title: "ชำระผ่าน",
        dataIndex: "payBy",
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
        <p style={{borderRadius: '5px 0px 0px 5px', width: '7rem', border: '1px solid', borderColor: '#cecece', background: '#fafafa', textAlign:"center", marginBottom: '0px', paddingTop: '10px'}}>เลขที่บิล</p>
        <Input style={{width: '25rem', borderRadius: '0px 5px 5px 0px'}} size="large" placeholder="ค้นหารหัสใบเสร็จ" onChange={e => setSearch(e.target.value)} value={search}/>
      </div>
      <Table dataSource={billsData} columns={columns} bordered />
      {
        popModal && 
        <Modal title="Invoice Details" width={400} pagination={false} visible={popModal} onCancel={() => setPopModal(false)} footer={false}>
          <div className="card" ref={componentRef}>
            <div className="cardHeader">
                <h2 className="logo">MP POS</h2>
                <span>Number: <b>+381/0000000</b></span>
                <span>Address: <b>34000 Kragujevac, Serbia</b></span>
            </div>
            <div className="cardBody">
                <div className="group">
                    <span>Customer Name:</span>
                    <span><b>{selectedBill.customerName}</b></span>
                </div>
                <div className="group">
                    <span>Customer Phone:</span>
                    <span><b>{selectedBill.customerPhone}</b></span>
                </div>
                <div className="group">
                    <span>Customer Address:</span>
                    <span><b>{selectedBill.customerAddress}</b></span>
                </div>
                <div className="group">
                    <span>Date Order:</span>
                    <span><b>{selectedBill.createdAt.toString().substring(0, 10)}</b></span>
                </div>
                <div className="group">
                    <span>Total Amount:</span>
                    <span><b>${selectedBill.totalAmount}</b></span>
                </div>
            </div>
            <div className="cardFooter">
                <h4>Your Order</h4>
                {selectedBill.cartItems.map((product) => (
                    <>
                        <div className="footerCard">
                            <div className="group">
                                <span>Product:</span>
                                <span><b>{product.name}</b></span>
                            </div>
                            <div className="group">
                                <span>Qty:</span>
                                <span><b>{product.quantity}</b></span>
                            </div>
                            <div className="group">
                                <span>Price:</span>
                                <span><b>${product.price}</b></span>
                            </div>
                        </div>
                    </>
                ))}
                <div className="footerCardTotal">
                    <div className="group">
                        <h3>Total:</h3>
                        <h3><b>${selectedBill.totalAmount}</b></h3>
                    </div>
                </div>
                <div className="footerThanks">
                    <span>Thank You for buying from us</span>
                </div>
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
