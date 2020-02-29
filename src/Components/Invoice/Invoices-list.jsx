import React from 'react';
import Table from "./Table/Table";
import './Invoices-list.scss';

function InvoicesList() {

    return (
        <div id="InvoicesList">
            <div className="title-page">
                <h1>Invoices list</h1>
                <a href="" className="btn-add-invoice">New invoice +</a>
            </div>

            <Table/>
        </div>
    );
}

export default InvoicesList;