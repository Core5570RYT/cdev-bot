package node.timers;

/**
	The `timers/promises` API provides an alternative set of timer functions
	that return `Promise` objects. The API is accessible via`require('timers/promises')`.
	
	```js
	import {
	   setTimeout,
	   setImmediate,
	   setInterval,
	} from 'timers/promises';
	```
**/
@:jsRequire("timers/promises") @valueModuleOnly extern class Promises {
	/**
		```js
		import {
		   setTimeout,
		} from 'timers/promises';
		
		const res = await setTimeout(100, 'result');
		
		console.log(res);  // Prints 'result'
		```
	**/
	static function setTimeout<T>(?delay:Float, ?value:T, ?options:TimerOptions):js.lib.Promise<T>;
	/**
		```js
		import {
		   setImmediate,
		} from 'timers/promises';
		
		const res = await setImmediate('result');
		
		console.log(res);  // Prints 'result'
		```
	**/
	static function setImmediate<T>(?value:T, ?options:TimerOptions):js.lib.Promise<T>;
	/**
		Returns an async iterator that generates values in an interval of `delay` ms.
		
		```js
		import {
		   setInterval,
		} from 'timers/promises';
		
		const interval = 100;
		for await (const startTime of setInterval(interval, Date.now())) {
		   const now = Date.now();
		   console.log(now);
		   if ((now - startTime) > 1000)
		     break;
		}
		console.log(Date.now());
		```
	**/
	static function setInterval<T>(?delay:Float, ?value:T, ?options:TimerOptions):js.lib.AsyncIterable<T>;
}