const boomVer = 7;

function readPageAllScripts(_force, _page)
{
  // run each script if exist
  readPageScript(_force, _page);
  readPageChart();
  readPageEditor();
  readDigikalaCrawler();
  readPageSortable();
  readPageCropper();
  readPageFancyBox();
  readPageJsTree();
  readPageDatatable();
  readPageCodeEditor();
  readPageSlick();
  readPageSwiper();
  readPageSelect2();
  readPageUploader();
  readPageRangeSlider();
  readPageVideoJs();
  readPageVideoPlyr();

  // bootstrap accordion
  readBootstrapAccordion();

  loadThirdPartyScripts();
}


function readPageScript(_force, _url)
{
  var myScriptURL;
  if(_url)
  {
    myScriptURL = _url;
  }
  else
  {
    myScriptURL = $('.js [data-pagescript]').attr('data-pagescript');
    $('.js [data-pagescript]').remove();
  }

  if(myScriptURL && myScriptURL.length > 0)
  {
    myScriptURL = urlJibres('cdn') + "js/page/" + myScriptURL;
    fileLoader(myScriptURL, 'pageScript', _force);
  }
}


function readPageChart()
{
  var myChartURL    = $('.chart[data-abc]').attr('data-abc');
  var myChartURLVer = $('.chart[data-abc]').attr('data-abc-v');

  if(myChartURL && myChartURL.length > 0)
  {
    var fnName       = myChartURL;
    var highChartUrl = urlJibres('cdn') + 'lib/highcharts/highcharts-8.2.0.js?v=' + boomVer;
    myChartURL       = urlJibres('cdn') + "js/chart/" + myChartURL + '.js';
    if(myChartURLVer)
    {
      myChartURL += '?v=' + myChartURLVer;
    }

    fnName = fnName.replace('/', '_');
    if(fnName)
    {
      fnName = 'chart_' + fnName;
    }

    fileLoader(highChartUrl, fnName, true, myChartURL);
  }
}


function readPageEditor()
{
  var myEl = $('.txt[data-editor]');

  if(myEl && myEl.length > 0)
  {
    myUrl = urlJibres('cdn') + "lib/ckeditor5/29.1.0/ckeditor.js?v=" + boomVer;
    fileLoader(myUrl, 'runEditor', true);
  }
}


function readDigikalaCrawler()
{
  var myEl = $('[data-digikala-crawl]');

  if(myEl && myEl.length > 0)
  {
    myUrl = urlJibres('cdn') + "lib/digikalaCrawlMaster/digikalaCrawlMaster.js?v=" + boomVer;
    fileLoader(myUrl, 'runDigiKalaCrawlMaster', true);
  }
}


function readPageSortable()
{
  var myEl = $('[data-sortable]');

  if(myEl && myEl.length > 0)
  {
    // load script
    myUrl = urlJibres('cdn') + "lib/sortable/sortable-1.13.0.min.js?v=" + boomVer;
    fileLoader(myUrl, 'runSortable', true);
  }
}


function readPageCropper()
{
  var myEl = $('[data-cropper]');

  if(myEl && myEl.length > 0)
  {
    // load style
    StyleLoader(urlJibres('cdn') + "css/lib/cropperjs-2.0.0.css?v=" + boomVer);
    myUrl = urlJibres('cdn') + "js/cropperjs/cropper-2.0.0.min.js?v=" + boomVer;
    fileLoader(myUrl, 'runCropper', true);
  }
}


function readPageFancyBox()
{
  var myEl = $('[data-fancybox]');

  if(myEl && myEl.length > 0)
  {
    // load script
    StyleLoader(urlJibres('cdn') + "lib/fancyapps/fancybox-4.0.5.min.css?v=" + boomVer);
    myUrl = urlJibres('cdn') + "lib/fancyapps/fancybox-4.0.5.min.js?v=" + boomVer;
    fileLoader(myUrl, 'runFancybox', true);
  }
}


function readPageJsTree()
{
  var myEl = $('[data-jstree]');

  if(myEl && myEl.length > 0)
  {
    // load script
    StyleLoader(urlJibres('cdn') + "lib/jstree/jstree-3.3.10.css?v=" + boomVer);
    myUrl = urlJibres('cdn') + "lib/jstree/jstree-3.3.10.min.js?v=" + boomVer;
    fileLoader(myUrl, 'runJstree', true);
  }
}


function readPageDatatable()
{
  var myEl = $('[data-datatable]');

  if(myEl && myEl.length > 0)
  {
    // load script
    StyleLoader(urlJibres('cdn') + "lib/datatable/1.11.2/datatables.min.css?v=" + boomVer);
    myUrl = urlJibres('cdn') + "lib/datatable/1.11.2/datatables.min.js?v=" + boomVer;
    fileLoader(myUrl, 'runDatatable', true);
  }
}


function readPageCodeEditor()
{
  var myEl = $('[data-code-editor]');

  if(myEl && myEl.length > 0)
  {
    // load script
    myUrl = urlJibres('cdn') + "lib/ace/1.4.12/ace-runner.js?v=" + boomVer;
    fileLoader(myUrl, 'runACE', true);
  }
}


function readPageSlick()
{
  var myEl = $('[data-slider]');

  if(myEl && myEl.length > 0)
  {
    // load script
    StyleLoader(urlJibres('cdn') + "lib/slick/1.8.1/slick-final.css?v=") + boomVer;
    myUrl = urlJibres('cdn') + "lib/slick/1.8.1/slick.min.js?v=" + boomVer;
    fileLoader(myUrl, 'runPageSlickSlider', true);
  }
}


