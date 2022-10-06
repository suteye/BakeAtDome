import React from 'react'
import { Button, Card } from 'antd';
import { useDispatch } from 'react-redux';

const Product = ({product}) => {
  const dispatch = useDispatch();

  const handlerToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity: 1 }
    })
  }

    const { Meta } = Card;

  return (
    <Card
        hoverable
        style={{ width: 350, marginBottom: 30}}
        cover={<img alt={product.name} src={product[4]} style={{height: 200}} />}
    >
      {/* title new line */}


        <Meta title={product.name} description={`${product.price} บาท`}  />

        <div className="product-btn">
          <Button type="primary" onClick={() => handlerToCart()}>เพิ่มลงตะกร้า</Button>
        </div>
    </Card>
  )
}

export default Product
