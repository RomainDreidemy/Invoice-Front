import React from "react";
import Invoice from "../../../../Services/Invoice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Line(props, {invoice}) {

    // Mise à jour des ma valeur int_VAT
    const update = (e) => {
        let unit = parseInt(e.target.parentNode.parentNode.childNodes[1].firstChild.value),
            unitPrice = parseInt(e.target.parentNode.parentNode.childNodes[2].firstChild.value),
            vatPourcentage = parseInt(e.target.parentNode.parentNode.childNodes[3].firstChild.value);

        e.target.parentNode.parentNode.childNodes[4].firstChild.value = Invoice.calcVatEuroForOneLine(unit, unitPrice, vatPourcentage);
        e.target.parentNode.parentNode.childNodes[5].firstChild.value = Invoice.calcExtVatForOneLine(unit, unitPrice);
        e.target.parentNode.parentNode.childNodes[6].firstChild.value = Invoice.calcIncVatForOneLine(unit, unitPrice, vatPourcentage);
    };

    //Suppresion d'une ligne
    const removeLine = (e) => {
        if(window.confirm('Voulez-vous vraiment supprimer la ligne')){e.target.parentNode.parentNode.parentNode.parentNode.remove();}
    };

    return (
        <tr>
            <td>
                {props.data.sequence ? props.data.sequence + " - " : ""}
                <input type="text" name="description[]" placeholder="Désignation..." defaultValue={props.data.name}/>
            </td>
            <td><input type="number" name="unit[]" defaultValue={props.data.unit ? props.data.unit : 0} onChange={(e) => {update(e)}}/></td>
            <td><input type="number" name="unit_price[]" defaultValue={props.data.unitPrice ? props.data.unitPrice : 0} onChange={(e) => {update(e)}}/></td>
            <td><input type="number" name="vat_pourcentage[]" defaultValue={props.data.vatPourcentage ? props.data.vatPourcentage : 0} onChange={(e) => {update(e)}}/></td>
            <td className="td-disable"><input type="number" name="vat_euro[]" disabled={true} defaultValue={
                props.data.unit ? Invoice.calcVatEuroForOneLine(props.data.unit, props.data.unitPrice, props.data.vatPourcentage) : 0
            }/></td>
            <td className="td-disable"><input type="number" name="ext_vat[]" disabled={true} defaultValue={
                props.data.unit ? Invoice.calcExtVatForOneLine(props.data.unit, props.data.unitPrice) : 0
            }/></td>
            <td className="td-disable"><input type="number" name="int_vat[]" disabled={true} defaultValue={
                props.data.unit ? Invoice.calcIncVatForOneLine(props.data.unit, props.data.unitPrice, props.data.vatPourcentage) : 0
            }/> <a onClick={(e) => removeLine(e)}>
                <FontAwesomeIcon icon={faTrash} />
            </a></td>
            <input type="hidden" name="order[]" value={props.data.sequence ? props.data.sequence : props.order}/>
        </tr>
    );
}

export default Line;