/* eslint-disable no-console */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { itemPropTypes } from '../propTypes/schema';

const ReportsContainer = ({ menuItems }) => {
  const [reports, setReports] = useState(null);

  // useEffect(() => {
  //   fetch('/orders/')
  //     .then((resp) => resp.json())
  //     .then((orders) => console.log(orders, 'orders'));
  // }, []);

  const handleClick = (item) => {
    fetch(`/items/${item._id}/orders/`)
      .then((resp) => resp.json())
      .then((orders) => setReports(orders[0]));
  };

  console.log(reports, 'reports');

  return (
    <div className="clear-both">
      {menuItems.map((item) => {
        return (
          <Button variant="contained" key={item._id} onClick={() => handleClick(item)}>
            {item.name}
          </Button>
        );
      })}
      {reports ? (
        <p>
          {reports.name} appears on {reports.orderCount} orders.
        </p>
      ) : null}
    </div>
  );
};

ReportsContainer.propTypes = {
  menuItems: PropTypes.arrayOf(itemPropTypes).isRequired,
};

export default ReportsContainer;
