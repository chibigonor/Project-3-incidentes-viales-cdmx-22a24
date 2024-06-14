d3.json('/incidentes_plot4').then(function(data) {
    const daysOfWeek = data.map(item => item.day_of_week.trim());
    const incidentCounts = data.map(item => item.incident_count);

    const trace = {
        labels: daysOfWeek,
        values: incidentCounts,
        type: 'pie'
    };

    const layout = {
        title: 'Weekdays with Most Incidents'
    };

    Plotly.newPlot('plot', [trace], layout);
}).catch(function(error) {
    console.log('Error fetching incident data:', error);
});