import { Col, Card, Row } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Layout from '../../components/Layout'
import { Line, Column } from '@ant-design/plots';

const Dashboards = () => {

  const dispatch = useDispatch();
  const [dashBoardsData, setDashBoardsData] = useState([]);

  const getAllDashBoards = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const {data} = await axios.get('/api/bills/getDashBoards');
      setDashBoardsData(data);
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
    getAllDashBoards();
}, []);

  const dataLine = [
    {
      total: 0,
      time: 0,
    },
    {
      total: 0,
      time: 1,
    },
    {
      total: 0,
      time: 2,
    },
    {
      total: 0,
      time: 3,
    },
    {
      total: 0,
      time: 4,
    },
    {
      total: 0,
      time: 5,
    },
    {
      total: 0,
      time: 6,
    },
    {
      total: 0,
      time: 7,
    },
    {
      total: 200,
      time: 8,
    },
    {
      total: 500,
      time: 9,
    },
    {
      total: 250,
      time: 10,
    },
    {
      total: 250,
      time: 11,
    },
    {
      total: 600,
      time: 12,
    },
    {
      total: 450,
      time: 13,
    },
    {
      total: 500,
      time: 14,
    },
    {
      total: 200,
      time: 15,
    },
    {
      total: 200,
      time: 16,
    },
    {
      total: 300,
      time: 17,
    },
    {
      total: 400,
      time: 18,
    },
  ];

  const dataColume = [
    {
      name: 'คอนเฟลก',
      total: 500,
    },
    {
      name: 'บราวนี่กรอบ',
      total: 800,
    },
    {
      name: 'ซอฟเค้ก',
      total: 400,
    },
    {
      name: 'ซากุระโฮลวีท',
      total: 350,
    },
    {
      name: 'เค้กวนิลา',
      total: 700,
    },
  ];

  const configLine = {
    data: dataLine,
    height: 200,
    color: '#5C59BE' ,
    xField: 'time',
    yField: 'total',
    label: {},
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#5C59BE',
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red',
        },
      },
    },
    interactions: [
      {
        type: 'marker-active',
      },
    ],
  };

  const configColumn = {
    data: dataColume,
    color: '#5C59BE' ,
    height: 200,
    xField: 'name',
    yField: 'total',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      name: {
        alias: 'ชื่อขนม',
      },
      total: {
        alias: 'ยอดเงิน',
      },
    },
  };


  return (
    <Layout>
<div className="site-card-wrapper">
    <Row gutter={16}>
      <Col span={8}>
        <Card title="ยอดรวม" bordered={false}>
          <p style={{color:"#EF8355" , fontSize: 50}}>฿ 5,670.00</p>
        </Card>
      </Col>
      <Col span={16}>
        <Card title="ช่วงเวลา (24 ชั่วโมง)" bordered={false}>
        <Line {...configLine}/>
        </Card>
        <Card title="สินค้าขายดี 5 อันดับ" bordered={false}>
        <Column {...configColumn}/>
        </Card>
      </Col>
      
      </Row>
  </div> 
    </Layout>
  )
}

export default Dashboards