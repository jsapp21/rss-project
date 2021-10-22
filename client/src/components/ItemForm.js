/* eslint-disable import/no-cycle */
/* eslint-disable no-debugger */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Typography, Input, Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { GET_ITEMS, ADD_ITEM } from '../utils/graphQl';
import useDashboardStyles from '../styles/dashboard.css';

const ItemForm = () => {
  const [form, setForm] = useState({ name: '', price: '' });
  const classes = useDashboardStyles();
  const { menuId } = useParams();
  const [addItem, { loading, error }] = useMutation(ADD_ITEM, {
    refetchQueries: [GET_ITEMS, { variables: { menuId } }],
  });

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name.length === 0 || form.price.length === 0) {
      alert('Please fill out menu item and price');
    } else {
      const newItem = {
        menuId,
        name: form.name,
        price: parseFloat(form.price),
      };

      addItem({ variables: { input: newItem } });
      setForm({ name: '', price: '' });
    }
  };

  const handleChange = (e) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <Typography variant="h5" component="h2">
        Menu Item:
      </Typography>
      <form onSubmit={handleSubmit}>
        <Input
          color="primary"
          placeholder="Item Name"
          inputProps={{ 'aria-label': 'menu item' }}
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <Input
          placeholder="$9.50"
          inputProps={{ 'aria-label': 'menu item price' }}
          name="price"
          value={form.price}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary" className={classes.button}>
          Save
        </Button>
      </form>
    </div>
  );
};

export default ItemForm;
