import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom"
import loginbg from '../../assets/loginbg.jpg'; 
import Loading from '../../components/Loading/Loading';
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from '../../actions/auth.actions';

const Login = () => {

  const [credentials, setCredentials] = useState({
    username:"",
    password:""
  })

  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.auth);
  const { loading = false, userInfo } = userLogin || {};  
  
  const userRef = useRef(null);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus(); // Focus on the input field
    }
  }, []);


  const handleInputChange = (e) => {
        setCredentials({...credentials,[e.target.name]:e.target.value})
  }

const handleUserLogin = async (e) => {
     e.preventDefault();
     console.log("Login credentials:", credentials); // Log the credentials

     dispatch(LOGIN({credentials,navigate}))
}

if (loading) {
  // Show the loading spinner when loading is true
  return <Loading />;
}
  return (
    <div
      className='flex items-center justify-center min-h-screen bg-cover bg-no-repeat bg-center'
      style={{ backgroundImage: `url(${loginbg})` }}
    >
      <div className='w-full max-w-md p-8 rounded-lg shadow-lg bg-gray-100 bg-opacity-10 backdrop-blur-md'>
        <h1 className='text-3xl font-semibold text-center text-gray-300 mb-6'>
          Login
          <span className='text-blue-700 ml-2'>Teressa Memorial HSS</span>
        </h1>
        
        <form onSubmit={handleUserLogin}>
          <div className='mb-4'>
            <label className='label p-2'>
              <span className='text-base label-text text-gray-200'>Username</span>
            </label>
            <input
              type='text'
              placeholder='Enter username'
              className='w-full input-bordered h-10 px-3 rounded-md bg-gray-200 text-black'
              ref={userRef}
              onChange={handleInputChange}
              name="username"
            />
          </div>
          <div className='mb-4'>
            <label className='label p-2'>
              <span className='text-base label-text text-gray-200'>Password</span>
            </label>
            <input
              type='password'
              placeholder='Enter password'
              className='w-full input-bordered h-10 px-3 rounded-md bg-gray-200 text-black'
              onChange={handleInputChange}
              name='password'
            />
          </div>
          <div>
            <button className='btn btn-block btn-sm mt-4 bg-blue-800 text-white rounded-lg py-2'>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
