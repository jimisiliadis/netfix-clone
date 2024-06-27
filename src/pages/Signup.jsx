import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';


function Signup() {

  const [rememberLogin, setRememberLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {user, signUp} = UserAuth();

  const navigate = useNavigate();

  const handleFromSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await signUp(email, password);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div className='w-full h-screen'>
      <img 
        className='hidden sm:block absolute w-full h-full object-cover'
        src="https://assets.nflxext.com/ffe/siteui/vlv3/7ca5b7c7-20aa-42a8-a278-f801b0d65fa1/efd52ccd-0212-4d90-89c5-e45ff45bb0b0/GR-el-20240326-popsignuptwoweeks-perspective_alpha_website_large.jpg" 
        alt="///" 
      />

      <div className='fixed bg-black/70 top-0 left-0 w-full h-screen' />

      <div className='fixed w-full px-4 py-24 z-20'>
        <div className='max-w-[450px] h-[600px] mx-auto bg-black/60 rounded-2xl'>
          <div className='max-w-[320px] mx-auto py-16'>
            <h1 className='text-3xl font-nsans-bold items-center justify-center'>Sign Up</h1>

            <form onSubmit={handleFromSubmit} className='w-full flex flex-col py-4'>
                <input 
                    type="email" 
                    placeholder='email'
                    autoComplete='email' 
                    className='p-3 my-2 bg-gray-700 rounded'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                    type="passworf" 
                    placeholder='password' 
                    autoComplete='current-password'
                    className='p-3 my-2 bg-gray-700 rounded'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button className='my-6 bg-red-600 py-3 rounded font-nsans-bold'>
                  Sign Up
                </button>

                <div className='flex justify-between items-center text-gray-600'>
                  <p>
                    <input 
                        type="checkbox" 
                        className='mr-2' 
                        checked={rememberLogin} 
                        onChange={(e) => setRememberLogin(!rememberLogin)}
                    />
                    Remember Me
                  </p>
                  <p>Need Help?</p>
                </div>
                <p className='my-4'>
                  <span className='text-gray-600 mr-2'>Already subsrcibed to Netflix?</span>
                  <Link to="/Login">Sign In </Link>
                </p>

            </form>
          </div>
        </div>
      </div>
       
    </div>
  )
}

export default Signup
