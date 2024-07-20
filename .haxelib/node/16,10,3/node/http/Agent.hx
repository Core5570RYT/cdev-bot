package node.http;

/**
	An `Agent` is responsible for managing connection persistence
	and reuse for HTTP clients. It maintains a queue of pending requests
	for a given host and port, reusing a single socket connection for each
	until the queue is empty, at which time the socket is either destroyed
	or put into a pool where it is kept to be used again for requests to the
	same host and port. Whether it is destroyed or pooled depends on the`keepAlive` `option`.
	
	Pooled connections have TCP Keep-Alive enabled for them, but servers may
	still close idle connections, in which case they will be removed from the
	pool and a new connection will be made when a new HTTP request is made for
	that host and port. Servers may also refuse to allow multiple requests
	over the same connection, in which case the connection will have to be
	remade for every request and cannot be pooled. The `Agent` will still make
	the requests to that server, but each one will occur over a new connection.
	
	When a connection is closed by the client or the server, it is removed
	from the pool. Any unused sockets in the pool will be unrefed so as not
	to keep the Node.js process running when there are no outstanding requests.
	(see `socket.unref()`).
	
	It is good practice, to `destroy()` an `Agent` instance when it is no
	longer in use, because unused sockets consume OS resources.
	
	Sockets are removed from an agent when the socket emits either
	a `'close'` event or an `'agentRemove'` event. When intending to keep one
	HTTP request open for a long time without keeping it in the agent, something
	like the following may be done:
	
	```js
	http.get(options, (res) => {
	   // Do stuff
	}).on('socket', (socket) => {
	   socket.emit('agentRemove');
	});
	```
	
	An agent may also be used for an individual request. By providing`{agent: false}` as an option to the `http.get()` or `http.request()`functions, a one-time use `Agent` with default options
	will be used
	for the client connection.
	
	`agent:false`:
	
	```js
	http.get({
	   hostname: 'localhost',
	   port: 80,
	   path: '/',
	   agent: false  // Create a new agent just for this one request
	}, (res) => {
	   // Do stuff with response
	});
	```
**/
@:jsRequire("http", "Agent") extern class Agent {
	function new(?opts:AgentOptions);
	/**
		By default set to 256\. For agents with `keepAlive` enabled, this
		sets the maximum number of sockets that will be left open in the free
		state.
	**/
	var maxFreeSockets : Float;
	/**
		By default set to `Infinity`. Determines how many concurrent sockets the agent
		can have open per origin. Origin is the returned value of `agent.getName()`.
	**/
	var maxSockets : Float;
	/**
		By default set to `Infinity`. Determines how many concurrent sockets the agent
		can have open. Unlike `maxSockets`, this parameter applies across all origins.
	**/
	var maxTotalSockets : Float;
	/**
		An object which contains arrays of sockets currently awaiting use by
		the agent when `keepAlive` is enabled. Do not modify.
		
		Sockets in the `freeSockets` list will be automatically destroyed and
		removed from the array on `'timeout'`.
	**/
	final freeSockets : global.nodejs.ReadOnlyDict<Array<node.net.Socket>>;
	/**
		An object which contains arrays of sockets currently in use by the
		agent. Do not modify.
	**/
	final sockets : global.nodejs.ReadOnlyDict<Array<node.net.Socket>>;
	/**
		An object which contains queues of requests that have not yet been assigned to
		sockets. Do not modify.
	**/
	final requests : global.nodejs.ReadOnlyDict<Array<IncomingMessage>>;
	/**
		Destroy any sockets that are currently in use by the agent.
		
		It is usually not necessary to do this. However, if using an
		agent with `keepAlive` enabled, then it is best to explicitly shut down
		the agent when it is no longer needed. Otherwise,
		sockets might stay open for quite a long time before the server
		terminates them.
	**/
	function destroy():Void;
	static var prototype : Agent;
}