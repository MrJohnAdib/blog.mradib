function pageScript()
{
	$("#factor-auto-calculate-vat").click(function(){

		var total         = $("#input-total").val();
		var totaldiscount = $("#input-totaldiscount").val();

		total         = parseInt(total.replace(/[^\d.]+/g, ''));
		totaldiscount = parseInt(totaldiscount.replace(/[^\d.]+/g, ''));


		if(total === NaN)
		{
			total = 0
		}
		if(totaldiscount === NaN)
		{
			totaldiscount = 0;
		}

		vat = (total - totaldiscount) * 0.09;
		vat = Math.round(vat);
		vat = parseInt(vat);

		$("#input-totalvat").val(vat);

	});
}