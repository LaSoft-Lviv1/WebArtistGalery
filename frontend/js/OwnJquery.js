$ = function(el){
  	var $el = document.getElementsByClassName(el);
 	return {
    	html: function (content) {
        	$el.innerHTML = content;
		}
	}
}