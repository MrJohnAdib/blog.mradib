
function handleFocusModePushState()
{

  $('#sidebar .items[data-postMsg] .item').off('mouseenter.liveIframeSelect').on('mouseenter.liveIframeSelect', function(_a){
    var myId = $(this).attr('id');
    var myLiveIframe = document.getElementById('liveIframe');

    postMsg(myLiveIframe, {type:'focus', el:myId});

  }).off('mouseleave.liveIframeSelect').on('mouseleave.liveIframeSelect', function(_b){
    var myId = $(this).attr('id');
    var myLiveIframe = document.getElementById('liveIframe');

    postMsg(myLiveIframe, {type:'blur', el:myId});
  });

  $("[data-postMsg-href]").off('click.postMsgHref').on('click.postMsgHref', function(_e){
    var opt = {
      type: 'href',
      href: $(this).attr('data-postMsg-href')
    };

    postMsg(postMsgCompany(this), opt);
  });

  $("[data-postMsg-ajaxify]").off('click.postMsgAjaxify').on('click.postMsgAjaxify', function(_e){
    var opt = {
      type: 'ajaxify',
      data: $(this).attr('data-postMsg-ajaxify'),
      action: $(this).attr('data-postMsg-action'),
    };

    postMsg(postMsgCompany(this), opt);
  });

}


function handleFocusMode()
{
  if(urlJibres('zone') === 'business-website')
  {
    // inside business websites
    getMessageFromJibres();
  }
  else
  {
    // inside jibres
    getMessageFromIframe();
  }
}


function getMessageFromJibres()
{
  window.addEventListener('message', _event =>
  {
    if(_event && _event.data)
    {
      try {
        // (_event.origin.startsWith('https://jibres.com'))
        var response = JSON.parse(_event.data);

        if(response && response.value && response.value.type === 'focus')
        {
          if(response.value.el)
          {
            var focusEl = $('#' + response.value.el);
            $('[data-type][data-focus]').attr('data-focus', 'no');
            focusEl.attr('data-focus', 'yes');

            scrollSmooth(focusEl);
          }
        }
      } catch (err) {
        // we are some error on decode json data
        // console.log(_event.data);
      }

    }
  });
}


function getMessageFromIframe()
{
  window.addEventListener('message', _event =>
  {
    var iframeOrigin = $('#liveIframe').attr('data-origin');

    // if(_event.origin.startsWith(iframeOrigin))
    if(_event.data)
    {
      var response = undefined;

      // try to parse json
      try {
        response = JSON.parse(_event.data);;
      } catch(e) { }


      if(response && response.value)
      {
        if(response.value.type === 'closeAndRun')
        {
          // close iframe
          if(Fancybox)
          {
            Fancybox.close();
          }
          // try to run fn
          if(response.value.fn)
          {
            callFunc(response.value.fn, response.value.args);
          }

          // show notif
          if(response.value.notif)
          {
            var myMsg = {msg:response.value.notif};
            notifGenerator(myMsg);
          }
        }

        // handle href
        if(response.value.type === 'href')
        {
          if(response.value.href)
          {
            Navigate({ url: response.value.href });
          }
        }

        if(response.value.type === 'ajaxify')
        {
          if(response.value.data && response.value.action)
          {
             var myEl = $('<div></div>');
             myEl.attr('data-action', response.value.action);
             myEl.attr('data-data', response.value.data);

            // ajaxify this data
            myEl.ajaxify({link: true});
          }
        }
      }

    }
  });
}


function postMsgCompany(_this)
{
  var type = $(_this).attr('data-postMsg');
  if(type === 'parent')
  {
    return 'parent';
  }
  else if(type === 'liveIframe')
  {
    return document.getElementById('liveIframe');
  }

  // try to get el from backend
  var selectEl = $(_this);
  if(selectEl.length === 1)
  {
    return $(_this).get(0);
  }

  return null;
}


function postMsg(_to, _value)
{
  var data = {
    method: 'post'
  };

  if (_value) {
    data.value = _value;
  }
  if(data)
  {
    var msg = JSON.stringify(data);
    if(_to)
    {
      if(_to === 'parent')
      {
        window.parent.postMessage(msg, "*");
      }
      else
      {
        var targetOrigin = $(_to).attr('data-src');
        _to.contentWindow.postMessage(msg, '*');
      }
    }
  }
}

