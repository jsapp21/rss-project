/* eslint-disable no-alert */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, TextField } from '@material-ui/core';
import useOrderStyles from '../styles/reports.css';

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

  // TODO: Fix search bar
  // TODO: Fix error messages on renders

  const searchTest = () => {
    const searchedOrders = reportsDefault.filter((report) => report.createdOn.includes(search.toUpperCase()));
    setData(searchedOrders);
  };

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    await searchTest();
  };
  return (
    <div>
      <Typography color="textPrimary" style={{ marginTop: 20, marginBottom: 10 }}>
        Your Orders
      </Typography>
      <TextField
        id="outlined-basic"
        label="Serach for orders"
        variant="outlined"
        value={search || ''}
        onChange={handleSearch}
      />
      <div className="w-4/6 h-96 overflow-auto">
        {ordersData
          ? ordersData?.map((report) => {
              return (
                <div className="bg-white p-4 pl-12 border-b">
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
  ordersData: PropTypes.arrayOf().isRequired,
  setData: PropTypes.func.isRequired,
};

export default UserOrders;
