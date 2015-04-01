db.service_provider.insert(
	{
		name:'A&B sports complex',
		contact :[
		{
			email:'aandb@test.com',
			phone:'07204451300',
			address:[
					{text:'test addresss 1'},
					{text:'test address 2'}
			]
		}
		],
		social:['facebook','googleplus','twiter'],
		,
		description:'Foot ball',
		photo:'',
		location : [
			ObjectId("550d872554dee08b95b670be")
		]
	}
);
db.createCollection('socialmedia')
db.socialmedia.insert({
	_id : 'facebook',
	name : 'Facebook',
	url : 'http://facebook.com'
});

db.service_provider.update({_id:ObjectId("550da25854dee08b95b670c1")},{$set:{sports:[ObjectId("550d89d654dee08b95b670bf")]}});