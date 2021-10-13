/* eslint-disable no-shadow */
/* eslint-disable no-debugger */
/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, TextField } from '@material-ui/core';
import useOrderStyles from '../styles/reports.css';
import { ordersPropTypes } from '../propTypes/schema';

const UserOrders = ({ ordersData, setData }) => {
  const [reportsDefault, setReportsDefault] = useState(ordersData);
  const [search, setSearch] = useState('');
  const classes = useOrderStyles();

  const handleCancel = (report) => {
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
          setData(updatedOrders);
        }
      });
  };

  // TODO: I need to fix this.

  const searchTest = () => {
    const searchedOrders = ordersData.filter((report) => report.createdOn.includes(search.toUpperCase()));
    setReportsDefault(searchedOrders);
  };

  const handleSearch = async (e) => {
    const { value } = e.target;
    setSearch(value);
    await searchTest(search, reportsDefault);
  };

  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Serach your orders"
        variant="outlined"
        value={search || ''}
        onChange={handleSearch}
      />
      <div className="w-4/6 h-96 overflow-auto">
        {ordersData
          ? ordersData?.map((report) => {
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
                  {report.canceled ? (
                    <Button
                      disabled
                      className={classes.cancelOrderBtn}
                      size="small"
                      color="primary"
                      variant="outlined"
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
            })
          : null}
      </div>
    </div>
  );
};

UserOrders.propTypes = {
  ordersData: PropTypes.arrayOf(ordersPropTypes),
  setData: PropTypes.func,
};

UserOrders.defaultProps = {
  ordersData: [],
  setData: null,
};

export default UserOrders;
