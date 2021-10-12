import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button onClick={() => navigate('users')}>Login</Button>
      <Outlet />
    </>
  );
};

export default Home;
