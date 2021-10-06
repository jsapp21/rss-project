/* eslint-disable import/named */
/* eslint-disable no-debugger */
/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
import React, { useEffect, useState, createContext, useReducer } from 'react';
import { Route, Switch, useHistory, Link } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@material-ui/core';
import ReportsContainer from './ReportsContainer';
import OrderContainer from './OrderContainer';
import ItemForm from './ItemForm';
import { dashboardReducer, initialState } from '../hooks/dashboardReducer';

export const MenuItemsContext = createContext();

const Dashboard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [state, dispatch] = useReducer(dashboardReducer, initialState);
  const { menuItemsPage, orderPage, reportPage } = state;
  const getId = localStorage.getItem('menuId');
  const menuId = JSON.parse(getId);
  const history = useHistory();

  useEffect(() => {
    fetch(`/items/${menuId}`)
      .then((res) => res.json())
      .then((menuItems) => {
        setMenuItems(menuItems);
      });
  }, [menuId]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    if (e.currentTarget.id === 'Order') {
      history.push('/order');
    } else if (e.currentTarget.id === 'Add Menu Item') {
      history.push('/items');
    } else if (e.currentTarget.id === 'Reports') {
      history.push('/reports');
    }
    setAnchorEl(null);
  };

  return (
    <>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{ float: 'left' }}>
        Options
      </Button>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose} id="Order">
          <Link to="/order">Order</Link>
        </MenuItem>
        <MenuItem onClick={handleClose} id="Menu Options">
          <Link to="/items">Menu Options</Link>
        </MenuItem>
        <MenuItem onClick={handleClose} id="Reports">
          <Link to="/reports">Reports</Link>
        </MenuItem>
      </Menu>

      <Switch>
        <Route path="/order">
          <MenuItemsContext.Provider value={{ menuItems, setMenuItems }}>
            <OrderContainer />
          </MenuItemsContext.Provider>
        </Route>
        <Route path="/items">
          <MenuItemsContext.Provider value={{ menuItems, setMenuItems, menuItemsPage }}>
            <ItemForm />
          </MenuItemsContext.Provider>
        </Route>
        <Route path="/reports">
          <ReportsContainer />
        </Route>
      </Switch>
    </>
  );
};

export default Dashboard;
