({
    onBoatClick : function(component) {
        let action = component.getEvent('boatSelect');
        let boatSelectEvent = $A.get('e.c:BoatSelected');
        let boat = component.get('v.boat');
        let plotMapMarkerEvent = $A.get('e.c:PlotMapMarker');
        console.log('boat from onBoatClick: ' + JSON.stringify(boat));
        console.log('onBoatClick boatId: ' + boat.Id);
        action.setParams({ 'boatId' : boat.Id });
        boatSelectEvent.setParams({ 'boat' : boat });
        plotMapMarkerEvent.setParams({ 
            'sObjectId' : boat.Id, 
            'lat' : boat.Geolocation__Latitude__s,
            'long' : boat.Geolocation__Longitude__s,
            'label' : boat.Name
        });
        action.fire();
        boatSelectEvent.fire();
        plotMapMarkerEvent.fire();
    }
})