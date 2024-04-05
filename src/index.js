import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';
import { SoldProductsProvider } from './contexts/revenuecontext';
import { AuthContextProvider } from "./contexts/AuthContext";
import { ProductsProvider } from './contexts/Productcountcontext';
import { CustomerProvider } from './contexts/CustomerContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SoldProductsProvider>
        <CustomerProvider>
          <ContextProvider>
          <ProductsProvider>
            <App />
            </ProductsProvider>
          </ContextProvider>
          </CustomerProvider>
      </SoldProductsProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);