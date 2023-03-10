
function kerkereRunner()
{
  $(document).off('click', '[data-kerkere]');
  $(document).on('click', '[data-kerkere]', function()
  {
    kerkere($(this));
  });
}


function kerkere(_this)
{
    var myTarget = null;
    var $target  = null;
    var singleMode = _this.attr('data-kerkere-single');
    if(_this)
    {
      myTarget = _this.attr('data-kerkere');
      if(myTarget)
      {
        $target = $(myTarget);
      }
    }

    if($target && $target.length)
    {
      // show status if needed
      var myStatusEl = '[data-kerkere-look="'+ myTarget +'"]';

      if($target.is(":visible"))
      {
        _this.attr('data-kerkere-status', 'close');
        // if want icon
        if(_this.attr('data-kerkere-icon') !== undefined)
        {
          // on next this will closed
          _this.attr('data-kerkere-icon', 'close');
          $(myStatusEl).attr('data-kerkere-status', 'close');
        }
      }
      else
      {
        _this.attr('data-kerkere-status', 'open');
        // if want icon
        if(_this.attr('data-kerkere-icon') !== undefined)
        {
          // on next this will open
          _this.attr('data-kerkere-icon', 'open');
          $(myStatusEl).attr('data-kerkere-status', 'open');
        }
      }

      // don't close this one
      if(singleMode === 'forceOpen')
      {
        // only Open
        $target.slideDown('fast');
      }
      else
      {
        //Expand or collapse this panel
        $target.slideToggle('fast');
      }
    }

    if(singleMode !== undefined)
    {
      //Hide the other panels
      $('[data-kerkere-content]').not($target).slideUp('fast');
      // set status of all kerkere to close
      $('[data-kerkere]').not(_this).attr('data-kerkere-status', 'close');
      // change icon of all other
      $('[data-kerkere][data-kerkere-icon]').not(_this).attr('data-kerkere-icon', 'close');

      // inside tab design, only set focus on this one
      $('[data-kerkere] .nav-link').removeClass('active');
      $(_this).find('.nav-link').addClass('active');
    }
}

