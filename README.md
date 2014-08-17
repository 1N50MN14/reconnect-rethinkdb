# reconnect-rethinkdb

Fibonacci and exponential backoff reconnection for [rethinkdb](http://www.rethinkdb.com/) when it goes down.

## Usage

```js
var rethinkdb = require('rethinkdb')
var opts = {host: 'localhost',port: 28015}
var reconnect = require('reconnect-rethinkdb')(rethinkdb, opts)

reconnect.on('connect', function(conn){
	console.log('connected!')
}).on('disconnect', function(err){
    /*err will be passed in case of error*/
	console.log('disconnected!', err)
}).on('reconnect', function(number, delay){
	console.log('reconnecting in ', delay, 'ms.', 'total retries so far is ', number)
}).on('fail', function(){
    /*triggered if failAfter opts is set*/
	console.log('given up trying to connect!')
}).connect(function(conn){
    /*do something with with your connection*/
	console.log('connected cb') 
})
```
## Methods
### connect
Keeps reconnecting until successful

### disconnect
Disconnects connection and stops reconnect attempts

## Options
Constructor accepts the same rethinkdb `connect()` [options](http://www.rethinkdb.com/) with an addition of the following optional options:

### type
`fibonacci` or `exponential`, defaults to `fibonacci`

### initialDelay
Defaults to `100`ms

### maxDelay
Defaults to `1000`ms

### failAfter
Maximum number of backoffs before the fail event gets
emitted, turned off by default.



## Installation

```
npm install reconnect-rethinkdb
```

## License

(MIT)

Copyright (c) 2013 Ayman Mackouly &lt;ayman.mackouly@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.