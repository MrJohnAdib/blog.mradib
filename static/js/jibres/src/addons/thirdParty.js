

function loadThirdPartyScripts(_force, _page)
{
  loadScriptRecaptcha();
  loadScriptGtag();
  loadScriptHotjar();
  loadScriptTawk();
  loadScriptTidio();
  loadScriptCrisp();
  loadScriptRaychat();
  loadScriptImber();
  loadScriptGoftino();
  loadScriptMediaad();
}


function loadScriptRecaptcha()
{
  var myEl = $('form [name="recaptcha_sitekey"]');
  var myRecaptcha = myEl.val();
  if(myEl && myEl.length > 0 && myRecaptcha)
  {
    // load script
    myUrl = "https://www.google.com/recaptcha/api.js?render=" + myRecaptcha;
    if(urlLangFa())
    {
      myUrl += '&hl=fa';
    }
    fileLoader(myUrl, 'runRecaptcha', true, undefined, 'async');
  }
}


function loadScriptGtag()
{
  var myEl = $('meta[name="gtag"]');
  var myGtag = myEl.attr('content');
  if(myEl && myEl.length > 0 && myGtag)
  {
    // load script
    myUrl = "https://www.googletagmanager.com/gtag/js?id=" + myGtag;
    fileLoader(myUrl, 'runGtag', true, undefined, 'defer');
  }
}


function loadScriptHotjar()
{
  var myEl = $('meta[name="hotjar"]');
  var myHotjar = myEl.attr('content');
  if(myEl && myEl.length > 0 && myHotjar)
  {
    // load script
    myUrl = "https://static.hotjar.com/c/hotjar-" + myHotjar + ".js?sv=6";
    window.hj = window.hj||function(){(window.hj.q=window.hj.q||[]).push(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=')};
    window._hjSettings={hjid:myHotjar,hjsv:6};

    fileLoader(myUrl, 'runHotjar', true, undefined, 'defer');
  }
}


function loadScriptTawk()
{
  var myEl = $('meta[name="tawk"]');
  var myTawk = myEl.attr('content');
  if(myEl && myEl.length > 0 && myTawk)
  {
    // load script
    myUrl = 'https://embed.tawk.to/' + myTawk;

    fileLoader(myUrl, 'runTawk', false, undefined, 'defer utf8 crossorigin');
  }
}


function loadScriptTidio()
{
  var myEl = $('meta[name="tidio"]');
  var myTidio = myEl.attr('content');
  if(myEl && myEl.length > 0 && myTidio)
  {
    // load script
    myUrl = 'https://code.tidio.co/' + myTidio + '.js';


    fileLoader(myUrl, 'runTidio', false, undefined, 'defer utf8 crossorigin');
  }
}


function loadScriptCrisp()
{
  var myEl = $('meta[name="crisp"]');
  var myCrisp = myEl.attr('content');
  if(myEl && myEl.length > 0 && myCrisp)
  {
    // load script
    myUrl = 'https://client.crisp.chat/l.js';
    window.$crisp=[];
    window.CRISP_WEBSITE_ID=myCrisp;

    // window.$crisp=[];
    // window.CRISP_WEBSITE_ID="d673c8d1-212c-43f5-937b-29779bd0105b";

    // (function(){
    //   d=document;s=d.createElement("script");
    //   s.src="https://client.crisp.chat/l.js";
    //   s.async=1;
    //   d.getElementsByTagName("head")[0].appendChild(s);
    // })();

    fileLoader(myUrl, 'runCrisp', false, undefined, 'defer utf8 crossorigin');
  }
}


function loadScriptRaychat()
{
  var myEl = $('meta[name="raychat"]');
  var myRaychat = myEl.attr('content');
  if(myEl && myEl.length > 0 && myRaychat)
  {
    // load script
    myUrl = "https://app.raychat.io/scripts/js/" + myRaychat + "?href="+window.location.href
    if(localStorage && localStorage.getItem("rayToken"))
    {
      myUrl += '&rid=' +localStorage.getItem("rayToken");
    }

    fileLoader(myUrl, 'runRaychat', false, undefined, 'defer utf8 crossorigin');
  }
}


function loadScriptImber()
{
  var myEl = $('meta[name="imber"]');
  var myImber = myEl.attr('content');
  if(myEl && myEl.length > 0 && myImber)
  {
    // load script
    myUrl = "https://widget.imber.live/imber?id=" + myImber;
    if(localStorage && localStorage.getItem("imber_token"))
    {
      myUrl += '&token=' + localStorage.getItem("imber_token");
    }
    if(jibresUID())
    {
      myUrl += '&imber_sid=' + jibresUID();
    }
    // set default lang
    // window.IMBER_LANG = 'fa';

    // append element of imber
    $('.js').append('<div id="imber-top-parent"></div>');

    fileLoader(myUrl, 'runImber', true, undefined, 'defer utf8 crossorigin');
  }
}


function loadScriptGoftino()
{
  var myEl = $('meta[name="goftino"]');
  var myGoftino = myEl.attr('content');
  if(myEl && myEl.length > 0 && myGoftino)
  {
    // load script
    myUrl = "https://www.goftino.com/widget/" + myGoftino;
    if(localStorage)
    {
      myStorage = localStorage.getItem("goftino_" + myGoftino);
      if(myStorage)
      {
        myUrl += '?o=' + myStorage;
      }
    }
    fileLoader(myUrl, 'runGoftino', true, undefined, 'defer utf8 crossorigin');
  }
}


function loadScriptMediaad()
{
  var myEl = $('meta[name="mediaad"]');
  var myMediaad = myEl.attr('content');
  if(myEl && myEl.length > 0 && myMediaad)
  {
    // load script
    myUrl = "https://s1.mediaad.org/serve/" + myMediaad + "/retargeting.js?href="+window.location.href
    fileLoader(myUrl, undefined, false, undefined, 'defer utf8 crossorigin');
  }
}

