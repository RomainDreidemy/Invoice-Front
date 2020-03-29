import React from 'react';
import Table from "./Table/Table";
import './Invoices-list.scss';

function InvoicesList() {

    return (
        <div id="InvoicesList">
            <div className="title-page">
                <h1>Liste des factures</h1>
                <a href="/invoice/new" className="btn-add-invoice">Nouvelle facture +</a>
            </div>

            <Table/>
        </div>
    );
}

export default InvoicesList;