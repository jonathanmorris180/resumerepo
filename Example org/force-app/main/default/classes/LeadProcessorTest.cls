@isTest
private class LeadProcessorTest {
    @testSetup
    private static void setup() {
        List<Lead> leads = new List<Lead>();
        for(Integer i=0; i<200; i++) {
            leads.add(new Lead(FirstName='Test', LastName='Lastname', Company='Testcomp'));
        }
        insert leads;
    }
    private static testMethod void test() {
        Test.startTest();
        LeadProcessor lp = new LeadProcessor();
        Id job = Database.executeBatch(lp);
        Test.stopTest();
        List<Lead> finalList = [SELECT Id, LeadSource FROM Lead WHERE Company='Testcomp'];
        for(Lead l : finalList) {
            System.assertEquals('Dreamforce', l.LeadSource);
        }
    }
}
