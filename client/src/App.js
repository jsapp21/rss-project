/* eslint-disable no-console */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { Typography, Container, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import useAppStyles from './styles/app.css';
import Dashboard from './components/Dashboard';

const App = () => {
  const classes = useAppStyles();

  // const [user, setUser] = useState(false);
  const [menu, setMenu] = useState({});
  const [menus, setMenus] = useState([]);
  const [resturant, setResturant] = useState('');
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    fetch('/user/6144dfc0a0d2d20e59b0ee03')
      .then((res) => res.json())
      .then((user) => {
        if (user) {
          console.log(user);
          localStorage.setItem('userRole', JSON.stringify(user));
          // setUser(true);
        }
      })
      .catch((e) => console.log(e));

    fetch('/menus')
      .then((res) => res.json())
      .then((menus) => {
        setMenus(menus);
      });
  }, []);

  const handleChange = (e) => {
    setResturant(e.target.value);
    setClicked(false);
    const selectedMenu = menus.filter((menu) => menu._id === e.target.value._id);
    setMenu({ name: selectedMenu[0].name, _id: selectedMenu[0]._id });
    setClicked(true);
  };

  return (
    <>
      <Container maxWidth="lg" style={{ margin: '20px auto' }}>
        <Typography variant="h3" component="h3" style={{ float: 'left' }}>
          🍳 Simple POS
        </Typography>
        <FormControl className={classes.formControl}>
          <InputLabel id="Menu">Menu</InputLabel>
          <Select labelId="Menu" id="select" value={resturant} onChange={handleChange}>
            {menus.map((menu) => {
              return (
                <MenuItem key={menu._id} value={menu} aria-label={menu.name} aria-required="true">
                  {menu.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Container>
      {clicked ? <Dashboard menu={menu} /> : null}
    </>
  );
};

export default App;
