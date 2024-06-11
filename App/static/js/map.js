var map = L.map('map').setView([19.432608, -99.133209], 12);  // Centered on Mexico City

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

d3.json('/incidentes_coords').then(function(data) {
    data.forEach(function(incident) {
        L.marker([incident.latitud, incident.longitud])
            .bindPopup(`Type: ${incident.descripcion}<br>Alcaldia: ${incident.nombre}`)
            .addTo(map);
    });
}).catch(function(error) {console.log('Error fetching incident data:', error);});