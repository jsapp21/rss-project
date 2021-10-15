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
    // 1 NESTED ROUTE
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

    // NESTED ROUTES:
    // <Routes>
    //   <Route path="/" element={<Home />} />
    //     <Route path="users" element={<Users />}>
    //       <Route path=":userId/menus" element={<Menus />}>
    //         <Route path=":menuId" element={<Dashboard />}>
    //           <Route path="order" element={<OrderContainer />} />
    //           <Route path="items" element={<ItemsContainer />} />
    //           <Route path="reports" element={<ReportsContainer />} />
    //         </Route>
    //       </Route>
    //     </Route>
    //   <Route path="*" element={<NotFound />} />
    // </Routes>
  );
};

export default AppRoutes;

// is there a way to do this w/out 4 levels of nesting? keeping the same path.
// users/:userId/menus/:menuId/

// I choose react v6 b/c it seemed to simplify react router and it removes the exact path.
// Nested routes in v6 needs requires an outlet and it renders the child route.
// Outlet tells the parent route to render the matching childern routes.
// I choose this nested way b/c I wanted some components to stay on the page while you click around.
// The child route is going to change based on what you click.
// Pro you can see all your routes in a single place, good for a small application and code readability.
