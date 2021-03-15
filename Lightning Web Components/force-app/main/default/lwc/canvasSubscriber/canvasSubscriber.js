import { LightningElement } from 'lwc';
import { createMessageContext, releaseMessageContext, APPLICATION_SCOPE, subscribe } from 'lightning/messageService';
import MYMC from '@salesforce/messageChannel/SampleMessageChannel__c';

export default class CanvasSubscriber extends LightningElement {
    context = createMessageContext();
    color;
    sub = null;

    connectedCallback() {
        if(this.sub) {
            return;
        }
        this.sub = subscribe(this.context, MYMC, (msg) => {
            this.handleChangedColor(msg);
        }, {scope: APPLICATION_SCOPE});
    }

    handleChangedColor(e) {
        console.log("Color from subscriber: " + e.color);
        this.color = e.color;
    }

    get colorStyle() {
        return `background-color: ${this.color}`;
    }

    disconnectedCallback() {
        releaseMessageContext(this.context);
    }
}