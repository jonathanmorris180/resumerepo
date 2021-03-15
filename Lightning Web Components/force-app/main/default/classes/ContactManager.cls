public with sharing class ContactManager {

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContact(Integer numberOfRecords) {
        return [SELECT Id, LastName, Phone FROM Contact LIMIT :numberOfRecords];
    }
}
