/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_MENUS } from '../utils/graphQl';
import SelectedOption from './SelectedOption';

const Menus = () => {
  const navigate = useNavigate();
  const { data, error } = useQuery(GET_MENUS);
  if (error) return <h1>{error.message}</h1>;

  const handleChange = (e) => {
    navigate(`${e.target.value._id}/order`);
  };

  return <SelectedOption data={data?.getMenus} handleChange={handleChange} />;
};

export default Menus;
