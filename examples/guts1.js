function update2() {
    if (guts1.destroyed) {
        return;
    }
    var f, j, sr = [],
        lr = [];
    for (j = 0; j < 3; j++) {
        sr[j] = NomanicObject.grab(12, 2, 10);
    }
    guts1.getNMC('imagebar').replace({data:sr},3);
    guts1.getNMC('00004').replace({data:sr},3);
    sr = [];
    lr = [];
    for (j = 0; j < 3; j++) {
        sr[j] = NomanicObject.grab(12, 2, 10);
    }
    for (j = 0; j < 1; j++) {
        lr[j] = NomanicObject.grab(12, 2, 20);
    }
    guts1.getNMC('00001').replace({data:sr,lines:lr},3);
    guts1.getNMC('00005').replace({data:sr,lines:lr},3);
    sr = [];
    for (j = 0; j < 3; j++) {
        sr[j] = NomanicObject.grab(12, 0, 10);
    }
    guts1.getNMC('00008').replace({data:sr},3);
    guts1.getNMC('00009').replace({data:sr},2);
    guts1.getNMC('00098').replace({data:sr},0);
    guts1.getNMC('00011').replace({data:sr},3);
    guts1.getNMC('00099').replace({data:sr},3);
    sr = [];
    for (j = 0; j < 3; j++) {
        sr[j] = NomanicObject.grab(12, 0, 19);
    }
    guts1.getNMC('neonbar').replace({data:sr},3);
    guts1.getNMC('neonpolar').replace({data:sr},3);
    guts1.getNMC('neonline').replace({data:sr},3);
    if (!guts1.destroyed) {
        requestTimeout(update2, 3500);
    }
}

function update3() {
    if (guts1.destroyed) {
        return;
    }
    var j,sr = [];
    for (j = 0; j < 6; j++) {
        sr[j] = NomanicObject.grab(12, 0, 1);
    }
    guts1.getNMC('neonpie').replace({data:sr},3);
    if (!guts1.destroyed) {
        requestTimeout(update3, 3500);
    }
}

function update4() {
    if (guts1.destroyed) {
        return;
    }
    guts1.getNMC('00007').replace({data:[NomanicObject.grab(12, -19, 19)], lines:[NomanicObject.grab(12, -19, 19)]},1);
    if (!guts1.destroyed) {
        requestTimeout(update4, 4000);
    }
}

var guts1={
    tm:false,
    destroyed:false,
    checkdestroy:function() {
        if (!NomanicObject.ob('guts1id')) {
            guts1.ondestroy();
        }
        else {
            requestTimeout(guts1.checkdestroy,500);
        }
    },
    ondestroy:function() {
        guts1.snip=false;
        guts1.destroyed=true;
    },
    onready:function(cont,args,snip) {
        guts1.snip=snip;
        guts1.destroyed=false;
        guts1.getNMC=function(ref) {
            return NomanicObject.getNMC(guts1.snip+ref);
        }
        requestTimeout(guts1.checkdestroy,500);
        document.body.style.background = "#FFF";
        clearRequestTimeout(guts1.tm);
        guts1.tm=requestTimeout(guts1.doer,1000);
    },
    doer:function() {
        var NMC=guts1.getNMC('basic');
        NMC.attach('onbutton',function(NMC, val) {
            NMC.snippetfill({snippet:'demo'+val+'.htm'},3);
        });
        requestTimeout(update2, 2500);
        requestTimeout(update3, 2500);
        requestTimeout(update4, 2500);
        guts1.getNMC('00018').replace({ajax:'data2.csv'},1);
    }
}
