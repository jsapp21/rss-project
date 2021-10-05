/* eslint-disable import/no-cycle */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
import React, { useState, createContext } from 'react';
import { Typography, Container } from '@material-ui/core';

import Dashboard from './components/Dashboard';
import User from './components/User';
import Menu from './components/Menu';

export const UserMenuContext = createContext();

const App = () => {
  const [user, setUser] = useState([]);
  const [menu, setMenu] = useState({});
  const [clicked, setClicked] = useState(false);
  const [userSelected, setUserSelected] = useState(false);

  return (
    <>
      <Container maxWidth="lg" style={{ margin: '20px auto' }}>
        <Typography variant="h3" component="h3" style={{ float: 'left' }}>
          🍳 Simple POS
        </Typography>
        <User setUserSelected={setUserSelected} setUser={setUser} />
        {userSelected ? <Menu clicked={clicked} setClicked={setClicked} setMenu={setMenu} /> : null}
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
