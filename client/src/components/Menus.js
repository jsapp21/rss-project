/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import SelectedOption from './SelectedOption';

const Menus = () => {
  const navigate = useNavigate();
  const { data, error } = useFetch('/menus');
  if (error) return <h1>{error}</h1>;

  const handleChange = (e) => {
    navigate(`${e.target.value._id}/order`);
  };

  return <SelectedOption data={data} handleChange={handleChange} />;
};

export default Menus;
