// Fetch neighborhood (colonia) data and populate the dropdown
d3.json('/colonias').then(function(coloniaData) {
    const select = document.getElementById('coloniaSelect');
    coloniaData.forEach(colonia => {
        const option = document.createElement('option');
        option.value = colonia.nombre;
        option.text = colonia.nombre;
        select.appendChild(option);
    });

    // Fetch incident data and initialize the chart
    d3.json('/incidentes_plot3').then(function(data) {
        const types = Array.from(new Set(data.map(d => d.incident_type)));

        function updateChart(colonia) {
            const filteredData = data.filter(d => d.colonia === colonia);
            const counts = types.map(type => {
                const incident = filteredData.find(d => d.incident_type === type);
                return incident ? incident.incident_count : 0;
            });

            const trace = {
                x: types,
                y: counts,
                type: 'bar'
            };

            const layout = {
                title: `Incidents by Type in ${colonia}`,
                xaxis: {
                    title: 'Incident Type',
                    tickangle: -45,
                    automargin: true
                },
                yaxis: {
                    title: 'Number of Incidents'
                },
                margin: {
                    b: 150
                }
            };

            Plotly.newPlot('plot', [trace], layout);
        }

        // Initial chart update with the first neighborhood
        updateChart(select.value);

        // Event listener for dropdown select change
        select.addEventListener('change', function() {
            updateChart(this.value);
        });
    }).catch(function(error) {
        console.log('Error fetching incident data:', error);
    });
}).catch(function(error) {
    console.log('Error fetching neighborhood data:', error);
});