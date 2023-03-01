
function chart_a_form_charts()
{
  if($("#chartdivpie").length == 1){highChart_pie();}
  if($("#chartdivbar").length == 1){highChart_bar();}
}


function highChart_pie()
{

 Highcharts.chart('chartdivpie', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: $('#chartitemtitle').html()
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
        }
    },
    series: [{
        name: $('#chartitemtitle').html(),
        colorByPoint: true,
        data: $.parseJSON($("#chartdata").text())
    }]
});
}



function highChart_bar()
{

 Highcharts.chart('chartdivbar', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'column'
    },
    title: {
        text: $('#chartitemtitle').html()
    },
    plotOptions: {
        column: {
            allowPointSelect: true,
            cursor: 'pointer',
        }
    },
    series: [{
        name: $('#chartitemtitle').html(),
        colorByPoint: true,
        data: $.parseJSON($("#chartdata").text())
    }]
});
}

