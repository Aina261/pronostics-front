import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {PronosticForm} from "./components/PronoisticForm/PronosticForm";

function App() {
  return (
    <div className="App">
      <Header/>
      <div className="image">
          <img src={`${window.location.origin}/baby-foot.png`} alt="" width={"250px"} className={"mb-5"}/>
      </div>
      <div className="form flex justify-center w-100 w-md-75 w-lg-50 w-xl-25">
          <PronosticForm />
      </div>
    </div>
  );
}

export default App;
