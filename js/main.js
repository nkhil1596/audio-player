var audio;

//hide the pause button
$('#pause').hide();

//Intialise Audio
initAudio($('#playlist li:first-Child'));


//Intializer function
function initAudio(element){
	var song = element.attr('song');
	var title = element.text();
	var cover = element.attr('cover');
	var artist = element.attr('artist');
	
	
	//create Audio objects
	audio = new Audio('media/' + song)
	
	if(!audio.currentTime){
		$('#duration').html('0.00');
	}
	
	$('#audio-player .title').text(title);
	$('#audio-player .artist').text(artist);
	
	//Insert cover
	$('img.cover').attr('src','img/covers/'+ cover);
	
	$('#playlist li').removeClass('active');
	element.addClass('active');
	
	//play button
$('#play').click(function(){
	audio.play();
	$('#play').hide();
	$('#pause').show();
	$('#duration').fadeIn(400);
	showDuration();
});

	//pause button
$('#pause').click(function(){
	audio.pause();
	$('#pause').hide();
	$('#play').show();
});

	//stop button
$('#stop').click(function(){
	audio.pause();
	audio.currentTime = 0;
	$('#pause').hide();
	$('#play').show();
	$('#duration').fadeOut(400);
});

	//next button
$('#next').click(function(){
	audio.pause();
	var next = $('#playlist li.active').next();
	if (next.length == 0){
		next = $('#playlist li:first-Child');
	}
	initAudio(next);
	audio.play();
	showDuration();
	
});

	//prev button
$('#prev').click(function(){
	audio.pause();
	var prev = $('#playlist li.active').prev();
	if (prev.length == 0){
		prev = $('#playlist li:last-Child');
	}
	initAudio(prev);
	audio.play();
	showDuration();
	
});

// volume control
$('#volume').change(function(){
	audio.volume = parseFloat(this.value / 10);
});

// Time Duration
function showDuration(){
	$(audio).bind('timeupdate',function(){	
	//get hours and minutes	
	var s = parseInt(audio.currentTime % 60);
	var m = parseInt((audio.currentTime/ 60) % 60);
	//add 0 if less than 10
	if(s < 10){
		s = '0' + s;
	}
	$('#duration').html(m + '_' + s);
	var value = 0;
	if(audio.currentTime > 0){
		value = Math.floor((100/audio.duration) * audio.currentTime)
	}
	$('#progress').css('width',value+ '%');
	
});
}

}