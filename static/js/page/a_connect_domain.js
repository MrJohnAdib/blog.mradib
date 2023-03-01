function pageScript()
{
	if($("#worktype").text() && $("#workondomain").text())
	{
		$.ajax(
		{
		 url : $("#urlthat").text(),
		 type : 'post',
		 data : {"connectdomain":"connectdomain", "type": $("#worktype").text(), "domain": $("#workondomain").text()},
		 dataType: 'json',
		 success : function()
		 {
		  Navigate({ url: $("#urlpwd").text() });
		 },
		 done : function()
		 {
		  Navigate({ url: $("#urlpwd").text() });
		 },
		 fail : function()
		 {
		  Navigate({ url: $("#urlpwd").text() });
		 },
		 statusCode: {
		  501: function() {
		    Navigate({ url: $("#urlpwd").text() });
		  }
		 }
		});
	}
}


