import { Brand, Product } from '@/interfaces';
import AddProduct from './product/AddProduct';
import DeleteProduct from './product/DeleteProduct';
import EditProduct from './product/EditProduct';

const TableProduct = ({
  products,
  brands,
}: {
  products: Product[];
  brands: Brand[];
}) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-row justify-between items-center'>
        <h1 className='text-2xl'>Products</h1>
        <AddProduct brands={brands} />
      </div>
      <table className='table w-full min-w-[50rem]'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Brand</th>
            <th>User</th>
            <th className='text-center'>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.brand.name}</td>
              <td>{product.user.name}</td>
              <td className='flex flex-row justify-center items-center gap-4'>
                <EditProduct product={product} brands={brands} />
                <DeleteProduct product={product} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableProduct;
