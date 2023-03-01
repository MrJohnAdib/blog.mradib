function chart_a_homepage()
{
  if($("#chartdiv").length == 1){highChart();}
}




function highChart()
{

  Highcharts.chart('chartdiv',
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
        data: $.parseJSON($("#chartsum").html()),
        tooltip: {
          valueSuffix: ' ' + $("#charttitleunit").html()
        }

      },
      {
        name: $("#charttitlecount").html(),
        type: 'spline',
        yAxis: 1,
        data: $.parseJSON($("#chartcount").html()),
        tooltip: {
          valueSuffix: ' ' + $("#charttitlecount").html()
        }
      }
    ]
  });
}