/* eslint-disable no-debugger */
/* eslint-disable no-console */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography, Container, Select, MenuItem, InputLabel } from '@material-ui/core';
import { itemPropTypes } from '../propTypes/schema';
import useOrderStyles from '../styles/order.css';

const ReportsContainer = ({ menuItems }) => {
  const [reports, setReports] = useState(null);
  const [selectedItem, setSelectedItem] = useState('');
  const classes = useOrderStyles();
  let totalCost = 0;

  const handleChange = (event) => {
    setSelectedItem(event.target.value);
    fetch(`/orders/items/${event.target.value}/`)
      .then((resp) => resp.json())
      .then((orders) => {
        setReports(orders);
      });
  };

  const addTotal = (item) => {
    const totalItemPrice = item.quantity * item.price;
    totalCost += totalItemPrice;
    return totalCost;
  };

  console.log(totalCost, 'totalcost');
  // TODO: total cost for each order
  return (
    <div className="clear-both m-8">
      <InputLabel id="demo-simple-select-standard-label">Select Orders by Item:</InputLabel>
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
      </Select>
      {reports
        ? reports.map((report) => {
            return (
              <Container maxWidth="xs" style={{ backgroundColor: '#ffff', marginBottom: 20 }} key={report._id}>
                <Typography
                  variant="body1"
                  style={{ color: 'black', textAlign: 'center', marginTop: 20, marginBottom: 10 }}>
                  Order #{report.createdOn.slice(-4)}
                </Typography>
                <Card classes={{ root: classes.root }}>
                  <CardContent>
                    {report.items.map((item) => {
                      addTotal(item);
                      return (
                        <Typography variant="body1" key={item._id}>
                          {item.quantity} - {item.name} ${item.price} {item.outOfSock ? 'Out of Stock' : null}
                        </Typography>
                      );
                    })}
                  </CardContent>
                </Card>
                <Typography variant="body1" style={{ color: 'black', textAlign: 'left', marginBottom: 5 }}>
                  Total: ${totalCost}
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
};

export default ReportsContainer;
