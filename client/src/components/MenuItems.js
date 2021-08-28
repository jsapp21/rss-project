/* eslint-disable no-alert */
/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import useDashboardStyles from '../styles/dashboard.css';

const MenuItems = ({ menuItems, setMenuItems, order, setOrder, completed, setCompleted, addMenuItemPage }) => {
  const classes = useDashboardStyles();

  const handleClick = (i) => {
    if (order.length === 0) {
      setCompleted(false);
    }
    const itemToUpdate = order.find((orderedItem) => orderedItem._id === i._id);

    if (!itemToUpdate) {
      return setOrder([...order, { ...i, quanity: 1 }]);
    }
    const updatedItem = {
      ...itemToUpdate,
      quanity: itemToUpdate.quanity + 1,
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
    console.log('i am out of stock', menuItem);
  };

  const handleDelete = (menuItem) => {
    const updatedMenuItems = menuItems.filter((item) => item._id !== menuItem._id);
    fetch(`/items/delete/${menuItem._id}`)
      .then((resp) => resp.json())
      .then((data) => {
        alert(data.message);
        setMenuItems(updatedMenuItems);
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
                {/* TODO: Wire up out of stock button */}
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
                  Out of Stock
                </Button>
              </div>
            ) : (
              <Button
                size="small"
                className={classes.orderButton}
                variant="contained"
                color="primary"
                onClick={() => handleClick(menuItem)}>
                Order
              </Button>
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default MenuItems;

MenuItems.propTypes = {
  order: PropTypes.arrayOf(
    PropTypes.shape({
      menuId: PropTypes.string,
      price: PropTypes.number,
      quanity: PropTypes.number,
      _id: PropTypes.string,
    }),
  ).isRequired,
  setOrder: PropTypes.arrayOf(
    PropTypes.shape({
      menuId: PropTypes.string,
      price: PropTypes.number,
      quanity: PropTypes.number,
      _id: PropTypes.string,
    }),
  ).isRequired,
  completed: PropTypes.bool.isRequired,
  setCompleted: PropTypes.bool.isRequired,
  menuItems: PropTypes.arrayOf.isRequired,
  setMenuItems: PropTypes.arrayOf.isRequired,
  addMenuItemPage: PropTypes.bool.isRequired,
};
