
function calcFooterValues(_table)
{
  if(!_table)
  {
    _table = $('.productList');
    if(_table.length < 1)
    {
      // return null;
    }
  }
  var calcDtCountRow        = 0;
  var calcDtSumCount        = 0;
  var calcDtSumPrice        = 0;
  var calcDtSumDiscount     = 0;
  var calcDtSumVat          = 0;

  var calcDtDiscountPercent = 0;
  var calcDtVat             = 0;
  var calcDtVatPercent      = 0;

  var calcDtSumTotal        = 0;
  var factorType            = $('body').attr('data-page');
  // calc total of column
  _table.find('tbody tr').each(function(index)
  {
    // reset row index
    $(this).find('td.cellIndex').text(fitNumber(index + 1));


    // variables
    var tmpCount = $(this).find('.count').val();
    if(tmpCount)
    {
      tmpCount = parseFloat(tmpCount.toEnglish());
    }

    // var tmpPrice = $(this).find('td.cellPrice').attr('data-val');
    // if(tmpPrice)
    // {
    //   tmpPrice = parseInt(tmpPrice);
    // }
    tmpPrice = $(this).find('.price').val();

    var tmpDiscount = $(this).find('.discount').val();
    if(tmpDiscount)
    {
      tmpDiscount = parseFloat(tmpDiscount.toEnglish());
    }
    var tmpDiscountPercent = 0;

    // check NaN values
    if(isNaN(tmpCount))
    {
      tmpCount = 0;
    }
    if(isNaN(tmpPrice))
    {
      tmpPrice = 0;
    }
    if(isNaN(tmpDiscount))
    {
      tmpDiscount = 0;
    }
    if(tmpPrice < tmpDiscount)
    {
      $(this).find('.discount').val('');
      tmpDiscount = 0;
    }

    var tmpVatPercent = $('.headVat').attr('data-vat-percent');
    if(tmpVatPercent)
    {
      tmpVatPercent = parseFloat(tmpVatPercent);
    }
    if(isNaN(tmpVatPercent))
    {
      tmpVatPercent = 0;
    }

    var tmpVat = 0;
    if($(this).find('.cellVat').attr('data-vat-included') === 'true')
    {
      tmpVat = (tmpPrice - tmpDiscount) * tmpVatPercent;
    }

    var tmpPriceCol    = tmpCount * tmpPrice;
    var tmpDiscountCol = tmpCount * tmpDiscount;
    var tmpVatCol      = tmpCount * tmpVat;
    var tmpFinalCol    = tmpCount * (tmpPrice - tmpDiscount + tmpVat);

    // count of row
    calcDtCountRow    += 1;
    // sum of counts
    calcDtSumCount    += tmpCount;
    calcDtSumPrice    += tmpPriceCol;
    calcDtSumDiscount += tmpDiscountCol;
    calcDtSumVat      += tmpVatCol;
    calcDtSumTotal    += tmpFinalCol;

    // set discount percent
    tmpDiscountPercent = (tmpDiscount * 100 / tmpPrice).toFixed(2);
    if($.isNumeric(tmpDiscountPercent) && tmpDiscountPercent>0 )
    {
      // $(this).find('td.cellDiscount .addon').text(fitNumber(tmpDiscountPercent) + '%');
      $(this).find('td.cellDiscount input').attr('title', fitNumber(tmpDiscountPercent) + ' %');
    }
    else
    {
      $(this).find('td.cellDiscount input').attr('title', '00');
      // $(this).find('td.cellDiscount .addon').text('');
    }

    // set vat value
    $(this).find('td.cellVat').text(fitNumber(tmpVat)).attr('data-val', tmpVat);

    // set final price
    if(tmpFinalCol === 0 && !tmpPrice)
    {
      $(this).find('td.cellTotal').text('');
    }
    else
    {
      $(this).find('td.cellTotal').text(fitNumber(tmpFinalCol));
    }

    // some conditional formating
    if(tmpPrice < tmpDiscount)
    {
      $(this).find('.discount').addClass('negative');
      $(this).find('td.cellDiscount').addClass('negative');
      $(this).find('td.cellTotal').addClass('negative');
    }
    else
    {
      $(this).find('.discount').removeClass('negative');
      $(this).find('td.cellDiscount').removeClass('negative');
      $(this).find('td.cellTotal').removeClass('negative');
    }

  });

  // remove decimal value from total price
  // in future get option from store setting to round this value
  calcDtSumPrice    = Math.round(calcDtSumPrice);
  calcDtSumVat      = Math.round(calcDtSumVat);
  calcDtSumDiscount = Math.round(calcDtSumDiscount);
  calcDtSumTotal    = Math.round(calcDtSumTotal);

  // calc discount percent
  if(calcDtSumDiscount > 0)
  {
    calcDtDiscountPercent = (calcDtSumDiscount / calcDtSumPrice * 100).toFixed(2);
  }


  // show or hide priceBox
  if(calcDtCountRow > 0)
  {
    showWithFade($('.priceBox'));
  }
  else
  {
    setTimeout(function()
    {
      $('.priceBox').slideUp();
    }, 700);
  }

  $('.priceBox .final span').text(fitNumber(calcDtSumTotal)).attr('data-val', calcDtSumTotal);
  $(".priceBox .final").shrink(60);
  $('.priceBox .desc').text(wordifyUnit(calcDtSumTotal, $('.priceBox .final abbr').text()));
  $('.priceBox .item span').text(fitNumber(calcDtCountRow)).attr('data-val', calcDtCountRow);
  $('.priceBox .count span').text(fitNumber(calcDtSumCount)).attr('data-val', calcDtSumCount);
  $('.priceBox .sum span').text(fitNumber(calcDtSumPrice)).attr('data-val', calcDtSumPrice);
  $('.priceBox .vat span').text(fitNumber(calcDtSumVat)).attr('data-val', calcDtSumVat);
  $('.priceBox .discountPercent span').text(fitNumber(calcDtDiscountPercent)+ "%").attr('data-val', calcDtDiscountPercent);
  $('.priceBox .discount span').text(fitNumber(calcDtSumDiscount)).attr('data-val', calcDtSumDiscount);
  // update count of item in table
  _table.attr('data-item', calcDtCountRow);

  if(calcDtCountRow === calcDtSumCount || calcDtSumCount === 0)
  {
    $('.priceBox .count').slideUp();
  }
  else
  {
    $('.priceBox .count').slideDown();
  }
  if(calcDtSumDiscount === 0)
  {
    if($('.priceBox .discount').attr('data-wodiscount') === undefined)
    {
      $('.priceBox .discountPercent').slideUp('fast');
      $('.priceBox .discount').slideUp('fast');
    }
    else
    {
      $('.priceBox .discountPercent').slideDown();
      $('.priceBox .discount').slideDown();
    }
  }
  else
  {
    $('.priceBox .discountPercent').slideDown();
    $('.priceBox .discount').slideDown();
  }
  // show fadein box
  if(calcDtCountRow > 0)
  {
    showWithFade($('.NextBox'));
  }
  else
  {
   $('.NextBox').fadeOut('fast');
  }

    // $('.priceBox .final span').text('-');
}







