import { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { appStyles } from './app.css'

const App = () => {

  const [form, setForm] = useState({ item: '', price: ''})
  const [menu, setMenu] = useState([])

  useEffect(() => {
    fetch('/menus')
    .then(res => res.json())
    .then(menu => {
      console.log(menu)
      setMenu(menu)
    })
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()

    const reqObj = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item: form.item, price: parseFloat(form.price) })
    }

    console.log(reqObj)

    fetch('/menus', reqObj)
    .then(item => {
      console.log(item)
      // TODO: udpated setMenu here
    })
  }

  const handleChange = (e) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value
    }))
  };

  const classes = appStyles();

  return (
    <div className="m-8">
      <div className="">
        <header className="App-header">
        <Typography variant="h5" component="h2">🍳 Simple POS</Typography>
        </header>
      </div>
      <form onSubmit={handleSubmit}>
          <Input color="primary" placeholder="Menu Item" inputProps={{ 'aria-label': 'item' }} name="item" value={form.item} onChange={handleChange}/>
          <Input placeholder="$9.99" inputProps={{ 'aria-label': 'price' }} name="price" value={form.price} onChange={handleChange} />
          <div className="my-2">
            <Button type="submit" variant="contained" color="primary">Save</Button>
          </div>
      </form>

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
  );
}

export default App;
