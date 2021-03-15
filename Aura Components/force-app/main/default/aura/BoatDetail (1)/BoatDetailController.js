({
    doInit : function(component) {
        let viewRecordEvent = $A.get('e.force:navigateToSObject');
        if(viewRecordEvent) {
            component.set('v.fullDetailsVisible', true);
        }
    },
    onFullDetails : function(component) {
        let recordId = component.get('v.boat').Id;
        let viewRecordEvent = $A.get('e.force:navigateToSObject');
        if(viewRecordEvent) {
            viewRecordEvent.setParams({ 'recordId' : recordId });
            viewRecordEvent.fire();
        }
    }
})