/* eslint-disable import/no-cycle */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import { Typography, Container } from '@material-ui/core';

import AppRoutes from './components/AppRoutes';

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
