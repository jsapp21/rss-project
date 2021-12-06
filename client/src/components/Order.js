/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
/* eslint-disable no-alert */
import React from 'react';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography, Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import useOrderStyles from '../styles/order.css';
import { itemPropTypes } from '../propTypes/schema';
import { ADD_ORDER } from '../utils/graphQl';

const Order = ({ order, setOrder }) => {
  const classes = useOrderStyles();
  const { menuId, userId } = useParams();
  const [addOrder] = useMutation(ADD_ORDER);
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

  const submitOrder = () => {
    const updatedOrderItemIds = order.map((item) => {
      return {
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        outOfStock: item.outOfStock,
        tempOutOfStock: item.tempOutOfStock,
      };
    });

    addOrder({
      variables: {
        input: {
          menuId,
          orderItems: updatedOrderItemIds,
          orderTotal: totalCost,
          userId,
        },
      },
    }).then((response) => {
      if (response) {
        setOrder([]);
      }
    });
  };

  return (
    <Container maxWidth="xs" style={{ backgroundColor: '#ffff', float: 'left', marginBottom: 20 }}>
      <Typography variant="h5" style={{ color: 'black', textAlign: 'center', marginTop: 20, marginBottom: 20 }}>
        🍳 Simple POS
      </Typography>

      {order?.map((item) => {
        addTotal(item);
        return (
          <Card classes={{ root: classes.root }} key={item._id}>
            <CardContent>
              <Typography variant="body1" style={{ float: 'left' }}>
                {item.quantity} - {item.name}
              </Typography>
              <Typography color="textSecondary" style={{ float: 'right' }}>
                ${item.price}
              </Typography>
            </CardContent>
            <div className="clear-both">
              <Button className={classes.button} size="small" color="secondary" onClick={() => removeItem(item)}>
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
        <Button variant="contained" color="primary" onClick={submitOrder} style={{ marginBottom: 20 }}>
          Order
        </Button>
      </div>
    </Container>
  );
};

Order.propTypes = {
  order: PropTypes.arrayOf(itemPropTypes),
  setOrder: PropTypes.elementType,
};

Order.defaultProps = {
  order: [],
  setOrder: null,
};

export default Order;
