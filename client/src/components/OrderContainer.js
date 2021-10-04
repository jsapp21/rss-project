/* eslint-disable no-console */
/* eslint-disable import/named */
import React, { useState, useContext } from 'react';
import MenuItems from './MenuItems';
import Order from './Order';
// eslint-disable-next-line import/no-cycle
import { MenuItemsContext } from './Dashboard';

const OrderContainer = () => {
  const [order, setOrder] = useState([]);
  const result = useContext(MenuItemsContext);
  console.log(result);
  return (
    <div className="clear-both grid gap-10 grid-cols-2">
      <MenuItems order={order} setOrder={setOrder} />
      <Order order={order} setOrder={setOrder} />
    </div>
  );
};

export default OrderContainer;
