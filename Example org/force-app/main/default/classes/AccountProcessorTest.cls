@isTest
private class AccountProcessorTest {
    @isTest
    private static void testAccountProcessor() {
        // Create fake account & two contacts
        System.debug(LoggingLevel.ERROR, 'Hello');
        Account a = new Account(Name='Test Name');
        insert a;
        Contact c = new Contact(FirstName='Test', LastName='Contact', AccountId=a.Id);
        Contact c2 = new Contact(FirstName='Other', LastName='Test', AccountId=a.Id);
        insert new List<sObject>{c, c2};

        List<Account> accList = [SELECT Id, (SELECT Id FROM Contacts) FROM Account WHERE Id =:a.Id];
        List<Id> idList = new List<Id>();
        for(Account acc : accList) {
            idList.add(acc.Id);
        }
        System.debug(JSON.serializePretty(idList));
        Test.startTest();
        AccountProcessor.countContacts(idList);
        Test.stopTest();

        Account act = [SELECT Id, Number_of_Contacts__c FROM Account WHERE Id =:a.Id];
        System.assertEquals(2, act.Number_of_Contacts__c);
    }
}
