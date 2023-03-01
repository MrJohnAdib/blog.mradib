
function timezone()
{
  var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return timeZone;
};


function timezoneDetector()
{
  myZone = timezone();
  // set timezone cookie
  setCookie('tz', myZone, 7);
}
