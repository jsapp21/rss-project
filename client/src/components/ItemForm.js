/* eslint-disable no-debugger */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable no-alert */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Typography, TextField, Button } from '@material-ui/core';
import MenuItems from './MenuItems';
import { itemPropTypes, menuPropTypes } from '../propTypes/schema';

const ItemForm = ({ menuItems, setMenuItems, menu, addMenuItemPage }) => {
  const name = useRef();
  const price = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.current.value.length === 0 || price.current.value === 0) {
      alert('Please fill out menu item and price');
    } else {
      const newItem = {
        menuId: menu._id,
        name: name.current.value,
        price: parseFloat(price.current.value),
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
            setMenuItems([...menuItems, menuItem]);
            name.current.value = '';
            price.current.value = '';
          }
        });
    }
  };

  return (
    <div className="clear-both grid gap-10 grid-cols-2">
      <MenuItems menuItems={menuItems} setMenuItems={setMenuItems} addMenuItemPage={addMenuItemPage} />
      <div>
        <Typography variant="h5" component="h2">
          Menu Item:
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField inputRef={name} placeholder="Item Name" defaultValue="" />
          <TextField inputRef={price} placeholder="9.50" defaultValue="" />
          <br />
          <Button variant="contained" color="primary" style={{ marginTop: 10 }}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

ItemForm.propTypes = {
  menuItems: PropTypes.arrayOf(itemPropTypes).isRequired,
  setMenuItems: PropTypes.func.isRequired,
  menu: menuPropTypes.isRequired,
  addMenuItemPage: PropTypes.bool.isRequired,
};

export default ItemForm;
