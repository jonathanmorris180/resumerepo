@isTest
private class ParkLocatorTest {
    @isTest 
    static void testCallout() {              
        // This causes a fake response to be generated
        Test.setMock(WebServiceMock.class, new ParkServiceMock());
        // Call the method that invokes a callout
        String country = 'Germany';
        String[] result = ParkLocator.country(country);
        // Verify that a fake result is returned
        System.assertEquals(new String[]{'Park1', 'Park2', 'Park3'}, result); 
    }
}