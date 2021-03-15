({
    doInit : function(component) {
        let action = component.get('c.getBoats');
        action.setCallback(this, function(response) {
            let state = response.getState();
            if(state === 'SUCCESS') {
                component.set('v.boats', response.getReturnValue());
                console.log('success: ' + JSON.stringify(response.getReturnValue()));
            } else if(state === 'ERROR') {
                component.set('v.errors', response.getError());
            } else {
                alert('An unexpected error occurred when loading the component.');
            }
        });
        $A.enqueueAction(action);
    },
    doSearch : function(component, event, helper) {
        console.log('--doSearch called--');
        let params = event.getParam('arguments');
        if(params) {
            let boatId = params.boatTypeId;
            component.set('v.boatTypeId', boatId);
            console.log('boatTypeId from BoatSearchResultsController\'s doSearch: ' + boatId);
            helper.onSearch(component);
        }
    },
    onBoatSelect : function(component, event) {
        console.log('--onBoatSelect called--');
        let boatId = event.getParam('boatId');
        component.set('v.selectedBoatId', boatId);
    }
})
