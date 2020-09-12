public with sharing class RandomContactFactory {
    public static List<Contact> generateRandomContacts(Integer numOfContacts, String lastName) {
        List<Contact> listOfContacts = new List<Contact>();

        for(Integer i = 0; i < numOfContacts; i++) {
            Contact ct = new Contact(FirstName='Test ' + (i+1));
            listOfContacts.add(ct);
        }
        return listOfContacts;
    }
}
