/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { useParams, Outlet } from 'react-router-dom';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import useAppStyles from '../styles/app.css';
import { userPropTypes } from '../propTypes/schema';

const SelectedUser = ({ users, handleSelection }) => {
  const classes = useAppStyles();
  const userId = useParams();

  return (
    <div>
      <h1>userid: {userId.userId}</h1>
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
  handleSelection: PropTypes.func.isRequired,
};

export default SelectedUser;
