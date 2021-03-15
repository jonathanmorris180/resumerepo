trigger ProjectTrigger on Project__c (after update) {
    if(Trigger.isAfter && Trigger.isUpdate) {
        BillingCalloutService.callBillingService(Trigger.new, Trigger.newMap, Trigger.old, Trigger.oldMap);
    }
}