function bindBtnOnFactor()
{
  $('body').off('barcode:detect').on('barcode:detect', function(_e, _barcode)
  {
    if($('#searchInProducts').length < 1)
    {
      return null;
    }

    productBarcodeFinded(_barcode);
    // set focus to productSearch field
    $('#searchInProducts input[type="search"]').val('').trigger("focus");
    $('#searchInProducts #productSearch').select22('close');
  });

  $(document).off('focus.selectTr').on('focus.selectTr', '#factorAdd table input', function()
  {
    var myTr = $(this).parents('tr');
    if(myTr.attr('data-selected') === undefined)
    {
      navigationFactorAddSetSelected(myTr);
    }
  });

  $(document).off('blur.selectTr').on('blur.selectTr', '#factorAdd table input', function()
  {
    $(this).parents('tr').attr('data-selected', null);
  });


  $(document).off('focus.calcFooterValSearch').on('focus.calcFooterValSearch', '#searchInProducts #select22-search__field', function()
  {
    calcFooterValues();
  });
  $(document).off('input.calcFooterValCount').on('input.calcFooterValCount', 'input.count', function()
  {
    calcFooterValues();
  });

  $(document).off('blur.calcFooterValCount').on('blur.calcFooterValCount', 'input.count', function()
  {
    calcFooterValues();
  });

  $(document).off('input.calcFooterValPrice').on('input.calcFooterValPrice', 'input.price', function()
  {
    calcFooterValues();
  });

  $(document).off('blur.calcFooterValPrice').on('blur.calcFooterValPrice', 'input.price', function()
  {
    calcFooterValues();
  });

  $(document).off('click.toggleDiscountDiscount').on('click.toggleDiscountDiscount', '.priceBox .discount', function()
  {
    shortkey_toggleDiscount();
  });

  $(document).off('input.calcFooterValDiscount').on('input.calcFooterValDiscount', 'input.discount', function()
  {
    calcFooterValues();
  });

  $(document).off('blur.calcFooterValDiscount').on('blur.calcFooterValDiscount', 'input.discount', function()
  {
    calcFooterValues();
  });

  sendToPcPos();

  // add event to handle dropdown selected value
  $('body').off('dropdown:selected:datalist').on('dropdown:selected:datalist', function(_e, _dropdownData)
  {
    if(_dropdownData && _dropdownData.isProduct)
    {
      // on select from dropdonw DO NOT update record, add new Line
      addFindedProduct(_dropdownData, false);
    }
    if(_dropdownData && _dropdownData.isCustomer)
    {
      updateCustomerDetail(_dropdownData);
    }
  });

  $(document).off('click.quickAddProduct').on('click.quickAddProduct', '[data-quick-addProduct]', function(_e, _selectedProduct)
  {
    var productID = $(this).attr('data-quick-addProduct');
    // add product by id
    addProductByID(productID);
  });

}



