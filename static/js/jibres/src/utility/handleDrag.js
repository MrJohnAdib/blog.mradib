

function handleDrag()
{
  // disallow drag
  [ 'drag', 'dragstart'].forEach( function(_event)
  {
    $(document).off(_event).on(_event, function(_e)
    {
      if(_e.target && $(_e.target).parents('[data-sortable]'))
      {
        // do nothing
      }
      else
      {
        // preventing the unwanted behaviours
        _e.preventDefault();
        _e.stopPropagation();
      }
    });
  });

  // disallow dragover
  [ 'dragover', 'dragenter' ].forEach( function( _event )
  {
    $(document).off(_event).on(_event, function(_e)
    {
      _e.originalEvent.dataTransfer.effectAllowed = 'none';
      _e.originalEvent.dataTransfer.dropEffect = 'none';

      // preventing the unwanted behaviours
      _e.preventDefault();
      _e.stopPropagation();
    });
  });
}

