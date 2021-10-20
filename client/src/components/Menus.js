/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import SelectedOption from './SelectedOption';

const MENUS = gql`
  query GetMenu {
    getMenus {
      _id
      name
    }
  }
`;

const Menus = () => {
  const navigate = useNavigate();
  const { data, error } = useQuery(MENUS);
  if (error) return <h1>{error.message}</h1>;

  const handleChange = (e) => {
    navigate(`${e.target.value._id}/order`);
  };

  console.log(data, 'getMenu');

  return <SelectedOption data={data?.getMenus} handleChange={handleChange} />;
};

export default Menus;
