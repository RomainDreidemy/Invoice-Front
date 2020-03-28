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
                    console.log("Création de ligne dans la facture");
                    resolve();
                })
                .catch(() => {
                    console.error("Une erreur est survenu lors de l'ajout d'une ligne");
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
}

export default InvoiceLine;