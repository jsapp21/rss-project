/* eslint-disable import/no-cycle */
/* eslint-disable import/named */
/* eslint-disable no-unused-vars */
/* eslint-disable no-else-return */
/* eslint-disable no-debugger */
/* eslint-disable no-alert */
/* eslint-disable no-console */
import React, { useContext } from 'react';
import { useMutation } from '@apollo/client';
import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import { Typography, Card, Button, ButtonGroup } from '@material-ui/core';
import { itemPropTypes } from '../propTypes/schema';
import useDashboardStyles from '../styles/dashboard.css';
import { MenuItemsContext } from './Dashboard';
import { DELETE_ITEM, GET_ITEMS, UPDATE_ITEM_STOCK } from '../utils/graphQl';

const MenuItems = ({ order, setOrder }) => {
  const classes = useDashboardStyles();
  const result = useContext(MenuItemsContext);
  const location = useLocation();
  const { userId, menuId } = useParams();
  const [updatedItemStock, { loading, error }] = useMutation(UPDATE_ITEM_STOCK, {
    refetchQueries: [GET_ITEMS, 'getMenuItems'],
  });
  const [deleteItem, { loading2, error2 }] = useMutation(DELETE_ITEM, {
    refetchQueries: [GET_ITEMS, 'getMenuItems'],
  });

  if (loading || loading2) return 'Submitting...';
  if (error || error2) return `Submission error! ${error.message || error2.message}`;

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
    const itemToDelete = {
      _id: menuItem._id,
      name: menuItem.name,
    };

    deleteItem({ variables: { input: itemToDelete } });
  };

  const handleOutOfStock = (menuItem) => {
    const itemToUpdate = {
      _id: menuItem._id,
      tempOutOfStock: !menuItem.tempOutOfStock,
    };

    updatedItemStock({ variables: { input: itemToUpdate } });
  };

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
