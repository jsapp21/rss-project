/* eslint-disable prettier/prettier */
/* eslint-disable import/no-cycle */
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './Home';
import Users from './Users';
import Menus from './Menus';
import Dashboard from './Dashboard';
import OrderContainer from '../containers/OrderContainer';
import ReportsContainer from '../containers/ReportsContainer';
import ItemForm from './ItemForm';
import NotFound from './NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
        <Route path="users" element={<Users />}>
          <Route path=":userId/menus" element={<Menus />}>
            <Route path=":menuId" element={<Dashboard />}>
              <Route path="order" element={<OrderContainer />} />
              <Route path="items" element={<ItemForm />} />
              <Route path="reports" element={<ReportsContainer />} />
            </Route>
          </Route>
        </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>

    // I choose this nested way b/c I wanted some things to stay the same while you click around
    // nested routes in v6 needs an outlet. 
    // The child route is going to change based on what you click, everything else will stay the same.
    // Pro you can see all your routes in a single place,good for a small application and code readability.

    // I choose react v6 b/c it seemed to simplify react router b/c it removes the exact path
    // everything is treated w/ exact no more match.

    // Outlet tells the parnet route to render the matching childern routes
    
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
// /users/:userId/menus/:menuId/order
