/*
 Highcharts JS v8.2.0 (2020-08-20)

 (c) 2016-2019 Highsoft AS
 Authors: Jon Arild Nygard

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define("highcharts/modules/wordcloud",["highcharts"],function(k){b(k);b.Highcharts=k;return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){function k(b,e,h,z){b.hasOwnProperty(e)||(b[e]=z.apply(null,h))}b=b?b._modules:{};k(b,"Mixins/DrawPoint.js",[],function(){var b=function(b){return"function"===typeof b},e=function(h){var e,r=this,m=r.graphic,u=h.animatableAttribs,
k=h.onComplete,p=h.css,y=h.renderer,t=null===(e=r.series)||void 0===e?void 0:e.options.animation;if(r.shouldDraw())m||(r.graphic=m=y[h.shapeType](h.shapeArgs).add(h.group)),m.css(p).attr(h.attribs).animate(u,h.isNew?!1:t,k);else if(m){var x=function(){r.graphic=m=m.destroy();b(k)&&k()};Object.keys(u).length?m.animate(u,void 0,function(){x()}):x()}};return{draw:e,drawPoint:function(b){(b.attribs=b.attribs||{})["class"]=this.getClassName();e.call(this,b)},isFn:b}});k(b,"Mixins/Polygon.js",[b["Core/Globals.js"],
b["Core/Utilities.js"]],function(b,e){var h=e.find,k=e.isArray,r=e.isNumber,m=b.deg2rad,u=function(a,c){c=r(c)?c:14;c=Math.pow(10,c);return Math.round(a*c)/c},G=function(a,c){var b=c[0]-a[0];a=c[1]-a[1];return[[-a,b],[a,-b]]},p=function(a,c){a=a.map(function(a){return a[0]*c[0]+a[1]*c[1]});return{min:Math.min.apply(this,a),max:Math.max.apply(this,a)}},y=function(a,c){var b=a[0];a=a[1];var l=m*-c;c=Math.cos(l);l=Math.sin(l);return[u(b*c-a*l),u(b*l+a*c)]},t=function(a,c,b){a=y([a[0]-c[0],a[1]-c[1]],
b);return[a[0]+c[0],a[1]+c[1]]},x=function(a){var c=a.axes;if(!k(c)){c=[];var b=b=a.concat([a[0]]);b.reduce(function(a,b){var l=G(a,b)[0];h(c,function(a){return a[0]===l[0]&&a[1]===l[1]})||c.push(l);return b});a.axes=c}return c},D=function(a,c){a=x(a);c=x(c);return a.concat(c)};return{getBoundingBoxFromPolygon:function(a){return a.reduce(function(a,b){var c=b[0];b=b[1];a.left=Math.min(c,a.left);a.right=Math.max(c,a.right);a.bottom=Math.max(b,a.bottom);a.top=Math.min(b,a.top);return a},{left:Number.MAX_VALUE,
right:-Number.MAX_VALUE,bottom:-Number.MAX_VALUE,top:Number.MAX_VALUE})},getPolygon:function(a,b,e,l,h){var c=[a,b],k=a-e/2;a+=e/2;e=b-l/2;b+=l/2;return[[k,e],[a,e],[a,b],[k,b]].map(function(a){return t(a,c,-h)})},isPolygonsColliding:function(a,b){var c=D(a,b);return!h(c,function(c){var e=p(a,c);c=p(b,c);return!!(c.min>e.max||c.max<e.min)})},movePolygon:function(a,b,e){return e.map(function(c){return[c[0]+a,c[1]+b]})},rotate2DToOrigin:y,rotate2DToPoint:t}});k(b,"Series/WordcloudSeries.js",[b["Core/Globals.js"],
b["Core/Utilities.js"],b["Mixins/DrawPoint.js"],b["Mixins/Polygon.js"]],function(b,e,h,k){function r(g,d){var f=!1,a=g.rect,b=g.polygon,H=g.lastCollidedWith,e=function(d){var f=d.rect;(f=!(f.left>a.right||f.right<a.left||f.top>a.bottom||f.bottom<a.top))&&(g.rotation%90||d.rotation%90)&&(f=E(b,d.polygon));return f};H&&((f=e(H))||delete g.lastCollidedWith);f||(f=!!c(d,function(d){var f=e(d);f&&(g.lastCollidedWith=d);return f}));return f}function m(g,d){d=4*g;var f=Math.ceil((Math.sqrt(d)-1)/2),a=2*
f+1,b=Math.pow(a,2),c=!1;--a;1E4>=g&&("boolean"===typeof c&&d>=b-a&&(c={x:f-(b-d),y:-f}),b-=a,"boolean"===typeof c&&d>=b-a&&(c={x:-f,y:-f+(b-d)}),b-=a,"boolean"===typeof c&&(c=d>=b-a?{x:-f+(b-d),y:f}:{x:f,y:f-(b-d-a)}),c.x*=5,c.y*=5);return c}function u(g,d,f){var a=2*Math.max(Math.abs(f.top),Math.abs(f.bottom));f=2*Math.max(Math.abs(f.left),Math.abs(f.right));return Math.min(0<f?1/f*g:1,0<a?1/a*d:1)}function G(g,d,a){a=a.reduce(function(a,g){g=g.dimensions;var d=Math.max(g.width,g.height);a.maxHeight=
Math.max(a.maxHeight,g.height);a.maxWidth=Math.max(a.maxWidth,g.width);a.area+=d*d;return a},{maxHeight:0,maxWidth:0,area:0});a=Math.max(a.maxHeight,a.maxWidth,.85*Math.sqrt(a.area));var b=g>d?g/d:1;g=d>g?d/g:1;return{width:a*b,height:a*g,ratioX:b,ratioY:g}}function p(a,d,b,c){var g=!1;l(a)&&l(d)&&l(b)&&l(c)&&0<a&&-1<d&&c>b&&(g=b+d%a*((c-b)/(a-1||1)));return g}function y(a,d){var g,b=[];for(g=1;1E4>g;g++)b.push(a(g,d));return function(a){return 1E4>=a?b[a-1]:!1}}function t(a,d){var g=d.width/2,b=
-(d.height/2),c=d.height/2;return!(-(d.width/2)<a.left&&g>a.right&&b<a.top&&c>a.bottom)}function x(g,d){var b=d.placed,c=d.field,e=d.rectangle,l=d.polygon,k=d.spiral,h=1,q={x:0,y:0},m=g.rect=a({},e);g.polygon=l;for(g.rotation=d.rotation;!1!==q&&(r(g,b)||t(m,c));)q=k(h),A(q)&&(m.left=e.left+q.x,m.right=e.right+q.x,m.top=e.top+q.y,m.bottom=e.bottom+q.y,g.polygon=M(q.x,q.y,l)),h++;return q}function D(a,d){if(A(a)&&A(d)){var b=d.bottom-d.top;var g=d.right-d.left;d=a.ratioX;var c=a.ratioY;b=g*d>b*c?g:
b;a=J(a,{width:a.width+b*d*2,height:a.height+b*c*2})}return a}var a=e.extend,c=e.find,z=e.isArray,l=e.isNumber,A=e.isObject,J=e.merge;e=e.seriesType;var K=k.getBoundingBoxFromPolygon,L=k.getPolygon,E=k.isPolygonsColliding,M=k.movePolygon,B=b.noop,C=b.Series;e("wordcloud","column",{allowExtendPlayingField:!0,animation:{duration:500},borderWidth:0,clip:!1,colorByPoint:!0,minFontSize:1,maxFontSize:25,placementStrategy:"center",rotation:{from:0,orientations:2,to:90},showInLegend:!1,spiral:"rectangular",
style:{fontFamily:"sans-serif",fontWeight:"900",whiteSpace:"nowrap"},tooltip:{followPointer:!0,pointFormat:'<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.weight}</b><br/>'}},{animate:C.prototype.animate,animateDrilldown:B,animateDrillupFrom:B,setClip:B,bindAxes:function(){var b={endOnTick:!1,gridLineWidth:0,lineWidth:0,maxPadding:0,startOnTick:!1,title:null,tickPositions:[]};C.prototype.bindAxes.call(this);a(this.yAxis.options,b);a(this.xAxis.options,b)},pointAttribs:function(a,
d){a=b.seriesTypes.column.prototype.pointAttribs.call(this,a,d);delete a.stroke;delete a["stroke-width"];return a},deriveFontSize:function(a,b,c){a=l(a)?a:0;b=l(b)?b:1;c=l(c)?c:1;return Math.floor(Math.max(c,a*b))},drawPoints:function(){var b=this,d=b.hasRendered,c=b.xAxis,e=b.yAxis,k=b.group,h=b.options,m=h.animation,r=h.allowExtendPlayingField,q=b.chart.renderer,p=q.text().add(k),t=[],z=b.placementStrategy[h.placementStrategy],B=h.rotation,E=b.points.map(function(a){return a.weight}),C=Math.max.apply(null,
E),F=b.points.concat().sort(function(a,b){return b.weight-a.weight});b.group.attr({scaleX:1,scaleY:1});F.forEach(function(d){var c=b.deriveFontSize(1/C*d.weight,h.maxFontSize,h.minFontSize);c=a({fontSize:c+"px"},h.style);p.css(c).attr({x:0,y:0,text:d.name});c=p.getBBox(!0);d.dimensions={height:c.height,width:c.width}});var v=G(c.len,e.len,F);var I=y(b.spirals[h.spiral],{field:v});F.forEach(function(c){var g=b.deriveFontSize(1/C*c.weight,h.maxFontSize,h.minFontSize);g=a({fontSize:g+"px"},h.style);
var f=z(c,{data:F,field:v,placed:t,rotation:B}),e=a(b.pointAttribs(c,c.selected&&"select"),{align:"center","alignment-baseline":"middle",x:f.x,y:f.y,text:c.name,rotation:f.rotation}),p=L(f.x,f.y,c.dimensions.width,c.dimensions.height,f.rotation),n=K(p),w=x(c,{rectangle:n,polygon:p,field:v,placed:t,spiral:I,rotation:f.rotation});!w&&r&&(v=D(v,n),w=x(c,{rectangle:n,polygon:p,field:v,placed:t,spiral:I,rotation:f.rotation}));if(A(w)){e.x+=w.x;e.y+=w.y;n.left+=w.x;n.right+=w.x;n.top+=w.y;n.bottom+=w.y;
f=v;if(!l(f.left)||f.left>n.left)f.left=n.left;if(!l(f.right)||f.right<n.right)f.right=n.right;if(!l(f.top)||f.top>n.top)f.top=n.top;if(!l(f.bottom)||f.bottom<n.bottom)f.bottom=n.bottom;v=f;t.push(c);c.isNull=!1}else c.isNull=!0;if(m){var u={x:e.x,y:e.y};d?(delete e.x,delete e.y):(e.x=0,e.y=0)}c.draw({animatableAttribs:u,attribs:e,css:g,group:k,renderer:q,shapeArgs:void 0,shapeType:"text"})});p=p.destroy();c=u(c.len,e.len,v);b.group.attr({scaleX:c,scaleY:c})},hasData:function(){return A(this)&&!0===
this.visible&&z(this.points)&&0<this.points.length},placementStrategy:{random:function(a,b){var c=b.field;b=b.rotation;return{x:Math.round(c.width*(Math.random()+.5)/2)-c.width/2,y:Math.round(c.height*(Math.random()+.5)/2)-c.height/2,rotation:p(b.orientations,a.index,b.from,b.to)}},center:function(a,b){b=b.rotation;return{x:0,y:0,rotation:p(b.orientations,a.index,b.from,b.to)}}},pointArrayMap:["weight"],spirals:{archimedean:function(a,b){var c=b.field;b=!1;c=c.width*c.width+c.height*c.height;var d=
.8*a;1E4>=a&&(b={x:d*Math.cos(d),y:d*Math.sin(d)},Math.min(Math.abs(b.x),Math.abs(b.y))<c||(b=!1));return b},rectangular:function(a,b){a=m(a,b);b=b.field;a&&(a.x*=b.ratioX,a.y*=b.ratioY);return a},square:m},utils:{extendPlayingField:D,getRotation:p,isPolygonsColliding:E,rotate2DToOrigin:k.rotate2DToOrigin,rotate2DToPoint:k.rotate2DToPoint},getPlotBox:function(){var a=this.chart,b=a.inverted,c=this[b?"yAxis":"xAxis"];b=this[b?"xAxis":"yAxis"];return{translateX:(c?c.left:a.plotLeft)+(c?c.len:a.plotWidth)/
2,translateY:(b?b.top:a.plotTop)+(b?b.len:a.plotHeight)/2,scaleX:1,scaleY:1}}},{draw:h.drawPoint,shouldDraw:function(){return!this.isNull},isValid:function(){return!0},weight:1})});k(b,"masters/modules/wordcloud.src.js",[],function(){})});



function chart_a_form_wordcloud()
{
  if($("#chartdivwordcloud").length == 1){highChart_wordcloud();}
}


function highChart_wordcloud()
{
  var text = $.parseJSON($("#chartdata").text());
  Highcharts.chart('chartdivwordcloud', {
    series: [{
      turboThreshold : 0,
      type: 'wordcloud',
      data: text,
      name: 'Occurrences'
    }],
    title: {
      text: $("#charttitle").text()
    }
  });
}
