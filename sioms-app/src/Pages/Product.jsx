import React, { useState } from 'react';
import MainLayout from '../Components/Layout/MainLayout';
import { useSearchProductsQuery } from '../features/Product/productApi';
import Table from '../Components/Table';
import { useNavigate } from 'react-router-dom';

const Product = () => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 3;

  const { data, isLoading, isError } = useSearchProductsQuery({ pageNumber, pageSize });

  const headers = ['Name', 'Category', 'Price'];

  const tableData = data?.items.map(product => ({
    name: product.name,
    category: product.categoryName,
    price: `₹ ${product.price}`,
  })) || [];

  return (
    <MainLayout>
      <div className="p-6 min-h-screen bg-gray-50">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Product Management</h1>
          <button
            onClick={() => navigate('/product/addproduct')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-sm transition-all"
          >
            + Add Product
          </button>
        </div>

        {isLoading && <p className="text-gray-600">Loading...</p>}
        {isError && <p className="text-red-600">Error loading products.</p>}

        {data && (
          <>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <Table
                headers={headers}
                data={tableData}
                actions={true}
                onEdit={(product) => console.log('Edit', product)}
                onDelete={(product) => console.log('Delete', product)}
              />
            </div>

            <div className="flex justify-between items-center mt-6">
              <button
                className="px-5 py-2 bg-blue-500 text-white rounded-md disabled:bg-blue-200"
                onClick={() => setPageNumber(prev => Math.max(1, prev - 1))}
                disabled={pageNumber === 1}
              >
                Prev
              </button>
              <span className="text-gray-700 font-medium">Page {pageNumber}</span>
              <button
                className="px-5 py-2 bg-blue-500 text-white rounded-md disabled:bg-blue-200"
                onClick={() => setPageNumber(prev => prev + 1)}
                disabled={data.items.length < pageSize}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Product;
