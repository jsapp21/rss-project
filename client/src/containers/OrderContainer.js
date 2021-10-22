/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
/* eslint-disable import/named */
import React, { useState } from 'react';
import MenuItems from '../components/MenuItems';
import Order from '../components/Order';

const OrderContainer = () => {
  const [order, setOrder] = useState([]);

  return (
    <div className="clear-both grid gap-10 grid-cols-2">
      <MenuItems order={order} setOrder={setOrder} />
      <Order order={order} setOrder={setOrder} />
    </div>
  );
};

export default OrderContainer;
