import { LightningElement, track } from 'lwc';

export default class EmployeeDetailExample extends LightningElement {
    @track name;
    @track age;
    @track salary;

    nameHandler(e) {
        this.name = e.target.value;
    }
    ageHandler(e) {
        this.age = e.target.value;
    }
    salaryHandler(e) {
        this.salary = e.target.value;
    } 
}