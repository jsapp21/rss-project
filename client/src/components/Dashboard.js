/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
import React, { useEffect, useState, useContext, createContext } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import ReportsContainer from './ReportsContainer';
import OrderContainer from './OrderContainer';
import ItemForm from './ItemForm';
import { UserMenuContext } from '../App';

export const MenuItemsContext = createContext();

const Dashboard = () => {
  const result = useContext(UserMenuContext);
  const [menuItems, setMenuItems] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [orderPage, setOrderPage] = useState(true);
  const [menuItemsPage, setMenuItemsPage] = useState(false);
  const [reportPage, setReportPage] = useState(false);

  useEffect(() => {
    fetch(`/items/${result.menu._id}`)
      .then((res) => res.json())
      .then((menuItems) => {
        setMenuItems(menuItems);
      });
  }, [result.menu._id]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    if (e.currentTarget.id === 'Order') {
      setMenuItemsPage(false);
      setOrderPage(true);
      setReportPage(false);
    } else if (e.currentTarget.id === 'Menu Options') {
      setMenuItemsPage(true);
      setOrderPage(false);
      setReportPage(false);
    } else if (e.currentTarget.id === 'Reports') {
      setMenuItemsPage(false);
      setOrderPage(false);
      setReportPage(true);
    }
    setAnchorEl(null);
  };

  console.log(result, 'Dashboard');

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{ float: 'left' }}>
        Options
      </Button>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose} id="Order">
          Order
        </MenuItem>
        <MenuItem onClick={handleClose} id="Menu Options">
          Menu Options
        </MenuItem>
        <MenuItem onClick={handleClose} id="Reports">
          Reports
        </MenuItem>
      </Menu>

      {orderPage ? (
        <MenuItemsContext.Provider value={{ menuItems, setMenuItems }}>
          <OrderContainer />
        </MenuItemsContext.Provider>
      ) : null}

      {menuItemsPage ? (
        <MenuItemsContext.Provider value={{ menuItems, setMenuItems, menuItemsPage }}>
          <ItemForm />
        </MenuItemsContext.Provider>
      ) : null}

      {reportPage ? <ReportsContainer /> : null}
    </div>
  );
};

export default Dashboard;
