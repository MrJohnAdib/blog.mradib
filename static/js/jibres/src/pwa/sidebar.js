

function handlePWASlideBar()
{
  $('body').off('mousedown.hamburger touchmove.hamburger').on('mousedown.hamburger touchmove.hamburger', function(_e)
  {
    if(isPagePWA())
    {
      if($(_e.target).parents('.hamburger').length || $(_e.target).hasClass('hamburger') )
      {
        // click on hanlder, do nothing!
        if($('#sidebar').is(":visible"))
        {
          pwaSidebarHide();
        }
        else
        {
          pwaSidebarShow();
        }
      }
      else if($(_e.target).parents('#sidebar').length)
      {
        // do nothing because clicked on sidebar
        // try to scroll or something else
      }
      else if($(_e.target).is('#sidebar'))
      {
        // do nothing because clicked on sidebar
        // sidebar is empty place of back
        pwaSidebarHide();
      }
      else if(!$('#sidebar').is(":visible"))
      {
        pwaSidebarHide();
        // do nothing because its hide!
      }
      else
      {
        pwaSidebarHide();
      }
    }
  });
}

function resetSidebarStatus()
{
  if(urlM2() === 'wide')
  {
    // do nothing
  }
  else if(isPagePWA())
  {
    // hide on pwa
    pwaSidebarHide();
  }
  else
  {
    pwaSidebarShow();
  }
}

function pwaSidebarShow()
{
  $('body').attr('data-aside', 'open');
  $('#sidebar').show(100).attr('data-active', "");
  $('#pageHeader .pwa .hamburger').attr('data-active', "");
}


function pwaSidebarHide()
{
  if(isPagePWA())
  {
    $('body').attr('data-aside', null);
    $('#sidebar').hide(100).attr('data-active', null);
    $('#pageHeader .pwa .hamburger').attr('data-active', null);
  }
}
