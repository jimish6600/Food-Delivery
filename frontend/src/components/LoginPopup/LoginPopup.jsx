import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios"

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState('Login');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const {setToken} = useContext(StoreContext);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    console.log(data);
  };

  const onLogin = async(event) => {
    event.preventDefault();
    let newUrl = import.meta.env.VITE_BACKEND_URL;
    
    console.log(newUrl);
    if(currState==="Login"){
      newUrl += "/api/user/login";
    }else{
      newUrl += "/api/user/register";
    }
    console.log(newUrl)
    const response = await axios.post(newUrl,data);

    if(response.data.success) {
      console.log(response.data.token)
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token);
      setShowLogin(false);
    }else{
      alert(response.data.message);
    }
  }

  return (
    <div className='login-popup'>
      <form className='login-popup-container' onSubmit={onLogin}>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt='close' />
        </div>
        <div className='login-popup-inputs'>
          {currState === 'Login' ? null : (
            <input
              onChange={onChangeHandler}
              name='name'
              value={data.name}
              type='text'
              placeholder='Your Name'
              required
            />
          )}
          <input
            onChange={onChangeHandler}
            name='email'
            value={data.email}
            type='email'
            placeholder='Your Email'
            required
          />
          <input
            onChange={onChangeHandler}
            name='password'
            value={data.password}
            type='password'
            placeholder='Password'
            required
          />
        </div>
        <button type='submit'>
          {currState === 'Sign Up' ? 'Create account' : 'Login'}
        </button>
        <div className='login-popup-condition'>
          <input type='checkbox' required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === 'Login' ? (
          <p>
            Create a new account?{' '}
            <span onClick={() => setCurrState('Sign Up')}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <span onClick={() => setCurrState('Login')}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
