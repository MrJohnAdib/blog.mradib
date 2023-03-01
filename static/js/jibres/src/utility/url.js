
function urlJibres(_type)
{
  if(!_type)
  {
    _type = 'sitelang';
  }
  var $addr = $('meta[name="jibres:' + _type + '"]');
  var myAddr = '';
  if($addr)
  {
    myAddr = $addr.attr('content');

  }
  return myAddr;
}


function jibresZone()
{
  var myZone = urlJibres('zone');

  if(myZone)
  {
    return myZone;
  }
  return null;
}


function jibresUID()
{
  var myUID = $('meta[name="user-Jibres"]').attr('content');
  if(myUID)
  {
    return myUID;
  }
  return null;
}


function urlStore()
{
  var myStore = urlStoreCode();

  if(myStore)
  {
    return urlJibres('sitelang') + myStore + '/';
  }

  return null;
}


function urlStoreAPI()
{
  var myStore = urlStoreCode();

  if(myStore)
  {
    return urlJibres('api') + myStore + '/v2/';
  }
  else
  {
    return urlJibres('api') + 'v2/';
  }

  return null;
}


function urlStoreCode()
{
  var myEnv = urlEnv();
  if(myEnv === 'Jibres')
  {
    // in Jibres Env
  }
  else if(myEnv.charAt(0) === '$')
  {
    return myEnv;
  }

  return null;
}


function urlEnv()
{
  if($('body[data-env]') !== undefined)
  {
    var myEnv = $('body').attr('data-env');

    return myEnv;
  }

  return null;
}


function urlM2()
{
  if($('body[data-m2]') !== undefined)
  {
    var myEnv = $('body').attr('data-m2');

    return myEnv;
  }

  return null;
}

function urlCorrect(_url)
{
  if(!_url)
  {
    return null;
  }

  if(_url.indexOf('://') > 0)
  {
    return true;
  }
    return false;
}


function urlVerify(_page, _in, _env)
{
  var $body    = $('body');
  var bodyPage = $body.attr('data-page');
  var bodyIn   = $body.attr('data-in');
  var bodyEnv  = $body.attr('data-env');
  var result;

  if(_page)
  {
    if(_page === bodyPage)
    {
      result = true;
    }
    else
    {
      return false;
    }
  }

  if(_in)
  {
    if(_in === bodyIn)
    {
      result = true;
    }
    else
    {
      return false;
    }
  }

  if(_env)
  {
    if(_env === bodyEnv)
    {
      result = true;
    }
    else
    {
      return false;
    }
  }

  if(result === true)
  {
    return true;
  }
}



function urlLang()
{
  var lang = $('html').attr('lang');

  if(!lang)
  {
    lang = 'en';
  }

  return lang;
}


function urlLangFa()
{
  if(urlLang() === 'fa')
  {
    return true;
  }

  return false;
}


function urlDir()
{
  var _dir = $('html').attr('dir');

  if(!_dir)
  {
    _dir = 'ltr';
  }

  return _dir;
}


function isPagePWA()
{
  if($('html').attr('data-pwa') !== undefined)
  {
    return true
  }
  var myWidth = document.body.clientWidth || window.innerWidth;
  if(myWidth < 830)
  {
    return true
  }

  return false;
}


function isPageDesktop()
{
  if($('html').attr('data-desktop') !== undefined)
  {
    return true
  }

  return false;
}

function urlDirRtl()
{
  if(urlDir() === 'rtl')
  {
    return true;
  }

  return false;
}


function urlDebugger()
{
  if($('html').attr('data-debugger') !== undefined)
  {
    return true;
  }

  return false;
}

