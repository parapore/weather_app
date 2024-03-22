import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from "react-redux";
import store from './store/store';
import Child from './component/Child';



function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <Child />
      </div>
    </Provider>
  );
}



export default App;
