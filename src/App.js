import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Ecommerce, Products } from './pages';
import Soldproductschart from './pages/Soldproducts.chart';
import Topsellingproductsgrid from './pages/Topsellingproducts';
import Categorychart from './pages/Categorychart';
import { AuthContext } from './contexts/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductUpdate from './pages/UpdateProduct';
import CustomerDetails from './pages/CustomerDetails';
import AddProduct from './pages/Addproduct';
import Subcategory from './pages/Subcategory';
import Order from './pages/Order';
import Scheduler from './pages/Calendar';
import Countrymap from './pages/CountryMap';
import ViewProduct from './pages/ViewProduct';
import './App.css'

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);


  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/dashboard" element={<Ecommerce />} />
            <Route path="/Topsellingproducts" element={<Topsellingproductsgrid />} />
            <Route exact path="/customerdetails" element={<CustomerDetails />} />
            <Route path="/revenue" element={<Soldproductschart />} />
            <Route path="/category" element={<Categorychart />} />
            <Route path="/subcategory" element={<Subcategory />} />
            <Route path="/order" element={<Order />} />
            <Route path="/countries" element={<Countrymap />} />
            <Route path="/events" element={<Scheduler />} />
            <Route path="/products/addproduct" element={<AddProduct />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productName/view" element={<ViewProduct />} /> 
            <Route path="/products/:productName/update" element={<ProductUpdate />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
