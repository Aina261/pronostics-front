import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import './App.css';
import {PronosticForm} from "./components/PronoisticForm/PronosticForm";
import {Pronostics} from "./components/Pronostics/Pronostics";
import {Navigation} from "./components/Navigation/Navigation";
import NotFound from "./components/NotFound/NotFound";

function App() {
    return (
        <Router>
            <div className="App">
                <Navigation/>
                <Switch>
                    <Route exact path="/">
                        <PronosticForm/>
                    </Route>
                    <Route path="/pronostics">
                        <Pronostics/>
                    </Route>
                    <Route path="/404">
                        <NotFound/>
                    </Route>
                    <Route path="*">
                        <Redirect to="/404" />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
