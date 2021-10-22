/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-debugger */
/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Typography, Button, TextField } from '@material-ui/core';
import Filter from './Filter';
import useOrderStyles from '../styles/reports.css';
import { ordersPropTypes } from '../propTypes/schema';
import { GET_ORDERS } from '../utils/graphQl';

function useAlbumFilters() {
  const [filters, _updateFilter] = useState({
    id: undefined,
    name: '',
  });

  const updateFilter = (filterType, value) => {
    debugger;
    _updateFilter({
      [filterType]: value,
    });
  };

  return {
    models: { filters },
    operations: { updateFilter },
  };
}

const UserOrders = () => {
  const classes = useOrderStyles();
  const { operations, models } = useAlbumFilters();
  const [searchedOrders, setSearchedOrders] = useState();
  const { userId } = useParams();
  const [search, setSearch] = useState('');
  const { data, error, refetch } = useQuery(GET_ORDERS, {
    variables: { userId, input: models.filters.name },
  });

  // useEffect(() => {
  //   setSearchedOrders(data);
  // }, [data]);

  const handleCancel = (report) => {
    // TODO: wire this up to graph
    fetch(`/orders/${report._id}`, { method: 'PATCH' })
      .then((resp) => resp.json())
      .then((updatedReport) => {
        if (updatedReport.message) {
          alert(updatedReport.message);
        } else {
          const updatedOrders = data?.getOrders?.map((reportObj) => {
            if (reportObj._id === report._id) {
              return updatedReport;
            }
            return reportObj;
          });
          // TODO: refectch data
          // setData(updatedOrders);
        }
      });
  };

  const callback = useCallback((data) => {
    setSearchedOrders(data);
  }, []);

  console.log(data, 'apollo data');
  console.log(operations, 'operations');
  console.log(models, 'models');
  console.log(search, 'search');

  // TODO: fix filter data
  return (
    <div>
      {/* <Filter ordersData={data} callback={callback} /> */}
      <TextField
        id="outlined-basic"
        label="Serach by order number"
        variant="outlined"
        value={models.filters.name}
        type="string"
        onChange={(e) => operations.updateFilter('name', e.target.value)}
      />
      <Button
        size="small"
        color="primary"
        variant="outlined"
        onClick={() =>
          refetch({
            input: { name: models.filters.name },
          })
        }>
        Search
      </Button>
      <div className="w-4/6 h-96 overflow-auto">
        {data?.getOrders?.map((report) => {
          return (
            <div className="bg-white p-4 pl-12 border-b" key={report._id}>
              <Typography color="textPrimary" variant="h6" style={{ marginTop: 20, marginBottom: 10 }}>
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
                  /* TODO: make this button work */
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

// UserOrders.propTypes = {
//   ordersData: PropTypes.arrayOf(ordersPropTypes),
// };

// UserOrders.defaultProps = {
//   ordersData: [],
// };

export default UserOrders;
