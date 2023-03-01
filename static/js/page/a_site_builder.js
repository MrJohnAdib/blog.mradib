
function pageScript()
{
  $('.browserFrame .resizePreview [data-mode]').off('click.resizePreview').on("click.resizePreview", function(event)
  {
    resizePreview($(this).attr('data-mode'));
  });

  function resizePreview(_to)
  {
    if(_to === 'desktop')
    {
      $('.browserFrame').attr('data-size', 'desktop');
    }
    else if(_to === 'mobile')
    {
      $('.browserFrame').attr('data-size', 'mobile');
    }
  }
}

