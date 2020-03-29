import React from "react";
import Invoice from "../../../../Services/Invoice";

function SelectStatus({id, status}) {
    return (
        <select name="invoiceStatut" className={`status${status}`} id="invoiceStatut" onChange={(e) => {
            Invoice.changeStatus(id, e.target.value);
            e.target.className = `status${e.target.value}`;
        }}>
            <option className={`status1`} value="1" selected={status === 1}>Payé</option>
            <option className={`status2`} value="2" selected={status === 2}>Envoyé</option>
            <option className={`status3`} value="3" selected={status === 3}>En attente</option>
            <option className={`status4`} value="4" selected={status === 4}>A compléter</option>
        </select>
    )
}

export default SelectStatus;