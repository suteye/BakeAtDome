import React from 'react'
import { Button, Card } from 'antd';
import { useDispatch } from 'react-redux';

const Product = ({product}) => {
  const dispatch = useDispatch();
  const { Meta } = Card;

  const handlerToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity: 1 }
    })
  }


  return (
    <Card
        hoverable
        style={{ width: "23%", marginBottom: 30, marginRight: 20, cursor: "pointer" }}
        cover={<img alt={product.name} src={product.image} style={{height: 200}} />} >
        <Meta title={product.name} description={`${product.price} บาท`}  />
        <div className="product-btn">
          <Button type="" onClick={() => handlerToCart()}>เพิ่มลงตะกร้า</Button>
        </div>
    </Card>
    
  )
}

export default Product
