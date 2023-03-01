function chart_crm_homepage()
{
  if($("#chartdivcrmhome").length == 1){highChartcrmhome();}
}






function highChartcrmhome()
{

  Highcharts.chart('chartdivcrmhome', {
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
        text: $("#charttitleunit").html()
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
    series: [
    {
          name: $("#chartverifytitle").html(),
          color: 'rgba(100,220,118,1)',
          data: $.parseJSON($("#chartverify").html())
        },
        {
          name: $("#chartunverifytitle").html(),
          color: 'rgba(128,100,220,.8)',
          data: $.parseJSON($("#chartunverify").html()),
          type: 'line',
        }
    ]
  });
}

