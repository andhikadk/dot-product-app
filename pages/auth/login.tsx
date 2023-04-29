import * as React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Alert from '@/components/Alert';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const router = useRouter();

  React.useEffect(() => {
    const getToken = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/token');
        if (res.data.accessToken) router.push('/');
      } catch (error: any) {}
    };
    getToken();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });
      router.push('/');
    } catch (error: any) {
      setError(true);
      setErrorMessage(error.response.data.message);
      setTimeout(() => setError(false), 5000);
    }
  };

  return (
    <div className='flex h-screen justify-center items-center'>
      <div className='card w-96 bg-base-100 shadow-xl'>
        <div className='card-body'>
          <h2 className='text-xl text-center font-semibold'>LOGIN</h2>
          {error && <Alert message={errorMessage} />}
          <form onSubmit={handleSubmit}>
            <div className='form-control w-full max-w-xs'>
              <label className='label'>
                <span className='label-text'>Email</span>
              </label>
              <input
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='example@email.com'
                className='input input-bordered w-full max-w-xs'
              />
            </div>
            <div className='form-control w-full max-w-xs'>
              <label className='label'>
                <span className='label-text'>Password</span>
              </label>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                className='input input-bordered w-full max-w-xs'
              />
            </div>
            <div className='form-control w-full max-w-xs mt-4'>
              <button type='submit' className='btn btn-primary w-full max-w-xs'>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
