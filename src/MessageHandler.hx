package;

import sys.FileSystem;
import discord_js.Channel;
import haxe.Http;
import discord_js.MessageEmbed;
import discord_js.Message;

typedef Actions = {
    var name:String;
    @:optional var param:Array<String>;
    var desc:String;
    var handle:Message->Void;
}

class MessageHandler {
    public static var prefix:String = "!";
    public static var ready:Bool = false;
    public static var actions:Array<Actions> = [];

    public static function init():Void {
        if (ready) return;
        ready = true;
        // HELLO
        actions.push({name:"hello", desc: "Say hello to the bot", handle:(m:Message)->{
            var channel:Channel = Main.client.channels.cache.get("<id>");
            m.reply("> Hello " + m.member.displayName + "!");
        }});

        actions.push({name:"crash", desc: "Crash the bot.", handle:(m:Message)->{
            throw "crash happened i guess";
        }});

        actions.push({name:"uptime", desc: "Check how long does this bot have been active.", handle:(m:Message)->{
            m.reply(createEmbed('${Main.name} has been active for ${Util.getCurrentDuration(Main.botUptime)}',"Bot started on " + Main.startDate.toString()));
        }});

        // BOOP
        actions.push({name:"boop", param: ["username"], desc: "Boop someone!", handle:(m:Message)->{
            var split:Array<String> = m.content.split(" ");
            trace(split);
            var boopThis:String = '<@${m.author.id}>';
            if (split.length > 1) {
                boopThis = split[1];
            }
            m.reply("Boop! "+boopThis);
        }});

        // VERSION 
        actions.push({name:"version", desc: "Shows current version of this bot and CDEV Engine.", handle:(m:Message)->{
            /** GitHub version checking **/
            var cdevVer:String = "";
            var http = new Http("https://raw.githubusercontent.com/Core5570RYT/FNF-CDEV-Engine/master/githubVersion.txt");

            http.onData = (data:String) -> {
                cdevVer = data.split('\n')[0].trim();
                var content = '**${Main.name}** - v${Main.version}';
                content += '\n**CDEV Engine** - v$cdevVer';
                m.reply(createEmbed("Version List", content));
            }

            http.onError = (error) -> {
                trace('Error on getting CDEV Engine version: $error');
            }

            http.request();
        }});

        actions.push({name:"mathAdd", param: ["number1","number2"], desc: "Ask the bot to do addition math.", handle:(m:Message)->{
            var split:Array<String> = m.content.split(" ");
            trace(split);
            var sayThis:String = '> Please provide first number and second number';
            if (split.length == 2) {
                sayThis = "> Please provide the second number.";
            } else if (split.length == 3) {
                if (Math.isNaN(Std.parseFloat(split[1])) || Math.isNaN(Std.parseFloat(split[2]))){
                    sayThis = "> One of these numbers you've put is an invalid number.";
                } else {
                    sayThis = '> ${split[1]} + ${split[2]} = ${Std.parseFloat(split[1])+Std.parseFloat(split[2])}';
                }     
            }
            m.reply(createEmbed("Math",sayThis));
        }});

        // HELP
        actions.push({name:"help", desc: "Returns list of available commands", handle:(m:Message)->{
            var content:String = ''
            +"\n**(Use \"!\" before writing any of these commands)**";
            for (i in actions) {
                var paramList:String = "";
                if (i.param != null) {
                    for (p in i.param){
                        paramList+=' <${p}>';
                    }
                }
                content += "\n> `" +i.name + paramList + "` - " + i.desc;
            }

            m.reply(createEmbed('${Main.name} Command List', content));
        }});
    }

    public static function createEmbed(title:String, content:Dynamic, ?allowTag:Bool = false) {
        var embed = new MessageEmbed();
        embed.type = 'article';
        embed.color = 3447003;
        if (title != "")  embed.setTitle(title);
        if (content != "") embed.setDescription(content);
        var data:Dynamic = {embeds:[embed]};
        if (!allowTag) data = {allowedMentions: {parse: []}, embeds:[embed]};
        return data;
    }

    public static function check(message:Message) {
        if (!ready){
            trace("Recieved a message, but actions haven't initialized yet!");
            return;
        }

        var noPrefix:String = message.content.substring(prefix.length);
        for (action in actions) {
            var checkName:String = noPrefix;
            if (action.param != null)
                checkName = noPrefix.split(" ")[0];

            if (action.name == checkName) {
                action.handle(message);
                return;
            }
        }
        message.reply("> Couldn't find matching command: `" + noPrefix + "`, use `"+(prefix+"help") + "` for commands.");
    }
}