import { LightningElement, track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';

export default class CreateContactLDS extends LightningElement {
    contactName;
    contactPhone;
    contactEmail;

    contactNameChangeHandler(e) {
        this.contactName = e.target.value;
    }
    contactPhoneChangeHandler(e) {
        this.contactPhone = e.target.value;
    }
    contactEmailChangeHandler(e) {
        this.contactEmail = e.target.value;
    }

    createContact() {
        const fields = {'LastName':this.contactName, 'Phone':this.contactPhone, 'Email':this.contactEmail};
        const recordInput = {'apiName':'Contact', fields};
        createRecord(recordInput).then((resp) => {
            console.log('Contact has been created: ' + resp.id);
        }).catch((err) => {
            console.log('There was an error creating the record: ' + err.body.message);
        });
    }
}