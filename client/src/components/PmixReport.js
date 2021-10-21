/* eslint-disable no-console */
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { uuid } from 'uuidv4';
import { useQuery } from '@apollo/client';
import useOrderStyles from '../styles/reports.css';
import { GET_PMIX } from '../utils/graphQl';

const PmixReport = () => {
  const classes = useOrderStyles();
  const { data, error } = useQuery(GET_PMIX);

  if (error) return <h1>{error.message}</h1>;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow style={{ backgroundColor: 'black' }}>
            <TableCell style={{ color: 'white' }}>Menu</TableCell>
            <TableCell align="center" style={{ color: 'white' }}>
              Item
            </TableCell>
            <TableCell align="center" style={{ color: 'white' }}>
              Sale Price
            </TableCell>
            <TableCell align="center" style={{ color: 'white' }}>
              Number Sold
            </TableCell>
            <TableCell align="center" style={{ color: 'white' }}>
              Total Sales
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.getPmix?.map((product) => (
            <TableRow key={uuid()}>
              <TableCell component="th" scope="row">
                {product.menu}
              </TableCell>
              <TableCell align="center">{product._id}</TableCell>
              <TableCell align="center">${product.avgPrice}</TableCell>
              <TableCell align="center">{product.itemCount}</TableCell>
              <TableCell align="center">${product.avgPrice * product.itemCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PmixReport;
