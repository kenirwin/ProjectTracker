$(document).ready(function() {
    $('ul').each( function() {
	var parentClass = $(this).attr("class");
	if (parentClass === "section") {
	    var rowContent = '<li class="add"><header>+ New Series</header></li>';
	}
	else if (parentClass === "series") {
	    var rowContent = '<li class="add">+ New Item</li>';
	}
	$(this).append(rowContent);
    })
    $('body').append('<ul class="section add"><header>+ New Section</header></ul>');

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
	    $(this).before('<li class="undone">'+newItem+'</li>');
	    data.link.show();
	});
	form = form.wrap('<li></li>');
	this.addLink.before(form);
	
	
	
    });
    

});
