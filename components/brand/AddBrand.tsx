import * as React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Alert from '../Alert';
import { getToken } from '@/components/Layout';

const AddBrand = () => {
  const [name, setName] = React.useState('');
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
      await axios.post(
        'http://localhost:5000/api/brands',
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setName('');
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
      <button type='button' className='btn btn-primary' onClick={handleModal}>
        Add Brand
      </button>
      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className='modal-box relative'>
          <button
            onClick={handleModal}
            className='btn btn-sm btn-circle absolute right-2 top-2'>
            ✕
          </button>
          <h3 className='text-lg font-bold'>Add Product</h3>
          {isError && <Alert message={errorMessage} />}
          <form onSubmit={handleSubmit} className='flex flex-col mt-4 gap-4'>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Brand Name'
              className='input input-bordered w-full'
              required
            />
            <div className='form-control w-full mt-4'>
              <button type='submit' className='btn btn-primary w-full'>
                {isLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBrand;
