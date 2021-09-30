/* eslint-disable no-alert */
/* eslint-disable no-debugger */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Typography, Container, Select, MenuItem, InputLabel, Button } from '@material-ui/core';
import { itemPropTypes, userPropTypes } from '../propTypes/schema';
import useOrderStyles from '../styles/reports.css';

const ReportsContainer = ({ menuItems, user }) => {
  const [reports, setReports] = useState(null);
  // const [selectedItem, setSelectedItem] = useState('');
  const classes = useOrderStyles();

  useEffect(() => {
    fetch(`/orders/${user[0]._id}`)
      .then((resp) => resp.json())
      .then((orders) => {
        setReports(orders);
      });
  }, [user]);

  // const handleChange = (event) => {
  //   setSelectedItem(event.target.value);
  //   fetch(`/orders/items/${event.target.value}/`)
  //     .then((resp) => resp.json())
  //     .then((orders) => {
  //       setReports(orders);
  //     });
  // };

  const handleCancel = (report) => {
    fetch(`/orders/${report._id}`, { method: 'PATCH' })
      .then((resp) => resp.json())
      .then((updatedReport) => {
        if (updatedReport.message) {
          alert(updatedReport.message);
        } else {
          const updatedOrders = reports.map((reportObj) => {
            if (reportObj._id === report._id) {
              return updatedReport;
            }
            return reportObj;
          });
          setReports(updatedOrders);
        }
      });
  };

  return (
    <div className="clear-both m-8 h-96 w-96 overflow-auto">
      {/* <InputLabel id="demo-simple-select-standard-label">Select Orders by Item:</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={selectedItem}
        onChange={handleChange}>
        {menuItems.map((item) => (
          <MenuItem key={item._id} value={item._id}>
            {item.name}
          </MenuItem>
        ))}
      </Select> */}
      {reports
        ? reports.map((report) => {
            return (
              <Container maxWidth="xs" style={{ backgroundColor: '#ffff', marginBottom: 20 }} key={report._id}>
                <Typography color="textPrimary" style={{ marginTop: 20, marginBottom: 10 }}>
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
              </Container>
            );
          })
        : null}
    </div>
  );
};

ReportsContainer.propTypes = {
  menuItems: PropTypes.arrayOf(itemPropTypes).isRequired,
  user: PropTypes.arrayOf(userPropTypes).isRequired,
};

export default ReportsContainer;
