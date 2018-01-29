$(document).ready(function(){
	var selectedElement;
	var elementsArray = [];
	var textArray = [];
	var _messageTextId;
	var _x, _y;
	var _canMove = false;
	const svgConfig={
		width: $('#draw-place').width(),
		height: $('#draw-place').height(),
		message: {
			width: 150,
			height: 40,
			round: 20
		}
	}
	var draw = SVG('draw-place').size(svgConfig.width, svgConfig.height);

	$('.element').click(function(){
		if(selectedElement){
			$(`button[data-type=${selectedElement}]`).removeClass('selected');
		}
		selectedElement = $(this).attr('data-type');
		$(this).addClass('selected');

	});

	$('#add-element').click(function(){
		if(selectedElement){
			$(`button[data-type=${selectedElement}]`).removeClass('selected');
			switch(selectedElement){
				case 'multiple': 
					drawMultiple();
				break;
				case 'message': 
					drawMessage();
				break;
				case 'page': 
					drawPage();
				break;
				case 'dialog': 
					drawDialog();
				break;
			}
			selectedElement = undefined;

		}
	});

	function drawMultiple(){
		console.log('element');

	}

	function drawMessage(){
		let id = elementsArray.length-1;
		elementsArray[id] = draw.rect(svgConfig.message.width, svgConfig.message.height)
			.radius(svgConfig.message.round, svgConfig.message.round)
			.attr({fill: '#0080FF'})
			.move(svgConfig.width/2-svgConfig.message.width/2, svgConfig.height/2-svgConfig.message.height/2)
			.remember({id:id, move : false})
			.mousedown(function(e){
				_canMove = true;
			})
			.mousemove(function(e){
				if( _canMove ){
	  				this.move(_x-this.width()/2,_y-this.height()/2);
	  				textArray[id].move(this.x()+this.width()/2, this.y()+7);
				}
			})
			.mouseout(function(){
				console.log('id:',id);
				textArray[id].style({'display':'inline-block'});
			})
			.mouseup(function(){
				console.log('id:',id);
				textArray[id].style({'display':'inline-block'});
			});

		let element = elementsArray[id];
			textArray[id] = draw.text('message').
			move(element.x()+element.width()/2, element.y()+7).
			attr({'text-anchor':'middle', 'alignment-baseline':'middle'})
			.fill('#fff')
			.style({'cursor': 'pointer', 'user-select' : 'none'})
			.click(function(){
				$('#message-val').val(this.text());
				$('.input-message').css('display','inline-block');
				_messageTextId = id;
			});

	}

	function drawPage(){
		console.log('element');

	}

	function drawDialog(){
		console.log('element');

	}

	$('#message-val').keyup(function(){
		if( _messageTextId ){
			textArray[_messageTextId].text($(this).val());
		}

	});

	$('#message-accept').click(function(){
		$('.input-message').css('display','none');
		_messageTextId = undefined;
		$('#message-val').val('');
	});

	$('#draw-place').mousemove(function(e){
		_x = ( e.offsetX==undefined ) ? e.layerX : e.offsetX;
	  	_y = ( e.offsetY==undefined ) ? e.layerY : e.offsetY;
	});

	$('#draw-place').mouseout(function(){
		_canMove = false;
	});
	$('#draw-place').mouseup(function(){
		_canMove = false;
	});



});
