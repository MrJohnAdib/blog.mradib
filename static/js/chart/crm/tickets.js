function chart_crm_tickets()
{
  if($("#chartdivcmsticket").length == 1){highChartcmsTicket();}
}






function highChartcmsTicket()
{

  Highcharts.chart('chartdivcmsticket', {
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
    series: [
        {
          name: $("#charttickettitle").html(),
          color: 'rgba(205,220,55,1)',
          data: $.parseJSON($("#chartdataticket").html())
        },
        {
          name: $("#chartmessagetitle").html(),
          color: 'rgba(100,180,220,.9)',
          data: $.parseJSON($("#chartdatamessage").html()),
          type: 'line',
        }

    ]
  });
}
