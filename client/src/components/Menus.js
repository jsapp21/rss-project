/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
import React, { createContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useFetch } from '../hooks/useFetch';
// import useAppStyles from '../styles/app.css';
import SelectedMenu from './SelectedMenu';

export const MenuContext = createContext();

const Menus = () => {
  const { userId, menuId } = useParams();
  const navigate = useNavigate();
  // const classes = useAppStyles();
  // const [selectedMenu, setSelectedMenu] = useState();

  const handleSelection = (e) => {
    // setSelectedMenu(e.target.value);
    console.log(e.target.value, 'menu selection');
    console.log(userId, 'menuparams');
    navigate(`/users/${userId}/menus/${e.target.value._id}`);
  };

  const { data, error } = useFetch('/menus');
  if (error) return <h1>{error}</h1>;

  return <SelectedMenu menus={data} handleSelection={handleSelection} />;
};

export default Menus;
