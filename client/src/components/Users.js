/* eslint-disable no-debugger */
/* eslint-disable no-console */
import React from 'react';
import { useFetch } from '../hooks/useFetch';
import SelectedUser from './SelectedUser';

const Users = () => {
  const { data, error } = useFetch('/users');
  if (error) return <h1>{error}</h1>;

  return (
    <>
      <SelectedUser users={data} />
    </>
  );
};

export default Users;
