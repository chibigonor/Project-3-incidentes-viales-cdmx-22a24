// Fetch Alcaldia data and populate the dropdown
d3.json('/alcaldias').then(function(alcaldiaData) {
    const select = document.getElementById('alcaldiaSelect');
    alcaldiaData.forEach(alcaldia => {
        const option = document.createElement('option');
        option.value = alcaldia.nombre;
        option.text = alcaldia.nombre;
        select.appendChild(option);
    });

    // Fetch incident data and initialize the chart
    d3.json('/incidentes_plot1').then(function(data) {
        const types = Array.from(new Set(data.map(d => d.incident_type)));

        function updateChart(alcaldia) {
            const filteredData = data.filter(d => d.alcaldia === alcaldia);
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
                title: `Incidents by Type in ${alcaldia}`,
                xaxis: {
                    title: 'Incident Type',
                    tickangle: -45
                },
                yaxis: {
                    title: 'Incident Count'
                },
                margin: {
                    b: 150
                }
            };

            Plotly.newPlot('plot', [trace], layout);
        }

        // Initial chart update with the first Alcaldia
        updateChart(select.value);

        // Event listener for dropdown select change
        select.addEventListener('change', function() {
            updateChart(this.value);
        });
    }).catch(function(error) {
        console.log('Error fetching incident data:', error);
    });
}).catch(function(error) {
    console.log('Error fetching alcaldia data:', error);
});




