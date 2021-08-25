/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Container, Button, Menu, MenuItem } from '@material-ui/core';
import MenuItemsContainer from './MenuItemsContainer';
import Order from './Order';
import ItemForm from './ItemForm';

const Dashboard = ({ user }) => {
  const [menu, setMenu] = useState([]);
  const [order, setOrder] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [orderPage, setOrderPage] = useState(false);

  useEffect(() => {
    fetch(`/items/${user._id}`)
      .then((res) => res.json())
      .then((menu) => {
        setMenu(menu);
      });
  }, [user._id]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    if (e.currentTarget.id === 'Add Menu Item') {
      setOrderPage(!orderPage);
    }
    setAnchorEl(null);
  };

  return (
    <div className="">
      {/* TODO: Wire up the menu */}
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
        <ItemForm menu={menu} setMenu={setMenu} user={user} />
      ) : (
        <Container maxWidth="xl" style={{ float: 'left' }}>
          <div className="grid gap-1 grid-cols-2">
            <MenuItemsContainer
              menu={menu}
              order={order}
              setOrder={setOrder}
              completed={completed}
              setCompleted={setCompleted}
            />
            <Order order={order} setOrder={setOrder} completed={completed} setCompleted={setCompleted} user={user} />
          </div>
        </Container>
      )}
    </div>
  );
};

export default Dashboard;

Dashboard.propTypes = {
  user: PropTypes.string.isRequired,
};
