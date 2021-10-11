/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography, Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import useOrderStyles from '../styles/order.css';
import { itemPropTypes } from '../propTypes/schema';
import { MenuItemsContext } from './Dashboard';

const Order = ({ order, setOrder }) => {
  const classes = useOrderStyles();
  const result = useContext(MenuItemsContext);
  let totalCost = 0;

  const subtractTotal = (i) => {
    const totalItemPrice = i.quantity * i.price;
    totalCost -= totalItemPrice;
    return totalCost;
  };

  const addTotal = (i) => {
    const totalItemPrice = i.quantity * i.price;
    totalCost += totalItemPrice;
    return totalCost;
  };

  const removeItem = (i) => {
    subtractTotal(i);
    const updatedOrder = order.filter((item) => item._id !== i._id);
    setOrder(updatedOrder);
  };

  const handleClick = () => {
    const updatedOrderItemIds = order.map((item) => {
      return {
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        outOfStock: item.outOfStock,
        tempOutOfStock: item.tempOutOfStock,
      };
    });

    const storedUserId = JSON.parse(localStorage.getItem('userId'));

    const newOrder = {
      menuId: result.menuItems[0].menuId,
      orderItems: updatedOrderItemIds,
      orderTotal: totalCost,
      userId: storedUserId,
    };

    const reqObj = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder),
    };

    fetch('/orders', reqObj)
      .then((resp) => resp.json())
      .then((orderResponse) => {
        if (orderResponse.status !== 200) {
          alert(`Error: ${orderResponse.message}`);
        } else {
          alert(`${orderResponse.message}`);
          setOrder([]);
        }
      });
  };

  return (
    <>
      <Container maxWidth="xs" style={{ backgroundColor: '#ffff', float: 'left', marginBottom: 20 }}>
        <Typography variant="h5" style={{ color: 'black', textAlign: 'center', marginTop: 20, marginBottom: 20 }}>
          🍳 Simple POS
        </Typography>

        {order?.map((i) => {
          addTotal(i);
          return (
            <Card classes={{ root: classes.root }} key={i._id}>
              <CardContent>
                <Typography variant="body1" style={{ float: 'left' }}>
                  {i.quantity} - {i.name}
                </Typography>
                <Typography color="textSecondary" style={{ float: 'right' }}>
                  ${i.price}
                </Typography>
              </CardContent>
              <div className="clear-both">
                <Button className={classes.button} size="small" color="secondary" onClick={() => removeItem(i)}>
                  Remove
                </Button>
              </div>
            </Card>
          );
        })}

        <div className="clear-both grid gap-10 grid-cols-2">
          <Typography variant="h5" component="h2" style={{ color: 'black', textAlign: 'left', marginTop: 5 }}>
            Total: ${totalCost}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleClick} style={{ marginBottom: 20 }}>
            Order
          </Button>
        </div>
      </Container>
    </>
  );
};

Order.propTypes = {
  order: PropTypes.arrayOf(itemPropTypes).isRequired,
  setOrder: PropTypes.func.isRequired,
};

export default Order;
