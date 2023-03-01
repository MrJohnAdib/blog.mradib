
function checkSmileLoop()
{
  setInterval(function()
  {
    checkSmile();;
  }, 10000);
}


function checkSmile(_register)
{
  if (document.hidden)
  {
    // don't run if browser tab is hidden
    return false;
  }

  if(_register)
  {
    checkSmileLoop();
  }
  var aleadyIsNew = false;
  if($('[data-panel] #pageHeader .notification').attr('data-new') !== undefined)
  {
    aleadyIsNew = true;
  }
  // get user language
  var lang = $('html').attr('lang');

  var smileLive = undefined;
  if($('[data-smile-live]').length === 1)
  {
    smileLive = $('[data-smile-live]').attr('data-smile-live');
  }

  var ajaxData =
  {
    'notifOn': aleadyIsNew,
    'url-env': $('body').attr('data-env'),
    'url-in': $('body').attr('data-in'),
    'url-page': $('body').attr('data-page'),
    'smileLive': smileLive
  };

  $.ajax(
  {
    url: urlJibres('sitelang') + "hook/smile",
    method:"POST",
    timeout: 3000,
    dataType:"json",
    data: ajaxData,
  })
  .always(function(_jqXHR, _textStatus, _error)
  {
    var smileResult = undefined;
    if(_jqXHR.ok === true)
    {
      smileResult = _jqXHR;
    }
    else if(_jqXHR.responseJSON && _jqXHR.responseJSON.ok === true)
    {
      smileResult = _jqXHR.responseJSON;
    }
    else
    {
      return false;
    }

    window.pushStateSmile = smileResult;
    var response = smileResult.result;
    var notifCount = null;
    var orderCount = null;

    if(response)
    {
      if(response.notifCount)
      {
        notifCount = response.notifCount;
      }
      if(response.orderCount)
      {
        orderCount = response.orderCount;
      }
    }

    // show new notif message only one time
    if(typeof(Storage) !== "undefined")
    {
      newNotifStorage = parseInt(sessionStorage.getItem("newNotif"));
      newOrderStorage = parseInt(sessionStorage.getItem("newOrder"));
      if(isNaN(newNotifStorage))
      {
        newNotifStorage = 0;
      }
      if(isNaN(newOrderStorage))
      {
        newOrderStorage = 0;
      }

      if(notifCount)
      {
        if(notifCount && newNotifStorage !== notifCount)
        {
          sessionStorage.setItem("newNotif", notifCount);
        }
      }

      if(orderCount)
      {
        if(orderCount && newOrderStorage !== orderCount)
        {
          sessionStorage.setItem("newOrder", orderCount);
        }
      }
    }

    if(smileResult.sound)
    {
      playAudio(smileResult.sound);
    }

    // create notif on all conditions
    notifGenerator(smileResult);
    // if user is loginned on this page, try to check logout
    if(jibresUID())
    {
      if(checkSmileLoginned(smileResult))
      {
        // if is not logged out
        checkNewOrder(orderCount)
        // check notifications
        checkNewNotification(smileResult);
        // check redirect
        checkSmileRedirect(smileResult);
      }
    }

    // check live mode
    smileLiveMode(smileResult);
  });
}


function checkSmileLoginned(_data)
{
  if(_data.result && _data.result.logout)
  {
    var logoutTxt = 'Logout';
    var logoutUrl = '/logout';

    if(_data.result.logout.txt)
    {
      logoutTxt = _data.result.logout.txt;
    }
    if(_data.result.logout.url)
    {
      logoutUrl = _data.result.logout.url;
    }

    say(
    {
      type: 'warning',
      html: logoutTxt,
      showConfirmButton: false,
      timer: 1000,
      onClose: () =>
      {
        location.replace(logoutUrl);
      }
    });
    return false;
  }

  return true;
}


function checkSmileRedirect(_data)
{
  if(_data && _data.redirect)
  {
    var a = $('<a href="' + _data.redirect + '"></a>');
    if(a.isAbsoluteURL() || _data.direct)
    {
      location.replace(_data.redirect);
    }
    else
    {
      if(window.pushStateSmile && window.pushStateSmile.live && parseInt(window.pushStateSmile.live) === 1)
      {
        Navigate({ url: _data.redirect, live: 1 });
      }
      else
      {
        Navigate({ url: _data.redirect });
      }
    }
    return;
  }
}


function checkNewNotification(_data)
{
  var panelHeaderEl = $('[data-panel] #pageHeader .notification i');
  var pwaFooterEl   = $('#pageFooter .pwa [data-key="messages"] i');

  if(_data.result && _data.result.notifNew)
  {
    if(panelHeaderEl.attr('data-new') === undefined)
    {
      // new notif and does not exist before it
    }

    panelHeaderEl.attr('data-new', '');
    pwaFooterEl.attr('data-new', '');
  }
  else
  {
    panelHeaderEl.attr('data-new', null);
    pwaFooterEl.attr('data-new', null);
  }

  if(_data.result && _data.result.notifCount)
  {
    panelHeaderEl.attr('data-count', fitNumber(_data.result.notifCount));
    pwaFooterEl.attr('data-count', fitNumber(_data.result.notifCount));
  }
  else
  {
    panelHeaderEl.attr('data-count', null);
    pwaFooterEl.attr('data-count', null);
  }

}


function checkNewOrder(_orderCount)
{
  var panelHeaderEl           = $('[data-panel] #pageHeader .orders i');
  var pwaFooterEl             = $('#pageFooter .pwa [data-key="orders"] i');
  var panelBusinessDashDataEl = $('[data-panel] .item.unprocessedOrder .value');

  if(!_orderCount)
  {
    _orderCount = 0;

  }

  panelHeaderEl.attr('data-count', fitNumber(_orderCount));
  pwaFooterEl.attr('data-count', fitNumber(_orderCount));
  // set in dashboard
  panelBusinessDashDataEl.text(fitNumber(_orderCount));
}

function smileLiveMode(_smileResult)
{
  if(!_smileResult.liveResult)
  {
    return null;
  }

  $.ajax(
  {
    url: _smileResult.liveResult,
    headers: {"x-live": "1"},
    method:"get",
    timeout: 3000,
    dataType:"html",
  })
  .done(function(_data, _textStatus, _jqXHR)
  {
    $targetEl = $(_smileResult.liveTarget);
    if($targetEl.length === 1)
    {
      // remove old smile live element
      $("[data-smile-live]").remove();
      // get element
      // insert on top or buttom
      var $html = $(_data);
      if(_smileResult.livePosition === 'all')
      {
        $targetEl.html($html);
      }
      else
      {
        $html.hide();
        if(_smileResult.livePosition === 'top')
        {
          $targetEl.prepend($html);
        }
        else
        {
          $targetEl.append($html);
        }
        // show with animation
        $html.slideDown('fast');
        // $html.show('slow');
      }
    }
  });

}

