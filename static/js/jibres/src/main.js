// Code haye moshtarak beine tamame safahat
// Az jomle meqdar dehi haye avvalie
// va etesale roydad haye mokhtalef

$(document).ready(function()
{
    /* Blur inputs with ESC key */
  $(document).on("keydown", function(e)
  {
      switch (e.keyCode)
      {
        case 13:
          // if we have enter on form elements, disallow to submit
          if($(":focus").parents('form').attr('data-disallowEnter') !== undefined)
          {
            // logy('You are not allow to submit form via keyboard enter');
            e.preventDefault();
          }
          break;


        case 27:
          // handle press escape
          escPressed();
          break;


        case 112:
          if(e.ctrlKey)
          {
            toggleLogy();
          }
          break;
      }
  });


  // Ajaxify links and forms
  $(document).on('submit', 'form', function(e)
  {
    // check old page has xhr and only if we have xhr try to change page
    if($('[data-xhr]').length === 0)
    {
      // if we dont have xhr on current page use hard change location
      return;
    }

    if($(this).hasAttr('data-action')) return;
    if($(this).hasClass('ck')) return;

    e.preventDefault();

    if(needCheckRecaptcha(this))
    {
      // check in recaptcha
      // and call ajaxify from recaptcha
    }
    else
    {
      $(this).ajaxify();
    }

  });


  $(document).on('click', 'button[name]', function(e)
  {
      // $("input[type=submit]", $(this).parents("form")).prop("clicked", false);
      $(this).attr("data-clicked", '');
  });


  $(document).on('keypress','input[type="date"],\
    input[type="datetime-local"],\
    input[type="number"],\
    input[type="tel"],\
    input[data-disallowFaNum],\
    input#mobile',
    function(e)
    {
      var disallowInput = false;

      // for input type number with max value
      // and
      if($(this).attr('type') === 'number' && $(this).attr('max') &&
          this.value.length >= $(this).attr('max').length && e.which !== 13)
      {
        disallowInput = true;
      }

      // if type persian key prevent default
      else if(e.which >= 1776 && e.which <= 1785)
      {
        // prevent default only if typed persian number
        e.preventDefault();
        // convert to english number
        var val = '';
        var key = String.fromCharCode(e.which);
        try
        {
          var start = this.selectionStart;
          var end   = this.selectionEnd;
          // on fa input start and end is null! simulate cursor at end of input
          if(start === null && end === null)
          {
            start = this.value.length;
            end   = this.value.length;
          }
          val = this.value.slice(0, start) + key.toEnglish() + this.value.slice(end);
        }
        catch(e)
        {
          val = this.value + key.toEnglish();
        }
        // set new value as val
        this.value = val;
        // need chage cursor position at future
        //
        //

        // call input event
        var inputEvent = document.createEvent('Event');
        inputEvent.initEvent('input', true, true);
        this.dispatchEvent(inputEvent);

        var changeEvent = new Event('change');
        this.dispatchEvent(changeEvent);

        return true;
      }
      else if(e.which >= 48 && e.which <= 57)
      {
        // do nothing, only accept numbers
      }
      else if(e.which == 46)
      {
        if(this.value.indexOf('.') >= 0 )
        {
          disallowInput = true;
        }
        // do nothing, only accept decimal seperator
        // check if we have one decimal dont accept another one!
      }
      else if (e.which === 0 || e.which === 8 || e.which === 13)
      {
        // accept system btn
      }
      // ctrl + a, ctrl + x, ctrl + c, ctrl + v
      else if (e.ctrlKey)
      {
        // accept system btn
      }
      else if($(this).attr('type') === 'number' || $(this).attr('type') === 'tel')
      {
          disallowInput = true;
      }
      else
      {
        // do nothing
      }


      if(disallowInput)
      {
        // prevent default if press invalid char
        e.preventDefault();

        // show invalid class
        $this = $(this);
        $this.addClass('error');
        setTimeout(function()
        {
          $this.removeClass('error');
        }, 500);
        return false;
      }
    });



  // 'a:not([target="_blank"])\
  // :not([data-ajaxify])\
  // :not([data-action])\
  // :not([data-modal])',
  $(document.body).on('click', 'a', function(_e)
  {
    var $this = $(this);

    // check old page has xhr and only if we have xhr try to change page
    if($('[data-xhr]').length === 0)
    {
      // if we dont have xhr on current page use hard change location
      return;
    }

    var exactlyClickedEl = $(_e.target);
    // if element inside another element don't do anything for parent a
    if(exactlyClickedEl.hasAttr('data-ajaxify') || exactlyClickedEl.hasAttr('data-confirm'))
    {
      return;
    }
    if($this.attr('href') === '#')
    {
      return;
    }
    if($this.is('a[href*="#"]'))
    {
      return;
    }

    if(
        $this.attr('target') === '_blank' ||
        $this.hasAttr('data-ajaxify') ||
        $this.hasAttr('data-action') ||
        $this.hasAttr('data-direct') ||
        $this.hasAttr('data-modal') ||
        $this.isAbsoluteURL()
      )
      {
        return;
      }
    if($this.parents('.ck-editor').length > 0) return;
    // check exec commands
    if($this.attr('data-exec') === 'print')
    {
      window.print();
      return;
    }

    _e.preventDefault();

    if(!$this.attr('href') || $this.attr('href').indexOf('#') > -1) return;

    var href = $this.attr('href');

    if(href.indexOf('lang=') > -1) return location.replace(href);

    Navigate({
      url: href,
      fake: !!$this.attr('data-fake')
    });
  });


  $(document).on('click', '[data-ajaxify]', function(e)
  {
    if($(this).attr('data-continue') === undefined)
    {
      e.preventDefault();
      e.stopPropagation();
    }
    // if need to run special function, run it
    if($(this).attr('data-fn') !== undefined)
    {
      callFunc($(this).attr('data-fn'), this);
    }
    // send as ajaxify
    var refreshMode = $(this).attr('data-refresh') !== undefined;
    var autoScrollMode = $(this).attr('data-autoScroll');

    $(this).ajaxify({link: true, refresh: refreshMode, autoScroll: autoScrollMode});
  });


  $(document).on('click', '[data-confirm]', function(e)
  {
    e.preventDefault();
    e.stopPropagation();
    deleteConfirmer($(this));
    return false;
  });


  $(document).on('click', '[data-removeElTrigger]', function(e)
  {
    $this = $(this);
    if($this.attr('data-removeElement'))
    {
      $this.remove();
    }
    else if($this.parents('[data-removeElement]'))
    {
      $this.parents('[data-removeElement]').remove();
    }
  });

  $(document).on("click", '#samandehiCert', function(e){
    var myUrl = $(this).attr('data-open');
    if(myUrl)
    {
      window.open(myUrl, "Popup","toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=460, height=600, top=30");
    }
  });


});

