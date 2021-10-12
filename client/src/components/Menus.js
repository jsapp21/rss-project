/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import SelectedMenu from './SelectedMenu';

const Menus = () => {
  const { data, error } = useFetch('/menus');
  if (error) return <h1>{error}</h1>;

  return (
    <>
      <SelectedMenu menus={data} />
      {/* <Outlet /> */}
    </>
  );
};

export default Menus;
