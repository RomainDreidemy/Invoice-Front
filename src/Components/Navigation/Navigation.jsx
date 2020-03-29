import React from 'react';
import './Navigation.scss';
import PictoInvoice from './img/pict-invoice.png';

function Navigation() {
    return (
        <div id="Navigation">
            <div className="logo-navigation">
                <img src="" alt="Logo navigation"/>
            </div>
            <nav>
                <ul>
                    <li>
                        <a href="/invoice">
                            <img src={PictoInvoice} alt="Picto facture"/>
                            Factures
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navigation;