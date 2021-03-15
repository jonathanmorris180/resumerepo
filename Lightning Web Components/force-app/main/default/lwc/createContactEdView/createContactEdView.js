import { LightningElement } from 'lwc';

export default class CreateContactEdView extends LightningElement {
    recordId;

    createContact(e) {
        this.recordId = e.detail.id;
    }
}