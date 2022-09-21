import React, {useState, useEffect} from 'react'
import axios from 'axios'
import LayoutApp from '../../components/Layout'
import { Row, Col, Input, Select,Pagination} from 'antd';
import Product from '../../components/Product';
import { useDispatch } from 'react-redux';



const Home = () => {

  const dispatch = useDispatch();

  const [productData, setProductData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const [search, setSearch]  =  useState("")



  useEffect(() => {
    const getAllProducts = async () => {
        try {
          dispatch({
            type: "SHOW_LOADING",
          });
          const {data} = await axios.get('http://localhost:5500/api/products/getProducts');
          setProductData(data);
          
          dispatch({
            type: "HIDE_LOADING",
          });
          //console.log(data);

        } catch(error) {
          console.log(error);
        }
      };

      getAllProducts();
  }, [dispatch]);
  
  //search function


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

  return (
    <LayoutApp>
      <div className="category">
      <Input addonBefore={selectBefore}  size="large" placeholder="ค้นหาสินค้า ชื่อ/รหัสสินค้า" onChange={e => setSearch(e.target.value)} value={search}/>
 
       {/*{categories.map((category) => (
          <div key={category.name} className={`categoryFlex ${selectedCategory === category.name && 'category-active'}`} onClick={() => setSelectedCategory(category.name)}>
            <h3 className="categoryName">{category.name}</h3>
            <img src={category.imageUrl} alt={category.name} height={60} width={60} />
          </div>
       ))}*/ }
     </div>
     {/* card product 
      <div className="product">
        <Row gutter={[16, 16]}>
          {productData.map((product,index) => (
            <Col key={index + 2} xs={24} sm={12} md={8} lg={6} xl={6}>
              <Product product={product}/>
            </Col>
          ))}

        </Row>
      </div>*/}
      <Row>
        {filteredData.map((product,index) => (
          <Col key={index + 2} xs={24} sm={12} md={8} lg={6} xl={6}>
            <Product product={product}/>
          </Col>

        ))}

    { /* {productData.filter((i) => i.category === selectedCategory).map((product,index) => (
          <Col xs={24} sm={6} md={12} lg={6}>
            <Product key={index+2} product={product} />
          </Col>
    ))} */}
      </Row>

    </LayoutApp>
  )
}

export default Home
