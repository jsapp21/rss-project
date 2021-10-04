/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
import React, { useEffect, useState, useContext, createContext } from 'react';
// import PropTypes from 'prop-types';
import { Button, Menu, MenuItem } from '@material-ui/core';
import ReportsContainer from './ReportsContainer';
import OrderContainer from './OrderContainer';
import ItemForm from './ItemForm';
// import { menuPropTypes } from '../propTypes/schema';
import { UserMenuContext } from '../App';

export const MenuItemsContext = createContext();

const Dashboard = () => {
  const result = useContext(UserMenuContext);
  const [menuItems, setMenuItems] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [orderPage, setOrderPage] = useState(true);
  const [addMenuItemPage, setAddMenuItemPage] = useState(false);
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
      setAddMenuItemPage(false);
      setOrderPage(true);
      setReportPage(false);
    } else if (e.currentTarget.id === 'Menu Options') {
      setAddMenuItemPage(true);
      setOrderPage(false);
      setReportPage(false);
    } else if (e.currentTarget.id === 'Reports') {
      setAddMenuItemPage(false);
      setOrderPage(false);
      setReportPage(true);
    }
    setAnchorEl(null);
  };

  console.log(result);

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
        <MenuItemsContext.Provider value={{ menuItems }}>
          <OrderContainer />
        </MenuItemsContext.Provider>
      ) : null}

      {addMenuItemPage ? (
        <ItemForm menuItems={menuItems} setMenuItems={setMenuItems} addMenuItemPage={addMenuItemPage} />
      ) : null}

      {reportPage ? <ReportsContainer menuItems={menuItems} /> : null}
    </div>
  );
};

// Dashboard.propTypes = {
//   menu: menuPropTypes.isRequired,
//   // user: PropTypes.arrayOf(userPropTypes).isRequired,
// };

export default Dashboard;
