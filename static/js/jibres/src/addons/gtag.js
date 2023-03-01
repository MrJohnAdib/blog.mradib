/**
 * runGtag on all pages after load ga script if exist
 * @return {[type]} [description]
 */
function runGtag()
{
	myUA  = $('meta[name="gtag"]').attr('content');
	if(myUA)
	{
		if($('meta[name="gtag"]').prop('install') === undefined)
		{
			window.dataLayer = window.dataLayer || [];
			gtag('js', new Date());
			gtag('config', myUA);
			$('meta[name="gtag"]').prop('install', true);
		}

		var origin = window.location.protocol + '//' + window.location.host;
		var pathname = window.location.href.substr(origin.length);

		// gtag('config', myUA, {'page_path': pathname, cookie_flags: 'SameSite=None;Secure'});
		if(jibresUID())
		{
			gtag('config', myUA, {'page_path': pathname, cookie_flags: 'SameSite=Strict;Secure', 'user_id': jibresUID()});
		}
		else
		{
			gtag('config', myUA, {'page_path': pathname, cookie_flags: 'SameSite=Strict;Secure'});
		}
	}
}
// function gtag
function gtag(){dataLayer.push(arguments);}

