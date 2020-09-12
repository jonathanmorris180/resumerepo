public class AnimalLocator {
    public static String getAnimalNameById(Integer i) {
        String result = null;
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://th-apex-http-callout.herokuapp.com/animals/' + i);
        request.setMethod('GET');
        HttpResponse response = http.send(request);

        if(response.getStatusCode() == 200) {
            Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            Map<String, Object> mapOfAnimals = (Map<String, Object>) results.get('animal');

            result = (String) mapOfAnimals.get('name');
        }
        return result;
    }
}