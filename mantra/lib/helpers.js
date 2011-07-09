/**
* Reads the value of a query parameter from the URL of the web page. 
* @param {String} name The name of the URL parameter.
* @returns The value of the URL parameter, as a string.
* @example
* // If the URL is http://example.com/game.html?lives=3
* player.lives = help.geturlparameter("lives");
* player.lives; // => 3
*/	
geturlparameter = function(name) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
	return "";
  else
	return results[1];
}