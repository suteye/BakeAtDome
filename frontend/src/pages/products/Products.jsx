/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Select, Input, Table, Card, Col, Row,Button, Modal, Form } from 'antd';
import { CheckCircleOutlined, ExclamationCircleOutlined, CloseCircleOutlined,DeleteOutlined,EditOutlined } from '@ant-design/icons';
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
      const {data} = await axios.get('/api/products/')
      setProductData(data);
      dispatch({type: "HIDE_LOADING"});
    } catch(error) {
      dispatch({type: "HIDE_LOADING"});
      console.log(error);
    }
  };
  
  useEffect(() => {
    getProducts();// eslint-disable-next-line
  }, [])

  const createProduct = async (value) => {
    if(editProduct === false) {
      try {
          dispatch({type: "SHOW_LOADING"})
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
          getProducts();
          setPopModal(false);
          dispatch({type: "HIDE_LOADING"})

        });
      
      } catch (err) {
        dispatch({type: "HIDE_LOADING"})
        if(err.response.status === 500) {
          Swal.fire({
            title: 'ผิดพลาด',
            text: err.response.data.message,
            icon: 'error',
            timer: 1500,
            confirmButtonText: 'ลองใหม่อีกครั้ง'

          });
        }
      }
      setPopModal(false);
    } else {
      try{
        dispatch({type: "SHOW_LOADING"})
        await axios.put(`/api/products/update`, {...value, productId: editProduct._id}).then((res) => {
          let statusCode = res.status, message = res.data.message;
          if(statusCode === 200) {
            Swal.fire({
              title: 'สำเร็จ',
              text: message,
              icon: 'success',
              timer: 1500,
              showConfirmButton: false
            });
          }
          getProducts();
          setPopModal(false);
          dispatch({type: "HIDE_LOADING"})
        });
      } catch (err) {
        dispatch({type: "HIDE_LOADING"})
        if(err.response.status === 500) {
          Swal.fire({
            title: 'ผิดพลาด',
            text: err.response.data.message,
            icon: 'error',
            confirmButtonText: 'ลองใหม่อีกครั้ง'

          });
        }
      }
    }
  }

  const deleteProduct = async (id) => {
    try{
      dispatch({type: "SHOW_LOADING"})
      await axios.delete(`/api/products/${id}`).then((res) => {
        let statusCode = res.status, message = res.data.message;
        if(statusCode === 200) {
          Swal.fire({
            title: 'สำเร็จ',
            text: message,
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });
        }
        getProducts();
        dispatch({type: "HIDE_LOADING"})
      });
    } catch (err) {
      dispatch({type: "HIDE_LOADING"})
      if(err.response.status === 500) {
        Swal.fire({
          title: 'ผิดพลาด',
          text: err.response.data.message,
          icon: 'error',
          timer: 1500,
          showConfirmButton: false
        });
      }
    }
  }

  const columns = [
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
    {
      title: "Action",
      dataIndex: "_id",
      render: (id,record) => {
        return (
          <span>
            <Button type="primary" onClick={() => {setEditProduct(record); setPopModal(true)}} icon={<EditOutlined />} />
            <Button type="primary" danger onClick={() => {deleteProduct(id)}} icon={<DeleteOutlined />} />
          </span>
        );
      }
    }
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
      {/* card */}
      <div className="site-card-wrapper" style={{ padding: '0 24px 24px' }}>
        <Row gutter={16}>
            <Col span={8}>
                <Card bordered={false} style={{background:"#EEFFDD"}}>
                <p style={{color:"#41AE0D" , fontSize: 50}}>
                  {/* count product is ready to sell (productStatus = 1)  */}
                  {productData.filter((product) => product.productStatus === "1").length}
                </p>
                <p><b>พร้อมขาย<CheckCircleOutlined style={{paddingLeft: '16rem', color:"#41AE0D"}}/></b></p>
                </Card>
            </Col>
            <Col span={8}>
                <Card bordered={false} style={{background:"#FFF7CB"}}>
                <p style={{color:"#B69520", fontSize: 50}}>
                  {/* count product is not ready to sell (productStatus = 2)  */}
                  {productData.filter((product) => product.productStatus === "2").length}
                </p>
                <p><b>ใกล้หมด<ExclamationCircleOutlined style={{paddingLeft: '16rem', color:"#B69520"}}/></b></p>
                </Card>
            </Col>
            <Col span={8}>
                <Card bordered={false} style={{background:"#FBEECE"}}>
                <p style={{color:"#AE5A0D" , fontSize: 50}}>
                  {/* count product is out of stock (productStatus = 3)  */}
                  {productData.filter((product) => product.productStatus === "3").length}
                </p>
                <p><b>หมด<CloseCircleOutlined style={{paddingLeft: '16rem', color:"#AE5A0D"}}/></b></p>
                </Card>
            </Col>
        </Row>
  </div>

      {/* search bar */}
      <div className="category">
        <Input addonBefore={selectBefore} size="large" placeholder="ค้นหาสินค้า ชื่อ/รหัสสินค้า" onChange={e => setSearch(e.target.value)} value={search}/>
        <Input.Group compact>
          <Button type="primary" size="large" onClick={() => setPopModal(true)}> เพิ่มสินค้า </Button>
        </Input.Group>
      </div>

      {/*  product table */}
      <Table dataSource={productData} columns={columns} bordered />

      {/* modal create products */}
      {popModal && 
        <Modal title={`${editProduct !== false ? "แก้ไขสินค้า" : "สร้างสินค้าใหม่"}`} visible={popModal} onCancel={() => setPopModal(false)} footer={false} >
          <Form layout="vertical" initialValues={editProduct} onFinish={createProduct}>
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
