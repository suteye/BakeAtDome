import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import 'antd/dist/antd.min.css';
import './App.css';
import Home from './pages/home/Home';
import Products from './pages/products/Products';
import Cart from './pages/cart/Cart';
import Login from './pages/login/Login';
import Bills from './pages/bills/Bills';
import Employees from './pages/employees/Employees';



function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={ 
            <ProtectedRouter> 
             <Home />
           </ProtectedRouter>
          }
             />
          <Route path="/products" element={
            <ProtectedRouter>
              <Products />
           </ProtectedRouter>
            } />
          <Route path="/cart" element={
            <ProtectedRouter>
              <Cart />
            </ProtectedRouter>
            } />
            <Route path="/bills" element={
            <ProtectedRouter>
              <Bills />
            </ProtectedRouter>
            } />
            <Route path="/employees" element={
             <ProtectedRouter>
              <Employees />
              </ProtectedRouter>

            } />

          <Route path="/login" element={<Login />} />
        </Routes>
    </div> 
  );
}

export default App;

export function ProtectedRouter({children}) {
  if(localStorage.getItem("authToken")) {
    return children;
  } else {
    return <Navigate to="/login" />
  }
} 
