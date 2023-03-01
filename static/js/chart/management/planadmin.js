function chart_management_planadmin() {

    if ($("#chartdivplanadmin").length == 1) {
        chartdivplanadmin();
    }
}


function chartdivplanadmin() {

    Highcharts.chart('chartdivplanadmin',
        {
            chart: {
                type: 'column'
            },
            title: {text: $("#chartplanadmintitle").text()},
            xAxis: [{
                categories: $.parseJSON($("#chartdivplanadmincategory").text()),
                crosshair: true
            }],
            yAxis: [{title: false}],
            series: $.parseJSON($("#chartdivplanadminseries").text()),

        });
}

