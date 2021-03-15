import { LightningElement, wire } from 'lwc';
import { createMessageContext, publish } from 'lightning/messageService';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import CATEGORY_FIELD from '@salesforce/schema/Product__c.Category__c';
import LEVEL_FIELD from '@salesforce/schema/Product__c.Level__c';
import MATERIAL_FIELD from '@salesforce/schema/Product__c.Material__c';
import MESSAGE from '@salesforce/messageChannel/LwcExampleApp__c';

export default class ProductFilter extends LightningElement {
    context = createMessageContext();
    searchKey = '';
    maxPrice = 10000;
    filters = {
        searchKey: '',
        maxPrice: 10000
    };

    @wire(getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: CATEGORY_FIELD
    }) categories;
    @wire(getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: MATERIAL_FIELD
    }) materials;
    @wire(getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: LEVEL_FIELD
    }) levels;

    handleSearchKeyChange(e) {
        this.filters.searchKey = e.target.value;
        this.delayedFireFilterChangeEvent();
    }

    handleMaxPriceChange(e) {
        const maxPrice = e.target.value;
        this.filters.maxPrice = maxPrice;
        this.delayedFireFilterChangeEvent();
    }

    handleCheckboxChange(e) {
        if(!this.filters.categories) {
            // the getPicklistValues method returns a type of 'data.' You can then get the values from that and to get the individual string values you can convert the 'values' to it's own 'value' (i.e. values.value). This results in an array of picklist values. See more here: https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_wire_adapters_picklist_values
            this.filters.categories = this.categories.data.values.map(
                item => item.value
            );
            this.filters.levels = this.levels.data.values.map(
                item => item.value
            );
            this.filters.materials = this.materials.data.values.map(
                item => item.value
            );
        }
        // dataset.value refers to the HTML data-value attribute
        const value = e.target.dataset.value;
        // dataset.filter refers to the HTML data-filter attribute. this.filters[e.target.dataset.filter] retrieves an array within the filters[] array.
        const filterArray = this.filters[e.target.dataset.filter];
        if(e.target.checked) {
            if(!filterArray.includes(value)) {
                filterArray.push(value);
            } 
        } else {
            this.filters[e.target.dataset.filter] = filterArray.filter(
                item => item !== value
            );
        }
        publish(this.context, MESSAGE, {filterSelected: this.filters});
    }

    delayedFireFilterChangeEvent() {
        // debounce the method to avoid a lot of SOQL queries when the slider is moved
        window.clearTimeout(this.delayTimeout);
        this.delayTimeout = setTimeout(() => {
            publish(this.context, MESSAGE, {filterSelected: this.filters});
        }, 350);
    }
}