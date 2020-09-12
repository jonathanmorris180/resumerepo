@IsTest
private class AccountManagerTest {
    @isTest
    static void testGetAccounts() {
        Id acctId = createAccountRecord();
        RestRequest request = new RestRequest();
        request.requestUri = 'https://playful-shark-cj0qnn-dev-ed.lightning.force.com/services/apexrest/Accounts/'+ acctId +'/contacts';
        request.httpMethod = 'GET';
        RestContext.request = request;
        // Call the method to test
        Account thisAcct = AccountManager.getAccount();
        // Verify results
        System.assert(thisAcct != null);
        System.assertEquals('Test Account', thisAcct.Name);
    }
    static Id createAccountRecord() {
        // Create test record
        Account accountTest = new Account(Name='Test Account');
        insert accountTest;
        Contact newContact = new Contact(FirstName='Test', LastName='Contact', AccountId=accountTest.Id);
        insert newContact;
        return accountTest.Id;
    }          
}