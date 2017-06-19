'use strict';
//global var
let slider = {
		current: 2,
		currentId: '#i'+1,
		max: 5,
		min: 1,
		x: 405,
		prevX: -850,
		nextX: 2305,
		leftDisable: false,
		rightDisable: false
	}
let mobileSlider = {
	count: 4,
	current: 0
}
let sliderText = [
	{
		t1 : 'A Path1',
		t2 : 'to Awakening',
		t3 : 'You guide',
		t4 : 'for leveling up fast!',
	},
	{
		t1 : 'A Path',
		t2 : 'to Awakening',
		t3 : 'You guide',
		t4 : 'for leveling up fast!',
	},
	{
		t1 : 'A Path3',
		t2 : 'to Awakening',
		t3 : 'You guide',
		t4 : 'for leveling up fast!',
	},
	{
		t1 : 'A Path4',
		t2 : 'to Awakening',
		t3 : 'You guide',
		t4 : 'for leveling up fast!',
	},
	{
		t1 : 'A Path5',
		t2 : 'to Awakening',
		t3 : 'You guide',
		t4 : 'for leveling up fast!',
	}
];
$(function(){
	//swipe
	$( "div.mobileSlider" ).on( "swipeleft", function(){
		mobileSlider.current++;
		if(mobileSlider.current > mobileSlider.count){
			mobileSlider.current = mobileSlider.count;
			let m_l = parseFloat( $('#j1').css('margin-left') );
			$('#j1').animate({'margin-left': m_l-20},200,function(){
				$('#j1').animate( { 'margin-left':m_l },200 );
			});
		}else{
			let w = parseFloat( $('#j1').width() );
			$('#j1').animate({'margin-left':-(w*mobileSlider.current)},1000);
		}
		mobileSliderCircleColor();
	} );

	$( "div.mobileSlider" ).on( "swiperight", function(){
		mobileSlider.current--;
		if(mobileSlider.current < 0){
			mobileSlider.current = 0;
			let m_l = parseFloat( $('#j1').css('margin-left') );
			$('#j1').animate({'margin-left': m_l+20},200,function(){
				$('#j1').animate( { 'margin-left':m_l },200 );
			});
		}else{
			let w = parseFloat( $('#j1').width() );
			$('#j1').animate({'margin-left':-(w*mobileSlider.current)},1000);
		}
		mobileSliderCircleColor();
	} );
	$( '#donation' ).hover( function(){
		SVG.select( '#blue_grad' ).animate(300, '>', 0).attr('stop-color', '#0bb5a7' );
	},function(){
		SVG.select( '#blue_grad' ).animate(300, '>', 0).attr( 'stop-color', '#05393d' );
	});
	$( '.indicators circle' ).click( function(){
		let allCircle = SVG.select( '.indicators circle' );
		let thisCircle = SVG.select('.'+$(this).attr('class'));

		allCircle.animate(300, '>', 0).attr({ fill: '#6d6d6d', r: '3' });
		thisCircle.animate(300, '>', 0).attr({ fill: '#23a8b3', r: '4' });

		slide('#'+$(this).attr('class'));
	});
	
	let rightArrow = SVG.select('.right .strokeArrow');
	let leftArrow = SVG.select('.left .strokeArrow');


	$( '.right' ).click(function(){
		slide('#i'+(slider.current+1));
		let allCircle = SVG.select( '.indicators circle' );
		let thisCircle = SVG.select('.i'+(slider.current));
		allCircle.animate(300, '>', 0).attr({ fill: '#6d6d6d', r: '3' });
		thisCircle.animate(300, '>', 0).attr({ fill: '#23a8b3', r: '4' });
		leftArrow.animate(200, '>', 0).attr({ opacity: '1' });
		if(slider.current==5){
			rightArrow.animate(200, '>', 0).attr({ opacity: '0.3' });
		}
	});
	$( '.left' ).click(function(){
		slide('#i'+(slider.current-1));
		let allCircle = SVG.select( '.indicators circle' );
		let thisCircle = SVG.select('.i'+(slider.current));
		allCircle.animate(300, '>', 0).attr({ fill: '#6d6d6d', r: '3' });
		thisCircle.animate(300, '>', 0).attr({ fill: '#23a8b3', r: '4' });
		rightArrow.animate(200, '>', 0).attr({ opacity: '1' });
		if(slider.current==1){
			leftArrow.animate(200, '>', 0).attr({ opacity: '0.3' });
		}
	});

	$('.mainMenu, .signMenu').click(function(){
		mobileMenuToggle(this);
	});

});

//all functions
function slide(element){
	let img = SVG.select( element );
	let num = parseInt( $( element ).attr( 'data-num' ) );
	let description = SVG.select('#description');
	if(!isNaN(num)){
		//console.log(sliderText[num-1]);
		img.animate(500, '>', 0).attr({ x: slider.x, opacity: 1});
		slider.current = num;
		slider.currentId = '#i'+num;
		for( let i = slider.min; i<=slider.max; i++){
			if(i<num){
				let prev = SVG.select( '#i'+i );
				prev.animate(600, '>', 0).attr({ x: slider.prevX, opacity: 0});
			}
			if(i>num){
				let next = SVG.select( '#i'+i );
				next.animate(600, '>', 0).attr({ x: slider.nextX, opacity: 0});
			}
		}
		description.animate(300, '>', 0).attr({opacity: 0}).after(function(){
			$('#description').html(`<text class="big" x="40">${sliderText[num-1].t1}</text><text class="big" y="25">${sliderText[num-1].t2}</text><rect x="65" y="44" width="30" height="1.5" fill="#ffffff"/><text class="little" y="70" x="46">${sliderText[num-1].t3}</text><text class="little" y="86" x="15">${sliderText[num-1].t4}</text>`);
		}).animate(300, '>', 0).attr({opacity: 1});
	}
}

function mobileSliderCircleColor(){
	let allCircle = SVG.select( '.mobileIndicators circle' );
	let thisCircle = SVG.select('.j'+(mobileSlider.current+1));
	allCircle.animate(300, '>', 0).attr({ fill: '#6d6d6d', r: '3' });
	thisCircle.animate(300, '>', 0).attr({ fill: '#23a8b3', r: '4' });
}

//mobileMenu show/hide
function mobileMenuToggle(element){
	let line1 = SVG.select('#hamburger .line1');
	let line2 = SVG.select('#hamburger .line2');
	let line3 = SVG.select('#hamburger .line3');
	let ul = $(element).find('ul');
	if( $(ul).css('display') == 'none' ){
		$(ul).css('display', 'block');
		line1.animate(300, '>', 0).rotate(-45, 53, 33);
		line2.animate(300, '>', 0).attr({opacity: '0'});
		line3.animate(300, '>', 0).rotate(45, 35.5, 34);
	}else{
		$(ul).css('display', 'none');
			line1.animate(300, '>', 0).rotate(0, 53, 33);
			line2.animate(300, '>', 0).attr({opacity: '1'});
			line3.animate(300, '>', 0).rotate(0, 35.5, 34);
	}
}