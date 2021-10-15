/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import useAppStyles from '../styles/app.css';
import { menuPropTypes } from '../propTypes/schema';

const SelectedMenu = ({ menus }) => {
  const classes = useAppStyles();
  const navigate = useNavigate();

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="Menu">Menu</InputLabel>
        <Select labelId="Menu" id="select" value="" onChange={(e) => navigate(`${e.target.value._id}/order`)}>
          {menus?.map((menu) => {
            return (
              <MenuItem key={menu._id} value={menu} aria-label={menu.name} aria-required="true">
                {menu.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

SelectedMenu.propTypes = {
  menus: PropTypes.arrayOf(menuPropTypes),
};

SelectedMenu.defaultProps = {
  menus: [],
};

export default SelectedMenu;
