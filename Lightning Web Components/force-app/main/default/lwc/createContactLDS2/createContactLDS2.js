import { LightningElement, wire } from 'lwc';
import { createRecord, getRecord } from 'lightning/uiRecordApi';
const fieldArray = ['Contact.LastName', 'Contact.Phone', 'Contact.Email'];

export default class CreateContactLDS2 extends LightningElement {
    contactName;
    contactPhone;
    contactEmail;
    recordId;
    
    // For more information on why the dollar sign is necessary below, see: https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.data_wire_example
    @wire(getRecord, {recordId:'$recordId', fields:fieldArray}) contactRecord;

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
        const recordInput = {apiName:'Contact', fields};
        createRecord(recordInput).then(resp => {
            console.log('A contact has been created: ' + resp.id);
            this.recordId = resp.id;
        }).catch(err => {
            console.log('There was an error: ' + err.body.message);
        });
    }

    get retContactName() {
        if(this.contactRecord.data) {
            return this.contactRecord.data.fields.LastName.value;
        }
        return undefined;
    }
    get retContactPhone() {
        if(this.contactRecord.data) {
            return this.contactRecord.data.fields.Phone.value;
        }
        return undefined;
    }
    get retContactEmail() {
        if(this.contactRecord.data) {
            return this.contactRecord.data.fields.Email.value;
        }
        return undefined;
    }
}