({
    onBoatSelected : function(component, event, helper) {
        console.log('--onBoatSelected fired--');
        let boat = event.getParam('boat');
        component.set('v.id', boat.Id);
        component.find('service').reloadRecord();
        console.log('boat: ' + component.get('v.boat'));
        console.log('id: ' + component.get('v.id'));
        console.log('service: ' + component.find('service'));
    },
    onRecordUpdated : function(component, event, helper) {
        let boatReviews = component.find('boatReviews');
        if(boatReviews) {
            boatReviews.refresh();
        }
        console.log('--onRecordUpdated called--');
    },
    onBoatReviewAdded : function(component) {
        let boatReviews = component.find('boatReviews');
        if(boatReviews) {
            boatReviews.refresh();
        }
        component.set('v.selectedTabId', 'boatreviewtab');
    }
})