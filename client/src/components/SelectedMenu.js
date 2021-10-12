/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { useParams, Outlet, useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import useAppStyles from '../styles/app.css';
import { menuPropTypes } from '../propTypes/schema';

const SelectedMenu = ({ menus }) => {
  const classes = useAppStyles();
  const { userId, menuId } = useParams();
  const navigate = useNavigate();

  const handleSelection = (e) => {
    navigate(`/users/${userId}/menus/${e.target.value._id}`);
  };

  return (
    <div>
      <h1>MenuId: {menuId}</h1>
      <h1>UserId: {userId}</h1>
      <FormControl className={classes.formControl}>
        <InputLabel id="User">Menu</InputLabel>
        <Select labelId="User" id="select" value={menus} onChange={handleSelection}>
          {menus?.map((menu) => {
            return (
              <MenuItem key={menu._id} value={menu} aria-label={menu.name} aria-required="true">
                {menu.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Outlet />
    </div>
  );
};

SelectedMenu.propTypes = {
  menus: PropTypes.arrayOf(menuPropTypes).isRequired,
};

export default SelectedMenu;
