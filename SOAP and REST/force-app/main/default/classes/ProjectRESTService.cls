@restResource(urlMapping = '/project')
global with sharing class ProjectRESTService {
    @testVisible private static Boolean throwException = false;

    @httpPost
    global static String postProjectData(String ProjectRef, String ProjectName, String OpportunityId, Date StartDate, Date EndDate, Double Amount, String Status) {
        List<Project__c> project = [SELECT Id, ProjectRef__c, Name, Opportunity__c, Opportunity__r.DeliveryInstallationStatus__c, Start_Date__c, End_Date__c, Billable_Amount__c, Status__c FROM Project__c WHERE Opportunity__r.Id = :OpportunityId LIMIT 1];
        List<Opportunity> opportunityRecord = [SELECT Id, DeliveryInstallationStatus__c, (SELECT Id FROM Projects__r) FROM Opportunity WHERE Id = :OpportunityId LIMIT 1];
        Savepoint savepoint = Database.setSavepoint();
        
        if(!project.isEmpty()) {
            project[0].Name = ProjectName;
            project[0].Start_Date__c = StartDate;
            project[0].End_Date__c = EndDate;
            project[0].Billable_Amount__c = Amount;
            project[0].Status__c = Status;
            opportunityRecord[0].DeliveryInstallationStatus__c = 'In progress';
            if(throwException) {
                opportunityRecord[0].StageName = null;
            }
            try {
                update project;
                update opportunityRecord; 
                return 'OK';
            } catch (Exception e) {
                Database.rollback(savepoint);
                return 'Error: ' + e;
            }
        } else if(!opportunityRecord.isEmpty() && opportunityRecord[0].Projects__r.isEmpty()) {
            Project__c newProject = new Project__c();
            newProject.Name = ProjectName;
            newProject.ProjectRef__c = ProjectRef;
            newProject.Opportunity__c = OpportunityId;
            newProject.Start_Date__c = StartDate;
            newProject.End_Date__c = EndDate;
            newProject.Billable_Amount__c = Amount;
            newProject.Status__c = Status;
            opportunityRecord[0].DeliveryInstallationStatus__c = 'In progress';
            if(throwException) {
                opportunityRecord[0].StageName = null;
            }
            try {
                insert newProject;
                update opportunityRecord; 
                return 'OK';
            } catch (Exception e) {
                Database.rollback(savepoint);
                return 'Error: ' + e;
            }
        } else {
            return 'Error: No Opportunity found.';
        }
    }
}