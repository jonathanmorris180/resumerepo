import { LightningElement, wire } from 'lwc';
import { createMessageContext, releaseMessageContext, APPLICATION_SCOPE, subscribe, unsubscribe } from 'lightning/messageService';
import { NavigationMixin } from 'lightning/navigation';
import { getRecord } from 'lightning/uiRecordApi';
import PRODUCT_OBJECT from '@salesforce/schema/Product__c';
import MESSAGE from '@salesforce/messageChannel/LwcExampleApp__c';
import NAME_FIELD from '@salesforce/schema/Product__c.Name';
import LEVEL_FIELD from '@salesforce/schema/Product__c.Level__c';
import CATEGORY_FIELD from '@salesforce/schema/Product__c.Category__c';
import MATERIAL_FIELD from '@salesforce/schema/Product__c.Material__c';
import MSRP_FIELD from '@salesforce/schema/Product__c.MSRP__c';
import PICTURE_URL_FIELD from '@salesforce/schema/Product__c.Picture_URL__c';

const fields = [NAME_FIELD, LEVEL_FIELD, CATEGORY_FIELD, MATERIAL_FIELD, MSRP_FIELD, PICTURE_URL_FIELD];


export default class ProductCard extends NavigationMixin(LightningElement) {
    recordId;
    context = createMessageContext();
    sub = null;
    
    @wire(getRecord, {recordId:'$recordId', fields}) product;

    connectedCallback() {
        if(this.sub) {
            return;
        }
        this.sub = subscribe(this.context, MESSAGE, (m) => {
            this.handleProductSelected(m);
        }, {scope: APPLICATION_SCOPE});
    }

    handleProductSelected(productId) {
        console.log(productId.productSelected);
        this.recordId = productId.productSelected;
    }

    get noData() {
        return !this.product.error && !this.product.data;
    }

    handleNavigateToRecord() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: PRODUCT_OBJECT.objectApiName,
                actionName: 'view'
            }
        });
    }

    disconnectedCallback() {
        unsubscribe(this.sub);
        this.sub = null;
        releaseMessageContext(this.context);
    }
}