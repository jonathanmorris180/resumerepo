({
    onFormSubmit : function(component, event) {
        console.log('--onFormSubmit called--');
        let boatTypeId = event.getParams();
        let searchResultsComponent = component.find('searchResultsComponent');
        console.log('searchResultsComponent: ' + searchResultsComponent);
        searchResultsComponent.search(boatTypeId);
    }
})