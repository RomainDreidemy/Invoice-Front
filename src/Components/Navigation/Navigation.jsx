import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect,
    useLocation
} from "react-router-dom";
import './Navigation.scss';
import PictoInvoice from './img/pict-invoice.png';

function Navigation() {
    return (
        <div id="Navigation">
            <div className="logo-navigation">
                <img src="" alt="Logo navigation"/>
            </div>
            <Router>
                <nav>
                    <ul>
                        <li>

                            <Link to="/invoice">
                                <img src={PictoInvoice} alt="Picto invoice"/>
                                Invoice
                            </Link>
                        </li>
                    </ul>
                </nav>
            </Router>
        </div>
    )
}

export default Navigation;