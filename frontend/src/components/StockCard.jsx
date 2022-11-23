import React from 'react'
import axios from 'axios';
import {  Card, Col, Row} from 'antd';
import { CheckCircleOutlined, ExclamationCircleOutlined, CloseCircleOutlined} from '@ant-design/icons';

const StockCard = (item) => {
  return (
    <div className="site-card-wrapper" style={{ padding: '0 24px 24px' }}>
        <Row gutter={16}>
            <Col span={8}>
                <Card bordered={false} style={{background:"#EEFFDD"}}>
                <p style={{color:"#41AE0D" , fontSize: 50}}></p>
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
  )
}

export default StockCard