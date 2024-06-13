// Fetch Alcaldia data and populate the dropdown
d3.json('/alcaldias').then(function(alcaldiaData) {
    // We Select the alcaldiaSelect Select id
    const select = document.getElementById('alcaldiaSelect');
    alcaldiaData.forEach(alcaldia => {
        // We add and html option element and populate with the alcaldia name fetch from /alcaldias json
        const option = document.createElement('option');
        option.value = alcaldia.nombre;
        option.text = alcaldia.nombre;
        select.appendChild(option);
    });

    // Fetch incident data and initialize the chart
    d3.json('/incidentes_plot1').then(function(data) {
        // Array that contains the incident_type
        const types = Array.from(new Set(data.map(d => d.incident_type)));

        // function takes alcaldia name as the entry value
        function updateChart(alcaldia) {
            // filter the data that contains only the same as the entry value of the function
            const filteredData = data.filter(d => d.alcaldia === alcaldia);
            // counts contains the number of counts and the types contains unique accident type
            const counts = types.map(type => {
                const incident = filteredData.find(d => d.incident_type === type);
                // uf there is no incident fount then the incident value is 0
                return incident ? incident.incident_count : 0;
            });
            // makeing the trace and type of graph
            const trace = {
                x: types,
                y: counts,
                type: 'bar'
            };
            const layout = {
                title: `Incidents by Type in ${alcaldia}`,
                xaxis: {
                    title: 'Incident Type',
                    tickangle: -45,
                    automargin: true
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

    }).catch(function(error) {console.log('Error fetching incident data:', error);});

}).catch(function(error) {console.log('Error fetching alcaldia data:', error);});




