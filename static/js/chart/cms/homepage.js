function chart_cms_homepage()
{
  if($("#chartdivcmshome").length == 1){highChartcmshome();}
}






function highChartcmshome()
{

  Highcharts.chart('chartdivcmshome', {
    chart: {
      type: 'column'
    },
    title: {
      text: $("#charttitle").html(),
    },
    xAxis: {
      categories: $.parseJSON($("#chartcategory").html())
    },
    yAxis: {
      min: 0,
      title: {
        text: false
      }
    },
    tooltip: {
      shared: true,
    },
    legend: {
      align: 'right',
      x: -30,
      verticalAlign: 'top',
      y: 25,
      floating: true,
      backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'white',
      borderColor: '#CCC',
      borderWidth: 1,
      shadow: false
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        // dataLabels: {
        //   enabled: true
        // }
      }
    },
    series: [
        {
          name: $("#chardatatitlepublish").html(),
          color: 'rgba(100,180,220,1)',
          data: $.parseJSON($("#chartdatapublish").html()),
          type: 'column',
        },
        {
          name: $("#chardatatitle").html(),
          color: 'rgba(164,100,220,.5)',
          data: $.parseJSON($("#chartdatadraft").html()),
          type: 'line',
        },
    ]
  });
}
