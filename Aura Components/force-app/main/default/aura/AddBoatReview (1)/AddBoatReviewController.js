({
    doInit : function(component, event, helper) {
        helper.onInit(component, event);
    },
    onRecordUpdated : function(component) {
        let toast = $A.get('e.force:showToast');
        if(toast) {
            toast.setParams({
                'title' : 'Saved',
                'message' : 'The record was updated successfully!'
            });
            toast.fire();
        } else {
            alert('The review was updated successfully!');
        }
    },
    onSave : function(component, event, helper) {
        component.find('service').saveRecord((result) => {
            if(result.state === 'SUCCESS') {
                let resultToast = $A.get('e.force:showToast');
                if(resultToast) {
                    resultToast.setParams({
                        'title' : 'Saved',
                        'message' : 'The review was saved successfully!'
                    });
                    resultToast.fire();
                } else {
                    alert('The review was saved successfully!');
                }
            } else if(result.state === 'ERROR') {
                console.log('There was an error saving the review.');
            }
        });
        component.getEvent('BoatReviewAdded').fire();
        helper.onInit(component);
    }
})