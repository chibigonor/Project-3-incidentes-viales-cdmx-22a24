var map = L.map('map').setView([19.432608, -99.133209], 12);  // Centered on Mexico City

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let markersLayer = L.markerClusterGroup().addTo(map);

// Fetch incident types and populate the selector
d3.json('/incident_types').then(function(data) {
    var selector = document.getElementById('incidentTypeSelector');
    if (!selector) {
        console.error('Incident type selector not found!');
        return;
    }

    data.forEach(function(incidentType) {
        var option = document.createElement('option');
        option.value = incidentType.descripcion;  // Use descripcion to match incident.descripcion
        option.text = incidentType.descripcion;
        selector.add(option);
    });

    d3.json('/incidentes_coords').then(function(data) {
        // Load incidents for the initially selected type
        console.log('Initial incident data:', data);
        if (selector.value) {
            loadIncidents(data, selector.value);
        }

        // Add event listener for selector change
        selector.addEventListener('change', function() {
            loadIncidents(data, selector.value);
        });
    }).catch(function(error) {
        console.log('Error fetching incident data:', error);
    });

}).catch(function(error) {
    console.log('Error fetching incident types:', error);
});

function loadIncidents(data, incidentType) {
    console.log('Loading incidents for type:', incidentType);
    markersLayer.clearLayers();  // Clear existing markers

    // this section selects the data that is equal to the incidenttype 
    var filteredData = data.filter(function(incident) {
        return incident.descripcion === incidentType;
    });

    console.log('Filtered data:', filteredData);
    // add the markers to the map as a layer to the map
    filteredData.forEach(function(incident) {
        var marker = L.marker([incident.latitud, incident.longitud])
            .bindPopup(`Type: ${incident.descripcion}<br>Alcaldia: ${incident.nombre}`);
        markersLayer.addLayer(marker);  // Add marker to layer
    });
}

