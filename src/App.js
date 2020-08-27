import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {PronosticForm} from "./components/PronoisticForm/PronosticForm";

function App() {
  return (
    <div className="App">
      <Header/>
      <div className="form flex justify-center">
          <PronosticForm />
      </div>
    </div>
  );
}

export default App;
