import React, {useState, useEffect} from "react";
import './Table.scss';
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

    return (
        <div className="Table">
            <h3>Factures ({invoices.length})</h3>

            <div className="action">
                <a href="/">Supprimer</a>
                <a href="/">Imprimer</a>
                <a href="/">Exporter</a>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Statut</th>
                        <th>Dernière modification</th>
                        <th>Création</th>
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