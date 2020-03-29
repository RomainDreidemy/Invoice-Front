import React from "react";
import Invoice from "../../../../Services/Invoice";

function Line(props, {invoice}) {

    // Mise à jour des ma valeur int_VAT
    const update = (e) => {
        let unit = parseInt(e.target.parentNode.parentNode.childNodes[1].firstChild.value),
            unitPrice = parseInt(e.target.parentNode.parentNode.childNodes[2].firstChild.value),
            vatPourcentage = parseInt(e.target.parentNode.parentNode.childNodes[3].firstChild.value)

        e.target.parentNode.parentNode.childNodes[4].firstChild.value = Invoice.calcVatEuroForOneLine(unit, unitPrice, vatPourcentage);
        e.target.parentNode.parentNode.childNodes[5].firstChild.value = Invoice.calcExtVatForOneLine(unit, unitPrice);
        e.target.parentNode.parentNode.childNodes[6].firstChild.value = Invoice.calcExtVatForOneLine(unit, unitPrice, vatPourcentage);
    };

    //Suppresion d'une ligne
    const removeLine = (e) => {
        if(window.confirm('Voulez-vous vraiment supprimer la ligne')){e.target.parentNode.parentNode.remove();}
    };

    return (
        <tr>
            <td>
                {props.data.sequence ? props.data.sequence + " - " : ""}
                <input type="text" name="description[]" placeholder="description..." defaultValue={props.data.name}/>
            </td>
            <td><input type="number" name="unit[]" placeholder="0" defaultValue={props.data.unit} onChange={(e) => {update(e)}}/></td>
            <td><input type="number" name="unit_price[]" placeholder="0" defaultValue={props.data.unitPrice} onChange={(e) => {update(e)}}/></td>
            <td><input type="number" name="vat_pourcentage[]" placeholder="0" defaultValue={props.data.vatPourcentage} onChange={(e) => {update(e)}}/></td>
            <td className="td-disable"><input type="number" name="vat_euro[]" placeholder="0" defaultValue={0} disabled={true} value={Invoice.calcVatEuroForOneLine(props.data.unit, props.data.unitPrice, props.data.vatPourcentage)}/></td>
            <td className="td-disable"><input type="number" name="ext_vat[]" placeholder={"0"} defaultValue={0} disabled={true} value={Invoice.calcExtVatForOneLine(props.data.unit, props.data.unitPrice)}/></td>
            <td className="td-disable"><input type="number" name="int_vat[]" placeholder="0" defaultValue={0} disabled={true} value={Invoice.calcExtVatForOneLine(props.data.unit, props.data.unitPrice, props.data.vatPourcentage)}/> <a onClick={(e) => removeLine(e)}>del</a></td>
            <input type="hidden" name="order[]" value={props.data.sequence ? props.data.sequence : props.order}/>
        </tr>
    );
}

export default Line;