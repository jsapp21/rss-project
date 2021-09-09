/* eslint-disable no-console */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { itemPropTypes } from '../propTypes/schema';

const ReportsContainer = ({ menuItems }) => {
  const [reports, setReports] = useState([]);

  // useEffect(() => {
  //   fetch('/orders/')
  //     .then((resp) => resp.json())
  //     .then((orders) => console.log(orders, 'orders'));
  // }, []);

  const handleClick = (item) => {
    fetch(`/items/${item._id}/orders/`)
      .then((resp) => resp.json())
      .then((orders) => setReports(orders[0].orders_per_item));
  };

  console.log(reports, 'reports');

  return (
    <div className="clear-both">
      <p>Display Orders:</p>
      {menuItems.map((item) => {
        return (
          <Button variant="contained" key={item._id} onClick={() => handleClick(item)}>
            {item.name}
          </Button>
        );
      })}
    </div>
  );
};

ReportsContainer.propTypes = {
  menuItems: PropTypes.arrayOf(itemPropTypes).isRequired,
};

export default ReportsContainer;
