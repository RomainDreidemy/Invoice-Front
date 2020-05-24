import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFileInvoice} from "@fortawesome/free-solid-svg-icons";

function Line(props) {
    let invoice = props.invoice;

    let dateModified = new Date(invoice.dateModified);
    let dateCreated = new Date(invoice.dateCreated);
    let labelClass = "";
    let labelName = "";
    switch (invoice.status) {
        case 1:
            labelClass = "paid";
            labelName = "Payé";
            break;
        case 2:
            labelClass = "send";
            labelName = "Envoyé";
            break;
        case 3:
            labelClass = "waiting";
            labelName = "En attente";
            break;
        case 4:
            labelClass = "to-complete";
            labelName = "A compléter";
            break;
        default:
            labelClass = "to-complete";
            labelName = "A compléter";
            break;
    }

    return(
        <tr className="hover" onClick={() => {window.location.href = '/invoice/update/' + invoice.id}}>
            <td><FontAwesomeIcon icon={faFileInvoice}/>{invoice.name}</td>
            <td><div className={"label label-" + labelClass}>{labelName}</div></td>
            <td>{dateModified.getDate()}/{dateModified.getMonth()}/{dateModified.getFullYear()}</td>
            <td>{dateCreated.getDate()}/{dateCreated.getMonth()}/{dateCreated.getFullYear()}</td>
        </tr>
    )
}

export default Line;