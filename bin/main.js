const { Routes } = require('discord-api-types/v9');
;(function ($global) { "use strict";
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	this.r = new RegExp(r,opt.split("u").join(""));
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = "EReg";
EReg.escape = function(s) {
	return s.replace(EReg.escapeRe,"\\$&");
};
EReg.prototype = {
	r: null
	,match: function(s) {
		if(this.r.global) {
			this.r.lastIndex = 0;
		}
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) {
			return this.r.m[n];
		} else {
			throw haxe_Exception.thrown("EReg::matched");
		}
	}
	,matchedLeft: function() {
		if(this.r.m == null) {
			throw haxe_Exception.thrown("No string matched");
		}
		return HxOverrides.substr(this.r.s,0,this.r.m.index);
	}
	,matchedRight: function() {
		if(this.r.m == null) {
			throw haxe_Exception.thrown("No string matched");
		}
		var sz = this.r.m.index + this.r.m[0].length;
		return HxOverrides.substr(this.r.s,sz,this.r.s.length - sz);
	}
	,matchedPos: function() {
		if(this.r.m == null) {
			throw haxe_Exception.thrown("No string matched");
		}
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matchSub: function(s,pos,len) {
		if(len == null) {
			len = -1;
		}
		if(this.r.global) {
			this.r.lastIndex = pos;
			this.r.m = this.r.exec(len < 0 ? s : HxOverrides.substr(s,0,pos + len));
			var b = this.r.m != null;
			if(b) {
				this.r.s = s;
			}
			return b;
		} else {
			var b = this.match(len < 0 ? HxOverrides.substr(s,pos,null) : HxOverrides.substr(s,pos,len));
			if(b) {
				this.r.s = s;
				this.r.m.index += pos;
			}
			return b;
		}
	}
	,split: function(s) {
		return s.replace(this.r,"#__delim__#").split("#__delim__#");
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,map: function(s,f) {
		var offset = 0;
		var buf_b = "";
		while(true) {
			if(offset >= s.length) {
				break;
			} else if(!this.matchSub(s,offset)) {
				buf_b += Std.string(HxOverrides.substr(s,offset,null));
				break;
			}
			var p = this.matchedPos();
			buf_b += Std.string(HxOverrides.substr(s,offset,p.pos - offset));
			buf_b += Std.string(f(this));
			if(p.len == 0) {
				buf_b += Std.string(HxOverrides.substr(s,p.pos,1));
				offset = p.pos + 1;
			} else {
				offset = p.pos + p.len;
			}
			if(!this.r.global) {
				break;
			}
		}
		if(!this.r.global && offset > 0 && offset < s.length) {
			buf_b += Std.string(HxOverrides.substr(s,offset,null));
		}
		return buf_b;
	}
	,__class__: EReg
};
var EnumValue = {};
EnumValue.match = function(this1,pattern) {
	return false;
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = "HxOverrides";
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10 ? "0" + m : "" + m) + "-" + (d < 10 ? "0" + d : "" + d) + " " + (h < 10 ? "0" + h : "" + h) + ":" + (mi < 10 ? "0" + mi : "" + mi) + ":" + (s < 10 ? "0" + s : "" + s);
};
HxOverrides.strDate = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d["setTime"](0);
		d["setUTCHours"](k[0]);
		d["setUTCMinutes"](k[1]);
		d["setUTCSeconds"](k[2]);
		return d;
	case 10:
		var k = s.split("-");
		return new Date(k[0],k[1] - 1,k[2],0,0,0);
	case 19:
		var k = s.split(" ");
		var y = k[0].split("-");
		var t = k[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw haxe_Exception.thrown("Invalid date format : " + s);
	}
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) {
		return undefined;
	}
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(len == null) {
		len = s.length;
	} else if(len < 0) {
		if(pos == 0) {
			len = s.length + len;
		} else {
			return "";
		}
	}
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) {
			i = 0;
		}
	}
	while(i < len) {
		if(((a[i]) === obj)) {
			return i;
		}
		++i;
	}
	return -1;
};
HxOverrides.lastIndexOf = function(a,obj,i) {
	var len = a.length;
	if(i >= len) {
		i = len - 1;
	} else if(i < 0) {
		i += len;
	}
	while(i >= 0) {
		if(((a[i]) === obj)) {
			return i;
		}
		--i;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) {
		return false;
	}
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
HxOverrides.keyValueIter = function(a) {
	return new haxe_iterators_ArrayKeyValueIterator(a);
};
HxOverrides.now = function() {
	return Date.now();
};
var IntIterator = function(min,max) {
	this.min = min;
	this.max = max;
};
$hxClasses["IntIterator"] = IntIterator;
IntIterator.__name__ = "IntIterator";
IntIterator.prototype = {
	min: null
	,max: null
	,hasNext: function() {
		return this.min < this.max;
	}
	,next: function() {
		return this.min++;
	}
	,__class__: IntIterator
};
var Main = function() { };
$hxClasses["Main"] = Main;
Main.__name__ = "Main";
Main.__properties__ = {get_name:"get_name"};
Main.config = null;
Main.client = null;
Main.startDate = null;
Main.get_name = function() {
	if(Main.config == null || Main.config.project_name == null) {
		return "bot";
	}
	return Main.config.project_name;
};
Main.main = function() {
	Main.init();
	Main.start();
};
Main.init = function() {
	Main.startDate = new Date();
	js_node_ChildProcess.spawnSync("cls",{ shell : true, stdio : "inherit"});
	try {
		Main.config = JSON.parse(js_node_Fs.readFileSync("./config.json",{ encoding : "utf8"}));
	} catch( _g ) {
		var _g1 = haxe_Exception.caught(_g);
		haxe_Log.trace(_g1.get_message(),{ fileName : "src/Main.hx", lineNumber : 50, className : "Main", methodName : "init"});
	}
	if(Main.config == null || Main.config.discord_token == "TOKEN_HERE") {
		throw haxe_Exception.thrown("Enter your discord auth token.");
	}
	new discordjs_rest_REST({ version : "9"}).setToken(Main.config.discord_token).put(Routes.applicationGuildCommands(Main.config.client_id,Main.config.server_id),{ body : []}).then(function(_) {
		haxe_Log.trace("Successfully registered application commands.",{ fileName : "src/Main.hx", lineNumber : 60, className : "Main", methodName : "init"});
	},function(err) {
		haxe_Log.trace(err,{ fileName : "src/Main.hx", lineNumber : 60, className : "Main", methodName : "init"});
	});
};
Main.start = function() {
	MessageHandler.init();
	Main.client = new discord_$js_Client({ allowedMentions : { parse : []}, intents : [1,512]});
	Main.client.once("ready",function() {
		var $l=arguments.length;
		var _ = new Array($l>0?$l-0:0);
		for(var $i=0;$i<$l;++$i){_[$i-0]=arguments[$i];}
		haxe_Log.trace("Bot is ready! " + Main.client.user.username,{ fileName : "src/Main.hx", lineNumber : 72, className : "Main", methodName : "start"});
		Main.connected = true;
	});
	Main.client.on("messageCreate",function(message) {
		if(message.author.bot || message.system) {
			return;
		}
		if(message.guild.id != "1156988198292037673") {
			message.reply("-# :x: This bot can only be used on the FNF CDEV Engine Discord Server.");
			return;
		}
		try {
			if(StringTools.startsWith(message.content,MessageHandler.prefix)) {
				MessageHandler.check(message);
			}
		} catch( _g ) {
			message.reply("> An error has occured while executing command:\n```" + haxe_Exception.caught(_g).toString() + "```");
		}
	});
	Main.client.login(Main.config.discord_token);
	new haxe_Timer(100).run = function() {
		Main.botUptime += 100;
		if(Main.client.user != null) {
			if(!Main.setIDK) {
				Main.client.user.setActivity("CDEV Engine");
			}
			Main.setIDK = true;
		}
	};
};
Math.__name__ = "Math";
var MessageHandler = function() { };
$hxClasses["MessageHandler"] = MessageHandler;
MessageHandler.__name__ = "MessageHandler";
MessageHandler.init = function() {
	if(MessageHandler.ready) {
		return;
	}
	MessageHandler.ready = true;
	MessageHandler.actions.push({ name : "hello", desc : "Say hello to the bot", handle : function(m) {
		m.reply("> Hello " + m.member.displayName + "!");
	}});
	MessageHandler.actions.push({ name : "crash", desc : "Crash the bot.", handle : function(m) {
		throw haxe_Exception.thrown("crash happened i guess");
	}});
	MessageHandler.actions.push({ name : "uptime", desc : "Check how long does this bot have been active.", handle : function(m) {
		m.reply(MessageHandler.createEmbed("" + Main.get_name() + " has been active for " + Util.getCurrentDuration(Main.botUptime),"Bot started on " + HxOverrides.dateStr(Main.startDate)));
	}});
	MessageHandler.actions.push({ name : "boop", param : ["username"], desc : "Boop someone!", handle : function(m) {
		var split = m.content.split(" ");
		haxe_Log.trace(split,{ fileName : "src/MessageHandler.hx", lineNumber : 41, className : "MessageHandler", methodName : "init"});
		var boopThis = "<@" + m.author.id + ">";
		if(split.length > 1) {
			boopThis = split[1];
		}
		m.reply(MessageHandler.createEmbed("Boop! " + boopThis,""));
	}});
	MessageHandler.actions.push({ name : "version", desc : "Shows current version of this bot and CDEV Engine.", handle : function(m) {
		var cdevVer = "";
		var http = new haxe_http_HttpNodeJs("https://raw.githubusercontent.com/Core5570RYT/FNF-CDEV-Engine/master/githubVersion.txt");
		http.onData = function(data) {
			cdevVer = StringTools.trim(data.split("\n")[0]);
			var content = "**" + Main.get_name() + "** - v" + Main.version;
			content += "\n**CDEV Engine** - v" + cdevVer;
			m.reply(MessageHandler.createEmbed("Version List",content));
		};
		http.onError = function(error) {
			haxe_Log.trace("Error on getting CDEV Engine version: " + error,{ fileName : "src/MessageHandler.hx", lineNumber : 63, className : "MessageHandler", methodName : "init"});
		};
		http.request();
	}});
	MessageHandler.actions.push({ name : "mathAdd", param : ["number1","number2"], desc : "Ask the bot to do addition math.", handle : function(m) {
		var split = m.content.split(" ");
		haxe_Log.trace(split,{ fileName : "src/MessageHandler.hx", lineNumber : 71, className : "MessageHandler", methodName : "init"});
		var sayThis = "> Please provide first number and second number";
		if(split.length == 2) {
			sayThis = "> Please provide the second number.";
		} else if(split.length == 3) {
			var tmp;
			var f = parseFloat(split[1]);
			if(!isNaN(f)) {
				var f = parseFloat(split[2]);
				tmp = isNaN(f);
			} else {
				tmp = true;
			}
			if(tmp) {
				sayThis = "> One of these numbers you've put is an invalid number.";
			} else {
				sayThis = "> " + split[1] + " + " + split[2] + " = " + (parseFloat(split[1]) + parseFloat(split[2]));
			}
		}
		m.reply(MessageHandler.createEmbed("Math",sayThis));
	}});
	MessageHandler.actions.push({ name : "help", desc : "Returns list of available commands", handle : function(m) {
		var content = "\n**(Use \"!\" before writing any of these commands)**";
		var _g = 0;
		var _g1 = MessageHandler.actions;
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			var paramList = "";
			if(i.param != null) {
				var _g2 = 0;
				var _g3 = i.param;
				while(_g2 < _g3.length) paramList += " <" + _g3[_g2++] + ">";
			}
			content += "\n> `" + i.name + paramList + "` - " + i.desc;
		}
		m.reply(MessageHandler.createEmbed("" + Main.get_name() + " Command List",content));
	}});
};
MessageHandler.createEmbed = function(title,content) {
	var embed = new discord_$js_MessageEmbed();
	embed.type = "article";
	embed.color = 3447003;
	if(title != "") {
		embed.setTitle(title);
	}
	if(content != "") {
		embed.setDescription(content);
	}
	return { allowedMentions : { parse : []}, embeds : [embed]};
};
MessageHandler.check = function(message) {
	if(!MessageHandler.ready) {
		haxe_Log.trace("Recieved a message, but actions haven't initialized yet!",{ fileName : "src/MessageHandler.hx", lineNumber : 114, className : "MessageHandler", methodName : "check"});
		return;
	}
	var noPrefix = message.content.substring(MessageHandler.prefix.length);
	var _g = 0;
	var _g1 = MessageHandler.actions;
	while(_g < _g1.length) {
		var action = _g1[_g];
		++_g;
		var checkName = noPrefix;
		if(action.param != null) {
			checkName = noPrefix.split(" ")[0];
		}
		if(action.name == checkName) {
			action.handle(message);
			return;
		}
	}
	message.reply("> Couldn't find matching command: `" + noPrefix + "`, use `" + (MessageHandler.prefix + "help") + "` for commands.");
};
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = "Reflect";
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
};
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( _g ) {
		haxe_NativeStackTrace.lastError = _g;
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) {
		return null;
	} else {
		var tmp1;
		if(o.__properties__) {
			tmp = o.__properties__["get_" + field];
			tmp1 = tmp;
		} else {
			tmp1 = false;
		}
		if(tmp1) {
			return o[tmp]();
		} else {
			return o[field];
		}
	}
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	var tmp1;
	if(o.__properties__) {
		tmp = o.__properties__["set_" + field];
		tmp1 = tmp;
	} else {
		tmp1 = false;
	}
	if(tmp1) {
		o[tmp](value);
	} else {
		o[field] = value;
	}
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) {
			a.push(f);
		}
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	if(typeof(f) == "function") {
		return !(f.__name__ || f.__ename__);
	} else {
		return false;
	}
};
Reflect.compare = function(a,b) {
	if(a == b) {
		return 0;
	} else if(a > b) {
		return 1;
	} else {
		return -1;
	}
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) {
		return true;
	}
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) {
		return false;
	}
	if(f1.scope == f2.scope && f1.method == f2.method) {
		return f1.method != null;
	} else {
		return false;
	}
};
Reflect.isObject = function(v) {
	if(v == null) {
		return false;
	}
	var t = typeof(v);
	if(!(t == "string" || t == "object" && v.__enum__ == null)) {
		if(t == "function") {
			return (v.__name__ || v.__ename__) != null;
		} else {
			return false;
		}
	} else {
		return true;
	}
};
Reflect.isEnumValue = function(v) {
	if(v != null) {
		return v.__enum__ != null;
	} else {
		return false;
	}
};
Reflect.deleteField = function(o,field) {
	if(!Object.prototype.hasOwnProperty.call(o,field)) {
		return false;
	}
	delete(o[field]);
	return true;
};
Reflect.copy = function(o) {
	if(o == null) {
		return null;
	}
	var o2 = { };
	var _g = 0;
	var _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		o2[f] = Reflect.field(o,f);
	}
	return o2;
};
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = Array.prototype.slice;
		var a1 = arguments;
		var a2 = a.call(a1);
		return f(a2);
	};
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = "Std";
Std.is = function(v,t) {
	return js_Boot.__instanceof(v,t);
};
Std.isOfType = function(v,t) {
	return js_Boot.__instanceof(v,t);
};
Std.downcast = function(value,c) {
	if(js_Boot.__downcastCheck(value,c)) {
		return value;
	} else {
		return null;
	}
};
Std.instance = function(value,c) {
	if(js_Boot.__downcastCheck(value,c)) {
		return value;
	} else {
		return null;
	}
};
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.int = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	if(x != null) {
		var _g = 0;
		var _g1 = x.length;
		while(_g < _g1) {
			var i = _g++;
			var c = x.charCodeAt(i);
			if(c <= 8 || c >= 14 && c != 32 && c != 45) {
				var nc = x.charCodeAt(i + 1);
				var v = parseInt(x,nc == 120 || nc == 88 ? 16 : 10);
				if(isNaN(v)) {
					return null;
				} else {
					return v;
				}
			}
		}
	}
	return null;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
