
function needCheckRecaptcha(_form)
{
  if($(_form).find('[name="recaptcha_token"]').length === 1)
  {
    getRecaptchaToken(_form);
    return true;
  }

  return false;
}


function runRecaptcha()
{
  // recaptcha is ready
  //
  // to improve speed we cat get token and save expire date
  // then on form submit if token is valid, use it.
  // else get another token
  // return getRecaptchaToken();
}



/**
 * add captcha to all requests
 * @return {[type]} [description]
 */
function getRecaptchaToken(_form)
{
  var site_key = $('form [name="recaptcha_sitekey"]').val();
  var gaction  = $('form [name="recaptcha_action"]').val();
  var tokenEl  = $('form [name="recaptcha_token"]');

  if(!site_key)
  {
    return false;
  }
  if(!gaction)
  {
    gaction = 'NA';
  }

  grecaptcha.ready(function()
  {
    grecaptcha.execute(site_key, {action: gaction}).then(function(token)
    {
      // Add your logic to submit to your backend server here.
      tokenEl.val(token);

      if($(_form).length === 1)
      {
        $(_form).ajaxify();
      }
    });
  });
}

