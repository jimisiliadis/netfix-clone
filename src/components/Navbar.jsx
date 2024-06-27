import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

function Navbar() {

  const {user, logOut} = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='absolute w-full p-4 flex items-center justify-between z-50'>
      <Link to='/'>
        <h1 className='uppercase text-red-600 cursor-pointer text-5xl'>
            netflix
        </h1>
      </Link>

      {
        user?.email ? (
          
          <div>
            <Link to='/profile'>
              <button className='capitalize pr-4'>
                Profile
              </button>
            </Link>
              <button onClick={handleLogout} className='capitalize bg-red-600 px-6 py-2 rounded cursor-pointer'>
                Logout
              </button>
          </div>
        ) : (
          <div>
            <Link to='/Login'>
                <button className='capitalize pr-4 sm:h-[25px]'>Login</button>
            </Link>
    
            <Link to='/Signup'>
                <button className='capitalize bg-red-600 px-6 py-2 rounded cursor-pointer'>Sign up</button>
            </Link>
          </div>
        )
      }

    </div>
  )
}

export default Navbar
