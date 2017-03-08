$(document).ready(function() {
 /* create action divs */
    $('ul').each( function() {
		var parentClass = $(this).attr("class");
		if (parentClass === "section") {
	    	var rowContent = '<li class="add"><header>+ New Series</header></li>';
		}
		else if (parentClass === "series") {
	    	var rowContent = '<li class="add">+ New Item</li>';
		}
		$(this).append(rowContent);
   	});
    $('body').append('<ul class="section add"><header>+ New Section</header></ul>');

/* add functionality to action divs */
    $('.add').click(function(e) {
		this.addLink = $(this);
		this.addLink.hide();
		data = {"link": this.addLink }
		var textType = this.addLink.text().substr(1); //drop the plus sign
		var form = $('<form></form>').append('<input id="new_item" type="text" placeholder="Enter'+textType+'"/><input type="submit" />');
		form.on('submit', data, function(e) {
	    	e.preventDefault();
	    	$(this).hide();
	    	var newItem = form.find('#new_item').val();

	    	if (data.link.parent().hasClass('section')) {
	    		$(this).before('<li><header>'+newItem+'</header></li>');
	    	}
	    	else if (data.link.hasClass('section')) {
	    		$(this).before('<ul class="section"><header>'+newItem+'</header></ul>');
	    	}
	    	else { 
		    	$(this).before('<li class="undone">'+newItem+'</li>');
			}
	    	//if parent = section, needs to be wrapped in a header
	    	console.log(data.link.parent().attr('class'));
	   		//if 'section add', needs to be a top-level li
	    	console.log(data.link.attr('class'));
	    	data.link.show();
	    	form.remove();
		});
		form = form.wrap('<li></li>');
		this.addLink.before(form);
		$('#new_item').focus();
    });
});
