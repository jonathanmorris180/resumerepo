global class DailyLeadProcessor implements Schedulable {
    global void execute(SchedulableContext ctx) {
        List<Lead> leads = [SELECT Id, LeadSource FROM Lead WHERE LeadSource=null LIMIT 200];
        List<Lead> updatedLeads = new List<Lead>();

        for(Lead l : leads) {
            l.LeadSource = 'Dreamforce';
            updatedLeads.add(l);
        }
        update updatedLeads;
    }
}
