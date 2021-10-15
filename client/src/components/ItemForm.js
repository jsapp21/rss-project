/* eslint-disable import/no-cycle */
/* eslint-disable no-debugger */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable no-alert */
import React, { useState, useContext } from 'react';
import { Typography, Input, Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { MenuItemsContext } from './Dashboard';
import useDashboardStyles from '../styles/dashboard.css';

const ItemForm = () => {
  const [form, setForm] = useState({ name: '', price: '' });
  const result = useContext(MenuItemsContext);
  const classes = useDashboardStyles();
  const { menuId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name === 0 || form.price === 0) {
      alert('Please fill out menu item and price');
    } else {
      const newItem = {
        menuId,
        name: form.name,
        price: parseFloat(form.price),
        outOfStock: false,
        tempOutOfStock: false,
      };

      const reqObj = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      };

      fetch('/items', reqObj)
        .then((resp) => resp.json())
        .then((menuItem) => {
          if (menuItem.message) {
            alert(`${menuItem.message}`);
          } else {
            result.setData([...result.data, menuItem]);
            setForm({ name: '', price: '' });
          }
        });
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
