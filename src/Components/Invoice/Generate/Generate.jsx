import React, {useState, useEffect} from "react";
import './Generate.scss';
import Line from "./Line/Line";

function submitForm(){

    let descriptions = document.querySelectorAll("input[name='description[]']");
    let unit = document.querySelectorAll("input[name='unit[]']");
    let unitPrice = document.querySelectorAll("input[name='unit_price[]']");
    let vatPourcentage = document.querySelectorAll("input[name='vat_pourcentage[]']");
    let vatEuro = document.querySelectorAll("input[name='vat_euro[]']");
    let extVat = document.querySelectorAll("input[name='ext_vat[]']");
    let IntVat = document.querySelectorAll("input[name='int_vat[]']");
    let formData = [];

    for(let i = 0; i < descriptions.length; i++){
        formData.push([
            descriptions[i].value,
            unit[i].value,
            unitPrice[i].value,
            vatPourcentage[i].value,
            vatEuro[i].value,
            extVat[i].value,
            IntVat[i].value,
        ]);
    }

    console.log(formData);
}

function Generate() {
    const [totalExtVat, setTotalExtVat] = useState(0);
    const [totalIncVat, setTotalIncVat] = useState(0);
    const [Lines, setLines] = useState([0]);
    const [ReactEstDébile, setReactEstDébile] = useState(0);

    const updateTotal = () => {
        console.log("update...");
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
    }

    return(
        <div id="Generate">

            <div className="generateInfo">
                <div>
                    <h1 contentEditable={true}>Set name</h1>
                    <p>Date modified : 27/01/2019</p>
                    <p>Date created : 26/01/2019</p>
                </div>
                <div className="btn btn-success" onClick={() => {submitForm(); updateTotal()}}>Save</div>
            </div>


            <form id="form-add-invoice">
                <div className="Table">
                    <table id="table-add-invoice">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Unit</th>
                                <th>Unit Price</th>
                                <th>VAT %</th>
                                <th>VAT €</th>
                                <th>Ext VAT</th>
                                <th>Inc VAT</th>
                            </tr>
                        </thead>
                        <tbody id="table-add-invoice-body">
                            {Lines.map(element => {
                                return <Line/>
                            })}
                        </tbody>
                    </table>
                </div>
            </form>

            <div className="card-total">
                Total Ext VAT : {totalExtVat} € <br/>
                Total Inc VAT : {totalIncVat} €
            </div>

            <div className="addLine">
                <div className="btn-add-invoice" onClick={() => {addLine()}}>New invoice +</div>
            </div>
        </div>
    )
}

export default Generate;