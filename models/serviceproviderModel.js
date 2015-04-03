var mongoose = require('mongoose');
var respMgr = require('../responseManager/ResponseManager.js');
var perpagecount = 10;

/*var schema = new mongoose.Schema({
    name       : String,
    contact     : [
  					{
  						email : String,
  						phone : Number,
  						address : [{text : String}]
  					}
  				],
    social     : [String],
    description     : String,
    photo       : String,
    location   : [Number]
});*/
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

//spDocuments.initialize();

var spDocuments = mongoose.model('service_provider',schema);

schema.statics.getServiceProviders = function(cri,callback){
    //var spDocs = [];
    //var start = (page * perpagecount) - perpagecount;
    console.log("getServiceproviders");
   // console.log("this : ",this);
    this.find({}).exec(callback);
    
   // res.end();
    //return this.find({}).exec(callback);
};
schema.statics.saveServiceProvider = function(model,callback,context){
    var spModel = new spDocuments(model);
    console.log("Model : ",model)
    console.log("Saving ot DB");
    spModel.save(function(err){
      if(!err){
        callback.call(context,respMgr.getRes(true,'Saved the Service Provider List'));
      }else{
        callback.call(context,respMgr.getRes(false,'Failed to save to DB'));
      }
    }); 
};

module.exports = mongoose.model('service_providers',schema);;