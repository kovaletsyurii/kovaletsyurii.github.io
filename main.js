$(function(){
function getAnchors(){
	let all = $("section:not('.istart')");
	let a = [];
	$.each(all ,function(){
		a.push({
			class: $(this).attr('class'), 
			top: Math.floor( $(this).offset().top )
		});
	});
	return a;
}
function lightAnchor(data){
	for(let p = 0; p<data.length-1; p++){
		//console.log(`class: ${data[p].class}, top: ${data[p].top}`);
		//console.log( $(window).scrollTop() );
		if( $(window).scrollTop() >=  data[p].top && $(window).scrollTop() <=  data[parseInt(p)+1].top ){
			//console.log('detect ' + data[p].class);
			$('#indicators li').css('background-color','#B3B3B3').css('border-color','#B3B3B3');
			$('.i'+data[p].class).css('background-color','#fefefe').css('border-color','#fefefe');
		}
	}
	if($('.contacts').offset().top-1 < $(window).scrollTop() ){
		//console.log('detect .contacts');
		$('#indicators li').css('background-color','#B3B3B3').css('border-color','#B3B3B3');
		$('.icontacts').css('background-color','#fefefe').css('border-color','#fefefe');
	}
}

//icons
$('.icons img').hover(function(){
	$(this).attr('src','image/'+$(this).attr('alt')+'blue.png');
}, function(){
	$(this).attr('src','image/'+$(this).attr('alt')+'.png');
});

$('#indicators li').click(function(event){
	event.preventDefault();
	let top;
	( $(this).attr('href') == 'start' ) ? top = 0 : top =  Math.floor( $( '.' + $(this).attr('href') ).offset().top );
	$('body, html').animate({scrollTop:top+1},500);
});

$('.oneProject:not(.nActive)').click(function(){
	let href = $(this).attr('data-href');
	window.open(href, '_blank').focus();
});
$(window).resize(function(){
	aData = getAnchors();
	lightAnchor(aData);
});


let aData = getAnchors();
$(window).scroll(function(){
	lightAnchor(aData);
});
});