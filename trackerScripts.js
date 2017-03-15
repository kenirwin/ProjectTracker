$(document).ready(function() {

var Editor = {
	init: function () {
	    Editor.i = 0;
	    $('ul').each( function() {
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
		parent.append(rowContent);
		$('#item-'+i).on('click', Editor.showForm);
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
		section = addLink.closest('.section');
		data = { "link": addLink, "section": section }
		var textType = addLink.text().substr(1); //drop the plus sign	
		var form = $('<form id="item-'+i+'"></form>').append('<input id="new_item" type="text" placeholder="Enter '+entryType+'" /><input type="hidden" id="entryType" value="'+entryType+'"><input type="submit" />');
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
		var section = data.section; //never used?
		form = $(event.target);
		if ( $('#entryType').val() === "series" ) {
    		$(form).before('<li class="series-wrapper" id="item-'+i+'" class="added"><header data-childOf="'+i+'">'+newItemText+
    	'<div class="w3-progress-container w3-round w3-red">'+
	    '<div class="w3-progressbar w3-round w3-green" style="width:0%">'+
	    ' <div class="w3-left w3-text-white">0%</div>'+
	    '</div>'+
	    '</div></header><ul class="series" id="ul-for-'+i+'"></li>');
    		Editor.addNewLink($('#ul-for-'+i));
    	}
    	else if ($('#entryType').val() === "section") {
    		$(form).before('<ul class="section" id="item-'+i+'"><header>'+newItemText+'</header></ul>');
    		$('.section').last().trigger('addNewLink');
    		Editor.addNewLink($('#item-'+i));
    	}
    	else { 
	    	$(form).before('<li class="undone" id="item-'+i+'">'+newItemText+'</li>');
	    	var seriesLi = $(form).closest('.series').parent() ;
	    	$('.done, .undone').on('click', Editor.toggle);
			Editor.calcDone( seriesLi );
		}
		$(form).remove();
	},
	toggle: function(event) {
		if( $(this).hasClass('done')) {
			$(this).removeClass('done').addClass('undone');
		} else if ($(this).hasClass('undone')) {
			$(this).removeClass('undone').addClass('done');
		}
		var seriesLi = $(this).closest('.series').parent() ;
		Editor.calcDone( seriesLi );
	},
	calcDone: function (seriesLi) {
		console.log( $(seriesLi) );
		var done = seriesLi.find('.done').length;
		var undone = seriesLi.find('.undone').length;
		var outof = done + undone;
		var percentdone = Math.round(done / outof * 100) + '%';
		$(seriesLi).find('.series').data('done',done).
			data('outof',outof).
			data('percentdone',percentdone);
		$(seriesLi).find('.w3-progressbar').css('width',percentdone).
			find('.w3-left').text(percentdone);
	}
}
Editor.init();
$('body').on('addLink', Editor.addNewLink);
$('.add').on('click', Editor.showForm);
$('.done, .undone').on('click', Editor.toggle);
});
