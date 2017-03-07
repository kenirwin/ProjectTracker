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
    });
    $('body').append('<ul class="section add"><header>+ New Section</header></ul>');
});