function checkProductExist(_key, _value)
{
  // try to find this product with barcode
  switch(_key)
  {
    case 'barcode':
      var productInList = $('table tbody [data-barcode="'+ _value +'"]');
      // if not finded in barcode, search in barcode2
      if(!productInList.length)
      {
        productInList = $('table tbody [data-barcode2="'+ _value +'"]');
      }
      // if finded try to increase number of this product
      if(productInList.length)
      {
        return productInList;
      }
      break;

    case 'id':
      var productInList = $('table tbody [data-id='+ _value +']');
      // if finded try to increase number of this product
      if(productInList.length)
      {
        return productInList;
      }
      break;
  }
  // not finded
  return false;
}


/**
 * add product by ID
 * @param  {[type]} _barcode [description]
 * @return {[type]}          [description]
 */
function addProductByID(_id)
{
  // on add by id with quick add DO NOT update, add New line
  searchForProduct('id', _id, true);
}


function updateProductByID(_id)
{
  // on update, update it
  searchForProduct('id', _id, true);
}


/**
 * check conditions after finding barcode
 * @param  {[type]} _barcode [description]
 * @return {[type]}          [description]
 */
function productBarcodeFinded(_barcode)
{
  var existRecord = checkProductExist('barcode', _barcode);
  // for simple product we find that barcode
  // but for scale we dont find it and try to add new record
  if(existRecord)
  {
    updateRecord_ProductList(existRecord, 'count');
  }
  else
  {
    // if record not exist, DO NOT update, add New line
    searchForProduct('barcode', _barcode, false);
  }
}


/**
 * try to search on server
 * @param  {[type]} _key   [description]
 * @param  {[type]} _value [description]
 * @return {[type]}        [description]
 */
function searchForProduct(_key, _value, _updateLineIfExist)
{
  if(!urlStore())
  {
    return null;
  }
  // if is not barcode and not finde02902749
  // d, search and if find, add or update
  var pSearchURL = urlStore() + "a/products/api?json=true&" + _key + "=" + _value;
  $.get(pSearchURL, function(_productData)
  {
    var myMsg;
    pData = clearJson(_productData);
    if(_productData && _productData.result && _productData.result.message)
    {
      myMsg = _productData.result.message;
    }

    // if have error show error message
    if(myMsg)
    {
      addFindedProduct(null, _updateLineIfExist, myMsg, _value);
    }
    else
    {
      addFindedProduct(pData, _updateLineIfExist);
    }
  });
}





/**
 * final function to add record of product
 * @param {[type]} _product [description]
 */
