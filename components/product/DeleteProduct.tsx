import * as React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Product } from '@/interfaces';
import { getToken } from '../Layout';

const DeleteProduct = ({ product }: { product: Product }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const handleDelete = async (productId: string) => {
    const token = await getToken();
    setIsLoading(true);
    await axios.delete(`http://localhost:5000/api/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setIsLoading(false);
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        type='button'
        className='btn btn-error btn-sm'
        onClick={handleModal}>
        Delete
      </button>
      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>
            Are you sure to delete {product.name}?
          </h3>
          <div className='modal-action'>
            <button type='button' className='btn' onClick={handleModal}>
              No
            </button>
            <button
              type='button'
              className='btn btn-primary'
              onClick={() => handleDelete(product._id)}>
              {isLoading ? 'Deleting...' : 'Yes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
