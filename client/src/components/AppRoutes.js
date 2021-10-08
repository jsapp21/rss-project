/* eslint-disable import/no-cycle */
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Users from './User';
import Menu from './Menu';
import Dashboard from './Dashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path=":id" element={<Menu />} />
      <Route path="menu/*" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;
