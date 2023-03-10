/*
 Highcharts JS v8.2.0 (2020-08-20)

 Highcharts funnel module

 (c) 2010-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define("highcharts/modules/funnel",["highcharts"],function(e){b(e);b.Highcharts=e;return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){function e(b,l,n,e){b.hasOwnProperty(l)||(b[l]=e.apply(null,n))}var x=b?b._modules:{};e(x,"Series/FunnelSeries.js",[x["Core/Chart/Chart.js"],x["Core/Globals.js"],x["Core/Utilities.js"]],function(e,l,n){var x=l.noop,
C=l.seriesType,I=l.seriesTypes;l=n.addEvent;var J=n.fireEvent,K=n.isArray,H=n.pick;C("funnel","pie",{animation:!1,center:["50%","50%"],width:"90%",neckWidth:"30%",height:"100%",neckHeight:"25%",reversed:!1,size:!0,dataLabels:{connectorWidth:1,verticalAlign:"middle"},states:{select:{color:"#cccccc",borderColor:"#000000"}}},{animate:x,translate:function(){function a(a,c){return/%$/.test(a)?c*parseInt(a,10)/100:parseInt(a,10)}var r=0,c=this,g=c.chart,f=c.options,k=f.reversed,d=f.ignoreHiddenPoint,b=
g.plotWidth;g=g.plotHeight;var e=0,l=f.center,h=a(l[0],b),m=a(l[1],g),n=a(f.width,b),u,v=a(f.height,g),z=a(f.neckWidth,b),G=a(f.neckHeight,g),A=m-v/2+v-G;b=c.data;var D,E,C="left"===f.dataLabels.position?1:0,B,p,F,w,q,y,t;c.getWidthAt=function(a){var c=m-v/2;return a>A||v===G?z:z+(n-z)*(1-(a-c)/(v-G))};c.getX=function(a,d,b){return h+(d?-1:1)*(c.getWidthAt(k?2*m-a:a)/2+b.labelDistance)};c.center=[h,m,v];c.centerX=h;b.forEach(function(a){d&&!1===a.visible||(r+=a.y)});b.forEach(function(a){t=null;E=
r?a.y/r:0;p=m-v/2+e*v;q=p+E*v;u=c.getWidthAt(p);B=h-u/2;F=B+u;u=c.getWidthAt(q);w=h-u/2;y=w+u;p>A?(B=w=h-z/2,F=y=h+z/2):q>A&&(t=q,u=c.getWidthAt(A),w=h-u/2,y=w+u,q=A);k&&(p=2*m-p,q=2*m-q,null!==t&&(t=2*m-t));D=[["M",B,p],["L",F,p],["L",y,q]];null!==t&&D.push(["L",y,t],["L",w,t]);D.push(["L",w,q],["Z"]);a.shapeType="path";a.shapeArgs={d:D};a.percentage=100*E;a.plotX=h;a.plotY=(p+(t||q))/2;a.tooltipPos=[h,a.plotY];a.dlBox={x:w,y:p,topWidth:F-B,bottomWidth:y-w,height:Math.abs(H(t,q)-p),width:NaN};a.slice=
x;a.half=C;d&&!1===a.visible||(e+=E)});J(c,"afterTranslate")},sortByAngle:function(a){a.sort(function(a,c){return a.plotY-c.plotY})},drawDataLabels:function(){var a=this.data,b=this.options.dataLabels.distance,c,g=a.length;for(this.center[2]-=2*b;g--;){var f=a[g];var k=(c=f.half)?1:-1;var d=f.plotY;f.labelDistance=H(f.options.dataLabels&&f.options.dataLabels.distance,b);this.maxLabelDistance=Math.max(f.labelDistance,this.maxLabelDistance||0);var e=this.getX(d,c,f);f.labelPosition={natural:{x:0,y:d},
"final":{},alignment:c?"right":"left",connectorPosition:{breakAt:{x:e+(f.labelDistance-5)*k,y:d},touchingSliceAt:{x:e+f.labelDistance*k,y:d}}}}I[this.options.dataLabels.inside?"column":"pie"].prototype.drawDataLabels.call(this)},alignDataLabel:function(a,e,c,g,f){var k=a.series;g=k.options.reversed;var d=a.dlBox||a.shapeArgs,l=c.align,r=c.verticalAlign,n=((k.options||{}).dataLabels||{}).inside,h=k.center[1];k=k.getWidthAt((g?2*h-a.plotY:a.plotY)-d.height/2+e.height);k="middle"===r?(d.topWidth-d.bottomWidth)/
4:(k-d.bottomWidth)/2;h=d.y;var m=d.x;"middle"===r?h=d.y-d.height/2+e.height/2:"top"===r&&(h=d.y-d.height+e.height+c.padding);if("top"===r&&!g||"bottom"===r&&g||"middle"===r)"right"===l?m=d.x-c.padding+k:"left"===l&&(m=d.x+c.padding-k);g={x:m,y:g?h-d.height:h,width:d.bottomWidth,height:d.height};c.verticalAlign="bottom";n&&!a.visible||b.Series.prototype.alignDataLabel.call(this,a,e,c,g,f);n&&(!a.visible&&a.dataLabel&&(a.dataLabel.placed=!1),a.contrastColor&&e.css({color:a.contrastColor}))}});l(e,
"afterHideAllOverlappingLabels",function(){this.series.forEach(function(a){var b=a.options&&a.options.dataLabels;K(b)&&(b=b[0]);a.is("pie")&&a.placeDataLabels&&b&&!b.inside&&a.placeDataLabels()})});C("pyramid","funnel",{neckWidth:"0%",neckHeight:"0%",reversed:!0});""});e(x,"masters/modules/funnel.src.js",[],function(){})});


function chart_a_form_analyze()
{

  if($("#chartdiv").length == 1){highChart_analyze();}
}


function highChart_analyze()
{
	var data = $.parseJSON($("#chartdata").text());
	console.log(data);
	Highcharts.chart('chartdiv', {
  chart: {
    type: 'funnel'
  },
  title: {
    text: $("#charttitle").text()
  },
  plotOptions: {
    series: {
      dataLabels: {
        enabled: true,
        format: '<span>{point.name}</span> {point.y:,.0f}',
      useHTML: true,
        softConnector: true
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
