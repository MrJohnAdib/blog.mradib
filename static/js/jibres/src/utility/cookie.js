
function getCookieValue(a)
{
  var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
}


function setCookie(name,value,days)
{
  var expires = "";
  if (days)
  {
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  if (location.protocol == "https:")
  {
    document.cookie = name + "=" + (value || "")  + expires + "; path=/; secure;";
  }
  else
  {
    document.cookie = name + "=" + (value || "")  + expires + "; path=/;";
  }
}

