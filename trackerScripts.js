$(document).ready(function() {

var Editor = {
	init: function () {
	    $('ul').each( function() {
	    	console.log( $(this) );
	    	Editor.addNewLink( $(this) );
		});
		Editor.addNewLink( $('body') );
	},
	addNewLink: function(parent) {
		console.log(parent.prop("tagName").toLowerCase());
		var parentClass = parent.attr('class');
		if (parentClass === "section") {
	    	var rowContent = '<li class="add"><header>+ New Series</header></li>';
		}
		else if (parentClass === "series") {
	    	var rowContent = '<li class="add">+ New Item</li>';
		}
		else if (parent.prop("tagName").toLowerCase() === "body") {
			var rowContent = '<ul class="section add"><header>+ New Section</header></ul>'
		}
		console.log(rowContent);
		parent.append(rowContent);
	},
	showForm: function(event) {
		addLink = $(event.target);
		addLink.hide();
		data = { "link": addLink }
		var textType = addLink.text().substr(1); //drop the plus sign
		var form = $('<form></form>').append('<input id="new_item" type="text" placeholder="Enter'+textType+'"/><input type="submit" />');		
		//form = $(form).wrap('<li></li>');
		addLink.before(form);
		$('#new_item').focus();
		$('form').on('submit', data, function (event) { Editor.submitForm(event, data) });
	},
	submitForm: function(event, data) {
		event.preventDefault();
		var newItem = $('#new_item').val();
		form = $(event.target);

	    	if (data.link.parent().hasClass('section')) {
	    		$(form).before('<li><header>'+newItem+'</header></li>');
	    		//TO DO: trigger creation of new item-level add-link
	    	}
	    	else if (data.link.hasClass('section')) {
	    		$(form).before('<ul class="section"><header>'+newItem+'</header></ul>');
	    		//TO DO: trigger creation of new series-level add-link
	    	}
	    	else { 
		    	$(form).before('<li class="undone">'+newItem+'</li>');
			}
			$(form).remove();
			data.link.parent().find('.add').show();	

	},
	displayNew: function() {
	
	}
}
Editor.init();

$('.add').on('click', Editor.showForm);


/*

// add functionality to action divs
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
	    		//TO DO: trigger creation of new item-level add-link
	    	}
	    	else if (data.link.hasClass('section')) {
	    		$(this).before('<ul class="section"><header>'+newItem+'</header></ul>');
	    		//TO DO: trigger creation of new series-level add-link
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
    */
});
