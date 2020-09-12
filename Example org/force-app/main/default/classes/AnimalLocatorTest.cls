@isTest
private class AnimalLocatorTest {
    @isTest
    static void testAnimalNameById() {
        Test.setMock(HttpCalloutMock.class, new AnimalLocatorMock());
        String response = AnimalLocator.getAnimalNameById(1);
        System.assertNotEquals(null, response, 'The callout returned a null response.');
        System.assertEquals('Testname', response);
    }
}