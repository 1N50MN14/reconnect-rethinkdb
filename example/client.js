var rethinkdb = require('rethinkdb')
var opts = {host: 'localhost',port: 28015}
var reconnect = require('../index')(rethinkdb, opts)

reconnect.on('connect', function(conn){
	console.log('connected!')
}).on('disconnect', function(err){
	console.log('disconnected!')
}).on('reconnect', function(number, delay){
	console.log('reconnecting in ', delay, 'ms.', 'total retries so far is ', number)
}).on('fail', function(){
	console.log('given up trying to connect!')
}).connect(function(conn){
	console.log('connected callback!')
})

/*setTimeout(function(){
	reconnect.disconnect()
}, 10000)*/