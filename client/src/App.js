import { useEffect, useState } from 'react';
// import MenuItems from './components/MenuItems';
import { Typography } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import useAppStyles from './app.css';

const App = () => {

  const classes = useAppStyles();

  const [form, setForm] = useState({ item: '', price: ''});
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetch('/menus')
    .then(res => res.json())
    .then(menu => {
      setMenu(menu);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newItem = {
      item: form.item,
      price: parseFloat(form.price)
    };

    const reqObj = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    };

    fetch('/menus', reqObj)
    .then(resp => resp.json())
    .then(item => {
      if (item.acknowledged === false) {
        // TODO: Finishing building the error case 
        // Q: Is there a default error message? ex. alert(item.error)
        // Q: How does item.acknowledged ever become false?
        alert('Error: Item was not saved. Try again.')
      } else if (item.error) {
        alert(`Error: ${item.error}`)
      } else {
        setMenu([...menu, { ...newItem, _id: item.insertedId }]);
        setForm({ item: '', price: ''});
      }
    });
  };

  const handleChange = (e) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value
    }))
  };

  return (
    <div className="m-8">
      <header className="App-header">
        <Typography variant="h5" component="h2">🍳 Simple POS</Typography>
      </header>

    <form onSubmit={handleSubmit} component="div">
        <Input color="primary" placeholder="Menu Item" inputProps={{ 'aria-label': 'item' }} name="item" value={form.item} onChange={handleChange}/>
        <Input placeholder="$9.99" inputProps={{ 'aria-label': 'price' }} name="price" value={form.price} onChange={handleChange} />
        <Button type="submit" variant="contained" color="primary" className={classes.button}>Save</Button>
    </form>

    <div>
    {menu.map(i => {
          return <Card classes={{root: classes.root}} key={i._id}>
          <CardContent>
            <Typography variant="h5" component="h2">{i.item}</Typography>
            <Typography className={classes.pos} color="textSecondary">${i.price}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Order</Button>
          </CardActions>
        </Card>
        })}
    </div>    
  </div>
  );
};

export default App;
