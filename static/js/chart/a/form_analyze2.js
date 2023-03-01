

function chart_a_form_analyze2()
{

  if($("#chartdiv").length == 1){highChart_analyze2();}
}


function highChart_analyze2()
{
	var data = $.parseJSON($("#chartdata").text());
	console.log(data);
	Highcharts.chart('chartdiv', {
  chart: {
    type: 'bar'
  },
  title: {
    text: $("#charttitle").text()
  },
  plotOptions: {
    series: {
      dataLabels: {
        enabled: true,
        format: '<span>{point.name}</span> {point.y:,.0f}',
        softConnector: true,
        useHTML: true
      },
      center: ['40%', '50%'],
      neckWidth: '30%',
      neckHeight: '25%',
      width: '80%'
    }
  },
  legend: {
    enabled: false
  },
  series: [{
    name: $("#chartunit").text(),
    data: data
  }],

  responsive: {
    rules: [{
      condition: {
        maxWidth: 500
      },
      chartOptions: {
        plotOptions: {
          series: {
            dataLabels: {
              inside: true
            },
            center: ['50%', '50%'],
            width: '100%'
          }
        }
      }
    }]
  }
});


}
