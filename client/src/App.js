import { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';

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

  return (
    <div className="m-8 bg-red-200">
      <header className="App-header">
        <Typography variant="body1" component="span">{data.express}</Typography>
      </header>
    </div>
  );
}

export default App;
