import React from 'react';
import Table from "./Table/Table";
import './Invoices-list.scss';
import axios from 'axios';

function InvoicesList() {

    return (
        <div id="InvoicesList">
            <div className="title-page">
                <h1>Invoices list</h1>
                <a href="/invoice/new" className="btn-add-invoice">New invoice +</a>
            </div>

            <Table/>
        </div>
    );
}

export default InvoicesList;