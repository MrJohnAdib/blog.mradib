// Morede estefade baraye kar ba HTML5 History

(function(root)
{
  "use strict";

  var $window  = $(window);
  var defaults =
  {
    html: '',
    title: null,
    url: '/',
    replace: false,
    autoScroll: null,
    filter: null,
    fake: false,
    data: false,
    nostate: false,
    abort: true,
    ajax:
    {
      type: 'get'
    }
  };

  // add ajax poll to allow to cancel ajax requests before sending new one
  $.xhrPool = [];
  $.xhrPool.abortAll = function()
  {
     $(this).each(function(idx, jqXHR)
     {
        jqXHR.abort();
     });
     $.xhrPool.length = 0
  };

  $.ajaxSetup(
  {
    beforeSend: function(jqXHR)
    {
        $.xhrPool.push(jqXHR);
    },
    always: function(jqXHR)
    {
       var index = $.xhrPool.indexOf(jqXHR);
       if (index > -1)
       {
          $.xhrPool.splice(index, 1);
       }
    }
 });


  function render(obj)
  {
    var focusBeforeChange         = $(':focus');
    var pageContentChanged        = null;
    var needHardRefreshOnEmptyNew = true;

    $window.trigger('navigate:render:start', obj);
    // try to remove tippy from view
    beforePushStateSiftal();
    if(!obj.url)
    {
      obj.url = '/';
    }

    var html = obj.html;
    if(html)
    {
      html = html.trim();
    }
    else
    {
      html = '';
    }
    if(html.indexOf('data-xhr') === false)
    {
      console.log('hard refresh! without xhr');
      // hard redirect to this address or change all html
      location.replace(obj.url);
      return;
    }

    // if(obj.content && $('body').attr('data-in') !== obj.content)
    // {
    //   if($('body').attr('data-panel') !== undefined && obj.panel)
    //   {
    //     // body is panel, dont worry, continue
    //   }
    //   else
    //   {
    //     if($('html').attr('data-pwa') !== undefined)
    //     {
    //       // do nothing for pwa
    //     }
    //     else
    //     {
    //       if(urlDebugger())
    //       {
    //         // do nothing
    //       }
    //       else
    //       {
    //         console.log('hard refresh! content changed');
    //         // hard redirect to new content
    //         location.replace(obj.url);
    //         return;
    //       }
    //     }
    //   }
    // }

    var $html = $(html);


    if(obj.page === '')
    {
      obj.page = 'home';
    }
    if(obj.page)
    {
      $('body').attr('data-page', obj.page);
    }
    // set environment
    $('body').attr('data-env', obj.env);
    // set content on each request
    $('body').attr('data-in', obj.content);
    // set subdomain on body
    $('body').attr('data-subdomain', obj.subdomain);
    // set panel
    $('body').attr('data-panel', obj.panel);
    // set siteBuilder
    $('body').attr('data-siteBuilder', obj.siteBuilder);
    // set m2
    $('body').attr('data-m2', obj.m2);

    $window.trigger('navigate:render:filter:before', obj.filter);

    var filter = _.isArray(obj.filter) ?
        '[data-xhr="' + obj.filter.join('"], [data-xhr="') + '"]'
      : obj.filter ? '[data-xhr="' + obj.filter + '"]' : null;

    (filter ? $html.filter(filter).add($html.find(filter)) : $html).each(function()
    {
      var myNewXhrName = $(this).attr('data-xhr');
      // if we find new element with xhr
      if(myNewXhrName)
      {
        needHardRefreshOnEmptyNew = false;
        var $targetOnOldPage      = $('[data-xhr="' + myNewXhrName + '"]');
        if($targetOnOldPage.length > 0)
        {
          // if we find new element is existing elements


          // if new content is different from current content replace it
          // its added by javad, if has bug report this condition
          if($(this).html() !== $targetOnOldPage.html())
          {
            pageContentChanged = true;

            if(myNewXhrName === 'loadMore')
            {
              // add content after old one - simple replace
              $targetOnOldPage.after($(this).html());
            }
            else
            {
              // add content after old one - simple replace
              $targetOnOldPage.after(this);
              // remove old one
              $targetOnOldPage.remove();
            }
          }

        }
      }
    });

    if(needHardRefreshOnEmptyNew)
    {
      // hard refresh to new location because new is not have xhr element
      console.log('hard refresh! empty xhr');
      location.replace(obj.url);
      // need check if new is have something do this, else do nothing
      // need more time to check conditions!
    }

    // new check if html is not exist, do hard refresh
    if(html)
    {
      // if html contain doctype or head tag, need to hard refresh
      if(html.indexOf("<!DOCTYPE html>") === 0 || html.indexOf("<head>") > 0)
      {
        console.log('hard refresh! doctype');
        location.replace(obj.url);
      }
    }

    $window.trigger('navigate:render:filter:done', filter);

    var $title = $html.find('title');

    if($title.length)
    {
      $('head title').text($title.text());
    }

    // read all scripts of page if exist
    readPageAllScripts(true, obj.scriptPage)

    // on navigate if in new page we have autofocus field, set focus to it
    if(!pageContentChanged)
    {
      // if page content is not changed, do nothing...
      // logy(10);
      // console.log('page is not changed, need hard redirect');
      console.log('page is not changed');
      // location.replace(obj.url);
    }
    // if we have input with autofocus, set focus to first of it
    else if($('input[autofocus]').length)
    {
      // logy(20);
      if(focusBeforeChange.is($('input[autofocus]')[0]))
      {
        // if this and old input is equal skip
        // check later
        // logy(21);
      }
      else
      {
        var myNewInput = $('input[autofocus]')[0];
        if(myNewInput)
        {
          $(myNewInput).trigger("focus");
        }
        // logy(24);
      }
    }
    else
    {
      // we dont have autofocus input, skip it
      // logy(30);
    }
    // set page new title if exit
    if(obj.title)
    {
      document.title = obj.title;
    }

    if(obj.autoScroll === true)
    {
      // force scroll to top of page
      scrollTop();
    }
    else if(obj.autoScroll && $(obj.autoScroll).length === 1)
    {
      // set scroll
      scrollSmoothTo($(obj.autoScroll));
    }
    else if($("body").attr('data-in') === 'site')
    {
      scrollTop();
    }
    else if($("body").attr('data-in') === 'business')
    {
      scrollTop();
    }
    else if($("body").attr('data-in') === 'support')
    {
      scrollTop();
    }
    else if(obj.autoScroll === false)
    {
      // do nothing if set to false
    }
    else
    {
      // do nothing on other pages, we need to freeze scroll
      // no, this is not good
      // try to scroll on all contents
      scrollTop();
    }

    // call pushState function if exist
    callFunc('pushStateSiftal', false);

    $window.trigger('navigate:render:done');
  }


  function fetch(props, md5)
  {
    $window.trigger('navigate:fetch:start', props, md5);
    // add loading
    $('body').attr('data-reloading', '');
    callFunc('loading_page', true);

    // set header of liveMode
    if(props.live === 1)
    {
      props.ajax.headers = { "x-live": "1" };
    }

    var options = $.extend(true, {}, props.ajax,
    {
      url: props.url,
      // headers: { 'x-request-type': 'pushState' }
    });


    var deferred = new jQuery.Deferred();

    if(props.abort)
    {
      $.xhrPool.abortAll();
    }

    // add progress to navigates
    options.beforeSend = function()
    {
      NProgress.configure({ animationModel: 'navigate' }).start();
      NProgress.configure({ animationModel: 'navigate' }).inc();
    };

    // set timeout for fetch page
    options.timeout = 100000;

    var myXhr = $.ajax(options)
    .done(function(_data, _textStatus, _jqXHR)
    {
      $window.trigger('navigate:fetch:ajax:start', options);
      // analyse result as json
      var resultJSON = analyseAjaxResponse(_data, deferred, props);
      window.pushStateResult = resultJSON;
      // check for redirect if needed
      if(resultJSON && resultJSON.ok === true && resultJSON.redirect)
      {
        // start redirect process
        analyseAjaxRedirect(resultJSON);
      }
      else
      {
        deferred.resolve(resultJSON);
      }

      $window.trigger('navigate:fetch:ajax:done', resultJSON)
             .trigger('navigate:fetch:done', resultJSON);
    })
    .fail(function(_jqXHR, _textStatus, _errorThrown)
    {
      // unlock form
      unlockForm(true);
      var myResponseRaw = null;
      if(_jqXHR && _jqXHR.responseText)
      {
        myResponseRaw = _jqXHR.responseText;
      }
      // analyse result as json
      var resultJSON = analyseAjaxResponse(myResponseRaw, deferred, props);
      window.pushStateResult = resultJSON;
      if(resultJSON)
      {
        if(resultJSON.ok === true && resultJSON.redirect)
        {
          // check for redirect if needed
          analyseAjaxRedirect(resultJSON);
        }
        else if(resultJSON.msg)
        {
          // we have message, show it
          analyseAjaxError(_jqXHR, _textStatus, _errorThrown);
        }
        else
        {
          deferred.resolve(resultJSON);
        }
      }
      else
      {
        // analyse error
        analyseAjaxError(_jqXHR, _textStatus, _errorThrown);
      }

      $window.trigger('navigate:fetch:ajax:error', _jqXHR, _textStatus, _errorThrown);
    })
    .always(function(_jqXHR, _textStatus, _error)
    {
      if(_jqXHR.responseJSON && _jqXHR.responseJSON.ok === true && _jqXHR.responseJSON.redirect)
      {
        // do nothing because we have another navigate
      }
      else
      {
        NProgress.done(true);
      }

      // remove loading
      setTimeout (function()
      {
        $('body').attr('data-reloading', null);
      }, 500);
      callFunc('loading_page', false);
    });

    return deferred.promise();
  }


  function Navigate(obj)
  {
    // logy(obj);
    var deferred = new jQuery.Deferred();
    var props    = $.extend(true, {}, defaults, obj);

    $window.trigger('navigate:start', props);

    if(obj.fake)
    {
      deferred.resolve();
      if(!obj.nostate)
      {
        root.history[props.replace ? 'replaceState' : 'pushState'](props, props.title, props.url);
      }
      $window.trigger('statechange');

      return deferred.promise();
    }

    if(obj.html)
    {
      render(props);
      deferred.resolve();
      if(!obj.nostate)
      {
        root.history[props.replace ? 'replaceState' : 'pushState'](props, props.title, props.url);
      }
      $window.trigger('statechange');

      return deferred.promise();
    }

    var md5 = LS.get(props.url);
    props.md5 = md5;
    fetch(props).then(function(data)
    {
      _.extend(props, data);

      if(!obj.nostate)
      {
        root.history[props.replace ? 'replaceState' : 'pushState'](props, props.title, props.url);
      }
      if(!props.data)
      {
        if(data)
        {
          render(_.extend({}, props, {html: data.html}));
        }
        else
        {
          render(_.extend({}, props));
        }
      }

      $window.trigger('statechange');

      deferred.resolve(props);
    });

    return deferred.promise();
  }

  window.onpopstate = function(e)
  {
    var state = e.state;

    if(!state) return true;
    e.preventDefault();

    if(!state.html || getCookieValue('login') !== 'yes')
    {
      fetch(state).then(function(data)
      {
        var props = _.extend(true, {}, state, data.json);
        // combine with data
        props     = _.extend({}, props, data);

        render(_.extend(props));

        $window.trigger('statechange');
      });
    }
    else
    {
      render(state);
      $window.trigger('statechange');
    }

    return false;
  };

  if(!history.state)
  {
    Navigate(
    {
      url: location.href,
      fake: true,
      replace: true
    });
  }

  root.Navigate = Navigate;
})(this);