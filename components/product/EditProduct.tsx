import * as React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Brand, Product } from '@/interfaces';
import Alert from '../Alert';
import { getToken } from '../Layout';

const EditProduct = ({
  product,
  brands,
}: {
  product: Product;
  brands: Brand[];
}) => {
  const [name, setName] = React.useState(product.name);
  const [price, setPrice] = React.useState(product.price);
  const [brandId, setBrandId] = React.useState(product.brand._id);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const token = await getToken();
      await axios.put(
        `http://localhost:5000/api/products/${product._id}`,
        {
          name,
          price,
          brand: brandId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setName('');
      setPrice(0);
      setBrandId('');
      router.refresh();
      setIsLoading(false);
      setIsOpen(false);
    } catch (error: any) {
      setIsError(true);
      setErrorMessage(error.response.data.message);
      setIsLoading(false);
      setTimeout(() => setIsError(false), 5000);
    }
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        type='button'
        className='btn btn-warning btn-sm'
        onClick={handleModal}>
        Edit
      </button>
      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className='modal-box relative'>
          <button
            onClick={handleModal}
            className='btn btn-sm btn-circle absolute right-2 top-2'>
            ✕
          </button>
          <h3 className='text-lg font-bold'>Edit Product</h3>
          {isError && <Alert message={errorMessage} />}
          <form onSubmit={handleSubmit} className='flex flex-col mt-4 gap-4'>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Product Name'
              className='input input-bordered w-full'
              required
            />
            <input
              type='number'
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder='Price'
              className='input input-bordered w-full'
              required
            />
            <select
              value={brandId}
              onChange={(e) => setBrandId(e.target.value)}
              className='select select-bordered w-full'
              required>
              {brands.map((brand: any) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </select>
            <div className='form-control w-full mt-4'>
              <button type='submit' className='btn btn-primary w-full'>
                {isLoading ? 'Updating...' : 'Update'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
