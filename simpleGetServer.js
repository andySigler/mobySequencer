////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////

var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css",
    "json": "text/json"
};

////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////

http.createServer(function(req,res){

	//pull the requested path from the url
	var uri = url.parse(req.url).pathname;

	//add that path to the current directory to get the location of that file
	var filename = path.join(process.cwd(),uri);

	//check to see if that file even exists
	fs.exists(filename,function(exists,err){
		if(!exists){
			console.log('	that file does not exist!');
			console.log('	'+filename);
			res.writeHead(200,{'Content-Type':'text/plain'});
			res.end('404 Not Found\n');
		}
		else{
			//get the file type from the extension in the uri
			var nameArray = path.extname(filename).split('.');
			var thisMimeType = mimeTypes[nameArray[nameArray.length-1]]; //get rid of that period
			res.writeHead(200,thisMimeType);	
			//this read's the file, sending it through res.write, the automatically ends the response when done
			var fileStream = fs.createReadStream(filename);
			fileStream.pipe(res);
		}
	});
}).listen(8000);

////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////