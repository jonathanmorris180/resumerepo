public class BillingCalloutService {
    public static void callBillingService(List<Project__c> newProjects, Map<Id, Project__c> newMap, List<Project__c> oldProjects, Map<Id, Project__c> oldMap) {
        for(Project__c project : newProjects) {
            if(project.Status__c == 'Billable' && !Test.isRunningTest()) invokeCallout(project.Billable_Amount__c, project.ProjectRef__c, project.Id);
        }
    }

    @future(callout = true)
    public static void invokeCallout(Decimal billingAmount, String projectRef, Id recordId) {
        BillingServiceProxy.project projectDetails = new BillingServiceProxy.project();
        String username = ServiceCredentials__c.getInstance('BillingServiceCredential').Username__c;
        String password = ServiceCredentials__c.getInstance('BillingServiceCredential').Password__c;
        String response;

        projectDetails.billAmount = billingAmount != null ? billingAmount : 0;
        projectDetails.projectid = projectRef != null ? projectRef : '';
        projectDetails.username = username;
        projectDetails.password = password;

        try {
            BillingServiceProxy.InvoicesPortSoap11 callout = new BillingServiceProxy.InvoicesPortSoap11();
            response = callout.billProject(projectDetails);
        } catch (CalloutException e) {
            System.debug('There was an error making the callout. Error: ' + e);
        }

        if(response == 'ok') {
            Project__c recordToUpdate = [SELECT Id, Status__c FROM Project__c WHERE Id = :recordId LIMIT 1];
            recordToUpdate.Status__c = 'Billed';
            update recordToUpdate;
        }
    }
}