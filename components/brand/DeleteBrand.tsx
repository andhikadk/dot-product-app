import * as React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Brand } from '@/interfaces';
import { getToken } from '../Layout';
import Alert from '../Alert';

const DeleteBrand = ({ brand }: { brand: Brand }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const handleDelete = async (brandId: string) => {
    const token = await getToken();
    setIsLoading(true);
    await axios.delete(`http://localhost:5000/api/brands/${brandId}`, {
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
          <h3 className='font-bold text-lg mb-4'>
            Are you sure to delete {brand.name}?
          </h3>
          <Alert message='All products with this brand will be deleted' />
          <div className='modal-action'>
            <button type='button' className='btn' onClick={handleModal}>
              No
            </button>
            <button
              type='button'
              className='btn btn-primary'
              onClick={() => handleDelete(brand._id)}>
              {isLoading ? 'Deleting...' : 'Yes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBrand;
