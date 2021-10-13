/* eslint-disable prettier/prettier */
/* eslint-disable import/no-cycle */
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// import Home from './Home';
import Users from './Users';
import Menus from './Menus';
import Dashboard from './Dashboard';
import OrderContainer from '../containers/OrderContainer';
import ReportsContainer from '../containers/ReportsContainer';
import ItemForm from './ItemForm';
import NotFound from './NotFound';

const AppRoutes = () => {
  return (
    // NESTED ROUTES:
    // <Routes>
    //   <Route path="/" element={<Home />} />
    //     <Route path="users" element={<Users />}>
    //       <Route path=":userId/menus" element={<Menus />}>
    //         <Route path=":menuId" element={<Dashboard />}>
    //           <Route path="order" element={<OrderContainer />} />
    //           <Route path="items" element={<ItemForm />} />
    //           <Route path="reports" element={<ReportsContainer />} />
    //         </Route>
    //       </Route>
    //     </Route>
    //   <Route path="*" element={<NotFound />} />
    // </Routes>

  // 1 NESTED ROUTE - you lose the user and menu components
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="users/:userId/menus" element={<Menus />} />
      <Route path="users/:userId/menus/:menuId" element={<Dashboard />}>
        <Route path="order" element={<OrderContainer />} />
        <Route path="items" element={<ItemForm />} />
        <Route path="reports" element={<ReportsContainer />} />
      </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>

    // is there a way to do this w/out 4 levels of nesting? keeping the same path.
    // users/:userId/menus/:menuId/

    // I choose react v6 b/c it seemed to simplify react router and it removes the exact path.
    // Nested routes in v6 needs requires an outlet and it renders the child route.
    // Outlet tells the parent route to render the matching childern routes.
    // I choose this nested way b/c I wanted some components to stay on the page while you click around.
    // The child route is going to change based on what you click.
    // Pro you can see all your routes in a single place, good for a small application and code readability.
  );
};

export default AppRoutes;
