/* eslint-disable no-debugger */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useFetch } from '../hooks/useFetch';
import useAppStyles from '../styles/app.css';
import Menu from './Menu';

const User = () => {
  const classes = useAppStyles();
  const [display, setDisplay] = useState();

  const pickUser = (e) => {
    setDisplay(e.target.value);
    const selectedUser = data.filter((user) => user._id === e.target.value._id);
    fetch(`/users/${selectedUser[0]._id}`)
      .then((resp) => resp.json())
      .then((data) => {
        localStorage.setItem('userRole', JSON.stringify(data[0].role));
        localStorage.setItem('userId', JSON.stringify(data[0]._id));
      });
  };

  const { data, error } = useFetch('/users');
  if (error) return <h1>{error}</h1>;

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="User">User</InputLabel>
        <Select labelId="User" id="select" value={display} onChange={pickUser}>
          {data?.map((user) => {
            return (
              <MenuItem key={user._id} value={user} aria-label={user.name} aria-required="true">
                {user.name} -- {user.role}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {display ? <Menu /> : null}
    </>
  );
};

export default User;
