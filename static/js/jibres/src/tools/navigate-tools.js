
function analyseAjaxResponse(_data, _deferred, _props)
{
  var json;
  if(typeof _data === 'object')
  {
    // it's json
    json = _data;

  }
  else
  {
    var jsonExpected = _data[0] === '{';
    if(jsonExpected)
    {
      try
      {
        var newLinePoint = _data.indexOf('\n');
        newLinePoint     = newLinePoint === -1 ? undefined : newLinePoint;
        json  = JSON.parse(_data.slice(0, newLinePoint));
        // get html
        if(newLinePoint)
        {
          var html = _data.slice(newLinePoint);
          if(html)
          {
            json.html = html.trim();
          }
        }
      }
      catch(e)
      {
        if (jsonExpected)
        {
          notif('error', 'There was an error in parsing JSON!');
        }
        _deferred.reject();
        if(_props.url)
        {
          location.replace(_props.url);
        }
        return null;
      }
    }
  }

  if(json && json.debug)
  {
    notifGenerator(json.debug);
  }

  return json;
}


function analyseAjaxRedirect(_result)
{
 // redirect it's okay and we have redirect
  if(_result && _result.ok === true && _result.redirect)
  {
    var a = $('<a href="' + _result.redirect + '"></a>');
    if(a.isAbsoluteURL() || _result.redirect)
    {
      location.replace(_result.redirect);
    }
    else
    {
      if(_result.replaceState)
      {
        Navigate(
        {
          url: _result.redirect,
          replace: true
        });
        return true;
      }
      else
      {
        Navigate(
        {
          url: _result.redirect
        });
        return true;
      }
    }
  }
  return false;
}


function analyseAjaxError(_jqXHR, _textStatus, _errorThrown)
{
  if(_textStatus === 'timeout')
  {
    if(urlLangFa())
    {
      notif('fatal', 'مهلت درخواست به پایان رسید', 'درخواست ناموفق', 5000, {'position':'topCenter', 'icon':'sf-history'});
    }
    else
    {
      notif('fatal', 'Failed from timeout', 'Request failed', 5000, {'position':'topCenter', 'icon':'sf-history'});
    }
    pingi();
  }

  if(_jqXHR && _jqXHR.responseJSON)
  {
    notifGenerator(_jqXHR.responseJSON);
  }
  else if(_textStatus === 'error')
  {
    if(_jqXHR.readyState == 0 && _errorThrown == "")
    {
      // probably network is failed like internet connection
      console.log("Network error detected");
      // check with pingi
      pingi();
    }
    else
    {
      var statusCode = _jqXHR.status;
      if(urlLangFa())
      {
        notif('fatal', statusCode + ' ' + _errorThrown, 'درخواست ناموفق', 5000, {'position':'topCenter', 'icon':'sf-exclamation-triangle'});

      }
      else
      {
        notif('fatal', statusCode + ' ' + _errorThrown, 'Request failed', 5000, {'position':'topCenter', 'icon':'sf-exclamation-triangle'});
      }
    }
  }
}


