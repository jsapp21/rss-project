/* eslint-disable react/react-in-jsx-scope */
// import { useRoutes } from 'react-router-dom';

import App from './App';
import Users from './components/Users';
import Menus from './components/Menus';
import Dashboard from './components/Dashboard';
import ItemForm from './components/ItemForm';
import OrderContainer from './containers/OrderContainer';
import ReportsContainer from './containers/ReportsContainer';
import SelectedUser from './components/SelectedUser';

const routes = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'users',
    element: <Users />,
    children: [
      { path: ':id', element: <SelectedUser /> },
      { path: ':id', element: <SelectedUser /> },
    ],
  },
  {
    path: 'menus',
    element: <Menus />,
    children: [{ path: ':id', element: <Dashboard /> }],
  },
  {
    path: 'dashboard',
    element: <Dashboard />,
    children: [
      { path: 'order', element: <OrderContainer /> },
      { path: 'items', element: <ItemForm /> },
      { path: 'reports', element: <ReportsContainer /> },
    ],
  },
];

export default routes;
