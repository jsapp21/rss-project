import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import useDashboardStyles from '../styles/dashboard.css';

const MenuItemsContainer = ({ menu, order, setOrder, completed, setCompleted }) => {
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
    // Does this work?
  };

  return (
    <div className="grid gap-4 grid-cols-3">
      {menu.map((i) => {
        return (
          <Card classes={{ root: classes.root }} key={i._id}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {i.name}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                ${i.price}
              </Typography>
            </CardContent>
            <Button
              size="small"
              className={classes.orderButton}
              variant="contained"
              color="primary"
              onClick={() => handleClick(i)}>
              Order
            </Button>
          </Card>
        );
      })}
    </div>
  );
};

export default MenuItemsContainer;

MenuItemsContainer.propTypes = {
  order: PropTypes.arrayOf.isRequired,
  setOrder: PropTypes.arrayOf.isRequired,
  completed: PropTypes.bool.isRequired,
  setCompleted: PropTypes.bool.isRequired,
  menu: PropTypes.arrayOf.isRequired,
};
