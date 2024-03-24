import React from 'react';
import './App.css';
import { Provider } from "react-redux";
import Table from './component/Table';
import store from './store/store';


function App() {


  return (
    <Provider store={store}>
      <div className="App">
        <Table />
      </div>
    </Provider>
  );
}



export default App;
