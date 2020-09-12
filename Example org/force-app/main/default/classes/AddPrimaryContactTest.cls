@isTest
private class AddPrimaryContactTest {
    @TestSetup
    static void testSetup(){
        List<Account> accts = new List<Account>();

        for(Integer i=0; i<50; i++) {
            accts.add(new Account(Name='Test Account' + i, BillingState='NY'));
            accts.add(new Account(Name='Test2 Account' + i, BillingState='CA'));
        }
        insert accts;
    }
    static testMethod void test() {
        Contact testCont = new Contact(FirstName='Test', LastName='Lastnametest');

        AddPrimaryContact addCont = new AddPrimaryContact(testCont, 'CA');
        Test.startTest();
        System.enqueueJob(addCont);
        Test.stopTest();

        System.assertEquals(50, [SELECT count() FROM Contact WHERE Account.BillingState='CA']);
    }
}
