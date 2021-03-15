import { LightningElement, api } from 'lwc';

export default class ChildComp extends LightningElement {
    message;

    @api
    changeMessage(str) {
        this.message = str.toUpperCase();
    }
}