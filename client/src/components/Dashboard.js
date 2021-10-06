/* eslint-disable import/named */
/* eslint-disable no-debugger */
/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
import React, { useEffect, useState, createContext, useReducer } from 'react';
import { Route, Switch } from 'react-router-dom';
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
    setAnchorEl(null);
  };

  return (
    <>
      {/* <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{ float: 'left' }}>
        Options
      </Button>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => dispatch({ type: 'ORDER_PAGE' })} id="Order">
          Order
        </MenuItem>
        <MenuItem onClick={() => dispatch({ type: 'MENU_OPTIONS_PAGE' })} id="Menu Options">
          Menu Options
        </MenuItem>
        <MenuItem onClick={() => dispatch({ type: 'REPORT_PAGE' })} id="Reports">
          Reports
        </MenuItem>
      </Menu> */}

      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{ float: 'left' }}>
        Options
      </Button>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => dispatch({ type: 'ORDER_PAGE' })} id="Order">
          Order
        </MenuItem>
        <MenuItem onClick={() => dispatch({ type: 'MENU_OPTIONS_PAGE' })} id="Menu Options">
          Menu Options
        </MenuItem>
        <MenuItem onClick={() => dispatch({ type: 'REPORT_PAGE' })} id="Reports">
          Reports
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

      {/* {orderPage ? (
        <MenuItemsContext.Provider value={{ menuItems, setMenuItems }}>
          <OrderContainer />
        </MenuItemsContext.Provider>
      ) : null} */}

      {/* {menuItemsPage ? (
        <MenuItemsContext.Provider value={{ menuItems, setMenuItems, menuItemsPage }}>
          <ItemForm />
        </MenuItemsContext.Provider>
      ) : null}

      {reportPage ? <ReportsContainer /> : null} */}
    </>
  );
};

export default Dashboard;
