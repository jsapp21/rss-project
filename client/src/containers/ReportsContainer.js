/* eslint-disable import/no-cycle */
/* eslint-disable no-alert */
/* eslint-disable no-debugger */
/* eslint-disable no-console */
import React from 'react';
// import { useParams } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
import PmixReport from '../components/PmixReport';
import UserOrders from '../components/UserOrders';
// import { GET_ORDERS } from '../utils/graphQl';

const ReportsContainer = () => {
  // const { userId } = useParams();
  // const { data, error } = useQuery(GET_ORDERS, {
  //   variables: { userId },
  // });

  // if (error) return <h1>{error.message}</h1>;

  // console.log(data, 'reportsContainer');

  return (
    <div className="clear-both grid gap-8 grid-cols-2">
      <PmixReport />
      {/* <UserOrders ordersData={data} /> */}
      <UserOrders />
    </div>
  );
};

export default ReportsContainer;
