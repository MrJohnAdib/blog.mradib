// margin (calculated as ([price - cost] / price) * 100)
function calcProductMargin()
{
  if(!$('#finalPrice').length)
  {
    return;
  }

  var cost                = getElNumber($('#buyprice'));
  var price               = getElNumber($('#price'));
  var discount            = getElNumber($('#discount'));
  var discountRate        = 0;
  var vat                 = 0;
  var vatRate             = 0;
  // finalPrice           = price - discount
  var finalPrice          = price;
  var finalPriceTxt       = price;
  // grossProfit          = price - cost
  var grossProfit         = 0;
  // grossProfitMargin    = (price - cost) / price
  var grossProfitMargin   = 0;
  // get money value
  var moneyUnit           = $('#moneyUnit').text();
  // useful elements
  var grossProfitEl       = $('.grossProfitMargin');
  var discountEl          = $('#discount').parent();
  var finalPriceEl        = $('#finalPrice');
  var finalPriceMsgEl     = $('#finalPrice').parents('[data-desc]');

  // calc final price
  if(discount)
  {
    finalPrice = price - discount;
    finalPriceTxt +=  " - " + discount;
    discountRate = ((discount / price) * 100).toFixed(2);
  }

  // set discount rate
  if(discountRate > 10000)
  {
    $('#discountRate').text('+ ∞');
  }
  else if(discountRate < 0)
  {
    $('#discountRate').text('- ∞');
  }
  else
  {
    $('#discountRate').text(fitNumber(discountRate) + ' %');
  }

  // get vat rate
  vatRate = $('#vat').attr('data-rate');
  if(vatRate)
  {
    vatRate = parseFloat(vatRate);
  }

  // show vat value
  if(price - discount > 0)
  {
    vat = ((price - discount) * vatRate).toFixed(2);
    vat = parseFloat(vat);
    // display vat
    $('#vatCost').text(fitNumber(vat));
  }
  else
  {
    $('#vatCost').text('-');
  }

  // charge tax is enabled by user
  if($("#vat").is(":checked"))
  {
    finalPrice = finalPrice + vat;
    finalPriceTxt +=  " + " + vat;
  }

  // set finalPrice
  // $('#finalPrice').parent().parent().find('label span').text(fitNumber(finalPriceTxt, false));
  finalPriceEl.text(fitNumber(finalPrice));

  if(price && cost)
  {
    grossProfit       = finalPrice - cost;
    grossProfitMargin = ((finalPrice - cost) / cost)  * 100;
    grossProfitMargin = parseFloat(grossProfitMargin.toFixed(2))
  }

  // set val
  if(grossProfitMargin)
  {
    if(grossProfitMargin > 100000)
    {
      grossProfitEl.find('.c').html('+ ∞');
    }
    else if(grossProfitMargin < 0)
    {
      grossProfitEl.find('.c').html('- ∞');
    }
    else
    {
      grossProfitEl.find('.c').html(fitNumber(grossProfitMargin) + '%');
    }
    grossProfitEl.find('.cauto').html(fitNumber(grossProfit) + ' ' + moneyUnit);
    grossProfitEl.attr('data-percent', grossProfitMargin).slideDown('fast');
  }
  else
  {
    grossProfitEl.find('.c').html('-');
    grossProfitEl.find('.cauto').html('-');
    grossProfitEl.attr('data-percent', grossProfitMargin).slideUp('fast');
  }

  // change design based on change
  if(grossProfitMargin > 10)
  {
    grossProfitEl.find('[data-desc]').removeClass('alert2-danger')
    grossProfitEl.find('[data-desc]').removeClass('alert2-info')
    grossProfitEl.find('[data-desc]').addClass('alert2-success')
  }
  else if(grossProfitMargin > 0)
  {
    grossProfitEl.find('[data-desc]').removeClass('alert2-danger')
    grossProfitEl.find('[data-desc]').addClass('alert2-info')
    grossProfitEl.find('[data-desc]').removeClass('alert2-success')
  }
  else
  {
    grossProfitEl.find('[data-desc]').addClass('alert2-danger')
    grossProfitEl.find('[data-desc]').removeClass('alert2-info')
    grossProfitEl.find('[data-desc]').removeClass('alert2-success')
  }

  // check discount and percent
  if(discountRate > 100 || discountRate < 0)
  {
    discountEl.addClass('alert2-danger');
    discountEl.removeClass('alert2-warning');
    discountEl.removeClass('alert2-info');
    discountEl.removeClass('alert2-success');
  }
  else if(discountRate == 0)
  {
    discountEl.removeClass('alert2-danger');
    discountEl.removeClass('alert2-warning');
    discountEl.removeClass('alert2-info');
    discountEl.removeClass('alert2-success');
  }
  else
  {
    if(cost < price && cost + discount > price)
    {
      discountEl.removeClass('alert2-danger');
      discountEl.addClass('alert2-warning');
      discountEl.removeClass('alert2-info');
      discountEl.removeClass('alert2-success');
    }
    else if(discountRate < 30 )
    {
      discountEl.removeClass('alert2-danger');
      discountEl.removeClass('alert2-warning');
      discountEl.removeClass('alert2-info');
      discountEl.addClass('alert2-success');
    }
    else
    {
      discountEl.removeClass('alert2-danger');
      discountEl.removeClass('alert2-warning');
      discountEl.addClass('alert2-info');
      discountEl.removeClass('alert2-success');
    }

  }


  // all check for final price
  if(finalPrice === 0)
  {
    finalPriceMsgEl.removeClass('alert2-danger');
    finalPriceMsgEl.removeClass('alert2-warning');
    finalPriceMsgEl.removeClass('alert2-success');
  }
  else if(finalPrice < 0)
  {
    finalPriceMsgEl.addClass('alert2-danger');
    finalPriceMsgEl.removeClass('alert2-warning');
    finalPriceMsgEl.removeClass('alert2-success');
  }
  else if(finalPrice <= cost)
  {
    finalPriceMsgEl.removeClass('alert2-danger');
    finalPriceMsgEl.addClass('alert2-warning');
    finalPriceMsgEl.removeClass('alert2-success');
  }
  else
  {
    finalPriceMsgEl.removeClass('alert2-danger');
    finalPriceMsgEl.removeClass('alert2-warning');
    finalPriceMsgEl.addClass('alert2-success');
  }

}
