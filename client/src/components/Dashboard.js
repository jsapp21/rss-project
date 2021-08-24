import React from 'react';
import { useEffect, useState } from 'react';
import MenuItemsContainer from './MenuItemsContainer';
import Order from './Order';
import { Typography, Container, Button, Menu, MenuItem } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import useDashboardStyles from '../styles/dashboard.css';

const Dashboard = ({ user }) => {

  const classes = useDashboardStyles();

  const [form, setForm] = useState({ name: '', price: ''});
  const [menu, setMenu] = useState([]);
  const [order, setOrder] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    fetch(`/items/${user._id}`)
    .then(res => res.json())
    .then(menu => {
      setMenu(menu);
    });
  }, [user._id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.name.length === 0 || form.price.length === 0){
      alert('Please fill out menu item and price')
    } else {
      const newItem = {
        userId: user._id,
        name: form.name,
        price: parseFloat(form.price)
      };
  
      const reqObj = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      };
  
      fetch('/items', reqObj)
      .then(resp => resp.json())
      .then(item => {
        if (item.acknowledged === false) {
          alert('Error: Item was not saved. Try again.')
        } else if (item.error) {
          alert(`Error: ${item.error}`)
        } 
        else {
          setMenu([...menu, { ...newItem, _id: item.insertedId }]);
          setForm({ name: '', price: ''});
        }
      });
    }
  };

  const handleChange = (e) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value
    }))
  };


  const handleClick = (event) => {
      console.log(event.currentTarget)
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
      console.log('i am close', anchorEl)
    setAnchorEl(null);
  };

  return (
    <>
      <Container maxWidth="xs" style={{ float: 'left'}}>
        <Typography variant="h5" component="h2" >{user.name}</Typography>

        {/* TODO: Wire up the menu */}
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{ float: 'left'}}>
            Options
        </Button>
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem onClick={handleClose}>Order</MenuItem>
            <MenuItem onClick={handleClose}>Add Menu Item</MenuItem>
            <MenuItem onClick={handleClose}>Reports</MenuItem>
        </Menu>
        </Container>

        <Container maxWidth="md" style={{ float: 'left'}}>
            <form onSubmit={handleSubmit}>
                <Input color="primary" placeholder="Menu Item" inputProps={{ 'aria-label': 'menu item' }} name="name" value={form.name} onChange={handleChange}/>
                <Input placeholder="$9.99" inputProps={{ 'aria-label': 'menu item price' }} name="price" value={form.price} onChange={handleChange} />
                <Button type="submit" variant="contained" color="primary" className={classes.button}>Save</Button>
            </form>
            
            <MenuItemsContainer menu={menu} order={order} setOrder={setOrder} completed={completed} setCompleted={setCompleted}></MenuItemsContainer>
        </Container>
        
      <Container maxWidth="xs" style={{ backgroundColor: "#ffff", float: 'right' }}>
        <Order order={order} setOrder={setOrder} completed={completed} setCompleted={setCompleted} user={user}></Order>
      </Container>

    </>
  );
};

export default Dashboard;
