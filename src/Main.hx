package;
import discord_js.ActivityType;
import discord_api_types.ActivityType;
import discord_js.PresenceData;
import discord_js.Message;
import discord_js.ClientOptions.IntentFlags;
import discordjs.rest.REST;
import discord_api_types.Routes;
import discord_js.Client;
import haxe.Json;
import sys.io.File;
import haxe.Timer;

class Main {
    public static var connected:Bool = false;
	public static var config:TConfig;

	public static var client:Client;

	public static var version:String = "0.1.0";
	public static var botUptime:Float = 0;

	public static var startDate:Date;

    public static var name(get, never):String;
	private static function get_name() {
		if (config == null || config.project_name == null) {
			return 'bot';
		}
		return config.project_name;
	}

    /**
     * Main function...
     */
    static function main() {
		init();
		start();
	}

	/**
	 * initialization
	 */
	static function init() {
		startDate = Date.now();
        Sys.command("cls");
		try {
			config = Json.parse(File.getContent('./config.json'));
		} catch (e) {
			trace(e.message);
		}

		if (config == null || config.discord_token == 'TOKEN_HERE') {
			throw ('Enter your discord auth token.');
		}

		var rest = new REST({ version: '9' }).setToken(config.discord_token);
		
		rest.put(Routes.applicationGuildCommands(config.client_id, config.server_id), { body: [] })
			.then((_) -> trace('Successfully registered application commands.'), (err) -> trace(err));
	}

	static var setIDK:Bool = false;
    /**
     * Starts the bot
     */
    public static function start() {
		MessageHandler.init();
		
		client = new Client({allowedMentions: {parse: []}, intents: [IntentFlags.GUILDS, IntentFlags.GUILD_MESSAGES]});
		client.once('ready', (_) -> {
			trace('Bot is ready! ${client.user.username}');
			connected = true;
		});

		client.on('messageCreate', (message:Message) -> {
			if (message.author.bot || message.system) {
				return;
			}

			if (message.guild.id != "1156988198292037673"){
				message.reply("-# :x: This bot can only be used on the FNF CDEV Engine Discord Server.");
				return;
			}
			
			try {
				if (message.content.startsWith(MessageHandler.prefix))
					MessageHandler.check(message);
			} catch(e) {
				message.reply("> An error has occured while executing command:\n```"+e.toString()+"```");
			}

		});

		client.login(config.discord_token);

		new Timer(100).run = () -> {
			botUptime += 100;
			if (client.user != null) {
				if (!setIDK) {
					client.user.setActivity("CDEV Engine");
				}
				setIDK = true;
			}
		}
	}
}

typedef TConfig = {
	var project_name:String;
	var macros:Bool;
	var client_id:String;
	var server_id:String;
	var discord_token:String;
	var commands:Array<TCommands>;
}

typedef TCommands = {
	var type:CommandType;
	var name:String;
	var description:String;
	@:optional var params:Array<TCommands>;
	@:optional var required:Bool;
}

enum abstract CommandType(String) {
	var string;
	var number;
	var user;
	var channel;
	var role;
	var bool;
	var mention;
}