/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@material-ui/core';

const Filter = ({ search, setSearch }) => {
  return (
    <TextField
      id="outlined-basic"
      label="Serach by order number"
      variant="outlined"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{ width: '100%', marginBottom: 10 }}
    />
  );
};

Filter.propTypes = {
  search: PropTypes.string,
  setSearch: PropTypes.element,
};

Filter.defaultProps = {
  search: '',
  setSearch: null,
};

export default Filter;
