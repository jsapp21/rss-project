/* eslint-disable no-alert */
/* eslint-disable no-debugger */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography, Container, Select, MenuItem, InputLabel, Button } from '@material-ui/core';
import { itemPropTypes, userPropTypes } from '../propTypes/schema';
import useOrderStyles from '../styles/order.css';

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
        if (updatedReport.status !== 200) {
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
    <div className="clear-both m-8">
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
                <Typography variant="body1" style={{ color: 'black', marginTop: 20, marginBottom: 10 }}>
                  Order #{report.createdOn.slice(-4)}
                </Typography>
                <Card classes={{ root: classes.root }}>
                  <CardContent>
                    {report.orderItems.map((item) => {
                      return (
                        <Typography variant="body1" key={item.name}>
                          {item.quantity} - {item.name} ${item.price} {item.outOfSock ? 'Temp Out' : null}
                          {item.tempOutOfStock ? 'Removed Menu Item' : null}
                        </Typography>
                      );
                    })}
                  </CardContent>
                  <div className="clear-both">
                    {report.canceled ? (
                      <Typography variant="subtitle2" style={{ color: 'red', textAlign: 'center' }}>
                        Your order has been canceled.
                      </Typography>
                    ) : (
                      <Button
                        className={classes.button}
                        size="small"
                        color="secondary"
                        onClick={() => handleCancel(report)}>
                        Cancel Order
                      </Button>
                    )}
                  </div>
                </Card>
                <Typography variant="body1" style={{ color: 'black', textAlign: 'left', marginBottom: 5 }}>
                  Total: ${report.orderTotal}
                </Typography>
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
