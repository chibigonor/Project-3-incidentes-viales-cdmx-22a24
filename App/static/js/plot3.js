// Fetch Colonia data and populate the dropdown
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
        const types = Array.from(new Set(data.map(d => d.tipo_incidente)));

        function updateChart(colonia) {
            const filteredData = data.filter(d => d.colonia === colonia);
            const counts = types.map(type => {
                const incident = filteredData.find(d => d.tipo_incidente === type);
                return incident ? incident.incident_count : 0;
            });

            const trace = {
                x: types,
                y: counts,
                type: 'bar'
            };

            const layout = {
                title: `Incidentes por Tipo en ${colonia}`,
                xaxis: {
                    title: 'Tipo de Incidente',
                    tickangle: -45,
                    automargin: true
                },
                yaxis: {
                    title: 'Cantidad de Incidentes'
                },
                margin: {
                    b: 150
                }
            };

            Plotly.newPlot('plot', [trace], layout);
        }

        // Initial chart update with the first Colonia
        updateChart(select.value);

        // Event listener for dropdown select change
        select.addEventListener('change', function() {
            updateChart(this.value);
        });
    }).catch(function(error) {
        console.log('Error fetching incident data:', error);
    });
}).catch(function(error) {
    console.log('Error fetching colonia data:', error);
});