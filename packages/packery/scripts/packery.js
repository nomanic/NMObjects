var packery={
    preload:function() {
        NomanicObject.loadt(['core/vendor/packery.pkgd.min.js']);
        NomanicObject.loadc(['packages/packery/css/packery.css']);
    },
    oneach:function(itemElem,args,snip) {
        var NMC=NomanicObject.getobj(itemElem),m=args.margin?args.margin:[0,0,0,0],w=(NMC.gridwidth?NMC.gridwidth:(args.gridwidth?args.gridwidth:45));
        itemElem.style.width=w+'%';
        itemElem.style.zIndex=2000;
        itemElem.style.marginLeft=m[0]+'px';
        itemElem.style.marginTop=m[1]+'px';
        itemElem.style.marginBottom=m[2]+'px';
        itemElem.style.marginRight=m[3]+'px';
        itemElem.parentNode.style.width='auto';
        itemElem.parentNode.style.margin='auto';
    },
    onready:function(cont,args,snip) {
        var self = new Packery(cont, {
            itemSelector: '.'+snip,
            gutter: args.gutter,
            percentPosition: true
        });
        
        self.cont=cont;

        self.setSize=function() {
            var maxh=0;
            self.getItemElements().forEach(function(itemElem) {
                var ch=itemElem.offsetTop+itemElem.offsetHeight+60;
                maxh=maxh>ch?maxh:ch;
            });
            self.cont.style.height=maxh+'px';
        }

        self.getItemElements().forEach(function(itemElem) {
            var NMC=NomanicObject.getobj(itemElem);
            NomanicObject.setgridmode(NMC,2);
            NMC.rsr();
            var draggie = new Draggabilly(itemElem, {
                handle: '.tbar'
            });
            self.bindDraggabillyEvents(draggie);
        });
        self.on( 'layoutComplete', packery.setSize );
        self.on( 'dragItemPositioned', packery.setSize );
        self.layout();
        NomanicObject.attach('onclose',function() {setTimeout(function() {self.layout();},500);});
        NomanicObject.addResizeEvent(function() {setTimeout(function() {self.layout();},500);});
        return self;
    }
}

