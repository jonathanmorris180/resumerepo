public with sharing class ForteController {
    String street = ApexPages.currentPage().getParameters().get('street1');
    String city = ApexPages.currentPage().getParameters().get('city1');
    String state = ApexPages.currentPage().getParameters().get('state1');
    String zip = ApexPages.currentPage().getParameters().get('zip1');
    String country = ApexPages.currentPage().getParameters().get('country1');
    String parks = ApexPages.currentPage().getParameters().get('parks');

    public String getStreet() {
        return street;
    }

    public String getCity() {
        return city;
    }

    public String getState() {
        return state;
    }

    public String getZip() {
        return zip;
    }

    public String getCountry() {
        return country;
    }

    public String getParks() {
        return parks;
    }

    // Create an array of Vendor addresses for geocoding
    public String[] getVendorAddressesByCityAndState() {
        String[] addresses = new List<String>();
        for(Vendor__c vendor : getVendorListByCityAndState()) {
            addresses.add(vendor.Address__c);
        }
        return addresses;
    }

    // Create an array of Vendor company names
    public String[] getVendorCompanyByCityAndState() {
        String[] companies = new List<String>();
        for(Vendor__c vendor : getVendorListByCityAndState()) {
            companies.add(vendor.Company__c);
        }
        return companies;
    }

    // Create an array of Vendor websites
    public String[] getVendorWebsiteByCityAndState() {
        String[] websites = new List<String>();
        for(Vendor__c vendor : getVendorListByCityAndState()) {
            websites.add(vendor.Website__c);
        }
        return websites;
    }

    // Retrieve list of Vendors by City and State
    public List<Vendor__c> getVendorListByCityAndState() {
        List<Vendor__c> vendorList = [SELECT Name, Company__c, Address__c, Program_Availability__c, Website__c FROM Vendor__c WHERE (Address__c LIKE :('%' + city + '%' + state + '%')) ORDER BY Company__c ASC NULLS LAST];
        return vendorList;
    }

    public List<Vendor__c> getVendorListByZipAndCountry() {
        List<Vendor__c> vendorList = [SELECT Name, Company__c, Address__c FROM Vendor__c WHERE (Address__c LIKE :('%' + zip + '%' + country + '%')) ORDER BY Company__c ASC NULLS LAST];
        return vendorList;
    }
}