import axios from 'axios';

class Invoice {
   static getInvoiceList(){
       return new Promise(resolve => {
           axios.get(`${process.env.REACT_APP_API}invoices`)
               .then(response => {
                   resolve(response.data["hydra:member"])
               });
       })

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
}

export default Invoice;