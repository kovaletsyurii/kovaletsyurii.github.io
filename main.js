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
function displayStatus(id, newText, reset){
	let oldText = $(id).text();
	$(id).fadeOut(300).text(newText).fadeIn(300).delay(2500).fadeOut(300).text(oldText).fadeIn(300);
	if(reset){
		$('.from input, form textarea').val('');
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




//send email
$('#send').click( function(){
	let from = $('input[name=email]').val();
	//let to = 'kovaletsyuriy@ukr.net';
	let name = $('input[name=name]').val();
	let text = $('textarea[name=problemDescribe]').val();

	let opt = {
		type:'GET',
        url:'https://myownmailtransfer.000webhostapp.com/index.php',
        data:`name=${name}&from=${from}&text=${text}`,
        success: function(body){
        	if( body == 200 ){
        		displayStatus('#formUsing', 'Thank You for feedback', true);
        	}else{
        		displayStatus('#formUsing', 'An error has occurred', false);
        	}
        }
	}

	$.ajax(opt);

});
});