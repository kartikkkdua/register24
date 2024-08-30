import React from 'react';
import Register from './components/PrimeMemberForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.css";
import PaymentSuccessCard from './components/SuccessPage/Success';
const App = () => (

  <div className="App">
  <div className="blur-background"></div>
  <BrowserRouter>
    <Routes>
      <Route path="/success" element={<PaymentSuccessCard />} />
      <Route path="/" element={<Register />} />
    </Routes>
  </BrowserRouter>

</div>
);

export default App;
