import { LightningElement, api } from 'lwc';

export default class ProductTile extends LightningElement {
    @api draggable;
    _product;
    pictureURL;
    name;
    msrp;

    @api get product() {
        return this._product;
    }
    set product(value) {
        this._product = value;
        this.pictureURL = value.Picture_URL__c;
        this.name = value.Name;
        this.msrp = value.MSRP__c;
    }

    handleClick() {
        const selectedEvent = new CustomEvent('selected', {
            detail: this._product.Id
        });
        this.dispatchEvent(selectedEvent);
    }

    // Something to explore in the future
    handleDragStart(e) {
        e.dataTransfer.setData('product', JSON.stringify(this.product));
    }
}