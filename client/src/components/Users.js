/* eslint-disable no-debugger */
/* eslint-disable no-console */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import SelectedOption from './SelectedOption';

const USERS = gql`
  query GetUsers {
    getUsers {
      _id
      name
    }
  }
`;

const Users = () => {
  const navigate = useNavigate();
  const { loading, data, error } = useQuery(USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <h1>{error.message}</h1>;

  const handleChange = (e) => {
    console.log(e, 'i am clicked');
    // fetch(`/users/${e.target.value._id}`);
    navigate(`users/${e.target.value._id}/menus`);
  };

  console.log(data, 'getUsers data');

  return <SelectedOption data={data?.getUsers} handleChange={handleChange} />;
};

export default Users;
