import * as React from 'react';
import axios from 'axios';
import { Brand } from '@/interfaces';
import { getToken } from '@/components/Layout';
import Layout from '@/components/Layout';
import TableBrand from '@/components/TableBrand';

const BrandPage = () => {
  const [brands, setBrands] = React.useState<Brand[]>([]);

  React.useEffect(() => {
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
    getBrands();
  }, []);

  return (
    <Layout>
      <TableBrand brands={brands} />
    </Layout>
  );
};

export default BrandPage;
