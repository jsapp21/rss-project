/* eslint-disable import/no-cycle */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Typography, Container } from '@material-ui/core';

import AppRoutes from './AppRoutes';

const App = () => {
  return (
    <Container maxWidth="lg" style={{ margin: '20px auto' }}>
      <Typography variant="h3" component="h3" style={{ float: 'left' }}>
        🍳 Simple POS
      </Typography>
      <Router>
        <AppRoutes />
      </Router>
    </Container>
  );
};

export default App;
