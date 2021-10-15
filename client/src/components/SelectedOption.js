/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';

import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import useAppStyles from '../styles/app.css';

const SelectedOption = ({ data, handleChange }) => {
  const classes = useAppStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="Selected Option">Select</InputLabel>
      <Select labelId="Selected Option" id="select" value="" onChange={(e) => handleChange(e)}>
        {data?.map((option) => {
          return (
            <MenuItem key={option._id} value={option} aria-label={option.name} aria-required="true">
              {option.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

SelectedOption.propTypes = {
  data: PropTypes.node,
  handleChange: PropTypes.func,
};

SelectedOption.defaultProps = {
  data: [],
  handleChange: null,
};

export default SelectedOption;
