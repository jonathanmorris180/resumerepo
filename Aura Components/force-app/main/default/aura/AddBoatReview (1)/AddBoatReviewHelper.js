({
    onInit : function(component) {
        console.log('--onInit called--');
        component.find('service').getNewRecord(
            'BoatReview__c', null, false,
            $A.getCallback(() => {
                let record = component.get('v.boatReview');
                let error = component.get('v.recordError');
                if(error || record === null) {
                    console.log('There was an error initialising the Boat Review record');
                    return;
                } else {
                    component.set('v.boatReview.Boat__c', component.get('v.boat').Id);
                    console.log('New boat review record: ' + JSON.stringify(component.get('v.newBoatReview')));
                    console.log('Boat Review initialised: ' + JSON.stringify(record));
                }
            })
        );
    }
})