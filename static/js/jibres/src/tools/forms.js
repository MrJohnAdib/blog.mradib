// Ajaxify: Ersale Form va Link ha ba estefade az AJAX
(function($)
{
  'use strict';

  var defaults =
  {
    ajax:
    {
      type: undefined,
      url: undefined,
      processData: false,
      contentType: false,
      dataType: 'json',
      cache: false,
      timeout: 100000,
      abort: false,
      autoScroll: false,
      async: true,
      beforeSend: function (request)
      {
        request.setRequestHeader("accept", "application/json");
      }
    },
    noLoading: false,
    lockForm: true,
  };
  var requests = [];

  $.fn.ajaxify = function Ajaxify(options)
  {
    var $form = $(this);
    $.extend(true, this, defaults, options);
    $form.trigger('ajaxify:init', this);
    var _super = this;

    // save focus position if wanna disable inputs
    if(_super.lockForm)
    {
      $(":focus").attr('data-hasFocus', true);
    }


    function send($this)
    {
      $form.addClass('submitedForm');
      $form.trigger('ajaxify:send:before', _super);

      var elementOptions = { type: 'post', url: location.href};

      // set url for link or normal mode;
      if(_super.link)
      {
        elementOptions.type = $this.attr('data-method') || 'post';
        elementOptions.url  = $this.prop('href') || $this.attr('data-action');
      }
      else
      {
        elementOptions.type = $this.prop('method') || $this.attr('data-method');
        elementOptions.url  = $this.prop('action') || $this.attr('data-action');
      }

      // set default url
      if(!elementOptions.url)
      {
        elementOptions.url = location.href;
      }
      // set default url
      if(!elementOptions.type)
      {
        elementOptions.type = 'post';
      }


      if(_super.type === 'post')
      {
        elementOptions.type = 'post';
      }
      var ajax = _.extend(_super.ajax, elementOptions);

      var ajaxOptions;
      if(!_super.link)
      {
        // if we are in form use it, else use empty param
        if($this.is('form'))
        {
          // try to detect empty input file and disabled them because
          // we have problem on safari ajax request with error 400!
          var $fileInputs = $('input[type="file"]:not([disabled])', $this)
          $fileInputs.each(function(a, myFileInput)
          {
            if (myFileInput.files.length > 0)
            {
              return;
            }
            $(myFileInput).prop('disabled', true);
          })

          var fd = new FormData($this.get(0));
          // change file disabled status to normal condition
          $fileInputs.prop('disabled', false)
        }
        else
        {
          var fd = new FormData();
        }


        // attach files with drag and drop if exist
        $this.find('[data-uploader]').each(function()
        {
          var $myUploader      = $(this);
          var droppedFiles     = $myUploader.prop('droppedFiles');
          var droppedFilesName = $myUploader.attr('data-name');

          if(!droppedFilesName)
          {
            droppedFilesName = 'droppedFiles';
          }

          if(droppedFiles)
          {
            if(!$.isArray(droppedFiles))
            {
              droppedFiles = [droppedFiles];
            }
            var i = 0;
            Array.prototype.forEach.call( droppedFiles, function( _file )
            {
              var fileName = droppedFilesName;
              // for number 2+ add counter on file name
              i++;
              if(i > 1)
              {
                fileName = droppedFilesName + i;
              }
              if ('Blob' in window && _file instanceof Blob)
              {
                if(_file.name)
                {
                  fd.append(fileName, _file, _file.name);
                }
                else
                {
                  fd.append(fileName, _file);
                }
              }
              else
              {
                fd.append(fileName, _file);
              }

            });
            $this.prop('droppedFiles', null);
          }
        });

        $('button[name][data-clicked]').each(function()
        {
          if(this.getAttribute('name'))
          {
            fd.append(this.getAttribute('name'), this.value);
          }
          $(this).prop('data-clicked', false);
        });

        // $this.find('[contenteditable]').each(function()
        // {
        //   fd.append(this.getAttribute('name'), this.innerHTML);
        // });
        for(var formName in ajax.data)
        {
          fd.append(formName, ajax.data[formName]);
        }
        ajaxOptions = _.extend(ajax,
        {
          data: fd
        });

        // add csrf
        if(!fd.has('csrf'))
        {
          fd.append('csrf', Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
        }



        if(ajaxOptions.type === "get")
        {
          if($this.serialize())
          {
            Navigate(
            {
              url: ajaxOptions.url + '?' + $this.serialize()
            });
            return;
          }
        }

        if(_super.lockForm)
        {
          $this.find('input, textarea, [contenteditable]').attr('disabled', '');
          $('[data-ajaxify]').attr('disabled', '');
          $('button').attr('disabled', '');
        }
      }
      else
      {
        try
        {
          var data = JSON.parse($this.attr('data-data'));
          ajaxOptions = _.extend(ajax,
          {
            data: data,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            processData: true
          });
        }
        catch(e)
        {
          ajaxOptions = ajax;
        }
        if(_super.lockForm)
        {
          $('[data-ajaxify]').attr('disabled', '');
        }
      }

      var autoCloseTimeout  = $this.attr('data-autoClose');
      var autoScrollAttr    = $this.attr('data-autoScroll');

      // var refresh   = ajaxOptions.refresh || $this.attr('data-refresh') !== undefined;
      var autoClose = ajaxOptions.autoClose || autoCloseTimeout !== undefined;

      if(!_super.noLoading)
      {
        $('body').attr('data-loading-form', '');
        callFunc('loading_form', true);
      }

      // get timeout from form attr
      if($this.attr('data-timeout'))
      {
        ajaxOptions.timeout = $this.attr('data-timeout');
      }

      if($this.attr('data-removeElement'))
      {
        $this.remove();
      }
      else if($this.hasClass('imageDel') && $this.parents('[data-removeElement]'))
      {
        $this.parents('[data-removeElement]').remove();
      }
      else if($this.parents('[data-removeElement]'))
      {
        $this.parents('[data-removeElement]').remove();
      }

      // add progress to all ajaify forms
      ajaxOptions.beforeSend = function()
      {
        NProgress.configure({ animationModel: 'form' }).start();
      };
      ajaxOptions.xhr = function ()
      {
          var xhr = new window.XMLHttpRequest();
          //Download progress
          xhr.addEventListener("progress", function (evt)
          {
              if (evt.lengthComputable)
              {
                  var percentComplete = evt.loaded / evt.total;
                  if(percentComplete > 0 && percentComplete < 1)
                  {
                    NProgress.set(percentComplete)
                  }
                  // percentComplete = Math.round(percentComplete * 100);
                  // logy(percentComplete);
              }
          }, false);
          return xhr;
      };
      ajaxOptions.complete = function(jqXHR)
      {
        NProgress.done(true);
        // NProgress.remove();
      };


      $form.trigger('ajaxify:send:ajax:start', ajaxOptions);

      var myXhr = $.ajax(ajaxOptions)
      .done(function(data, status, xhr)
      {
        analyseAjaxFormResponse(data, $this, _super, autoScrollAttr);

        $form.trigger('ajaxify:success', data, status, xhr);
      })
      .fail(function(_jqXHR, _textStatus, _errorThrown)
      {
        var responseJSON = ajaxResponseToJSON(_jqXHR);

        var myResult = analyseAjaxFormResponse(responseJSON, $this, _super, autoScrollAttr);
        if(myResult === null)
        {
          analyseAjaxFormError(_jqXHR, _textStatus, _super);
        }

        $form.trigger('ajaxify:fail', _jqXHR, _textStatus, _errorThrown);
      })
      .always(function(a1, a2, a3)
      {
        // always finish progress
        NProgress.done(true);

        $form.trigger('ajaxify:complete', a1, a2, a3);

        // if(_super.noLoading) return;
        // unlockForm(_super.lockForm);
        // use in fail and success seperately
        // because sometimes always is not called!

        checkAutoClosePage(autoClose, autoCloseTimeout);
      });

      // logy(ajaxOptions.abort);
      if(ajaxOptions.abort)
      {
        requests.push(myXhr);
        for(var i = 0; i < requests.length-1; i++)
        {
          requests[i].abort();
        }
      }

    }

    send.call(_super, $form.first());
  };



  $.fn.ajaxify.showResults = function(data, $form, _super)
  {
    $form.trigger('ajaxify:render:start', data, $form, _super);
    // try to show notif
    var notifResult = notifGenerator(data, $form);
    $form.trigger('ajaxify:render:done', data, $form, _super);

    if (!notifResult.error && $form.attr('data-clear') !== undefined)
    {
      $form.find('input, select, textarea, [contenteditable]').not('[data-unclear]').not('[type=checkbox]').val('');
    }

    $form.trigger('ajaxify:render:clear', data, $form, _super);

    if(!notifResult.error)
    {
      setTimeout(function()
      {
        if($form.find('input[data-get-focus]').get(0))
        {
          $form.find('input[data-get-focus]').get(0).select();
        }
        else if(_super && _super.lockForm)
        {
          $('[data-hasFocus]').trigger("focus");
          $('[data-hasFocus]').attr('data-hasFocus', null);
        }
      }, 100);
    }

    $form.trigger('ajaxify:render:focus', data, $form, _super);
    // $form.trigger('ajaxify:notify', data, $form, _super);

    return notifResult;
  };
})(jQuery);

