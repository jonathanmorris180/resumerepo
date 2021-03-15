public with sharing class ProjectCalloutServiceMock implements HttpCalloutMock {
    public HttpResponse respond(HttpRequest request) {
        HttpResponse response = new HttpResponse();
        response.setHeader('Content-Type', 'application/json');
        response.setBody('{"success":"true"}');
        response.setStatusCode(200);
        return response;
    }
}
