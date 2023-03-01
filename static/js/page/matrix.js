function pageScript()
{
  $(document).off("keydown.test1").on("keydown.test1", function(e) {
    console.log(e.which);
  });

  $(document).one("keypress", function(e) {
    console.log('press only one character');
  });

  const c = document.getElementById('matrix');
  const r = document.getElementById('root');
  const s = window.screen;
  const w = c.width = s.width;
  const h = c.height = s.height;
  const ctx = c.getContext('2d');
  const cols = Math.floor(w / 20) + 1;
  const ypos = Array(cols).fill(0);

  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, w, h);

  function matrix () {
    if(!urlVerify('bug', 'site'))
    {
      return;
    }
    ctx.fillStyle = '#1111';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#479';//'#5ac';
    ctx.font = '15pt monospace';
    ypos.map((y, ind) => {
      const t = String.fromCharCode(Math.random() * 128);
      const x = ind * 20;
      ctx.fillText(t, x, y);
      if (y > 100 + Math.random() * 1e4) ypos[ind] = 0;
      else ypos[ind] = y + 20;
    });
  }

  if (window.screen.width >= 300)
  {
    window.setInterval(matrix, 50);
  }
}

