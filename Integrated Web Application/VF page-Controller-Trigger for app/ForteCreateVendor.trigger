trigger ForteCreateVendor on Lead (after insert) {
    Vendor__c v = new Vendor__c();

    for(Lead c : Trigger.New) {
        if(c.RecordTypeID == '0124S0000000Jh7') {
            v.Name = c.FirstName + ' ' + c.LastName;
            v.Address__c = c.Geocoded_Address__c;
            v.Company__c = c.Company;
            v.Email__c = c.Email;
            v.OwnerId = c.OwnerId;
            v.Phone__c = c.Phone;
            v.Website__c = c.Website;
            v.Program_Availability__c = c.Program_Availability__c;
            insert v;
        }
    }
}