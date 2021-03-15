import { LightningElement, track } from 'lwc';

export default class ShapeCalculator extends LightningElement {
    @track currentOutput;
    width;
    height;
    side;
    diagonal1;
    diagonal2;

    sideChangeHandler(e) {
        this.side = e.target.value;
    }
    widthChangeHandler(e) {
        this.width = e.target.value;
    }
    heightChangeHandler(e) {
        this.height = e.target.value;
    }
    diagonal1ChangeHandler(e) {
        this.diagonal1 = e.target.value;
    }
    diagonal2ChangeHandler(e) {
        this.diagonal2 = e.target.value;
    }

    // Calculate areas
    calculateSqAreaHandler() {
        const s = parseInt(this.side);
        this.currentOutput = 'Area of the square is: ' + s*s;
    }
    calculateRecAreaHandler() {
        const w = parseInt(this.width);
        const h = parseInt(this.height);
        this.currentOutput = 'Area of the rectangle is: ' + w*h;
    }
    calculateRhAreaHandler() {
        const d1 = parseInt(this.diagonal1);
        const d2 = parseInt(this.diagonal2);
        this.currentOutput = 'Area of the rhombus is: ' + (d1*d2)/2;
    }
}