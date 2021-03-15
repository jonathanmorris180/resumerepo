public inherited sharing class BoatSearchFormController {

    @AuraEnabled
    public static List<BoatType__c> getBoatTypes(){
        try {
            return [SELECT Name FROM BoatType__c];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
