@isTest
private class BillingCalloutServiceTest {
    @testSetup
    private static void testSetup() {
        Account testAccount = new Account(Name = 'Test Account');
        insert testAccount;
        Opportunity testOpportunity = new Opportunity(Name = 'Test Opportunity', CloseDate = Date.today() + 7, StageName = 'Closed Won', AccountId = testAccount.Id, Amount = 10.00);
        insert testOpportunity;
        Project__c testProject = new Project__c(Name = 'Test Project', Opportunity__c = testOpportunity.Id, Status__c = 'Running');
        insert testProject;
        ServiceCredentials__c testCredentials = new ServiceCredentials__c(Name = 'BillingServiceCredential', Username__c = 'test', Password__c = 'test');
        insert testCredentials;
    }

    @isTest
    static void testCalloutSuccess() {
        Test.setMock(WebServiceMock.class, new BillingCalloutServiceMock());
        Project__c testProject = [SELECT Id, ProjectRef__c, Billable_Amount__c, Status__c FROM Project__c LIMIT 1];

        Test.startTest();
        BillingCalloutService.callBillingService(new List<Project__c>{testProject}, null, null, null);
        BillingCalloutService.invokeCallout(testProject.Billable_Amount__c, testProject.ProjectRef__c, testProject.Id);
        Test.stopTest();

        Project__c updatedProject = [SELECT Id, Status__c FROM Project__c LIMIT 1];
        System.assertEquals('Billed', updatedProject.Status__c);
    }
}