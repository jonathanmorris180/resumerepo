public with sharing class AddPrimaryContact implements Queueable {
    private Contact cont;
    private String st;

    public AddPrimaryContact(Contact c, String state) {
        this.cont = c;
        this.st = state;
    }
    public void execute(QueueableContext context) {
        List<Contact> contactList = new List<Contact>();
        for(Account a : [SELECT Id FROM Account WHERE BillingState =:st LIMIT 200]) {
            Contact newCont = new Contact(FirstName=cont.FirstName, LastName=cont.LastName, AccountId=a.Id);
            contactList.add(newCont.clone());
        }
        insert contactList;
    }
}