import React, {useState, useEffect} from "react";
import './Table.scss';
import axios from "axios";
import Line from "../Line/Line";
import Invoice from "../../../../Services/Invoice";

function Table() {
    const [invoices, setInvoices] = useState([]);
    const [reload, setReload] = useState(true);

    useEffect(() => {
        getInvoices();
    });

    const getInvoices = () => {
        if(reload){
            Invoice.getInvoiceList().then((response) => {
                setInvoices(response);
            });
            setReload(false);
        }

    };

    getInvoices();

    return (
        <div className="Table">
            <h3>Invoices ({invoices.length})</h3>

            <div className="action">
                <a href="/">Delete</a>
                <a href="/">Print</a>
                <a href="/">Export</a>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Date modified</th>
                        <th>Date created</th>
                    </tr>
                </thead>
                <tbody>
                {
                    invoices.map(invoice => {
                        return <Line key={invoice.id} invoice={invoice} />
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

export default Table;