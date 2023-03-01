function chart_report_sale()
{
  if($("#chartdivreportsale").length == 1){highChart();}
}




function highChart()
{

  Highcharts.chart('chartdivreportsale',
  {
    chart: {
      zoomType: 'x',
    },
    title: {
      text: $("#charttitle").html()
    },
    xAxis: [{
      categories: $.parseJSON($("#chartcategory").html()),
      crosshair: true
    }],
    yAxis: [{ // Primary yAxis
      labels: {
        format: '{value}',
      },
      title: {
        text: $("#charttitlesum").html(),
      }
    },
    { // Secondary yAxis
      title: {
        text: $("#charttitleunit").html(),
      },
      labels: {
        format: '{value}',
      },
      opposite: true
    }],
    legend: {
      layout: 'vertical',
      align: 'left',
      x: 120,
      verticalAlign: 'top',
      y: 50,
      floating: true,
      backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255,255,255,0.25)'
    },
    series:
    [
      {
        name: $("#charttitlesum").html(),
        type: 'column',
        data: $.parseJSON($("#chartvalue").html()),


      }
    ]
  });
}