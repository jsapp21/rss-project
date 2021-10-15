/* eslint-disable no-debugger */
/* eslint-disable no-console */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import SelectedOption from './SelectedOption';

const Users = () => {
  const navigate = useNavigate();
  const { data, error } = useFetch('/users');
  if (error) return <h1>{error}</h1>;

  const handleChange = (e) => {
    fetch(`/users/${e.target.value._id}`);
    navigate(`users/${e.target.value._id}/menus`);
  };

  return <SelectedOption data={data} handleChange={handleChange} />;
};

export default Users;
