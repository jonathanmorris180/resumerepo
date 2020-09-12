@isTest
private class TestVerifyDate {
    @isTest static void testSetEndOfMonth() {
        Date today = Date.today();
        Date fortyDaysLater = Date.today().addDays(40);
        Date check1 = VerifyDate.CheckDates(today, fortyDaysLater);
        System.assertEquals(Date.newInstance(2020, 7, 31), check1);
    }

    @isTest static void testUseDateTwo() {
        Date today = Date.today();
        Date check2 = VerifyDate.CheckDates(today, Date.today().addDays(5));
        System.assertEquals(Date.today().addDays(5), check2);
    }

/*     @isTest static void testDateTwoLessThanOne() {
        Date today = Date.today();
        Boolean check3 = VerifyDate.DateWithin30Days(today, Date.today().addDays(-4));
        System.assertEquals(false, check3);
    }

    @isTest static void testDateTwoGreaterThanThirty() {
        Date today = Date.today();
        Date fortyDaysLater = Date.today().addDays(40);
        Boolean check4 = VerifyDate.DateWithin30Days(today, fortyDaysLater);
        System.assertEquals(false, check4);
    }

    @isTest static void testDateTwoLessThanThirty() {
        Date today = Date.today();
        Boolean check5 = VerifyDate.DateWithin30Days(today, Date.today().addDays(3));
        System.assertEquals(true, check5);
    }

    @isTest static void testEndOfMonth() {
        Date today = Date.today();
        Date check6 = VerifyDate.SetEndOfMonthDate(today);
        System.assertEquals(Date.newInstance(2020, 7, 31), check6);
    } */
}