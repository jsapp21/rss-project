/* eslint-disable prettier/prettier */
/* eslint-disable import/no-cycle */
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Users from './User';
import Menu from './Menu';
import Dashboard from './Dashboard';
import OrderContainer from '../containers/OrderContainer';
import ReportsContainer from '../containers/ReportsContainer';
import ItemForm from './ItemForm';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path=":userid" element={<Menu />} />

      <Route path=":userid/:meunid/" element={<Dashboard />}>
        <Route path="order" element={<OrderContainer />} />
        <Route path="items" element={<ItemForm />} />
        <Route path="reports" element={<ReportsContainer />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

// TIA Route Design Pattern
// /<type>/<identifer?>/<action?>

// users - <type> plural form

// user - uniquie id - <identifier>
// /users/:id

// user <action>


// Nested Routes - nest entites that are related
// <Type>/<Identifier?>/<Type>/<Identifier?>/<Action?>
// /users/:id/menus/:id/order