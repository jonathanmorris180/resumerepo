import { LightningElement, track } from 'lwc';

export default class SimpleInterestCalculator extends LightningElement {
    @track currentOutput;
    principal;
    rateOfInterest;
    noOfYears;

    principalChangeHandler(e) {
        this.principal = parseInt(e.target.value);
    }
    timeChangeHandler(e) {
        this.noOfYears = parseInt(e.target.value);
    }
    rateChangeHandler(e) {
        this.rateOfInterest = parseInt(e.target.value);
    }

    calculateSIHandler() {
        this.currentOutput = 'Simple interest is: ' + (this.principal * this.rateOfInterest * this.noOfYears)/100;
    }
}