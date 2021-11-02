/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-debugger */
/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { Typography, Button } from '@material-ui/core';
import Filter from './Filter';
import useOrderStyles from '../styles/reports.css';
import { GET_ORDERS, UPDATE_ORDER } from '../utils/graphQl';

const UserOrders = () => {
  const classes = useOrderStyles();
  const [searchedOrders, setSearchedOrders] = useState();
  const { userId } = useParams();
  const [search, setSearch] = useState('');
  const { data, error } = useQuery(GET_ORDERS, {
    variables: { userId },
  });
  const [updateOrder] = useMutation(UPDATE_ORDER, {
    variables: { input: '' },
  });

  useEffect(() => {
    setSearchedOrders(data?.getOrders);
  }, [data]);

  // const handleCancel = (report) => {
  //   // TODO: wire this up to graph
  //   fetch(`/orders/${report._id}`, { method: 'PATCH' })
  //     .then((resp) => resp.json())
  //     .then((updatedReport) => {
  //       if (updatedReport.message) {
  //         alert(updatedReport.message);
  //       } else {
  //         const updatedOrders = data?.getOrders?.map((reportObj) => {
  //           if (reportObj._id === report._id) {
  //             return updatedReport;
  //           }
  //           return reportObj;
  //         });
  //         // TODO: refectch data
  //         // setData(updatedOrders);
  //       }
  //     });
  // };

  const handleCancel = (order) => {
    debugger;
    const orderToCancel = {
      _id: order._id,
    };
    updateOrder({ variables: { input: orderToCancel } });
  };

  const orders = searchedOrders?.filter((report) => report.createdOn.includes(search.toUpperCase()));
  return (
    <div>
      <Filter ordersData={data?.getOrders} search={search} setSearch={setSearch} />
      <div className="h-96 overflow-auto">
        {orders?.map((order) => {
          return (
            <div className="bg-white p-4 pl-12 border-b" key={order._id}>
              <Typography color="textPrimary" variant="h6" style={{ marginTop: 20, marginBottom: 10 }}>
                Order #{order.createdOn.slice(-4)}
              </Typography>
              {order.orderItems.map((item) => {
                return (
                  <div key={item.name}>
                    <Typography color="textPrimary">
                      {item.quantity} - {item.name} ${item.price}
                    </Typography>
                    <Typography color="textSecondary" variant="body2" component="p" style={{ marginBottom: 15 }}>
                      {item.outOfStock ? 'Out Of Stock' : 'In Stock'}
                    </Typography>
                  </div>
                );
              })}
              <Typography color="textPrimary" style={{ marginBottom: 5 }}>
                Total: ${order.orderTotal}
              </Typography>
              {order.canceled ? (
                <Button
                  disabled
                  className={classes.cancelOrderBtn}
                  size="small"
                  color="primary"
                  variant="outlined"
                  // onClick={() => handleCancel(report)}>
                  onClick={null}>
                  Your order has been canceled.
                </Button>
              ) : (
                <Button
                  className={classes.cancelOrderBtn}
                  size="small"
                  color="primary"
                  variant="outlined"
                  onClick={() => handleCancel(order)}>
                  Cancel Order
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserOrders;
