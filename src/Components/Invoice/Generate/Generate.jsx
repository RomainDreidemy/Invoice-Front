import React, {useState} from "react";
import './Generate.scss';
import Line from "./Line/Line";
import Invoice from "../../../Services/Invoice";
import InvoiceLine from "../../../Services/InvoiceLine";

function submitForm(){

    let descriptions = document.querySelectorAll("input[name='description[]']");
    let unit = document.querySelectorAll("input[name='unit[]']");
    let unitPrice = document.querySelectorAll("input[name='unit_price[]']");
    let vatPourcentage = document.querySelectorAll("input[name='vat_pourcentage[]']");
    let order = document.querySelectorAll("input[name='order[]']");
    let Name = document.getElementById("nameInvoice").textContent;
    let formData = [];

    for(let i = 0; i < descriptions.length; i++){
        formData.push([
            descriptions[i].value,
            parseInt(unit[i].value),
            parseInt(unitPrice[i].value),
            parseInt(vatPourcentage[i].value),
            parseInt(order[i].value)
        ]);
    }

    Invoice.add(Name).then((response) => {
        let indexNbLines = 0;
       formData.map(data => {
           InvoiceLine.add(data[0], data[1], data[2], data[3], data[4], response.data['@id'])
               .then(() => {
                   indexNbLines++;
                   if(indexNbLines === formData.length){
                       window.location.href = '/invoice/update/' + response.data.id;
                   }
               })

       })
    });
}

function Generate() {
    const [totalExtVat, setTotalExtVat] = useState(0);
    const [totalIncVat, setTotalIncVat] = useState(0);
    const [Lines, setLines] = useState([0]);
    const [ReactEstDébile, setReactEstDébile] = useState(0);

    const updateTotal = () => {
        let extVat = document.querySelectorAll("input[name='ext_vat[]']");
        let IntVat = document.querySelectorAll("input[name='int_vat[]']");

        let totalExtVat = 0;
        let totalIntVat = 0;

        for(let i = 0; i < extVat.length; i++){
            totalExtVat = totalExtVat + parseInt(extVat[i].value);
            totalIntVat = totalIntVat + parseInt(IntVat[i].value);
        }

        setTotalExtVat(totalExtVat);
        setTotalIncVat(totalIntVat);
    };

    const addLine = () => {
        let allLines = Lines;
        allLines.push(0);
        setLines(allLines);
        setReactEstDébile(ReactEstDébile+1);
    };

    let lineKey = 0;
    let lineOrder = 1;

    return(
        <div id="Generate">

            <div className="generateInfo">
                <div>
                    <h1 id="nameInvoice" contentEditable={true}>Nom de la facture</h1>
                </div>
            </div>


            <form id="form-add-invoice">
                <div className="Table">
                    <div className="flexSaveButton">
                        <div className="btn btn-success" id="saveButton" onClick={() => {submitForm(); updateTotal()}}>Sauvegarder</div>
                    </div>
                    <table id="table-add-invoice">
                        <thead>
                            <tr>
                                <th>Désignation</th>
                                <th>Unité</th>
                                <th>Prix à l'unité</th>
                                <th>TVA %</th>
                                <th>TVA €</th>
                                <th>HT</th>
                                <th>TTC</th>
                            </tr>
                        </thead>
                        <tbody id="table-add-invoice-body">
                            {Lines.map(element => {
                                return <Line key={lineKey++} data={[]} order={lineOrder++}/>
                            })}
                        </tbody>
                    </table>
                </div>
            </form>

            <div className="card-total">
                Total HT : {totalExtVat} € <br/>
                Total TTC : {totalIncVat} €
            </div>

            <div className="addLine">
                <div className="btn-add-invoice" onClick={() => {addLine()}}>Ajouter une ligne +</div>
            </div>
        </div>
    )
}

export default Generate;