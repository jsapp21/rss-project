/* eslint-disable import/named */
/* eslint-disable no-debugger */
/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
import React, { useState, createContext } from 'react';
import { Route, Link } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@material-ui/core';
import ReportsContainer from '../containers/ReportsContainer';
import OrderContainer from '../containers/OrderContainer';
import ItemForm from './ItemForm';
import { useFetch } from '../hooks/useFetch';

export const MenuItemsContext = createContext();

const Dashboard = () => {
  // const [menuItems, setMenuItems] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuId = JSON.parse(localStorage.getItem('menuId'));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const { data, setData, error } = useFetch(`/items/${menuId}`);
  if (error) return <h1>{error}</h1>;

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
          <Link
            to={{
              pathname: '/items',
            }}>
            Menu Options
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose} id="Reports">
          <Link to="/reports">Reports</Link>
        </MenuItem>
      </Menu>
      {/* 
      <Switch>
        <Route path="/order">
          <MenuItemsContext.Provider value={{ data, setData }}>
            <OrderContainer />
          </MenuItemsContext.Provider>
        </Route>
        <Route path="/items">
          <MenuItemsContext.Provider value={{ data, setData }}>
            <ItemForm />
          </MenuItemsContext.Provider>
        </Route>
        <Route path="/reports">
          <ReportsContainer />
        </Route>
      </Switch> */}
    </>
  );
};

export default Dashboard;
