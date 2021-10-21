/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-debugger */
/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Button } from '@material-ui/core';
import Filter from './Filter';
import useOrderStyles from '../styles/reports.css';
import { ordersPropTypes } from '../propTypes/schema';

const UserOrders = ({ ordersData }) => {
  const classes = useOrderStyles();
  const [searchedOrders, setSearchedOrders] = useState();

  useEffect(() => {
    setSearchedOrders(ordersData);
  }, [ordersData]);

  const handleCancel = (report) => {
    // TODO: wire this up to graph
    fetch(`/orders/${report._id}`, { method: 'PATCH' })
      .then((resp) => resp.json())
      .then((updatedReport) => {
        if (updatedReport.message) {
          alert(updatedReport.message);
        } else {
          const updatedOrders = ordersData.map((reportObj) => {
            if (reportObj._id === report._id) {
              return updatedReport;
            }
            return reportObj;
          });
          // TODO: refectch data
          // setData(updatedOrders);
        }
      });
  };

  const callback = useCallback((ordersData) => {
    setSearchedOrders(ordersData);
  }, []);

  console.log(searchedOrders, 'searchedOrders');

  // TODO: fix filter data
  return (
    <div>
      <Filter ordersData={ordersData} callback={callback} />
      <div className="w-4/6 h-96 overflow-auto">
        {searchedOrders?.getOrders?.map((report) => {
          return (
            <div className="bg-white p-4 pl-12 border-b" key={report._id}>
              <Typography color="textPrimary" variant="h6" style={{ marginTop: 20, marginBottom: 10 }}>
                Order #{report.createdOn.slice(-4)}
              </Typography>
              {report.orderItems.map((item) => {
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
                Total: ${report.orderTotal}
              </Typography>
              {/* TODO: display canceled */}
              {report.canceled ? (
                <Button
                  disabled
                  className={classes.cancelOrderBtn}
                  size="small"
                  color="primary"
                  variant="outlined"
                  /* TODO: make this button work */
                  onClick={() => handleCancel(report)}>
                  Your order has been canceled.
                </Button>
              ) : (
                <Button
                  className={classes.cancelOrderBtn}
                  size="small"
                  color="primary"
                  variant="outlined"
                  onClick={() => handleCancel(report)}>
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

UserOrders.propTypes = {
  ordersData: PropTypes.arrayOf(ordersPropTypes),
};

UserOrders.defaultProps = {
  ordersData: [],
};

export default UserOrders;
