import { LightningElement } from 'lwc';
import { publish, MessageContext, createMessageContext } from 'lightning/messageService';
import MYMC from '@salesforce/messageChannel/SampleMessageChannel__c';

export default class PalettePublisher extends LightningElement {
    context = createMessageContext();
    color;
    colorCodeOptions = [
        {label: "Green", value: "green"},
        {label: "Red", value: "red"},
        {label: "Yellow", value: "yellow"},
        {label: "Blue", value: "blue"}
    ];

    changeColor(e) {
        this.color = e.target.value;
    }

    handleChangeColor(e) {
        console.log("Color from publisher: " + this.color);
        publish(this.context, MYMC, {color: this.color});
    }

    disconnectedCallback() {
        releaseMessageContext(this.context);
    }
}