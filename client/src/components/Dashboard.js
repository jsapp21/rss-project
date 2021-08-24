import React from 'react';
import { useEffect, useState } from 'react';
import MenuItemsContainer from './MenuItemsContainer';
import Order from './Order';
import { Typography, Container } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import useDashboardStyles from '../styles/dashboard.css';

const Dashboard = ({ user }) => {

  const classes = useDashboardStyles();

  const [form, setForm] = useState({ name: '', price: ''});
  const [menu, setMenu] = useState([]);
  const [order, setOrder] = useState([]);
  const [completed, setCompleted] = useState(false);

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

  return (
    <>
      <Container maxWidth="md" style={{ float: 'left', marginTop: 10}}>
        <Typography variant="h5" component="h2">🍳 Simple POS - {user.name}</Typography>

      <form onSubmit={handleSubmit} component="div">
          <Input color="primary" placeholder="Menu Item" inputProps={{ 'aria-label': 'menu item' }} name="name" value={form.name} onChange={handleChange}/>
          <Input placeholder="$9.99" inputProps={{ 'aria-label': 'menu item price' }} name="price" value={form.price} onChange={handleChange} />
          <Button type="submit" variant="contained" color="primary" className={classes.button}>Save</Button>
      </form>
      
      <MenuItemsContainer menu={menu} order={order} setOrder={setOrder} completed={completed} setCompleted={setCompleted}></MenuItemsContainer>
      </Container>

      <Container maxWidth="xs" style={{ backgroundColor: "#ffff", height: '75vh', float: 'left' }}>
        <Order order={order} setOrder={setOrder} completed={completed} setCompleted={setCompleted} user={user}></Order>
      </Container>
    </>
  );
};

export default Dashboard;
