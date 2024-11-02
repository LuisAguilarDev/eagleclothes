import Home from './pages/Home';
import { Login } from './pages/Login';
import { Route, Routes } from 'react-router-dom';
import UserpanelF from './pages/Userpanel_Favorites';
import Detail from './pages/Detail';
import ShoppingCart from './pages/ShoppingCart';
import { Validate } from './pages/Validate';
import Address from './pages/Address';
import AddAddress from './pages/AddAddress';
import OrderConfirm from './pages/OrderConfirm';
import Orders from './pages/Orders';
import Forgot from './pages/ForgotPassword';
import Reset from './pages/Reset';
import Search from './pages/search';
import Help from './pages/Help';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/help" element={<Help />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user/validate" element={<Validate />} />
      <Route path="/user/:name/favorites" element={<UserpanelF />} />
      <Route path="/user/:name/shopping_cart" element={<ShoppingCart />} />
      <Route path="/user/:name/address" element={<Address />} />
      <Route path="/user/:name/addAddress" element={<AddAddress />} />
      <Route path="/user/:name/orders" element={<Orders />} />
      <Route path="/detail/:itemCode" element={<Detail />} />
      <Route path="/search" element={<Search />} />
      <Route path="/orderConfirm" element={<OrderConfirm />} />
      <Route path="/forgotPassword" element={<Forgot />} />
      <Route path="/resetPassword" element={<Reset />} />
    </Routes>
  );
}

export default App;
