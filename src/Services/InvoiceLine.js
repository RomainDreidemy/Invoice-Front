import axios from "axios";

class InvoiceLine {
    static add(name, unit, unitPrice, vatPourcentage,sequence, Invoice){
        // Tableau de données à envoyer
        let toSend = {
            name,
            unit,
            unitPrice,
            vatPourcentage,
            sequence,
            Invoice
        };
        return new Promise(((resolve, reject) => {
            axios.post("https://127.0.0.1:8000/api/invoice_lines", toSend)
                .then(response => {
                    resolve();
                })
                .catch(() => {
                    reject()
                })
            ;
        }));
    }

    static delete(id){
        return new Promise(((resolve, reject) => {
            axios.delete("https://127.0.0.1:8000/api/invoice_lines/" + id).then(() => resolve()).catch(() => reject);
        }))
    }

    static getLinesByInvoiceId(invoiceId){
        return new Promise(((resolve, reject) => {
            axios.get(`${process.env.REACT_APP_API}invoice_lines?Invoice=${invoiceId}`)
                .then((response) => {
                    resolve(response.data['hydra:member']);
                })
        }))
    }
}

export default InvoiceLine;