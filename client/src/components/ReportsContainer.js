/* eslint-disable no-alert */
/* eslint-disable no-debugger */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
  Container,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import { uuid } from 'uuidv4';
import { userPropTypes } from '../propTypes/schema';
import useOrderStyles from '../styles/reports.css';

const ReportsContainer = ({ user }) => {
  const [reports, setReports] = useState(null);
  const [pmix, setPmix] = useState(null);
  const classes = useOrderStyles();

  useEffect(() => {
    fetch(`/orders/${user[0]._id}`)
      .then((resp) => resp.json())
      .then((orders) => {
        setReports(orders);
      });
  }, [user]);

  const handleCancel = (report) => {
    fetch(`/orders/${report._id}`, { method: 'PATCH' })
      .then((resp) => resp.json())
      .then((updatedReport) => {
        if (updatedReport.message) {
          alert(updatedReport.message);
        } else {
          const updatedOrders = reports.map((reportObj) => {
            if (reportObj._id === report._id) {
              return updatedReport;
            }
            return reportObj;
          });
          setReports(updatedOrders);
        }
      });
  };

  const getPmixReport = () => {
    fetch(`/orders/pmix`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setPmix(data);
      });
  };

  return (
    <div className="clear-both grid gap-4 grid-cols-2">
      <div className="mt-8">
        <Button size="small" variant="contained" color="primary" onClick={getPmixReport}>
          PMIX Report
        </Button>
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
              {pmix?.map((product) => (
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

      <div className="h-96 mt-8 overflow-auto">
        {reports
          ? reports.map((report) => {
              return (
                <Container maxWidth="xs" style={{ backgroundColor: '#ffff', marginBottom: 20 }} key={report._id}>
                  <Typography color="textPrimary" style={{ marginTop: 20, marginBottom: 10 }}>
                    Order #{report.createdOn.slice(-4)}
                  </Typography>
                  {report.orderItems.map((item) => {
                    return (
                      <div key={item.name}>
                        <Typography color="textPrimary">
                          {item.quantity} - {item.name} ${item.price}
                        </Typography>
                        <Typography color="textSecondary" variant="body2" component="p" style={{ marginBottom: 15 }}>
                          {item.outOfStock ? 'Out Of Stock' : 'In Stock'}
                        </Typography>
                      </div>
                    );
                  })}
                  <Typography color="textPrimary" style={{ marginBottom: 5 }}>
                    Total: ${report.orderTotal}
                  </Typography>
                  {report.canceled ? (
                    <Button
                      disabled
                      className={classes.cancelOrderBtn}
                      size="small"
                      color="primary"
                      variant="outlined"
                      onClick={() => handleCancel(report)}>
                      Your order has been canceled.
                    </Button>
                  ) : (
                    <Button
                      className={classes.cancelOrderBtn}
                      size="small"
                      color="primary"
                      variant="outlined"
                      onClick={() => handleCancel(report)}>
                      Cancel Order
                    </Button>
                  )}
                </Container>
              );
            })
          : null}
      </div>
    </div>
  );
};

ReportsContainer.propTypes = {
  user: PropTypes.arrayOf(userPropTypes).isRequired,
};

export default ReportsContainer;
