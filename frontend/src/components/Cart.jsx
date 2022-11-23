import React, {useEffect,useState} from 'react'
//import { Link, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { DeleteOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import {  Row,Button } from 'antd';

const Cart = () => {
    const {cartItems} = useSelector(state => state.rootReducer);
    const [subTotal, setSubTotal] = useState(0);


      //const navigate = useNavigate();
      const dispatch = useDispatch();

      //checkout and update stock
      
      const handlerCheckout = () => {
        dispatch({
          type: "CHECKOUT"
        })
      }

      const handlerDelete = (record) => {
        dispatch({
          type: "DELETE_FROM_CART",
          payload: record
        });
      }
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

      useEffect(() => {
        let temp = 0;
        cartItems.forEach((product) => (temp = temp + product.price * product.quantity));
        setSubTotal(temp); 
    }, [cartItems]);


  return (
    <div>
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <div className="cart-payment">
                <span className='title-wrapper'>รวม ฿</span> 
                <span className="value-wrapper grand-total" style={{color: "#EF8355"}}>
                {(subTotal.toFixed(2))}
                </span>
            </div>
        </div>
        <Row>
            <Button style={{ backgroundColor: '#EF8355', borderColor: '#EF8355', color: "white"}} block size='large'  onClick={handlerCheckout}>ชำระเงิน</Button>
        </Row>
            {/* block order */}
            <div style={{zIndex:1, position:'relative'}}>
                {cartItems.map((product,index) => (
                        <div className="order-list-row-height" style={{backgroundColor: 'rgba(2,160,235,0.11)'}} key={index}>        
                                <div className="line-clamp line-clamp-2 text-ellipsis" style={{fontSize:13, paddingRight:0, maxWidth:'none'}}>                                    
                                    <span className='m-line' style={{color:'black', fontWeight: 900}}>{index+1}.</span>
                                    <span style={{color: '#777777', fontSize: 15}}>{product.name}</span>
                                </div>
                            <div className="input-group">
                                <span>
                                    <Button type="danger" shape="round" icon={<DeleteOutlined />} size='large' onClick={() => handlerDelete(product,index)}/>
                                    <Button  shape="circle" icon={<PlusOutlined />} size='middle' className='btn-edit' onClick={() => handlerIncrement(product)}/>
                                    <Button  shape="circle" icon={<MinusOutlined />} size='middle' className='btn-edit' onClick={() => handlerDecrement(product)}/>
                                </span>
                            <div>
                            <div className="price-number" style={{verticalAlign: 'top', color: 'rgb(45,45,45)', paddingRight:'3px', textAlign:'right', marginRight:'5px'}}>
                                <div>
                                    <span style={{fontWeight: 900, fontSize:'15px', color:'rgb(45,45,45)'}}>{product.price}</span>
                                </div>
                                <div className="m-order-line-padding">
                                    <span className="multipy-stock-selected">X</span>
                                    <span className="order-qty-selected">{product.quantity}</span>
                                </div>
                                    <br />
                                </div>
                                </div>
                            </div>
                        </div>
                ))}
            </div>
    </div>
  )
}

export default Cart