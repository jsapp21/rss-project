import { useRoutes } from 'react-router-dom';

import App from './App';
import Users from './components/Users';
import Menu from './components/Menus';
import Dashboard from './components/Dashboard';
import ItemForm from './components/ItemForm';
import OrderContainer from './containers/OrderContainer';
import ReportsContainer from './containers/ReportsContainer';

const router = useRoutes([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'users',
    element: <Users />,
    children: [{ path: ':id', element: <Menu /> }],
  },
  {
    path: 'menus',
    element: <Menu />,
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
]);

export default router;
