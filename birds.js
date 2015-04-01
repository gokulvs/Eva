var express = require('express');
var router  = express.Router();
/*var JSX = require('node-jsx').install(),
React = require('react'),*/
/*TweetsApp = require('./components/TweetsApp.react'),*/
/*spDoc = require('./models/serviceproviderModel.js');*/

/*router.use(function timeLog(req,res,next){
	console.log('Time :-[ '+Date.now()+' ]');
	next();
});*/
/*router.use('/',function(req,res,next){
	console.log("ROOT middleware");
	next();
});*/
/*router.get('/',function(req,res){
	console.log("req recived");
	res.render('home');
});

router.use(function(req,res){
	res.render('404',{url:req.url});
});*/


module.exports = {
	index : function(req,res){
		res.render('home');
	},
	page404 : function(req,res){
		res.render('404',{url:req.url});
	}
};