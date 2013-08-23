//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////

function Sample(audioCTX,index){
	this.sample;
	this.source;

	this.index = index;

	this.muted = false;

	this.makeInterface(audioCTX);
}

//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////

Sample.prototype.sequence = function(column,audioCTX){
	if(this.buttons[column].on && !this.muted){
		this.playSound(audioCTX);
	}
	for(var i=0;i<this.buttons.length;i++){
		this.buttons[i].updateClasses(i===column);
	}
}

//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////

Sample.prototype.playSound = function(audioCTX) {
	this.source = audioCTX.createBufferSource();
	this.source.buffer = this.sample;
	this.source.connect(audioCTX.destination);
	this.source.start(0);
}

//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////

Sample.prototype.makeInterface = function(audioCTX){

	var that = this;

	this.buttons = [];
	this.row = document.createElement('div')
	this.row.className = 'row';
	this.row.id = 'row_'+this.index;

	this.previewButton = document.createElement('button');
	this.previewButton.className = 'previewButton';
	this.previewButton.onclick = function(){
		if(!that.muted){
			that.playSound(audioCTX);
		}
	}
	this.row.appendChild(this.previewButton);

	this.muteButton = document.createElement('button');
	this.muteButton.className = 'muteButton';
	this.muteButton.onclick = function(){
		that.muted = !that.muted;
		if(that.muted) that.row.className = 'row muted';
		else that.row.className = 'row';
	}
	this.row.appendChild(this.muteButton);

	this.makeButtons();

	document.getElementById('matrixDiv').appendChild(this.row);

	if(this.index%4===3){
		var space = document.createElement('p');
		document.getElementById('matrixDiv').appendChild(space);
	}
}

//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////

Sample.prototype.makeButtons = function(){
	for(var i=0;i<16;i++){
		this.buttons[i] = new Moby_Button(i,this.row);
	}
}

//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////

Sample.prototype.loadSound = function() {
	var request = new XMLHttpRequest();
	request.open('GET', 'samples/'+this.index+'.mp3', true);
	request.responseType = 'arraybuffer';

	var that = this;

	request.onload = function() {
		audioContext.decodeAudioData(request.response, function(tempBuffer) {
			that.sample = tempBuffer;
		}, function(){
			console.log('we messed up loading sample');
		});
	}
	request.send();
}

//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////