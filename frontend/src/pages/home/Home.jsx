import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Row, Input, Select, Card} from 'antd';
import LayoutApp from '../../components/Layout'
import Product from '../../components/Product';
import { useDispatch } from 'react-redux';
import Cart from '../../components/Cart';
//import { addToCart } from '../../redux/actions/cartActions';





const Home = () => {

  const dispatch = useDispatch();

  const [productData, setProductData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([])

  const [search, setSearch]  =  useState("")

  useEffect(() => {
    const getAllProducts = async () => {
        try {
          dispatch({
            type: "SHOW_LOADING",
          });
          const {data} = await axios.get(`/api/products/getProducts`);


          setProductData(data);
          
          dispatch({
            type: "HIDE_LOADING",
          });
        } catch(error) {
          console.log(error);
        }
      };

      getAllProducts();
  }, [dispatch]);
  


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
      <div className="container">
          <div className="category">
            <Input addonBefore={selectBefore} size="large" placeholder="ค้นหาสินค้า ชื่อ/รหัสสินค้า" onChange={e => setSearch(e.target.value)} value={search}/>
          </div>
          <div style={{display: "flex", justifyContent: "space-between"}}>
              <Card style={{width: "1400px",}}>
                <Row>
                {search.length < 1 ? filteredData.map((item, index) => {         
                  return <Product key={index} product={item} />
                }) : searchProduct}
                </Row>
              </Card>
              <Card style={{width: "500px", background:"#ffffff"}}>
                <Cart/>
              </Card>
          </div>
      </div>
    </LayoutApp>
  )
}

export default Home
