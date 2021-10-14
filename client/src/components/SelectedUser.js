/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import useAppStyles from '../styles/app.css';
import { userPropTypes } from '../propTypes/schema';

const SelectedUser = ({ users }) => {
  const classes = useAppStyles();
  const navigate = useNavigate();

  const handleChange = (e) => {
    fetch(`/users/${e.target.value._id}`);
    navigate(`users/${e.target.value._id}/menus`);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="User">User</InputLabel>
        <Select labelId="User" id="select" value="" onChange={handleChange}>
          {users?.map((user) => {
            return (
              <MenuItem key={user._id} value={user} aria-label={user.name} aria-required="true">
                {user.name} -- {user.role}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

SelectedUser.propTypes = {
  users: PropTypes.arrayOf(userPropTypes),
};

SelectedUser.defaultProps = {
  users: [],
};

export default SelectedUser;
