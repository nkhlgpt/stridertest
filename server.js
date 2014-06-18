var express = require("express"),
	bodyParser = require("body-parser"),
	stylus = require("stylus"),
	mongoose = require("mongoose"),
	app = express();

var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";


function compile(str, path){
	return stylus(str).set('filename', path);
}


app.set('views', __dirname + '/server/views/');
// Tell express which engine to use.
app.set('view engine', 'jade');

app.use(bodyParser());
app.use(stylus.middleware({
	src: __dirname + '/public',
	compile: compile
}));
app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost/lego');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error .. '));
db.once('open',function callback(){
	console.log("lego db opened");
});

// var messageSchema = mongoose.Schema({message: String});
// var Message = mongoose.model('Message', messageSchema);
// var mongoMessage;
// Message.findOne().exec(function(err, messageDoc){
// 	mongoMessage = messageDoc.message;
// 	console.log("mongoMessage: "+mongoMessage);
// });
 
app.get('/partials/*', function(req, res){
	res.render('../../public/app/' + req.params['0'], {env:env});
});

app.get("*", function(req, res){
	console.log("Rendering index");
	res.render("index"); 
	//res.send("index");
});
// app.get("*", function(req, res){
// 	console.log("Rendering index");
// 	res.render("index", {
// 		mongoMessage: mongoMessage
// 	}); 
// 	//res.send("index");
// });

var port = 8000;
app.listen(port);
console.log("Listening on port " + port); 