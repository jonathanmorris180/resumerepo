({
    doInit : function(component) {
        checkIfCreatable(component);
        let action = component.get('c.getBoatTypes');
        action.setCallback(this, function(response) {
            let state = response.getState();
            if(state === 'SUCCESS') {
                component.set('v.boatTypes', response.getReturnValue());
                console.log('success: ' + JSON.stringify(response.getReturnValue()));
            } else if(state === 'ERROR') {
                component.set('v.errors', response.getError());
            } else {
                alert('An unexpected error occurred when loading the component.');
            }
        });
        $A.enqueueAction(action);
        function checkIfCreatable(component) {
            let createRecordEvent = $A.get('e.force:createRecord');
            console.log('createRecordEvent: ' + createRecordEvent);
            if(createRecordEvent) {
                component.set('v.boatIsCreatable', true);
            }
        }
    },
    handleNew : function(component) {
        let createRecordEvent = $A.get('e.force:createRecord');
        let currentPicklistValue = component.get('v.selectedValue');
        if(currentPicklistValue) {
            createRecordEvent.setParams({
                'entityApiName' : 'Boat__c',
                'defaultFieldValues' : {
                    'BoatType__c' : currentPicklistValue
                }
            });
        } else {
            createRecordEvent.setParams({
                'entityApiName' : 'Boat__c',
            });
        }
        createRecordEvent.fire();
    },
    onFormSubmit : function(component) {
        let boatId = {
            'boatTypeId' : component.get('v.selectedValue')
        };
        console.log('boatId: ' + boatId);
        let searchBoat = component.getEvent('formsubmit');
        searchBoat.setParams({ 'formData' : boatId });
        console.log('searchBoat.getParams().formData: ' + JSON.stringify(searchBoat.getParams().formData));
        searchBoat.fire();
    }
})