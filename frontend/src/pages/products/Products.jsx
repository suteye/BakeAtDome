import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import LayoutApp from '../../components/Layout'
import { Select, Input, Table, message, Card, Col, Row } from 'antd';
import { CheckCircleOutlined, ExclamationCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import Title from 'antd/lib/skeleton/Title';
import Product from '../../components/Product';

const Products = () => {

  const dispatch = useDispatch();
  const [productData, setProductData] = useState([]);
  const [popModal, setPopModal] = useState(false);
  const [editProduct, setEditProduct] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([])

  const [search, setSearch]  =  useState("")

  const getAllProducts = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const {data} = await axios.get('/api/products/getproducts');
      setProductData(data);
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
      getAllProducts();
  }, []);

  const handlerDelete = async (record) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      await axios.post('/api/products/deleteproducts', {productId:record._id});
      message.success("Product Deleted Successfully!")
      getAllProducts();
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
      dataIndex: "amout",
    },
    {
      title: "หมวดหมู่",
      dataIndex: "category",
    },
    {
      title: "สถานะ",
      dataIndex: "status",
    },
  ]

  const handlerSubmit = async (value) => {
    //console.log(value);
    if(editProduct === null) {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const res = await axios.post('/api/products/addproducts', value);
        message.success("Product Added Successfully!")
        getAllProducts();
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
       await axios.put('/api/products/updateproducts', {...value, productId:editProduct._id});
        message.success("Product Updated Successfully!")
        getAllProducts();
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

  const handleCategory = (e) => {
    setSelectedCategory(e);
    console.log(e);
  }

  const { Option } = Select;
  const selectBefore = (
    <Select defaultValue="ทั้งหมด" className="select-before" onChange={(e) => handleCategory(e)}>
      <Option value="ทั้งหมด">ทั้งหมด</Option>
      <Option value="ขนมเพื่อสุขภาพ">ขนมเพื่อสุขภาพ</Option>
      <Option value="เค้ก">เค้ก</Option>
      <Option value="ขนมปัง">ขนมปัง</Option>
      <Option value="คุกกี้">คุกกี้</Option>
      <Option value="อื่นๆ">อื่นๆ</Option>
      <Option value="เครื่องดื่มร้อน">เครื่องดื่มร้อน</Option>
      <Option value="เครื่องดื่มเย็น">เครื่องดื่มเย็น</Option>
      <Option value="เครื่องดื่มปั่น">เครื่องดื่มปั่น</Option>
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
          <p style={{color:"#41AE0D" , fontSize: 50}}>5</p>
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
      </div>
      <Table dataSource={productData} columns={columns} bordered />
      
    </LayoutApp>
  )
}

export default Products
