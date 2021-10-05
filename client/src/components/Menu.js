import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useFetch } from '../hooks/useFetch';
import useAppStyles from '../styles/app.css';

const Menu = ({ clicked, setClicked, setMenu }) => {
  const classes = useAppStyles();
  const [resturant, setResturant] = useState('');

  const handleChange = (e) => {
    setResturant(e.target.value);
    setClicked(false);
    const selectedMenu = data.find((menu) => menu._id === e.target.value._id);
    setMenu(selectedMenu);
    setClicked(!clicked);
  };

  const { data, error } = useFetch('/menus');
  if (error) return <h1>{error}</h1>;

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="Menu">Menu</InputLabel>
      <Select labelId="Menu" id="select" value={resturant} onChange={handleChange}>
        {data?.map((menu) => {
          return (
            <MenuItem key={menu._id} value={menu} aria-label={menu.name} aria-required="true">
              {menu.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default Menu;

Menu.propTypes = {
  clicked: PropTypes.bool,
  setClicked: PropTypes.func,
  setMenu: PropTypes.func,
};

Menu.defaultProps = {
  clicked: false,
  setClicked: null,
  setMenu: null,
};
