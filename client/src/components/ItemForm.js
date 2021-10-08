/* eslint-disable import/no-cycle */
/* eslint-disable no-debugger */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable no-alert */
import React, { useRef, useContext } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import MenuItems from './MenuItems';
import { MenuItemsContext } from './Dashboard';

const ItemForm = () => {
  const name = useRef();
  const price = useRef();
  const result = useContext(MenuItemsContext);
  // TODO: change to controlled component

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.current.value.length === 0 || price.current.value === 0) {
      alert('Please fill out menu item and price');
    } else {
      const newItem = {
        menuId: result.data[0].menuId,
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
            result.setData([...result.data, menuItem]);
            name.current.value = '';
            price.current.value = '';
          }
        });
    }
  };

  return (
    <div className="clear-both grid gap-10 grid-cols-2">
      <MenuItems />
      <div>
        <Typography variant="h5" component="h2">
          Menu Item:
        </Typography>
        <form>
          <TextField inputRef={name} placeholder="Item Name" defaultValue="" />
          <TextField inputRef={price} placeholder="9.50" defaultValue="" />
          <br />
          <Button variant="contained" color="primary" style={{ marginTop: 10 }} onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;
