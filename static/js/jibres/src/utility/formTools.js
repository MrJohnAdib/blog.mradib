function formToolsRunner()
{
  toggleRadio();
  radioSave();
  inputSave();
}


function toggleRadio()
{
  $('.togglable input[type=radio]').off("click.setting").on("click.setting", function(event)
  {
    var $thisRadio = $(this);

    if($thisRadio.prop('checked-toggle'))
    {
      $thisRadio.prop('checked', false);
      $thisRadio.prop('checked-toggle', false);
    }
    else
    {
      $thisRadio.prop('checked-toggle', true);
      setTimeout(function()
      {
        $thisRadio.prop('checked-toggle', false);
      }, 1000)
    }
  });
}


function radioSave()
{
  $('form[data-patch] input[type=radio]').off("keydown.setting").on("keydown.setting", function(_e)
  {
    var arrowKeys = [37, 38, 39, 40];
    if (arrowKeys.indexOf(_e.which) !== -1)
    {
      if(_e.shiftKey === true)
      {

      }
      else
      {
        return false;
      }
    }
  });
}


function inputSave()
{
  var timeoutPatchChange = null;
  $('form[data-patch] input').off("change.settingPatch").on("change.settingPatch", function(event)
  {
    var myForm = $(this).parents('form[data-patch]');
    if(myForm.length !== 1)
    {
      return null;
    }

    switch($(this).attr('type'))
    {
      case 'checkbox':
      case 'radio':
        $(myForm).ajaxify({lockForm:false});
      break;

      case 'color':
        $(myForm).ajaxify({lockForm:false});
      break;

      case 'text':
        if($(this).attr('data-rangeslider') !== undefined)
        {
          if(timeoutPatchChange)
          {
            clearTimeout(timeoutPatchChange);
          }
          timeoutPatchChange = setTimeout(function()
          {
            // submit form for range slider because it's only trigger change not keyup
            $(myForm).ajaxify({lockForm:false});
          }, 500);
        }
        else
        {
          return null;
        }
      break;

      default:
        return null;
      break;
    }
  });

  var timeoutPatchUp = null;
  $('form[data-patch] input').off("keyup.settingPatch").on("keyup.settingPatch", function(event)
  {
    switch($(this).attr('type'))
    {
      case 'text':
      case 'number':
      case 'tel':
      case 'url':
      case 'color':
      case 'date':
      case 'email':
      case 'search':
      case 'password':
        // do nothing
      break;

      default:
        return false;
      break;
    }
    var myForm = $(this).parents('form[data-patch]');
    if(myForm.length === 1)
    {
      if(timeoutPatchUp)
      {
        clearTimeout(timeoutPatchUp);
      }
      timeoutPatchUp = setTimeout(function()
      {
        $(myForm).ajaxify({lockForm:false});
      }, 500);

      // sync with preview if exist
      inputSyncLiveMode(this);
    }
  });

  // save changes on textarea
  var timeoutPatchUp = null;
  $('form[data-patch] textarea').off("keyup.settingPatchTextArea").on("keyup.settingPatchTextArea", function(event)
  {
    var myForm = $(this).parents('form[data-patch]');
    if(myForm.length === 1)
    {
      if(timeoutPatchUp)
      {
        clearTimeout(timeoutPatchUp);
      }
      timeoutPatchUp = setTimeout(function()
      {
        $(myForm).ajaxify({lockForm:false});
      }, 1000);

      // sync with preview if exist
      inputSyncLiveMode(this);
    }
  });

}

function inputSyncLiveMode(_this)
{
  var $syncInput = $(_this);
  var syncMode = $syncInput.attr('data-sync');

  if(syncMode)
  {
    var syncModeApply = $("[data-sync-apply="+ syncMode +"]");
    if(syncModeApply.length === 1)
    {
      syncModeApply.text($syncInput.val());
    }
    else
    {
      console.log('we have duplicate sync mode apply element!');
    }
  }
}

