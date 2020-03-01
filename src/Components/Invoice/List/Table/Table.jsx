import React, {useState, useEffect} from "react";
import './Table.scss';
import axios from "axios";
import Line from "../Line/Line";

function Table() {
    const [invoices, setInvoices] = useState([]);
    const [reload, setReload] = useState(true);

    useEffect(() => {
        getInvoices();
    });

    const getInvoices = () => {
        if(reload){
            axios.get("https://127.0.0.1:8000/api/invoices")
                .then(response => {
                    setInvoices(response.data["hydra:member"])
                });
            setReload(false);
        }

    };

    getInvoices();

    return (
        <div className="Table">
            <h3>Invoices (17)</h3>

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