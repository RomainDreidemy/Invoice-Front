import axios from 'axios';
import InvoiceLine from "./InvoiceLine";

class Invoice {
    static getInvoiceList(){
       return new Promise(resolve => {
           axios.get(`${process.env.REACT_APP_API}invoices`)
               .then(response => {
                   resolve(response.data["hydra:member"])
               });
       })
   }

    static getById(){
    //    Todo: Récupérer les données par un identifiant
    }

    static add(name){
    //    Todo: Créer une nouvelle facture
    }


    static changeStatus(id, status){
        return new Promise(((resolve, reject) => {
            axios.patch(`${process.env.REACT_APP_API}invoices/${id}`, {status: parseInt(status)}, {
                headers: {
                    'Content-Type': 'application/merge-patch+json',
                }
            }).then(() => resolve()).catch(() => reject());
        }))
    }

    static changeName(id, name){
        return new Promise(((resolve, reject) => {
            axios.patch(`${process.env.REACT_APP_API}invoices/${id}`, {name}, {
                headers: {
                    'Content-Type': 'application/merge-patch+json',
                }
            }).then(() => resolve()).catch(() => reject());
        }))
    }

    static delete(id){
       return new Promise(((resolve, reject) => {
           //Récupération des lignes
           InvoiceLine.getLinesByInvoiceId(id).then((LinesToDelete) => {
               //Suppression des lignes
               let indexLineToDelete = 0;
               LinesToDelete.map((line) => {
                   InvoiceLine.delete(line.id).then(() => {
                       indexLineToDelete++;
                       if(indexLineToDelete === LinesToDelete.length){
                       //    Suppression de la facture
                           axios.delete(`${process.env.REACT_APP_API}invoices/${id}`).then(() => resolve()).catch((err) => {reject(err)})
                       }
                   })
               })
           });
       }))
    }
}

export default Invoice;