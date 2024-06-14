// Populate the year dropdown
const years = [2021, 2022, 2023, 2024];
const yearSelect = document.getElementById('yearSelect');
years.forEach(year => {
    const option = document.createElement('option');
    option.value = year;
    option.text = year;
    yearSelect.appendChild(option);
});

// Fetch Colonia data and populate the dropdown
d3.json('/colonias').then(function(coloniaData) {
    const coloniaSelect = document.getElementById('coloniaSelect');
    coloniaData.forEach(colonia => {
        const option = document.createElement('option');
        option.value = colonia.nombre;
        option.text = colonia.nombre;
        coloniaSelect.appendChild(option);
    });

    // Fetch incident data and initialize the chart
    function updateChart(year, colonia) {
        d3.json(`/incident_count?year=${year}&colonia=${colonia}`).then(function(data) {
            const types = data.map(d => d.descripcion);
            const counts = data.map(d => d.count);

            const trace = {
                x: types,
                y: counts,
                type: 'bar'
            };
            const layout = {
                title: `Incidents by Type in ${colonia} (${year})`,
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
        }).catch(function(error) {
            console.log('Error fetching incident data:', error);
        });
    }

    // Initial chart update with the first Year and Colonia
    updateChart(yearSelect.value, coloniaSelect.value);

    // Event listeners for dropdown select change
    yearSelect.addEventListener('change', function() {
        updateChart(this.value, coloniaSelect.value);
    });

    coloniaSelect.addEventListener('change', function() {
        updateChart(yearSelect.value, this.value);
    });

}).catch(function(error) {
    console.log('Error fetching colonia data:', error);
});

