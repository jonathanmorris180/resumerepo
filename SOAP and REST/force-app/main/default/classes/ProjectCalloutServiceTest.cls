@isTest
private class ProjectCalloutServiceTest {
    @testSetup
    static void makeData() {
        Account testAccount = new Account(Name = 'Test Account');
        insert testAccount;
        Opportunity testOpportunity = new Opportunity(Name = 'Test Opportunity', CloseDate = Date.today() + 7, StageName = 'Closed Won', AccountId = testAccount.Id, Amount = 10.00);
        insert testOpportunity;
        ServiceCredentials__c testCredentials = new ServiceCredentials__c(Name = 'BillingServiceCredential', Username__c = 'testUsername', Password__c = 'testPassword');
        insert testCredentials;
        ServiceTokens__c testToken = new ServiceTokens__c(Name = 'ProjectServiceToken', Token__c = 'testToken');
        insert testToken;
    }

    @isTest
    static void runCalloutTestSuccess() {
        Opportunity testOpportunity = [SELECT Id FROM Opportunity WHERE StageName = 'Closed Won' LIMIT 1];
        Test.setMock(HttpCalloutMock.class, new ProjectCalloutServiceMock());
        Test.startTest();
        HttpResponse response = ProjectCalloutService.makeCallout(testOpportunity.Id);
        Test.stopTest();

        String contentType = response.getHeader('Content-Type');
        String body = response.getBody();
        Integer statusCode = response.getStatusCode();

        System.assertEquals(contentType, 'application/json');
        System.assertEquals(body, '{"success":"true"}');
        System.assertEquals(statusCode, 200);
    }

    @isTest
    static void runCalloutTestFailure() {
        Opportunity testOpportunity = [SELECT Id FROM Opportunity WHERE StageName = 'Closed Won' LIMIT 1];
        Test.setMock(HttpCalloutMock.class, new ProjectCalloutServiceMockFailure());
        Test.startTest();
        HttpResponse response = ProjectCalloutService.makeCallout(testOpportunity.Id);
        Test.stopTest();

        String contentType = response.getHeader('Content-Type');
        String body = response.getBody();
        Integer statusCode = response.getStatusCode();

        System.assertEquals(contentType, 'application/json');
        System.assertEquals(body, '{"success":"false"}');
        System.assertEquals(statusCode, 400);
    }

    @isTest
    static void testQueueableCallout() {
        Opportunity testOpportunity = [SELECT Id FROM Opportunity WHERE StageName = 'Closed Won' LIMIT 1];
        Test.setMock(HttpCalloutMock.class, new ProjectCalloutServiceMock());
        Test.startTest();
        ProjectCalloutService.QueueablePMSCall queueableCallout = new ProjectCalloutService.QueueablePMSCall(testOpportunity.Id);
        queueableCallout.execute(null);
        Test.stopTest();

        String contentType = queueableCallout.calloutResponse.getHeader('Content-Type');
        String body = queueableCallout.calloutResponse.getBody();
        Integer statusCode = queueableCallout.calloutResponse.getStatusCode();

        System.assertEquals(contentType, 'application/json');
        System.assertEquals(body, '{"success":"true"}');
        System.assertEquals(statusCode, 200);
    }
}