

function resizeDetector(_data, _forceArray)
{
  if(urlJibres('sitebuilder:preview'))
  {
    return null;
  }

  var windowInitWidth = window.innerWidth;

  $(window).resize(function()
  {
    if(this.resizeTO) clearTimeout(this.resizeTO);
    this.resizeTO = setTimeout(function()
    {
      $(this).trigger('resizeWin');
    }, 50);

  });

  $(window).bind('resizeWin', function()
  {
    //do something, window hasn't changed size in 100ms
    var myWidth = document.body.clientWidth || window.innerWidth;
    // some useful variables
    // document.body.clientWidth
    // document.body.clientHeight
    // window.innerWidth
    // window.innerHeight

    if(myWidth < 768)
    {
      var is_iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      var is_android = /android/i.test(navigator.userAgent);

      var platform = '';
      if(is_iOS)
      {
        platform = 'ios';
      }
      else if(is_android)
      {
        platform = 'android';
      }

      $('html').attr('data-pwa', platform);
      $('html').attr('data-desktop', null);
    }
    else
    {
      $('html').attr('data-pwa', null);
      $('html').attr('data-desktop', '');
    }


    // resized yes or no
    if (window.innerWidth !== windowInitWidth)
    {
      $('html').attr('data-resized', '');

      // check pwa sidebar
      resetSidebarStatus();
      // simulate press mouse to close select2 or something else
      $('body').trigger('mousedown');
    }
    else
    {
      $('html').attr('data-resized', null);
    }


    if(isPagePWA())
    {
      // in pwa
    }
    else if($('html').attr('data-desktop') !== undefined)
    {
      // in desktop mode

      // detect fullscreen mode
      // if(
      //     (window.fullScreen) ||
      //     (window.innerWidth == screen.width && window.innerHeight == screen.height)
      //   )
      // {
      //   $('html').attr('data-fullscreen', '');
      // }
      // else if (!window.screenTop && !window.screenY)
      // {
      //   $('html').attr('data-fullscreen', '');
      // }
      // else
      // {
      //   $('html').attr('data-fullscreen', null);
      // }
    }
  });

  $(window).trigger('resizeWin');
}

