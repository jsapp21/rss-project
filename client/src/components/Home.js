import React from 'react';
// import { useEffect, useState } from 'react';
import { Typography, Container, FormControl, InputLabel, MenuItem, Select, Button } from '@material-ui/core';
import useAppStyles from './styles/app.css';

const Home = ({ users, setUsers, resturant, setResturant, clicked, setClicked }) => {

  const classes = useAppStyles();

//   const [users, setUsers] = useState([]);
//   const [resturant, setResturant] = useState(''); 
//   const [clicked, setClicked] = useState(false);



  const handleChange = (e) => {
    setResturant(e.target.value)
  };
  
  const handleClick = () => {
    setClicked(!clicked)
  };

  return (
    <>
      <Container maxWidth="md" style={{ float: 'left', marginTop: 10}}>
        <Typography variant="h2" component="h2">🍳 Simple POS</Typography>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Resturant</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={resturant}
                onChange={handleChange}
              >
                {users.map(user => {
                  return (
                    <MenuItem key={user._id} value={user}>{user.name}</MenuItem>
                  )
                })} 
              </Select>
        </FormControl>
              <Button type="submit" variant="contained" color="primary" className={classes.button} onClick={handleClick}>Submit</Button>
      </Container>
    </>
  );
};

export default Home;
