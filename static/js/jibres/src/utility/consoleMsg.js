// add some special message for console
window.jibres = 'Yes Sir ❤️';


function showWarnHack()
{
	if(!urlDebugger())
	{
		console.warn("%cconsole@Jibres:~# %cIf someone told you to copy-paste something here to enable a Jibres feature or hack someone's account, it is a scam." + " If (Developer) { 🙃 }", 'color: #000;font-weight:900;', 'color:000;');
	}
}

function Jibres(_arg)
{
	if(_arg)
	{
		console.log(_arg);
	}

  return window.jibres;
}

function echo(_arg)
{
	console.log(_arg);
}
