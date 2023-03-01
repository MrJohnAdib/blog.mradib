

function unlockFormLoadingPage()
{
  $('body').attr('data-loading-form', null);
}


function unlockForm(_locked, _data)
{
  var unlockAll = true;
  if(_data && _data.msg && _data.msg[0] && _data.msg[0]['meta'] && _data.msg[0]['meta']['unlock'] === false)
  {
    unlockAll = false;
  }

  if(unlockAll && _locked)
  {
    $('input, button, textarea, [contenteditable], [data-ajaxify]').prop('disabled', false);
  }
  unlockFormLoadingPage();
  $('.submitedForm').removeClass('submitedForm');
  callFunc('loading_form', false);
}


function unlockFormRedirect(_data, _autoScrollAttr)
{
  if(_data && _data.redirect)
  {
    var autoScroll = true;
    if(_autoScrollAttr)
    {
      autoScroll = _autoScrollAttr;
    }

    // read headers and send with request
    var myHeaders = {};
    if(_data && _data.redirectHeaders && typeof _data.redirectHeaders === "object")
    {
      myHeaders = _data.redirectHeaders;
    }

    var a = $('<a href="' + _data.redirect + '"></a>');
    if(a.isAbsoluteURL() || _data.direct)
    {
      location.replace(_data.redirect);
    }
    else
    {
      if(_data.replaceState)
      {
        if(_data.replaceState === 'top')
        {
          autoScroll = true;
        }
        else if(_data.replaceState)
        {
          autoScroll = false;
        }
        Navigate({
          url: _data.redirect,
          autoScroll: autoScroll,
          replace: true,
          ajax: { headers: myHeaders }
        });
      }
      else
      {
        Navigate({
          url: _data.redirect,
          autoScroll: autoScroll,
          ajax: { headers: myHeaders }
        });
      }
    }
    return true;
  }
  return null;
}


function checkAutoClosePage(_autoClose, _timeout)
{
  // if need to autoClose tab on some special condition, close windows
  if(_autoClose)
  {
    var closeAfter = 0;
    if(_timeout)
    {
      closeAfter = _timeout;
    }
    notif('info', 'Auto close');
    setTimeout (function()
    {
      window.close();
    }, closeAfter);
  }
}


function analyseAjaxFormResponse(_data, _$this, _super, _autoScrollAttr)
{
  _super.results = _data;

  var notifResult = $.fn.ajaxify.showResults(_data, _$this, _super);

  unlockFormLoadingPage();
  if(unlockFormRedirect(_data, _autoScrollAttr))
  {
    return true;
  }
  // if we are not have redirect, unlock form and return false
  // unlock form
  unlockForm(_super.lockForm, _data);

  if(_autoScrollAttr !== undefined)
  {
    findPushStateScroll();
  }

  if(notifResult)
  {
    return false;
  }

  return null;
}


function analyseAjaxFormError(_jqXHR, _textStatus, _super)
{
  if($('pre.debugger').length === 1)
  {
    $('pre.debugger').text(_jqXHR.responseText).fadeIn();
  }

  if(_textStatus === 'timeout')
  {
    if(urlLangFa())
    {
      notif('fatal', 'مهلت درخواست  به پایان رسید', 'درخواست ناموفق', 5000, {'position':'topCenter', 'icon':'sf-history'});
    }
    else
    {
      notif('fatal', 'Failed from timeout', 'Request failed', 5000, {'position':'topCenter', 'icon':'sf-history'});
    }
    pingi();
  }
  else
  {
    if(_jqXHR)
    {

      if(_jqXHR.responseJSON)
      {

        if(urlLangFa())
        {
          notif('fatal', 'خطا در دریافت اطلاعات از سرور', 'درخواست ناموفق بود!');
        }
        else
        {
          notif('fatal', 'Error in detect server result', 'Ajax is failed!');
        }
      }
      else
      {
        if(_jqXHR.status === 200 && !_jqXHR.responseText)
        {
          notif('info', 'Ok');
        }
        else
        {
          if(urlLangFa())
          {
            notif('fatal', 'نتیجه دریافتی از سرور نامعتبر است', 'درخواست ناموفق بود!');
          }
          else
          {
            notif('fatal', 'Server result is invalid', 'Ajax is failed!');
          }

          // if(urlDebugger() && _textStatus == 'error')
          // {
          //   alert(JSON.stringify( _jqXHR ));
          // }
        }
      }
    }
    else
    {
      if(urlLangFa())
      {
        notif('fatal', 'هیچ پاسخی از سرور  دریافت نشد', 'درخواست ناموفق بود!');
      }
      else
      {
        notif('fatal', 'No result from server', 'Ajax is failed!');
      }
    }
  }
}



function ajaxResponseToJSON(_jqXHR, _data)
{
  // check empty result
  if(!_jqXHR)
  {
    return null;
  }
  // check for prepared json
  if(_jqXHR.responseJSON)
  {
    return _jqXHR.responseJSON;
  }

  // convert text to json
  var myResponseRaw = null;
  if(_jqXHR.responseText)
  {
    myResponseRaw = _jqXHR.responseText;
  }
  if(!myResponseRaw)
  {
    return null;
  }
  if(_data === undefined)
  {
    _data = myResponseRaw;
  }

  // try to convert text to json
  var resultJSON = null;
  if(typeof _data === 'object')
  {
    // it's json
    resultJSON = _data;
  }
  else if (_data)
  {
    var jsonExpected = _data[0] === '{';
    if(jsonExpected)
    {
      try
      {
        var newLinePoint = _data.indexOf('\n');
        newLinePoint     = newLinePoint === -1 ? undefined : newLinePoint;
        resultJSON  = JSON.parse(_data.slice(0, newLinePoint));
        // get html
        if(newLinePoint)
        {
          var html = _data.slice(newLinePoint);
          if(html)
          {
            resultJSON.html = html.trim();
          }
        }
      }
      catch(e)
      {
        if (jsonExpected)
        {
          notif('error', 'There was an error in parsing JSON!');
        }
        return null;
      }
    }
  }
  else
  {

  }

  return resultJSON;
}

