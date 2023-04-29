import { Brand } from '@/interfaces';

const TableBrand = ({ brands }: { brands: Brand[] }) => {
  return (
    <div className='overflow-x-auto'>
      <table className='table w-full'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Adidas</td>
            <td className='flex gap-4'>
              <button className='btn btn-sm btn-warning'>Edit</button>
              <button className='btn btn-sm btn-error'>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableBrand;
