package node.fs;

/**
	Write an array of `ArrayBufferView`s to the file specified by `fd` using`writev()`.
	
	`position` is the offset from the beginning of the file where this data
	should be written. If `typeof position !== 'number'`, the data will be written
	at the current position.
	
	The callback will be given three arguments: `err`, `bytesWritten`, and`buffers`. `bytesWritten` is how many bytes were written from `buffers`.
	
	If this method is `util.promisify()` ed, it returns a promise for an`Object` with `bytesWritten` and `buffers` properties.
	
	It is unsafe to use `fs.writev()` multiple times on the same file without
	waiting for the callback. For this scenario, use {@link createWriteStream}.
	
	On Linux, positional writes don't work when the file is opened in append mode.
	The kernel ignores the position argument and always appends the data to
	the end of the file.
**/
@:jsRequire("fs", "writev") @valueModuleOnly extern class Writev {
	/**
		Write an array of `ArrayBufferView`s to the file specified by `fd` using`writev()`.
		
		`position` is the offset from the beginning of the file where this data
		should be written. If `typeof position !== 'number'`, the data will be written
		at the current position.
		
		The callback will be given three arguments: `err`, `bytesWritten`, and`buffers`. `bytesWritten` is how many bytes were written from `buffers`.
		
		If this method is `util.promisify()` ed, it returns a promise for an`Object` with `bytesWritten` and `buffers` properties.
		
		It is unsafe to use `fs.writev()` multiple times on the same file without
		waiting for the callback. For this scenario, use {@link createWriteStream}.
		
		On Linux, positional writes don't work when the file is opened in append mode.
		The kernel ignores the position argument and always appends the data to
		the end of the file.
	**/
	@:overload(function(fd:Float, buffers:haxe.ds.ReadOnlyArray<global.nodejs.ArrayBufferView>, position:Float, cb:(err:Null<global.nodejs.ErrnoException>, bytesWritten:Float, buffers:Array<global.nodejs.ArrayBufferView>) -> Void):Void { })
	@:selfCall
	static function call(fd:Float, buffers:haxe.ds.ReadOnlyArray<global.nodejs.ArrayBufferView>, cb:(err:Null<global.nodejs.ErrnoException>, bytesWritten:Float, buffers:Array<global.nodejs.ArrayBufferView>) -> Void):Void;
}