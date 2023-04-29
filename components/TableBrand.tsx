import { Brand } from '@/interfaces';
import AddBrand from './brand/AddBrand';
import EditBrand from './brand/EditBrand';
import DeleteBrand from './brand/DeleteBrand';

const TableProduct = ({ brands }: { brands: Brand[] }) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-row justify-between items-center'>
        <h1 className='text-2xl'>Brands</h1>
        <AddBrand />
      </div>
      <table className='table w-full min-w-[32rem]'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th className='text-center'>Action</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand, index) => (
            <tr key={brand._id}>
              <td>{index + 1}</td>
              <td>{brand.name}</td>
              <td className='flex flex-row justify-center items-center gap-4'>
                <EditBrand brand={brand} />
                <DeleteBrand brand={brand} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableProduct;
