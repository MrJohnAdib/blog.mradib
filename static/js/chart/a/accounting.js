function chart_a_accounting()
{
  if($("#chartdivaccountinghome").length == 1){chartdivaccountinghome();}
}




function chartdivaccountinghome()
{

  Highcharts.chart('chartdivaccountinghome', {
    chart: {
      type: 'column'
    },
    title: {
      text: $("#charttitle").html(),
    },
    xAxis: {
      categories: $.parseJSON($("#chardatacategory").html())
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
          name: $("#charttitleunit").html(),
          color: 'rgba(100,180,220,1)',
          data: $.parseJSON($("#chardatacount").html()),
          type: 'column',
        }

    ]
  });
}





