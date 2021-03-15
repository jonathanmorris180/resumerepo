import { LightningElement } from 'lwc';
import getAllContacts from '@salesforce/apex/ContactManager.getContact';

export default class FetchRecordsViaApex2 extends LightningElement {
    numberOfRecords;
    contacts;

    get responseReceived() {
        if(this.contacts) {
            return true;
        }
        return false;
    }

    numberOfContactChangeHandler(e) {
        this.numberOfRecords = e.target.value;
    }

    getContacts() {
        getAllContacts({numberOfRecords:this.numberOfRecords}).then(resp => {
            this.contacts = resp;
        }).catch(err => {
            console.log('Error retrieving contact records: ' + err.body.message);
        });
    }
}