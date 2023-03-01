setInterval(function()
  {
    $.ajax(
    {
     url : window.location.href,
     type : 'get',
     dataType: 'json',
     statusCode: {
      200: function() {
        location.reload();
      }
     }
   });
  }, 5000);