function addFindedProduct(_product, _updateLineIfExist, _msg, _searchedValue)
{
  if(_product)
  {
    if(_product.id)
    {
      var existRecord = checkProductExist('id', _product.id);

      if(_updateLineIfExist && existRecord)
      {
        if(_product.scale)
        {
          var duplicateMsg = _product.scaleDuplicate;
          if(!duplicateMsg)
          {
            duplicateMsg = 'Duplicate';
          }

          say(
          {
            type: 'warning',
            text: duplicateMsg,
          });
        }
        else
        {
          updateRecord_ProductList(existRecord, 'count', _product.quantity);
        }
      }
      else
      {
        addNewRecord_ProductList(null, _product);
      }
    }
    else
    {
      say(
      {
        type: 'error',
        text: 'Error in products!',
      });
    }
  }
  else
  {
    if(_msg)
    {
      notif('warn', _msg, null, null, {position:'center', displayMode: 1});
    }
    else
    {
      say(
      {
        type: 'error',
        text: 'Product is not detected!',
      });
    }

    beep('ProductNotExist.mp4');
    // show custom message if product not fount
    // if(productNotExistList)
    // productNotExistList.[_searchedValue] = 1;
  }
}


function updateCustomerDetail(_data)
{
  if(_data)
  {
    var customerBalanceEl = $('.customerBalance span');
    var myBalance = _data.balance;
    if(isNaN(myBalance))
    {
      myBalance = 0;
    }
    // set text
    customerBalanceEl.text(fitNumber(myBalance)).attr('data-val', myBalance);
    if(parseFloat(myBalance) < 0)
    {
      $('.customerBalance').addClass('text-yellow-800');
    }
    else
    {
      $('.customerBalance').removeClass('text-yellow-800');
    }
  }
}


/**
 * update record and increase number of exist record
 * @param  {[type]} _row   [description]
 * @param  {[type]} _key   [description]
 * @param  {[type]} _value [description]
 * @return {[type]}        [description]
 */
function updateRecord_ProductList(_row, _key, _value)
{
  switch (_key)
  {
    case 'count':
      var currentCounter = _row.find('.count');
      // console.log(_value);
      if(!_value)
      {
        _value = 1;
      }
      currentCounter.val(parseFloat(currentCounter.val()) + _value);
      break;
  }

  $('#productSearch').val('');
  calcFooterValues();
}


/**
 * add record to table of products
 * @param {[type]} _table   [description]
 * @param {[type]} _product [description]
 * @param {[type]} _append  [description]
 */
