/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, Outlet } from 'react-router-dom';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import useAppStyles from '../styles/app.css';
import { userPropTypes } from '../propTypes/schema';

const SelectedUser = ({ users }) => {
  const classes = useAppStyles();
  const navigate = useNavigate();

  const handleSelection = (e) => {
    navigate(`${e.target.value._id}/menus`);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="User">User</InputLabel>
        <Select labelId="User" id="select" value={users} onChange={handleSelection}>
          {users?.map((user) => {
            return (
              <MenuItem key={user._id} value={user} aria-label={user.name} aria-required="true">
                {user.name} -- {user.role}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Outlet />
    </div>
  );
};

SelectedUser.propTypes = {
  users: PropTypes.arrayOf(userPropTypes).isRequired,
};

export default SelectedUser;
