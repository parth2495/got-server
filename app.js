var express = require('express');	
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var War = require('./war');

var originsWhitelist = [  
  //'https://www.starlights.xyz',
  //'https://test.starlights.xyz',
  'http://localhost:3000',
  'https://warm-headland-29968.herokuapp.com/'
  //'https://blogs.starlights.xyz' 
];
var corsOptions = {
  origin: function(origin, callback){
  		//console.log(origin);
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
       // console.log(isWhitelisted);
        callback(null, isWhitelisted);
  }
}

app.use(cors(corsOptions))  

mongoose.connect('mongodb+srv://starlight:abc123@socialb2b.frx0s.mongodb.net/gameofthrones?retryWrites=true&w=majority');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
var db = mongoose.connection;

app.get('/', function(req, res){
	War.getWars(function(err,wars){
		if(err)
		{
			res.send({
				success: false,
                message: err
			})
		}
		res.send(wars);	
	});
	
})

app.get('/list', function(req, res){
	console.log("list");
	War.getListofNames(function(err, wars) {
		if(err)
		{
			res.send({
				success: false,
                message: err
			})
		}
		console.log(wars);
		res.send(wars);
	});
});

app.get('/count', function(req,res){
	console.log("count");
	War.getBattleCount(function(err, war) {
		if(err)
		{
			res.send({
				success: false,
                message: err
			})
		}
		console.log(war);
		res.send({count: war});
	});
});

app.get('/search', function(req,res){
	//var url = new URL(req.url);
	console.log(req.query);
	var name = req.query.king;
	if(req.query.location != null && req.query.type != null)
	{
		var loc = req.query.location;
		var type = req.query.type || null;
		
		War.getKingsFilter(name,loc,type, function(err, wars){
			if(err)
			{
				res.send({
					success: false,
	                message: err
				})
			}
			res.send(wars);
		})
	}
	else if(req.query.location == null && req.query.type == null)
	{
		War.getKings(name,function(err, wars) {
			if(err)
			{
				res.send({
					success: false,
	                message: err
				})
			}
			//console.log(wars);
			res.send(wars);
		});
	}
	else
	{
		res.send([]);
	}
	
});


app.listen(process.env.PORT || 3000);