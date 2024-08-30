import React from 'react';
import Register from './components/PrimeMemberForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.css";
const App = () => (

  <div className="App">
  <div className="blur-background"></div>
  <BrowserRouter>
  <Register/>
  </BrowserRouter>

</div>
);

export default App;
