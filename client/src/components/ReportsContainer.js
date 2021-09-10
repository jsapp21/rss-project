/* eslint-disable no-console */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import { itemPropTypes } from '../propTypes/schema';

const ReportsContainer = ({ menuItems }) => {
  const [reports, setReports] = useState(null);

  const handleClick = (item) => {
    fetch(`/items/${item._id}/orders/`)
      .then((resp) => resp.json())
      .then((orders) => setReports(orders[0]));
  };

  return (
    <div className="clear-both m-8">
      {menuItems.map((item) => {
        return (
          <Button variant="contained" key={item._id} onClick={() => handleClick(item)} style={{ margin: 8 }}>
            {item.name}
          </Button>
        );
      })}
      {reports ? (
        <Typography variant="h5" component="h2">
          {reports.name} appears on {reports.orderCount} orders.
        </Typography>
      ) : null}
    </div>
  );
};

ReportsContainer.propTypes = {
  menuItems: PropTypes.arrayOf(itemPropTypes).isRequired,
};

export default ReportsContainer;
