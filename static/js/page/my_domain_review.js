
function pageScript()
{
  $('[data-budget] input[type="checkbox"]').off('click.budget').on("click.budget", function(event)
  {
    calcDomainPrice();
  });
}


function calcDomainPrice()
{
  var $price      = $('[data-price]');
  var $gift       = $('[data-gift]');
  var $budget     = $('[data-budget]');
  var $payable    = $('[data-payable] #domainPayablePrice');
  var $useBudget  = $('[data-budget] input[type="checkbox"]');

  var myPrice     = 0;
  var myGift      = 0;
  var myBudget    = 0;
  var useMyBudget = null;
  var myPayable   = 0;

  if($price.length === 1)
  {
    myPrice = $price.attr('data-price');
  }

  if($gift.length === 1)
  {
    myGift = $gift.attr('data-gift');
  }

  if($budget.length === 1)
  {
    myBudget = $budget.attr('data-budget');
  }
  if($useBudget.length === 1)
  {
    if($useBudget.is(":checked"))
    {
      useMyBudget = true;
    }
    else
    {
      useMyBudget = false;
    }
  }

  // calc payable without gift
  myPayable = myPrice - myGift;

  if(useMyBudget)
  {
    myPayable = myPayable - myBudget;
    if(myPayable < 0)
    {
      myPayable = 0;
    }
  }

  if($payable.length === 1)
  {
    $payable.text(fitNumber(myPayable));
  }

}
