/**
 * on all pages after load ga script if exist
 * @return {[type]} [description]
 */
function runTawk()
{
	var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();

  if($('html').attr('lang') === 'fa'){
    setTimeout(function()
    {
      var iframe = $('iframe[title="chat widget"].open');
      if(iframe.length)
      {
        iframe = iframe.get(0);
        var style = document.createElement('style');
        style.textContent =
        "body{font-family:'IRANYekan'!important;} " +
        "#greetingsText{font-size:12px!important;} " +
        ".messageWrapper .message{font-size:12px!important;}" +
        "#chatTextarea{font-size:12px!important;line-height:16px!important;} " +
        '#contentContainer>[id*="-"]{opacity:0!important;display:none!important;} '+
        '#chatContainerWrapper{bottom:48px!important;}'
        ;
        iframe.contentDocument.head.appendChild(style);
      }
    }, 2000);
  }
}

