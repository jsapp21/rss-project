import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{data.express}</p>
      </header>
    </div>
  );
}

export default App;
