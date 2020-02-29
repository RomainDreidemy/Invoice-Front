import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import InvoicesList from './Components/Invoice/Invoices-list';
import Navigation from './Components/Navigation/Navigation';
import NavigationAlt from "./Components/Navigation/NavigationAlt";
import logo from './logo.svg';
import './App.scss';

function App() {
    return (
        <div id="App">
            <Navigation/>
            <div id="Part2">
                <NavigationAlt/>
                <div id="Content">
                    <Router>
                        <Switch>
                            <Route exact path="/">
                                <InvoicesList />
                            </Route>
                        </Switch>
                    </Router>
                </div>
            </div>
        </div>
    );
}

export default App;
