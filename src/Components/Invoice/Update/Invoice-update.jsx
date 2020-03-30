import React, {useState,useEffect} from "react";
import {useParams} from 'react-router-dom';
import Line from "../Generate/Line/Line";
import axios from 'axios';
import InvoiceLine from '../../../Services/InvoiceLine';
import Invoice from '../../../Services/Invoice';
import SelectStatus from "./Status/SelectStatus";
import './Invoice-update.scss';

function UpdateInvoice() {
    //Identifiant dans l'url
    let { id } = useParams();

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

    //Récupère les données + les lignes
    const getData = () => {
        if(reload){
            Invoice.getById(id).then((response) => {
                let dateModified = new Date(response.dateModified);
                dateModified = `${dateModified.getDate()}/${dateModified.getMonth()+1}/${dateModified.getFullYear()}`;
                let dateCreated = new Date(response.dateCreated);
                dateCreated = `${dateCreated.getDate()}/${dateCreated.getMonth()+1}/${dateCreated.getFullYear()}`;
                response.dateModified = dateModified;
                response.dateCreated = dateCreated;
                setInvoiceDatas(response);
                InvoiceLine.getLinesByInvoiceId(response.id).then((datas) => {
                    let lines = [];
                    datas.map((line) => {
                        lines.push(<Line data={line} />);
                    });
                    setLinesDatas(lines);
                    updateTotaux()
                })
            });
            setReload(false)
        }
    };

    //Ajoute une ligne dans le tableau
    const addLine = () => {
        let allLines = Lines;
        allLines.push(0);
        setLines(allLines);
        setReactEstDébile(ReactEstDébile+1);
    };

    //Mets à jours les lignes uniquements
    //Todo: Essayer de racourcir le code
    const updateInvoiceLines = (e) => {
        setSaveDisable("d-none");
        setInprogress(true);
        let descriptions = document.querySelectorAll("input[name='description[]']");
        let unit = document.querySelectorAll("input[name='unit[]']");
        let unitPrice = document.querySelectorAll("input[name='unit_price[]']");
        let vatPourcentage = document.querySelectorAll("input[name='vat_pourcentage[]']");
        let order = document.querySelectorAll("input[name='order[]']");
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
        axios.patch("https://127.0.0.1:8000/api/invoices/" + id, data, {
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

    const updateTotaux = () => {
        let extVat = 0;
        let incVat = 0;
        document.querySelectorAll("input[name='ext_vat[]']").forEach((e) => {
            extVat = extVat + parseInt(e.value)
        });
        document.querySelectorAll("input[name='int_vat[]']").forEach((e) => {
            incVat = incVat + parseInt(e.value)
        });
        setTotalExtVat(extVat);
        setTotalIncVat(incVat);
    };


    let lineKey = 0;
    let lineOrder = linesDatas.length + 1;

    return (
        <div id="Generate">
            <div className="generateInfo">
                <div>
                    <h1 id="nameInvoice" contentEditable={true} onBlur={(e => Invoice.changeName(invoiceDatas.id, e.target.textContent))} >{invoiceDatas.name}</h1>
                    <p>Dernière modification : {invoiceDatas.dateModified}</p>
                    <p>Création : {invoiceDatas.dateCreated}</p>
                </div>
                <div id="saveAndStatus">
                    <SelectStatus id={invoiceDatas.id} status={invoiceDatas.status} />
                </div>

            </div>

            {
                inProgress ? <div className="alert alert-warning">La sauvegarde est en cours. La page va se recharger quand ça sera fini. Merci</div> : ""
            }

            <form id="form-add-invoice">
                <div className="Table">
                    <div className="flexSaveButton">
                        <div id="saveButton" className={"btn btn-success " + saveDisable} onClick={(e) => {updateInvoiceLines(e)}}>Sauvegarder</div>
                    </div>
                    <table id="table-add-invoice" onChange={() => updateTotaux()}>
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
                        {linesDatas}
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

            <div className="btn btn-danger" onClick={() => {
                if(window.confirm('Êtes vous sûr de bien vouloir supprimer cette facture ?')){
                    Invoice.delete(invoiceDatas.id).then(() => {
                        window.location.href = '/invoice'
                    })
                }
            }}>Supprimer</div>
        </div>
    );
}

export default UpdateInvoice;