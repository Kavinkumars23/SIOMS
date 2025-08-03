import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '../Components/Layout/MainLayout';
import { useEditProductMutation } from '../features/Product/productApi';

const EditProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state || {};
  console.log('Editing product:', product);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [editProduct, { isLoading }] = useEditProductMutation();

  useEffect(() => {
    if (product) {
      setValue('id', product.id);
      setValue('SKU', product.sku);
      setValue('Name', product.name);
      setValue('Description', product.description || '');
      setValue('Price', product.price);
      setValue('isAvailable', product.isAvailable);
      setValue('CategoryId', product.categoryId);
    }
  }, [product, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('Id', data.id);
    formData.append('SKU', data.SKU);
    formData.append('Name', data.Name);
    formData.append('Description', data.Description || '');
    formData.append('Price', data.Price);
    formData.append('isAvailable', data.isAvailable);
    formData.append('CategoryId', data.CategoryId);

    // Include Image if a new one is selected
    if (data.Image && data.Image[0]) {
      formData.append('Image', data.Image[0]);
    }

    try {
      await editProduct(formData).unwrap();
      alert('Product updated successfully');
      navigate('/products');
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update product');
    }
  };

  return (
    <MainLayout>
  <div className="px-10 py-8">
    <h1 className="text-3xl font-semibold mb-6">Edit Product</h1>
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <input type="hidden" {...register('id')} />

      <div className="col-span-1">
        <label>SKU</label>
        <input
          type="text"
          {...register('SKU', { required: true, minLength: 3, maxLength: 20 })}
          className="w-full border p-2 rounded"
        />
        {errors.SKU && <p className="text-red-500 text-sm">SKU is required (3–20 chars).</p>}
      </div>

      <div className="col-span-1">
        <label>Name</label>
        <input
          type="text"
          {...register('Name', { required: true, minLength: 3, maxLength: 100 })}
          className="w-full border p-2 rounded"
        />
        {errors.Name && <p className="text-red-500 text-sm">Name is required (3–100 chars).</p>}
      </div>

      <div className="col-span-1">
        <label>Price</label>
        <input
          type="number"
          step="0.01"
          {...register('Price', {
            required: true,
            min: 0.01,
            max: 999999.99,
          })}
          className="w-full border p-2 rounded"
        />
        {errors.Price && <p className="text-red-500 text-sm">Valid price required.</p>}
      </div>

      <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <label>Description</label>
        <textarea
          {...register('Description', { maxLength: 500 })}
          className="w-full border p-2 rounded"
          rows={3}
        />
        {errors.Description && <p className="text-red-500 text-sm">Max 500 characters.</p>}
      </div>

      <div className="flex items-center gap-2 col-span-1">
        <input
          type="checkbox"
          {...register('isAvailable')}
          className="h-4 w-4"
        />
        <label>Is Available</label>
      </div>

      <div className="col-span-1">
        <label>Category</label>
        <select
          {...register('CategoryId', { required: true })}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Category</option>
          <option value="1">Electronics</option>
          <option value="2">Apparel</option>
        </select>
        {errors.CategoryId && <p className="text-red-500 text-sm">Category is required.</p>}
      </div>

      <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <label>Current Image</label>
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt="Current"
            className="w-52 h-52 object-cover rounded border shadow-md mt-2"
          />
        ) : (
          <p className="text-gray-500 italic">No image available</p>
        )}
      </div>

      <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <label>Change Image</label>
        <input
          type="file"
          accept="image/*"
          {...register('Image')}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Updating...' : 'Update Product'}
        </button>
      </div>
    </form>
  </div>
</MainLayout>

  );
};

export default EditProduct;
