package node.fs;

/**
	Tests a user's permissions for the file or directory specified by `path`.
	The `mode` argument is an optional integer that specifies the accessibility
	checks to be performed. Check `File access constants` for possible values
	of `mode`. It is possible to create a mask consisting of the bitwise OR of
	two or more values (e.g. `fs.constants.W_OK | fs.constants.R_OK`).
	
	The final argument, `callback`, is a callback function that is invoked with
	a possible error argument. If any of the accessibility checks fail, the error
	argument will be an `Error` object. The following examples check if`package.json` exists, and if it is readable or writable.
	
	```js
	import { access, constants } from 'fs';
	
	const file = 'package.json';
	
	// Check if the file exists in the current directory.
	access(file, constants.F_OK, (err) => {
	   console.log(`${file} ${err ? 'does not exist' : 'exists'}`);
	});
	
	// Check if the file is readable.
	access(file, constants.R_OK, (err) => {
	   console.log(`${file} ${err ? 'is not readable' : 'is readable'}`);
	});
	
	// Check if the file is writable.
	access(file, constants.W_OK, (err) => {
	   console.log(`${file} ${err ? 'is not writable' : 'is writable'}`);
	});
	
	// Check if the file exists in the current directory, and if it is writable.
	access(file, constants.F_OK | constants.W_OK, (err) => {
	   if (err) {
	     console.error(
	       `${file} ${err.code === 'ENOENT' ? 'does not exist' : 'is read-only'}`);
	   } else {
	     console.log(`${file} exists, and it is writable`);
	   }
	});
	```
	
	Do not use `fs.access()` to check for the accessibility of a file before calling`fs.open()`, `fs.readFile()` or `fs.writeFile()`. Doing
	so introduces a race condition, since other processes may change the file's
	state between the two calls. Instead, user code should open/read/write the
	file directly and handle the error raised if the file is not accessible.
	
	**write (NOT RECOMMENDED)**
	
	```js
	import { access, open, close } from 'fs';
	
	access('myfile', (err) => {
	   if (!err) {
	     console.error('myfile already exists');
	     return;
	   }
	
	   open('myfile', 'wx', (err, fd) => {
	     if (err) throw err;
	
	     try {
	       writeMyData(fd);
	     } finally {
	       close(fd, (err) => {
	         if (err) throw err;
	       });
	     }
	   });
	});
	```
	
	**write (RECOMMENDED)**
	
	```js
	import { open, close } from 'fs';
	
	open('myfile', 'wx', (err, fd) => {
	   if (err) {
	     if (err.code === 'EEXIST') {
	       console.error('myfile already exists');
	       return;
	     }
	
	     throw err;
	   }
	
	   try {
	     writeMyData(fd);
	   } finally {
	     close(fd, (err) => {
	       if (err) throw err;
	     });
	   }
	});
	```
	
	**read (NOT RECOMMENDED)**
	
	```js
	import { access, open, close } from 'fs';
	access('myfile', (err) => {
	   if (err) {
	     if (err.code === 'ENOENT') {
	       console.error('myfile does not exist');
	       return;
	     }
	
	     throw err;
	   }
	
	   open('myfile', 'r', (err, fd) => {
	     if (err) throw err;
	
	     try {
	       readMyData(fd);
	     } finally {
	       close(fd, (err) => {
	         if (err) throw err;
	       });
	     }
	   });
	});
	```
	
	**read (RECOMMENDED)**
	
	```js
	import { open, close } from 'fs';
	
	open('myfile', 'r', (err, fd) => {
	   if (err) {
	     if (err.code === 'ENOENT') {
	       console.error('myfile does not exist');
	       return;
	     }
	
	     throw err;
	   }
	
	   try {
	     readMyData(fd);
	   } finally {
	     close(fd, (err) => {
	       if (err) throw err;
	     });
	   }
	});
	```
	
	The "not recommended" examples above check for accessibility and then use the
	file; the "recommended" examples are better because they use the file directly
	and handle the error, if any.
	
	In general, check for the accessibility of a file only if the file will not be
	used directly, for example when its accessibility is a signal from another
	process.
	
	On Windows, access-control policies (ACLs) on a directory may limit access to
	a file or directory. The `fs.access()` function, however, does not check the
	ACL and therefore may report that a path is accessible even if the ACL restricts
	the user from reading or writing to it.
	
	Asynchronously tests a user's permissions for the file specified by path.
**/
@:jsRequire("fs", "access") @valueModuleOnly extern class Access {
	/**
		Tests a user's permissions for the file or directory specified by `path`.
		The `mode` argument is an optional integer that specifies the accessibility
		checks to be performed. Check `File access constants` for possible values
		of `mode`. It is possible to create a mask consisting of the bitwise OR of
		two or more values (e.g. `fs.constants.W_OK | fs.constants.R_OK`).
		
		The final argument, `callback`, is a callback function that is invoked with
		a possible error argument. If any of the accessibility checks fail, the error
		argument will be an `Error` object. The following examples check if`package.json` exists, and if it is readable or writable.
		
		```js
		import { access, constants } from 'fs';
		
		const file = 'package.json';
		
		// Check if the file exists in the current directory.
		access(file, constants.F_OK, (err) => {
		   console.log(`${file} ${err ? 'does not exist' : 'exists'}`);
		});
		
		// Check if the file is readable.
		access(file, constants.R_OK, (err) => {
		   console.log(`${file} ${err ? 'is not readable' : 'is readable'}`);
		});
		
		// Check if the file is writable.
		access(file, constants.W_OK, (err) => {
		   console.log(`${file} ${err ? 'is not writable' : 'is writable'}`);
		});
		
		// Check if the file exists in the current directory, and if it is writable.
		access(file, constants.F_OK | constants.W_OK, (err) => {
		   if (err) {
		     console.error(
		       `${file} ${err.code === 'ENOENT' ? 'does not exist' : 'is read-only'}`);
		   } else {
		     console.log(`${file} exists, and it is writable`);
		   }
		});
		```
		
		Do not use `fs.access()` to check for the accessibility of a file before calling`fs.open()`, `fs.readFile()` or `fs.writeFile()`. Doing
		so introduces a race condition, since other processes may change the file's
		state between the two calls. Instead, user code should open/read/write the
		file directly and handle the error raised if the file is not accessible.
		
		**write (NOT RECOMMENDED)**
		
		```js
		import { access, open, close } from 'fs';
		
		access('myfile', (err) => {
		   if (!err) {
		     console.error('myfile already exists');
		     return;
		   }
		
		   open('myfile', 'wx', (err, fd) => {
		     if (err) throw err;
		
		     try {
		       writeMyData(fd);
		     } finally {
		       close(fd, (err) => {
		         if (err) throw err;
		       });
		     }
		   });
		});
		```
		
		**write (RECOMMENDED)**
		
		```js
		import { open, close } from 'fs';
		
		open('myfile', 'wx', (err, fd) => {
		   if (err) {
		     if (err.code === 'EEXIST') {
		       console.error('myfile already exists');
		       return;
		     }
		
		     throw err;
		   }
		
		   try {
		     writeMyData(fd);
		   } finally {
		     close(fd, (err) => {
		       if (err) throw err;
		     });
		   }
		});
		```
		
		**read (NOT RECOMMENDED)**
		
		```js
		import { access, open, close } from 'fs';
		access('myfile', (err) => {
		   if (err) {
		     if (err.code === 'ENOENT') {
		       console.error('myfile does not exist');
		       return;
		     }
		
		     throw err;
		   }
		
		   open('myfile', 'r', (err, fd) => {
		     if (err) throw err;
		
		     try {
		       readMyData(fd);
		     } finally {
		       close(fd, (err) => {
		         if (err) throw err;
		       });
		     }
		   });
		});
		```
		
		**read (RECOMMENDED)**
		
		```js
		import { open, close } from 'fs';
		
		open('myfile', 'r', (err, fd) => {
		   if (err) {
		     if (err.code === 'ENOENT') {
		       console.error('myfile does not exist');
		       return;
		     }
		
		     throw err;
		   }
		
		   try {
		     readMyData(fd);
		   } finally {
		     close(fd, (err) => {
		       if (err) throw err;
		     });
		   }
		});
		```
		
		The "not recommended" examples above check for accessibility and then use the
		file; the "recommended" examples are better because they use the file directly
		and handle the error, if any.
		
		In general, check for the accessibility of a file only if the file will not be
		used directly, for example when its accessibility is a signal from another
		process.
		
		On Windows, access-control policies (ACLs) on a directory may limit access to
		a file or directory. The `fs.access()` function, however, does not check the
		ACL and therefore may report that a path is accessible even if the ACL restricts
		the user from reading or writing to it.
	**/
	@:overload(function(path:PathLike, callback:NoParamCallback):Void { })
	@:selfCall
	static function call(path:PathLike, mode:Null<Float>, callback:NoParamCallback):Void;
}