({
    onSearch : function(component) {
        let action = component.get('c.getBoats');
        let boatId = component.get('v.boatTypeId').formData.boatTypeId;
        console.log('boatId: ' + JSON.stringify(boatId));
        action.setParams({
            'boatTypeId' : boatId
        });
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
    }
})
