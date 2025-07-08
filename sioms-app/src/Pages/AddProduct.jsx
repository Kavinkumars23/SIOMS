import React from 'react';
import MainLayout from '../Components/Layout/MainLayout';

const AddProduct = () => {
  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Add Product</h1>
        <p>This page will contain the form to add a new product.</p>
      </div>
    </MainLayout>
  );
};

export default AddProduct;
