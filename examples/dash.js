var dash={
    tm:false,
    destroyed:false,
    checkdestroy:function() {
        if (!NomanicObject.ob('dashid')) {
            dash.ondestroy();
        }
        else {
            requestTimeout(dash.checkdestroy,500);
        }
    },
    ondestroy:function() {
        dash.snip=false;
        dash.destroyed=true;
    },
    onready:function(cont,args,snip) {
        dash.cont=cont;
        dash.args=args;
        dash.snip=snip;
        dash.getNMC=function(ref) {
            return NomanicObject.getNMC(dash.snip+ref);
        }
        requestTimeout(dash.checkdestroy,500);
        clearRequestTimeout(dash.tm);
        dash.tm=requestTimeout(dash.doer,1000);
    },
    doer:function() {
        document.body.style.background = dash.args.back;
        var NMC=dash.getNMC('main');

        NMC.attach('onselect',function(NMC,x) {
            dash.getNMC('pie').replace({data:NMC.getdata()},2);
            dash.getNMC('pie').settitle(NMC.getmenu()+' Figures','Departmental Breakdwon');
            dash.getNMC('budget').replace({data:[NomanicObject.grab(12,0,12),NomanicObject.grab(12,0,12),NomanicObject.grab(12,0,12)]},2);
            dash.getNMC('sector').setselect(x);
        });

        dash.getNMC('sector').attach('onselect',function(NMC,x) {
            dash.getNMC('pie').replace({data:NMC.getdata()},2);
            dash.getNMC('pie').settitle(NMC.getmenu()+' Figures','Departmental Breakdwon');
            dash.getNMC('budget').replace({data:[NomanicObject.grab(12,0,12),NomanicObject.grab(12,0,12),NomanicObject.grab(12,0,12)]},2);
            dash.getNMC('main').setselect(x);
        });

        dash.getNMC('pie').attach('ontogglelegend',function(NMC,idx,x) {
            dash.getNMC('main').showlegend(idx,x);
        });
    
        NMC.setselect(0);
        dash.getNMC('pie').replace({data:NMC.getdata()},2);
        dash.getNMC('pie').settitle(NMC.getmenu()+' Figures','Departmental Breakdwon');
        dash.getNMC('budget').replace({data:[NomanicObject.grab(12,0,12),NomanicObject.grab(12,0,12),NomanicObject.grab(12,0,12)]},2);
        dash.getNMC('sector').setselect(0);
        dash.getNMC('sector').replace({data:[NomanicObject.grab(12,0,12),NomanicObject.grab(12,0,12),NomanicObject.grab(12,0,12),NomanicObject.grab(12,0,12)]},2);
    }
}
