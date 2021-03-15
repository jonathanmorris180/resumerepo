public with sharing class ProjectCalloutService {

    @InvocableMethod(label='Post Opportunity to PMS' category='Opportunity')
    public static void PostOpportunityToPMS(List<Id> currentRecord) {
        makeCallout(currentRecord[0]);
    }

    public static HttpResponse makeCallout(Id opportunityId) {
        HttpRequest callout = new HttpRequest();
        Http http = new Http();
        ServiceCredentials__c credentials = ServiceCredentials__c.getInstance('BillingServiceCredential');
        ServiceTokens__c token = ServiceTokens__c.getInstance('ProjectServiceToken');
        CalloutDetail details = returnOpportunityRecordDetails(opportunityId);

        callout.setEndpoint('callout:ProjectService');
        callout.setMethod('POST');
        callout.setHeader('Username', credentials.Username__c);
        callout.setHeader('Password', credentials.Password__c);
        callout.setHeader('token', token.Token__c);
        callout.setHeader('Content-Type', 'application/json');

        JSONGenerator generator = JSON.createGenerator(true);
        generator.writeStartObject();
        generator.writeIdField('opportunityId', details.opportunityId);
        generator.writeStringField('opportunityName', details.opportunityName);
        generator.writeStringField('accountName', details.accountName);
        generator.writeDateField('closeDate', details.closeDate);
        generator.writeNumberField('amount', details.amount.round());
        generator.writeEndObject();
        String request = generator.getAsString();

        callout.setBody(JSON.serialize(request));
        HttpResponse response = http.send(callout);
        Integer status = response.getStatusCode();
        if(status != null) {
            updateOpportunityRecord(opportunityId, status);
            return response;
        } else return null;
    }

    public class QueueablePMSCall implements Queueable, Database.AllowsCallouts {
        private Id recordId;
        public HttpResponse calloutResponse = new HttpResponse();

        public QueueablePMSCall(Id recordId) {
            this.recordId = recordId;
        }

        public void execute(QueueableContext context) {
            calloutResponse = makeCallout(recordId);
        }
    }

    private static void updateOpportunityRecord(Id opportunityRecord, Integer status) {
        Opportunity currentRecord = [SELECT Id, StageName FROM Opportunity WHERE Id = :opportunityRecord LIMIT 1];

        if(status == 200) {
            currentRecord.StageName = 'Submitted Project';
        } else {
            currentRecord.StageName = 'Resubmit Project';
        }

        update currentRecord;
    }

    public class CalloutDetail {
        public Id opportunityId; 
        public String opportunityName; 
        public String accountName;
        public Date closeDate;
        public Decimal amount;
    }

    public static CalloutDetail returnOpportunityRecordDetails(Id opportunityId) {
        Opportunity currentRecord = [SELECT Id, Name, Account.Name, CloseDate, Amount FROM Opportunity WHERE Id = :opportunityId LIMIT 1];
        CalloutDetail details = new CalloutDetail();
        details.opportunityId = currentRecord.Id;
        details.opportunityName = currentRecord.Name;
        details.accountName = currentRecord.Account.Name;
        details.closeDate = currentRecord.CloseDate;
        details.amount = currentRecord.Amount;
        return details;
    }
}
