public class ProjectCalloutServiceMockFailure implements HttpCalloutMock {
    public HttpResponse respond(HttpRequest request) {
        HttpResponse response = new HttpResponse();
        response.setHeader('Content-Type', 'application/json');
        response.setBody('{"success":"false"}');
        response.setStatusCode(400);
        return response;
    }
}