import React from 'react';
import { useForm } from 'react-hook-form';
import MainLayout from '../Components/Layout/MainLayout';
import { useAddProductMutation } from '../features/Product/productApi';


const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [addProduct, { isLoading, isSuccess, isError, error }] = useAddProductMutation();

const onSubmit = async (data) => {
  const formData = new FormData();
  formData.append('SKU', data.SKU);
  formData.append('Name', data.Name);
  formData.append('Description', data.Description || '');
  formData.append('Price', data.Price);
  formData.append('isAvailable', data.isAvailable ? 'true' : 'false');
  formData.append('CategoryId', data.CategoryId);
  if (data.Image && data.Image[0]) {
    formData.append('Image', data.Image[0]);
  }

  try {
    await addProduct(formData).unwrap();
    alert('Product added successfully');
    reset(); // Reset form fields
    // Optionally: reset form or redirect
  } catch (err) {
    console.error('Add product failed:', err);
    alert('Failed to add product');
  }
};

  return (
    <MainLayout>
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Add Product</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div>
            <label>SKU</label>
            <input
              type="text"
              {...register('SKU', { required: true, minLength: 3, maxLength: 20 })}
              className="w-full border p-2 rounded"
            />
            {errors.SKU && <p className="text-red-500">SKU is required (3–20 chars).</p>}
          </div>

          <div>
            <label>Name</label>
            <input
              type="text"
              {...register('Name', { required: true, minLength: 3, maxLength: 100 })}
              className="w-full border p-2 rounded"
            />
            {errors.Name && <p className="text-red-500">Name is required (3–100 chars).</p>}
          </div>

          <div>
            <label>Description</label>
            <textarea
              {...register('Description', { maxLength: 500 })}
              className="w-full border p-2 rounded"
            />
            {errors.Description && <p className="text-red-500">Max 500 characters.</p>}
          </div>

          <div>
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
            {errors.Price && <p className="text-red-500">Valid price required (0.01 – 999999.99).</p>}
          </div>

          <div>
            <label>Is Available</label>
            <input
              type="checkbox"
              defaultChecked
              {...register('isAvailable')}
              className="ml-2"
            />
          </div>

          <div>
            <label>Category</label>
            <select
              {...register('CategoryId', { required: true })}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Category</option>
              <option value="1">Electronics</option>
              <option value="2">Apparel</option>
              {/* Replace with dynamic category list */}
            </select>
            {errors.CategoryId && <p className="text-red-500">Category is required.</p>}
          </div>

          <div>
            <label>Image</label>
            <input
              type="file"
              accept="image/*"
              {...register('Image')}
              className="w-full"
            />
          </div>

          <button
  type="submit"
  disabled={isLoading}
  className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
>
  {isLoading ? 'Submitting...' : 'Submit'}
</button>

        </form>
      </div>
    </MainLayout>
  );
};

export default AddProduct;
