/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
import React, { createContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import SelectedMenu from './SelectedMenu';

export const MenuContext = createContext();

const Menus = () => {
  const { userId, menuId } = useParams();
  const navigate = useNavigate();

  const handleSelection = (e) => {
    navigate(`/users/${userId}/menus/${e.target.value._id}`);
  };

  const { data, error } = useFetch('/menus');
  if (error) return <h1>{error}</h1>;

  return <SelectedMenu menus={data} handleSelection={handleSelection} />;
};

export default Menus;
