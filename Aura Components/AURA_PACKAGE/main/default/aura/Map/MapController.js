({
    onPlotMapMarker: function (component, event, helper) {
        console.log('--onPlotMapMarker called--');
        let lat = event.getParam('lat');
        let long = event.getParam('long');
        let id = event.getParam('sObjectId');
        let label = event.getParam('label');
        console.log('lat: ' + lat + ' long: ' + long + ' id: ' + id + ' label: ' + label);
        let mapMarker = [{
            location : {
                Latitude: lat,
                Longitude: long
            },
            icon: 'custom:custom92',
            value: id
        }];
        component.set('v.mapMarkers', mapMarker);
        component.set('v.markersTitle', label);
        component.set('v.zoomLevel', 10);
    }   
})