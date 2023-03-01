
/**
 * [fitNumber description]
 * @param  {[type]} _num [description]
 * @return {[type]}      [description]
 */
function fitNumber(_num, _seperator)
{
  if(_num === null)
  {
    return null;
  }

  // if needed do not show as local string
  if(_seperator !== false)
  {
    // if is not number set zero
    if(isNaN(_num))
    {
      _num = 0;
    }
    else
    {
      _num = parseFloat(_num);
    }
    _num = _num.toLocaleString();
  }
  else
  {
    _num = _num.toString();
  }
  if($('html').attr('lang') === 'fa')
  {
    _num = _num.toFarsi();
  }
  else if($('html').attr('lang') === 'ar')
  {
    _num = _num.toArabic();
  }
  else
  {
    _num = _num.toEnglish();
  }
  return _num;
}

function humanMin(s)
{
    s = Math.floor( s );
    m = Math.floor( s / 60 );
    // m = m >= 10 ? m : '0' + m;
    s = Math.floor( s % 60 );
    s = s >= 10 ? s : '0' + s;
    r = fitNumber(m) + ':' + fitNumber(s);

    if(s === '00' && urlLangFa())
    {
      r += fitNumber(s);
    }
    return r;
}

