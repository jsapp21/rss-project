/* eslint-disable import/named */
/* eslint-disable no-debugger */
/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
import React, { useState, createContext } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { useFetch } from '../hooks/useFetch';

export const MenuItemsContext = createContext();

const Dashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const { data, setData, error } = useFetch(`/items/610dc53368fd6b5bd0a7b699`);
  if (error) return <h1>{error}</h1>;

  console.log(location, 'dashboard');

  return (
    <>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{ float: 'left' }}>
        Options
      </Button>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose} id="Order">
          <Link to="order">Order</Link>
        </MenuItem>
        <MenuItem onClick={handleClose} id="Menu Options">
          <Link to="items">Menu Options</Link>
        </MenuItem>
        <MenuItem onClick={handleClose} id="Reports">
          <Link to="reports">Reports</Link>
        </MenuItem>
        <MenuItem onClick={handleClose} id="Reports">
          <Link to="/">Switch User</Link>
        </MenuItem>
      </Menu>

      <div>
        <MenuItemsContext.Provider value={{ data, setData }}>
          <Outlet />
        </MenuItemsContext.Provider>
      </div>
    </>
  );
};

export default Dashboard;
