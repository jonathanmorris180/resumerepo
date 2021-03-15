import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ShowToastEventExample extends LightningElement {

    handleSuccess() {
        const showSuccess = new ShowToastEvent({
            title:'Success!',
            message:'This is a success message',
            variant:'success'
        });
        this.dispatchEvent(showSuccess);
    }
    handleError() {
        const showError = new ShowToastEvent({
            title:'Error!',
            message:'This is an error message',
            variant:'error'
        });
        this.dispatchEvent(showError);
    }
    handleWarning() {
        const showWarning = new ShowToastEvent({
            title:'Warning!',
            message:'This is a warning message',
            variant:'warning'
        });
        this.dispatchEvent(showWarning);
    }
    handleInfo() {
        const showInfo = new ShowToastEvent({
            title:'Info',
            message:'This is an info message',
            variant:'info'
        });
        this.dispatchEvent(showInfo);
    }
}