var guts2={
    tm:false,
    onready:function(cont,args,snip) {
        guts2.snip=snip;
        guts2.getNMC=function(ref) {
            return NomanicObject.getNMC(guts2.snip+ref);
        }
        clearRequestTimeout(guts2.tm);
        guts2.tm=requestTimeout(guts2.doer,1000);
    },
    doer:function() {
        document.body.style.background = "#FFF";
    }
}
