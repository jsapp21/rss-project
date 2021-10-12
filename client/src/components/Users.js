/* eslint-disable no-debugger */
/* eslint-disable no-console */
import React from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import SelectedUser from './SelectedUser';

const Users = () => {
  const userId = useParams();
  const navigate = useNavigate();

  const handleSelection = (e) => {
    const selectedUser = data.filter((user) => user._id === e.target.value._id);
    setData(selectedUser);
    console.log(userId, 'users');
    navigate(`/users/${e.target.value._id}`);
  };

  const { data, setData, error } = useFetch('/users');
  if (error) return <h1>{error}</h1>;

  return (
    <>
      <SelectedUser users={data} handleSelection={handleSelection} />
      {/* <Outlet /> */}
    </>
  );
};

export default Users;
