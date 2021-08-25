/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { Typography, Container, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import useAppStyles from './styles/app.css';
import Dashboard from './components/Dashboard';

const App = () => {
  const classes = useAppStyles();

  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [resturant, setResturant] = useState('');
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    fetch('/users')
      .then((res) => res.json())
      .then((users) => {
        setUsers(users);
      });
  }, []);

  const handleChange = (e) => {
    setResturant(e.target.value);
    const user = users.filter((user) => user._id === e.target.value._id);
    setUser({ name: user[0].name, _id: user[0]._id });
    setClicked(!clicked);
  };

  return (
    <>
      <Container maxWidth="lg" style={{ margin: '20px auto' }}>
        <Typography variant="h3" component="h3" style={{ float: 'left' }}>
          🍳 Simple POS
        </Typography>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Resturant</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={resturant} onChange={handleChange}>
            {users.map((user) => {
              return (
                <MenuItem key={user._id} value={user}>
                  {user.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Container>
      {clicked ? <Dashboard user={user} /> : null}
    </>
  );
};

export default App;
