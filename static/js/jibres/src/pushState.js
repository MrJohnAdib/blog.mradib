// on start
function pushStateSiftal(_direct)
{
  runDataResponse();
  runInputFileFunc();
  responsiveSidebar();
  pwaSidebarHide();
  // setLanguageURL(_direct);
  runLazyLoad();
  // runSortable();
  // run counter up on each page we have counter
  runCounterUp();
  // run notif from html
  runHtmlNotif();
  // detect id and try to scroll to it
  // scrollSmoothDetector(_direct);
  // run watchScroll func to watch all elements
  // watchScroll();
  // run numeral fn
  cleaveRunner();
  // check navigate is done or not
  navigateChecker();
  // check autoPrint detection
  autoPrint();
  // run runner
  dataRunner();
  // run kerkere
  kerkereRunner();
  // run dataCopy
  dataCopy();
  // add typed
  typeTitles();
  // add player
  mPlayer();
  // handle focusMode for pushState
  handleFocusModePushState();
  // init textarea
  autosizeTextareaInit();
  // Run draw barcode lib
  JsBarcodeRunner();
  // run form tools
  formToolsRunner();

  if($('body').attr('data-in') === 'enter')
  {
    // run on enter
    handleEnterEvents();
  }

  if($('body').attr('data-in') === 'pay')
  {
    // run on enter
    handlePayEvents();
  }

  if($('body').attr('data-in') === 'a')
  {
    calcFooterValues();
    calcProductMargin();
  }

  // reset escape counter
  if(typeof(Storage) !== "undefined")
  {
    try {
      sessionStorage.setItem("escCounter", 0);
    } catch(e) {
      // console.log('Session Storage is disabled');
    }
  }

  setTimeout(function(){
    callFunc('pushState', _direct);
    callFunc('pushStateFinal', _direct);
    callFunc('pageChart', _direct);
    callFunc('chartDrawer', _direct);
  }, 50)
}


// run for the first time
$(document).ready(function()
{
  showWarnHack();
  pushStateSiftal(true);

  // detect clinet timezone
  timezoneDetector()
  // call some static function without need to run with pushState
  inputChecker();
  // handle drag status
  handleDrag();
  // handle PWA sidebar
  handlePWASlideBar();
  // check we are in iframe of not!
  // insideIframe();
  // show iframe after load
  showIframeOnLoad();
  // check requirements of form and highlight them
  inputRequirement();
  // do something before unload page
  catchBeforeUnload();
  // openable table
  tbl1Openable();
  // remove noscript tag
  noscriptRemover();
  // detect resize screen width
  resizeDetector();
  // run befeshar for input press
  runBefeshar();
  // run cloner
  cloner();
  pingiRunner();
  // try to register service worker
  registerServiceWorker();

  // handle focusMode
  handleFocusMode();

  if($('body').attr('data-panel') !== undefined)
  {
    // check for new smile
    checkSmile(true);
  }

  // run once on ready
  bindBtnOnFactor();
  // bind shortkey on each page
  callFunc('bindShortkey');
  // read page script if exist
  readPageAllScripts();
});



function beforePushStateSiftal()
{
  callFunc('removeAmcharts4');
  callFunc('closeSelect22');
}

