import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { uuid } from 'uuidv4';
import useOrderStyles from '../styles/reports.css';
import { useFetch } from '../hooks/useFetch';

const PmixReport = () => {
  const classes = useOrderStyles();

  //   const getPmixReport = () => {
  //     fetch(`/orders/pmix`)
  //       .then((resp) => resp.json())
  //       .then((data) => {
  //         setPmix(data);
  //       });
  //   };

  const { data, error } = useFetch(`/orders/pmix`);
  if (error) return <h1>{error}</h1>;

  return (
    <div className="mt-8">
      {/* <Button size="small" variant="contained" color="primary" onClick={useFetch}>
        PMIX Report
      </Button> */}
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
            {data?.map((product) => (
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
      <br />
    </div>
  );
};

export default PmixReport;
