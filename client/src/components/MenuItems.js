/* eslint-disable no-else-return */
/* eslint-disable no-debugger */
/* eslint-disable no-alert */
/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import useDashboardStyles from '../styles/dashboard.css';
import { itemPropTypes } from '../propTypes/schema';

const MenuItems = ({ menuItems, setMenuItems, order, setOrder, addMenuItemPage }) => {
  const classes = useDashboardStyles();

  const handleOrder = (i) => {
    const itemToUpdate = order.find((orderedItem) => orderedItem._id === i._id);

    if (!itemToUpdate) {
      return setOrder([...order, { ...i, quantity: 1 }]);
    }
    const updatedItem = {
      ...itemToUpdate,
      quantity: itemToUpdate.quantity + 1,
    };

    const updatedOrder = order.map((item) => {
      if (item._id === updatedItem._id) {
        return updatedItem;
      }
      return item;
    });
    setOrder(updatedOrder);
    return undefined;
  };

  const handleOutOfStock = (menuItem) => {
    const user = JSON.parse(localStorage.getItem('userRole'));

    const updatedItem = {
      ...menuItem,
      outOfStock: !menuItem.outOfStock,
      userId: user._id,
    };

    const reqObj = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedItem),
    };

    fetch(`items/outofstock/`, reqObj)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (data.status !== 200) {
          alert(data.message);
        } else {
          const updatedMenuItems = menuItems.map((item) => {
            if (item._id === data._id) {
              return data;
            } else {
              return item;
            }
          });
          setMenuItems(updatedMenuItems);
        }
      });
  };

  const handleDelete = (menuItem) => {
    const reqObj = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: localStorage.getItem('userRole'),
    };

    fetch(`/items/delete/${menuItem._id}`, reqObj)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (data.status !== 200) {
          alert(data.message);
        } else {
          alert(data.message);
          const updatedMenuItems = menuItems.filter((item) => item._id !== menuItem._id);
          setMenuItems(updatedMenuItems);
        }
      });
  };

  return (
    <div className="grid gap-1 grid-cols-3">
      {menuItems.map((menuItem) => {
        return (
          <Card classes={{ root: classes.root }} key={menuItem._id}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {menuItem.name}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                ${menuItem.price}
              </Typography>
            </CardContent>
            {addMenuItemPage ? (
              <div className="clear-both grid gap-10 grid-cols-2">
                <Button
                  size="small"
                  className={classes.deleteButton}
                  color="secondary"
                  onClick={() => handleDelete(menuItem)}>
                  Delete
                </Button>
                <Button
                  size="small"
                  className={classes.orderButton}
                  color="primary"
                  onClick={() => handleOutOfStock(menuItem)}>
                  {menuItem.outOfStock ? 'Out of Stock' : 'Instock'}
                </Button>
              </div>
            ) : (
              <Button
                disabled={menuItem.outOfStock}
                size="small"
                className={classes.orderButton}
                variant="contained"
                color="primary"
                onClick={() => handleOrder(menuItem)}>
                Order
              </Button>
            )}
          </Card>
        );
      })}
    </div>
  );
};

MenuItems.propTypes = {
  order: PropTypes.arrayOf(itemPropTypes),
  setOrder: PropTypes.func,
  menuItems: PropTypes.arrayOf(itemPropTypes).isRequired,
  setMenuItems: PropTypes.func,
  addMenuItemPage: PropTypes.bool,
};

MenuItems.defaultProps = {
  order: [],
  setOrder: null,
  setMenuItems: null,
  addMenuItemPage: false,
};

export default MenuItems;
// grid gap-1 grid-cols-3
