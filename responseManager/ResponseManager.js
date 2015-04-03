 var ResoponseManager = {
 	init : function(){
 		this._respType = 'json';
 	},
 	_render : function(code,truth){
 		var rsp = null;
 		console.log('in _render'+code+ " truth :"+truth);
 		if(this._respType == 'json'){
 			console.log("okin");
 			rsp=  JSON.stringify({
 						code: code,
 						msg : 'Action completed '+((truth)?" successfully ":" with failure ")+'.'
 			});
 		}
 		else {		
 			rsp = {
 					code:code,
 					msg : 'Action completed '+((truth)?" successfully ":" with failure ")+'.'
 			};
 		}
 		return rsp;
 			
 	},
 	getRes : function(command,msg){
 		console.log("ok");
 		return (command)?this._render(000,true):this._render(001,false);
 		//console.log("")
 	}
 };
 module.exports  = ResoponseManager;
