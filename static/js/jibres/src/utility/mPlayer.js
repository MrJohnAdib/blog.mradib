
function mPlayer()
{
	$('[data-magicbox] video').off('click.magicBoxVideo').on('click.magicBoxVideo', function()
	{
		var videoMagicBox = $(this).parents('[data-magicbox]');
		var videoFrame = $(this).parents('.videoFrame');

		if(this.paused)
		{
			this.play()
			videoMagicBox.attr('data-playing', 'play');
			if(videoFrame && videoFrame.attr('data-controls') !== undefined)
			{
				// allow to show control, show it
				$(this).attr('controls', true);
			}
		}
		else
		{
			this.pause()
			videoMagicBox.attr('data-playing', 'pause');
		}
	});

	// check duration of video and show inside magicBox
	$('[data-magicbox] video').off('loadedmetadata.magicBoxVideo').on('loadedmetadata.magicBoxVideo', function(index)
	{
		var myDuration = Math.round(this.duration);
		var videoMagicBox = $(this).parents('[data-magicbox]');

		videoMagicBox.find('[data-magic-caption] [data-duration]').attr('data-duration', myDuration).html(humanMin(myDuration));
	});
}