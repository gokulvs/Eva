var express = require('express'),
	app = express(),
	path = require('path'),
	/*birds to the routes
		bird - Router object
	*/
	birds = require('./birds'),
  	exphbs = require('express-handlebars'),
  	http = require('http'),
  	mongoose = require('mongoose'),
  	config = require('./config'),
  	bodyParser     =  require("body-parser"),
  	methodOverride     =  require("method-override"),
  	spDocs = require('./models/serviceproviderModel.js');

var app = express();
var port = process.env.PORT || 8890;


var _dbLog = function(msg,obj){
	return function(){console.log.call(console,"DB log _/-\\_/> - ",msg,obj)};
};
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');*/
app.use(bodyParser.json());
app.use(methodOverride('HTTP-Method-Override'))

app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.disable('etag');
var db = mongoose.connection;
db.on('connected',_dbLog("DB connected",{connection : "ok"}));
// Connect to our mongo database
mongoose.connect('mongodb://localhost/EVA_DB',function(){
	
});

/*

var schema = new mongoose.Schema({
    name       : String,
    email : String,
  	phone : Number,
  	address : [String],
    social     : [String],
    description     : String,
    photo       : String,
    location   : [String]
});

var spDocuments = mongoose.model('service_providers',schema);*/

// Index Route
app.get('/', birds.index);

app.get('/get', function(req,res){
	//var mdel = new spDocs;
	
	spDocs.getServiceProviders(res,
		function(err,sps){
			if(!err){
				//console.log("callback executing");
				res.send(JSON.stringify(sps));
				res.end();
			}else{
				console.log("Error in excecuting query");
			}
		}
	);
});
//app.use(birds.page404);
app.post('/save',function(req,res){
	//console.log(req);
	//console.log("req.body",req.body)
	var data = req.body.data;
	console.log("model : ",data);
	/*spDocs.saveServiceProvider(data,function(msg){
		res.send(msg);
		res.end();
	});*/
	var spModel = new spDocuments(data);

	console.log("Saving ot DB");
	spModel.save(function(err){
		if(!err){
			//res.send('saved the Service Provider List');
			spDocuments.find({},function(dbErr,sps){
				if(!dbErr){
					res.send(JSON.stringify(sps));
					res.end();
				}
			});
		}else{
			res.send('Failed to save to DB');
			res.end();
		}
	}); 

});

app.use("/", express.static(__dirname + "/public/"));

/*app.get('/',function(req,res){
	res.send('html ok');
});

app.get(function(req,res){
	console.log("404");
	res.render('404',{url:req.url});
});*/
//app.use('/eva',birds);


var server = app.listen(port,function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log("Server up and running on http://%s:%s",host,port);
});