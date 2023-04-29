import Link from 'next/link';
import router from 'next/router';
import axios from 'axios';

const Header = ({ name }: any) => {
  const handleLogout = async () => {
    try {
      await axios.delete('http://localhost:5000/api/logout');
      router.push('/auth/login');
    } catch (error: any) {}
  };

  return (
    <header className='navbar bg-base-100 sticky top-0'>
      <div className='navbar-start'>
        <a className='btn btn-ghost normal-case text-xl'>HEADER</a>
      </div>
      <div className='navbar-center'>
        <div className='items-stretch hidden lg:flex'>
          <Link href='/'>
            <button className='btn btn-ghost'>Home</button>
          </Link>
          <Link href='/brands'>
            <button className='btn btn-ghost'>Brand</button>
          </Link>
        </div>
      </div>
      <div className='navbar-end'>
        <div className='dropdown dropdown-end'>
          <label tabIndex={0} className='btn btn-ghost justify-center'>
            Welcome back, {name}
          </label>
          <ul
            tabIndex={0}
            className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52'>
            <li>
              <a className='justify-between'>
                Profile
                <span className='badge'>New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
