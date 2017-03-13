$(document).ready(function() {

var Editor = {
	init: function () {
	    Editor.i = 0;
	    $('ul').each( function() {
	    	//console.log( $(this) );
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
		console.log("you clicked on a");
		console.log(parent.prop("tagName").toLowerCase());
		var parentClass = parent.attr('class');
		if (parentClass === "section") {
	    	var rowContent = '<li class="add add-series" id="item-'+i+'"><header class="add-series-inner" data-childOf="item-'+i+'">+ New Series</header></li>';
		}
		else if (parentClass === "series") {
	    	var rowContent = '<li class="add add-item" id="item-'+i+'">+ New Item</li>';
		}
		else if (parent.prop("tagName").toLowerCase() === "body") {
			var rowContent = '<ul class="section add add-section" id="item-'+i+'"><header class="add-section-inner" data-childOf="item-'+i+'">+ New Section</header></ul>'
		}
		//console.log(rowContent);
		parent.append(rowContent);
	},
	showForm: function(event) {
		var i = Editor.nextI();
		$('form').remove();
		$('.add').show();
		var addLink = $(event.target);
		if ( $(addLink).prop("tagName").toLowerCase() === "header") {
			addLink = $(addLink).parent();
		}
		if ( $(addLink).hasClass('add-section')) { 
			var entryType = "section";
		} else if ( $(addLink).hasClass('add-series')) { 
			var entryType = "series";
		} else if ( $(addLink).hasClass('add-item')) { 
			var entryType = "item";
		}
		addLink.hide();
		//series = addLink.closest('.series');
		section = addLink.closest('.section');
		data = { "link": addLink, "section": section }
		var textType = addLink.text().substr(1); //drop the plus sign
		//var form = $('<form></form>').append('<input id="new_item" type="text" placeholder="Enter'+textType+'"/><input type="hidden" id="entryType" value="'+textType+'"><input type="submit" />');		
		var form = $('<form id="item-'+i+'"></form>').append('<input id="new_item" type="text" placeholder="Enter '+entryType+'" /><input type="hidden" id="entryType" value="'+entryType+'"><input type="submit" />');
		//form = $(form).wrap('<li></li>');
		addLink.before(form);
		$('#new_item').focus();
		$('form').on('submit', data, function (event) { 
				Editor.submitForm(event, data) 
				$('.add').show();
				}
		);
	},
	submitForm: function(event, data) {
		event.preventDefault();
		var i = Editor.nextI();
		var newItem = $('#new_item');
		var newItemText = newItem.val();
		var section = data.section; 
		//var series = data.series;
		form = $(event.target);
		if ( $('#entryType').val() === "series" ) {
    		console.log('doing: parent is section');
    		$(form).before('<li id="item-'+i+'" class="added"><header data-childOf="'+i+'">'+newItemText+'</header></li>');
    		Editor.addNewLink($('#item-'+i+" header"));
    		//TO DO: trigger creation of new item-level add-link
    	}
    	else if ($('#entryType').val() === "section") {
    		$(form).before('<ul class="section" id="item-'+i+'"><header>'+newItemText+'</header></ul>');
    		$('.section').last().trigger('addNewLink');
    		Editor.addNewLink($('#item-'+i));
    		//TO DO: trigger creation of new series-level add-link
    	}
    	else { 
	    	$(form).before('<li class="undone" id="item-'+i+'">'+newItemText+'</li>');
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

});
