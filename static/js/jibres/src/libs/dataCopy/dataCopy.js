
function dataCopy()
{
  $('[data-copy]').off('click.copy').on('click.copy', function()
  {
    var copyAttr = $(this).attr('data-copy');
    var copyMsg  = $(this).attr('data-copy-msg');
    if(copyAttr)
    {

      const el = document.createElement('textarea');  // Create a <textarea> element
      el.value = copyAttr;                            // Set its value to the string that you want copied
      el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
      el.style.position = 'absolute';
      el.style.left = '-9999px';                      // Move outside the screen to make it invisible
      document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
      const selected =
        document.getSelection().rangeCount > 0        // Check if there is any content selected previously
          ? document.getSelection().getRangeAt(0)     // Store selection if found
          : false;                                    // Mark as false to know no selection existed before
      el.select();                                    // Select the <textarea> content
      if(!copyMsg)
      {
        if(urlLang() === 'fa')
        {
          copyMsg = 'کپی شد! گرفتیش';
        }
        else
        {
          copyMsg = 'Copied! You got this';
        }
      }
      notif('info', copyMsg);
      try
      {
        // Copy - only works as a result of a user action (e.g. click events)
        // copy to clipboard
        document.execCommand('copy');
      }
      catch (err)
      {
        console.log('cant copy! Ctrl/Cmd+C to copy')
      }

      document.body.removeChild(el);                  // Remove the <textarea> element
      if (selected) {                                 // If a selection existed before copying
        document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
        document.getSelection().addRange(selected);   // Restore the original selection
      }


    }
  })
}


