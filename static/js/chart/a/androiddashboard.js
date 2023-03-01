
function chart_a_androiddashboard()
{

  if($("#chartdiv").length == 1){highChart();}
  if($("#charttotaldownload").length == 1){highChart2();}
}





function highChart()
{

  Highcharts.chart('chartdiv',
  {
    title: { text: $("#chart1title").html() },
    xAxis: [{
      categories: $.parseJSON($("#chart1category").html()),
      crosshair: true
    }],
    yAxis: [{ title: false }],
    series:
    [
      {
        name: $("#charttitlecount").html(),
        data: $.parseJSON($("#chart1count").html()),
        type: 'column',
        showInLegend: false,
        tooltip: {
          valueSuffix: ' '+ $("#charttitlecount").html()
        }
      }
    ]
  });
}



function highChart2()
{

  Highcharts.chart('charttotaldownload',
  {
    title: { text: $("#chart2title").html() },
    xAxis: [{
      categories: $.parseJSON($("#chart2category").html()),
      crosshair: true
    }],
    yAxis: [{ title: false }],
    series:
    [
      {
        name: $("#charttitlecount").html(),
        data: $.parseJSON($("#chart2countall").html()),
        type: 'area',
        showInLegend: false,
        tooltip: {
          valueSuffix: ' ' + $("#charttitlecount").html()
        }
      }
    ]
  });
}