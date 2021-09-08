/* eslint-disable no-console */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { itemPropTypes } from '../propTypes/schema';

const ReportsContainer = ({ menuItems }) => {
  useEffect(() => {
    fetch('/orders/')
      .then((resp) => resp.json())
      .then((orders) => console.log(orders, 'orders'));
  }, []);

  const handleClick = (item) => {
    console.log('i am clicked', item);
    fetch(`/orders/${item._id}`)
      .then((resp) => resp.json())
      .then((data) => console.log(data));
  };

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
