import React, { createContext, useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import axios from 'axios';

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/product");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const calculateTotalProducts = () => {
    return products.length;
  };

  const downloadProductsData = () => {
    const csvData = [
      'productName,brandName,productDescription,productPrice,stocks,category,subcategory,offeredPrice,offerName',
      ...products.map(product => (
        `"${product.productName}","${product.brandName}","${product.productDescription}","${product.productPrice}","${product.stocks}","${product.category}","${product.subcategory}","${product.offeredPrice}","${product.offerName}"`
      )),
    ].join('\n');
  
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  
    saveAs(blob, 'products_data.csv');
  };
  
  return (
    <ProductsContext.Provider value={{ products, calculateTotalProducts, downloadProductsData }}>
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsContext, ProductsProvider };