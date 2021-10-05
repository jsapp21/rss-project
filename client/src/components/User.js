/* eslint-disable no-debugger */
/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useFetch } from '../hooks/useFetch';
import useAppStyles from '../styles/app.css';
import { userPropTypes } from '../propTypes/schema';

const User = ({ setUserSelected, setUser }) => {
  const classes = useAppStyles();

  const pickUser = (e) => {
    const selectedUser = data.filter((user) => user._id === e.target.value._id);
    fetch(`/users/${selectedUser[0]._id}`)
      .then((resp) => resp.json())
      .then((data) => {
        localStorage.setItem('userRole', JSON.stringify(data));
        setUser(data);
      });
    setUserSelected(true);
  };

  const { data, error } = useFetch('/users');
  if (error) return <h1>{error}</h1>;

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="User">Select User</InputLabel>
      <Select labelId="User" id="select" value="" onChange={pickUser}>
        {data?.map((user) => {
          return (
            <MenuItem key={user._id} value={user} aria-label={user.name} aria-required="true">
              {user.name} -- {user.role}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default User;

User.propTypes = {
  setUserSelected: PropTypes.bool,
  setUser: PropTypes.arrayOf(userPropTypes),
};

User.defaultProps = {
  setUserSelected: false,
  setUser: null,
};
