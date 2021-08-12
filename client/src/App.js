import { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const App = () => {

  const [data, setData] = useState('')
  const [form, setForm] = useState({ item: '', price: 0})

  useEffect(() => {
    fetch('/users')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setData(data[0].name)
    })
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log('i am clicked')
    console.log(form)
    // POST FOOD ITEM TO MONGODB
  }

  const handleChange = (e) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value
    }))
  };

  return (
    <div className="m-8">
      <div className="">
        <header className="App-header">
          <Typography variant="body1" component="span">{data}'s name is coming from MongoDB!</Typography>
        </header>
      </div>
      <form onSubmit={handleSubmit}>
          <Input placeholder="Menu Item" inputProps={{ 'aria-label': 'item' }} name="item" value={form.item} onChange={handleChange}/>
          <Input placeholder="$9.99" inputProps={{ 'aria-label': 'price' }} name="price" value={form.price} onChange={handleChange} />
          <div className="my-2">
            <Button type="submit" variant="contained" color="primary">Save</Button>
          </div>
      </form>
    </div>
  );
}

export default App;
