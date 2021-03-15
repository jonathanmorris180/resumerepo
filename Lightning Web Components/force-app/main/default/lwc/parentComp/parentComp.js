import { LightningElement } from 'lwc';

export default class ParentComp extends LightningElement {
    handleChangeEvent(e) {
        this.template.querySelector('c-child-comp').changeMessage(e.target.value);
    }
}