/* eslint-disable import/no-cycle */
/* eslint-disable no-alert */
/* eslint-disable no-debugger */
/* eslint-disable no-console */
import React from 'react';
import PmixReport from '../components/PmixReport';
import UserOrders from '../components/UserOrders';

const ReportsContainer = () => {
  return (
    <div className="clear-both grid gap-8 grid-cols-2">
      <PmixReport />
      <UserOrders />
    </div>
  );
};

export default ReportsContainer;
