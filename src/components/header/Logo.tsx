import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../../assets/images/logo.png'; 
const Logo = () => {
  const navigate = useNavigate();

  return (
    <img
      onClick={() => navigate('/')}
      alt="Logo"
      className="cursor-pointer w-32 h-auto"
      src={logoImg}
    />
  );
};

export default Logo;
