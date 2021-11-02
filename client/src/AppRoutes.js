/* eslint-disable prettier/prettier */
/* eslint-disable import/no-cycle */
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Users from './components/Users';
import Menus from './components/Menus';
import Dashboard from './components/Dashboard';
import OrderContainer from './containers/OrderContainer';
import ReportsContainer from './containers/ReportsContainer';
import ItemsContainer from './containers/ItemsContainer';
import NotFound from './components/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="users/:userId/menus" element={<Menus />} />
      <Route path="users/:userId/menus/:menuId" element={<Dashboard />}>
        <Route path="order" element={<OrderContainer />} />
        <Route path="items" element={<ItemsContainer />} />
        <Route path="reports" element={<ReportsContainer />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
