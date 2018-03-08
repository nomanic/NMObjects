var cssgrid={
    preload:function(cont,args) {
        var f,ln='',cl='1fr';
        for (f=0;f<args.columns;f++) {
            ln+=(ln.length>0?' ':'')+cl;
        }
        cont.style.display='grid';
        cont.style.gridTemplateColumns=ln;
        cont.style.gridTemplateRows='auto';
        cont.style.gridGap=args.gutter[1]+'px '+args.gutter[0]+'px ';
        cont.style.gridAutoFlow='auto';
        cont.style.height='auto';
        cont.style.margin='auto';
    },
    oneach:function(itemElem,args,snip) {
        var NMC=NomanicObject.getobj(itemElem);
        itemElem.style.width='100%';
        itemElem.style.height='auto';
        itemElem.style.margin='auto';
        itemElem=itemElem.parentNode;
        itemElem.style.gridColumn='span '+(NMC.gridspan?NMC.gridspan[0]:(args.gridspan?args.gridspan[0]:1));
        itemElem.style.gridRow='span '+(NMC.gridspan?NMC.gridspan[1]:(args.gridspan?args.gridspan[1]:1));
        NMC.rsr();
    },
    snips:[],
    alreadydone:function(snip) {
        var f;
        for (f=0;f<cssgrid.snips.length;f++) {
            if (snip==cssgrid.snips[f]) {return true;}
        }
        cssgrid.snips.push(snip);
        return false;
    },
    onready:function(cont,args,snip) {
        if (cssgrid.alreadydone(snip)) {return;}        
    }
}