function addNewRecord_ProductList(_table, _product, _append)
{
  if(!_table)
  {
    _table = $('.productList');
    if(_table.length < 1)
    {
      return null;
    }
  }

  var factorType = $('body').attr('data-page');

  var trEmpty   = '<tr>';
  trEmpty       += '<td class="cellIndex text-sm"></td>';
  trEmpty       += '<td class="cellTitle text-sm"></td>';
  trEmpty       += '<td class="cellCount"></td>';
  trEmpty       += '<td class="cellPrice"></td>';
  trEmpty       += '<td class="cellDiscount"></td>';
  if($('.headVat[data-vat-percent]').length === 1)
  {
    trEmpty += '<td class="cellVat"></td>';
  }
  trEmpty       += '<td class="cellTotal"></td>';
  trEmpty       += '</tr>';
  var newRecord = $(trEmpty);
  var cuRow     = _table.find('tr').length;
  // set row number
  newRecord.find('td.cellIndex').text(fitNumber(cuRow));
  if(_product)
  {
    var myQuantity = _product.quantity;
    if(!myQuantity)
    {
      myQuantity = 1;
    }
    var htmlPName = _product.title;
    if(_product.stock)
    {
      htmlPName += ' <span class="bg-green-100 rounded p-1 mx-1">' + _product.stock + '</span>';
    }
    // if allow to edit, use iframe to edit link
    if(_product.editlink)
    {
      htmlPName = '<a data-fancybox data-type="iframe" target="_blank" href="' + _product.editlink + '">' + htmlPName + '</a>';
    }
    htmlPName += '<input type="hidden" name="products[]" class="hidden" value="' + _product.id + '">';

    var productPrice    = _product.price;
    var productDiscount = _product.discount;

    var htmlPCount    = '<input class="input count" type="number" name="count[]" autocomplete="off" min="0" max="1000000000" step="any" placeholder="-" value="'+ myQuantity +'" data-befeshar-save>';
    var htmlPPrice    = '<input class="input price" type="number" name="price[]" autocomplete="off" min="0" max="1000000000" value="' + productPrice +'" data-befeshar-save';
    var PriceReadonly = $('.headPrice').attr('data-readonly') !== undefined;
    if(PriceReadonly)
    {
      htmlPPrice += ' disabled';
    }
    htmlPPrice += '>';
    var htmlPDiscount = '<div class="input discountCn">';
    htmlPDiscount    += '<input class="discount" type="number" name="discount[]" autocomplete="off" title="%" min="0" max="1000000000" data-befeshar-save';
    var DiscountReadonly = $('.headDiscount').attr('data-readonly') !== undefined;
    if(DiscountReadonly)
    {
      htmlPDiscount += ' disabled';
    }
    if(productDiscount)
    {
      var removeDiscount = !(_table.attr('data-woDiscount') !== undefined);
      if(removeDiscount)
      {
        htmlPDiscount += ' value="' + productDiscount + '"';
      }
      // set data-discount on all condition
      htmlPDiscount += ' data-discount="' + productDiscount + '"';
    }
    htmlPDiscount    += '>';
    // htmlPDiscount    += '<span class="addon small">0%</span>'+ '</div>';

    // fill with product details
    newRecord.attr('data-id', _product.id);
    newRecord.attr('data-barcode', _product.barcode);
    newRecord.attr('data-barcode2', _product.barcode2);
    newRecord.find('td.cellTitle').html(htmlPName);
    newRecord.find('td.cellCount').html(htmlPCount);

    // newRecord.find('td.cellPrice').text(fitNumber(_product.price)).attr('data-val', _product.price);
    newRecord.find('td.cellPrice').html(htmlPPrice);
    newRecord.find('td.cellDiscount').html(htmlPDiscount);
    newRecord.find('td.cellVat').text(fitNumber(_product.vat)).attr('data-val', _product.vat).attr('data-vat-included', _product.vatIncluded);
    newRecord.find('td.cellTotal').text(fitNumber(_product.finalprice)).attr('data-val', _product.finalprice);
  }
  else
  {
    // empty all inputs
    newRecord.find("input").val('');
    newRecord.find('td.cellPrice').text('');
    newRecord.find('td.cellTotal').text('');
  }

  if(_append)
  {
    // appent to end of table
    newRecord.appendTo('.productList tbody');
  }
  else
  {
    // prepent to start of table
    newRecord.prependTo('.productList tbody');
  }

  calcFooterValues(_table);
}


function qtyFactorTableItems()
{
  NoRecordExist = $('#factorAdd table tbody tr').length;
  return NoRecordExist;
}


function showWithFade(_el)
{
  if(_el.hasClass('hide'))
  {
    _el.removeClass('hide').hide();
  }
  _el.fadeIn();
}


function navigateonFactorAddInputs(_type, _e)
{
  if(!check_factor())
  {
    return false;
  }
  // check focus
  var $focus = $(":focus");

  if(($focus.parents('.productList').length !== 1))
  {
    // outside of table
    return false;
  }

  var currentTd  = $focus.parents('td');
  var currentTr  = $focus.parents('tr');

  // var currentRow = $('#factorAdd .productList tbody').index(currentTr);
  var currentRow = currentTr.index();
  var maxRow     = $('#factorAdd .productList tbody tr').length -1;
  var nextRow    = currentRow;
  var nextField  = 'count';
  // check input group
  if($focus.is('.count'))
  {
    nextField = 'count';
  }
  else if($focus.is('.discount'))
  {
    nextField = 'discount';
  }
  else if($focus.is('.price'))
  {
    nextField = 'price';
  }

  switch(_type)
  {
    case 'up':
      nextRow -= 1;
      _e.preventDefault();
      break;

    case 'down':
      nextRow += 1;
      _e.preventDefault();
      break;

    case 'left':
      if(urlDirRtl())
      {
        nextField = nextCellRight(nextField);
      }
      else
      {
        nextField = nextCellLeft(nextField);
      }
      break;

    case 'right':
      if(urlDirRtl())
      {
        nextField = nextCellLeft(nextField);
      }
      else
      {
        nextField = nextCellRight(nextField);
      }
      break;
  }

  if(nextRow < 0)
  {
    // end
    nextRow = maxRow;
  }
  else if(nextRow > maxRow)
  {
    nextRow = 0;
  }

  var nextRowEl      = $('#factorAdd .productList tbody tr:eq('+ nextRow +')');
  var nextRowInputEl = nextRowEl.find('input.'+ nextField);
  navigationFactorAddSetSelected(nextRowEl);

  setTimeout(function()
  {
    nextRowInputEl.select();
  }, 10);
}


