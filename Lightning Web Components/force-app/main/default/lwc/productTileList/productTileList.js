import { LightningElement, wire, api } from 'lwc';
import { publish, createMessageContext, releaseMessageContext, APPLICATION_SCOPE, subscribe, unsubscribe } from 'lightning/messageService';
import getProducts from '@salesforce/apex/ProductController.getProducts';
import MESSAGE from '@salesforce/messageChannel/LwcExampleApp__c';

export default class ProductTileList extends LightningElement {
    @api searchBarIsVisible = false;
    @api tilesAreDraggable = false;
    pageNumber = 1;
    pageSize;
    totalItemCount = 0;
    filters = {};
    context = createMessageContext();
    sub = null;

    @wire(getProducts, {filters:'$filters', pageNumber:'$pageNumber'}) products;

    connectedCallback() {
        if(this.sub) {
            return;
        }
        this.sub = subscribe(this.context, MESSAGE, (m) => {
            this.handleFilterChange(m);
        }, {scope: APPLICATION_SCOPE});
    }

    handleProductSelected(e) {
        publish(this.context, MESSAGE, {productSelected: e.detail});
    }
    handlePreviousPage() {
        this.pageNumber = this.pageNumber - 1;
    }
    handleNextPage() {
        this.pageNumber = this.pageNumber + 1;
    }

    handleFilterChange(filters) {
        // the three dots are a spread operator that allow shallow-cloning (i.e. merging) of objects (similar to Object.assign())
        this.filters = {...filters.filterSelected};
        this.pageNumber = 1;
    }

    handleSearchKeyChange(e) {
        this.filters = {
            searchKey: e.target.value.toLowerCase()
        };
        this.pageNumber = 1;
    }

    disconnectedCallback() {
        unsubscribe(this.sub);
        this.sub = null;
        releaseMessageContext(this.context);
    }
}