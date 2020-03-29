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

    static getById(id){
        return new Promise(((resolve, reject) => {
            axios.get(`${process.env.REACT_APP_API}invoices/${id}`)
                .then(({data}) => resolve(data))
                .catch((err) => reject(err))
        }))
    }

    static add(name){
        return new Promise(((resolve, reject) => {
            axios.post(`${process.env.REACT_APP_API}invoices`, {
                dateModified: new Date(),
                dateCreated: new Date(),
                status: 4,
                User: '/api/users/3',
                name,
            }).then((response) => resolve(response)).catch((err) => reject(err))
        }))
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

    static calcExtVatForOneLine(unit, unitPrice){
        return unit * unitPrice;
    }

    static calcIncVatForOneLine(unit, unitPrice, vatPourcentage){
        return this.calcExtVatForOneLine(unit, unitPrice) + (this.calcExtVatForOneLine(unit, unitPrice) / 100 * vatPourcentage)
    }

    static calcVatEuroForOneLine(unit, unitPrice, vatPourcentage){
        return this.calcExtVatForOneLine(unit, unitPrice) / 100 * vatPourcentage
    }
}

export default Invoice;