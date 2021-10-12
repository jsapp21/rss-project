import React from 'react';
import { Outlet } from 'react-router-dom';

import { Typography, Container } from '@material-ui/core';

const Home = () => {
  return (
    <Container maxWidth="lg" style={{ margin: '20px auto' }}>
      <Typography variant="h3" component="h3" style={{ float: 'left' }}>
        🍳 Simple POS
      </Typography>
      <Outlet />
    </Container>
  );
};

export default Home;
