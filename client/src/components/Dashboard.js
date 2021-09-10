/* eslint-disable no-console */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';

import { Button, Menu, MenuItem } from '@material-ui/core';
import ReportsContainer from './ReportsContainer';
import MenuItems from './MenuItems';
import Order from './Order';
import ItemForm from './ItemForm';
import { menuPropTypes } from '../propTypes/schema';

const Dashboard = ({ menu }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [order, setOrder] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [orderPage, setOrderPage] = useState(true);
  const [addMenuItemPage, setAddMenuItemPage] = useState(false);
  const [reportPage, setReportPage] = useState(false);

  useEffect(() => {
    fetch(`/items/${menu._id}`)
      .then((res) => res.json())
      .then((menuItems) => {
        setMenuItems(menuItems);
      });
  }, [menu._id]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    if (e.currentTarget.id === 'Order') {
      setAddMenuItemPage(false);
      setOrderPage(true);
      setReportPage(false);
    } else if (e.currentTarget.id === 'Add Menu Item') {
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

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{ float: 'left' }}>
        Options
      </Button>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose} id="Order">
          Order
        </MenuItem>
        <MenuItem onClick={handleClose} id="Add Menu Item">
          Add Menu Item
        </MenuItem>
        <MenuItem onClick={handleClose} id="Reports">
          Reports
        </MenuItem>
      </Menu>

      {orderPage ? (
        <div className="clear-both grid gap-10 grid-cols-2">
          <MenuItems
            menuItems={menuItems}
            order={order}
            setOrder={setOrder}
            completed={completed}
            setCompleted={setCompleted}
          />
          <Order order={order} setOrder={setOrder} completed={completed} setCompleted={setCompleted} menu={menu} />
        </div>
      ) : null}

      {addMenuItemPage ? (
        <ItemForm menuItems={menuItems} setMenuItems={setMenuItems} menu={menu} addMenuItemPage={addMenuItemPage} />
      ) : null}

      {reportPage ? <ReportsContainer menuItems={menuItems} /> : null}
    </div>
  );
};

Dashboard.propTypes = {
  menu: menuPropTypes.isRequired,
};

export default Dashboard;
