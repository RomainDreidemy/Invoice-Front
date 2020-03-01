import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import InvoicesList from './Components/Invoice/List/Invoices-list';
import Navigation from './Components/Navigation/Navigation';
import NavigationAlt from "./Components/Navigation/NavigationAlt";
import './App.scss';
import Generate from "./Components/Invoice/Generate/Generate";
import './Components/Styles/global.scss'

function App() {
    return (
        <div id="App">
            <Navigation/>
            <div id="Part2">
                <NavigationAlt/>
                <div id="Content">
                    <Router>
                        <Switch>
                            <Route exact path="/invoice">
                                <InvoicesList />
                            </Route>

                            <Route exact path="/invoice/new">
                                <Generate />
                            </Route>
                        </Switch>
                    </Router>
                </div>
            </div>
        </div>
    );
}

export default App;
