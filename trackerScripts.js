$(document).ready(function() {

var Editor = {
	init: function () {
	    Editor.i = 0;
	    $('ul').each( function() {
	    	console.log( $(this) );
	    	Editor.addNewLink( $(this) );
		});
		Editor.addNewLink( $('body') );
	},
    nextI: function () {
    	Editor.i++;
    	return Editor.i;
    },
	addNewLink: function(parent) {
		var i = Editor.nextI();
		console.log(parent.prop("tagName").toLowerCase());
		var parentClass = parent.attr('class');
		if (parentClass === "section") {
	    	var rowContent = '<li class="add add-series" id="item-'+i+'"><header>+ New Series</header></li>';
		}
		else if (parentClass === "series") {
	    	var rowContent = '<li class="add add-item" id="item-'+i+'">+ New Item</li>';
		}
		else if (parent.prop("tagName").toLowerCase() === "body") {
			var rowContent = '<ul class="section add add-section" id="item-'+i+'"><header>+ New Section</header></ul>'
		}
		console.log(rowContent);
		parent.append(rowContent);
	},
	showForm: function(event) {
		var i = Editor.nextI();
		$('form').remove();
		$('.add').show();
		addLink = $(event.target);
		console.log( $(addLink) );
		addLink.hide();
		//series = addLink.closest('.series');
		section = addLink.closest('.section');
		data = { "link": addLink, "section": section }
		var textType = addLink.text().substr(1); //drop the plus sign
		var form = $('<form></form>').append('<input id="new_item" type="text" placeholder="Enter'+textType+'"/><input type="hidden" id="entryType" value="'+textType+'"><input type="submit" />');		
		//form = $(form).wrap('<li></li>');
		addLink.before(form);
		$('#new_item').focus();
		$('form').on('submit', data, function (event) { Editor.submitForm(event, data) });
	},
	submitForm: function(event, data) {
		event.preventDefault();
		var i = Editor.nextI();
		var newItem = $('#new_item');
		var newItemText = newItem.val();
		var section = data.section; 
		//var series = data.series;
		form = $(event.target);
		if ( $('#entryType').val() === " New Series" ) {
    		console.log('doing: parent is section');
    		section.append('<li><header>'+newItemText+'</header></li>');
    		//TO DO: trigger creation of new item-level add-link
    	}
    	else if ($('#entryType').val() === " New Section") {
    		$('body').append('<ul class="section"><header>'+newItemText+'</header></ul>');
    		$('.section').last().trigger('addNewLink');
    		//TO DO: trigger creation of new series-level add-link
    	}
    	else { 
	    	$(form).before('<li class="undone">'+newItemText+'</li>');
		}
		$(form).remove();
//doesnt work		data.link.parent().find('.add').show();	

	},
	displayNew: function() {
	
	}
}
Editor.init();
$('body').on('addLink', Editor.addNewLink);
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
