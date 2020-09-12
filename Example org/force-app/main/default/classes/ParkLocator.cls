public with sharing class ParkLocator {
    public static String[] country(String country) {
        ParkService.ParksImplPort parkLocator = new ParkService.ParksImplPort();
        return parkLocator.byCountry(country);
    }
}