import * as React from 'react';
import axios from 'axios';
import { getToken } from '@/components/Layout';
import { Product, Brand } from '@/interfaces';
import TableProduct from '@/components/TableProduct';
import Layout from '@/components/Layout';

export default function Home() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [brands, setBrands] = React.useState<Brand[]>([]);

  React.useEffect(() => {
    const getProduct = async () => {
      try {
        const token = await getToken();
        const res = await axios.get('http://localhost:5000/api/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(res.data);
      } catch (error: any) {}
    };
    const getBrands = async () => {
      try {
        const token = await getToken();
        const res = await axios.get('http://localhost:5000/api/brands', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBrands(res.data);
      } catch (error: any) {}
    };
    getToken();
    getProduct();
    getBrands();
  }, []);

  return (
    <Layout>
      <TableProduct products={products} brands={brands} />
    </Layout>
  );
}
