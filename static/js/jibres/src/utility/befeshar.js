
// global variable to save latest focused element
var lastFocusedEl;


function runBefeshar()
{
  saveLastFocusedEl();
}



function saveLastFocusedEl()
{
  $(document).off('focusin.befeshar').on('focusin.befeshar', '[data-befeshar-save]', function(){

    $('[data-befeshar-save=latest]').attr('data-befeshar-save', "");
    $(this).attr('data-befeshar-save', 'latest');
    lastFocusedEl = $(this);
  });


  $(document).off('click.befeshar').on('click.befeshar', '[data-kbd-press]', function(){

    if(lastFocusedEl && lastFocusedEl.length)
    {
      var kbd = $(this).attr('data-kbd-press');

      var oldVal = lastFocusedEl.val();
      var newVal = oldVal + kbd;

      switch(kbd)
      {
        case 'clr':
          newVal = "";
          break;

        case '*':
        case '-':
        case '+':
        case '/':
          break;

        default:
          break;
      }

      lastFocusedEl.val(newVal);
      lastFocusedEl.trigger('input');

      lastFocusedEl.focus();
    }
  })
}

