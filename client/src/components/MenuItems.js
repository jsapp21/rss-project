/* eslint-disable import/no-cycle */
/* eslint-disable import/named */
/* eslint-disable no-unused-vars */
/* eslint-disable no-else-return */
/* eslint-disable no-debugger */
/* eslint-disable no-alert */
/* eslint-disable no-console */
import React, { useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import useDashboardStyles from '../styles/dashboard.css';
import { itemPropTypes } from '../propTypes/schema';
import { MenuItemsContext } from './Dashboard';

const MenuItems = ({ order, setOrder }) => {
  const classes = useDashboardStyles();
  const result = useContext(MenuItemsContext);
  const location = useLocation();
  const { userId, menuId } = useParams();

  const handleOrder = (i) => {
    const itemToUpdate = order.find((orderedItem) => orderedItem._id === i._id);

    if (!itemToUpdate) {
      return setOrder([...order, { ...i, quantity: 1 }]);
    } else {
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
    }
  };

  const handleDelete = (menuItem) => {
    const updatedItem = {
      _id: menuItem._id,
      name: menuItem.name,
    };

    const reqObj = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedItem),
    };

    fetch(`/items/delete/${menuItem._id}`, reqObj)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.status !== 200) {
          alert(data.message);
        } else {
          alert(data.message);
          const updatedMenuItems = result.data.filter((item) => item._id !== menuItem._id);
          result.setData(updatedMenuItems);
        }
      });
  };

  const handleOutOfStock = (menuItem) => {
    const updatedItem = {
      tempOutOfStock: !menuItem.tempOutOfStock,
    };

    const reqObj = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedItem),
    };

    fetch(`/items/tempOut/${menuItem._id}`, reqObj)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
        } else {
          const updatedMenuItems = result.data.map((item) => {
            if (item._id === data._id) {
              return data;
            } else {
              return item;
            }
          });
          result.setData(updatedMenuItems);
        }
      });
  };

  console.log(result, 'result');

  return (
    <div className="grid gap-1 grid-cols-3">
      {result?.data?.getMenuItems?.map((menuItem) => {
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
            {location.pathname === `/users/${userId}/menus/${menuId}/items` ? (
              <div className="clear-both">
                <ButtonGroup
                  className={classes.buttonGrp}
                  orientation="vertical"
                  color="primary"
                  size="small"
                  aria-label="buttons">
                  <Button onClick={() => handleOutOfStock(menuItem)}>
                    {menuItem.tempOutOfStock ? 'Out of Stock' : 'Instock'}
                  </Button>
                  <Button onClick={() => handleDelete(menuItem)}>Delete</Button>
                </ButtonGroup>
              </div>
            ) : (
              <Button
                disabled={menuItem.tempOutOfStock}
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
};

MenuItems.defaultProps = {
  order: [],
  setOrder: null,
};

export default MenuItems;
