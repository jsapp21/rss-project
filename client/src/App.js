/* eslint-disable import/no-cycle */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
import React, { useEffect, useState, createContext } from 'react';
import { Typography, Container, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import useAppStyles from './styles/app.css';
import Dashboard from './components/Dashboard';

export const UserMenuContext = createContext();

const App = () => {
  const classes = useAppStyles();

  const [user, setUser] = useState([]);
  const [menu, setMenu] = useState({});
  const [menus, setMenus] = useState([]);
  const [resturant, setResturant] = useState('');
  const [clicked, setClicked] = useState(false);
  const [userSelected, setUserSelected] = useState(false);

  useEffect(() => {
    fetch('/users')
      .then((res) => res.json())
      .then((users) => {
        if (users) {
          setUser(users);
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
    setClicked(!clicked);
  };

  const pickUser = (e) => {
    const selectedUser = user.filter((user) => user._id === e.target.value._id);
    setUser(selectedUser);
    fetch(`/users/${selectedUser[0]._id}`)
      .then((resp) => resp.json())
      .then((data) => {
        setUser(data);
        localStorage.setItem('userRole', JSON.stringify(data));
      });
    setUserSelected(true);
  };

  return (
    <>
      <Container maxWidth="lg" style={{ margin: '20px auto' }}>
        <Typography variant="h3" component="h3" style={{ float: 'left' }}>
          🍳 Simple POS
        </Typography>
        <FormControl className={classes.formControl}>
          <InputLabel id="User">Select User</InputLabel>
          <Select labelId="User" id="select" value="" onChange={pickUser}>
            {user.map((user) => {
              return (
                <MenuItem key={user._id} value={user} aria-label={user.name} aria-required="true">
                  {user.name} -- {user.role}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {userSelected ? (
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
        ) : null}
      </Container>
      {clicked ? (
        <UserMenuContext.Provider value={{ user, menu }}>
          <Dashboard />
        </UserMenuContext.Provider>
      ) : null}
    </>
  );
};

export default App;
