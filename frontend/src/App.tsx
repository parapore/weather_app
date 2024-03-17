import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    axios.get('http://localhost:8080').then((res) => {
      console.log(res.data);
    });
  })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <p>aaa</p>
    </div>
  );
}

export default App;
