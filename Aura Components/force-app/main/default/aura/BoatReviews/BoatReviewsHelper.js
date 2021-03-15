({
    onInit : function(component, event) {
        let action = component.get('c.getAll');
        action.setParams({ boatId : component.get('v.boat').Id });
        action.setCallback(this, (response) => {
            let state = response.getState();
            if(state === 'SUCCESS') {
                console.log('--getAll was successful--');
                component.set('v.boatReviews', response.getReturnValue());
            } else if (state === 'ERROR') {
                console.log('There was an error retrieving the Boat Reviews');
            }
        });
        $A.enqueueAction(action);
    }
})