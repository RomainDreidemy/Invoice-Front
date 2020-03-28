import React, {useState,useEffect} from "react";
import {useParams} from 'react-router-dom';
import Line from "../Generate/Line/Line";
import axios from 'axios';
import InvoiceLine from '../../../Services/InvoiceLine';
import Invoice from '../../../Services/Invoice';



function UpdateInvoice() {
    const [totalExtVat, setTotalExtVat] = useState(0);
    const [totalIncVat, setTotalIncVat] = useState(0);
    const [Lines, setLines] = useState([]);
    const [ReactEstDébile, setReactEstDébile] = useState(0);
    const [invoiceDatas, setInvoiceDatas] = useState([]);
    const [linesDatas, setLinesDatas] =useState([]);
    const [reload, setReload] = useState(true);
    const [saveDisable, setSaveDisable] = useState("");
    const [inProgress, setInprogress] = useState(false);

    useEffect(() => {
        getData()
    });

    let { id } = useParams();

    const getData = () => {
        if(reload){
            axios.get("https://127.0.0.1:8000/api/invoices/" + id)
                .then(response => {
                    setInvoiceDatas(response.data);
                });
            axios.get("https://127.0.0.1:8000/api/invoice_lines?Invoice=" + id)
                .then(response => {
                    let invoiceLines = response.data['hydra:member'];
                    let lines = [];
                    let ExtVAT = 0;
                    let IntVAT = 0;
                    let i = 0;
                    invoiceLines.map(line => {
                        lines.push(<Line data={line}/>)

                        ExtVAT = ExtVAT + (line.unitPrice * line.unit)
                        IntVAT = IntVAT + (line.unitPrice * line.unit) + ((line.unitPrice * line.unit) / 100 * line.vatPourcentage)

                    });

                    setTotalIncVat(IntVAT);
                    setTotalExtVat(ExtVAT);

                    setLinesDatas(lines);
                });

            setReload(false)
        }
    };

    getData();

    const addLine = () => {
        let allLines = Lines;
        allLines.push(0);
        setLines(allLines);
        setReactEstDébile(ReactEstDébile+1);
    };

    const updateInvoiceLines = (e) => {
        setSaveDisable("d-none");
        setInprogress(true);
        let descriptions = document.querySelectorAll("input[name='description[]']");
        let unit = document.querySelectorAll("input[name='unit[]']");
        let unitPrice = document.querySelectorAll("input[name='unit_price[]']");
        let vatPourcentage = document.querySelectorAll("input[name='vat_pourcentage[]']");
        let order = document.querySelectorAll("input[name='order[]']");
        let statut = document.getElementById("invoiceStatut");
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

        let data = {
            dateModified: new Date(),
        };

        // Mise a jour des infos Invoices
        axios.patch ("https://127.0.0.1:8000/api/invoices/" + id, data, {
            headers: {
                'Content-Type': 'application/merge-patch+json',
            }
            })
            .then(response => {
                console.log("Invoice updated");

                let nbLineDeleted = 0;
                // Suppression des lignes pour la facture
                if(linesDatas.length !== 0){
                    linesDatas.map(lineData => {
                        console.log(lineData.props.data.id);
                        InvoiceLine.delete(lineData.props.data.id).then(() => {
                            console.log("Suppresion de la ligne " + lineData.props.data.name);
                            nbLineDeleted++;
                            if(nbLineDeleted === linesDatas.length){
                                // Ajout de toutes les lignes
                                if(formData.length !== 0){

                                    let nbLineCreated = 0;
                                    formData.map(data => {
                                        InvoiceLine.add(data[0], data[1], data[2], data[3], data[4], "/api/invoices/" + id)
                                            .then(() => {
                                                nbLineCreated++;
                                                if(nbLineCreated === formData.length){
                                                    setSaveDisable("");
                                                    window.location.reload();
                                                }
                                            });
                                    });
                                }else {
                                    window.location.reload();
                                }
                            }
                        });
                    });
                }else {
                    if(formData.length !== 0){
                        let nbLineCreated = 0;
                        formData.map(data => {
                            InvoiceLine.add(data[0], data[1], data[2], data[3], data[4], "/api/invoices/" + id)
                                .then(() => {
                                    nbLineCreated++;
                                    if(nbLineCreated === formData.length){
                                        setSaveDisable("");
                                        window.location.reload();
                                    }
                                });
                        });
                    }else{
                        window.location.reload();
                    }
                }
            });
    };

    let lineKey = 0;
    let lineOrder = linesDatas.length + 1;

    return (
        <div id="Generate">

            <div className="generateInfo">
                <div>
                    <h1 id="nameInvoice" contentEditable={true} onBlur={(e => Invoice.changeName(invoiceDatas.id, e.target.textContent))} >{invoiceDatas.name}</h1>
                    <p>Date modified : 27/01/2019</p>
                    <p>Date created : 26/01/2019</p>
                </div>
                <div>
                    <select name="invoiceStatut" id="invoiceStatut" onChange={(e) => {
                        Invoice.changeStatus(invoiceDatas.id, e.target.value)
                    }}>
                        <option value="1" selected={invoiceDatas.status === 1} >Paid</option>
                        <option value="2" selected={invoiceDatas.status === 2}>Send</option>
                        <option value="3" selected={invoiceDatas.status === 3}>In waiting</option>
                        <option value="4" selected={invoiceDatas.status === 4}>To complete</option>
                    </select>
                    <div className={"btn btn-success " + saveDisable} onClick={(e) => {updateInvoiceLines(e)}}>Save</div>
                </div>

            </div>

            {
                inProgress ? <div className="alert alert-warning">La sauvegarde est en cours. La page va se recharger quand ça sera fini. Merci</div> : ""
            }

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
                        {linesDatas}
                        {Lines.map(element => {
                            return <Line key={lineKey++} data={[]} order={lineOrder++}/>
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

            <div onClick={() => {
                if(window.confirm('Êtes vous sûr de bien vouloir supprimer cette facture ?')){
                    Invoice.delete(invoiceDatas.id).then(() => {
                        window.location.href = '/invoice'
                    })
                }
            }}>Delete invoice</div>
        </div>
    );
}

export default UpdateInvoice;