Std.random = function(x) {
	if(x <= 0) {
		return 0;
	} else {
		return Math.floor(Math.random() * x);
	}
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = "StringBuf";
StringBuf.prototype = {
	b: null
	,get_length: function() {
		return this.b.length;
	}
	,add: function(x) {
		this.b += Std.string(x);
	}
	,addChar: function(c) {
		this.b += String.fromCodePoint(c);
	}
	,addSub: function(s,pos,len) {
		this.b += len == null ? HxOverrides.substr(s,pos,null) : HxOverrides.substr(s,pos,len);
	}
	,toString: function() {
		return this.b;
	}
	,__class__: StringBuf
	,__properties__: {get_length:"get_length"}
};
var haxe_SysTools = function() { };
$hxClasses["haxe.SysTools"] = haxe_SysTools;
haxe_SysTools.__name__ = "haxe.SysTools";
haxe_SysTools.quoteUnixArg = function(argument) {
	if(argument == "") {
		return "''";
	}
	if(!new EReg("[^a-zA-Z0-9_@%+=:,./-]","").match(argument)) {
		return argument;
	}
	return "'" + StringTools.replace(argument,"'","'\"'\"'") + "'";
};
haxe_SysTools.quoteWinArg = function(argument,escapeMetaCharacters) {
	if(!new EReg("^[^ \t\\\\\"]+$","").match(argument)) {
		var result_b = "";
		var needquote = argument.indexOf(" ") != -1 || argument.indexOf("\t") != -1 || argument == "";
		if(needquote) {
			result_b += "\"";
		}
		var bs_buf = new StringBuf();
		var _g = 0;
		var _g1 = argument.length;
		while(_g < _g1) {
			var _g2 = HxOverrides.cca(argument,_g++);
			if(_g2 == null) {
				var c = _g2;
				if(bs_buf.b.length > 0) {
					result_b += Std.string(bs_buf.b);
					bs_buf = new StringBuf();
				}
				result_b += String.fromCodePoint(c);
			} else {
				switch(_g2) {
				case 34:
					var bs = bs_buf.b;
					result_b += bs == null ? "null" : "" + bs;
					result_b += bs == null ? "null" : "" + bs;
					bs_buf = new StringBuf();
					result_b += "\\\"";
					break;
				case 92:
					bs_buf.b += "\\";
					break;
				default:
					var c1 = _g2;
					if(bs_buf.b.length > 0) {
						result_b += Std.string(bs_buf.b);
						bs_buf = new StringBuf();
					}
					result_b += String.fromCodePoint(c1);
				}
			}
		}
		result_b += Std.string(bs_buf.b);
		if(needquote) {
			result_b += Std.string(bs_buf.b);
			result_b += "\"";
		}
		argument = result_b;
	}
	if(escapeMetaCharacters) {
		var result_b = "";
		var _g = 0;
		var _g1 = argument.length;
		while(_g < _g1) {
			var c = HxOverrides.cca(argument,_g++);
			if(haxe_SysTools.winMetaCharacters.indexOf(c) >= 0) {
				result_b += String.fromCodePoint(94);
			}
			result_b += String.fromCodePoint(c);
		}
		return result_b;
	} else {
		return argument;
	}
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = "StringTools";
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
};
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
};
StringTools.htmlEscape = function(s,quotes) {
	var buf_b = "";
	var _g_offset = 0;
	var _g_s = s;
	while(_g_offset < _g_s.length) {
		var s = _g_s;
		var index = _g_offset++;
		var c = s.charCodeAt(index);
		if(c >= 55296 && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(index + 1) & 1023;
		}
		var c1 = c;
		if(c1 >= 65536) {
			++_g_offset;
		}
		var code = c1;
		switch(code) {
		case 34:
			if(quotes) {
				buf_b += "&quot;";
			} else {
				buf_b += String.fromCodePoint(code);
			}
			break;
		case 38:
			buf_b += "&amp;";
			break;
		case 39:
			if(quotes) {
				buf_b += "&#039;";
			} else {
				buf_b += String.fromCodePoint(code);
			}
			break;
		case 60:
			buf_b += "&lt;";
			break;
		case 62:
			buf_b += "&gt;";
			break;
		default:
			buf_b += String.fromCodePoint(code);
		}
	}
	return buf_b;
};
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&quot;").join("\"").split("&#039;").join("'").split("&amp;").join("&");
};
StringTools.contains = function(s,value) {
	return s.indexOf(value) != -1;
};
StringTools.startsWith = function(s,start) {
	if(s.length >= start.length) {
		return s.lastIndexOf(start,0) == 0;
	} else {
		return false;
	}
};
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	if(slen >= elen) {
		return s.indexOf(end,slen - elen) == slen - elen;
	} else {
		return false;
	}
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	if(!(c > 8 && c < 14)) {
		return c == 32;
	} else {
		return true;
	}
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,r,l - r);
	} else {
		return s;
	}
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,0,l - r);
	} else {
		return s;
	}
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.lpad = function(s,c,l) {
	if(c.length <= 0) {
		return s;
	}
	var buf_b = "";
	l -= s.length;
	while(buf_b.length < l) buf_b += c == null ? "null" : "" + c;
	buf_b += s == null ? "null" : "" + s;
	return buf_b;
};
StringTools.rpad = function(s,c,l) {
	if(c.length <= 0) {
		return s;
	}
	var buf_b = "";
	buf_b = "" + (s == null ? "null" : "" + s);
	while(buf_b.length < l) buf_b += c == null ? "null" : "" + c;
	return buf_b;
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.hex = function(n,digits) {
	var s = "";
	while(true) {
		s = "0123456789ABCDEF".charAt(n & 15) + s;
		n >>>= 4;
		if(!(n > 0)) {
			break;
		}
	}
	if(digits != null) {
		while(s.length < digits) s = "0" + s;
	}
	return s;
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
StringTools.unsafeCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
StringTools.iterator = function(s) {
	return new haxe_iterators_StringIterator(s);
};
StringTools.keyValueIterator = function(s) {
	return new haxe_iterators_StringKeyValueIterator(s);
};
StringTools.isEof = function(c) {
	return c != c;
};
StringTools.quoteUnixArg = function(argument) {
	if(argument == "") {
		return "''";
	} else if(!new EReg("[^a-zA-Z0-9_@%+=:,./-]","").match(argument)) {
		return argument;
	} else {
		return "'" + StringTools.replace(argument,"'","'\"'\"'") + "'";
	}
};
StringTools.quoteWinArg = function(argument,escapeMetaCharacters) {
	var argument1 = argument;
	if(!new EReg("^[^ \t\\\\\"]+$","").match(argument1)) {
		var result_b = "";
		var needquote = argument1.indexOf(" ") != -1 || argument1.indexOf("\t") != -1 || argument1 == "";
		if(needquote) {
			result_b += "\"";
		}
		var bs_buf = new StringBuf();
		var _g = 0;
		var _g1 = argument1.length;
		while(_g < _g1) {
			var _g2 = HxOverrides.cca(argument1,_g++);
			if(_g2 == null) {
				var c = _g2;
				if(bs_buf.b.length > 0) {
					result_b += Std.string(bs_buf.b);
					bs_buf = new StringBuf();
				}
				result_b += String.fromCodePoint(c);
			} else {
				switch(_g2) {
				case 34:
					var bs = bs_buf.b;
					result_b += Std.string(bs);
					result_b += Std.string(bs);
					bs_buf = new StringBuf();
					result_b += "\\\"";
					break;
				case 92:
					bs_buf.b += "\\";
					break;
				default:
					var c1 = _g2;
					if(bs_buf.b.length > 0) {
						result_b += Std.string(bs_buf.b);
						bs_buf = new StringBuf();
					}
					result_b += String.fromCodePoint(c1);
				}
			}
		}
		result_b += Std.string(bs_buf.b);
		if(needquote) {
			result_b += Std.string(bs_buf.b);
			result_b += "\"";
		}
		argument1 = result_b;
	}
	if(escapeMetaCharacters) {
		var result_b = "";
		var _g = 0;
		var _g1 = argument1.length;
		while(_g < _g1) {
			var c = HxOverrides.cca(argument1,_g++);
			if(haxe_SysTools.winMetaCharacters.indexOf(c) >= 0) {
				result_b += String.fromCodePoint(94);
			}
			result_b += String.fromCodePoint(c);
		}
		return result_b;
	} else {
		return argument1;
	}
};
StringTools.utf16CodePointAt = function(s,index) {
	var c = s.charCodeAt(index);
	if(c >= 55296 && c <= 56319) {
		c = c - 55232 << 10 | s.charCodeAt(index + 1) & 1023;
	}
	return c;
};
var Sys = function() { };
$hxClasses["Sys"] = Sys;
Sys.__name__ = "Sys";
Sys.print = function(v) {
	process.stdout.write(Std.string(v));
};
Sys.println = function(v) {
	process.stdout.write(Std.string(v));
	process.stdout.write("\n");
};
Sys.args = function() {
	return process.argv.slice(2);
};
Sys.getEnv = function(s) {
	return process.env[s];
};
Sys.putEnv = function(s,v) {
	if(v == null) {
		Reflect.deleteField(process.env,s);
	} else {
		process.env[s] = v;
	}
};
Sys.environment = function() {
	var m = new haxe_ds_StringMap();
	var _g = 0;
	var _g1 = Reflect.fields(process.env);
	while(_g < _g1.length) {
		var key = _g1[_g];
		++_g;
		var v = process.env[key];
		m.h[key] = v;
	}
	return m;
};
Sys.setTimeLocale = function(loc) {
	return false;
};
Sys.getCwd = function() {
	return haxe_io_Path.addTrailingSlash(process.cwd());
};
Sys.setCwd = function(s) {
	process.chdir(s);
};
Sys.systemName = function() {
	var _g = process.platform;
	switch(_g) {
	case "darwin":
		return "Mac";
	case "freebsd":
		return "BSD";
	case "linux":
		return "Linux";
	case "win32":
		return "Windows";
	default:
		return _g;
	}
};
Sys.command = function(cmd,args) {
	if(args == null) {
		return js_node_ChildProcess.spawnSync(cmd,{ shell : true, stdio : "inherit"}).status;
	} else {
		return js_node_ChildProcess.spawnSync(cmd,args,{ stdio : "inherit"}).status;
	}
};
Sys.exit = function(code) {
	process.exit(code);
};
Sys.time = function() {
	return Date.now() / 1000;
};
Sys.cpuTime = function() {
	return process.uptime();
};
Sys.executablePath = function() {
	return process.argv[0];
};
Sys.programPath = function() {
	return __filename;
};
Sys.getChar = function(echo) {
	throw haxe_Exception.thrown("Sys.getChar is currently not implemented on node.js");
};
Sys.sleep = function(seconds) {
	var end = Date.now() + seconds * 1000;
	while(Date.now() <= end) {
	}
};
Sys.stdin = function() {
	return new _$Sys_FileInput(0);
};
Sys.stdout = function() {
	return new _$Sys_FileOutput(1);
};
Sys.stderr = function() {
	return new _$Sys_FileOutput(2);
};
var haxe_io_Output = function() { };
$hxClasses["haxe.io.Output"] = haxe_io_Output;
haxe_io_Output.__name__ = "haxe.io.Output";
haxe_io_Output.prototype = {
	bigEndian: null
	,writeByte: function(c) {
		throw new haxe_exceptions_NotImplementedException(null,null,{ fileName : "haxe/io/Output.hx", lineNumber : 47, className : "haxe.io.Output", methodName : "writeByte"});
	}
	,writeBytes: function(s,pos,len) {
		if(pos < 0 || len < 0 || pos + len > s.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		var b = s.b;
		var k = len;
		while(k > 0) {
			this.writeByte(b[pos]);
			++pos;
			--k;
		}
		return len;
	}
	,flush: function() {
	}
	,close: function() {
	}
	,set_bigEndian: function(b) {
		this.bigEndian = b;
		return b;
	}
	,write: function(s) {
		var l = s.length;
		var p = 0;
		while(l > 0) {
			var k = this.writeBytes(s,p,l);
			if(k == 0) {
				throw haxe_Exception.thrown(haxe_io_Error.Blocked);
			}
			p += k;
			l -= k;
		}
	}
	,writeFullBytes: function(s,pos,len) {
		while(len > 0) {
			var k = this.writeBytes(s,pos,len);
			pos += k;
			len -= k;
		}
	}
	,writeFloat: function(x) {
		this.writeInt32(haxe_io_FPHelper.floatToI32(x));
	}
	,writeDouble: function(x) {
		var i64 = haxe_io_FPHelper.doubleToI64(x);
		if(this.bigEndian) {
			this.writeInt32(i64.high);
			this.writeInt32(i64.low);
		} else {
			this.writeInt32(i64.low);
			this.writeInt32(i64.high);
		}
	}
	,writeInt8: function(x) {
		if(x < -128 || x >= 128) {
			throw haxe_Exception.thrown(haxe_io_Error.Overflow);
		}
		this.writeByte(x & 255);
	}
	,writeInt16: function(x) {
		if(x < -32768 || x >= 32768) {
			throw haxe_Exception.thrown(haxe_io_Error.Overflow);
		}
		this.writeUInt16(x & 65535);
	}
	,writeUInt16: function(x) {
		if(x < 0 || x >= 65536) {
			throw haxe_Exception.thrown(haxe_io_Error.Overflow);
		}
		if(this.bigEndian) {
			this.writeByte(x >> 8);
			this.writeByte(x & 255);
		} else {
			this.writeByte(x & 255);
			this.writeByte(x >> 8);
		}
	}
	,writeInt24: function(x) {
		if(x < -8388608 || x >= 8388608) {
			throw haxe_Exception.thrown(haxe_io_Error.Overflow);
		}
		this.writeUInt24(x & 16777215);
	}
	,writeUInt24: function(x) {
		if(x < 0 || x >= 16777216) {
			throw haxe_Exception.thrown(haxe_io_Error.Overflow);
		}
		if(this.bigEndian) {
			this.writeByte(x >> 16);
			this.writeByte(x >> 8 & 255);
			this.writeByte(x & 255);
		} else {
			this.writeByte(x & 255);
			this.writeByte(x >> 8 & 255);
			this.writeByte(x >> 16);
		}
	}
	,writeInt32: function(x) {
		if(this.bigEndian) {
			this.writeByte(x >>> 24);
			this.writeByte(x >> 16 & 255);
			this.writeByte(x >> 8 & 255);
			this.writeByte(x & 255);
		} else {
			this.writeByte(x & 255);
			this.writeByte(x >> 8 & 255);
			this.writeByte(x >> 16 & 255);
			this.writeByte(x >>> 24);
		}
	}
	,prepare: function(nbytes) {
	}
	,writeInput: function(i,bufsize) {
		if(bufsize == null) {
			bufsize = 4096;
		}
		var buf = new haxe_io_Bytes(new ArrayBuffer(bufsize));
		try {
			while(true) {
				var len = i.readBytes(buf,0,bufsize);
				if(len == 0) {
					throw haxe_Exception.thrown(haxe_io_Error.Blocked);
				}
				var p = 0;
				while(len > 0) {
					var k = this.writeBytes(buf,p,len);
					if(k == 0) {
						throw haxe_Exception.thrown(haxe_io_Error.Blocked);
					}
					p += k;
					len -= k;
				}
			}
		} catch( _g ) {
			haxe_NativeStackTrace.lastError = _g;
			if(!((haxe_Exception.caught(_g).unwrap()) instanceof haxe_io_Eof)) {
				throw _g;
			}
		}
	}
	,writeString: function(s,encoding) {
		var b = haxe_io_Bytes.ofString(s,encoding);
		this.writeFullBytes(b,0,b.length);
	}
	,__class__: haxe_io_Output
	,__properties__: {set_bigEndian:"set_bigEndian"}
};
var _$Sys_FileOutput = function(fd) {
	this.fd = fd;
};
$hxClasses["_Sys.FileOutput"] = _$Sys_FileOutput;
_$Sys_FileOutput.__name__ = "_Sys.FileOutput";
_$Sys_FileOutput.__super__ = haxe_io_Output;
_$Sys_FileOutput.prototype = $extend(haxe_io_Output.prototype,{
	fd: null
	,writeByte: function(c) {
		js_node_Fs.writeSync(this.fd,String.fromCodePoint(c));
	}
	,writeBytes: function(s,pos,len) {
		var data = s.b;
		return js_node_Fs.writeSync(this.fd,js_node_buffer_Buffer.from(data.buffer,data.byteOffset,s.length),pos,len);
	}
	,writeString: function(s,encoding) {
		js_node_Fs.writeSync(this.fd,s);
	}
	,flush: function() {
		js_node_Fs.fsyncSync(this.fd);
	}
	,close: function() {
		js_node_Fs.closeSync(this.fd);
	}
	,__class__: _$Sys_FileOutput
});
var haxe_io_Input = function() { };
$hxClasses["haxe.io.Input"] = haxe_io_Input;
haxe_io_Input.__name__ = "haxe.io.Input";
haxe_io_Input.prototype = {
	bigEndian: null
	,readByte: function() {
		throw new haxe_exceptions_NotImplementedException(null,null,{ fileName : "haxe/io/Input.hx", lineNumber : 53, className : "haxe.io.Input", methodName : "readByte"});
	}
	,readBytes: function(s,pos,len) {
		var k = len;
		var b = s.b;
		if(pos < 0 || len < 0 || pos + len > s.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		try {
			while(k > 0) {
				b[pos] = this.readByte();
				++pos;
				--k;
			}
		} catch( _g ) {
			haxe_NativeStackTrace.lastError = _g;
			if(!((haxe_Exception.caught(_g).unwrap()) instanceof haxe_io_Eof)) {
				throw _g;
			}
		}
		return len - k;
	}
	,close: function() {
	}
	,set_bigEndian: function(b) {
		this.bigEndian = b;
		return b;
	}
	,readAll: function(bufsize) {
		if(bufsize == null) {
			bufsize = 16384;
		}
		var buf = new haxe_io_Bytes(new ArrayBuffer(bufsize));
		var total = new haxe_io_BytesBuffer();
		try {
			while(true) {
				var len = this.readBytes(buf,0,bufsize);
				if(len == 0) {
					throw haxe_Exception.thrown(haxe_io_Error.Blocked);
				}
				total.addBytes(buf,0,len);
			}
		} catch( _g ) {
			haxe_NativeStackTrace.lastError = _g;
			if(!((haxe_Exception.caught(_g).unwrap()) instanceof haxe_io_Eof)) {
				throw _g;
			}
		}
		return total.getBytes();
	}
	,readFullBytes: function(s,pos,len) {
		while(len > 0) {
			var k = this.readBytes(s,pos,len);
			if(k == 0) {
				throw haxe_Exception.thrown(haxe_io_Error.Blocked);
			}
			pos += k;
			len -= k;
		}
	}
	,read: function(nbytes) {
		var s = new haxe_io_Bytes(new ArrayBuffer(nbytes));
		var p = 0;
		while(nbytes > 0) {
			var k = this.readBytes(s,p,nbytes);
			if(k == 0) {
				throw haxe_Exception.thrown(haxe_io_Error.Blocked);
			}
			p += k;
			nbytes -= k;
		}
		return s;
	}
	,readUntil: function(end) {
		var buf = new haxe_io_BytesBuffer();
		var last;
		while(true) {
			last = this.readByte();
			if(!(last != end)) {
				break;
			}
			buf.addByte(last);
		}
		return buf.getBytes().toString();
	}
	,readLine: function() {
		var buf = new haxe_io_BytesBuffer();
		var last;
		var s;
		try {
			while(true) {
				last = this.readByte();
				if(!(last != 10)) {
					break;
				}
				buf.addByte(last);
			}
			s = buf.getBytes().toString();
			if(HxOverrides.cca(s,s.length - 1) == 13) {
				s = HxOverrides.substr(s,0,-1);
			}
		} catch( _g ) {
			haxe_NativeStackTrace.lastError = _g;
			var _g1 = haxe_Exception.caught(_g).unwrap();
			if(((_g1) instanceof haxe_io_Eof)) {
				s = buf.getBytes().toString();
				if(s.length == 0) {
					throw haxe_Exception.thrown(_g1);
				}
			} else {
				throw _g;
			}
		}
		return s;
	}
	,readFloat: function() {
		return haxe_io_FPHelper.i32ToFloat(this.readInt32());
	}
	,readDouble: function() {
		var i1 = this.readInt32();
		var i2 = this.readInt32();
		if(this.bigEndian) {
			return haxe_io_FPHelper.i64ToDouble(i2,i1);
		} else {
			return haxe_io_FPHelper.i64ToDouble(i1,i2);
		}
	}
	,readInt8: function() {
		var n = this.readByte();
		if(n >= 128) {
			return n - 256;
		}
		return n;
	}
	,readInt16: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var n = this.bigEndian ? ch2 | ch1 << 8 : ch1 | ch2 << 8;
		if((n & 32768) != 0) {
			return n - 65536;
		}
		return n;
	}
	,readUInt16: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		if(this.bigEndian) {
			return ch2 | ch1 << 8;
		} else {
			return ch1 | ch2 << 8;
		}
	}
	,readInt24: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var ch3 = this.readByte();
		var n = this.bigEndian ? ch3 | ch2 << 8 | ch1 << 16 : ch1 | ch2 << 8 | ch3 << 16;
		if((n & 8388608) != 0) {
			return n - 16777216;
		}
		return n;
	}
	,readUInt24: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var ch3 = this.readByte();
		if(this.bigEndian) {
			return ch3 | ch2 << 8 | ch1 << 16;
		} else {
			return ch1 | ch2 << 8 | ch3 << 16;
		}
	}
	,readInt32: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var ch3 = this.readByte();
		var ch4 = this.readByte();
		if(this.bigEndian) {
			return ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24;
		} else {
			return ch1 | ch2 << 8 | ch3 << 16 | ch4 << 24;
		}
	}
	,readString: function(len,encoding) {
		var b = new haxe_io_Bytes(new ArrayBuffer(len));
		this.readFullBytes(b,0,len);
		return b.getString(0,len,encoding);
	}
	,getDoubleSig: function(bytes) {
		return ((bytes[1] & 15) << 16 | bytes[2] << 8 | bytes[3]) * 4294967296. + (bytes[4] >> 7) * 2147483648 + ((bytes[4] & 127) << 24 | bytes[5] << 16 | bytes[6] << 8 | bytes[7]);
	}
	,__class__: haxe_io_Input
	,__properties__: {set_bigEndian:"set_bigEndian"}
};
var _$Sys_FileInput = function(fd) {
	this.fd = fd;
};
$hxClasses["_Sys.FileInput"] = _$Sys_FileInput;
_$Sys_FileInput.__name__ = "_Sys.FileInput";
_$Sys_FileInput.__super__ = haxe_io_Input;
_$Sys_FileInput.prototype = $extend(haxe_io_Input.prototype,{
	fd: null
	,readByte: function() {
		var buf = js_node_buffer_Buffer.alloc(1);
		try {
			js_node_Fs.readSync(this.fd,buf,0,1,null);
		} catch( _g ) {
			haxe_NativeStackTrace.lastError = _g;
			var _g1 = haxe_Exception.caught(_g).unwrap();
			if(_g1.code == "EOF") {
				throw haxe_Exception.thrown(new haxe_io_Eof());
			} else {
				throw haxe_Exception.thrown(haxe_io_Error.Custom(_g1));
			}
		}
		return buf[0];
	}
	,readBytes: function(s,pos,len) {
		var data = s.b;
		var buf = js_node_buffer_Buffer.from(data.buffer,data.byteOffset,s.length);
		try {
			return js_node_Fs.readSync(this.fd,buf,pos,len,null);
		} catch( _g ) {
			haxe_NativeStackTrace.lastError = _g;
			var _g1 = haxe_Exception.caught(_g).unwrap();
			if(_g1.code == "EOF") {
				throw haxe_Exception.thrown(new haxe_io_Eof());
			} else {
				throw haxe_Exception.thrown(haxe_io_Error.Custom(_g1));
			}
		}
	}
	,close: function() {
		js_node_Fs.closeSync(this.fd);
	}
	,__class__: _$Sys_FileInput
});
var ValueType = $hxEnums["ValueType"] = { __ename__:"ValueType",__constructs__:null
	,TNull: {_hx_name:"TNull",_hx_index:0,__enum__:"ValueType",toString:$estr}
	,TInt: {_hx_name:"TInt",_hx_index:1,__enum__:"ValueType",toString:$estr}
	,TFloat: {_hx_name:"TFloat",_hx_index:2,__enum__:"ValueType",toString:$estr}
	,TBool: {_hx_name:"TBool",_hx_index:3,__enum__:"ValueType",toString:$estr}
	,TObject: {_hx_name:"TObject",_hx_index:4,__enum__:"ValueType",toString:$estr}
	,TFunction: {_hx_name:"TFunction",_hx_index:5,__enum__:"ValueType",toString:$estr}
	,TClass: ($_=function(c) { return {_hx_index:6,c:c,__enum__:"ValueType",toString:$estr}; },$_._hx_name="TClass",$_.__params__ = ["c"],$_)
	,TEnum: ($_=function(e) { return {_hx_index:7,e:e,__enum__:"ValueType",toString:$estr}; },$_._hx_name="TEnum",$_.__params__ = ["e"],$_)
	,TUnknown: {_hx_name:"TUnknown",_hx_index:8,__enum__:"ValueType",toString:$estr}
};
ValueType.__constructs__ = [ValueType.TNull,ValueType.TInt,ValueType.TFloat,ValueType.TBool,ValueType.TObject,ValueType.TFunction,ValueType.TClass,ValueType.TEnum,ValueType.TUnknown];
ValueType.__empty_constructs__ = [ValueType.TNull,ValueType.TInt,ValueType.TFloat,ValueType.TBool,ValueType.TObject,ValueType.TFunction,ValueType.TUnknown];
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = "Type";
Type.getClass = function(o) {
	return js_Boot.getClass(o);
};
Type.getEnum = function(o) {
	if(o == null) {
		return null;
	}
	return $hxEnums[o.__enum__];
};
Type.getSuperClass = function(c) {
	return c.__super__;
};
Type.getClassName = function(c) {
	return c.__name__;
};
Type.getEnumName = function(e) {
	return e.__ename__;
};
Type.resolveClass = function(name) {
	return $hxClasses[name];
};
Type.resolveEnum = function(name) {
	return $hxEnums[name];
};
Type.createInstance = function(cl,args) {
	return new (Function.prototype.bind.apply(cl,[null].concat(args)));
};
Type.createEmptyInstance = function(cl) {
	return Object.create(cl.prototype);
};
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) {
		throw haxe_Exception.thrown("No such constructor " + constr);
	}
	if(Reflect.isFunction(f)) {
		if(params == null) {
			throw haxe_Exception.thrown("Constructor " + constr + " need parameters");
		}
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) {
		throw haxe_Exception.thrown("Constructor " + constr + " does not need parameters");
	}
	return f;
};
Type.createEnumIndex = function(e,index,params) {
	var c;
	var _g = e.__constructs__[index];
	if(_g == null) {
		c = null;
	} else {
		var ctor = _g;
		c = ctor._hx_name;
	}
	if(c == null) {
		throw haxe_Exception.thrown(index + " is not a valid enum constructor index");
	}
	return Type.createEnum(e,c,params);
};
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
};
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	HxOverrides.remove(a,"__name__");
	HxOverrides.remove(a,"__interfaces__");
	HxOverrides.remove(a,"__properties__");
	HxOverrides.remove(a,"__super__");
	HxOverrides.remove(a,"__meta__");
	HxOverrides.remove(a,"prototype");
	return a;
};
Type.getEnumConstructs = function(e) {
	var _this = e.__constructs__;
	var result = new Array(_this.length);
	var _g = 0;
	var _g1 = _this.length;
	while(_g < _g1) {
		var i = _g++;
		result[i] = _this[i]._hx_name;
	}
	return result;
};
Type.typeof = function(v) {
	switch(typeof(v)) {
	case "boolean":
		return ValueType.TBool;
	case "function":
		if(v.__name__ || v.__ename__) {
			return ValueType.TObject;
		}
		return ValueType.TFunction;
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) {
			return ValueType.TInt;
		}
		return ValueType.TFloat;
	case "object":
		if(v == null) {
			return ValueType.TNull;
		}
		var e = v.__enum__;
		if(e != null) {
			return ValueType.TEnum($hxEnums[e]);
		}
		var c = js_Boot.getClass(v);
		if(c != null) {
			return ValueType.TClass(c);
		}
		return ValueType.TObject;
	case "string":
		return ValueType.TClass(String);
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
Type.enumEq = function(a,b) {
	if(a == b) {
		return true;
	}
	try {
		var e = a.__enum__;
		if(e == null || e != b.__enum__) {
			return false;
		}
		if(a._hx_index != b._hx_index) {
			return false;
		}
		var enm = $hxEnums[e];
		var params = enm.__constructs__[a._hx_index].__params__;
		var _g = 0;
		while(_g < params.length) {
			var f = params[_g];
			++_g;
			if(!Type.enumEq(a[f],b[f])) {
				return false;
			}
		}
	} catch( _g ) {
		haxe_NativeStackTrace.lastError = _g;
		return false;
	}
	return true;
};
Type.enumConstructor = function(e) {
	return $hxEnums[e.__enum__].__constructs__[e._hx_index]._hx_name;
};
Type.enumParameters = function(e) {
	var enm = $hxEnums[e.__enum__];
	var params = enm.__constructs__[e._hx_index].__params__;
	if(params != null) {
		var _g = [];
		var _g1 = 0;
		while(_g1 < params.length) {
			var p = params[_g1];
			++_g1;
			_g.push(e[p]);
		}
		return _g;
	} else {
		return [];
	}
};
Type.enumIndex = function(e) {
	return e._hx_index;
};
Type.allEnums = function(e) {
	return e.__empty_constructs__.slice();
};
var Util = function() { };
$hxClasses["Util"] = Util;
Util.__name__ = "Util";
Util.getCurrentDuration = function(duration) {
	var theshit = Math.floor(duration / 1000);
	var secs = "" + theshit % 60;
	var mins = "" + Math.floor(theshit / 60) % 60;
	var hour = "" + Math.floor(theshit / 3600) % 24;
	if(theshit < 0) {
		theshit = 0;
	}
	if(duration < 0) {
		duration = 0;
	}
	if(secs.length < 2) {
		secs = "0" + secs;
	}
	var shit = mins + ":" + secs;
	if(hour != "0") {
		if(mins.length < 2) {
			mins = "0" + mins;
		}
		shit = hour + ":" + mins + ":" + secs;
	}
	return shit;
};
var discord_$js_APIMessage = require("discord.js").APIMessage;
var discord_$js_Activity = require("discord.js").Activity;
var discord_$js_Application = require("discord.js").Application;
var discord_$js_Base = require("discord.js").Base;
var discord_$js_ApplicationCommandManager = require("discord.js").ApplicationCommandManager;
var discord_$js_BaseClient = require("discord.js").BaseClient;
var discord_$js_Emoji = require("discord.js").Emoji;
var discord_$js_BaseGuildEmoji = require("discord.js").BaseGuildEmoji;
var discord_$js_BaseManager = require("discord.js").BaseManager;
var discord_$js_BitField = require("discord.js").BitField;
var discord_$js_BroadcastDispatcher = require("discord.js").BroadcastDispatcher;
var discord_$js_Channel = require("discord.js").Channel;
var discord_$js_GuildChannel = require("discord.js").GuildChannel;
var discord_$js_CategoryChannel = require("discord.js").CategoryChannel;
var discord_$js_ChannelManager = require("discord.js").ChannelManager;
var discord_$js_Client = require("discord.js").Client;
var discord_$js_ClientApplication = require("discord.js").ClientApplication;
var discord_$js_User = require("discord.js").User;
var discord_$js_ClientUser = require("discord.js").ClientUser;
var discord_$js_ClientVoiceManager = require("discord.js").ClientVoiceManager;
var discordjs_collection_Collection = require("@discordjs/collection").Collection;
var discord_$js_Collection = require("discord.js").Collection;
var discord_$js_Collector = require("discord.js").Collector;
var discord_$js_DMChannel = require("discord.js").DMChannel;
var discord_$js_Guild = require("discord.js").Guild;
var discord_$js_GuildApplicationCommandManager = require("discord.js").GuildApplicationCommandManager;
var discord_$js_GuildAuditLogs = require("discord.js").GuildAuditLogs;
var discord_$js_GuildAuditLogsEntry = require("discord.js").GuildAuditLogsEntry;
var discord_$js_GuildChannelManager = require("discord.js").GuildChannelManager;
var discord_$js_GuildEmoji = require("discord.js").GuildEmoji;
var discord_$js_GuildEmojiManager = require("discord.js").GuildEmojiManager;
var discord_$js_GuildEmojiRoleManager = require("discord.js").GuildEmojiRoleManager;
var discord_$js_GuildManager = require("discord.js").GuildManager;
var discord_$js_GuildMember = require("discord.js").GuildMember;
var discord_$js_GuildMemberManager = require("discord.js").GuildMemberManager;
var discord_$js_OverridableManager = require("discord.js").OverridableManager;
var discord_$js_GuildMemberRoleManager = require("discord.js").GuildMemberRoleManager;
var discord_$js_GuildPreview = require("discord.js").GuildPreview;
var discord_$js_GuildPreviewEmoji = require("discord.js").GuildPreviewEmoji;
var discord_$js_GuildTemplate = require("discord.js").GuildTemplate;
var discord_$js_Integration = require("discord.js").Integration;
var discord_$js_IntegrationApplication = require("discord.js").IntegrationApplication;
var discord_$js_Invite = require("discord.js").Invite;
var discord_$js_Message = require("discord.js").Message;
var discord_$js_MessageAttachment = require("discord.js").MessageAttachment;
var discord_$js_MessageCollector = require("discord.js").MessageCollector;
var discord_$js_MessageEmbed = require("discord.js").MessageEmbed;
var discord_$js_MessageManager = require("discord.js").MessageManager;
var discord_$js_MessageMentions = require("discord.js").MessageMentions;
var discord_$js_MessageReaction = require("discord.js").MessageReaction;
var discord_$js_NewsChannel = require("discord.js").NewsChannel;
var discord_$js_PartialGroupDMChannel = require("discord.js").PartialGroupDMChannel;
var discord_$js_PermissionOverwrites = require("discord.js").PermissionOverwrites;
var discord_$js_Permissions = require("discord.js").Permissions;
var discord_$js_Presence = require("discord.js").Presence;
var discord_$js_PresenceManager = require("discord.js").PresenceManager;
var discord_$js_ReactionCollector = require("discord.js").ReactionCollector;
var discord_$js_ReactionEmoji = require("discord.js").ReactionEmoji;
var discord_$js_ReactionManager = require("discord.js").ReactionManager;
var discord_$js_ReactionUserManager = require("discord.js").ReactionUserManager;
var discord_$js_RichPresenceAssets = require("discord.js").RichPresenceAssets;
var discord_$js_Role = require("discord.js").Role;
var discord_$js_RoleManager = require("discord.js").RoleManager;
var discord_$js_Shard = require("discord.js").Shard;
var discord_$js_ShardClientUtil = require("discord.js").ShardClientUtil;
var discord_$js_ShardingManager = require("discord.js").ShardingManager;
var discord_$js_StreamDispatcher = require("discord.js").StreamDispatcher;
var discord_$js_Team = require("discord.js").Team;
var discord_$js_TeamMember = require("discord.js").TeamMember;
var discord_$js_TextChannel = require("discord.js").TextChannel;
var discord_$js_ThreadChannel = require("discord.js").ThreadChannel;
var discord_$js_ThreadManager = require("discord.js").ThreadManager;
var discord_$js_UserFlags = require("discord.js").UserFlags;
var discord_$js_UserManager = require("discord.js").UserManager;
var discord_$js_VoiceBroadcast = require("discord.js").VoiceBroadcast;
var discord_$js_VoiceChannel = require("discord.js").VoiceChannel;
var discord_$js_VoiceConnection = require("discord.js").VoiceConnection;
var discord_$js_VoiceReceiver = require("discord.js").VoiceReceiver;
var discord_$js_VoiceRegion = require("discord.js").VoiceRegion;
var discord_$js_VoiceState = require("discord.js").VoiceState;
var discord_$js_VoiceStateManager = require("discord.js").VoiceStateManager;
var discord_$js_WebSocketManager = require("discord.js").WebSocketManager;
var discord_$js_WebSocketShard = require("discord.js").WebSocketShard;
var discord_$js_Webhook = require("discord.js").Webhook;
var discord_$js_WebhookClient = require("discord.js").WebhookClient;
var discordjs_rest_CDN = require("@discordjs/rest").CDN;
var node_Events = require("events");
var discordjs_rest_REST = require("@discordjs/rest").REST;
var discordjs_rest_RequestManager = require("@discordjs/rest").RequestManager;
var haxe_StackItem = $hxEnums["haxe.StackItem"] = { __ename__:"haxe.StackItem",__constructs__:null
	,CFunction: {_hx_name:"CFunction",_hx_index:0,__enum__:"haxe.StackItem",toString:$estr}
	,Module: ($_=function(m) { return {_hx_index:1,m:m,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="Module",$_.__params__ = ["m"],$_)
	,FilePos: ($_=function(s,file,line,column) { return {_hx_index:2,s:s,file:file,line:line,column:column,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="FilePos",$_.__params__ = ["s","file","line","column"],$_)
	,Method: ($_=function(classname,method) { return {_hx_index:3,classname:classname,method:method,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="Method",$_.__params__ = ["classname","method"],$_)
	,LocalFunction: ($_=function(v) { return {_hx_index:4,v:v,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="LocalFunction",$_.__params__ = ["v"],$_)
};
haxe_StackItem.__constructs__ = [haxe_StackItem.CFunction,haxe_StackItem.Module,haxe_StackItem.FilePos,haxe_StackItem.Method,haxe_StackItem.LocalFunction];
haxe_StackItem.__empty_constructs__ = [haxe_StackItem.CFunction];
var haxe_CallStack = {};
haxe_CallStack.__properties__ = {get_length:"get_length"};
haxe_CallStack.get_length = function(this1) {
	return this1.length;
};
haxe_CallStack.callStack = function() {
	return haxe_NativeStackTrace.toHaxe(haxe_NativeStackTrace.callStack());
};
haxe_CallStack.exceptionStack = function(fullStack) {
	if(fullStack == null) {
		fullStack = false;
	}
	var eStack = haxe_NativeStackTrace.toHaxe(haxe_NativeStackTrace.exceptionStack());
	return fullStack ? eStack : haxe_CallStack.subtract(eStack,haxe_CallStack.callStack());
};
haxe_CallStack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	var _g1 = stack;
	while(_g < _g1.length) {
		var s = _g1[_g++];
		b.b += "\nCalled from ";
		haxe_CallStack.itemToString(b,s);
	}
	return b.b;
};
haxe_CallStack.subtract = function(this1,stack) {
	var startIndex = -1;
	var i = -1;
	while(++i < this1.length) {
		var _g = 0;
		var _g1 = stack.length;
		while(_g < _g1) if(haxe_CallStack.equalItems(this1[i],stack[_g++])) {
			if(startIndex < 0) {
				startIndex = i;
			}
			++i;
			if(i >= this1.length) {
				break;
			}
		} else {
			startIndex = -1;
		}
		if(startIndex >= 0) {
			break;
		}
	}
	if(startIndex >= 0) {
		return this1.slice(0,startIndex);
	} else {
		return this1;
	}
};
haxe_CallStack.copy = function(this1) {
	return this1.slice();
};
haxe_CallStack.get = function(this1,index) {
	return this1[index];
};
haxe_CallStack.asArray = function(this1) {
	return this1;
};
haxe_CallStack.equalItems = function(item1,item2) {
	if(item1 == null) {
		if(item2 == null) {
			return true;
		} else {
			return false;
		}
	} else {
		switch(item1._hx_index) {
		case 0:
			if(item2 == null) {
				return false;
			} else if(item2._hx_index == 0) {
				return true;
			} else {
				return false;
			}
			break;
		case 1:
			if(item2 == null) {
				return false;
			} else if(item2._hx_index == 1) {
				return item1.m == item2.m;
			} else {
				return false;
			}
			break;
		case 2:
			if(item2 == null) {
				return false;
			} else if(item2._hx_index == 2) {
				if(item1.file == item2.file && item1.line == item2.line && item1.column == item2.column) {
					return haxe_CallStack.equalItems(item1.s,item2.s);
				} else {
					return false;
				}
			} else {
				return false;
			}
			break;
		case 3:
			if(item2 == null) {
				return false;
			} else if(item2._hx_index == 3) {
				if(item1.classname == item2.classname) {
					return item1.method == item2.method;
				} else {
					return false;
				}
			} else {
				return false;
			}
			break;
		case 4:
			if(item2 == null) {
				return false;
			} else if(item2._hx_index == 4) {
				return item1.v == item2.v;
			} else {
				return false;
			}
			break;
		}
	}
};
haxe_CallStack.exceptionToString = function(e) {
	if(e.get_previous() == null) {
		var tmp = "Exception: " + e.toString();
		var tmp1 = e.get_stack();
		return tmp + (tmp1 == null ? "null" : haxe_CallStack.toString(tmp1));
	}
	var result = "";
	var e1 = e;
	var prev = null;
	while(e1 != null) {
		if(prev == null) {
			var result1 = "Exception: " + e1.get_message();
			var tmp = e1.get_stack();
			result = result1 + (tmp == null ? "null" : haxe_CallStack.toString(tmp)) + result;
		} else {
			var prevStack = haxe_CallStack.subtract(e1.get_stack(),prev.get_stack());
			result = "Exception: " + e1.get_message() + (prevStack == null ? "null" : haxe_CallStack.toString(prevStack)) + "\n\nNext " + result;
		}
		prev = e1;
		e1 = e1.get_previous();
	}
	return result;
};
haxe_CallStack.itemToString = function(b,s) {
	switch(s._hx_index) {
	case 0:
		b.b += "a C function";
		break;
	case 1:
		var _g = s.m;
		b.b = (b.b += "module ") + (_g == null ? "null" : "" + _g);
		break;
	case 2:
		var _g = s.s;
		var _g1 = s.file;
		var _g2 = s.line;
		var _g3 = s.column;
		if(_g != null) {
			haxe_CallStack.itemToString(b,_g);
			b.b += " (";
		}
		b.b = (b.b += _g1 == null ? "null" : "" + _g1) + " line ";
		b.b += _g2 == null ? "null" : "" + _g2;
		if(_g3 != null) {
			b.b = (b.b += " column ") + (_g3 == null ? "null" : "" + _g3);
		}
		if(_g != null) {
			b.b += ")";
		}
		break;
	case 3:
		var _g = s.classname;
		var _g1 = s.method;
		b.b = (b.b += Std.string(_g == null ? "<unknown>" : _g)) + ".";
		b.b += _g1 == null ? "null" : "" + _g1;
		break;
	case 4:
		var _g = s.v;
		b.b = (b.b += "local function #") + (_g == null ? "null" : "" + _g);
		break;
	}
};
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = "haxe.IMap";
haxe_IMap.__isInterface__ = true;
haxe_IMap.prototype = {
	get: null
	,set: null
	,exists: null
	,remove: null
	,keys: null
	,iterator: null
	,keyValueIterator: null
	,copy: null
	,toString: null
	,clear: null
	,__class__: haxe_IMap
};
var haxe_DynamicAccess = {};
haxe_DynamicAccess._new = function() {
	return { };
};
haxe_DynamicAccess.get = function(this1,key) {
	return this1[key];
};
haxe_DynamicAccess.set = function(this1,key,value) {
	return this1[key] = value;
};
haxe_DynamicAccess.exists = function(this1,key) {
	return Object.prototype.hasOwnProperty.call(this1,key);
};
haxe_DynamicAccess.remove = function(this1,key) {
	return Reflect.deleteField(this1,key);
};
haxe_DynamicAccess.keys = function(this1) {
	return Reflect.fields(this1);
};
haxe_DynamicAccess.copy = function(this1) {
	return Reflect.copy(this1);
};
haxe_DynamicAccess.iterator = function(this1) {
	return new haxe_iterators_DynamicAccessIterator(this1);
};
haxe_DynamicAccess.keyValueIterator = function(this1) {
	return new haxe_iterators_DynamicAccessKeyValueIterator(this1);
};
var haxe_Exception = function(message,previous,native) {
	Error.call(this,message);
	this.message = message;
	this.__previousException = previous;
	this.__nativeException = native != null ? native : this;
	this.__skipStack = 0;
	var old = Error.prepareStackTrace;
	Error.prepareStackTrace = function(e) { return e.stack; }
	if(((native) instanceof Error)) {
		this.stack = native.stack;
	} else {
		var e = null;
		if(Error.captureStackTrace) {
			Error.captureStackTrace(this,haxe_Exception);
			e = this;
		} else {
			e = new Error();
			if(typeof(e.stack) == "undefined") {
				try { throw e; } catch(_) {}
				this.__skipStack++;
			}
		}
		this.stack = e.stack;
	}
	Error.prepareStackTrace = old;
};
$hxClasses["haxe.Exception"] = haxe_Exception;
haxe_Exception.__name__ = "haxe.Exception";
haxe_Exception.caught = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value;
	} else if(((value) instanceof Error)) {
		return new haxe_Exception(value.message,null,value);
	} else {
		return new haxe_ValueException(value,null,value);
	}
};
haxe_Exception.thrown = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value.get_native();
	} else if(((value) instanceof Error)) {
		return value;
	} else {
		var e = new haxe_ValueException(value);
		e.__skipStack++;
		return e;
	}
};
haxe_Exception.__super__ = Error;
haxe_Exception.prototype = $extend(Error.prototype,{
	__skipStack: null
	,__nativeException: null
	,__previousException: null
	,unwrap: function() {
		return this.__nativeException;
	}
	,toString: function() {
		return this.get_message();
	}
	,details: function() {
		if(this.get_previous() == null) {
			var tmp = "Exception: " + this.toString();
			var tmp1 = this.get_stack();
			return tmp + (tmp1 == null ? "null" : haxe_CallStack.toString(tmp1));
		} else {
			var result = "";
			var e = this;
			var prev = null;
			while(e != null) {
				if(prev == null) {
					var result1 = "Exception: " + e.get_message();
					var tmp = e.get_stack();
					result = result1 + (tmp == null ? "null" : haxe_CallStack.toString(tmp)) + result;
				} else {
					var prevStack = haxe_CallStack.subtract(e.get_stack(),prev.get_stack());
					result = "Exception: " + e.get_message() + (prevStack == null ? "null" : haxe_CallStack.toString(prevStack)) + "\n\nNext " + result;
				}
				prev = e;
				e = e.get_previous();
			}
			return result;
		}
	}
	,__shiftStack: function() {
		this.__skipStack++;
	}
	,get_message: function() {
		return this.message;
	}
	,get_previous: function() {
		return this.__previousException;
	}
	,get_native: function() {
		return this.__nativeException;
	}
	,get_stack: function() {
		var _g = this.__exceptionStack;
		if(_g == null) {
			var value = haxe_NativeStackTrace.toHaxe(haxe_NativeStackTrace.normalize(this.stack),this.__skipStack);
			this.setProperty("__exceptionStack",value);
			return value;
		} else {
			return _g;
		}
	}
	,setProperty: function(name,value) {
		try {
			Object.defineProperty(this,name,{ value : value});
		} catch( _g ) {
			this[name] = value;
		}
	}
	,get___exceptionStack: function() {
		return this.__exceptionStack;
	}
	,set___exceptionStack: function(value) {
		this.setProperty("__exceptionStack",value);
		return value;
	}
	,get___skipStack: function() {
		return this.__skipStack;
	}
	,set___skipStack: function(value) {
		this.setProperty("__skipStack",value);
		return value;
	}
	,get___nativeException: function() {
		return this.__nativeException;
	}
	,set___nativeException: function(value) {
		this.setProperty("__nativeException",value);
		return value;
	}
	,get___previousException: function() {
		return this.__previousException;
	}
	,set___previousException: function(value) {
		this.setProperty("__previousException",value);
		return value;
	}
	,__class__: haxe_Exception
	,__properties__: {set___exceptionStack:"set___exceptionStack",get___exceptionStack:"get___exceptionStack",get_native:"get_native",get_previous:"get_previous",get_stack:"get_stack",get_message:"get_message"}
});
var haxe_Int32 = {};
haxe_Int32.negate = function(this1) {
	return ~this1 + 1 | 0;
};
haxe_Int32.preIncrement = function(this1) {
	this1 = ++this1 | 0;
	return this1;
};
haxe_Int32.postIncrement = function(this1) {
	var ret = this1++;
	this1 |= 0;
	return ret;
};
haxe_Int32.preDecrement = function(this1) {
	this1 = --this1 | 0;
	return this1;
};
haxe_Int32.postDecrement = function(this1) {
	var ret = this1--;
	this1 |= 0;
	return ret;
};
haxe_Int32.add = function(a,b) {
	return a + b | 0;
};
haxe_Int32.addInt = function(a,b) {
	return a + b | 0;
};
haxe_Int32.sub = function(a,b) {
	return a - b | 0;
};
haxe_Int32.subInt = function(a,b) {
	return a - b | 0;
};
haxe_Int32.intSub = function(a,b) {
	return a - b | 0;
};
haxe_Int32.mul = function(a,b) {
	return haxe_Int32._mul(a,b);
};
haxe_Int32.mulInt = function(a,b) {
	return haxe_Int32._mul(a,b);
};
haxe_Int32.toFloat = function(this1) {
	return this1;
};
haxe_Int32.ucompare = function(a,b) {
	if(a < 0) {
		if(b < 0) {
			return ~b - ~a | 0;
		} else {
			return 1;
		}
	}
	if(b < 0) {
		return -1;
	} else {
		return a - b | 0;
	}
};
haxe_Int32.clamp = function(x) {
	return x | 0;
};
var haxe_Int64 = {};
haxe_Int64.__properties__ = {get_low:"get_low",get_high:"get_high"};
haxe_Int64._new = function(x) {
	return x;
};
haxe_Int64.copy = function(this1) {
	return new haxe__$Int64__$_$_$Int64(this1.high,this1.low);
};
haxe_Int64.make = function(high,low) {
	return new haxe__$Int64__$_$_$Int64(high,low);
};
haxe_Int64.ofInt = function(x) {
	return new haxe__$Int64__$_$_$Int64(x >> 31,x);
};
haxe_Int64.toInt = function(x) {
	if(x.high != x.low >> 31) {
		throw haxe_Exception.thrown("Overflow");
	}
	return x.low;
};
haxe_Int64.is = function(val) {
	return ((val) instanceof haxe__$Int64__$_$_$Int64);
};
haxe_Int64.isInt64 = function(val) {
	return ((val) instanceof haxe__$Int64__$_$_$Int64);
};
haxe_Int64.getHigh = function(x) {
	return x.high;
};
haxe_Int64.getLow = function(x) {
	return x.low;
};
haxe_Int64.isNeg = function(x) {
	return x.high < 0;
};
haxe_Int64.isZero = function(x) {
	if(x.high == 0) {
		return x.low == 0;
	} else {
		return false;
	}
};
haxe_Int64.compare = function(a,b) {
	var v = a.high - b.high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a.low,b.low);
	}
	if(a.high < 0) {
		if(b.high < 0) {
			return v;
		} else {
			return -1;
		}
	} else if(b.high >= 0) {
		return v;
	} else {
		return 1;
	}
};
haxe_Int64.ucompare = function(a,b) {
	var v = haxe_Int32.ucompare(a.high,b.high);
	if(v != 0) {
		return v;
	} else {
		return haxe_Int32.ucompare(a.low,b.low);
	}
};
haxe_Int64.toStr = function(x) {
	return haxe_Int64.toString(x);
};
haxe_Int64.toString = function(this1) {
	var i = this1;
	if(i.high == 0 && i.low == 0) {
		return "0";
	}
	var str = "";
	var neg = false;
	if(i.high < 0) {
		neg = true;
	}
	var ten = new haxe__$Int64__$_$_$Int64(0,10);
	while(i.high != 0 || i.low != 0) {
		var r = haxe_Int64.divMod(i,ten);
		if(r.modulus.high < 0) {
			str = (~r.modulus.low + 1 | 0) + str;
			var x = r.quotient;
			var high = ~x.high;
			var low = ~x.low + 1 | 0;
			if(low == 0) {
				++high;
				high = high | 0;
			}
			i = new haxe__$Int64__$_$_$Int64(high,low);
		} else {
			str = r.modulus.low + str;
			i = r.quotient;
		}
	}
	if(neg) {
		str = "-" + str;
	}
	return str;
};
haxe_Int64.parseString = function(sParam) {
	return haxe_Int64Helper.parseString(sParam);
};
haxe_Int64.fromFloat = function(f) {
	return haxe_Int64Helper.fromFloat(f);
};
haxe_Int64.divMod = function(dividend,divisor) {
	if(divisor.high == 0) {
		switch(divisor.low) {
		case 0:
			throw haxe_Exception.thrown("divide by zero");
		case 1:
			return { quotient : new haxe__$Int64__$_$_$Int64(dividend.high,dividend.low), modulus : new haxe__$Int64__$_$_$Int64(0,0)};
		}
	}
	var divSign = dividend.high < 0 != divisor.high < 0;
	var modulus;
	if(dividend.high < 0) {
		var high = ~dividend.high;
		var low = ~dividend.low + 1 | 0;
		if(low == 0) {
			++high;
			high = high | 0;
		}
		modulus = new haxe__$Int64__$_$_$Int64(high,low);
	} else {
		modulus = new haxe__$Int64__$_$_$Int64(dividend.high,dividend.low);
	}
	if(divisor.high < 0) {
		var high = ~divisor.high;
		var low = ~divisor.low + 1 | 0;
		if(low == 0) {
			++high;
			high = high | 0;
		}
		divisor = new haxe__$Int64__$_$_$Int64(high,low);
	}
	var quotient = new haxe__$Int64__$_$_$Int64(0,0);
	var mask = new haxe__$Int64__$_$_$Int64(0,1);
	while(!(divisor.high < 0)) {
		var v = haxe_Int32.ucompare(divisor.high,modulus.high);
		var cmp = v != 0 ? v : haxe_Int32.ucompare(divisor.low,modulus.low);
		divisor = new haxe__$Int64__$_$_$Int64(divisor.high << 1 | divisor.low >>> 31,divisor.low << 1);
		mask = new haxe__$Int64__$_$_$Int64(mask.high << 1 | mask.low >>> 31,mask.low << 1);
		if(cmp >= 0) {
			break;
		}
	}
	while(mask.high != 0 || mask.low != 0) {
		var v = haxe_Int32.ucompare(modulus.high,divisor.high);
		if((v != 0 ? v : haxe_Int32.ucompare(modulus.low,divisor.low)) >= 0) {
			quotient = new haxe__$Int64__$_$_$Int64(quotient.high | mask.high,quotient.low | mask.low);
			var high = modulus.high - divisor.high | 0;
			if(haxe_Int32.ucompare(modulus.low,divisor.low) < 0) {
				--high;
				high = high | 0;
			}
			modulus = new haxe__$Int64__$_$_$Int64(high,modulus.low - divisor.low | 0);
		}
		mask = new haxe__$Int64__$_$_$Int64(mask.high >>> 1,mask.high << 31 | mask.low >>> 1);
		divisor = new haxe__$Int64__$_$_$Int64(divisor.high >>> 1,divisor.high << 31 | divisor.low >>> 1);
	}
	if(divSign) {
		var high = ~quotient.high;
		var low = ~quotient.low + 1 | 0;
		if(low == 0) {
			++high;
			high = high | 0;
		}
		quotient = new haxe__$Int64__$_$_$Int64(high,low);
	}
	if(dividend.high < 0) {
		var high = ~modulus.high;
		var low = ~modulus.low + 1 | 0;
		if(low == 0) {
			++high;
			high = high | 0;
		}
		modulus = new haxe__$Int64__$_$_$Int64(high,low);
	}
	return { quotient : quotient, modulus : modulus};
};
haxe_Int64.neg = function(x) {
	var high = ~x.high;
	var low = ~x.low + 1 | 0;
	if(low == 0) {
		++high;
		high = high | 0;
	}
	return new haxe__$Int64__$_$_$Int64(high,low);
};
haxe_Int64.preIncrement = function(this1) {
	var x = new haxe__$Int64__$_$_$Int64(this1.high,this1.low);
	this1 = x;
	x.low++;
	x.low = x.low | 0;
	if(x.low == 0) {
		x.high++;
		x.high = x.high | 0;
	}
	return x;
};
haxe_Int64.postIncrement = function(this1) {
	var ret = this1;
	var x = new haxe__$Int64__$_$_$Int64(this1.high,this1.low);
	this1 = x;
	x.low++;
	x.low = x.low | 0;
	if(x.low == 0) {
		x.high++;
		x.high = x.high | 0;
	}
	return ret;
};
haxe_Int64.preDecrement = function(this1) {
	var x = new haxe__$Int64__$_$_$Int64(this1.high,this1.low);
	this1 = x;
	if(x.low == 0) {
		x.high--;
		x.high = x.high | 0;
	}
	x.low--;
	x.low = x.low | 0;
	return x;
};
haxe_Int64.postDecrement = function(this1) {
	var ret = this1;
	var x = new haxe__$Int64__$_$_$Int64(this1.high,this1.low);
	this1 = x;
	if(x.low == 0) {
		x.high--;
		x.high = x.high | 0;
	}
	x.low--;
	x.low = x.low | 0;
	return ret;
};
haxe_Int64.add = function(a,b) {
	var high = a.high + b.high | 0;
	var low = a.low + b.low | 0;
	if(haxe_Int32.ucompare(low,a.low) < 0) {
		++high;
		high = high | 0;
	}
	return new haxe__$Int64__$_$_$Int64(high,low);
};
haxe_Int64.addInt = function(a,b) {
	var high = a.high + (b >> 31) | 0;
	var low = a.low + b | 0;
	if(haxe_Int32.ucompare(low,a.low) < 0) {
		++high;
		high = high | 0;
	}
	return new haxe__$Int64__$_$_$Int64(high,low);
};
haxe_Int64.sub = function(a,b) {
	var high = a.high - b.high | 0;
	if(haxe_Int32.ucompare(a.low,b.low) < 0) {
		--high;
		high = high | 0;
	}
	return new haxe__$Int64__$_$_$Int64(high,a.low - b.low | 0);
};
haxe_Int64.subInt = function(a,b) {
	var b_low = b;
	var high = a.high - (b >> 31) | 0;
	if(haxe_Int32.ucompare(a.low,b_low) < 0) {
		--high;
		high = high | 0;
	}
	return new haxe__$Int64__$_$_$Int64(high,a.low - b_low | 0);
};
haxe_Int64.intSub = function(a,b) {
	var a_low = a;
	var high = (a >> 31) - b.high | 0;
	if(haxe_Int32.ucompare(a_low,b.low) < 0) {
		--high;
		high = high | 0;
	}
	return new haxe__$Int64__$_$_$Int64(high,a_low - b.low | 0);
};
haxe_Int64.mul = function(a,b) {
	var al = a.low & 65535;
	var ah = a.low >>> 16;
	var bl = b.low & 65535;
	var bh = b.low >>> 16;
	var p00 = haxe_Int32._mul(al,bl);
	var p10 = haxe_Int32._mul(ah,bl);
	var p01 = haxe_Int32._mul(al,bh);
	var low = p00;
	var high = (haxe_Int32._mul(ah,bh) + (p01 >>> 16) | 0) + (p10 >>> 16) | 0;
	p01 <<= 16;
	low = p00 + p01 | 0;
	if(haxe_Int32.ucompare(low,p01) < 0) {
		++high;
		high = high | 0;
	}
	p10 <<= 16;
	low = low + p10 | 0;
	if(haxe_Int32.ucompare(low,p10) < 0) {
		++high;
		high = high | 0;
	}
	high = high + (haxe_Int32._mul(a.low,b.high) + haxe_Int32._mul(a.high,b.low) | 0) | 0;
	return new haxe__$Int64__$_$_$Int64(high,low);
};
haxe_Int64.mulInt = function(a,b) {
	var b_low = b;
	var al = a.low & 65535;
	var ah = a.low >>> 16;
	var bl = b_low & 65535;
	var bh = b_low >>> 16;
	var p00 = haxe_Int32._mul(al,bl);
	var p10 = haxe_Int32._mul(ah,bl);
	var p01 = haxe_Int32._mul(al,bh);
	var low = p00;
	var high = (haxe_Int32._mul(ah,bh) + (p01 >>> 16) | 0) + (p10 >>> 16) | 0;
	p01 <<= 16;
	low = p00 + p01 | 0;
	if(haxe_Int32.ucompare(low,p01) < 0) {
		++high;
		high = high | 0;
	}
	p10 <<= 16;
	low = low + p10 | 0;
	if(haxe_Int32.ucompare(low,p10) < 0) {
		++high;
		high = high | 0;
	}
	high = high + (haxe_Int32._mul(a.low,b >> 31) + haxe_Int32._mul(a.high,b_low) | 0) | 0;
	return new haxe__$Int64__$_$_$Int64(high,low);
};
haxe_Int64.div = function(a,b) {
	return haxe_Int64.divMod(a,b).quotient;
};
haxe_Int64.divInt = function(a,b) {
	return haxe_Int64.divMod(a,new haxe__$Int64__$_$_$Int64(b >> 31,b)).quotient;
};
haxe_Int64.intDiv = function(a,b) {
	var x = haxe_Int64.divMod(new haxe__$Int64__$_$_$Int64(a >> 31,a),b).quotient;
	if(x.high != x.low >> 31) {
		throw haxe_Exception.thrown("Overflow");
	}
	var x1 = x.low;
	return new haxe__$Int64__$_$_$Int64(x1 >> 31,x1);
};
haxe_Int64.mod = function(a,b) {
	return haxe_Int64.divMod(a,b).modulus;
};
haxe_Int64.modInt = function(a,b) {
	var x = haxe_Int64.divMod(a,new haxe__$Int64__$_$_$Int64(b >> 31,b)).modulus;
	if(x.high != x.low >> 31) {
		throw haxe_Exception.thrown("Overflow");
	}
	var x1 = x.low;
	return new haxe__$Int64__$_$_$Int64(x1 >> 31,x1);
};
haxe_Int64.intMod = function(a,b) {
	var x = haxe_Int64.divMod(new haxe__$Int64__$_$_$Int64(a >> 31,a),b).modulus;
	if(x.high != x.low >> 31) {
		throw haxe_Exception.thrown("Overflow");
	}
	var x1 = x.low;
	return new haxe__$Int64__$_$_$Int64(x1 >> 31,x1);
};
haxe_Int64.eq = function(a,b) {
	if(a.high == b.high) {
		return a.low == b.low;
	} else {
		return false;
	}
};
haxe_Int64.eqInt = function(a,b) {
	if(a.high == b >> 31) {
		return a.low == b;
	} else {
		return false;
	}
};
haxe_Int64.neq = function(a,b) {
	if(a.high == b.high) {
		return a.low != b.low;
	} else {
		return true;
	}
};
haxe_Int64.neqInt = function(a,b) {
	if(a.high == b >> 31) {
		return a.low != b;
	} else {
		return true;
	}
};
haxe_Int64.lt = function(a,b) {
	var v = a.high - b.high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a.low,b.low);
	}
	return (a.high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) < 0;
};
haxe_Int64.ltInt = function(a,b) {
	var b_high = b >> 31;
	var v = a.high - b_high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a.low,b);
	}
	return (a.high < 0 ? b_high < 0 ? v : -1 : b_high >= 0 ? v : 1) < 0;
};
haxe_Int64.intLt = function(a,b) {
	var a_high = a >> 31;
	var v = a_high - b.high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a,b.low);
	}
	return (a_high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) < 0;
};
haxe_Int64.lte = function(a,b) {
	var v = a.high - b.high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a.low,b.low);
	}
	return (a.high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) <= 0;
};
haxe_Int64.lteInt = function(a,b) {
	var b_high = b >> 31;
	var v = a.high - b_high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a.low,b);
	}
	return (a.high < 0 ? b_high < 0 ? v : -1 : b_high >= 0 ? v : 1) <= 0;
};
haxe_Int64.intLte = function(a,b) {
	var a_high = a >> 31;
	var v = a_high - b.high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a,b.low);
	}
	return (a_high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) <= 0;
};
haxe_Int64.gt = function(a,b) {
	var v = a.high - b.high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a.low,b.low);
	}
	return (a.high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) > 0;
};
haxe_Int64.gtInt = function(a,b) {
	var b_high = b >> 31;
	var v = a.high - b_high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a.low,b);
	}
	return (a.high < 0 ? b_high < 0 ? v : -1 : b_high >= 0 ? v : 1) > 0;
};
haxe_Int64.intGt = function(a,b) {
	var a_high = a >> 31;
	var v = a_high - b.high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a,b.low);
	}
	return (a_high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) > 0;
};
haxe_Int64.gte = function(a,b) {
	var v = a.high - b.high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a.low,b.low);
	}
	return (a.high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) >= 0;
};
haxe_Int64.gteInt = function(a,b) {
	var b_high = b >> 31;
	var v = a.high - b_high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a.low,b);
	}
	return (a.high < 0 ? b_high < 0 ? v : -1 : b_high >= 0 ? v : 1) >= 0;
};
haxe_Int64.intGte = function(a,b) {
	var a_high = a >> 31;
	var v = a_high - b.high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a,b.low);
	}
	return (a_high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) >= 0;
};
haxe_Int64.complement = function(a) {
	return new haxe__$Int64__$_$_$Int64(~a.high,~a.low);
};
haxe_Int64.and = function(a,b) {
	return new haxe__$Int64__$_$_$Int64(a.high & b.high,a.low & b.low);
};
haxe_Int64.or = function(a,b) {
	return new haxe__$Int64__$_$_$Int64(a.high | b.high,a.low | b.low);
};
haxe_Int64.xor = function(a,b) {
	return new haxe__$Int64__$_$_$Int64(a.high ^ b.high,a.low ^ b.low);
};
haxe_Int64.shl = function(a,b) {
	b &= 63;
	if(b == 0) {
		return new haxe__$Int64__$_$_$Int64(a.high,a.low);
	} else if(b < 32) {
		return new haxe__$Int64__$_$_$Int64(a.high << b | a.low >>> 32 - b,a.low << b);
	} else {
		return new haxe__$Int64__$_$_$Int64(a.low << b - 32,0);
	}
};
haxe_Int64.shr = function(a,b) {
	b &= 63;
	if(b == 0) {
		return new haxe__$Int64__$_$_$Int64(a.high,a.low);
	} else if(b < 32) {
		return new haxe__$Int64__$_$_$Int64(a.high >> b,a.high << 32 - b | a.low >>> b);
	} else {
		return new haxe__$Int64__$_$_$Int64(a.high >> 31,a.high >> b - 32);
	}
};
haxe_Int64.ushr = function(a,b) {
	b &= 63;
	if(b == 0) {
		return new haxe__$Int64__$_$_$Int64(a.high,a.low);
	} else if(b < 32) {
		return new haxe__$Int64__$_$_$Int64(a.high >>> b,a.high << 32 - b | a.low >>> b);
	} else {
		return new haxe__$Int64__$_$_$Int64(0,a.high >>> b - 32);
	}
};
haxe_Int64.get_high = function(this1) {
	return this1.high;
};
haxe_Int64.set_high = function(this1,x) {
	return this1.high = x;
};
haxe_Int64.get_low = function(this1) {
	return this1.low;
};
haxe_Int64.set_low = function(this1,x) {
	return this1.low = x;
};
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
$hxClasses["haxe._Int64.___Int64"] = haxe__$Int64__$_$_$Int64;
haxe__$Int64__$_$_$Int64.__name__ = "haxe._Int64.___Int64";
haxe__$Int64__$_$_$Int64.prototype = {
	high: null
	,low: null
	,toString: function() {
		return haxe_Int64.toString(this);
	}
	,__class__: haxe__$Int64__$_$_$Int64
};
var haxe_Int64Helper = function() { };
$hxClasses["haxe.Int64Helper"] = haxe_Int64Helper;
haxe_Int64Helper.__name__ = "haxe.Int64Helper";
haxe_Int64Helper.parseString = function(sParam) {
	var base_high = 0;
	var base_low = 10;
	var current = new haxe__$Int64__$_$_$Int64(0,0);
	var multiplier = new haxe__$Int64__$_$_$Int64(0,1);
	var sIsNegative = false;
	var s = StringTools.trim(sParam);
	if(s.charAt(0) == "-") {
		sIsNegative = true;
		s = s.substring(1,s.length);
	}
	var len = s.length;
	var _g = 0;
	while(_g < len) {
		var digitInt = HxOverrides.cca(s,len - 1 - _g++) - 48;
		if(digitInt < 0 || digitInt > 9) {
			throw haxe_Exception.thrown("NumberFormatError");
		}
		if(digitInt != 0) {
			var digit_high = digitInt >> 31;
			var digit_low = digitInt;
			if(sIsNegative) {
				var al = multiplier.low & 65535;
				var ah = multiplier.low >>> 16;
				var bl = digit_low & 65535;
				var bh = digit_low >>> 16;
				var p00 = haxe_Int32._mul(al,bl);
				var p10 = haxe_Int32._mul(ah,bl);
				var p01 = haxe_Int32._mul(al,bh);
				var low = p00;
				var high = (haxe_Int32._mul(ah,bh) + (p01 >>> 16) | 0) + (p10 >>> 16) | 0;
				p01 <<= 16;
				low = p00 + p01 | 0;
				if(haxe_Int32.ucompare(low,p01) < 0) {
					++high;
					high = high | 0;
				}
				p10 <<= 16;
				low = low + p10 | 0;
				if(haxe_Int32.ucompare(low,p10) < 0) {
					++high;
					high = high | 0;
				}
				high = high + (haxe_Int32._mul(multiplier.low,digit_high) + haxe_Int32._mul(multiplier.high,digit_low) | 0) | 0;
				var b_low = low;
				var high1 = current.high - high | 0;
				if(haxe_Int32.ucompare(current.low,b_low) < 0) {
					--high1;
					high1 = high1 | 0;
				}
				current = new haxe__$Int64__$_$_$Int64(high1,current.low - b_low | 0);
				if(!(current.high < 0)) {
					throw haxe_Exception.thrown("NumberFormatError: Underflow");
				}
			} else {
				var al1 = multiplier.low & 65535;
				var ah1 = multiplier.low >>> 16;
				var bl1 = digit_low & 65535;
				var bh1 = digit_low >>> 16;
				var p001 = haxe_Int32._mul(al1,bl1);
				var p101 = haxe_Int32._mul(ah1,bl1);
				var p011 = haxe_Int32._mul(al1,bh1);
				var low1 = p001;
				var high2 = (haxe_Int32._mul(ah1,bh1) + (p011 >>> 16) | 0) + (p101 >>> 16) | 0;
				p011 <<= 16;
				low1 = p001 + p011 | 0;
				if(haxe_Int32.ucompare(low1,p011) < 0) {
					++high2;
					high2 = high2 | 0;
				}
				p101 <<= 16;
				low1 = low1 + p101 | 0;
				if(haxe_Int32.ucompare(low1,p101) < 0) {
					++high2;
					high2 = high2 | 0;
				}
				high2 = high2 + (haxe_Int32._mul(multiplier.low,digit_high) + haxe_Int32._mul(multiplier.high,digit_low) | 0) | 0;
				var high3 = current.high + high2 | 0;
				var low2 = current.low + low1 | 0;
				if(haxe_Int32.ucompare(low2,current.low) < 0) {
					++high3;
					high3 = high3 | 0;
				}
				current = new haxe__$Int64__$_$_$Int64(high3,low2);
				if(current.high < 0) {
					throw haxe_Exception.thrown("NumberFormatError: Overflow");
				}
			}
		}
		var al2 = multiplier.low & 65535;
		var ah2 = multiplier.low >>> 16;
		var bl2 = base_low & 65535;
		var bh2 = base_low >>> 16;
		var p002 = haxe_Int32._mul(al2,bl2);
		var p102 = haxe_Int32._mul(ah2,bl2);
		var p012 = haxe_Int32._mul(al2,bh2);
		var low3 = p002;
		var high4 = (haxe_Int32._mul(ah2,bh2) + (p012 >>> 16) | 0) + (p102 >>> 16) | 0;
		p012 <<= 16;
		low3 = p002 + p012 | 0;
		if(haxe_Int32.ucompare(low3,p012) < 0) {
			++high4;
			high4 = high4 | 0;
		}
		p102 <<= 16;
		low3 = low3 + p102 | 0;
		if(haxe_Int32.ucompare(low3,p102) < 0) {
			++high4;
			high4 = high4 | 0;
		}
		high4 = high4 + (haxe_Int32._mul(multiplier.low,base_high) + haxe_Int32._mul(multiplier.high,base_low) | 0) | 0;
		multiplier = new haxe__$Int64__$_$_$Int64(high4,low3);
	}
	return current;
};
haxe_Int64Helper.fromFloat = function(f) {
	if(isNaN(f) || !isFinite(f)) {
		throw haxe_Exception.thrown("Number is NaN or Infinite");
	}
	var noFractions = f - f % 1;
	if(noFractions > 9007199254740991) {
		throw haxe_Exception.thrown("Conversion overflow");
	}
	if(noFractions < -9007199254740991) {
		throw haxe_Exception.thrown("Conversion underflow");
	}
	var result = new haxe__$Int64__$_$_$Int64(0,0);
	var neg = noFractions < 0;
	var rest = neg ? -noFractions : noFractions;
	var i = 0;
	while(rest >= 1) {
		var curr = rest % 2;
		rest /= 2;
		if(curr >= 1) {
			var a_high = 0;
			var a_low = 1;
			var b = i;
			b &= 63;
			var b1 = b == 0 ? new haxe__$Int64__$_$_$Int64(a_high,a_low) : b < 32 ? new haxe__$Int64__$_$_$Int64(a_high << b | a_low >>> 32 - b,a_low << b) : new haxe__$Int64__$_$_$Int64(a_low << b - 32,0);
			var high = result.high + b1.high | 0;
			var low = result.low + b1.low | 0;
			if(haxe_Int32.ucompare(low,result.low) < 0) {
				++high;
				high = high | 0;
			}
			result = new haxe__$Int64__$_$_$Int64(high,low);
		}
		++i;
	}
	if(neg) {
		var high = ~result.high;
		var low = ~result.low + 1 | 0;
		if(low == 0) {
			++high;
			high = high | 0;
		}
		result = new haxe__$Int64__$_$_$Int64(high,low);
	}
	return result;
};
var haxe_Log = function() { };
$hxClasses["haxe.Log"] = haxe_Log;
haxe_Log.__name__ = "haxe.Log";
haxe_Log.formatOutput = function(v,infos) {
	var str = Std.string(v);
	if(infos == null) {
		return str;
	}
	var pstr = infos.fileName + ":" + infos.lineNumber;
	if(infos.customParams != null) {
		var _g = 0;
		var _g1 = infos.customParams;
		while(_g < _g1.length) str += ", " + Std.string(_g1[_g++]);
	}
	return pstr + ": " + str;
};
haxe_Log.trace = function(v,infos) {
	var str = haxe_Log.formatOutput(v,infos);
	if(typeof(console) != "undefined" && console.log != null) {
		console.log(str);
	}
};
var haxe_NativeStackTrace = function() { };
$hxClasses["haxe.NativeStackTrace"] = haxe_NativeStackTrace;
haxe_NativeStackTrace.__name__ = "haxe.NativeStackTrace";
haxe_NativeStackTrace.lastError = null;
haxe_NativeStackTrace.wrapCallSite = null;
haxe_NativeStackTrace.saveStack = function(e) {
	haxe_NativeStackTrace.lastError = e;
};
haxe_NativeStackTrace.callStack = function() {
	var e = new Error("");
	var stack = haxe_NativeStackTrace.tryHaxeStack(e);
	if(typeof(stack) == "undefined") {
		try {
			throw e;
		} catch( _g ) {
		}
		stack = e.stack;
	}
	return haxe_NativeStackTrace.normalize(stack,2);
};
haxe_NativeStackTrace.exceptionStack = function() {
	return haxe_NativeStackTrace.normalize(haxe_NativeStackTrace.tryHaxeStack(haxe_NativeStackTrace.lastError));
};
haxe_NativeStackTrace.toHaxe = function(s,skip) {
	if(skip == null) {
		skip = 0;
	}
	if(s == null) {
		return [];
	} else if(typeof(s) == "string") {
		var stack = s.split("\n");
		if(stack[0] == "Error") {
			stack.shift();
		}
		var m = [];
		var _g = 0;
		var _g1 = stack.length;
		while(_g < _g1) {
			var i = _g++;
			if(skip > i) {
				continue;
			}
			var line = stack[i];
			var matched = line.match(/^    at ([A-Za-z0-9_. ]+) \(([^)]+):([0-9]+):([0-9]+)\)$/);
			if(matched != null) {
				var path = matched[1].split(".");
				if(path[0] == "$hxClasses") {
					path.shift();
				}
				var meth = path.pop();
				var file = matched[2];
				var line1 = Std.parseInt(matched[3]);
				var column = Std.parseInt(matched[4]);
				m.push(haxe_StackItem.FilePos(meth == "Anonymous function" ? haxe_StackItem.LocalFunction() : meth == "Global code" ? null : haxe_StackItem.Method(path.join("."),meth),file,line1,column));
			} else {
				m.push(haxe_StackItem.Module(StringTools.trim(line)));
			}
		}
		return m;
	} else if(skip > 0 && Array.isArray(s)) {
		return s.slice(skip);
	} else {
		return s;
	}
};
haxe_NativeStackTrace.tryHaxeStack = function(e) {
	if(e == null) {
		return [];
	}
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = haxe_NativeStackTrace.prepareHxStackTrace;
	Error.prepareStackTrace = oldValue;
	return e.stack;
};
haxe_NativeStackTrace.prepareHxStackTrace = function(e,callsites) {
	var stack = [];
	var _g = 0;
	while(_g < callsites.length) {
		var site = callsites[_g];
		++_g;
		if(haxe_NativeStackTrace.wrapCallSite != null) {
			site = haxe_NativeStackTrace.wrapCallSite(site);
		}
		var method = null;
		var fullName = site.getFunctionName();
		if(fullName != null) {
			var idx = fullName.lastIndexOf(".");
			if(idx >= 0) {
				method = haxe_StackItem.Method(fullName.substring(0,idx),fullName.substring(idx + 1));
			} else {
				method = haxe_StackItem.Method(null,fullName);
			}
		}
		var fileName = site.getFileName();
		var fileAddr = fileName == null ? -1 : fileName.indexOf("file:");
		if(haxe_NativeStackTrace.wrapCallSite != null && fileAddr > 0) {
			fileName = fileName.substring(fileAddr + 6);
		}
		stack.push(haxe_StackItem.FilePos(method,fileName,site.getLineNumber(),site.getColumnNumber()));
	}
	return stack;
};
haxe_NativeStackTrace.normalize = function(stack,skipItems) {
	if(skipItems == null) {
		skipItems = 0;
	}
	if(Array.isArray(stack) && skipItems > 0) {
		return stack.slice(skipItems);
	} else if(typeof(stack) == "string") {
		switch(stack.substring(0,6)) {
		case "Error\n":case "Error:":
			++skipItems;
			break;
		default:
		}
		return haxe_NativeStackTrace.skipLines(stack,skipItems);
	} else {
		return stack;
	}
};
haxe_NativeStackTrace.skipLines = function(stack,skip,pos) {
	if(pos == null) {
		pos = 0;
	}
	while(true) if(skip > 0) {
		pos = stack.indexOf("\n",pos);
		if(pos < 0) {
			return "";
		} else {
			skip = --skip;
			pos += 1;
			continue;
		}
	} else {
		return stack.substring(pos);
	}
};
var haxe_Rest = {};
haxe_Rest.__properties__ = {get_length:"get_length"};
haxe_Rest.get_length = function(this1) {
	return this1.length;
};
haxe_Rest.of = function(array) {
	return array;
};
haxe_Rest._new = function(array) {
	return array;
};
haxe_Rest.get = function(this1,index) {
	return this1[index];
};
haxe_Rest.toArray = function(this1) {
	return this1.slice();
};
haxe_Rest.iterator = function(this1) {
	return new haxe_iterators_RestIterator(this1);
};
haxe_Rest.keyValueIterator = function(this1) {
	return new haxe_iterators_RestKeyValueIterator(this1);
};
haxe_Rest.append = function(this1,item) {
	var result = this1.slice();
	result.push(item);
	return result;
};
haxe_Rest.prepend = function(this1,item) {
	var result = this1.slice();
	result.unshift(item);
	return result;
};
haxe_Rest.toString = function(this1) {
	return "[" + this1.toString() + "]";
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe_Timer;
haxe_Timer.__name__ = "haxe.Timer";
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.measure = function(f,pos) {
	var hrtime = process.hrtime();
	var t0 = hrtime[0] + hrtime[1] / 1e9;
	var r = f();
	var tmp = haxe_Log.trace;
	var hrtime = process.hrtime();
	tmp(hrtime[0] + hrtime[1] / 1e9 - t0 + "s",pos);
	return r;
};
haxe_Timer.stamp = function() {
	var hrtime = process.hrtime();
	return hrtime[0] + hrtime[1] / 1e9;
};
haxe_Timer.prototype = {
	id: null
	,stop: function() {
		if(this.id == null) {
			return;
		}
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe_Timer
};
var haxe_ValueException = function(value,previous,native) {
	haxe_Exception.call(this,String(value),previous,native);
	this.value = value;
	this.__skipStack++;
};
$hxClasses["haxe.ValueException"] = haxe_ValueException;
haxe_ValueException.__name__ = "haxe.ValueException";
haxe_ValueException.__super__ = haxe_Exception;
haxe_ValueException.prototype = $extend(haxe_Exception.prototype,{
	value: null
	,unwrap: function() {
		return this.value;
	}
	,__class__: haxe_ValueException
});
var haxe_ds_BalancedTree = function() {
};
$hxClasses["haxe.ds.BalancedTree"] = haxe_ds_BalancedTree;
haxe_ds_BalancedTree.__name__ = "haxe.ds.BalancedTree";
haxe_ds_BalancedTree.__interfaces__ = [haxe_IMap];
haxe_ds_BalancedTree.iteratorLoop = function(node,acc) {
	while(true) {
		if(node != null) {
			haxe_ds_BalancedTree.iteratorLoop(node.left,acc);
			acc.push(node.value);
			node = node.right;
			continue;
		}
		return;
	}
};
haxe_ds_BalancedTree.prototype = {
	root: null
	,set: function(key,value) {
		this.root = this.setLoop(key,value,this.root);
	}
	,get: function(key) {
		var node = this.root;
		while(node != null) {
			var c = this.compare(key,node.key);
			if(c == 0) {
				return node.value;
			}
			if(c < 0) {
				node = node.left;
			} else {
				node = node.right;
			}
		}
		return null;
	}
	,remove: function(key) {
		try {
			this.root = this.removeLoop(key,this.root);
			return true;
		} catch( _g ) {
			haxe_NativeStackTrace.lastError = _g;
			if(typeof(haxe_Exception.caught(_g).unwrap()) == "string") {
				return false;
			} else {
				throw _g;
			}
		}
	}
	,exists: function(key) {
		var node = this.root;
		while(node != null) {
			var c = this.compare(key,node.key);
			if(c == 0) {
				return true;
			} else if(c < 0) {
				node = node.left;
			} else {
				node = node.right;
			}
		}
		return false;
	}
	,iterator: function() {
		var ret = [];
		haxe_ds_BalancedTree.iteratorLoop(this.root,ret);
		return new haxe_iterators_ArrayIterator(ret);
	}
	,keyValueIterator: function() {
		return new haxe_iterators_MapKeyValueIterator(this);
	}
	,keys: function() {
		var ret = [];
		this.keysLoop(this.root,ret);
		return new haxe_iterators_ArrayIterator(ret);
	}
	,copy: function() {
		var copied = new haxe_ds_BalancedTree();
		copied.root = this.root;
		return copied;
	}
	,setLoop: function(k,v,node) {
		if(node == null) {
			return new haxe_ds_TreeNode(null,k,v,null);
		}
		var c = this.compare(k,node.key);
		if(c == 0) {
			return new haxe_ds_TreeNode(node.left,k,v,node.right,node == null ? 0 : node._height);
		} else if(c < 0) {
			return this.balance(this.setLoop(k,v,node.left),node.key,node.value,node.right);
		} else {
			var nr = this.setLoop(k,v,node.right);
			return this.balance(node.left,node.key,node.value,nr);
		}
	}
	,removeLoop: function(k,node) {
		if(node == null) {
			throw haxe_Exception.thrown("Not_found");
		}
		var c = this.compare(k,node.key);
		if(c == 0) {
			return this.merge(node.left,node.right);
		} else if(c < 0) {
			return this.balance(this.removeLoop(k,node.left),node.key,node.value,node.right);
		} else {
			return this.balance(node.left,node.key,node.value,this.removeLoop(k,node.right));
		}
	}
	,keysLoop: function(node,acc) {
		if(node != null) {
			this.keysLoop(node.left,acc);
			acc.push(node.key);
			this.keysLoop(node.right,acc);
		}
	}
	,merge: function(t1,t2) {
		if(t1 == null) {
			return t2;
		}
		if(t2 == null) {
			return t1;
		}
		var t = this.minBinding(t2);
		return this.balance(t1,t.key,t.value,this.removeMinBinding(t2));
	}
	,minBinding: function(t) {
		if(t == null) {
			throw haxe_Exception.thrown("Not_found");
		} else if(t.left == null) {
			return t;
		} else {
			return this.minBinding(t.left);
		}
	}
	,removeMinBinding: function(t) {
		if(t.left == null) {
			return t.right;
		} else {
			return this.balance(this.removeMinBinding(t.left),t.key,t.value,t.right);
		}
	}
	,balance: function(l,k,v,r) {
		var hl = l == null ? 0 : l._height;
		var hr = r == null ? 0 : r._height;
		if(hl > hr + 2) {
			var _this = l.left;
			var _this1 = l.right;
			if((_this == null ? 0 : _this._height) >= (_this1 == null ? 0 : _this1._height)) {
				return new haxe_ds_TreeNode(l.left,l.key,l.value,new haxe_ds_TreeNode(l.right,k,v,r));
			} else {
				return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l.left,l.key,l.value,l.right.left),l.right.key,l.right.value,new haxe_ds_TreeNode(l.right.right,k,v,r));
			}
		} else if(hr > hl + 2) {
			var _this = r.right;
			var _this1 = r.left;
			if((_this == null ? 0 : _this._height) > (_this1 == null ? 0 : _this1._height)) {
				return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left),r.key,r.value,r.right);
			} else {
				return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left.left),r.left.key,r.left.value,new haxe_ds_TreeNode(r.left.right,r.key,r.value,r.right));
			}
		} else {
			return new haxe_ds_TreeNode(l,k,v,r,(hl > hr ? hl : hr) + 1);
		}
	}
	,compare: function(k1,k2) {
		return Reflect.compare(k1,k2);
	}
	,toString: function() {
		if(this.root == null) {
			return "{}";
		} else {
			return "{" + this.root.toString() + "}";
		}
	}
	,clear: function() {
		this.root = null;
	}
	,__class__: haxe_ds_BalancedTree
};
var haxe_ds_TreeNode = function(l,k,v,r,h) {
	if(h == null) {
		h = -1;
	}
	this.left = l;
	this.key = k;
	this.value = v;
	this.right = r;
	if(h == -1) {
		var tmp;
		var _this = this.left;
		var _this1 = this.right;
		if((_this == null ? 0 : _this._height) > (_this1 == null ? 0 : _this1._height)) {
			var _this = this.left;
			tmp = _this == null ? 0 : _this._height;
		} else {
			var _this = this.right;
			tmp = _this == null ? 0 : _this._height;
		}
		this._height = tmp + 1;
	} else {
		this._height = h;
	}
};
$hxClasses["haxe.ds.TreeNode"] = haxe_ds_TreeNode;
haxe_ds_TreeNode.__name__ = "haxe.ds.TreeNode";
haxe_ds_TreeNode.prototype = {
	left: null
	,right: null
	,key: null
	,value: null
	,_height: null
	,toString: function() {
		return (this.left == null ? "" : this.left.toString() + ", ") + ("" + Std.string(this.key) + "=" + Std.string(this.value)) + (this.right == null ? "" : ", " + this.right.toString());
	}
	,__class__: haxe_ds_TreeNode
};
var haxe_ds_EnumValueMap = function() {
	haxe_ds_BalancedTree.call(this);
};
$hxClasses["haxe.ds.EnumValueMap"] = haxe_ds_EnumValueMap;
haxe_ds_EnumValueMap.__name__ = "haxe.ds.EnumValueMap";
haxe_ds_EnumValueMap.__interfaces__ = [haxe_IMap];
haxe_ds_EnumValueMap.__super__ = haxe_ds_BalancedTree;
haxe_ds_EnumValueMap.prototype = $extend(haxe_ds_BalancedTree.prototype,{
	compare: function(k1,k2) {
		var d = k1._hx_index - k2._hx_index;
		if(d != 0) {
			return d;
		}
		var p1 = Type.enumParameters(k1);
		var p2 = Type.enumParameters(k2);
		if(p1.length == 0 && p2.length == 0) {
			return 0;
		}
		return this.compareArgs(p1,p2);
	}
	,compareArgs: function(a1,a2) {
		var ld = a1.length - a2.length;
		if(ld != 0) {
			return ld;
		}
		var _g = 0;
		var _g1 = a1.length;
		while(_g < _g1) {
			var i = _g++;
			var d = this.compareArg(a1[i],a2[i]);
			if(d != 0) {
				return d;
			}
		}
		return 0;
	}
	,compareArg: function(v1,v2) {
		if(Reflect.isEnumValue(v1) && Reflect.isEnumValue(v2)) {
			return this.compare(v1,v2);
		} else if(((v1) instanceof Array) && ((v2) instanceof Array)) {
			return this.compareArgs(v1,v2);
		} else {
			return Reflect.compare(v1,v2);
		}
	}
	,copy: function() {
		var copied = new haxe_ds_EnumValueMap();
		copied.root = this.root;
		return copied;
	}
	,__class__: haxe_ds_EnumValueMap
});
var haxe_ds_HashMap = {};
haxe_ds_HashMap._new = function() {
	return new haxe_ds__$HashMap_HashMapData();
};
haxe_ds_HashMap.set = function(this1,k,v) {
	var _this = this1.keys;
	var key = k.hashCode();
	_this.h[key] = k;
	var _this = this1.values;
	var key = k.hashCode();
	_this.h[key] = v;
};
haxe_ds_HashMap.get = function(this1,k) {
	var _this = this1.values;
	var key = k.hashCode();
	return _this.h[key];
};
haxe_ds_HashMap.exists = function(this1,k) {
	var _this = this1.values;
	var key = k.hashCode();
	return _this.h.hasOwnProperty(key);
};
haxe_ds_HashMap.remove = function(this1,k) {
	this1.values.remove(k.hashCode());
	return this1.keys.remove(k.hashCode());
};
haxe_ds_HashMap.keys = function(this1) {
	return this1.keys.iterator();
};
haxe_ds_HashMap.copy = function(this1) {
	var copied = new haxe_ds__$HashMap_HashMapData();
	copied.keys = this1.keys.copy();
	copied.values = this1.values.copy();
	return copied;
};
haxe_ds_HashMap.iterator = function(this1) {
	return this1.values.iterator();
};
haxe_ds_HashMap.keyValueIterator = function(this1) {
	return new haxe_iterators_HashMapKeyValueIterator(this1);
};
haxe_ds_HashMap.clear = function(this1) {
	this1.keys.h = { };
	this1.values.h = { };
};
var haxe_ds__$HashMap_HashMapData = function() {
	this.keys = new haxe_ds_IntMap();
	this.values = new haxe_ds_IntMap();
};
$hxClasses["haxe.ds._HashMap.HashMapData"] = haxe_ds__$HashMap_HashMapData;
haxe_ds__$HashMap_HashMapData.__name__ = "haxe.ds._HashMap.HashMapData";
haxe_ds__$HashMap_HashMapData.prototype = {
	keys: null
	,values: null
	,__class__: haxe_ds__$HashMap_HashMapData
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap;
haxe_ds_IntMap.__name__ = "haxe.ds.IntMap";
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	h: null
	,set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) {
			return false;
		}
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) if(this.h.hasOwnProperty(key)) a.push(+key);
		return new haxe_iterators_ArrayIterator(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,keyValueIterator: function() {
		return new haxe_iterators_MapKeyValueIterator(this);
	}
	,copy: function() {
		var copied = new haxe_ds_IntMap();
		var key = this.keys();
		while(key.hasNext()) {
			var key1 = key.next();
			copied.h[key1] = this.h[key1];
		}
		return copied;
	}
	,toString: function() {
		var s_b = "";
		s_b = "{";
		var it = this.keys();
		while(it.hasNext()) {
			var i = it.next();
			s_b += i == null ? "null" : "" + i;
			s_b += " => ";
			s_b += Std.string(Std.string(this.h[i]));
			if(it.hasNext()) {
				s_b += ", ";
			}
		}
		s_b += "}";
		return s_b;
	}
	,clear: function() {
		this.h = { };
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_Map = {};
haxe_ds_Map.set = function(this1,key,value) {
	this1.set(key,value);
};
haxe_ds_Map.get = function(this1,key) {
	return this1.get(key);
};
haxe_ds_Map.exists = function(this1,key) {
	return this1.exists(key);
};
haxe_ds_Map.remove = function(this1,key) {
	return this1.remove(key);
};
haxe_ds_Map.keys = function(this1) {
	return this1.keys();
};
haxe_ds_Map.iterator = function(this1) {
	return this1.iterator();
};
haxe_ds_Map.keyValueIterator = function(this1) {
	return this1.keyValueIterator();
};
haxe_ds_Map.copy = function(this1) {
	return this1.copy();
};
haxe_ds_Map.toString = function(this1) {
	return this1.toString();
};
haxe_ds_Map.clear = function(this1) {
	this1.clear();
};
haxe_ds_Map.arrayWrite = function(this1,k,v) {
	this1.set(k,v);
	return v;
};
haxe_ds_Map.toStringMap = function(t) {
	return new haxe_ds_StringMap();
};
haxe_ds_Map.toIntMap = function(t) {
	return new haxe_ds_IntMap();
};
haxe_ds_Map.toEnumValueMapMap = function(t) {
	return new haxe_ds_EnumValueMap();
};
haxe_ds_Map.toObjectMap = function(t) {
	return new haxe_ds_ObjectMap();
};
haxe_ds_Map.fromStringMap = function(map) {
	return map;
};
haxe_ds_Map.fromIntMap = function(map) {
	return map;
};
haxe_ds_Map.fromObjectMap = function(map) {
	return map;
};
var haxe_ds_ObjectMap = function() {
	this.h = { __keys__ : { }};
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = "haxe.ds.ObjectMap";
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.count = null;
haxe_ds_ObjectMap.assignId = function(obj) {
	return (obj.__id__ = $global.$haxeUID++);
};
haxe_ds_ObjectMap.getId = function(obj) {
	return obj.__id__;
};
haxe_ds_ObjectMap.prototype = {
	h: null
	,set: function(key,value) {
		var id = key.__id__;
		if(id == null) {
			id = (key.__id__ = $global.$haxeUID++);
		}
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,get: function(key) {
		return this.h[key.__id__];
	}
	,exists: function(key) {
		return this.h.__keys__[key.__id__] != null;
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) {
			return false;
		}
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) {
			a.push(this.h.__keys__[key]);
		}
		}
		return new haxe_iterators_ArrayIterator(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i.__id__];
		}};
	}
	,keyValueIterator: function() {
		return new haxe_iterators_MapKeyValueIterator(this);
	}
	,copy: function() {
		var copied = new haxe_ds_ObjectMap();
		var key = this.keys();
		while(key.hasNext()) {
			var key1 = key.next();
			copied.set(key1,this.h[key1.__id__]);
		}
		return copied;
	}
	,toString: function() {
		var s_b = "";
		s_b = "{";
		var it = this.keys();
		while(it.hasNext()) {
			var i = it.next();
			s_b += Std.string(Std.string(i));
			s_b += " => ";
			s_b += Std.string(Std.string(this.h[i.__id__]));
			if(it.hasNext()) {
				s_b += ", ";
			}
		}
		s_b += "}";
		return s_b;
	}
	,clear: function() {
		this.h = { __keys__ : { }};
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds_ReadOnlyArray = {};
haxe_ds_ReadOnlyArray.__properties__ = {get_length:"get_length"};
haxe_ds_ReadOnlyArray.get_length = function(this1) {
	return this1.length;
};
haxe_ds_ReadOnlyArray.get = function(this1,i) {
	return this1[i];
};
haxe_ds_ReadOnlyArray.concat = function(this1,a) {
	return this1.concat(a);
};
var haxe_ds_StringMap = function() {
	this.h = Object.create(null);
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = "haxe.ds.StringMap";
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.createCopy = function(h) {
	var copy = new haxe_ds_StringMap();
	for (var key in h) copy.h[key] = h[key];
	return copy;
};
haxe_ds_StringMap.stringify = function(h) {
	var s = "{";
	var first = true;
	for (var key in h) {
		if (first) first = false; else s += ',';
		s += key + ' => ' + Std.string(h[key]);
	}
	return s + "}";
};
haxe_ds_StringMap.prototype = {
	h: null
	,exists: function(key) {
		return Object.prototype.hasOwnProperty.call(this.h,key);
	}
	,get: function(key) {
		return this.h[key];
	}
	,set: function(key,value) {
		this.h[key] = value;
	}
	,remove: function(key) {
		if(Object.prototype.hasOwnProperty.call(this.h,key)) {
			delete(this.h[key]);
			return true;
		} else {
			return false;
		}
	}
	,keys: function() {
		return new haxe_ds__$StringMap_StringMapKeyIterator(this.h);
	}
	,iterator: function() {
		return new haxe_ds__$StringMap_StringMapValueIterator(this.h);
	}
	,keyValueIterator: function() {
		return new haxe_ds__$StringMap_StringMapKeyValueIterator(this.h);
	}
	,copy: function() {
		return haxe_ds_StringMap.createCopy(this.h);
	}
	,clear: function() {
		this.h = Object.create(null);
	}
	,toString: function() {
		return haxe_ds_StringMap.stringify(this.h);
	}
	,__class__: haxe_ds_StringMap
};
var haxe_ds__$StringMap_StringMapKeyIterator = function(h) {
	this.h = h;
	this.keys = Object.keys(h);
	this.length = this.keys.length;
	this.current = 0;
};
$hxClasses["haxe.ds._StringMap.StringMapKeyIterator"] = haxe_ds__$StringMap_StringMapKeyIterator;
haxe_ds__$StringMap_StringMapKeyIterator.__name__ = "haxe.ds._StringMap.StringMapKeyIterator";
haxe_ds__$StringMap_StringMapKeyIterator.prototype = {
	h: null
	,keys: null
	,length: null
	,current: null
	,hasNext: function() {
		return this.current < this.length;
	}
	,next: function() {
		return this.keys[this.current++];
	}
	,__class__: haxe_ds__$StringMap_StringMapKeyIterator
};
var haxe_ds__$StringMap_StringMapValueIterator = function(h) {
	this.h = h;
	this.keys = Object.keys(h);
	this.length = this.keys.length;
	this.current = 0;
};
$hxClasses["haxe.ds._StringMap.StringMapValueIterator"] = haxe_ds__$StringMap_StringMapValueIterator;
haxe_ds__$StringMap_StringMapValueIterator.__name__ = "haxe.ds._StringMap.StringMapValueIterator";
haxe_ds__$StringMap_StringMapValueIterator.prototype = {
	h: null
	,keys: null
	,length: null
	,current: null
	,hasNext: function() {
		return this.current < this.length;
	}
	,next: function() {
		return this.h[this.keys[this.current++]];
	}
	,__class__: haxe_ds__$StringMap_StringMapValueIterator
};
var haxe_ds__$StringMap_StringMapKeyValueIterator = function(h) {
	this.h = h;
	this.keys = Object.keys(h);
	this.length = this.keys.length;
	this.current = 0;
};
$hxClasses["haxe.ds._StringMap.StringMapKeyValueIterator"] = haxe_ds__$StringMap_StringMapKeyValueIterator;
haxe_ds__$StringMap_StringMapKeyValueIterator.__name__ = "haxe.ds._StringMap.StringMapKeyValueIterator";
haxe_ds__$StringMap_StringMapKeyValueIterator.prototype = {
	h: null
	,keys: null
	,length: null
	,current: null
	,hasNext: function() {
		return this.current < this.length;
	}
	,next: function() {
		var key = this.keys[this.current++];
		return { key : key, value : this.h[key]};
	}
	,__class__: haxe_ds__$StringMap_StringMapKeyValueIterator
};
var haxe_ds_WeakMap = function() {
	throw new haxe_exceptions_NotImplementedException("Not implemented for this platform",null,{ fileName : "haxe/ds/WeakMap.hx", lineNumber : 39, className : "haxe.ds.WeakMap", methodName : "new"});
};
$hxClasses["haxe.ds.WeakMap"] = haxe_ds_WeakMap;
haxe_ds_WeakMap.__name__ = "haxe.ds.WeakMap";
haxe_ds_WeakMap.__interfaces__ = [haxe_IMap];
haxe_ds_WeakMap.prototype = {
	set: function(key,value) {
	}
	,get: function(key) {
		return null;
	}
	,exists: function(key) {
		return false;
	}
	,remove: function(key) {
		return false;
	}
	,keys: function() {
		return null;
	}
	,iterator: function() {
		return null;
	}
	,keyValueIterator: function() {
		return null;
	}
	,copy: function() {
		return null;
	}
	,toString: function() {
		return null;
	}
	,clear: function() {
	}
	,__class__: haxe_ds_WeakMap
};
var haxe_exceptions_PosException = function(message,previous,pos) {
	haxe_Exception.call(this,message,previous);
	if(pos == null) {
		this.posInfos = { fileName : "(unknown)", lineNumber : 0, className : "(unknown)", methodName : "(unknown)"};
	} else {
		this.posInfos = pos;
	}
	this.__skipStack++;
};
$hxClasses["haxe.exceptions.PosException"] = haxe_exceptions_PosException;
haxe_exceptions_PosException.__name__ = "haxe.exceptions.PosException";
haxe_exceptions_PosException.__super__ = haxe_Exception;
haxe_exceptions_PosException.prototype = $extend(haxe_Exception.prototype,{
	posInfos: null
	,toString: function() {
		return "" + haxe_Exception.prototype.toString.call(this) + " in " + this.posInfos.className + "." + this.posInfos.methodName + " at " + this.posInfos.fileName + ":" + this.posInfos.lineNumber;
	}
	,__class__: haxe_exceptions_PosException
});
var haxe_exceptions_NotImplementedException = function(message,previous,pos) {
	if(message == null) {
		message = "Not implemented";
	}
	haxe_exceptions_PosException.call(this,message,previous,pos);
	this.__skipStack++;
};
$hxClasses["haxe.exceptions.NotImplementedException"] = haxe_exceptions_NotImplementedException;
haxe_exceptions_NotImplementedException.__name__ = "haxe.exceptions.NotImplementedException";
haxe_exceptions_NotImplementedException.__super__ = haxe_exceptions_PosException;
haxe_exceptions_NotImplementedException.prototype = $extend(haxe_exceptions_PosException.prototype,{
	__class__: haxe_exceptions_NotImplementedException
});
var haxe_http_HttpBase = function(url) {
	this.url = url;
	this.headers = [];
	this.params = [];
	this.emptyOnData = $bind(this,this.onData);
};
$hxClasses["haxe.http.HttpBase"] = haxe_http_HttpBase;
haxe_http_HttpBase.__name__ = "haxe.http.HttpBase";
haxe_http_HttpBase.prototype = {
	url: null
	,responseBytes: null
	,responseAsString: null
	,postData: null
	,postBytes: null
	,headers: null
	,params: null
	,emptyOnData: null
	,setHeader: function(name,value) {
		var _g = 0;
		var _g1 = this.headers.length;
		while(_g < _g1) {
			var i = _g++;
			if(this.headers[i].name == name) {
				this.headers[i] = { name : name, value : value};
				return;
			}
		}
		this.headers.push({ name : name, value : value});
	}
	,addHeader: function(header,value) {
		this.headers.push({ name : header, value : value});
	}
	,setParameter: function(name,value) {
		var _g = 0;
		var _g1 = this.params.length;
		while(_g < _g1) {
			var i = _g++;
			if(this.params[i].name == name) {
				this.params[i] = { name : name, value : value};
				return;
			}
		}
		this.params.push({ name : name, value : value});
	}
	,addParameter: function(name,value) {
		this.params.push({ name : name, value : value});
	}
	,setPostData: function(data) {
		this.postData = data;
		this.postBytes = null;
	}
	,setPostBytes: function(data) {
		this.postBytes = data;
		this.postData = null;
	}
	,request: function(post) {
		throw new haxe_exceptions_NotImplementedException(null,null,{ fileName : "haxe/http/HttpBase.hx", lineNumber : 186, className : "haxe.http.HttpBase", methodName : "request"});
	}
	,onData: function(data) {
	}
	,onBytes: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
	,hasOnData: function() {
		return !Reflect.compareMethods($bind(this,this.onData),this.emptyOnData);
	}
	,success: function(data) {
		this.responseBytes = data;
		this.responseAsString = null;
		if(this.hasOnData()) {
			this.onData(this.get_responseData());
		}
		this.onBytes(this.responseBytes);
	}
	,get_responseData: function() {
		if(this.responseAsString == null && this.responseBytes != null) {
			this.responseAsString = this.responseBytes.getString(0,this.responseBytes.length,haxe_io_Encoding.UTF8);
		}
		return this.responseAsString;
	}
	,__class__: haxe_http_HttpBase
	,__properties__: {get_responseData:"get_responseData"}
};
var haxe_http_HttpNodeJs = function(url) {
	haxe_http_HttpBase.call(this,url);
};
$hxClasses["haxe.http.HttpNodeJs"] = haxe_http_HttpNodeJs;
haxe_http_HttpNodeJs.__name__ = "haxe.http.HttpNodeJs";
haxe_http_HttpNodeJs.__super__ = haxe_http_HttpBase;
haxe_http_HttpNodeJs.prototype = $extend(haxe_http_HttpBase.prototype,{
	req: null
	,cancel: function() {
		if(this.req == null) {
			return;
		}
		this.req.abort();
		this.req = null;
	}
	,request: function(post) {
		var _gthis = this;
		this.responseAsString = null;
		this.responseBytes = null;
		var parsedUrl = new js_node_url_URL(this.url);
		var secure = parsedUrl.protocol == "https:";
		var host = parsedUrl.hostname;
		var path = parsedUrl.pathname;
		var port = parsedUrl.port != null ? Std.parseInt(parsedUrl.port) : secure ? 443 : 80;
		var h = { };
		var _g = 0;
		var _g1 = this.headers;
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			var arr = Reflect.field(h,i.name);
			if(arr == null) {
				arr = [];
				h[i.name] = arr;
			}
			arr.push(i.value);
		}
		if(this.postData != null || this.postBytes != null) {
			post = true;
		}
		var uri = null;
		var _g = 0;
		var _g1 = this.params;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			if(uri == null) {
				uri = "";
			} else {
				uri += "&";
			}
			var s = p.name;
			var uri1 = encodeURIComponent(s) + "=";
			var s1 = p.value;
			uri += uri1 + encodeURIComponent(s1);
		}
		var question = path.split("?").length <= 1;
		if(uri != null) {
			path += (question ? "?" : "&") + uri;
		}
		var opts = { protocol : parsedUrl.protocol, hostname : host, port : port, method : post ? "POST" : "GET", path : path, headers : h};
		var httpResponse = function(res) {
			res.setEncoding("binary");
			var s = res.statusCode;
			if(s != null) {
				_gthis.onStatus(s);
			}
			var data = [];
			res.on("data",function(chunk) {
				data.push(js_node_buffer_Buffer.from(chunk,"binary"));
			});
			res.on("end",function(_) {
				var buf = data.length == 1 ? data[0] : js_node_buffer_Buffer.concat(data);
				var httpResponse = buf.buffer.slice(buf.byteOffset,buf.byteOffset + buf.byteLength);
				_gthis.responseBytes = haxe_io_Bytes.ofData(httpResponse);
				_gthis.req = null;
				if(s != null && s >= 200 && s < 400) {
					_gthis.success(_gthis.responseBytes);
				} else {
					_gthis.onError("Http Error #" + s);
				}
			});
		};
		this.req = secure ? js_node_Https.request(opts,httpResponse) : js_node_Http.request(opts,httpResponse);
		if(post) {
			if(this.postData != null) {
				this.req.write(this.postData);
			} else if(this.postBytes != null) {
				this.req.setHeader("Content-Length","" + this.postBytes.length);
				this.req.write(js_node_buffer_Buffer.from(this.postBytes.b.bufferValue));
			}
		}
		this.req.end();
	}
	,__class__: haxe_http_HttpNodeJs
});
var haxe_io_ArrayBufferView = {};
haxe_io_ArrayBufferView.__properties__ = {get_byteLength:"get_byteLength",get_byteOffset:"get_byteOffset",get_buffer:"get_buffer"};
haxe_io_ArrayBufferView._new = function(size) {
	return new Uint8Array(size);
};
haxe_io_ArrayBufferView.get_byteOffset = function(this1) {
	return this1.byteOffset;
};
haxe_io_ArrayBufferView.get_byteLength = function(this1) {
	return this1.byteLength;
};
haxe_io_ArrayBufferView.get_buffer = function(this1) {
	return haxe_io_Bytes.ofData(this1.buffer);
};
haxe_io_ArrayBufferView.sub = function(this1,begin,length) {
	return new Uint8Array(this1.buffer,begin,length == null ? this1.buffer.byteLength - begin : length);
};
haxe_io_ArrayBufferView.getData = function(this1) {
	return this1;
};
haxe_io_ArrayBufferView.fromData = function(a) {
	return a;
};
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = "haxe.io.Bytes";
haxe_io_Bytes.alloc = function(length) {
	return new haxe_io_Bytes(new ArrayBuffer(length));
};
haxe_io_Bytes.ofString = function(s,encoding) {
	if(encoding == haxe_io_Encoding.RawNative) {
		var buf = new Uint8Array(s.length << 1);
		var _g = 0;
		var _g1 = s.length;
		while(_g < _g1) {
			var i = _g++;
			var c = s.charCodeAt(i);
			buf[i << 1] = c & 255;
			buf[i << 1 | 1] = c >> 8;
		}
		return new haxe_io_Bytes(buf.buffer);
	}
	var a = [];
	var i = 0;
	while(i < s.length) {
		var c = s.charCodeAt(i++);
		if(55296 <= c && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(i++) & 1023;
		}
		if(c <= 127) {
			a.push(c);
		} else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer);
};
haxe_io_Bytes.ofData = function(b) {
	var hb = b.hxBytes;
	if(hb != null) {
		return hb;
	}
	return new haxe_io_Bytes(b);
};
haxe_io_Bytes.ofHex = function(s) {
	if((s.length & 1) != 0) {
		throw haxe_Exception.thrown("Not a hex string (odd number of digits)");
	}
	var a = [];
	var i = 0;
	var len = s.length >> 1;
	while(i < len) {
		var high = s.charCodeAt(i * 2);
		var low = s.charCodeAt(i * 2 + 1);
		high = (high & 15) + ((high & 64) >> 6) * 9;
		low = (low & 15) + ((low & 64) >> 6) * 9;
		a.push((high << 4 | low) & 255);
		++i;
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer);
};
haxe_io_Bytes.fastGet = function(b,pos) {
	return b.bytes[pos];
};
haxe_io_Bytes.prototype = {
	length: null
	,b: null
	,data: null
	,get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v;
	}
	,blit: function(pos,src,srcpos,len) {
		if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(srcpos == 0 && len == src.b.byteLength) {
			this.b.set(src.b,pos);
		} else {
			this.b.set(src.b.subarray(srcpos,srcpos + len),pos);
		}
	}
	,fill: function(pos,len,value) {
		var _g = 0;
		while(_g < len) {
			++_g;
			this.b[pos++] = value;
		}
	}
	,sub: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		return new haxe_io_Bytes(this.b.buffer.slice(pos + this.b.byteOffset,pos + this.b.byteOffset + len));
	}
	,compare: function(other) {
		var b1 = this.b;
		var b2 = other.b;
		var _g = 0;
		var _g1 = this.length < other.length ? this.length : other.length;
		while(_g < _g1) {
			var i = _g++;
			if(b1[i] != b2[i]) {
				return b1[i] - b2[i];
			}
		}
		return this.length - other.length;
	}
	,initData: function() {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
	}
	,getDouble: function(pos) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		return this.data.getFloat64(pos,true);
	}
	,getFloat: function(pos) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		return this.data.getFloat32(pos,true);
	}
	,setDouble: function(pos,v) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		this.data.setFloat64(pos,v,true);
	}
	,setFloat: function(pos,v) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		this.data.setFloat32(pos,v,true);
	}
	,getUInt16: function(pos) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		return this.data.getUint16(pos,true);
	}
	,setUInt16: function(pos,v) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		this.data.setUint16(pos,v,true);
	}
	,getInt32: function(pos) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		return this.data.getInt32(pos,true);
	}
	,setInt32: function(pos,v) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		this.data.setInt32(pos,v,true);
	}
	,getInt64: function(pos) {
		return new haxe__$Int64__$_$_$Int64(this.getInt32(pos + 4),this.getInt32(pos));
	}
	,setInt64: function(pos,v) {
		this.setInt32(pos,v.low);
		this.setInt32(pos + 4,v.high);
	}
	,getString: function(pos,len,encoding) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(encoding == null) {
			encoding = haxe_io_Encoding.UTF8;
		}
		var s = "";
		var b = this.b;
		var i = pos;
		var max = pos + len;
		switch(encoding._hx_index) {
		case 0:
			while(i < max) {
				var c = b[i++];
				if(c < 128) {
					if(c == 0) {
						break;
					}
					s += String.fromCodePoint(c);
				} else if(c < 224) {
					var code = (c & 63) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else if(c < 240) {
					var code1 = (c & 31) << 12 | (b[i++] & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code1);
				} else {
					var u = (c & 15) << 18 | (b[i++] & 127) << 12 | (b[i++] & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(u);
				}
			}
			break;
		case 1:
			while(i < max) {
				var c = b[i++] | b[i++] << 8;
				s += String.fromCodePoint(c);
			}
			break;
		}
		return s;
	}
	,readString: function(pos,len) {
		return this.getString(pos,len);
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,toHex: function() {
		var s_b = "";
		var chars = [];
		var str = "0123456789abcdef";
		var _g = 0;
		var _g1 = str.length;
		while(_g < _g1) chars.push(HxOverrides.cca(str,_g++));
		var _g = 0;
		var _g1 = this.length;
		while(_g < _g1) {
			var c = this.b[_g++];
			s_b += String.fromCodePoint(chars[c >> 4]);
			s_b += String.fromCodePoint(chars[c & 15]);
		}
		return s_b;
	}
	,getData: function() {
		return this.b.bufferValue;
	}
	,__class__: haxe_io_Bytes
};
var haxe_io_BytesBuffer = function() {
	this.pos = 0;
	this.size = 0;
};
$hxClasses["haxe.io.BytesBuffer"] = haxe_io_BytesBuffer;
haxe_io_BytesBuffer.__name__ = "haxe.io.BytesBuffer";
haxe_io_BytesBuffer.prototype = {
	buffer: null
	,view: null
	,u8: null
	,pos: null
	,size: null
	,get_length: function() {
		return this.pos;
	}
	,addByte: function(byte) {
		if(this.pos == this.size) {
			this.grow(1);
		}
		this.view.setUint8(this.pos++,byte);
	}
	,add: function(src) {
		if(this.pos + src.length > this.size) {
			this.grow(src.length);
		}
		if(this.size == 0) {
			return;
		}
		this.u8.set(new Uint8Array(src.b.buffer,src.b.byteOffset,src.length),this.pos);
		this.pos += src.length;
	}
	,addString: function(v,encoding) {
		this.add(haxe_io_Bytes.ofString(v,encoding));
	}
	,addInt32: function(v) {
		if(this.pos + 4 > this.size) {
			this.grow(4);
		}
		this.view.setInt32(this.pos,v,true);
		this.pos += 4;
	}
	,addInt64: function(v) {
		if(this.pos + 8 > this.size) {
			this.grow(8);
		}
		this.view.setInt32(this.pos,v.low,true);
		this.view.setInt32(this.pos + 4,v.high,true);
		this.pos += 8;
	}
	,addFloat: function(v) {
		if(this.pos + 4 > this.size) {
			this.grow(4);
		}
		this.view.setFloat32(this.pos,v,true);
		this.pos += 4;
	}
	,addDouble: function(v) {
		if(this.pos + 8 > this.size) {
			this.grow(8);
		}
		this.view.setFloat64(this.pos,v,true);
		this.pos += 8;
	}
	,addBytes: function(src,pos,len) {
		if(pos < 0 || len < 0 || pos + len > src.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(this.pos + len > this.size) {
			this.grow(len);
		}
		if(this.size == 0) {
			return;
		}
		this.u8.set(new Uint8Array(src.b.buffer,src.b.byteOffset + pos,len),this.pos);
		this.pos += len;
	}
	,grow: function(delta) {
		var req = this.pos + delta;
		var nsize = this.size == 0 ? 16 : this.size;
		while(nsize < req) nsize = nsize * 3 >> 1;
		var nbuf = new ArrayBuffer(nsize);
		var nu8 = new Uint8Array(nbuf);
		if(this.size > 0) {
			nu8.set(this.u8);
		}
		this.size = nsize;
		this.buffer = nbuf;
		this.u8 = nu8;
		this.view = new DataView(this.buffer);
	}
	,getBytes: function() {
		if(this.size == 0) {
			return new haxe_io_Bytes(new ArrayBuffer(0));
		}
		var b = new haxe_io_Bytes(this.buffer);
		b.length = this.pos;
		return b;
	}
	,__class__: haxe_io_BytesBuffer
	,__properties__: {get_length:"get_length"}
};
var haxe_io_Encoding = $hxEnums["haxe.io.Encoding"] = { __ename__:"haxe.io.Encoding",__constructs__:null
	,UTF8: {_hx_name:"UTF8",_hx_index:0,__enum__:"haxe.io.Encoding",toString:$estr}
	,RawNative: {_hx_name:"RawNative",_hx_index:1,__enum__:"haxe.io.Encoding",toString:$estr}
};
haxe_io_Encoding.__constructs__ = [haxe_io_Encoding.UTF8,haxe_io_Encoding.RawNative];
haxe_io_Encoding.__empty_constructs__ = [haxe_io_Encoding.UTF8,haxe_io_Encoding.RawNative];
var haxe_io_Eof = function() {
};
$hxClasses["haxe.io.Eof"] = haxe_io_Eof;
haxe_io_Eof.__name__ = "haxe.io.Eof";
haxe_io_Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe_io_Eof
};
var haxe_io_Error = $hxEnums["haxe.io.Error"] = { __ename__:"haxe.io.Error",__constructs__:null
	,Blocked: {_hx_name:"Blocked",_hx_index:0,__enum__:"haxe.io.Error",toString:$estr}
	,Overflow: {_hx_name:"Overflow",_hx_index:1,__enum__:"haxe.io.Error",toString:$estr}
	,OutsideBounds: {_hx_name:"OutsideBounds",_hx_index:2,__enum__:"haxe.io.Error",toString:$estr}
	,Custom: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"haxe.io.Error",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["e"],$_)
};
haxe_io_Error.__constructs__ = [haxe_io_Error.Blocked,haxe_io_Error.Overflow,haxe_io_Error.OutsideBounds,haxe_io_Error.Custom];
haxe_io_Error.__empty_constructs__ = [haxe_io_Error.Blocked,haxe_io_Error.Overflow,haxe_io_Error.OutsideBounds];
var haxe_io_FPHelper = function() { };
$hxClasses["haxe.io.FPHelper"] = haxe_io_FPHelper;
haxe_io_FPHelper.__name__ = "haxe.io.FPHelper";
haxe_io_FPHelper._i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var e = i >> 23 & 255;
	if(e == 255) {
		if((i & 8388607) == 0) {
			if(sign > 0) {
				return Infinity;
			} else {
				return -Infinity;
			}
		} else {
			return NaN;
		}
	}
	return sign * (e == 0 ? (i & 8388607) << 1 : i & 8388607 | 8388608) * Math.pow(2,e - 150);
};
haxe_io_FPHelper._i64ToDouble = function(lo,hi) {
	var sign = 1 - (hi >>> 31 << 1);
	var e = hi >> 20 & 2047;
	if(e == 2047) {
		if(lo == 0 && (hi & 1048575) == 0) {
			if(sign > 0) {
				return Infinity;
			} else {
				return -Infinity;
			}
		} else {
			return NaN;
		}
	}
	var m = 2.220446049250313e-16 * ((hi & 1048575) * 4294967296. + (lo >>> 31) * 2147483648. + (lo & 2147483647));
	if(e == 0) {
		m *= 2.0;
	} else {
		m += 1.0;
	}
	return sign * m * Math.pow(2,e - 1023);
};
haxe_io_FPHelper._floatToI32 = function(f) {
	if(f == 0) {
		return 0;
	}
	var af = f < 0 ? -f : f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp > 127) {
		return 2139095040;
	} else {
		if(exp <= -127) {
			exp = -127;
			af *= 7.1362384635298e+44;
		} else {
			af = (af / Math.pow(2,exp) - 1.0) * 8388608;
		}
		return (f < 0 ? -2147483648 : 0) | exp + 127 << 23 | Math.round(af);
	}
};
haxe_io_FPHelper._doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else if(!isFinite(v)) {
		i64.low = 0;
		i64.high = v > 0 ? 2146435072 : -1048576;
	} else {
		var av = v < 0 ? -v : v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		if(exp > 1023) {
			i64.low = -1;
			i64.high = 2146435071;
		} else {
			if(exp <= -1023) {
				exp = -1023;
				av /= 2.2250738585072014e-308;
			} else {
				av = av / Math.pow(2,exp) - 1.0;
			}
			var sig = Math.round(av * 4503599627370496.);
			i64.low = sig | 0;
			i64.high = (v < 0 ? -2147483648 : 0) | exp + 1023 << 20 | (sig / 4294967296.0 | 0);
		}
	}
	return i64;
};
haxe_io_FPHelper.i32ToFloat = function(i) {
	haxe_io_FPHelper.helper.setInt32(0,i,true);
	return haxe_io_FPHelper.helper.getFloat32(0,true);
};
haxe_io_FPHelper.floatToI32 = function(f) {
	haxe_io_FPHelper.helper.setFloat32(0,f,true);
	return haxe_io_FPHelper.helper.getInt32(0,true);
};
haxe_io_FPHelper.i64ToDouble = function(low,high) {
	haxe_io_FPHelper.helper.setInt32(0,low,true);
	haxe_io_FPHelper.helper.setInt32(4,high,true);
	return haxe_io_FPHelper.helper.getFloat64(0,true);
};
haxe_io_FPHelper.doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	haxe_io_FPHelper.helper.setFloat64(0,v,true);
	i64.low = haxe_io_FPHelper.helper.getInt32(0,true);
	i64.high = haxe_io_FPHelper.helper.getInt32(4,true);
	return i64;
};
var haxe_io_Path = function(path) {
	switch(path) {
	case ".":case "..":
		this.dir = path;
		this.file = "";
		return;
	}
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		this.dir = HxOverrides.substr(path,0,c2);
		path = HxOverrides.substr(path,c2 + 1,null);
		this.backslash = true;
	} else if(c2 < c1) {
		this.dir = HxOverrides.substr(path,0,c1);
		path = HxOverrides.substr(path,c1 + 1,null);
	} else {
		this.dir = null;
	}
	var cp = path.lastIndexOf(".");
	if(cp != -1) {
		this.ext = HxOverrides.substr(path,cp + 1,null);
		this.file = HxOverrides.substr(path,0,cp);
	} else {
		this.ext = null;
		this.file = path;
	}
};
$hxClasses["haxe.io.Path"] = haxe_io_Path;
haxe_io_Path.__name__ = "haxe.io.Path";
haxe_io_Path.withoutExtension = function(path) {
	var s = new haxe_io_Path(path);
	s.ext = null;
	return s.toString();
};
haxe_io_Path.withoutDirectory = function(path) {
	var s = new haxe_io_Path(path);
	s.dir = null;
	return s.toString();
};
haxe_io_Path.directory = function(path) {
	var s = new haxe_io_Path(path);
	if(s.dir == null) {
		return "";
	}
	return s.dir;
};
haxe_io_Path.extension = function(path) {
	var s = new haxe_io_Path(path);
	if(s.ext == null) {
		return "";
	}
	return s.ext;
};
haxe_io_Path.withExtension = function(path,ext) {
	var s = new haxe_io_Path(path);
	s.ext = ext;
	return s.toString();
};
haxe_io_Path.join = function(paths) {
	var _g = [];
	var _g1 = 0;
	while(_g1 < paths.length) {
		var v = paths[_g1];
		++_g1;
		if(v != null && v != "") {
			_g.push(v);
		}
	}
	if(_g.length == 0) {
		return "";
	}
	var path = _g[0];
	var _g1 = 1;
	var _g2 = _g.length;
	while(_g1 < _g2) {
		path = haxe_io_Path.addTrailingSlash(path);
		path += _g[_g1++];
	}
	return haxe_io_Path.normalize(path);
};
haxe_io_Path.normalize = function(path) {
	var slash = "/";
	path = path.split("\\").join(slash);
	if(path == slash) {
		return slash;
	}
	var target = [];
	var _g = 0;
	var _g1 = path.split(slash);
	while(_g < _g1.length) {
		var token = _g1[_g];
		++_g;
		if(token == ".." && target.length > 0 && target[target.length - 1] != "..") {
			target.pop();
		} else if(token == "") {
			if(target.length > 0 || HxOverrides.cca(path,0) == 47) {
				target.push(token);
			}
		} else if(token != ".") {
			target.push(token);
		}
	}
	var acc_b = "";
	var colon = false;
	var slashes = false;
	var _g2_offset = 0;
	var _g2_s = target.join(slash);
	while(_g2_offset < _g2_s.length) {
		var s = _g2_s;
		var index = _g2_offset++;
		var c = s.charCodeAt(index);
		if(c >= 55296 && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(index + 1) & 1023;
		}
		var c1 = c;
		if(c1 >= 65536) {
			++_g2_offset;
		}
		var c2 = c1;
		switch(c2) {
		case 47:
			if(!colon) {
				slashes = true;
			} else {
				var i = c2;
				colon = false;
				if(slashes) {
					acc_b += "/";
					slashes = false;
				}
				acc_b += String.fromCodePoint(i);
			}
			break;
		case 58:
			acc_b += ":";
			colon = true;
			break;
		default:
			var i1 = c2;
			colon = false;
			if(slashes) {
				acc_b += "/";
				slashes = false;
			}
			acc_b += String.fromCodePoint(i1);
		}
	}
	return acc_b;
};
haxe_io_Path.addTrailingSlash = function(path) {
	if(path.length == 0) {
		return "/";
	}
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		if(c2 != path.length - 1) {
			return path + "\\";
		} else {
			return path;
		}
	} else if(c1 != path.length - 1) {
		return path + "/";
	} else {
		return path;
	}
};
haxe_io_Path.removeTrailingSlashes = function(path) {
	_hx_loop1: while(true) {
		var _g = HxOverrides.cca(path,path.length - 1);
		if(_g == null) {
			break;
		} else {
			switch(_g) {
			case 47:case 92:
				path = HxOverrides.substr(path,0,-1);
				break;
			default:
				break _hx_loop1;
			}
		}
	}
	return path;
};
haxe_io_Path.isAbsolute = function(path) {
	if(StringTools.startsWith(path,"/")) {
		return true;
	}
	if(path.charAt(1) == ":") {
		return true;
	}
	if(StringTools.startsWith(path,"\\\\")) {
		return true;
	}
	return false;
};
haxe_io_Path.unescape = function(path) {
	return new EReg("-x([0-9][0-9])","g").map(path,function(regex) {
		var code = Std.parseInt(regex.matched(1));
		return String.fromCodePoint(code);
	});
};
haxe_io_Path.escape = function(path,allowSlashes) {
	if(allowSlashes == null) {
		allowSlashes = false;
	}
	return (allowSlashes ? new EReg("[^A-Za-z0-9_/\\\\\\.]","g") : new EReg("[^A-Za-z0-9_\\.]","g")).map(path,function(v) {
		return "-x" + HxOverrides.cca(v.matched(0),0);
	});
};
haxe_io_Path.prototype = {
	dir: null
	,file: null
	,ext: null
	,backslash: null
	,toString: function() {
		return (this.dir == null ? "" : this.dir + (this.backslash ? "\\" : "/")) + this.file + (this.ext == null ? "" : "." + this.ext);
	}
	,__class__: haxe_io_Path
};
var haxe_io_UInt8Array = {};
haxe_io_UInt8Array.__properties__ = {get_view:"get_view",get_length:"get_length"};
haxe_io_UInt8Array._new = function(elements) {
	return new Uint8Array(elements);
};
haxe_io_UInt8Array.get_length = function(this1) {
	return this1.length;
};
haxe_io_UInt8Array.get_view = function(this1) {
	return this1;
};
haxe_io_UInt8Array.get = function(this1,index) {
	return this1[index];
};
haxe_io_UInt8Array.set = function(this1,index,value) {
	return this1[index] = value;
};
haxe_io_UInt8Array.sub = function(this1,begin,length) {
	return this1.subarray(begin,length == null ? this1.length : begin + length);
};
haxe_io_UInt8Array.subarray = function(this1,begin,end) {
	return this1.subarray(begin,end);
};
haxe_io_UInt8Array.getData = function(this1) {
	return this1;
};
haxe_io_UInt8Array.fromData = function(d) {
	return d;
};
haxe_io_UInt8Array.fromArray = function(a,pos,length) {
	if(pos == null) {
		pos = 0;
	}
	if(length == null) {
		length = a.length - pos;
	}
	if(pos < 0 || length < 0 || pos + length > a.length) {
		throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
	}
	if(pos == 0 && length == a.length) {
		return new Uint8Array(a);
	}
	var i = new Uint8Array(a.length);
	var _g = 0;
	var _g1 = length;
	while(_g < _g1) {
		var idx = _g++;
		i[idx] = a[idx + pos];
	}
	return i;
};
haxe_io_UInt8Array.fromBytes = function(bytes,bytePos,length) {
	if(bytePos == null) {
		bytePos = 0;
	}
	if(length == null) {
		length = bytes.length - bytePos;
	}
	return new Uint8Array(bytes.b.bufferValue,bytePos,length);
};
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
$hxClasses["haxe.iterators.ArrayIterator"] = haxe_iterators_ArrayIterator;
haxe_iterators_ArrayIterator.__name__ = "haxe.iterators.ArrayIterator";
haxe_iterators_ArrayIterator.prototype = {
	array: null
	,current: null
	,hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
	,__class__: haxe_iterators_ArrayIterator
};
var haxe_iterators_ArrayKeyValueIterator = function(array) {
	this.current = 0;
	this.array = array;
};
$hxClasses["haxe.iterators.ArrayKeyValueIterator"] = haxe_iterators_ArrayKeyValueIterator;
haxe_iterators_ArrayKeyValueIterator.__name__ = "haxe.iterators.ArrayKeyValueIterator";
haxe_iterators_ArrayKeyValueIterator.prototype = {
	current: null
	,array: null
	,hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return { value : this.array[this.current], key : this.current++};
	}
	,__class__: haxe_iterators_ArrayKeyValueIterator
};
var haxe_iterators_DynamicAccessIterator = function(access) {
	this.access = access;
	this.keys = Reflect.fields(access);
	this.index = 0;
};
$hxClasses["haxe.iterators.DynamicAccessIterator"] = haxe_iterators_DynamicAccessIterator;
haxe_iterators_DynamicAccessIterator.__name__ = "haxe.iterators.DynamicAccessIterator";
haxe_iterators_DynamicAccessIterator.prototype = {
	access: null
	,keys: null
	,index: null
	,hasNext: function() {
		return this.index < this.keys.length;
	}
	,next: function() {
		return this.access[this.keys[this.index++]];
	}
	,__class__: haxe_iterators_DynamicAccessIterator
};
var haxe_iterators_DynamicAccessKeyValueIterator = function(access) {
	this.access = access;
	this.keys = Reflect.fields(access);
	this.index = 0;
};
$hxClasses["haxe.iterators.DynamicAccessKeyValueIterator"] = haxe_iterators_DynamicAccessKeyValueIterator;
haxe_iterators_DynamicAccessKeyValueIterator.__name__ = "haxe.iterators.DynamicAccessKeyValueIterator";
haxe_iterators_DynamicAccessKeyValueIterator.prototype = {
	access: null
	,keys: null
	,index: null
	,hasNext: function() {
		return this.index < this.keys.length;
	}
	,next: function() {
		var key = this.keys[this.index++];
		return { value : this.access[key], key : key};
	}
	,__class__: haxe_iterators_DynamicAccessKeyValueIterator
};
var haxe_iterators_HashMapKeyValueIterator = function(map) {
	this.map = map;
	this.keys = map.keys.iterator();
};
$hxClasses["haxe.iterators.HashMapKeyValueIterator"] = haxe_iterators_HashMapKeyValueIterator;
haxe_iterators_HashMapKeyValueIterator.__name__ = "haxe.iterators.HashMapKeyValueIterator";
haxe_iterators_HashMapKeyValueIterator.prototype = {
	map: null
	,keys: null
	,hasNext: function() {
		return this.keys.hasNext();
	}
	,next: function() {
		var key = this.keys.next();
		var _this = this.map.values;
		var key1 = key.hashCode();
		return { value : _this.h[key1], key : key};
	}
	,__class__: haxe_iterators_HashMapKeyValueIterator
};
var haxe_iterators_MapKeyValueIterator = function(map) {
	this.map = map;
	this.keys = map.keys();
};
$hxClasses["haxe.iterators.MapKeyValueIterator"] = haxe_iterators_MapKeyValueIterator;
haxe_iterators_MapKeyValueIterator.__name__ = "haxe.iterators.MapKeyValueIterator";
haxe_iterators_MapKeyValueIterator.prototype = {
	map: null
	,keys: null
	,hasNext: function() {
		return this.keys.hasNext();
	}
	,next: function() {
		var key = this.keys.next();
		return { value : this.map.get(key), key : key};
	}
	,__class__: haxe_iterators_MapKeyValueIterator
};
var haxe_iterators_RestIterator = function(args) {
	this.current = 0;
	this.args = args;
};
$hxClasses["haxe.iterators.RestIterator"] = haxe_iterators_RestIterator;
haxe_iterators_RestIterator.__name__ = "haxe.iterators.RestIterator";
haxe_iterators_RestIterator.prototype = {
	args: null
	,current: null
	,hasNext: function() {
		return this.current < this.args.length;
	}
	,next: function() {
		return this.args[this.current++];
	}
	,__class__: haxe_iterators_RestIterator
};
var haxe_iterators_RestKeyValueIterator = function(args) {
	this.current = 0;
	this.args = args;
};
$hxClasses["haxe.iterators.RestKeyValueIterator"] = haxe_iterators_RestKeyValueIterator;
haxe_iterators_RestKeyValueIterator.__name__ = "haxe.iterators.RestKeyValueIterator";
haxe_iterators_RestKeyValueIterator.prototype = {
	args: null
	,current: null
	,hasNext: function() {
		return this.current < this.args.length;
	}
	,next: function() {
		return { key : this.current, value : this.args[this.current++]};
	}
	,__class__: haxe_iterators_RestKeyValueIterator
};
var haxe_iterators_StringIterator = function(s) {
	this.offset = 0;
	this.s = s;
};
$hxClasses["haxe.iterators.StringIterator"] = haxe_iterators_StringIterator;
haxe_iterators_StringIterator.__name__ = "haxe.iterators.StringIterator";
haxe_iterators_StringIterator.prototype = {
	offset: null
	,s: null
	,hasNext: function() {
		return this.offset < this.s.length;
	}
	,next: function() {
		return this.s.charCodeAt(this.offset++);
	}
	,__class__: haxe_iterators_StringIterator
};
var haxe_iterators_StringIteratorUnicode = function(s) {
	this.offset = 0;
	this.s = s;
};
$hxClasses["haxe.iterators.StringIteratorUnicode"] = haxe_iterators_StringIteratorUnicode;
haxe_iterators_StringIteratorUnicode.__name__ = "haxe.iterators.StringIteratorUnicode";
haxe_iterators_StringIteratorUnicode.unicodeIterator = function(s) {
	return new haxe_iterators_StringIteratorUnicode(s);
};
haxe_iterators_StringIteratorUnicode.prototype = {
	offset: null
	,s: null
	,hasNext: function() {
		return this.offset < this.s.length;
	}
	,next: function() {
		var s = this.s;
		var index = this.offset++;
		var c = s.charCodeAt(index);
		if(c >= 55296 && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(index + 1) & 1023;
		}
		var c1 = c;
		if(c1 >= 65536) {
			this.offset++;
		}
		return c1;
	}
	,__class__: haxe_iterators_StringIteratorUnicode
};
var haxe_iterators_StringKeyValueIterator = function(s) {
	this.offset = 0;
	this.s = s;
};
$hxClasses["haxe.iterators.StringKeyValueIterator"] = haxe_iterators_StringKeyValueIterator;
haxe_iterators_StringKeyValueIterator.__name__ = "haxe.iterators.StringKeyValueIterator";
haxe_iterators_StringKeyValueIterator.prototype = {
	offset: null
	,s: null
	,hasNext: function() {
		return this.offset < this.s.length;
	}
	,next: function() {
		return { key : this.offset, value : this.s.charCodeAt(this.offset++)};
	}
	,__class__: haxe_iterators_StringKeyValueIterator
};
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = "js.Boot";
js_Boot.isClass = function(o) {
	return o.__name__;
};
js_Boot.isInterface = function(o) {
	return o.__isInterface__;
};
js_Boot.isEnum = function(e) {
	return e.__ename__;
};
js_Boot.getClass = function(o) {
	if(o == null) {
		return null;
	} else if(((o) instanceof Array)) {
		return Array;
	} else {
		var cl = o.__class__;
		if(cl != null) {
			return cl;
		}
		var name = js_Boot.__nativeClassName(o);
		if(name != null) {
			return js_Boot.__resolveNativeClass(name);
		}
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var con = e.__constructs__[o._hx_index];
			var n = con._hx_name;
			if(con.__params__) {
				s = s + "\t";
				return n + "(" + ((function($this) {
					var $r;
					var _g = [];
					{
						var _g1 = 0;
						var _g2 = con.__params__;
						while(true) {
							if(!(_g1 < _g2.length)) {
								break;
							}
							var p = _g2[_g1];
							_g1 = _g1 + 1;
							_g.push(js_Boot.__string_rec(o[p],s));
						}
					}
					$r = _g;
					return $r;
				}(this))).join(",") + ")";
			} else {
				return n;
			}
		}
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g = 0;
			var _g1 = o.length;
			while(_g < _g1) {
				var i = _g++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( _g ) {
			haxe_NativeStackTrace.lastError = _g;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) {
			str += ", \n";
		}
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	while(true) {
		if(cc == null) {
			return false;
		}
		if(cc == cl) {
			return true;
		}
		var intf = cc.__interfaces__;
		if(intf != null) {
			var _g = 0;
			var _g1 = intf.length;
			while(_g < _g1) {
				var i = intf[_g++];
				if(i == cl || js_Boot.__interfLoop(i,cl)) {
					return true;
				}
			}
		}
		cc = cc.__super__;
	}
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) {
		return false;
	}
	switch(cl) {
	case Array:
		return ((o) instanceof Array);
	case Bool:
		return typeof(o) == "boolean";
	case Dynamic:
		return o != null;
	case Float:
		return typeof(o) == "number";
	case Int:
		if(typeof(o) == "number") {
			return ((o | 0) === o);
		} else {
			return false;
		}
		break;
	case String:
		return typeof(o) == "string";
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(js_Boot.__downcastCheck(o,cl)) {
					return true;
				}
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(((o) instanceof cl)) {
					return true;
				}
			}
		} else {
			return false;
		}
		if(cl == Class ? o.__name__ != null : false) {
			return true;
		}
		if(cl == Enum ? o.__ename__ != null : false) {
			return true;
		}
		return o.__enum__ != null ? $hxEnums[o.__enum__] == cl : false;
	}
};
js_Boot.__downcastCheck = function(o,cl) {
	if(!((o) instanceof cl)) {
		if(cl.__isInterface__) {
			return js_Boot.__interfLoop(js_Boot.getClass(o),cl);
		} else {
			return false;
		}
	} else {
		return true;
	}
};
js_Boot.__implements = function(o,iface) {
	return js_Boot.__interfLoop(js_Boot.getClass(o),iface);
};
js_Boot.__cast = function(o,t) {
	if(o == null || js_Boot.__instanceof(o,t)) {
		return o;
	} else {
		throw haxe_Exception.thrown("Cannot cast " + Std.string(o) + " to " + Std.string(t));
	}
};
js_Boot.__toStr = null;
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
		return null;
	}
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var js_Lib = function() { };
$hxClasses["js.Lib"] = js_Lib;
js_Lib.__name__ = "js.Lib";
js_Lib.__properties__ = {get_undefined:"get_undefined"};
js_Lib.debug = function() {
	debugger;
};
js_Lib.alert = function(v) {
	alert(js_Boot.__string_rec(v,""));
};
js_Lib.eval = function(code) {
	return eval(code);
};
js_Lib.get_undefined = function() {
	return undefined;
};
js_Lib.rethrow = function() {
};
js_Lib.getOriginalException = function() {
	return null;
};
js_Lib.getNextHaxeUID = function() {
	return $global.$haxeUID++;
};
var js_lib__$ArrayBuffer_ArrayBufferCompat = function() { };
$hxClasses["js.lib._ArrayBuffer.ArrayBufferCompat"] = js_lib__$ArrayBuffer_ArrayBufferCompat;
js_lib__$ArrayBuffer_ArrayBufferCompat.__name__ = "js.lib._ArrayBuffer.ArrayBufferCompat";
js_lib__$ArrayBuffer_ArrayBufferCompat.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null ? null : end - begin);
	var resultArray = new Uint8Array(u.byteLength);
	resultArray.set(u);
	return resultArray.buffer;
};
var js_lib_HaxeIterator = function(jsIterator) {
	this.jsIterator = jsIterator;
	this.lastStep = jsIterator.next();
};
$hxClasses["js.lib.HaxeIterator"] = js_lib_HaxeIterator;
js_lib_HaxeIterator.__name__ = "js.lib.HaxeIterator";
js_lib_HaxeIterator.iterator = function(jsIterator) {
	return new js_lib_HaxeIterator(jsIterator);
};
js_lib_HaxeIterator.prototype = {
	jsIterator: null
	,lastStep: null
	,hasNext: function() {
		return !this.lastStep.done;
	}
	,next: function() {
		var v = this.lastStep.value;
		this.lastStep = this.jsIterator.next();
		return v;
	}
	,__class__: js_lib_HaxeIterator
};
var js_lib_KeyValue = {};
js_lib_KeyValue.__properties__ = {get_value:"get_value",get_key:"get_key"};
js_lib_KeyValue.get_key = function(this1) {
	return this1[0];
};
js_lib_KeyValue.get_value = function(this1) {
	return this1[1];
};
var js_lib_ObjectEntry = {};
js_lib_ObjectEntry.__properties__ = {get_value:"get_value",get_key:"get_key"};
js_lib_ObjectEntry.get_key = function(this1) {
	return this1[0];
};
js_lib_ObjectEntry.get_value = function(this1) {
	return this1[1];
};
var js_lib_SetKeyValueIterator = function(set) {
	this.index = 0;
	this.set = set;
	this.values = new js_lib_HaxeIterator(set.values());
};
$hxClasses["js.lib.SetKeyValueIterator"] = js_lib_SetKeyValueIterator;
js_lib_SetKeyValueIterator.__name__ = "js.lib.SetKeyValueIterator";
js_lib_SetKeyValueIterator.prototype = {
	set: null
	,values: null
	,index: null
	,hasNext: function() {
		return !this.values.lastStep.done;
	}
	,next: function() {
		var tmp = this.index++;
		var _this = this.values;
		var v = _this.lastStep.value;
		_this.lastStep = _this.jsIterator.next();
		return { key : tmp, value : v};
	}
	,__class__: js_lib_SetKeyValueIterator
};
var js_node_ChildProcess = require("child_process");
var js_node_DnsErrorCode = require("dns");
var js_node_Dns = require("dns");
var js_node_Fs = require("fs");
var js_node_Http = require("http");
var js_node_Https = require("https");
var js_node_KeyValue = {};
js_node_KeyValue.__properties__ = {get_value:"get_value",get_key:"get_key"};
js_node_KeyValue.get_key = function(this1) {
	return this1[0];
};
js_node_KeyValue.get_value = function(this1) {
	return this1[1];
};
var js_node_Module = require("module");
var js_node_Path = require("path");
var js_node_events_EventEmitter = require("events").EventEmitter;
var js_node_Stream = require("stream");
var js_node_Timers = require("timers");
var js_node_Tls = require("tls");
var js_node_Util = require("util");
var js_node_buffer_Buffer = require("buffer").Buffer;
var js_node_buffer__$Buffer_Helper = function() { };
$hxClasses["js.node.buffer._Buffer.Helper"] = js_node_buffer__$Buffer_Helper;
js_node_buffer__$Buffer_Helper.__name__ = "js.node.buffer._Buffer.Helper";
js_node_buffer__$Buffer_Helper.bytesOfBuffer = function(b) {
	var o = Object.create(haxe_io_Bytes.prototype);
	o.length = b.byteLength;
	o.b = b;
	b.bufferValue = b;
	b.hxBytes = o;
	b.bytes = b;
	return o;
};
var js_node_buffer__$Buffer_BufferModule = require("buffer");
var js_node_console_Console = require("console").Console;
var js_node_stream_Readable = require("stream").Readable;
var js_node_stream_Writable = require("stream").Writable;
var js_node_http_Agent = require("http").Agent;
var js_node_http_ClientRequest = require("http").ClientRequest;
var js_node_http_IncomingMessage = require("http").IncomingMessage;
var js_node_net_Server = require("net").Server;
var js_node_http_Server = require("http").Server;
var js_node_http_ServerResponse = require("http").ServerResponse;
var js_node_https_Agent = require("https").Agent;
var js_node_tls_Server = require("tls").Server;
var js_node_https_Server = require("https").Server;
var js_node_stream_Duplex = require("stream").Duplex;
var js_node_net_Socket = require("net").Socket;
var js_node_stream_WritableNewOptionsAdapter = {};
js_node_stream_WritableNewOptionsAdapter.from = function(options) {
	if(!Object.prototype.hasOwnProperty.call(options,"final")) {
		Object.defineProperty(options,"final",{ get : function() {
			return options.final_;
		}});
	}
	return options;
};
var js_node_tls_TLSSocket = require("tls").TLSSocket;
var js_node_url_URL = require("url").URL;
var js_node_url_URLSearchParams = require("url").URLSearchParams;
var js_node_url_URLSearchParamsEntry = {};
js_node_url_URLSearchParamsEntry.__properties__ = {get_value:"get_value",get_name:"get_name"};
js_node_url_URLSearchParamsEntry._new = function(name,value) {
	return [name,value];
};
js_node_url_URLSearchParamsEntry.get_name = function(this1) {
	return this1[0];
};
js_node_url_URLSearchParamsEntry.get_value = function(this1) {
	return this1[1];
};
var sys_FileSystem = function() { };
$hxClasses["sys.FileSystem"] = sys_FileSystem;
sys_FileSystem.__name__ = "sys.FileSystem";
sys_FileSystem.exists = function(path) {
	try {
		js_node_Fs.accessSync(path);
		return true;
	} catch( _g ) {
		haxe_NativeStackTrace.lastError = _g;
		return false;
	}
};
sys_FileSystem.rename = function(path,newPath) {
	js_node_Fs.renameSync(path,newPath);
};
sys_FileSystem.stat = function(path) {
	return js_node_Fs.statSync(path);
};
sys_FileSystem.fullPath = function(relPath) {
	try {
		return js_node_Fs.realpathSync(relPath);
	} catch( _g ) {
		haxe_NativeStackTrace.lastError = _g;
		return null;
	}
};
sys_FileSystem.absolutePath = function(relPath) {
	if(haxe_io_Path.isAbsolute(relPath)) {
		return relPath;
	}
	return js_node_Path.resolve(relPath);
};
sys_FileSystem.isDirectory = function(path) {
	try {
		return js_node_Fs.statSync(path).isDirectory();
	} catch( _g ) {
		haxe_NativeStackTrace.lastError = _g;
		return false;
	}
};
sys_FileSystem.createDirectory = function(path) {
	try {
		js_node_Fs.mkdirSync(path);
	} catch( _g ) {
		haxe_NativeStackTrace.lastError = _g;
		var _g1 = haxe_Exception.caught(_g).unwrap();
		if(_g1.code == "ENOENT") {
			sys_FileSystem.createDirectory(js_node_Path.dirname(path));
			js_node_Fs.mkdirSync(path);
		} else {
			var stat;
			try {
				stat = js_node_Fs.statSync(path);
			} catch( _g2 ) {
				throw _g1;
			}
			if(!stat.isDirectory()) {
				throw _g1;
			}
		}
	}
};
sys_FileSystem.deleteFile = function(path) {
	js_node_Fs.unlinkSync(path);
};
sys_FileSystem.deleteDirectory = function(path) {
	if(sys_FileSystem.exists(path)) {
		var _g = 0;
		var _g1 = js_node_Fs.readdirSync(path);
		while(_g < _g1.length) {
			var curPath = path + "/" + _g1[_g++];
			if(sys_FileSystem.isDirectory(curPath)) {
				sys_FileSystem.deleteDirectory(curPath);
			} else {
				js_node_Fs.unlinkSync(curPath);
			}
		}
		js_node_Fs.rmdirSync(path);
	}
};
sys_FileSystem.readDirectory = function(path) {
	return js_node_Fs.readdirSync(path);
};
var sys_io_File = function() { };
$hxClasses["sys.io.File"] = sys_io_File;
sys_io_File.__name__ = "sys.io.File";
sys_io_File.append = function(path,binary) {
	if(binary == null) {
		binary = true;
	}
	return new sys_io_FileOutput(js_node_Fs.openSync(path,"a"));
};
sys_io_File.write = function(path,binary) {
	if(binary == null) {
		binary = true;
	}
	return new sys_io_FileOutput(js_node_Fs.openSync(path,"w"));
};
sys_io_File.read = function(path,binary) {
	if(binary == null) {
		binary = true;
	}
	return new sys_io_FileInput(js_node_Fs.openSync(path,"r"));
};
sys_io_File.getContent = function(path) {
	return js_node_Fs.readFileSync(path,{ encoding : "utf8"});
};
sys_io_File.saveContent = function(path,content) {
	js_node_Fs.writeFileSync(path,content);
};
sys_io_File.getBytes = function(path) {
	return js_node_buffer__$Buffer_Helper.bytesOfBuffer(js_node_Fs.readFileSync(path));
};
sys_io_File.saveBytes = function(path,bytes) {
	var data = bytes.b;
	js_node_Fs.writeFileSync(path,js_node_buffer_Buffer.from(data.buffer,data.byteOffset,bytes.length));
};
sys_io_File.update = function(path,binary) {
	if(binary == null) {
		binary = true;
	}
	return new sys_io_FileOutput(js_node_Fs.openSync(path,"r+"));
};
sys_io_File.copy = function(srcPath,dstPath) {
	var src = js_node_Fs.openSync(srcPath,"r");
	var dst = js_node_Fs.openSync(dstPath,"w",js_node_Fs.fstatSync(src).mode);
	var bytesRead;
	var pos = 0;
	while(true) {
		bytesRead = js_node_Fs.readSync(src,sys_io_File.copyBuf,0,65536,pos);
		if(!(bytesRead > 0)) {
			break;
		}
		js_node_Fs.writeSync(dst,sys_io_File.copyBuf,0,bytesRead);
		pos += bytesRead;
	}
	js_node_Fs.closeSync(src);
	js_node_Fs.closeSync(dst);
};
var sys_io_FileInput = function(fd) {
	this.hasReachedEof = false;
	this.fd = fd;
	this.pos = 0;
};
$hxClasses["sys.io.FileInput"] = sys_io_FileInput;
sys_io_FileInput.__name__ = "sys.io.FileInput";
sys_io_FileInput.__super__ = haxe_io_Input;
sys_io_FileInput.prototype = $extend(haxe_io_Input.prototype,{
	fd: null
	,pos: null
	,hasReachedEof: null
	,throwEof: function() {
		this.hasReachedEof = true;
		throw haxe_Exception.thrown(new haxe_io_Eof());
	}
	,readByte: function() {
		var buf = js_node_buffer_Buffer.alloc(1);
		var bytesRead;
		try {
			bytesRead = js_node_Fs.readSync(this.fd,buf,0,1,this.pos);
		} catch( _g ) {
			haxe_NativeStackTrace.lastError = _g;
			var _g1 = haxe_Exception.caught(_g).unwrap();
			if(_g1.code == "EOF") {
				this.hasReachedEof = true;
				throw haxe_Exception.thrown(new haxe_io_Eof());
			}
			throw haxe_Exception.thrown(haxe_io_Error.Custom(_g1));
		}
		if(bytesRead == 0) {
			this.hasReachedEof = true;
			throw haxe_Exception.thrown(new haxe_io_Eof());
		}
		this.pos++;
		return buf[0];
	}
	,readBytes: function(s,pos,len) {
		var data = s.b;
		var buf = js_node_buffer_Buffer.from(data.buffer,data.byteOffset,s.length);
		var bytesRead;
		try {
			bytesRead = js_node_Fs.readSync(this.fd,buf,pos,len,this.pos);
		} catch( _g ) {
			haxe_NativeStackTrace.lastError = _g;
			var _g1 = haxe_Exception.caught(_g).unwrap();
			if(_g1.code == "EOF") {
				this.hasReachedEof = true;
				throw haxe_Exception.thrown(new haxe_io_Eof());
			}
			throw haxe_Exception.thrown(haxe_io_Error.Custom(_g1));
		}
		if(bytesRead == 0) {
			this.hasReachedEof = true;
			throw haxe_Exception.thrown(new haxe_io_Eof());
		}
		this.pos += bytesRead;
		return bytesRead;
	}
	,close: function() {
		js_node_Fs.closeSync(this.fd);
	}
	,seek: function(p,pos) {
		this.hasReachedEof = false;
		switch(pos._hx_index) {
		case 0:
			this.pos = p;
			break;
		case 1:
			this.pos += p;
			break;
		case 2:
			this.pos = js_node_Fs.fstatSync(this.fd).size + p;
			break;
		}
	}
	,tell: function() {
		return this.pos;
	}
	,eof: function() {
		return this.hasReachedEof;
	}
	,__class__: sys_io_FileInput
});
var sys_io_FileOutput = function(fd) {
	this.fd = fd;
	this.pos = 0;
};
$hxClasses["sys.io.FileOutput"] = sys_io_FileOutput;
sys_io_FileOutput.__name__ = "sys.io.FileOutput";
sys_io_FileOutput.__super__ = haxe_io_Output;
sys_io_FileOutput.prototype = $extend(haxe_io_Output.prototype,{
	fd: null
	,pos: null
	,writeByte: function(b) {
		var buf = js_node_buffer_Buffer.alloc(1);
		buf[0] = b;
		js_node_Fs.writeSync(this.fd,buf,0,1,this.pos);
		this.pos++;
	}
	,writeBytes: function(s,pos,len) {
		var data = s.b;
		var buf = js_node_buffer_Buffer.from(data.buffer,data.byteOffset,s.length);
		var wrote = js_node_Fs.writeSync(this.fd,buf,pos,len,this.pos);
		this.pos += wrote;
		return wrote;
	}
	,close: function() {
		js_node_Fs.closeSync(this.fd);
	}
	,seek: function(p,pos) {
		switch(pos._hx_index) {
		case 0:
			this.pos = p;
			break;
		case 1:
			this.pos += p;
			break;
		case 2:
			this.pos = js_node_Fs.fstatSync(this.fd).size + p;
			break;
		}
	}
	,tell: function() {
		return this.pos;
	}
	,__class__: sys_io_FileOutput
});
var sys_io_FileSeek = $hxEnums["sys.io.FileSeek"] = { __ename__:"sys.io.FileSeek",__constructs__:null
	,SeekBegin: {_hx_name:"SeekBegin",_hx_index:0,__enum__:"sys.io.FileSeek",toString:$estr}
	,SeekCur: {_hx_name:"SeekCur",_hx_index:1,__enum__:"sys.io.FileSeek",toString:$estr}
	,SeekEnd: {_hx_name:"SeekEnd",_hx_index:2,__enum__:"sys.io.FileSeek",toString:$estr}
};
sys_io_FileSeek.__constructs__ = [sys_io_FileSeek.SeekBegin,sys_io_FileSeek.SeekCur,sys_io_FileSeek.SeekEnd];
sys_io_FileSeek.__empty_constructs__ = [sys_io_FileSeek.SeekBegin,sys_io_FileSeek.SeekCur,sys_io_FileSeek.SeekEnd];
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
$hxClasses["Math"] = Math;
if( String.fromCodePoint == null ) String.fromCodePoint = function(c) { return c < 0x10000 ? String.fromCharCode(c) : String.fromCharCode((c>>10)+0xD7C0)+String.fromCharCode((c&0x3FF)+0xDC00); }
String.prototype.__class__ = $hxClasses["String"] = String;
String.__name__ = "String";
$hxClasses["Array"] = Array;
Array.__name__ = "Array";
Date.prototype.__class__ = $hxClasses["Date"] = Date;
Date.__name__ = "Date";
var Int = { };
var Dynamic = { };
var Float = Number;
var Bool = Boolean;
var Class = { };
var Enum = { };
haxe_ds_ObjectMap.count = 0;
js_Boot.__toStr = ({ }).toString;
if(ArrayBuffer.prototype.slice == null) {
	ArrayBuffer.prototype.slice = js_lib__$ArrayBuffer_ArrayBufferCompat.sliceImpl;
}
EReg.escapeRe = new RegExp("[.*+?^${}()|[\\]\\\\]","g");
Main.connected = false;
Main.version = "0.1.0";
Main.botUptime = 0;
Main.setIDK = false;
MessageHandler.prefix = "!";
MessageHandler.ready = false;
MessageHandler.actions = [];
haxe_SysTools.winMetaCharacters = [32,40,41,37,33,94,34,60,62,38,124,10,13,44,59];
StringTools.winMetaCharacters = haxe_SysTools.winMetaCharacters;
StringTools.MIN_SURROGATE_CODE_POINT = 65536;
haxe_Int32._mul = Math.imul != null ? Math.imul : function(a,b) {
	return a * (b & 65535) + (a * (b >>> 16) << 16 | 0) | 0;
};
haxe_io_FPHelper.i64tmp = new haxe__$Int64__$_$_$Int64(0,0);
haxe_io_FPHelper.LN2 = 0.6931471805599453;
haxe_io_FPHelper.helper = new DataView(new ArrayBuffer(8));
haxe_io_UInt8Array.BYTES_PER_ELEMENT = 1;
sys_io_File.copyBufLen = 65536;
sys_io_File.copyBuf = js_node_buffer_Buffer.alloc(65536);
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);

//# sourceMappingURL=main.js.map