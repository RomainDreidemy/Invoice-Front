import React from "react";

function Line() {

    // Mise à jour des ma valeur int_VAT
    const update = (e) => {
        let unit = parseInt(e.target.parentNode.parentNode.childNodes[1].firstChild.value),
            unitPrice = parseInt(e.target.parentNode.parentNode.childNodes[2].firstChild.value),
            vatPourcentage = parseInt(e.target.parentNode.parentNode.childNodes[3].firstChild.value),
            IntVat = 0,
            ExtVat = 0,
            vatEuro = 0;

        ExtVat = unit * unitPrice;
        vatEuro = ExtVat / 100 * vatPourcentage;

        IntVat = ExtVat + vatEuro;

        e.target.parentNode.parentNode.childNodes[4].firstChild.value = vatEuro;
        e.target.parentNode.parentNode.childNodes[5].firstChild.value = ExtVat;
        e.target.parentNode.parentNode.childNodes[6].firstChild.value = IntVat;
    };

    return (
        <tr>
            <td><input type="text" name="description[]" placeholder="description..."/></td>
            <td><input type="number" name="unit[]" placeholder="0" onChange={(e) => {update(e)}}/></td>
            <td><input type="number" name="unit_price[]" placeholder="0" onChange={(e) => {update(e)}}/></td>
            <td><input type="number" name="vat_pourcentage[]" placeholder="0" onChange={(e) => {update(e)}}/></td>
            <td className="td-disable"><input type="number" name="vat_euro[]" placeholder="0" defaultValue={0} disabled={true}/></td>
            <td className="td-disable"><input type="number" name="ext_vat[]" placeholder={"0"} defaultValue={0} disabled={true}/></td>
            <td className="td-disable"><input type="number" name="int_vat[]" placeholder="0" defaultValue={0} disabled={true}/></td>
        </tr>
    );
}

export default Line;