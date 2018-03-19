function update() {
    if (guts.destroyed) {
        return;
    }
    guts.getNMC('grunge').update({data:NomanicObject.grab(4, 1, 19), lines:NomanicObject.grab(4, 1, 19)});
    guts.getNMC('00006').update({data:NomanicObject.grab(4, 1, 19), lines:NomanicObject.grab(4, 1, 19)});
    if (!guts.destroyed) {
        requestTimeout(update, 500);
    }
}

function update2() {
    if (guts.destroyed) {
        return;
    }
    var f, j, sr = [],
        lr = [];
    for (j = 0; j < 3; j++) {
        sr[j] = NomanicObject.grab(12, 2, 10);
    }
    guts.getNMC('imagebar').replace({data:sr});
    guts.getNMC('00004').replace({data:sr});
    sr = [];
    lr = [];
    for (j = 0; j < 3; j++) {
        sr[j] = NomanicObject.grab(12, 2, 10);
    }
    for (j = 0; j < 1; j++) {
        lr[j] = NomanicObject.grab(12, 2, 20);
    }
    guts.getNMC('00001').replace({data:sr,lines:lr});
    guts.getNMC('00005').replace({data:sr,lines:lr});
    sr = [];
    for (j = 0; j < 3; j++) {
        sr[j] = NomanicObject.grab(12, 0, 10);
    }
    guts.getNMC('00008').replace({data:sr});
    guts.getNMC('00009').replace({data:sr});
    guts.getNMC('00098').replace({data:sr});
    guts.getNMC('00011').replace({data:sr});
    guts.getNMC('00099').replace({data:sr},2);
    sr = [];
    for (j = 0; j < 3; j++) {
        sr[j] = NomanicObject.grab(12, 0, 19);
    }
    guts.getNMC('neonbar').replace({data:sr});
    guts.getNMC('neonpolar').replace({data:sr});
    guts.getNMC('neonline').replace({data:sr});
    if (!guts.destroyed) {
        requestTimeout(update2, 3500);
    }
}

function update3() {
    if (guts.destroyed) {
        return;
    }
    var j,sr = [];
    for (j = 0; j < 6; j++) {
        sr[j] = NomanicObject.grab(12, 0, 1);
    }
    guts.getNMC('neonpie').replace({data:sr},2);
    if (!guts.destroyed) {
        requestTimeout(update3, 3500);
    }
}

var guts={
    tm:false,
    destroyed:false,
    checkdestroy:function() {
        if (!NomanicObject.ob('gutsid')) {
            guts.ondestroy();
        }
        else {
            requestTimeout(guts.checkdestroy,500);
        }
    },
    ondestroy:function() {
        guts.snip=false;
        guts.destroyed=true;
    },
    onready:function(cont,args,snip) {
        if (guts.snip) {return;}
        guts.snip=snip;
        guts.getNMC=function(ref) {
            return NomanicObject.getNMC(guts.snip+ref);
        }
        requestTimeout(guts.checkdestroy,500);
        clearRequestTimeout(guts.tm);
        guts.tm=requestTimeout(guts.doer,1000);
    },
    doer:function() {
        document.body.style.background = "#FFF";
        requestTimeout(update,500);
        requestTimeout(update2, 500);
        requestTimeout(update3, 500);
        guts.getNMC('basic').attach('onbutton',function(NMC, val) {
            NMC.snippetfill({snippet:'demo'+val+'.htm'});
        });
    }
}
