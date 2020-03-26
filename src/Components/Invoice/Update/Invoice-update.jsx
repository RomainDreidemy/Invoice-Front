import React, {useState,useEffect} from "react";
import {useParams} from 'react-router-dom';
import Line from "../Generate/Line/Line";
import axios from 'axios';



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
                    invoiceLines.map(line => {
                        lines.push(<Line data={line}/>)

                        ExtVAT = ExtVAT + (line.unitPrice * line.unit)
                        IntVAT = IntVAT + (line.unitPrice * line.unit) + ((line.unitPrice * line.unit) / 100 * line.vatPourcentage)

                    });

                    setTotalIncVat(IntVAT)
                    setTotalExtVat(ExtVAT)

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
            "name": Name
        };

        // Mise a jour des infos Invoices
        axios.patch ("https://127.0.0.1:8000/api/invoices/" + id, data, {
            headers: {
                'Content-Type': 'application/merge-patch+json',
            }
            })
            .then(response => {
                console.log("Invoice updated")
            });


        let nbLineDeleted = 0
        // Suppression des lignes pour la facture
        linesDatas.map(lineData => {
            console.log(lineData.props.data.id);
            axios.delete("https://127.0.0.1:8000/api/invoice_lines/" + lineData.props.data.id)
                .then(response => {
                    console.log("Suppresion de la ligne " + lineData.props.data.name);
                    nbLineDeleted++;
                    if(nbLineDeleted === linesDatas.length){
                        // Ajout de toute les lignes
                        let nbLineCreated = 0;
                        formData.map(data => {
                            let toSend = {
                                name: data[0],
                                unit: data[1],
                                unitPrice: data[2],
                                vatPourcentage: data[3],
                                sequence: data[4],
                                Invoice: "/api/invoices/" + id
                            };

                            axios.post("https://127.0.0.1:8000/api/invoice_lines", toSend)
                                .then(response => {
                                    console.log("Création de ligne dans la facture");

                                    nbLineCreated++;
                                    if(nbLineCreated === formData.length){
                                        setSaveDisable("");
                                        window.location.reload();
                                    }
                                });

                        });
                    }
                })
        });


    };

    let lineKey = 0;
    let lineOrder = linesDatas.length + 1;

    return (
        <div id="Generate">

            <div className="generateInfo">
                <div>
                    <h1 id="nameInvoice" contentEditable={true}>{invoiceDatas.name}</h1>
                    <p>Date modified : 27/01/2019</p>
                    <p>Date created : 26/01/2019</p>
                </div>
                <div className={"btn btn-success " + saveDisable} onClick={(e) => {updateInvoiceLines(e)}}>Save</div>
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
        </div>
    );
}

export default UpdateInvoice;