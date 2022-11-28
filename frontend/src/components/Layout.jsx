import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
import {

  ShopOutlined,
  HomeOutlined,
  UserSwitchOutlined,
  HistoryOutlined,
  LogoutOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import './layout.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from './Spinner';

const { Header, Sider, Content } = Layout;

const LayoutApp = ({children}) => {
  const {cartItems, loading} = useSelector(state => state.rootReducer);

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems]);

  

  return (
    <Layout

    style={{
      minHeight: '100vh',
    }}
  >
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo">
            <h2 className="logo-title">Bake@Dome</h2>
        </div>
      <Menu theme="dark" defaultSelectedKeys={window.location.pathname} mode="inline"  >
           <Menu.Item key='/dashboards' icon={<BarChartOutlined />}>
                <Link to="/dashboards">แดชบอร์ด</Link>
            </Menu.Item>
            <Menu.Item key='/' icon={<ShopOutlined />}>
                <Link to="/">หน้าขาย</Link>
            </Menu.Item>
            <Menu.Item key='/bills' icon={<HistoryOutlined />}>
                <Link to="/bills">ประวัติการขาย</Link>
            </Menu.Item>
            <Menu.Item key="/products" icon={<HomeOutlined />}>
                <Link to="/products">สต็อก</Link>
            </Menu.Item>
            <Menu.Item key='/employees' icon={<UserSwitchOutlined />}>
                <Link to="/employees">พนักงาน</Link>
            </Menu.Item>
            <Menu.Item key='/logout' icon={<LogoutOutlined />} onClick={() => {localStorage.removeItem("authToken"); navigate("/login");}}>
                ออกจากระบบ
            </Menu.Item>
      </Menu>
    </Sider>
    <Layout className="site-layout">
      <Header className="site-layout-background" style={{ padding: 0}}>
      </Header>
      <Content style={{ margin: '0 16px'  }}>
        <Breadcrumb style={{  margin: '16px 0'  }}>
          <Breadcrumb.Item>หน้าแรก</Breadcrumb.Item>

          <Breadcrumb.Item>
            {window.location.pathname === "/" ? "หน้าขาย" : window.location.pathname === "/products" ? "สต็อก" : window.location.pathname === "/employees" ? "พนักงาน" : window.location.pathname === "/bills" ? "ประวัติการขาย" : window.location.pathname === "/dashboards" ? "แดชบอร์ด" : ""}
          </Breadcrumb.Item>
        </Breadcrumb>
        <div style={{padding: 24, minHeight: 360}}>
          {loading ? <Spinner /> : children}
        </div>
      </Content>
    </Layout>

  </Layout>
  );
};

export default LayoutApp;