/* eslint-disable prettier/prettier */
/* eslint-disable import/no-cycle */
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// import Home from './Home';
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

// user
// localhost3000/users

// localhost3000/user/:id/menu/:id/order

// menu
// localhost3000/menus/
// localhost3000/menus/:id

// items
// localhost3000/items/:id
