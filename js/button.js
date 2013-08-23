//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////

function Moby_Button(c,parent){
	this.column = c;
	this.on = false;

	this.el = document.createElement('span');
	this.el.className = 'button';
	var that = this;
	this.el.onclick = function(){
		that.on = !that.on;
		that.updateClasses();
	}
	parent.appendChild(this.el);
	this.updateClasses();
}

//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////

Moby_Button.prototype.updateClasses = function(play){
	var classList = 'button';
	if(this.column%4===0) classList += ' divider';
	if(this.on) classList += ' clicked';
	if(play) classList += ' play';
	if(play && this.on) classList += ' triggered';
	this.el.className = classList;
}

//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////