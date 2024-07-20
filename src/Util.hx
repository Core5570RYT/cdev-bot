package;

class Util {
    public static function getCurrentDuration(duration:Float):String
    {
        var theshit:Int = Math.floor(duration / 1000);
        var secs:String = '' + theshit % 60;
        var mins:String = "" + Math.floor(theshit / 60)%60;
        var hour:String = '' + Math.floor((theshit / 3600))%24; 
        if (theshit < 0)
            theshit = 0;
        if (duration < 0)
            duration = 0;

        if (secs.length < 2)
            secs = '0' + secs;

        var shit:String = mins + ":" + secs;
        if (hour != "0"){
            if (mins.length < 2) mins = "0"+ mins;
            shit = hour+":"+mins + ":" + secs;
        }
        return shit;
    }
}