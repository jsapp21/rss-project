import { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const App = () => {

  const [data, setData] = useState({})

  useEffect(() => {
    fetch('/express_backend')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setData(data)
    })
  }, []);

  const handleClick = (e) => {
    e.preventDefault()

    // POST FOOD ITEM TO MONGODB
  }

  return (
    <div className="m-8">
      <div className="">
        <header className="App-header">
          <Typography variant="body1" component="span">{data.express}</Typography>
        </header>
      </div>
          <Input defaultValue="Hello world" inputProps={{ 'aria-label': 'description' }} />
          <div className="my-2">
            <Button variant="outlined" onClick={handleClick}>Save</Button>
          </div>
    </div>
  );
}

export default App;
