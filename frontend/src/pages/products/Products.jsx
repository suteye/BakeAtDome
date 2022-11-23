/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Select, Input, Table, Card, Col, Row,Button, Modal, Form,Switch } from 'antd';
import { CheckCircleOutlined, ExclamationCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import LayoutApp from '../../components/Layout'
import Product from '../../components/Product';
import Swal from 'sweetalert2';

const Products = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();



  const [productData, setProductData] = useState([]);
  const [popModal, setPopModal] = useState(false);
  const [editProduct, setEditProduct] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([])

  const [search, setSearch]  =  useState("")



  const getProducts = async () => {
    try {
      dispatch({type: "SHOW_LOADING"});
      const {data} = await axios.get('/api/products/');
      setProductData(data);
      dispatch({type: "HIDE_LOADING"});
    } catch(error) {
      dispatch({type: "HIDE_LOADING"});
      console.log(error);
    }
  };
  
  useEffect(() => {
    getProducts();
  }, [])

  const createProduct = async (value) => {
   
    try {
        await axios.post('/api/products/create', value).then((res) => {
        let statusCode = res.status, message = res.data.message;
        if(statusCode === 201) {
          Swal.fire({
            title: 'สำเร็จ',
            text: message,
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });
          
        }
      });
    
    } catch (err) {
      console.log(err);
    }

    setPopModal(false);
  }


  const columns = [
    {
        title: "รหัส",
        dataIndex: "id"
    },
    {
        title: "ชื่อสินค้า",
        dataIndex: "name",
    }, 
    {
        title: "ราคา",
        dataIndex: "price",
    },
    {
      title: "จำนวน",
      dataIndex: "quantity",
    },
    {
      title: "หมวดหมู่",
      dataIndex: "category",
    },
    {
      title: "สถานะ",
      dataIndex: "productStatus",
      render: (productStatus) => {
        let color = productStatus === '1' ? 'green' : 'red';
        return (
          <span>
            <CheckCircleOutlined style={{ color: color}} />
          </span>
        );
      }
    },
  ]


  const handleCategory = (e) => {
    setSelectedCategory(e);
  }

  const { Option } = Select;
  const selectBefore = (
    <Select defaultValue="ทั้งหมด" className="select-before" onChange={(e) => handleCategory(e)}>
      <Option value="ทั้งหมด">ทั้งหมด</Option>
      <Option value="ขนมเพื่อสุขภาพ">ขนมเพื่อสุขภาพ</Option>
      <Option value="เค้ก">เค้ก</Option>
      <Option value="ขนมปัง">ขนมปัง</Option>
      <Option value="คุกกี้">คุกกี้</Option>
      <Option value="เครื่องดื่มร้อน">เครื่องดื่มร้อน</Option>
      <Option value="เครื่องดื่มเย็น">เครื่องดื่มเย็น</Option>
      <Option value="เครื่องดื่มปั่น">เครื่องดื่มปั่น</Option>
      <Option value="อื่นๆ">อื่นๆ</Option>
    </Select>
  );


  function getFilteredData() {
    switch (selectedCategory) {
      case "ทั้งหมด":
        return productData;
      case "ขนมเพื่อสุขภาพ":
        return productData.filter((item) => item.category === "ขนมเพื่อสุขภาพ");
      case "เค้ก":
        return productData.filter((product) => product.category === "เค้ก");
      case "ขนมปัง":
        return productData.filter((product) => product.category === "ขนมปัง");
      case "คุกกี้":
        return productData.filter((product) => product.category === "คุกกี้");
      case "อื่นๆ":
        return productData.filter((product) => product.category === "อื่นๆ");
      case "เครื่องดื่มร้อน":
        return productData.filter((product) => product.category === "เครื่องดื่มร้อน");
      case "เครื่องดื่มเย็น":
        return productData.filter((product) => product.category === "เครื่องดื่มเย็น");
      case "เครื่องดื่มปั่น":
        return productData.filter((product) => product.category === "เครื่องดื่มปั่น");
      default:
        return productData;
    }
  }
  var filteredData = getFilteredData(); 

  
  const searchProduct = productData.filter((product => {
    return product.name.includes(search);
  })).map((item, index) => {
    return <Product key={index} product={item} />
  });

  return (
    <LayoutApp>
      <div className="site-card-wrapper" style={{ padding: '0 24px 24px' }}>
        <Row gutter={16}>
          <Col span={8}>
            <Card bordered={false} style={{background:"#EEFFDD"}}>
              <p style={{color:"#41AE0D" , fontSize: 50}}>0</p>
              <p><b>พร้อมขาย<CheckCircleOutlined style={{paddingLeft: '16rem', color:"#41AE0D"}}/></b></p>
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false} style={{background:"#FFF7CB"}}>
              <p style={{color:"#B69520", fontSize: 50}}>0</p>
              <p><b>ใกล้หมด<ExclamationCircleOutlined style={{paddingLeft: '16rem', color:"#B69520"}}/></b></p>
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false} style={{background:"#FBEECE"}}>
              <p style={{color:"#AE5A0D" , fontSize: 50}}>0</p>
              <p><b>หมด<CloseCircleOutlined style={{paddingLeft: '16rem', color:"#AE5A0D"}}/></b></p>
            </Card>
          </Col>
        </Row>
      </div>
      <div className="category">
        <Input addonBefore={selectBefore} size="large" placeholder="ค้นหาสินค้า ชื่อ/รหัสสินค้า" onChange={e => setSearch(e.target.value)} value={search}/>
        <Input.Group compact>
          <Button type="primary" size="large" onClick={() => setPopModal(true)}> เพิ่มสินค้า </Button>
        </Input.Group>
      </div>
      <Table dataSource={productData} columns={columns} bordered />

      {popModal && 
        <Modal title="เพิ่มสินค้า" visible={popModal} onCancel={() => setPopModal(false)} footer={false} >
          <Form layout="vertical" onFinish={createProduct}>
            <Form.Item label="ชื่อสินค้า" name="name" rules={[{ required: true, message: 'กรุณากรอกชื่อสินค้า' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="ราคา" name="price" rules={[{ required: true, message: 'กรุณากรอกราคา' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="หมวดหมู่" name="category" rules={[{ required: true, message: 'กรุณาเลือกหมวดหมู่' }]}>
              <Select>
                <Option value="ขนมเพื่อสุขภาพ">ขนมเพื่อสุขภาพ</Option>
                <Option value="เค้ก">เค้ก</Option>
                <Option value="ขนมปัง">ขนมปัง</Option>
                <Option value="คุกกี้">คุกกี้</Option>
                <Option value="เครื่องดื่มร้อน">เครื่องดื่มร้อน</Option>
                <Option value="เครื่องดื่มเย็น">เครื่องดื่มเย็น</Option>
                <Option value="เครื่องดื่มปั่น">เครื่องดื่มปั่น</Option>
                <Option value="อื่นๆ">อื่นๆ</Option>
              </Select>
            </Form.Item>
            <Form.Item label="จำนวน" name="quantity" rules={[{ required: true, message: 'กรุณากรอกจำนวน' }]}>
              <Input />
            </Form.Item>  
              <Form.Item label="รูปภาพ" name="image" rules={[{
                required: true,
                message: 'กรุณาใส่รูปภาพ'
              }]} >
                  <Input
                    type="text"
                  />
                 
              </Form.Item>
              <Button htmlType='submit' type="primary" size="large" style={{width: '100%'}}>เพิ่มสินค้า</Button>

            </Form>
        </Modal>
      }
      
    </LayoutApp>
  )
}

export default Products
