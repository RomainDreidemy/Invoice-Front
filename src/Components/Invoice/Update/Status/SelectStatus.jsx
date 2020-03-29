import React from "react";
import Invoice from "../../../../Services/Invoice";

function SelectStatus({id, status}) {
    return (
        <select name="invoiceStatut" id="invoiceStatut" onChange={(e) => Invoice.changeStatus(id, e.target.value)}>
            <option value="1" selected={status === 1} >Paid</option>
            <option value="2" selected={status === 2}>Send</option>
            <option value="3" selected={status === 3}>In waiting</option>
            <option value="4" selected={status === 4}>To complete</option>
        </select>
    )
}

export default SelectStatus;