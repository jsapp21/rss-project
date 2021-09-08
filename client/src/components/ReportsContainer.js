/* eslint-disable no-console */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

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

  console.log(menuItems);

  return (
    <div className="clear-both">
      <p>Display Orders:</p>
      {menuItems.map((item) => {
        return (
          <Button variant="contained" onClick={() => handleClick(item)}>
            {item.name}
          </Button>
        );
      })}
    </div>
  );
};

export default ReportsContainer;

ReportsContainer.propTypes = {
  menuItems: PropTypes.arrayOf.isRequired,
};
