import { LightningElement } from 'lwc';

export default class ChildComponent2 extends LightningElement {
    handleChange(e) {
        const name = e.target.value;
        const selectEvent = new CustomEvent('mycustomevent', {detail:name, bubbles:true});
        this.dispatchEvent(selectEvent);
    }
}