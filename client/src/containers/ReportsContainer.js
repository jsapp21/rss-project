/* eslint-disable import/no-cycle */
/* eslint-disable no-alert */
/* eslint-disable no-debugger */
/* eslint-disable no-console */
import React from 'react';
import { useParams } from 'react-router-dom';
import PmixReport from '../components/PmixReport';
import UserOrders from '../components/UserOrders';
import { useFetch } from '../hooks/useFetch';

const ReportsContainer = () => {
  const { userId } = useParams();

  const { data, setData, error } = useFetch(`/orders/${userId}`);
  if (error) return <h1>{error}</h1>;

  return (
    <div className="clear-both grid gap-8 grid-cols-2">
      <PmixReport />
      <UserOrders ordersData={data} setData={setData} />
    </div>
  );
};

export default ReportsContainer;
