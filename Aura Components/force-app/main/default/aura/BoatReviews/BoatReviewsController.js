({
    doInit : function(component, event, helper) {
        helper.onInit(component, event);
    },
    onUserInfoClick : function(component, event) {
        console.log('--onUserInfoClick called--');
        let userId = event.target.dataset.userid;
        console.log('userid: ' + userId);
        let navEvent = $A.get('e.force:navigateToSObject');
        navEvent.setParams({ 'recordId' : userId });
        navEvent.fire();
    }
})