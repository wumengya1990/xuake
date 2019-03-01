//兼容IE的event  
function eventDo(){
	if(window.event){
		window.event.cancelBubble=true;
	}else if(window.event && typeof(window.event)!="undefined"){
		window.event.stopPropagation();
	}
}