global class LeadProcessor implements Database.Batchable<SObject> {

    global Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator('SELECT Id FROM Lead');
    }
    global void execute(Database.BatchableContext bc, List<Lead> scope) {
        List<Lead> updatedLeads = new List<Lead>();
        for(Lead lead : scope) {
            lead.LeadSource = 'Dreamforce';
            updatedLeads.add(lead);
        }
        update updatedLeads;
    }
    global void finish(Database.BatchableContext bc) {
        System.debug('Job finished');
    }
}
