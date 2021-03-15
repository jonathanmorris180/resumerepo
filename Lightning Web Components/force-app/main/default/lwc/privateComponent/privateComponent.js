import { LightningElement, track } from 'lwc';

export default class PrivateComponent extends LightningElement {
    @track reactivePrivateProperty;
    nonReactivePrivateProperty;

    changeHandler1(e) {
        this.reactivePrivateProperty = e.target.value;
    }
    changeHandler2(e) {
        this.nonReactivePrivateProperty = e.target.value;
    }
}