import React from "react";
import './Table.scss';

function Table() {
    return (
        <div className="Table">
            <h3>Invoices (17)</h3>

            <div className="action">
                <a href="">Delete</a>
                <a href="">Print</a>
                <a href="">Export</a>
            </div>

            <table>
                <thead>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Date modified</th>
                    <th>Date created</th>
                </thead>
                <tbody>
                <tr>
                    <td>Invoice name</td>
                    <td><div className="label label-send">Send</div></td>
                    <td>29/02/2020</td>
                    <td>28/02/2020</td>
                </tr>
                <tr>
                    <td>Invoice name</td>
                    <td><div className="label label-to-complete">To complete</div></td>
                    <td>29/02/2020</td>
                    <td>28/02/2020</td>
                </tr>
                <tr>
                    <td>Invoice name</td>
                    <td><div className="label label-waiting">In waiting</div></td>
                    <td>29/02/2020</td>
                    <td>28/02/2020</td>
                </tr>
                <tr>
                    <td>Invoice name</td>
                    <td><div className="label label-paid">Paid</div></td>
                    <td>29/02/2020</td>
                    <td>28/02/2020</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Table;