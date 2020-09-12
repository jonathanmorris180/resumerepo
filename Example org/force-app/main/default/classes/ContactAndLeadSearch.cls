public with sharing class ContactAndLeadSearch {
    public static List<List<SObject>> searchContactsAndLeads(String input) {
        List<List<SObject>> finalList = [FIND :input IN NAME FIELDS RETURNING Contact(FirstName,LastName), Lead(FirstName,LastName)];

        return finalList;
    }
}