@isTest
private class ProjectRESTServiceTest {

    @testSetup
    static void testSetup() {
        Account testAccount = new Account(Name = 'Test Account');
        insert testAccount;
        Opportunity testOpportunity = new Opportunity(Name = 'Test Opportunity', CloseDate = Date.today() + 7, StageName = 'Closed Won', AccountId = testAccount.Id, Amount = 10.00);
        insert testOpportunity;
    }

    @isTest
    static void testCreateProjectRecord() {
        Opportunity testOpportunity = [SELECT Id FROM Opportunity LIMIT 1];
        ProjectRESTService.postProjectData('Test', 'Test Project', testOpportunity.Id, Date.today(), Date.today() + 7, 10, 'Running');
        runAsserts('Test Project', 10);
    }

    @isTest
    static void testCreateProjectException() {
        Opportunity testOpportunity = [SELECT Id FROM Opportunity LIMIT 1];
        ProjectRESTService.throwException = true;
        String errorMessage = ProjectRESTService.postProjectData('Test', 'Test Project', testOpportunity.Id, Date.today(), Date.today() + 7, 10, 'Running');
        System.assertEquals(true, errorMessage.startsWith('Error:'));
    }

    @isTest
    static void testUpdateProjectRecord() {
        Opportunity testOpportunity = [SELECT Id FROM Opportunity LIMIT 1];
        ProjectRESTService.postProjectData('Test', 'Test Project', testOpportunity.Id, Date.today(), Date.today() + 7, 10, 'Running');
        ProjectRESTService.postProjectData('Test', 'Updated Test Project', testOpportunity.Id, Date.today(), Date.today() + 7, 50, 'Running');
        runAsserts('Updated Test Project', 50);
        ProjectRESTService.throwException = true;
        String errorMessage = ProjectRESTService.postProjectData('Test', 'Updated Test Project Again', testOpportunity.Id, Date.today(), Date.today() + 7, 50, 'Running');
        System.assertEquals(true, errorMessage.startsWith('Error:'));
    }

    private static void runAsserts(String projectName, Integer billableAmount) {
        Opportunity updatedOpportunity = [SELECT Id, DeliveryInstallationStatus__c, (SELECT Name, Billable_Amount__c FROM Projects__r) FROM Opportunity LIMIT 1];
        System.assertEquals(1, updatedOpportunity.Projects__r.size());
        System.assertEquals('In progress', updatedOpportunity.DeliveryInstallationStatus__c);
        System.assertEquals(billableAmount, updatedOpportunity.Projects__r[0].Billable_Amount__c);
        System.assertEquals(projectName, updatedOpportunity.Projects__r[0].Name);
    }
}