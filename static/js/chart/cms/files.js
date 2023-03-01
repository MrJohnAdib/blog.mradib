function chart_cms_files()
{
  if($("#chartdivcmsfiles").length == 1){highChartcmsfiles();}
  if($("#chartdivcmsfilessize").length == 1){highChartcmsfilessize();}
}





function highChartcmsfiles()
{

  Highcharts.chart('chartdivcmsfiles', {
    chart: {
      type: 'pie'
    },
   colors: [
     '#dcd267',
     '#6771dc',
     '#dc67ce',
     '#8bc34a',
     '#64E572',
     '#FF9655',
     '#FFF263',
     '#6AF9C4'
   ],
    title: {
      text: $("#charttitle").html(),
    },
    tooltip: {
      shared: true,
    },
    series: [{
        name: $('#charttitleunit').html(),
        colorByPoint: true,
        data: $.parseJSON($("#chartdata").html())
    }]
  });
}



function highChartcmsfilessize()
{

  Highcharts.chart('chartdivcmsfilessize', {
    chart: {
      type: 'pie'
    },
   colors: [
     '#dcd267',
     '#6771dc',
     '#dc67ce',
     '#8bc34a',
     '#64E572',
     '#FF9655',
     '#FFF263',
     '#6AF9C4'
   ],
    title: {
      text: $("#charttitlesize").html(),
    },
    tooltip: {
      shared: true,
    },
    series: [{
        name: $('#charttitleunitsize').html(),
        colorByPoint: true,
        data: $.parseJSON($("#chartdatasize").html())
    }]
  });
}
