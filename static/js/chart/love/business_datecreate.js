
function chart_love_business_datecreate()
{
  if($('#lovechartdivstoreDay').length == 1){highChart_bar_lovechartdivstoreDay();}
  if($('#lovechartdivstoreMonth').length == 1){highChart_bar_lovechartdivstoreMonth();}
  if($('#lovechartdivstoreYear').length == 1){highChart_bar_lovechartdivstoreYear();}

}









// chartdivstoreMonthloveTitle
// chartdivstoreMonthloveCategory
// chartdivstoreMonthloveData
// chartdivstoreYearloveTitle
// chartdivstoreYearloveCategory
// chartdivstoreYearloveData





function highChart_bar_lovechartdivstoreDay()
{

 Highcharts.chart('lovechartdivstoreDay', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        zoomType : 'x',
        type: 'column'
    },
     xAxis: {
    categories: $.parseJSON($('#chartdivstoreDayloveCategory').text()),
    crosshair: true
  },
    title: {
        text: $('#chartdivstoreDayloveTitle').html()
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
        data: $.parseJSON($('#chartdivstoreDayloveData').text())
    }]
});
}




function highChart_bar_lovechartdivstoreMonth()
{

 Highcharts.chart('lovechartdivstoreMonth', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        zoomType : 'x',
        type: 'column'
    },
     xAxis: {
    categories: $.parseJSON($('#chartdivstoreMonthloveCategory').text()),
    crosshair: true
  },
    title: {
        text: $('#chartdivstoreMonthloveTitle').html()
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
        data: $.parseJSON($('#chartdivstoreMonthloveData').text())
    }]
});
}




function highChart_bar_lovechartdivstoreYear()
{

 Highcharts.chart('lovechartdivstoreYear', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        zoomType : 'x',
        type: 'column'
    },
     xAxis: {
    categories: $.parseJSON($('#chartdivstoreYearloveCategory').text()),
    crosshair: true
  },
    title: {
        text: $('#chartdivstoreYearloveTitle').html()
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
        data: $.parseJSON($('#chartdivstoreYearloveData').text())
    }]
});
}