function nextCellRight(_current)
{
  if(_current == 'count')
  {
    return 'price';
  }
  else if(_current == 'price')
  {
    return 'discount';
  }
  else if(_current == 'discount')
  {
    return 'count';
  }
}


function nextCellLeft(_current)
{
  if(_current == 'count')
  {
    return 'discount';
  }
  else if(_current == 'price')
  {
    return 'count';
  }
  else if(_current == 'discount')
  {
    return 'price';
  }
}

function navigationFactorAddSetSelected(_tr, _focus)
{
  if(!_tr || _tr.length === 0)
  {
    _tr = $('#factorAdd .productList tbody tr:first-child');
  }

  // remove other selecred
  $('#factorAdd .productList tbody tr').attr('data-selected', null);
  // add selected to specefic one
  _tr.attr('data-selected', '');
  if(_focus === true)
  {
    _tr.find('.input.count').select();
  }
}


function shortkey_toggleDiscount(_status)
{
  var priceDiscountEl = $('.priceBox .discount');
  var removeDiscount = !(priceDiscountEl.attr('data-woDiscount') !== undefined);
  if(removeDiscount)
  {
    priceDiscountEl.attr('data-woDiscount', '');
    $('.productList th.headDiscount').addClass('negative').attr('data-woDiscount', '');
  }
  else
  {
    priceDiscountEl.attr('data-woDiscount', null);
    $('.productList th.headDiscount').removeClass('negative').attr('data-woDiscount', null);
  }

  $('.productList input.discount').each(function()
  {
    if(removeDiscount)
    {
      var currentVal = parseInt($(this).val());
      if(!$.isNumeric(currentVal))
      {
        currentVal = null;
      }
      $(this).attr('data-discount', currentVal);
      $(this).val(0);
    }
    else
    {
      var savedDiscount = $(this).attr('data-discount');
      if($.isNumeric(savedDiscount))
      {
        $(this).val(savedDiscount);
      }
    }
  });
  // recalc values
  calcFooterValues();
}



function shortkey_print(_el)
{
  if($("#sale_clicked_btn").length)
  {
    $("#sale_clicked_btn").attr('value', 'save_print');
    $("#sale_clicked_btn").parents('form').submit();
  }
  logy('printing...');
}


function prevFactor(_type, _all)
{
  if(_type === undefined)
  {
    _type = 'sale';
  }
  if(!urlStore())
  {
    return null;
  }
  var lastFactorUrl = urlStore() + 'a/' + _type + '/prev';
  // add id if exist
  if(check_factor() && urlParam('id'))
  {
    lastFactorUrl += '/'+ urlParam('id');
  }
  // add lang if exist
  if($('html').attr('lang') !== undefined)
  {
    lastFactorUrl = $('html').attr('lang')+ lastFactorUrl;
  }
  if(_all)
  {
    lastFactorUrl += '?in=all';
  }
  Navigate({ url: lastFactorUrl });
}



function sendToPcPos()
{
  $(document).off('click.pcPos').on('click.pcPos', '.pcPos', function()
  {
    var myLink    = $(this).attr('data-link');
    var lastPrice = $('.priceBox .final span').attr('data-val');
    lastPrice += "0";

    if(lastPrice > 0)
    {
      // replace last price
      myLink = myLink.replace("$", lastPrice);
      console.log('send price to pcpos ' + lastPrice);
        $.ajax(
        {
            type: "GET",
            url: myLink,
            dataType: 'jsonp',
            success: function (_data)
            {
              notif('info', 'مبلغ ' + lastPrice + ' به پی‌سی‌پوز ارسال شد.');
              console.log('success calling pcpos');
              console.log(_data);
            },
            error: function (_e)
            {
              notif('warning', 'اتصال اولیه به پی‌سی‌پوز '+ lastPrice);
              console.log('error on pcpos');
              console.log(JSON.stringify(_e));
            }
        });
    }
    else
    {
      notif('error', 'مبلغ برای ارسال به پی‌سی‌پوز معتبر نیست');
      console.log('Price is not valid to send to pcpos ' + lastPrice);
    }
  });
}




