public inherited sharing class BoatSearchResults {

    @AuraEnabled
    public static List<Boat__c> getBoats(String boatTypeId){
        try {
            if(!String.isBlank(boatTypeId)) {
                return [SELECT Name, Geolocation__Latitude__s, Geolocation__Longitude__s, Contact__r.Name, Picture__c FROM Boat__c WHERE BoatType__r.Id = :boatTypeId];
            } else return [SELECT Name, Geolocation__Latitude__s, Geolocation__Longitude__s, Contact__r.Name, Picture__c FROM Boat__c];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}