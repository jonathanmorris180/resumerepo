public with sharing class AccountProcessor {
    @future
    public static void countContacts(List<Id> acctIds) {
        List<Account> accounts = [SELECT Id, Number_of_Contacts__c, (SELECT Id FROM Contacts) FROM Account WHERE Id IN :acctIds];
        List<Account> newList = new List<Account>();
        for(Account a : accounts) {
            if(a.Contacts.size() > 0) {
                a.Number_of_Contacts__c = a.Contacts.size();
                newList.add(a);
            }
        }
        update newList;
    }
}
