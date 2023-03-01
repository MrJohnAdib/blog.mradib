
function chart_love_business_answer()
{
  if($('#chartdivpieskipanswer').length == 1){highChart_pie_l();}
  if($('#chartdivbarskipanswer').length == 1){highChart_bar_l();}
  if($('#chartdivq1love').length == 1){highChart_pie_q1();}
  if($('#chartdivq2love').length == 1){highChart_pie_q2();}
  if($('#chartdivq3love').length == 1){highChart_pie_q3();}
}






function highChart_pie_l()
{

 Highcharts.chart('chartdivpieskipanswer', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: $('#charttitleskipanswer').html()
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
        }
    },
    series: [{
        name: $('#charttitleskipanswer').html(),
        colorByPoint: true,
        data: $.parseJSON($('#chartdataskipanswer').text())
    }]
});
}



function highChart_bar_l()
{

 Highcharts.chart('chartdivbarskipanswer', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'column'
    },
    title: {
        text: $('#charttitleskipanswer').html()
    },
    plotOptions: {
        column: {
            allowPointSelect: true,
            cursor: 'pointer',
        }
    },
    series: [{
        name: $('#charttitleskipanswer').html(),
        colorByPoint: true,
        data: $.parseJSON($('#chartdataskipanswer').text())
    }]
});
}




function highChart_pie_q1()
{

 Highcharts.chart('chartdivq1love', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'column'
    },
    title: {
        text: $('#chartdivq1lovetitle').html()
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
        }
    },
    series: [{
        name: $('#chartdivq1lovetitle').html(),
        colorByPoint: true,
        data: $.parseJSON($('#chartdivq1lovedata').text())
    }]
});
}

function highChart_pie_q2()
{

 Highcharts.chart('chartdivq2love', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'column'
    },
    title: {
        text: $('#chartdivq2lovetitle').html()
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
        }
    },
    series: [{
        name: $('#chartdivq2lovetitle').html(),
        colorByPoint: true,
        data: $.parseJSON($('#chartdivq2lovedata').text())
    }]
});
}

function highChart_pie_q3()
{

 Highcharts.chart('chartdivq3love', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'column'
    },
    title: {
        text: $('#chartdivq3lovetitle').html()
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
        }
    },
    series: [{
        name: $('#chartdivq3lovetitle').html(),
        colorByPoint: true,
        data: $.parseJSON($('#chartdivq3lovedata').text())
    }]
});
}