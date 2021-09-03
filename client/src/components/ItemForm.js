/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Input, Button } from '@material-ui/core';
import useDashboardStyles from '../styles/dashboard.css';
import MenuItems from './MenuItems';

const ItemForm = ({ menuItems, setMenuItems, menu, addMenuItemPage }) => {
  const classes = useDashboardStyles();

  const [form, setForm] = useState({ name: '', price: '' });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.name.length === 0 || form.price.length === 0) {
      alert('Please fill out menu item and price');
    } else {
      const newItem = {
        menuId: menu._id,
        name: form.name,
        price: parseFloat(form.price),
        outOfStock: false,
      };

      const reqObj = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      };

      fetch('/items', reqObj)
        .then((resp) => resp.json())
        .then((menuItem) => {
          if (menuItem.acknowledged === false) {
            alert('Error: Item was not saved. Try again.');
          } else if (menuItem.error) {
            alert(`Error: ${menuItem.error}`);
          } else {
            setMenuItems([...menuItems, { ...newItem, _id: menuItem.insertedId }]);
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
    <div className="clear-both text-center">
      <Typography variant="h5" component="h2">
        Add New Menu Item:
      </Typography>
      <form onSubmit={handleSubmit}>
        <Input
          color="primary"
          placeholder="Menu Item"
          inputProps={{ 'aria-label': 'menu item' }}
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <Input
          placeholder="$9.99"
          inputProps={{ 'aria-label': 'menu item price' }}
          name="price"
          value={form.price}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary" className={classes.button}>
          Save
        </Button>
      </form>

      <MenuItems menuItems={menuItems} setMenuItems={setMenuItems} addMenuItemPage={addMenuItemPage} />
    </div>
  );
};

export default ItemForm;

ItemForm.propTypes = {
  menuItems: PropTypes.arrayOf().isRequired,
  setMenuItems: PropTypes.arrayOf.isRequired,
  menu: PropTypes.shape({ name: PropTypes.string, _id: PropTypes.string }).isRequired,
  addMenuItemPage: PropTypes.bool.isRequired,
};