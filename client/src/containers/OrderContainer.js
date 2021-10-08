/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
/* eslint-disable import/named */
import React, { useState } from 'react';
import { Route, Link, Outlet } from 'react-router-dom';
import MenuItems from '../components/MenuItems';
import Order from '../components/Order';

const OrderContainer = ({ data }) => {
  const [order, setOrder] = useState([]);
  console.log(data, 'data');
  return (
    <div className="clear-both grid gap-10 grid-cols-2">
      <MenuItems order={order} setOrder={setOrder} />
      <Order order={order} setOrder={setOrder} />
      {/* <Outlet /> */}
    </div>
  );
};

export default OrderContainer;
