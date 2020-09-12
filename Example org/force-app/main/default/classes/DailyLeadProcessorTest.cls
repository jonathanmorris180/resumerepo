@isTest
private class DailyLeadProcessorTest {
    @TestSetup
    static void testSetup() {
        List<Lead> leads = new List<Lead>();

        for(Integer i=0; i<200; i++) {
            leads.add(new Lead(FirstName='Lead' + i, LastName='Test', Company='Test Comp'));
        }
        insert leads;
    }

    static testMethod void test() {
        String cron = '0 0 0 7 8 ? 2020';
        DailyLeadProcessor processor = new DailyLeadProcessor();

        Test.startTest();
        String job = System.schedule('Test Schedule', cron, processor);
        Test.stopTest();

        Integer results = [SELECT count() FROM Lead WHERE LeadSource = 'Dreamforce'];
        System.assertEquals(200, results);
    }
}
