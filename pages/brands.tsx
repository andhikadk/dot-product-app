import * as React from 'react';
import axios from 'axios';
import { Brand } from '@/interfaces';
import { getToken } from '@/components/Layout';
import Layout from '@/components/Layout';
import TableBrand from '@/components/TableBrand';

const BrandPage = () => {
  const [brands, setBrands] = React.useState<Brand[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);

  React.useEffect(() => {
    const getProfile = async () => {
      try {
        const token = await getToken();
        const res = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.user.role === 'admin') {
          setIsAdmin(true);
        }
        setLoading(false);
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
    getProfile();
    getBrands();
  }, []);

  return (
    <Layout>
      {loading ? (
        <div>Loading...</div>
      ) : isAdmin ? (
        <TableBrand brands={brands} />
      ) : (
        <h1>You are not authorized to access this page</h1>
      )}
    </Layout>
  );
};

export default BrandPage;
