import React from "react";

function Line(props) {
    let invoice = props.invoice;

    let dateModified = new Date(invoice.dateModified);
    let dateCreated = new Date(invoice.dateCreated);
    let labelClass = "";
    let labelName = "";
    switch (invoice.status) {
        case 1:
            labelClass = "paid";
            labelName = "Paid";
            break;
        case 2:
            labelClass = "send";
            labelName = "Send";
            break;
        case 3:
            labelClass = "waiting";
            labelName = "In waiting";
            break;
        case 4:
            labelClass = "to-complete";
            labelName = "To complete";
            break;
        default:
            labelClass = "to-complete";
            labelName = "To complete";
            break;
    }

    return(
        <tr className="hover" onClick={() => {window.location.href = '/invoice/update/' + invoice.id}}>
            <td>{invoice.name}</td>
            <td><div className={"label label-" + labelClass}>{labelName}</div></td>
            <td>{dateModified.getDate()}/{dateModified.getMonth()}/{dateModified.getFullYear()}</td>
            <td>{dateCreated.getDate()}/{dateCreated.getMonth()}/{dateCreated.getFullYear()}</td>
        </tr>
    )
}

export default Line;