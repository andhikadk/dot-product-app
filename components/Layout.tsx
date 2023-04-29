import * as React from 'react';
import axios from 'axios';
import router from 'next/router';

import Header from './Header';

export const getToken = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/token');
    return res.data.accessToken;
  } catch (error: any) {
    router.push('/auth/login');
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const [name, setName] = React.useState('');

  React.useEffect(() => {
    const getProfile = async () => {
      try {
        const token = await getToken();
        const res = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setName(res.data.user.name);
      } catch (error: any) {}
    };
    getToken();
    getProfile();
  }, []);

  return (
    <>
      <Header name={name} />
      <main className='flex min-h-[calc(100vh-100px)] justify-center mt-8'>
        {children}
      </main>
    </>
  );
}
