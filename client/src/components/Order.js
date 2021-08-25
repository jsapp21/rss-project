/* eslint-disable no-console */
/* eslint-disable no-alert */
import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography, Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import useOrderStyles from '../styles/order.css';

const Order = ({ order, setOrder, completed, setCompleted, menu }) => {
  const classes = useOrderStyles();
  let totalCost = 0;

  const subtractTotal = (i) => {
    const totalItemPrice = i.quanity * i.price;
    totalCost -= totalItemPrice;
    return totalCost;
  };

  const addTotal = (i) => {
    const totalItemPrice = i.quanity * i.price;
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
        itemId: item._id,
        price: item.price,
        quanity: item.quanity,
      };
    });

    const newOrder = {
      menuId: menu._id,
      orderItems: updatedOrderItemIds,
      createdOn: new Date(),
    };

    const reqObj = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder),
    };

    fetch('/orders', reqObj).then((checkout) => {
      if (checkout.acknowledged === false) {
        alert(`Error: ${checkout.error}`);
      } else {
        setCompleted(true);
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

        {order.map((i) => {
          addTotal(i);
          return (
            <Card classes={{ root: classes.root }} key={i._id}>
              <CardContent>
                <Typography variant="body1" style={{ float: 'left' }}>
                  {i.quanity} - {i.name}
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
          {completed ? (
            <Typography variant="h5" style={{ float: 'left', color: 'green' }}>
              Your order has been placed!
            </Typography>
          ) : null}
        </div>
      </Container>
    </>
  );
};

export default Order;

Order.propTypes = {
  order: PropTypes.arrayOf.isRequired,
  setOrder: PropTypes.arrayOf.isRequired,
  completed: PropTypes.bool.isRequired,
  setCompleted: PropTypes.bool.isRequired,
  menu: PropTypes.shape.isRequired,
};