function readPageSwiper()
{
  var myEl = $('[data-swiper]');

  if(myEl && myEl.length > 0)
  {
    // load script
    StyleLoader(urlJibres('cdn') + "lib/swiper/7.0.1/swiper-bundle.min.css?v=" + boomVer);
    myUrl = urlJibres('cdn') + "lib/swiper/7.0.1/swiper-bundle.min.js?v=" + boomVer;
    fileLoader(myUrl, 'runPageSwiperSlider', true);
  }
}


function readPageSelect2()
{
  var myEl = $('.select22');

  if(myEl && myEl.length > 0)
  {
    // load script
    StyleLoader(urlJibres('cdn') + "lib/select2/select2.full-v4.0.13.min.css?v=" + boomVer);
    myUrl = urlJibres('cdn') + "lib/select2/src/select2.full-v4.0.13.js?v=" + boomVer;
    fileLoader(myUrl, 'runPageSelect2', true);
  }
}


function readPageUploader()
{
  var myEl = $('[data-uploader]');

  if(myEl && myEl.length > 0)
  {
    // load style
    // StyleLoader(urlJibres('cdn') + "css/lib/uploader-1-min.css");
    // load script
    myUrl = urlJibres('cdn') + "lib/uploader/uploader-1-min.js?v=" + boomVer;
    fileLoader(myUrl, 'runUploader', true);
  }
}


function readPageRangeSlider()
{
  var myEl = $('[data-rangeSlider]');

  if(myEl && myEl.length > 0)
  {
    // load script
    StyleLoader(urlJibres('cdn') + "lib/rangeSlider/rangeSlider-ion-v2.3.1.min.css?v=" + boomVer);
    myUrl = urlJibres('cdn') + "lib/rangeSlider/rangeSlider-ion-v2.3.1.min.js?v=" + boomVer;
    fileLoader(myUrl, 'runRangeSlider', true);
  }
}


function readPageVideoJs()
{
  var myEl = $('.video-js');

  if(myEl && myEl.length > 0)
  {
    // load script
    StyleLoader(urlJibres('cdn') + "lib/vjs/7.15.4/video-js.css?v=" + boomVer);
    myUrl = urlJibres('cdn') + "lib/vjs/7.15.4/video.min.js?v=" + boomVer;
    fileLoader(myUrl, 'runVideoJs', true);
  }
}


function readPageVideoPlyr()
{
  var myEl = $('.plyr');

  if(myEl && myEl.length > 0)
  {
    // load script
    StyleLoader(urlJibres('cdn') + "lib/plyr/3.6.9/plyr.css?v=" + boomVer);
    myUrl = urlJibres('cdn') + "lib/plyr/3.6.9/plyr.polyfilled.js?v=" + boomVer;
    fileLoader(myUrl, 'runVideoPlyr', true);
  }
}


function readBootstrapAccordion()
{
  var myEl = $('.accordion [data-bs-target]');

  if(myEl && myEl.length > 0)
  {
    // load script
    StyleLoader(urlJibres('cdn') + "lib/bootstrap/5.1.0/bootstrap-accordion.css?v=" + boomVer);
    myUrl = urlJibres('cdn') + "lib/bootstrap/5.1.0/bootstrap.min.js?v=" + boomVer;
    fileLoader(myUrl);
  }
}


function fileLoader(_url, _fn, _forceCallFn, _file, _scriptType)
{
  if(!_url)
  {
    return false;
  }

  if($('script[src="' + _url + '"]').length)
  {
    if(_forceCallFn)
    {
      afterFileLoaded(_fn, 'fileLoaderForce', _file);
    }
  }
  else
  {
    if(_scriptType === undefined)
    {
     _scriptType = 'async';
    }
    var newScript = document.createElement("script");
    if(_scriptType === 'defer')
    {
      newScript.defer = true;
    }
    if(_scriptType === 'async')
    {
      newScript.async = true;
    }
    if(_scriptType === 'async utf8 crossorigin')
    {
      newScript.async = true;
      newScript.charset='UTF-8';
      newScript.setAttribute('crossorigin','*');
    }
    // append to page js section
    $('.js').append(newScript);

    if(_fn)
    {
      // add on load function
      newScript.onload = function()
      {
        afterFileLoaded(_fn, 'fileLoader', _file);
      };
    }

    // show error message if we are problem on load process
    newScript.onerror = function(){ console.warn('error or load script ' + _url);};

    // set source of file
    newScript.src = _url;
  }

}


function StyleLoader(_url)
{
  if(!_url)
  {
    return false;
  }

  if($('link[href="' + _url + '"]').length)
  {
    // do nothing
  }
  else
  {
    var newStyle = document.createElement("link");
    // append to page js section
    $('.js').append(newStyle);

    // show error message if we are problem on load process
    newStyle.onerror = function(){ console.warn('error or load style ' + _url);};

    // set source of file
    newStyle.rel = "stylesheet";
    newStyle.href = _url;
  }

}



function afterFileLoaded(_func, _param, _file)
{
  if(urlCorrect(_file))
  {
    // load script of this chart
    fileLoader(_file, _func, true);
    return;
  }

  if(_func)
  {
    callFunc(_func, _param);
  }
}


