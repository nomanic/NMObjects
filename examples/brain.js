var brain={
    snips:[],
    brain:function() {},
    setup:function(b,cont,args,snip) {
        b.snip=snip;
        b.cont=cont;
        b.args=args;
        b.tm=false;
        b.fabort = 0;
        b.clay = 0;
        b.ptween = new NomanicObject.tweenable();
        b.ctween = new NomanicObject.tweenable();
        b.bq = [];
        b.layoff=function() {
            var b=this;
            b.clay = 1 - b.clay;
            (b.clay?b.lay1:b.lay0).style.opacity = 1;
            (b.clay?b.lay0:b.lay1).style.opacity = 0;
        }.bind(b);
        b.makebubbles=function(x) {
            var b=this;
            var ln = '',f;
            for (f = 0; f < x; f++) {
                ln += '<img class="bubble" src="NMC/assets/bubble.png" style="position:absolute;top:100%;"/>';
            }
            b.bubbles0.innerHTML = ln;
            b.bubbles1.innerHTML = ln;
            var dvs = b.cont.getElementsByClassName('bubble');
            for (f = 0; f < dvs.length; f++) {
                dvs[f].tween = new NomanicObject.tweenable();
            }
        }.bind(b);
        b.gobubble=function() {
            var b=this;
            if (b.bq.length < 1) {
                return;
            }
            var dvs = b.cont.getElementsByClassName('bubble'),
                f = b.bq.shift();
            dvs[f].style.top = '110%';
            var w = b.rand(8) + 2;
            dvs[f].style.width = w + '%';
            dvs[f].style.left = b.rand(100) + '%';
            dvs[f].tween.create({
                duration: 1500 * w,
                target: [dvs[f], f,this],
                step: function(ar, tw) {
                    ar[0].style.top = (((1 - tw) * 120) - 10) + '%';
                },
                finish: function(ar, tw) {
                    ar[0].style.top = '-10%';
                    if (ar[2].fabort != 1) {
                        ar[2].bq.push(ar[1]);
                        requestTimeout(ar[2].gobubble, 100);
                    }
                },
                autorun: 1
            });
        }.bind(b);
        b.startbubbles=function() {
            var b=this;
            var f,dvs = b.cont.getElementsByClassName('bubble');
            for (f = 0; f < dvs.length; f++) {
                b.bq.push(f);
                requestTimeout(b.gobubble,b.rand(3000));
            }
        }.bind(b);
        b.rand = function(r) {return Math.round(Math.random() * r);}
        b.floater=function() {
            var b=this,
                o = b.patrik,
                dr = (parseInt(o.dr) == 1) ? 0 : 1,
                dl = 3000 + b.rand(1500);
            o.dr = dr;
            b.ptween.create({
                duration: dl,
                target: [o, o.lo, (b.rand(dr == 1 ? 5 : -20) + 5),this],
                step: function(ar, tw) {
                    ar[0].style.top = NomanicObject.easer.interp(ar[1], ar[2], tw) + '%';
                },
                finish: function(ar, tw) {
                    ar[0].lo = NomanicObject.easer.interp(ar[1], ar[2], tw);
                    ar[0].style.top = ar[0].lo + '%';
                    if (ar[3].fabort != 1) {
                        requestTimeout(ar[3].floater, 100);
                    }
                },
                autorun: 1
            });
        }.bind(b);
        b.onready=function() {
            var b=this;
            if (!b.fired) {
                b.fired=1;
                b.patrik=b.cont.getElementsByClassName('patrik')[0];
                b.lay0=b.cont.getElementsByClassName('lay0')[0];
                b.lay1=b.cont.getElementsByClassName('lay1')[0];
                b.bubbles0=b.cont.getElementsByClassName('bubbles0')[0];
                b.bubbles1=b.cont.getElementsByClassName('bubbles1')[0];
                b.patrik.lo = 0;
                b.makebubbles(20);
                requestInterval(b.layoff, 5000);
                b.floater();
                b.startbubbles();
            }
        }.bind(b);
        return b;
    },
    loaded:function(cont,args,snip) {
        var f;
        for (f=0;f<brain.snips.length;f++) {
            if (brain.snips[f].snip==snip) {
                return brain.snips[f];
            }
        }
        var b=new brain.brain(cont,args,snip);
        b=brain.setup(b,cont,args,snip);
        brain.snips.push(b);
        return b;
    },
    onready:function(cont,args,snip) {
         var b;
         if (snip) {
            if (b=brain.loaded(cont,args,snip)) {
                clearRequestTimeout(b.tm);
                b.tm=requestTimeout(b.onready,1000);
            }
        }
    }
}

