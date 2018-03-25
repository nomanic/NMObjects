/**
 * Plugin Name: Nomanic Objects
 * Plugin URI: http://www.nomanic.biz/NMObjects/
 * Description: A Charting and Interface Package
 * Version: 4.75
 * Author: Neil Oman
 * Author URI: http://www.nomanic.biz/
 * License: Envato Split License with GPL (see text file)
 *
 * Copyright 2018  Nomanic  (email : nomanic99@gmail.com)
 *
 * Basically free for non-commercial use only.
 * If you wish to buy a license, please visit my website.
 */
"use strict";

//Main code for Nomanic Chart
var NomanicObject = {
    //various variables
    cframe: -1,
    npid: 0,
    cd: 0,
    objs: [],
    ref: 'parent',
    moused: 20,
    Pi2: 2 * Math.PI,
    PiHalf: 0.5 * Math.PI,
    defcolor: '#0D5FA9',
    qscript: [],
    introq: [],
    sloaded: 0,
    lightn: 0,
    snip: 0,
    snippetsrunning: 0,
    snippetsrunner: 0,
    dummyNMC: {
        replace: function() {},
        update: function() {},
        attach: function() {},
        rsr: function() {},
        setink: function() {},
        setcink: function() {},
        setgink: function() {}
    },
    addscript: function(lst) {
        NomanicObject.qscript = NomanicObject.qscript.concat(lst);
    },
    cssstr: '.blk{position:absolute}.w100{width:100%}.h100{height:100%}.tr{text-align:right}.tc{text-align:center}.Gooey_object{-webkit-transition:all .5s cubic-bezier(.64,.57,.67,1.53);-moz-transition:all .5s cubic-bezier(.64,.57,.67,1.53);-ms-transition:all .5s cubic-bezier(.64,.57,.67,1.53);-o-transition:all .5s cubic-bezier(.64,.57,.67,1.53);transition:all .5s cubic-bezier(.64,.57,.67,1.53)}',
    tag: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" width="xsizepx" y="0px" height="xsizepx" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g transform="translate(1)"><path fill="filly" d="M502.467,256c0,136.533-110.933,247.467-247.467,247.467S7.533,392.533,7.533,256S118.467,8.533,255,8.533S502.467,119.467,502.467,256"/><path fill="fillx" d="M255,512C114.2,512-1,396.8-1,256S114.2,0,255,0s256,115.2,256,256S395.8,512,255,512z M255,17.067C123.587,17.067,16.067,124.587,16.067,256S123.587,494.933,255,494.933S493.933,387.413,493.933,256S386.413,17.067,255,17.067z"/></svg>',
    vsz: function() {
        return [Math.max(document.documentElement.clientWidth, window.innerWidth || 0), Math.max(document.documentElement.clientHeight, window.innerHeight || 0)];
    },
    sfunc: function(functionName, context /*, args */ ) {
        var args = Array.prototype.slice.call(arguments, 2);
        var namespaces = functionName.split(".");
        var func = namespaces.pop();
        for (var i = 0; i < namespaces.length; i++) {
            context = context[namespaces[i]];
        }
        try {
            return context[func].apply(context, args);
        } catch (e) {
            return false;
        }
    },
    loadscript: function() {},
    lazyload: function(dv, im) {
        var i = new Image(),
            o = dv.style,
            loadim = NomanicObject.urlpath + 'ims/spinner.gif';
        o.backgroundColor = '#000000'; //'#2C2D2D';
        o.backgroundRepeat = 'no-repeat';
        o.backgroundSize = '48px 48px';
        o.backgroundPosition = 'center center'
        i.load = dv;
        i.onload = function() {
            this.load.style.backgroundImage = 'url(' + this.src + ')';
            this.load.style.backgroundRepeat = 'no-repeat';
            this.load.style.backgroundPosition = 'center center';
            this.load.style.backgroundSize = 'cover';
        }
        i.src = im;
        return 'url("' + loadim + '")';
    },
    //add css, get path to NomanicObject relative to current document, add Google Font
    setup: function(str) {
        var node = document.createElement('style');
        node.innerHTML = NomanicObject.cssstr;
        document.documentElement.appendChild(node);
        var scriptEls = document.getElementsByTagName('script'),
            thisScriptEl = scriptEls[scriptEls.length - 1],
            scriptPath = thisScriptEl.src,
            scriptFolder = scriptPath.substr(0, scriptPath.lastIndexOf('/') + 1);
        NomanicObject.urlpath = scriptFolder;
        document.write('<link href="' + NomanicObject.urlpath + 'core/NMC.css" rel="stylesheet">');
        NomanicObject.addscript([
            [NomanicObject.urlpath + 'core/shim.min.js', 0],
            [NomanicObject.urlpath + 'core/NMKeys.js', 0],
            [NomanicObject.urlpath + "core/vendor/draggabilly.min.js?r=" + Math.random(), 0],
            [NomanicObject.urlpath + "core/vendor/moment.min.js", 0]
        ]);
        NomanicObject.loadscript.prototype = {
            require: function(scripts, callback, path, std) {
                this.loadCount = 0;
                this.totalRequired = scripts.length;
                this.callback = callback;
                this.std = std;
                for (var i = 0; i < scripts.length; i++) {
                    if (path) {
                        this.writeScript(scripts[i]);
                    } else {
                        this.writeScript(scripts[i][0], scripts[i][1]);
                    }
                }
                var self = this;
                if (scripts.length < 1) {
                    if (self.std) {
                        self.callback(self.std);
                    } else {
                        if (!path) {
                            NomanicObject.sfunc(scripts[i][1], window);
                        }
                        self.callback.call();
                    }
                }
            },
            loaded: function(evt) {
                this.loadCount++;
                if (this.loadCount == this.totalRequired && typeof this.callback == 'function') this.callback.call();
            },
            writeScript: function(src, nm) {
                var self = this;
                var s = document.createElement('script');
                s.type = "text/javascript";
                s.async = true;
                var iw = nm ? s.setAttribute('label', nm) : 0;
                s.src = src;
                s.addEventListener('load', function(e) {
                    if (self.std) {
                        self.callback(self.std);
                    } else {
                        if (this.hasAttribute('label')) {
                            NomanicObject.sfunc(this.getAttribute('label'), window);
                        }
                        self.loaded(e);
                    }
                }, false);
                var head = document.getElementsByTagName('head')[0];
                head.appendChild(s);
            }
        };
        NomanicObject.DOMready(function() {
            var elem = document.createElement('div');
            elem.style.cssText = 'position:fixed;top:-10px;left:0px;width:100%;height:200%;z-index:999998;';
            elem.setAttribute('id', 'overlay00001');
            document.body.appendChild(elem);
            NomanicObject.ob('overlay00001').innerHTML = '<div class="blk w100 h100" style="background-color:#000;opacity:0.65;"></div>';
            elem.style.display = 'none';
            NomanicObject.coreparser(false, false, false, false, 1);
        });
    },
    shd: function(x) {
        return (Math.round(Math.cos(x * 2) * 100 + 100) / 200) - 0.2;
    },
    grab: function(n, mn, mx) {
        var n, f, sr = [];
        for (f = 0; f < n; f++) {
            sr.push((Math.random() * (mx - mn)) + mn);
        }
        return sr;
    },
    deps: function(sq) {
        NomanicObject.scriptq = new NomanicObject.loadscript();
        NomanicObject.scriptq.require(sq,
            function() {
                NomanicObject.process();
            });
    },
    process: function() {
        NomanicObject.scriptq = new NomanicObject.loadscript();
        NomanicObject.scriptq.require(NomanicObject.qscript,
            function() {
                NomanicObject.loaded = 1;
                var f;
                for (f = 0; f < NomanicObject.depds.length; f++) {
                    NomanicObject.sfunc(NomanicObject.depds[f], window);
                }
            });
    },
    depds: [],
    dependency: function(fn) {
        NomanicObject.deps.push(fn);
    },
    registry: [],
    register: function(fn, ar) {
        var f;
        for (f = 0; f < ar.length; f++) {
            NomanicObject.registry.push([fn, ar[f]]);
        }
    },
    getregistry: function(typ) {
        var f;
        for (f = 0; f < NomanicObject.registry.length; f++) {
            if (NomanicObject.registry[f][1] == typ) {
                return NomanicObject.registry[f][0];
            }
        }
        return 'NomanicObject.nth';
    },
    attacher: function(NMC, ev, fn) {
        switch (ev) {
            case 'onready':
                NMC.onready = fn;
                break;
            case 'onclose':
                NMC.onclose = fn;
                break;
            case 'onbutton':
                NMC.onbutton = fn;
                break;
            case 'onfire':
                NMC.onfire = fn;
                break;
            case 'onbeforersr':
                NMC.onbeforersr = fn;
                break;
            case 'onafterrsr':
                NMC.onafterrsr = fn;
                break;
            case 'onselect':
                NMC.onselect = fn;
                break;
            case 'onupdate':
                NMC.onupdate = fn;
                break;
            case 'onshowdata':
                NMC.onshowdata = fn;
                break;
            case 'ontogglelegend':
                NMC.ontogglelegend = fn;
                break;
            case 'ongettag':
                NMC.ongettag = fn;
                break;
            case 'ongetmenu':
                NMC.ongetmenu = fn;
                break;
        }
        NomanicObject.objs[NMC.id] = NMC;
        return NMC;
    },
    nth: function(NMC) {
        var self = NMC;
        NMC.attach = function(ev, fn) {
            return NomanicObject.attacher(self, ev, fn);
        };
        NMC.rsr = NomanicObject.rsre;
        NMC.redraw = NomanicObject.rsre;
        NMC = NomanicObject.createbefore(NMC);
        NMC.objects = {};
        NMC.objects.div = NomanicObject.ob(NMC.container);
        NMC.objects.wrapper = NomanicObject.ob('wrapper' + NMC.pid);
        if (!NMC.objects.wrapper) {
            return NMC;
        }
        NMC.objects.wrapper.nink = NMC.layout.pencil.nink;
        NMC.objects.inwrapper = NomanicObject.ob('inwrapper' + NMC.pid);
        NMC.objects.hold = NomanicObject.ob('hold' + NMC.pid);
        NMC.objects.iwrapper = NomanicObject.ob('iwrapper' + NMC.pid);
        NMC.objects.frame = NomanicObject.ob('b0' + NMC.pid);
        NMC.objects.axisy = NomanicObject.ob('b1' + NMC.pid);
        NMC.objects.axisx = NomanicObject.ob('b2' + NMC.pid);
        NMC.objects.xscroll = NomanicObject.ob('b3' + NMC.pid);
        NMC.objects.yscroll = NomanicObject.ob('b4' + NMC.pid);
        NMC.objects.lscroll = NomanicObject.ob('b10' + NMC.pid);
        NMC.objects.xscroller = NMC.objects.xscroll.children[0].children[0];
        NMC.objects.yscroller = NMC.objects.yscroll.children[0].children[0];
        NMC.objects.lscroller = NMC.objects.lscroll.children[0].children[0];
        NMC.objects.head = NomanicObject.ob('b6' + NMC.pid);
        NMC.objects.t2 = NomanicObject.ob('b15' + NMC.pid);
        NMC.objects.t3 = NomanicObject.ob('t3' + NMC.pid);
        NMC.objects.legend = NomanicObject.ob('b8' + NMC.pid);
        NMC.objects.tray = NMC.objects.legend.children[0];
        NMC.objects.grapha = NomanicObject.ob('b9a' + NMC.pid);
        NMC.objects.graph = NomanicObject.ob('b9' + NMC.pid);
        NMC.objects.canvas = NMC.objects.graph.children[0];
        NMC.objects.grid = NMC.objects.canvas.children[0];
        NMC.objects.panel = NMC.objects.canvas.children[1];
        NMC.objects.panels = [NomanicObject.ob('panelwest' + NMC.pid), NomanicObject.ob('panelnorth' + NMC.pid), NomanicObject.ob('paneleast' + NMC.pid), NomanicObject.ob('panelsouth' + NMC.pid), NomanicObject.ob('wrapper' + NMC.pid), NomanicObject.ob('panelnorthsub' + NMC.pid), NomanicObject.ob('panelsouthsub' + NMC.pid)];
        NMC.ctx = NMC.objects.panel.getContext("2d");
        NMC.ctx.translate(0.5, 0.5);
        NMC.objects.tools = NMC.objects.canvas.children[3];
        NMC.objects.tools.style.pointerEvents = 'none';
        NMC.objects.svg = NMC.objects.canvas.children[4];
        NMC.objects.svg.style.pointerEvents = 'none';
        NMC.objects.zoom = NomanicObject.ob('zoom' + NMC.pid);
        NMC.objects.zoomup = NomanicObject.ob('zoom0' + NMC.pid);
        NMC.objects.zoomdn = NomanicObject.ob('zoom1' + NMC.pid);
        NMC.objects.zoomtx = NomanicObject.ob('zoom2' + NMC.pid);
        NMC.objects.grunge = NomanicObject.ob('b13' + NMC.pid);
        NMC.objects.hint = NomanicObject.ob('b14' + NMC.pid);
        NMC.objects.mask = NMC.objects.canvas.children[2];
        NMC.objects.border0 = NomanicObject.ob('b11' + NMC.pid);
        NMC.objects.border1 = NomanicObject.ob('b12' + NMC.pid);
        NMC.objects.caption = NomanicObject.ob('b140' + NMC.pid);
        NMC.objects.frh = NMC.objects.wrapper.getElementsByClassName('frh');
        NMC.objects.frw = NMC.objects.wrapper.getElementsByClassName('frw');
        NMC.objects.frh100 = NMC.objects.wrapper.getElementsByClassName('frh100');
        NMC.objects.frw100 = NMC.objects.wrapper.getElementsByClassName('frw100');
        NMC = NomanicObject.getframe(NMC);
        var g = 'grunge' + ((NMC.layout.background.grunge) ? NomanicObject.padZero((parseInt(NMC.layout.background.grunge) - 1), 2) : '') + '.png?r=' + Math.random();
        NMC.objects.grunge.style.backgroundImage = 'url("' + NomanicObject.urlpath + 'ims/' + g + '")';
        g = 'hint' + ((NMC.layout.background.hint) ? NomanicObject.padZero((parseInt(NMC.layout.background.hint) - 1), 2) : '') + '.png?r=' + Math.random();
        NMC.objects.hint.style.backgroundImage = 'url("' + NomanicObject.urlpath + 'ims/' + g + '")';
        if (NMC.layout.background.image) {
            NMC.objects.iwrapper.style.backgroundImage = NomanicObject.lazyload(NMC.objects.iwrapper, NMC.layout.background.image);
        }
        if (NMC.layout.background.color) {
            NMC.objects.iwrapper.style.backgroundColor = NMC.layout.background.color;
        }
        NMC = NomanicObject.createafter(NMC);
        NomanicObject.fn = false;
        NomanicObject.fn2 = false;
        NomanicObject.fired2 = 0;
        NomanicObject.optionsq = [];
        NMC = NomanicObject.finally(NMC);
        NomanicObject.processThem();
    },
    processChart: function(fn, arg) {
        NomanicObject.sfunc(fn, window, arg);
    },
    todoq: [],
    qtodoq: function(a) {
        var f;
        for (f = 0; f < NomanicObject.todoq.length; f++) {
            if ((NomanicObject.todoq[f][8] == a[8]) && (NomanicObject.todoq[f][4] == a[4])) {
                return;
            }
        }
        NomanicObject.todoq.push(a);
    },
    rtodoq: function() {
        var c;
        if (NomanicObject.todoq.length > 0) {
            requestTimeout(NomanicObject.rtodoq, 1500);
        }
        while (NomanicObject.todoq.length > 0) {
            c = NomanicObject.todoq.pop();
            if (c[4]) {
                NomanicObject.sfunc(c[4] + '.onready', window, c[3], c[5], c[10].getAttribute('snip'));
            }
            if (c[8]) {
                NomanicObject.sfunc(c[8] + '.onready', window, c[3], c[5], c[10].getAttribute('snip'));
            }
        }
    },
    processThem: function(fn, ar) {
        var iw, s, fn;
        if (!NomanicObject.loaded) {
            setTimeout(NomanicObject.processThem, 500);
            return;
        }
        if (NomanicObject.processq.length > 0) {
            s = NomanicObject.processq.shift();
            NomanicObject.processChart(NomanicObject.getregistry(s[0]), s[1]);
            NomanicObject.fn = s[1].fn[0] ? s[1].fn : NomanicObject.fn;
            iw = s[1].fn[4] ? s[1].fn[4] : (NomanicObject.fn2 ? NomanicObject.fn2[4] : false);
            NomanicObject.fn2 = s[1].fn[7] ? s[1].fn : NomanicObject.fn2;
            if (NomanicObject.fn2) {
                NomanicObject.fn2[4] = iw;
            }
            if (s[1].fn[4] || s[1].fn[8]) {
                NomanicObject.qtodoq(s[1].fn);
            }
            if (s[1].fn[7]) {
                NomanicObject.sfunc(s[1].fn[4] + '.oneach', window, s[1].div, s[1].fn[5], s[1].fn[6]);
            }
            NomanicObject.snippetsrunning--;
        }
        if (NomanicObject.processq.length === 0) {
            if (!NomanicObject.snippetparser(NomanicObject.lastpp)) {
                NomanicObject.fired2++;
                if (NomanicObject.fired2 > 0) {
                    requestTimeout(NomanicObject.rtodoq, 2000);
                    iw = NomanicObject.onready ? NomanicObject.onready() : 0;
                    NomanicObject.onready = false;
                    var NMC, s;
                    if (NomanicObject.fn[2]) {
                        if (NomanicObject.fn[2].switchanim) {
                            NomanicObject.fader(0, 0, NomanicObject.fn[2].objects.grunge.children[0], 1000);
                        }
                    }
                    iw = (NomanicObject.fn && NomanicObject.fn[0]) ? (NomanicObject.fn[0])(NomanicObject.fn[1]) : 0;
                }
            }
        }
    },
    assignID: function() {
        var f = 0;
        while (NomanicObject.objs[f]) {
            f++;
        }
        return f;
    },
    processq: [],
    create: function(ar) {
        var NMC = ar[1],
            p = ar[0],
            o = NomanicObject.ob(NMC.container);
        NMC.id = NomanicObject.assignID();
        o.setAttribute('idx', NMC.id);
        NomanicObject.objs[NMC.id] = NMC;
        NMC.pid = '_' + NomanicObject.padZero((NomanicObject.npid++), 6);
        NomanicObject.processq.push([NMC.layout.type, NMC]);
        if (p) {
            o = p.hasAttribute('children') ? p.getAttribute('children') : '';
            o = o == '' ? '' : ',';
            p.setAttribute('children', o + NMC.id);
        }
        return NMC;
    },
    //helper functions
    ob: function(orange, quebec) {
        return (typeof orange === 'string') ? ((orange === '') ? quebec : document.getElementById(orange)) : orange;
    },
    rgbToHex: function(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    },
    interp: function(x0, x1, tw) {
        return (tw * (x1 - x0)) + x0;
    },
    hexToRgb: function(hex) {
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
            hex1 = hex.replace(shorthandRegex, function(m, r, g, b) {
                return r + r + g + g + b + b;
            }),
            result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex1);
        return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        ] : null;
    },
    interphex: function(h0, h1, tw) {
        var x0 = NomanicObject.hexToRgb(h0),
            x1 = easer.hexToRgb(h1);
        return NomanicObject.rgbToHex(parseInt(NomanicObject.interp(x0[0], x1[0], tw)), parseInt(NomanicObject.interp(x0[1], x1[1], tw)), parseInt(NomanicObject.interp(x0[2], x1[2], tw)));
    },
    padZero: function(v, len, c) {
        var s = '',
            c = c || '0',
            len = (len || 2) - (v + '').length;
        while (s.length < len) s += c;
        return s + v;
    },
    replaceAll: function(target, search, replacement) {
        return target.split(search).join(replacement);
    },
    addResizeEvent: function(func) {
        var oldResize = window.onresize;
        window.onresize = function() {
            if (typeof oldResize === 'function') {
                oldResize();
            }
            func();
        };
    },
    lighten: function(hex, lum) {
        if ((hex = String(hex).replace(/[^0-9a-f]/gi, '')).length < 6) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        lum = lum || 0;
        var rgb = "#",
            c, i;
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i * 2, 2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ("00" + c).substr(c.length);
        }
        return rgb;
    },
    generate: function(col, n) {
        var outp = [],
            i, ar = NomanicObject.hexToRgb(col);
        outp.push(col);
        for (i = 0; i < n - 1; i++) {
            outp.push(NomanicObject.rgbToHex((ar[0] = (ar[0] + 33 > 255 ? 255 : (ar[0] + 33))), (ar[1] = (ar[1] + 33 > 255 ? 255 : (ar[1] + 33))), (ar[2] = (ar[2] + 33 > 255 ? 255 : (ar[2] + 33)))));
        }
        return outp;
    },
    generaterange: function(col, ar) {
        var i, outp = [],
            min = ar[0],
            max = ar[0];
        for (i = 1; i < ar.length; i++) {
            min = (min < ar[i]) ? min : ar[i];
            max = (max > ar[i]) ? max : ar[i];
        }
        for (i = 0; i < ar.length; i++) {
            outp.push(NomanicObject.interphex(col[0], col[1], ((ar[i] - min) / (max - min))));
        }
        return outp;
    },
    getsvg: function(svgln, x, cl, cl2) {
        var s = NomanicObject.replaceAll(svgln, 'xsize', x);
        s = NomanicObject.replaceAll(s, 'filly', cl);
        return NomanicObject.replaceAll(s, 'fillx', cl2);
    },
    getCon: function(bgColor) {
        var nThreshold = 105,
            components = NomanicObject.hexToRgb(bgColor),
            bgDelta = (components[0] * 0.299) + (components[1] * 0.587) + (components[2] * 0.114);
        return ((255 - bgDelta) < nThreshold) ? "#454545" : "#FFFFFF";
    },
    fix: function(num) {
        return num.toFixed(2);
    },
    abbrNum: function(number, decPlaces) {
        var sgn = (number < 0) ? -1 : 1,
            fixed = 0;
        number = number * sgn;
        decPlaces = Math.pow(10, decPlaces ? decPlaces : 2);
        var i, size, abbrev = ["k", "m", "b", "t"];
        for (i = abbrev.length - 1; i >= 0; i--) {
            size = Math.pow(10, (i + 1) * 3);
            if (size <= number) {
                number = Math.round(number * decPlaces / size) / decPlaces;
                if ((number == 1000) && (i < abbrev.length - 1)) {
                    number = 1;
                    i++;
                }
                number = NomanicObject.fix(number) + abbrev[i];
                fixed = 1;
                break;
            }
        }
        return (sgn == -1 ? '-' : '') + (fixed ? number : NomanicObject.fix(number));
    },
    converth: function(value, canvasLow, canvasHigh, gameLow, gameHigh) {
        return (canvasLow + (canvasHigh - canvasLow) * (value - gameLow) / (gameHigh - gameLow));
    },
    addClick: function(NMC, element, funct) {
        var f2 = function(e) {
            funct(e, NMC);
        }
        NMC.clicklog = NMC.clicklog ? NMC.clicklog : [];
        NMC.clicklog.push([element, f2, 'click']);
        element.addEventListener('click', f2, false);
        element.style.cursor = 'pointer';
        return NMC;
    },
    addMouse: function(NMC, element, funct) {
        var f2 = function(e) {
            funct(e, NMC);
        }
        NMC.clicklog = NMC.clicklog ? NMC.clicklog : [];
        NMC.clicklog.push([element, f2, "mousewheel"]);
        element.addEventListener("mousewheel", f2, false);
        NMC.clicklog.push([element, f2, "DOMMouseScroll"]);
        element.addEventListener("DOMMouseScroll", f2, false);
        return NMC;
    },
    remClick: function(NMC) {
        if (!NMC) {
            return NMC;
        }
        var iw, f;
        NMC.clicklog = NMC.clicklog ? NMC.clicklog : [];
        for (f = 0; f < NMC.clicklog.length; f++) {
            if (NomanicObject.ob(NMC.clicklog[f][0])) {
                NMC.clicklog[f][0].style.cursor = 'default';
                NMC.clicklog[f][0].removeEventListener(NMC.clicklog[f][2], NMC.clicklog[f][1]);
            }
        }
        iw = NMC.draggie ? NMC.draggie.destroy() : 0;
        iw = NMC.draggie2 ? NMC.draggie2.destroy() : 0;
        iw = NMC.draggie3 ? NMC.draggie3.destroy() : 0;
        iw = NMC.draggie4 ? NMC.draggie4.destroy() : 0;
        NMC.clicklog = [];
        return NMC;
    },
    destroy: function(NMC) {
        NomanicObject.destroykids(NMC);
        return NomanicObject.remClick(NMC);
    },
    addResizeEvent: function(func) {
        var oldResize = window.onresize;
        window.onresize = function() {
            func();
            if (typeof oldResize === 'function') {
                oldResize();
            }
        };
    },
    addCommas: function(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    //control sliders
    sortoutslider: function(NMC, chg) {
        if (!NMC.draggie) {
            return NMC;
        }
        var vert = NMC.layout.vertical,
            c = NMC.objects.canvas,
            w = (vert ? c.offsetHeight : c.offsetWidth),
            s = vert ? NMC.objects.yscroller : NMC.objects.xscroller,
            o = vert ? NMC.objects.yscroll : NMC.objects.xscroll,
            ws = (vert ? o.offsetHeight : o.offsetWidth),
            ps = (vert ? (NMC.lchg == 2 ? s.offsetTop : NMC.draggie.position.y) : (NMC.lchg == 2 ? s.offsetLeft : NMC.draggie.position.x)),
            ch = NMC.objects.graph,
            chw = (vert ? ch.offsetHeight : ch.offsetWidth),
            cha = NMC.objects.grapha,
            chwa = (vert ? cha.offsetHeight : cha.offsetWidth),
            d = 0,
            p = Math.ceil((chw / w >= 1) ? 100 : ((chw / w) * 100));
        var iw = (vert ? s.style.height = p + '%' : (s.style.width = p + '%')),
            slw = (vert ? s.offsetHeight : s.offsetWidth),
            ops = ps,
            fg, os;
        if (ps > (ws - slw - 4)) {
            ps = ws - slw;
            fg = -w + chw;
        } else if (ps < 4) {
            ps = 0;
            fg = 0;
        } else {
            fg = Math.ceil(NomanicObject.converth(ps, 0, -w + chw, 0, (ws - slw)));
        }
        fg = fg > 0 ? 0 : fg;
        if (ps < 0) {
            ps = 0;
            fg = 0;
        } else if (ps > (ws - slw - 4)) {
            ps = ws - slw;
            fg = -w + chw;
        }
        fg = (fg > 0) ? 0 : fg;
        iw = (chg == 1 ? 0 : (vert ? s.style.top = ps + 'px' : (s.style.left = ps + 'px'))) + (vert ? c.style.top = fg + 'px' : (c.style.left = fg + 'px'));
        s.style.display = (p == 100) ? 'none' : 'block';
        NMC.lchg = ((chg == 2) || (chg == 1)) ? chg : NMC.lchg;
        return NMC;
    },
    sortoutzoomslider: function(NMC, chg, dr) {
        if (!NMC.draggie4) {
            return NMC;
        }
        var vert = dr,
            c = NMC.objects.graph,
            w = (vert ? c.offsetHeight : c.offsetWidth),
            s = vert ? NMC.objects.yscroller : NMC.objects.xscroller,
            o = vert ? NMC.objects.yscroll : NMC.objects.xscroll,
            ws = (vert ? o.offsetHeight : o.offsetWidth),
            ps = (vert ? (NMC.lchg == 2 ? s.offsetTop : (dr ? NMC.draggie3 : NMC.draggie4).position.y) : (NMC.lchg == 2 ? s.offsetLeft : (dr ? NMC.draggie3 : NMC.draggie4).position.x)),
            ch = NMC.objects.grapha,
            chw = (vert ? ch.offsetHeight : ch.offsetWidth),
            p = Math.ceil((chw / w >= 1) ? 100 : ((chw / w) * 100));
        var iw = (vert ? s.style.height = p + '%' : (s.style.width = p + '%')),
            slw = (vert ? s.offsetHeight : s.offsetWidth),
            ops = ps,
            fg, os;
        if (ps > (ws - slw - 4)) {
            ps = ws - slw;
            fg = -w + chw;
        } else if (ps < 4) {
            ps = 0;
            fg = 0;
        } else {
            fg = Math.ceil(NomanicObject.converth(ps, 0, -w + chw, 0, (ws - slw)));
        }
        fg = fg > 0 ? 0 : fg;
        if (ps < 0) {
            ps = 0;
            fg = 0;
        } else if (ps > (ws - slw - 4)) {
            ps = ws - slw;
            fg = -w + chw;
        }
        fg = (fg > 0) ? 0 : fg;
        iw = (chg == 1 ? 0 : (vert ? s.style.top = ps + 'px' : (s.style.left = ps + 'px'))) + (vert ? c.style.top = fg + 'px' : (c.style.left = fg + 'px'));
        s.style.display = (p == 100) ? 'none' : 'block';
        NMC.lchg = ((chg == 2) || (chg == 1)) ? chg : NMC.lchg;
        return NMC;
    },
    sortouttrayslider: function(NMC, chg) {
        if (!NMC.draggie2) {
            return NMC;
        }
        var c = NMC.objects.tray,
            w = c.offsetHeight,
            s = NMC.objects.lscroller,
            o = NMC.objects.lscroll,
            ws = o.offsetHeight,
            ps = NMC.llchg == 2 ? s.offsetTop : NMC.draggie2.position.y,
            ch = NMC.objects.legend,
            chw = ch.offsetHeight,
            p = Math.ceil((chw / w > 1) ? 100 : ((chw / w) * 100)),
            lc = NMC.layout.showlscroll,
            cz = ((p == 100) ? 0 : 1);
        if (lc != cz) {
            NMC.layout.showlscroll = cz;
            NMC = NMC.rsr(NMC, 2);
        }
        var iw = s.style.height = p + '%',
            slw = s.offsetHeight,
            ops = ps,
            fg, os;
        if (ps > (ws - slw - 4)) {
            ps = ws - slw;
            fg = -w + chw;
        } else if (ps < 4) {
            ps = 0;
            fg = 0;
        } else {
            fg = Math.ceil(converth(ps, 0, -w + chw, 0, (ws - slw)));
        }
        fg = fg > 0 ? 0 : fg;
        if (ps < 0) {
            ps = 0;
            fg = 0;
        } else if (ps > (ws - slw - 4)) {
            ps = ws - slw;
            fg = -w + chw;
        }
        if (p == 100) {
            ps = 0;
            fg = (NMC.layout.fullscreen ? ((chw - w) / 2) : 0);
        }
        iw = (chg == 1 ? 0 : s.style.top = ps + 'px') + (c.style.top = fg + 'px');
        NMC.llchg = ((chg == 2) || (chg == 1)) ? chg : NMC.llchg;
        return NMC;
    },
    //masks
    makemask: function(NMC, col, img) {
        NomanicObject.fader(1, 0, NMC.objects.grunge.children[0], 500);
        var i, im = new Image(),
            self = NMC;
        im.onload = function() {
            var ctx, c = document.createElement('canvas'),
                NMC = self;
            c.setAttribute('width', this.width);
            c.setAttribute('height', this.height);
            ctx = c.getContext('2d');
            ctx.drawImage(this, 0, 0);
            var cl = NomanicObject.hexToRgb(col),
                imageData = ctx.getImageData(0, 0, c.width, c.height),
                data = imageData.data,
                imgData2 = ctx.createImageData(c.width, c.height);
            var createmask = function() {
                var i, b64;
                for (i = 0; i < data.length; i += 4) {
                    if ((data[i] > 250) && (data[i + 1] > 250) && (data[i + 2] > 250)) {
                        imgData2.data[i] = cl[0];
                        imgData2.data[i + 1] = cl[1];
                        imgData2.data[i + 2] = cl[2];
                        imgData2.data[i + 3] = 255;
                    } else {
                        imgData2.data[i + 3] = 0;
                    }
                }
                ctx.putImageData(imgData2, 0, 0);
                var image = new Image();
                image.onload = function() {
                    NMC.mask = this;
                    NMC = NomanicObject.redomask(NMC);
                    NomanicObject.objs[NMC.id] = NMC;
                    NMC.redraw(NMC);
                    NomanicObject.fader(0, 0, NMC.objects.grunge.children[0], 500);
                };
                image.src = c.toDataURL('image/png');
            };
            createmask();
        }
        im.src = img + '?r=' + Math.random();
    },
    redomask: function(NMC) {
        if (!NMC.mask) {
            return NMC;
        }
        var sz = [NMC.objects.graph.offsetWidth, NMC.objects.graph.offsetHeight];
        if (((!NMC.pnts) || (!NMC.sz)) || ((sz[0] != NMC.sz[0]) || (sz[1] != NMC.sz[1]))) {
            var ctx, c = document.createElement('canvas');
            c.setAttribute('width', NMC.objects.graph.offsetWidth);
            c.setAttribute('height', NMC.objects.graph.offsetHeight);
            ctx = c.getContext('2d');
            ctx.drawImage(NMC.mask, 0, 0, NMC.objects.graph.offsetWidth, NMC.objects.graph.offsetHeight);
            var imageData = ctx.getImageData(0, 0, c.width, c.height),
                data = imageData.data,
                imgData2 = ctx.createImageData(c.width, c.height);
            NMC.sz = [NMC.objects.graph.offsetWidth, NMC.objects.graph.offsetHeight];
            NMC.pnts = [];
            var mv = 0,
                px = 0,
                iw = 0,
                ih = 0,
                b64, cp = 1,
                cw = c.width,
                ch = c.height,
                cv;
            while (px < data.length) {
                NMC.pnts[ih] = [];
                iw = 0;
                while (iw < cw) {
                    if ((data[px + 3] > 0) && (iw < cw)) {
                        while ((data[px + 3] > 0) && (iw < cw)) {
                            px += 4;
                            iw++;
                        }
                    }
                    if ((data[px + 3] === 0) && (iw < cw)) {
                        mv = iw;
                        cv = NMC.pnts[ih].length;
                        while ((data[px + 3] === 0) && (iw < cw)) {
                            NMC.pnts[ih][cv] = [mv, iw];
                            px += 4;
                            iw++;
                        }
                    }
                }
                ih++;
            }
        }
        return NMC;
    },
    //various
    makepattern: function(NMC, img, n) {
        var im = new Image();
        im.src = img;
        NMC.pattern[n] = im;
        return NMC;
    },
    openfill: function(NMC, o, allow, fn) {
        NMC.openfiller = NomanicObject.ob(o);
        return NomanicObject.fillcontent(NMC, NMC.openfiller.innerHTML, fn, allow);
    },
    loadpanels: function(NMC, o) {
        var txt = o.innerHTML,
            p, f;
        txt = NomanicObject.replaceAll(txt, '{snip}', NomanicObject.getsnip());
        p = txt.split('==PANEL==');
        for (f = 0; f < 6; f++) {
            p[f] = p[f] ? p[f] : '';
        }
        return p;
    },
    cleanup: function(ln) {
        ln = NomanicObject.replaceAll(ln, '{snip}', NomanicObject.getsnip());
        var regex = /\[button(.*)button\]/g;
        ln = ln.replace(regex, function(match) {
            return match + '!!button here';
        });
        return ln;
    },
    snippetfill: function(opts) {
        var url = NomanicObject.urlpath + 'snippets/' + opts.snippet;
        NomanicObject.postAjax(url, opts, function(ln, opts) {
            NomanicObject.fillcontent(false, ln, opts.callback, opts.allowclick, opts.div, opts.snippet);
        });
    },
    fillcontent: function(NMC, ln, fn, allow, dv, snippet) {
        var o = dv ? NomanicObject.ob(dv) : NomanicObject.ob('b98' + NMC.pid);
        if (!o) {
            return;
        }
        var args = NMC ? NMC.snipargs : (o.hasAttribute('args') ? JSON.parse(o.getAttribute('args')) : {});
        o.setAttribute('children', '');
        o.setAttribute('snippet', snippet);
        ln = NomanicObject.cleanup(ln);
        o.innerHTML = '<div class="blk w100 h100" style="' + (allow ? 'pointer-Events:auto;' : '') + '">' + ln + '</div><div class="blk" style="' + (allow ? 'pointer-Events:auto;' : '') + '"></div>';
        var b = o.getElementsByClassName('NomanicObject_hidden'),
            f;
        for (f = 0; f < b.length; f++) {
            NomanicObject.addClass(b[f], 'NomanicObject');
            NomanicObject.addClass(b[f], 'blk');
            NomanicObject.addClass(b[f], 'w100');
            NomanicObject.addClass(b[f], 'h100');
        }
        b = o.getElementsByClassName('NomanicObject_lightbox_hidden'), f;
        for (f = 0; f < b.length; f++) {
            NomanicObject.addClass(b[f], 'NomanicObject_lightbox');
        }
        b = o.getElementsByClassName('NomanicObject_scripts_hidden'), f;
        for (f = 0; f < b.length; f++) {
            NomanicObject.addClass(b[f], 'NomanicObject_scripts');
        }
        NomanicObject.scriptparser(o.firstChild, NMC ? NMC.pkg : false, [fn, false, false, o, NMC ? NMC.div : o], args, 1, NMC);
        return NMC;
    },
    //obtain links to all objects on chart
    loadlayout: function(NMC) {
        var o;
        NMC.objects = {};
        NMC.objects.div = NomanicObject.ob(NMC.container);
        NMC.objects.wrapper = NomanicObject.ob('wrapper' + NMC.pid);
        if (!NMC.objects.wrapper) {
            return NMC;
        }
        NMC.objects.wrapper.nink = NMC.layout.pencil.nink;
        NMC.objects.inwrapper = NomanicObject.ob('inwrapper' + NMC.pid);
        NMC.objects.iwrapper = NomanicObject.ob('iwrapper' + NMC.pid);
        NMC.objects.hold = NomanicObject.ob('hold' + NMC.pid);
        NMC.objects.frame = NomanicObject.ob('b0' + NMC.pid);
        NMC.objects.axisy = NomanicObject.ob('b1' + NMC.pid);
        NMC.objects.axisx = NomanicObject.ob('b2' + NMC.pid);
        NMC.objects.xscroll = NomanicObject.ob('b3' + NMC.pid);
        NMC.objects.yscroll = NomanicObject.ob('b4' + NMC.pid);
        NMC.objects.lscroll = NomanicObject.ob('b10' + NMC.pid);
        NMC.objects.xscroller = NMC.objects.xscroll.children[0].children[0];
        NMC.objects.yscroller = NMC.objects.yscroll.children[0].children[0];
        NMC.objects.lscroller = NMC.objects.lscroll.children[0].children[0];
        NMC.objects.head = NomanicObject.ob('b6' + NMC.pid);
        NMC.objects.t2 = NomanicObject.ob('b15' + NMC.pid);
        NMC.objects.t3 = NomanicObject.ob('t3' + NMC.pid);
        NMC.objects.legend = NomanicObject.ob('b8' + NMC.pid);
        NMC.objects.tray = NMC.objects.legend.children[0];
        NMC.objects.grapha = NomanicObject.ob('b9a' + NMC.pid);
        NMC.objects.graph = NomanicObject.ob('b9' + NMC.pid);
        NMC.objects.canvas = NMC.objects.graph.children[0];
        NMC.objects.grid = NMC.objects.canvas.children[0];
        NMC.objects.panel = NMC.objects.canvas.children[1];
        NMC.objects.panels = [NomanicObject.ob('panelwest' + NMC.pid), NomanicObject.ob('panelnorth' + NMC.pid), NomanicObject.ob('paneleast' + NMC.pid), NomanicObject.ob('panelsouth' + NMC.pid), NomanicObject.ob('wrapper' + NMC.pid), NomanicObject.ob('panelnorthsub' + NMC.pid), NomanicObject.ob('panelsouthsub' + NMC.pid)];
        NMC.ctx = NMC.objects.panel.getContext("2d");
        NMC.ctx.translate(0.5, 0.5);
        NMC.objects.tools = NMC.objects.canvas.children[3];
        NMC.objects.tools.style.pointerEvents = 'none';
        NMC.objects.svg = NMC.objects.canvas.children[4];
        NMC.objects.svg.style.pointerEvents = 'none';
        NMC.objects.zoom = NomanicObject.ob('zoom' + NMC.pid);
        NMC.objects.zoomup = NomanicObject.ob('zoom0' + NMC.pid);
        NMC.objects.zoomdn = NomanicObject.ob('zoom1' + NMC.pid);
        NMC.objects.zoomtx = NomanicObject.ob('zoom2' + NMC.pid);
        NMC.objects.grunge = NomanicObject.ob('b13' + NMC.pid);
        NMC.objects.hint = NomanicObject.ob('b14' + NMC.pid);
        NMC.objects.mask = NMC.objects.canvas.children[2];
        NMC.objects.border0 = NomanicObject.ob('b11' + NMC.pid);
        NMC.objects.border1 = NomanicObject.ob('b12' + NMC.pid);
        NMC.objects.caption = NomanicObject.ob('b140' + NMC.pid);
        NMC.objects.frh = NMC.objects.wrapper.getElementsByClassName('frh');
        NMC.objects.frw = NMC.objects.wrapper.getElementsByClassName('frw');
        NMC.objects.frh100 = NMC.objects.wrapper.getElementsByClassName('frh100');
        NMC.objects.frw100 = NMC.objects.wrapper.getElementsByClassName('frw100');
        if (NMC.layout.showlegend < 1) {
            (o = NMC.objects.lscroller).setAttribute('NMC', NMC.id);
            o.style.cursor = 'pointer';
            NMC.draggie2 = new Draggabilly(o, {
                containment: true
            });
            NMC.draggie2.on('dragMove', function(event, pointer, moveVector) {
                var NMC = NomanicObject.objs[parseInt((this.element).getAttribute('NMC'))];
                NMC = NomanicObject.sortouttrayslider(NMC, 1);
                NomanicObject.objs[NMC.id] = NMC;
            });
            NMC.objects.tray.style.top = '0px';
            NMC.objects.lscroller.style.top = '0px';
        }
        NMC.showtitle(NMC.layout.showtitle);
        NMC = NomanicObject.getframe(NMC);
        NMC = NMC.loadlegend(NMC);
        var g = 'grunge' + ((NMC.layout.background.grunge) ? NomanicObject.padZero((parseInt(NMC.layout.background.grunge) - 1), 2) : '') + '.png?r=' + Math.random();
        NMC.objects.grunge.style.backgroundImage = 'url("' + (NMC.objects.grunge, NomanicObject.urlpath + 'ims/' + g) + '")';
        g = 'hint' + ((NMC.layout.background.hint) ? NomanicObject.padZero((parseInt(NMC.layout.background.hint) - 1), 2) : '') + '.png?r=' + Math.random();
        NMC.objects.hint.style.backgroundImage = 'url("' + NomanicObject.urlpath + 'ims/' + g + '")';
        if (NMC.layout.background.image) {
            NMC.objects.iwrapper.style.backgroundImage = NomanicObject.lazyload(NMC.objects.iwrapper, NMC.layout.background.image);
        }
        if (NMC.layout.background.color) {
            NMC.objects.iwrapper.style.backgroundColor = NMC.layout.background.color;
        }
        if (NMC.layout.chart.image) {
            NMC.objects.graph.style.backgroundImage = NomanicObject.lazyload(NMC.objects.graph, NMC.layout.chart.image);
        }
        if (NMC.layout.chart.color) {
            NMC.objects.graph.style.backgroundColor = NMC.layout.chart.color;
        }
        NMC = NMC.addClicks(NMC);
        return NMC;
    },
    placement: function(o, s, d) {
        o = NomanicObject.ob(o);
        if (o.hasAttribute('data')) {
            o.setAttribute('data', o.getAttribute('data').replace(s, d.join(',')));
        }
        if (o.hasAttribute('lines')) {
            o.setAttribute('lines', o.getAttribute('lines').replace(s, d.join(',')));
        }
    },
    splitter: function(txt, b, c) {
        b = b ? b : '[';
        c = c ? c : ']';
        var a = [],
            r = [],
            ignore = 0;
        for (var i = 0; i < txt.length; i++) {
            if ((txt.charAt(i) == "'") && (ignore !== 2)) {
                ignore = (ignore == 1) ? 0 : 1;
            }
            if ((txt.charAt(i) == '"') && (ignore !== 1)) {
                ignore = (ignore == 2) ? 0 : 2;
            }
            if (ignore === 0) {
                if (txt.charAt(i) == b) {
                    a.push(i);
                }
                if (txt.charAt(i) == c) {
                    r.push(txt.substring(a.pop() + 1, i));
                }
            }
        }
        return r;
    },
    stripc: function(txt) {
        var b = ',',
            li = -1,
            a = [],
            r = [],
            ignore = 0;
        for (var i = 0; i < txt.length; i++) {
            if ((txt.charAt(i) == "'") && (ignore !== 2)) {
                ignore = (ignore == 1) ? 0 : 1;
            }
            if ((txt.charAt(i) == '"') && (ignore !== 1)) {
                ignore = (ignore == 2) ? 0 : 2;
            }
            if (ignore === 0) {
                if (txt.charAt(i) == b) {
                    r.push(txt.substring(li + 1, i));
                    li = i;
                }
            }
        }
        r.push(txt.substring(li + 1));
        return r;
    },
    stripq: function(s) {
        if ((s.charAt(s.length - 1) == '"') || (s.charAt(s.length - 1) == "'") || (s.charAt(s.length - 1) == "]")) s = s.substring(0, s.length - 1);
        if ((s.charAt(0) == '"') || (s.charAt(0) == "'") || (s.charAt(0) == "[")) s = s.substring(1, s.length);
        return s;
    },
    gary: function(s) {
        return [NomanicObject.stripq(s)].join(',').split(',').map(parseFloat);
    },
    gsary: function(s) {
        return s.split(';;');
    },
    //ajax calls
    postAjax: function(url, args, success, pst) {
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        xhr.args = args;
        xhr.open(pst?'POST':'GET', url + (url.indexOf('?') == -1 ? '?' : '&') + 'r=' + Math.random());
        xhr.onreadystatechange = function() {
            if (xhr.readyState > 3 && xhr.status == 200) {
                success(xhr.responseText, xhr.args);
            }
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send();
        return xhr;
    },
    optionsq: [],
    types: [],
    addtype: function(c) {
        NomanicObject.types.push(c);
    },
    //parse page
    parsebase: function(options, str, dv) {
        var r, f, c, k, j, cd = (options.container.hasAttribute('buttons')) ? options.container.getAttribute('buttons') : false;
        cd = cd ? cd : ((NomanicObject.ob(dv).hasAttribute('buttons')) ? NomanicObject.ob(dv).getAttribute('buttons') : false);
        if (cd) {
            r = NomanicObject.splitter(cd, '{', '}');
            for (f = 0; f < r.length; f++) {
                options.buttons[f] = {};
                c = NomanicObject.splitter(r[f]);
                for (j = 0; j < c.length; j++) {
                    k = c[j].split('|');
                    k[1] = k[1] ? k[1] : 1;
                    switch (k[0]) {
                        case 'title':
                            options.buttons[f].title = NomanicObject.stripq(k[1]);
                            break;
                        case 'subtitle':
                            options.buttons[f].subtitle = NomanicObject.stripq(k[1]);
                            break;
                        case 'captitle':
                            options.buttons[f].captitle = NomanicObject.stripq(k[1]);
                            break;
                        case 'capsubtitle':
                            options.buttons[f].capsubtitle = NomanicObject.stripq(k[1]);
                            break;
                        case 'color':
                            options.buttons[f].fill = NomanicObject.stripq(k[1]);
                            break;
                    }
                }
            }
        }
        return options;
    },
    //captions
    loadcaption: function(NMC, n, t, s) {
        t = t ? t : NMC.caption.title;
        s = s ? s : NMC.caption.subtitle;
        NMC.objects.caption.innerHTML = '';
        NMC.caps[n] = 0;
        if (!(t || s)) {
            return NMC;
        }
        NMC.caps[n] = 1;
        var f, elem = document.createElement('div');
        elem.style.cssText = 'position:absolute;bottom:0px;width:100%;height:auto;color:' + (NMC.caption.ink ? NMC.caption.ink : '#FFF') + ';line-height:1.5;';
        elem.className = "Gooey_object";
        elem.innerHTML = '<div class="blk w100 h100" style="' + (NMC.caption.image ? 'background-image:url(' + NMC.caption.image + ');' : '') + 'background-color:' + (NMC.caption.color ? NMC.caption.color : '#000') + ';opacity:' + (NMC.caption.alpha ? NMC.caption.alpha : 0.65) + ';"></div><div style="pointer-events:all;position:relative;width:96%;height:auto;margin:2%;">' + (t ? '<span style="display:inline-block;line-height:1.5;width:100%;font-family:Oswald;font-size:2vw;">' + t + (s ? '</span><br/>' : '') : '') + '<span style="width:100%;font-family:Cabin;font-size:1vw;display:inline-block;line-height:1.5;">' + s + '</span><img class="blk closer" n="' + n + '" src="' + NomanicObject.urlpath + 'ims/capclose.png" style="top:0px;right:0px;"/></div>';
        NMC.objects.caption.appendChild(elem);
        var cap = NMC.objects.caption.firstChild;
        cap.style.display = (cap.offsetHeight > 0.9 * NMC.objects.grapha.offsetHeight) ? 'none' : 'block';
        var b = elem.getElementsByClassName('closer');
        var self = NMC;
        for (f = 0; f < b.length; f++) {
            b[f].style.cursor = 'pointer';
            b[f].style.pointerEvents = 'auto';
            NomanicObject.addClick(self, b[f], function(e) {
                e.target.parentNode.parentNode.style.bottom = -(e.target.parentNode.parentNode.offsetHeight) + 'px';
                self.caps[parseInt(e.target.getAttribute('n'))] = 0;
                NomanicObject.objs[self.id] = self;
            });
        }
        return NMC;
    },
    //buttonbar
    selbut: function(b) {
        b.style.backgroundImage = "url('" + NomanicObject.urlpath + "ims/dbut.png')";
        b.style.color = '#FFF';
        b.style.cursor = 'default';
    },
    unselbut: function(b) {
        b.style.backgroundImage = "url('" + NomanicObject.urlpath + "ims/bbut.png')";
        b.style.color = '#454545';
        b.style.cursor = 'pointer';
    },
    loadbuttons: function(NMC) {
        var c, f, w = 160,
            b, r = (w / 200),
            h = r * 55,
            ln = '';
        if (NMC.buttons.length > 0) {
            NMC.objects.hold.style.width = w + 'px';
            NMC.objects.iwrapper.style.width = (NMC.objects.wrapper.offsetWidth - 137) + 'px';
            ln += '<div style="position:absolute;height:100%;"><img style="position:absolute;width:100%;bottom:0px;" src="' + NomanicObject.urlpath + 'ims/hbut1.png"/></div><div id="tray' + NMC.pid + '" style="position:relative;height:auto;">';
            ln += '<img class="b12 blk" style="height:7px;width:147px;margin-left:13px;" src="' + NomanicObject.urlpath + 'ims/hbut2.png"/>';
            for (f = 0; f < NMC.buttons.length; f++) {
                ln += '<div class="b0 blk" ref="' + NMC.ref + '" pid="' + NMC.pid + '" n="' + f + '" style="width:100%;background-size:cover;background-position:center;"><div class="blk t0" style="pointer-events:none;overflow:hidden;">' + NMC.buttons[f].title + '<br/><span class="t1">' + NMC.buttons[f].subtitle + '</span></div></div>';
            }
            ln += '</div>';
            NMC.objects.hold.innerHTML = ln;
            NMC.objects.hold.children[0].style.left = (16 * r) + 'px';
            NMC.objects.hold.children[0].style.width = (184 * r) + 'px';
            NMC.objects.hold.children[0].style.backgroundImage = "url('" + NomanicObject.urlpath + "ims/hbut.png')";
            b = NMC.objects.hold.getElementsByClassName("b0");
            for (f = 0; f < b.length; f++) {
                NomanicObject.unselbut(b[f]);
            }
            NomanicObject.addClass(b[0], 'sel');
            NomanicObject.selbut(b[0]);
            b = NMC.objects.hold.getElementsByClassName("b0");
            NMC.objects.hold.style.width = w + 'px';
            for (f = 0; f < b.length; f++) {
                b[f].style.top = (44 * f) + 'px';
                b[f].style.height = h + 'px';
            }
            c = NomanicObject.ob('tray' + NMC.pid);
            c.style.height = (44 * b.length + 7) + 'px';
            c = NMC.objects.hold.getElementsByClassName("b12");
            c[0].style.top = (44 * b.length) + 'px';
            b = NMC.objects.hold.getElementsByClassName("t0");
            for (f = 0; f < b.length; f++) {
                b[f].style.left = (r * 28) + 'px';
                b[f].style.top = (h * (8 / 55)) + 'px';
                b[f].style.fontSize = (r * 18) + 'px';
                b[f].style.lineHeight = (r * 17) + 'px';
                b[f].style.width = (r * 160) + 'px';
                b[f].style.height = (r * 40) + 'px';
            }
            b = NMC.objects.hold.getElementsByClassName("t1");
            for (f = 0; f < b.length; f++) {
                b[f].style.fontSize = (r * 11) + 'px';
                b[f].style.lineHeight = (r * 12) + 'px';
            }
            NMC.draggie3 = new Draggabilly(NomanicObject.ob('tray' + NMC.pid), {
                axis: 'y'
            }), self = NMC;
            NMC.draggie3.on('dragEnd', function(event, pointer, moveVector) {
                var ty = NomanicObject.ob('tray' + self.pid),
                    cnt = self.objects.hold.offsetHeight,
                    y = ty.offsetTop,
                    h = ty.offsetHeight;
                if (y < cnt - h) {
                    ty.style.top = (((cnt - h) > 0) ? 0 : (cnt - h)) + 'px';
                } else if (y > 0) {
                    ty.style.top = '0px';
                }
            });
            NMC.draggie3.on('staticClick', function(event, pointer) {
                var self = event.target;
                if (NomanicObject.hasClass(self, 'sel')) {
                    return;
                }
                var f, b = self.parentNode.getElementsByClassName("b0");
                for (f = 0; f < b.length; f++) {
                    NomanicObject.removeClass(b[f], 'sel');
                    NomanicObject.unselbut(b[f]);
                }
                NomanicObject.addClass(self, 'sel');
                NomanicObject.selbut(self);
                var iw, NMC = NomanicObject.getobj(NomanicObject.ob('wrapper' + self.getAttribute('pid')).parentNode.parentNode),
                    n = parseInt(self.getAttribute('n'));
                if (NMC.caps[n]) {
                    NMC = NomanicObject.loadcaption(NMC, n, NMC.buttons[n].captitle, NMC.buttons[n].capsubtitle);
                } else {
                    NMC = NomanicObject.loadcaption(NMC, n);
                }
                iw = NMC.onbutton ? NMC.onbutton(NMC, n) : 0;
                NomanicObject.objs[NMC.id] = NMC;
            });
        } else {
            NMC.objects.hold.style.display = 'none';
        }
        return NMC;
    },
    //lightbox
    openlightbox: function(w, e, fn, NMC, callback) {
        var elem = document.createElement('div');
        elem.style.cssText = 'position:absolute;width:100px;height:100px;top:' + (e.target ? e.pageY : e[1]) + 'px;left:' + (e.target ? e.pageX : e[0]) + 'px;margin-left:-50px;margin-top:-50px;';
        document.body.appendChild(elem);
        elem.callback=callback;
        NomanicObject.scriptparser(w, NMC ? NMC.pkg : false, [NomanicObject.lightbox, [elem, fn, w.hasAttribute('snippet') ? w.getAttribute('snippet') : NomanicObject.ob(w.getAttribute('openfill')), w.hasAttribute('snippet') ? 1 : 0, w.hasAttribute('snippetclick') ? 1 : 0], elem], false, 1, false, 1);
    },
    lightbox: function(args) {
        var NMC = NomanicObject.getNMC(args[0].getAttribute('ref'));
        NMC.ovr = 0;
        if (NMC.center) {
            var sz = NomanicObject.vsz();
            args[0].style.left = '50%';
            args[0].style.top = window.pageYOffset + (sz[1] / 2);
        }
        NMC.openfiller = args[2];
        NMC.issnippet = NomanicObject.ob(args[3]);
        NMC.openclicker = NomanicObject.ob(args[4]);
        NomanicObject.objs[NMC.id] = NMC;
        NomanicObject.redolightbox(NMC, args[0], NMC.openfiller, args[1], NMC.issnippet, NMC.openclicker);
    },
    redolightbox: function(NMC, dv, o, fn, iss, alc) {
        var pkg = NMC.pkg ? 'packages/' + NMC.pkg + '/' : '',
            ow = dv.offsetWidth,
            sz = NomanicObject.vsz(),
            mw = ((NMC.aspect ? NMC.aspect * sz[0] : NMC.layout.idw)) - NMC.brdrs[0] - NMC.brdrs[0],
            mh = ((NMC.aspect ? NMC.aspect * sz[1] : NMC.layout.idh)) - NMC.brdrs[1] - NMC.brdrs[2];
        if (NMC.modal) {
            NomanicObject.ob('overlay00001').style.opacity = 0;
            NomanicObject.ob('overlay00001').innerHTML = '<div class="blk w100 h100" style="background-color:' + NMC.overlay.color + ';' + (NMC.overlay.image ? 'background-image:url(' + NMC.overlay.image + ');' : '') + 'opacity:' + NMC.overlay.alpha + ';"></div>';
            NomanicObject.ob('overlay00001').style.display = 'block';
            NMC.onclosing = function(NMC) {
                var iw = NMC.onclose ? NMC.onclose(NMC) : false;
                NomanicObject.ob('overlay00001').style.display = 'none';
            }
        }
        var iw = NMC.layout.idw,
            ih = NMC.layout.idh;
        if (iw > mw) {
            iw = mw;
            ih = (mh * (mw / NMC.layout.idw));
        }
        if (ih > mh) {
            ih = mh;
            iw = (mw * (mh / NMC.layout.idh));
        }
        ow = Math.round(ow);
        iw = Math.round(iw);
        var h = (iw * (NMC.layout.idh / NMC.layout.idw));
        if (h > sz[1] * NMC.aspect) {
            h = sz[1] * NMC.aspect;
            iw = Math.round(h / (NMC.layout.idh / NMC.layout.idw));
        }
        NMC.tween4 = NMC.tween4 ? NMC.tween4 : (new NomanicObject.tweenable());
        if (o && NMC.tween4 && NMC.tween4.target && (!NMC.tween4.target[5])) {
            NMC.tween4.target[5] = o;
        }
        if ((dv.target ? dv.target : ow) != iw) {
            dv.target = iw;
            if (NMC.run4) {
                NMC.tween4.stop();
            }
            NMC.run4 = 1;
            NomanicObject.showcontent(NMC, 0);
            NomanicObject.fader(1, 0, NomanicObject.ob('overlay00001'), 1500);
            NMC.tween4.create({
                duration: 2000,
                easing: NomanicObject.easer.easeOutElastic,
                target: [dv, NMC, fn, iw, ih, o, ow, sz[1] * NMC.aspect, iss, alc, pkg],
                step: function(ar, tw) {
                    var NMC = ar[1],
                        w = NomanicObject.interp(ar[6], ar[3], tw),
                        h = (w * (NMC.layout.idh / NMC.layout.idw));
                    if (h > ar[7]) {
                        h = ar[7];
                        w = h / (NMC.layout.idh / NMC.layout.idw);
                    }
                    ar[0].style.width = w + 'px';
                    ar[0].style.height = h + 'px';
                    ar[1].rsr(ar[1], 1, ar[7]);
                },
                finish: function(ar, tw) {
                    var NMC = ar[1],
                        f, iw;
                    NMC.run4 = 0;
                    NomanicObject.showcontent(NMC, 1);
                    ar[0].style.width = ar[3] + 'px';
                    ar[1].expanded = 1;
                    ar[1].rsr(ar[1], 1, ar[7]);
                    NomanicObject.rsrkids(ar[1]);
                    if (!NMC.opened) {
                        if (ar[5] && ar[8]) {
                            NMC.child = ar[1].snippetfill({
                                snippet: ar[5],
                                onready: ar[2],
                                allowclick: ar[9]
                            });
                        } else if (ar[5]) {
                            NMC.child = ar[1].openfill({
                                data: NomanicObject.ob(ar[5]),
                                onready: ar[2],
                                allowclick: ar[9]
                            });
                        }
                        if (ar[1].drag) {
                            ar[1].draggie = new Draggabilly(ar[0], {
                                handle: '.tbar'
                            });
                            var self = ar[0];
                            ar[1].draggie.on('dragMove', function(e, pointer, moveVector) {
                                self.style.zIndex = 9999;
                            });
                            if (ar[1].modal) {
                                ar[1].draggie.on('dragEnd', function(e, pointer, moveVector) {
                                    self.style.zIndex = 9000 + (NomanicObject.cd++);
                                });
                            } else {
                                ar[1].draggie.on('dragEnd', function(e, pointer, moveVector) {
                                    self.style.zIndex = 6000 + (NomanicObject.cd++);
                                });
                            }
                        }
                        if (NMC.buttons.length > 0) {
                            for (f = 0; f < NMC.buttons.length; f++) {
                                NMC.caps[f] = 1;
                            }
                            NMC = NomanicObject.loadcaption(NMC, 0, NMC.buttons[0].captitle, NMC.buttons[0].capsubtitle);
                        }
                        NMC.opened = 1;
                        iw = NomanicObject.onfire ? NomanicObject.onfire(ar[1]) : 0;
                        iw = dv.callback ? dv.callback(ar[1]) : 0;
                    }
                    NomanicObject.objs[ar[1].id] = ar[1];
                },
                autorun: 1
            });
        }
    },
    destroykids: function(d) {
        if (!d) {
            return;
        }
        var NMC, f, o = NomanicObject.ob('b98' + d.pid);
        if (!o) {
            return;
        }
        var s = o.hasAttribute('children') ? o.getAttribute('children') : -1;
        if (s == -1) {
            return;
        }
        s = NomanicObject.gary(s);
        for (f = 0; f < s.length; f++) {
            NMC = NomanicObject.destroy(NomanicObject.objs[s[f]]);
            NomanicObject.objs[NMC.id] = false;
        }
        o.innerHTML = '';
    },
    rsrkids: function(d) {
        if (!d) {
            return;
        }
        var NMC, f, o = NomanicObject.ob('b98' + d.pid),
            s = o ? o.hasAttribute('children') ? o.getAttribute('children') : -1 : -1;
        if (s == -1) {
            return;
        }
        s = NomanicObject.gary(s);
        for (f = 0; f < s.length; f++) {
            NMC = NomanicObject.objs[s[f]];
            NMC.rsr(NMC);
        }
    },
    showcontent: function(NMC, x) {
        var o = NomanicObject.ob('b98' + NMC.pid);
        if (!o) {
            return;
        }
        o.style.display = (x == 1) ? 'block' : 'none';
    },
    //fading
    dofade: function(inout, dv, span, fn) {
        var tween = new NomanicObject.tweenable();
        tween.create({
            duration: span,
            easing: NomanicObject.easer.easeOutQuad,
            target: [dv, inout, fn],
            step: function(ar, tw) {
                ar[0].style.opacity = (ar[1] ? tw : (1 - tw));
            },
            finish: function(ar, tw) {
                var iw = ar[2] ? ar[2]() : 1;
            },
            autorun: 1
        });
    },
    fader: function(inout, delay, dv, span, fn) {
        if (delay) {
            requestTimeout(function() {
                NomanicObject.dofade(inout, dv, span, fn);
            }, delay);
        } else {
            NomanicObject.dofade(inout, dv, span, fn);
        }
    },
    loadcore: function(ls, g) {
        var f, ar = [],
            scriptq = new NomanicObject.loadscript();
        for (f = 0; f < ls.length; f++) {
            if (!NomanicObject.in_array(ls[f], NomanicObject.corecache)) {
                NomanicObject.corecache.push(ls[f]);
                ar.push(ls[f]);
            }
        }
        scriptq.require(ar, g, 1);
    },
    loads: function(ls, g, args) {
        NomanicObject.qtodoq([false, false, args[2][3], args[0], false, args[3], NomanicObject.getsnip(2), false, args[2][3] ? (args[2][3].hasAttribute('snippet') ? NomanicObject.baseName(args[2][3].getAttribute('snippet')) : false) : false, false, args[2][3]]);
        var scriptq = new NomanicObject.loadscript();
        scriptq.require(ls, g, 1, args);
    },
    in_array: function(i, ar) {
        for (var f = 0; f < ar.length; f++) {
            if (i === ar[f]) {
                return 1;
            }
        }
        return false;
    },
    scriptcache: [],
    corecache: [],
    loadt: function(ls, g) {
        var f, ar = [],
            scriptq = new NomanicObject.loadscript();
        for (f = 0; f < ls.length; f++) {
            if (!NomanicObject.in_array(NomanicObject.urlpath + ls[f], NomanicObject.scriptcache)) {
                NomanicObject.scriptcache.push(NomanicObject.urlpath + ls[f]);
                ar.push(NomanicObject.urlpath + ls[f]);
            }
        }
        scriptq.require(ar, g, 1);
    },
    loadc: function(path) {
        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", NomanicObject.urlpath + path);
        document.getElementsByTagName("head")[0].appendChild(fileref);
    },
    //parsers
    snippetparser: function(o, fn) {
        if (NomanicObject.snippetsrunning < 1) {
            NomanicObject.snippetsrunner = 0;
        }
        if (NomanicObject.snippetsrunner > 0) {
            return true;
        }
        if (NomanicObject.lastsp && o && (o === NomanicObject.lastsp)) {
            return NomanicObject.packageparser(o);
        }
        NomanicObject.snippetsrunner++;
        var b, c, f, url, args;
        o = NomanicObject.ob(o);
        b = (!o) ? document.getElementsByClassName('NomanicObject_snippet') : ((o && (NomanicObject.hasClass(o, 'NomanicObject_snippet'))) ? [o] : (o.getElementsByClassName('NomanicObject_snippet')));
        for (f = 0; f < b.length; f++) {
            c = b[f];
            if (!c.parsed) {
                c.parsed = 1;
                url = NomanicObject.urlpath + 'snippets/' + c.getAttribute('snippet');
                args = JSON.parse(c.getAttribute('args'));
                NomanicObject.postAjax(url, false, function(ln, opts) {
                    c.innerHTML = '<div class="w100 h100" style="position:relative;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;' + (c.hasAttribute('contentclick') ? 'pointer-Events:auto;' : '') + '">' + ln + '</div>';
                    NomanicObject.scriptparser(c.firstChild, false, [fn, false, false, c, o], args, 0, 1);
                });
                return true;
            }
        }
        NomanicObject.lastsp = o ? o : 'doc';
        return NomanicObject.packageparser(o);
    },
    packageparser: function(o) {
        if (o && (o === NomanicObject.lastppp) && (NomanicObject.lastppp)) {
            return;
        }
        var b, c, f, p, args2;
        o = NomanicObject.ob(o);
        b = (!o) ? document.getElementsByClassName('NomanicObject_package') : ((o && (NomanicObject.hasClass(o, 'NomanicObject_package'))) ? [o] : (o.getElementsByClassName('NomanicObject_package')));
        for (f = 0; f < b.length; f++) {
            NomanicObject.snippetsrunner = 1;
            c = b[f];
            if (!c.parsed) {
                c.parsed = 1;
                p = c.getAttribute('package');
                args2 = JSON.parse(c.getAttribute('args'));
                NomanicObject.loadt(['packages/' + p + '/scripts/' + p + '.js'], function() {
                    NomanicObject.setpackage(c, p, args2);
                });
                return;
            }
        }
        NomanicObject.lastppp = o ? o : 'doc';
    },
    setpackage: function(c, p, args) {
        var url = NomanicObject.urlpath + 'snippets/' + c.getAttribute('snippet');
        NomanicObject.postAjax(url, false, function(ln, opts) {
            NomanicObject.fillpackage(c, p, ln, args);
        });
    },
    fillpackage: function(o, pk, ln, args, fn) {
        if (!o) {
            return;
        }
        ln = NomanicObject.cleanup(ln);
        o.innerHTML = '<div class="w100 h100" style="position:relative;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;' + (o.hasAttribute('contentclick') ? 'pointer-Events:auto;' : '') + '">' + ln + '</div>';
        NomanicObject.getsnip(1);
        NomanicObject.scriptparser(o.firstChild, pk, [fn, false, false, o, o], args, 1);
        NomanicObject.sfunc(pk + '.preload', window, o.firstChild, args, 1);
    },
    coreparser: function(o, pk, a, args, topper, sniprun, overide, NMC) {
        if (topper) {
            NomanicObject.lastpp = o ? o : 'doc';
        }
        var b, c, f, p, j, ln = [], ln1= [],
            pkg = pk ? 'packages/' + pk + '/' : '';
        if (!o) {
            b = document.getElementsByClassName('NomanicObject_scripts');
            for (f = 0; f < b.length; f++) {
                c = b[f];
                if (c.hasAttribute('core')) {
                    p = NomanicObject.stripc(c.getAttribute('core'));
                    for (j = 0; j < p.length; j++) {
                        if (p[j] != '') {
                            ln1.push(NomanicObject.urlpath + 'core/' + p[j]);
                        }
                    }
                }
            }
            if (ln1.length > 0) {
                NomanicObject.loadcore(ln1, function(args) {
                    NomanicObject.scriptparser(false, false, false, false, 1);
                    NomanicObject.process();
                });
            }
            else {
                NomanicObject.scriptparser(false, false, false, false, 1);
                NomanicObject.process();
            }
        }
    },
    scriptparser: function(o, pk, a, args, topper, sniprun, overide, NMC) {
        if (topper) {
            NomanicObject.lastpp = o ? o : 'doc';
        }
        var b, c, f, p, j, ln = [], ln1= [],
            pkg = pk ? 'packages/' + pk + '/' : '';
        if (!o) {
            b = document.getElementsByClassName('NomanicObject_scripts');
            for (f = 0; f < b.length; f++) {
                c = b[f];
                if (c.hasAttribute('core')) {
                    p = NomanicObject.stripc(c.getAttribute('core'));
                    for (j = 0; j < p.length; j++) {
                        if (p[j] != '') {
                            ln1.push(NomanicObject.urlpath + 'core/' + p[j]);
                        }
                    }
                }
                if (c.hasAttribute('css')) {
                    p = NomanicObject.stripc(c.getAttribute('css'));
                    for (j = 0; j < p.length; j++) {
                        if (p[j] != '') {
                            NomanicObject.loadc('css/' + p[j]);
                        }
                    }
                }
                if (c.hasAttribute('scripts')) {
                    p = NomanicObject.stripc(c.getAttribute('scripts'));
                    for (j = 0; j < p.length; j++) {
                        if (p[j] != '') {
                            ln.push(NomanicObject.urlpath + 'scripts/' + p[j]);
                        }
                    }
                }
            }
            if (ln1.length > 0) {
                NomanicObject.loadcore(ln1, function(args) {
                    NomanicObject.process();
                });
            }
            if (ln.length > 0) {
                NomanicObject.loads(ln, function(args) {
                    NomanicObject.parser(args[0], args[1], args[2], args[3]);
                }, [o, pk, a, args]);
            } else {
                NomanicObject.parser(o, pk, a, args, sniprun);
            }
            return;
        }
        o = NomanicObject.ob(o);
        if (o.parsed && (!overide)) {
            return;
        }
        o.parsed = 1;
        b = (o && (NomanicObject.hasClass(o, 'NomanicObject_scripts'))) ? [o] : (o.getElementsByClassName('NomanicObject_scripts'));
        for (f = 0; f < b.length; f++) {
            c = b[f];
            if (c.hasAttribute('css')) {
                p = NomanicObject.stripc(c.getAttribute('css'));
                for (j = 0; j < p.length; j++) {
                    if (p[j] != '') {
                        NomanicObject.loadc('css/' + p[j]);
                    }
                }
            }
            if (c.hasAttribute('scripts')) {
                p = NomanicObject.stripc(c.getAttribute('scripts'));
                for (j = 0; j < p.length; j++) {
                    if (p[j] != '') {
                        ln.push(NomanicObject.urlpath + 'scripts/' + p[j]);
                    }
                }
            }
        }
        if (ln.length > 0) {
            NomanicObject.loads(ln, function(args) {
                NomanicObject.parser(args[0], args[1], args[2], args[3]);
            }, [o, pk, a, args]);
        } else {
            NomanicObject.parser(o, pk, a, args);
        }
    },
    baseName: function(str) {
        var base = new String(str).substring(str.lastIndexOf('/') + 1);
        if (base.lastIndexOf(".") != -1)
            base = base.substring(0, base.lastIndexOf("."));
        return base;
    },
    getsnip: function(n) {
        var ln = 'Snip' + NomanicObject.padZero((n == 2 ? NomanicObject.snip + 1 : NomanicObject.snip), 5) + '_';
        if (n == 1) {
            NomanicObject.snip++;
        }
        return ln;
    },
    parser: function(o1, pk, a, snipargs, sniprun) {
        NomanicObject.lasto = o1;
        var o, g, fn = a ? a[0] : g,
            args = a ? a[1] : g,
            dv = a ? a[2] : g,
            prt = a ? a[3] : g,
            dprt = a ? a[4] : g,
            mrt = (prt ? prt : dprt),odprt,ld,
            snip, csnip = NomanicObject.getsnip(2);
        if (o1 && (dprt || prt)) {
            csnip = NomanicObject.getsnip(1);
            mrt.setAttribute('snip', csnip);
            odprt=dprt;
            ld=1;
        }
        dprt = dprt ? (dprt.hasAttribute('snippet') ? NomanicObject.baseName(dprt.getAttribute('snippet')) : false) : false;
        dprt = dprt ? dprt : (prt ? (prt.hasAttribute('snippet') ? NomanicObject.baseName(prt.getAttribute('snippet')) : false) : false);
        dprt = dprt ? dprt : (prt ? (prt.hasAttribute('package') ? NomanicObject.baseName(prt.getAttribute('package')) : false) : false);
        if (ld) {
            NomanicObject.qtodoq([0, 0, 0, mrt, dprt, snipargs, 0, 0, 0, 0, mrt]);
        }
        var options, v = ((o = NomanicObject.ob(o1)) ? o1 : document).getElementsByClassName('NomanicObject_lightbox'),
            b = (o && (NomanicObject.hasClass(o, 'NomanicObject') || NomanicObject.hasClass(o, 'NomanicObject_lightbox') || NomanicObject.hasClass(o, 'NomanicObject_snippet'))) ? [o] : ((o ? o : document).getElementsByClassName('NomanicObject')),
            b, j, p, c, f, r,snippet = prt ? 1 : 0;
        if (o1) {
            snip = csnip;
        }
        for (f = 0; f < v.length; f++) {
            v[f].prt=prt;
            v[f].onclick = function(e) {
                var w = e.target;
                while (!NomanicObject.hasClass(w, 'NomanicObject_lightbox')) {
                    w = w.parentNode;
                }
                return NomanicObject.openlightbox(w, e, w.prt);
            }
            if (pk) {
                NomanicObject.sfunc(pk + '.oneach', window, v[f], args, snip);
            }
        }
        for (j = 0; j < b.length; j++) {
            if (snippet) {
                NomanicObject.addClass(b[j], snip);
            }
            r = NomanicObject.splitter(b[j].getAttribute('NMC'), '{', '}');
            options = {};
            options.div = b[j];
            options.snippet = b[j].hasAttribute('snippet') ? b[j].getAttribute('snippet') : false;
            options.snipargs = b[j].hasAttribute('args') ? JSON.parse(b[j].getAttribute('args')) : false;
            options.openfiller = b[j].hasAttribute('openfill') ? NomanicObject.ob(b[j].getAttribute('openfill')) : false;
            options.contentclick = b[j].hasAttribute('contentclick') ? 1 : 0;
            options.switchanim = b[j].hasAttribute('switchanim') ? 1 : 0;
            options.container = dv ? NomanicObject.ob(dv) : b[j];
            options.caption = {};
            options.buttons = [];
            options.caps = [];
            options.overlay = {
                color: '#000',
                alpha: 0.65
            };
            options.plot = {
                data: [],
                lines: []
            };
            options.legend = {
                columns: 1
            };
            options.datatype = 'inline';
            options.layout = {
                titlebar: {},
                background: {},
                chart: {},
                pencil: {}
            };
            options.layout.titleover = false;
            options.plot.menuformat = '{a}';
            var now = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();
            options.plot.timestart = Math.floor(now / 1000);
            options.plot.timestep = 1;
            options.plot.timeunit = 'd';
            options.plot.tagformat = '{p0.00}% [${u0.00}m]';
            options.lpattern = [];
            options.pattern = [];
            options.layout.chart.gridcolor = 'rgba(0,0,0,0)';
            for (f = 0; f < r.length; f++) {
                p = r[f].split(':');
                switch (p[0]) {
                    case 'plot':
                        options = NomanicObject.parsemain(options, p[1], snip);
                        if (dv) {
                            options.ref = 'Light' + NomanicObject.padZero(NomanicObject.lightn++, 5);
                            options.container.setAttribute('ref', options.ref);
                        }
                        options.owner = NomanicObject.getowner(options);
                        if (options.owner) {
                            options = options.owner.parsebase(options, p[1], b[j]);
                        }
                        break;
                    case 'frame':
                        options = NomanicObject.parseframe(options, p[1]);
                        break;
                    case 'background':
                        options = NomanicObject.parsebackground(options, p[1]);
                        break;
                    case 'chart':
                        options = NomanicObject.parsechart(options, p[1]);
                        break;
                    case 'caption':
                        options = NomanicObject.parsecaption(options, p[1]);
                        break;
                    case 'overlay':
                        options = NomanicObject.parseoverlay(options, p[1]);
                        break;
                }
            }
            if (options.owner) {
                options.fn = [fn, args, prt, o, pk, snipargs, snip, snippet, dprt ? dprt : (prt ? (prt.hasAttribute('snippet') ? NomanicObject.baseName(prt.getAttribute('snippet')) : false) : false), sniprun, mrt];
                NomanicObject.optionsq.push([prt, options]);
                NomanicObject.snippetsrunning++;
            }
        }
        NomanicObject.rollout(fn, args, prt, o, pk, snipargs, snip, snippet, dprt ? dprt : (prt ? (prt.hasAttribute('snippet') ? NomanicObject.baseName(prt.getAttribute('snippet')) : false) : false), sniprun, mrt);
    },
    getowner: function(NMC) {
        var f, b;
        if (NMC.layout.type == 'empty') {
            return NomanicObject;
        } else if (NMC.layout.type == 'lightbox') {
            return NomanicObject;
        }
        for (f = 0; f < NomanicObject.types.length; f++) {
            b = b ? b : NomanicObject.types[f].getowner(NMC);
        }
        return b;
    },
    getNMC: function(ref) {
        var f;
        for (f = 0; f < NomanicObject.objs.length; f++) {
            if (NomanicObject.objs[f].ref == ref) {
                return NomanicObject.objs[f];
            }
        }
        return NomanicObject.dummyNMC;
    },
    loadcsv: function(options) {
        options.done = 1;
        return options;
    },
    rollout: function(fn, args, prt, o, pk, snipargs, snip, snippet, base, sniprun, dprt) {
        var f, n = 0;
        for (f = 0; f < NomanicObject.optionsq.length; f++) {
            if ((NomanicObject.optionsq[f][1].datatype == 'inline') || (NomanicObject.optionsq[f][1].done == 1)) {
                n++;
            } else if (NomanicObject.optionsq[f][1].loading == 1) {} else {
                NomanicObject.optionsq[f][1].loading = 1;
                NomanicObject.postAjax(NomanicObject.urlpath + 'data/' + NomanicObject.optionsq[f][1].datatype, [f + 1 - 1], function(data, a) {
                    if ((a[0] || (a[0] === 0)) && NomanicObject.optionsq[a[0]]) {
                        NomanicObject.optionsq[a[0]][1] = NomanicObject.optionsq[a[0]][1].owner.loadcsv(NomanicObject.optionsq[a[0]][1], data);
                        NomanicObject.optionsq[a[0]][1].done = 1;
                        setTimeout(NomanicObject.rollout, 500);
                    }
                });
            }
        }
        if (n == NomanicObject.optionsq.length) {
            n = 0;
            for (f = 0; f < NomanicObject.optionsq.length; f++) {
                if (!NomanicObject.optionsq[f][1].created) {
                    NomanicObject.optionsq[f][1].created = 1;
                    NomanicObject.create(NomanicObject.optionsq[f]);
                    n++;
                }
            }
            if (n == NomanicObject.optionsq.length) {
                NomanicObject.fn = false;
                NomanicObject.fn2 = false;
                NomanicObject.fired2 = 0;
                NomanicObject.optionsq = [];
                NomanicObject.processThem();
            }
        }
        if ((n < NomanicObject.optionsq.length) && (NomanicObject.lastn == n)) {
            if (fn) {
                fn(args);
            }
            if (prt && prt.switchanim) {
                NomanicObject.fader(0, 0, prt.objects.grunge.children[0], 500);
            }
            NomanicObject.snippetsrunning--;
            if (NomanicObject.snippetsrunning < 1) {
                NomanicObject.snippetsrunner = 0;
            }
            NomanicObject.qtodoq([fn, args, prt, o, pk, snipargs, snip, snippet, base, sniprun, dprt]);
        }
        NomanicObject.lastn = n;
    },
    parsemain: function(options, p, snip) {
        var f, k, c = NomanicObject.splitter(p);
        options.panels = [0, 0, 0, 0, 0, 0];
        for (f = 0; f < c.length; f++) {
            k = c[f].split('|');
            k[1] = k[1] ? k[1] : 1;
            switch (k[0]) {
                case 'type':
                    options.layout.type = k[1];
                    break;
                case 'gridmode':
                    options.gridmode = 1;
                    break;
                case 'gridwidth':
                    options.gridwidth = parseFloat(k[1]);
                    break;
                case 'gridspan':
                    k = NomanicObject.stripc(NomanicObject.stripq(k[1]));
                    options.gridspan = [];
                    options.gridspan[0] = parseInt(k[0]);
                    options.gridspan[1] = parseInt(k[1]);
                    break;
                case 'title':
                    options.title = NomanicObject.stripq(k[1]);
                    break;
                case 'subtitle':
                    options.subtitle = NomanicObject.stripq(k[1]);
                    break;
                case 'ref':
                    options.ref = (snip ? snip : '') + NomanicObject.stripq(k[1]);
                    break;
                case 'size':
                    k = NomanicObject.stripc(NomanicObject.stripq(k[1]));
                    options.layout.idw = parseInt(k[0]);
                    options.layout.idh = parseInt(k[1]);
                    break;
                case 'panels':
                    k = NomanicObject.stripc(NomanicObject.stripq(k[1]));
                    options.panels[0] = parseFloat(k[0]);
                    options.panels[1] = parseFloat(k[1]);
                    options.panels[2] = parseFloat(k[2]);
                    options.panels[3] = parseFloat(k[3]);
                    options.panels[4] = parseFloat(k[4]);
                    options.panels[5] = parseFloat(k[5]);
                    break;
                case 'border':
                    options.layout.border = 1;
                    break;
                case 'maintain':
                    options.layout.maintain = 1;
                    break;
            }
        }
        return options;
    },
    parseframe: function(options, p) {
        var f, k, c = NomanicObject.splitter(p);
        for (f = 0; f < c.length; f++) {
            p = c[f].split('|');
            p[1] = p[1] ? p[1] : 1;
            switch (p[0]) {
                case 'type':
                    options.layout.frame = parseInt(p[1]);
                    break;
                case 'allowclose':
                    options.allowclose = 1;
                    break;
                case 'center':
                    options.center = 1;
                    break;
                case 'modal':
                    options.modal = 1;
                    break;
                case 'aspect':
                    options.aspect = parseFloat(p[1]);
                    break;
                case 'draggable':
                    options.drag = 1;
                    break;
                case 'ink':
                    options.layout.titlebar.color = p[1];
                    break;
                case 'color':
                    options.layout.titlebar.background = p[1];
                    break;
                case 'image':
                    options.layout.titlebar.image = NomanicObject.urlpath + 'assets/' + NomanicObject.stripq(p[1]);
                    break;
            }
        }
        return options;
    },
    parsebackground: function(options, p) {
        var f, k, c = NomanicObject.splitter(p);
        for (f = 0; f < c.length; f++) {
            p = c[f].split('|');
            p[1] = p[1] ? p[1] : 1;
            switch (p[0]) {
                case 'ink':
                    options.layout.pencil.ink = p[1];
                    break;
                case 'color':
                    options.layout.background.color = p[1];
                    break;
                case 'image':
                    options.layout.background.image = NomanicObject.urlpath + 'assets/' + NomanicObject.stripq(p[1]);
                    break;
                case 'grunge':
                    options.layout.background.grunge = 1;
                    break;
                case 'shadow':
                    options.layout.background.border = 1;
                    break;
                case 'mask':
                    options.layout.mask = NomanicObject.urlpath + 'assets/' + NomanicObject.stripq(p[1]);
                    break;
            }
        }
        return options;
    },
    parsechart: function(options, p) {
        var f, k, c = NomanicObject.splitter(p);
        options.layout.chart.gridtick = 1;
        for (f = 0; f < c.length; f++) {
            p = c[f].split('|');
            p[1] = p[1] ? p[1] : 1;
            switch (p[0]) {
                case 'ink':
                    options.layout.chart.ink = p[1];
                    break;
                case 'color':
                    options.layout.chart.color = p[1];
                    break;
                case 'image':
                    options.layout.chart.image = NomanicObject.urlpath + 'assets/' + NomanicObject.stripq(p[1]);
                    break;
                case 'grid':
                    options.layout.chart.gridcolor = p[1];
                    break;
                case 'gridtick':
                    options.layout.chart.gridtick = parseInt(p[1]);
                    break;
                case 'gridfill':
                    options.layout.chart.gridfill = p[1];
                    break;
                case 'griddashed':
                    options.layout.chart.griddashed = 1;
                    break;
                case 'shadow':
                    options.layout.chart.border = 1;
                    break;
            }
        }
        return options;
    },
    parsecaption: function(options, p) {
        var f, k, c = NomanicObject.splitter(p);
        for (f = 0; f < c.length; f++) {
            p = c[f].split('|');
            p[1] = p[1] ? p[1] : 1;
            switch (p[0]) {
                case 'title':
                    options.caption.title = NomanicObject.stripq(p[1]);
                    break;
                case 'subtitle':
                    options.caption.subtitle = NomanicObject.stripq(p[1]);
                    break;
                case 'ink':
                    options.caption.ink = p[1];
                    break;
                case 'color':
                    options.caption.color = p[1];
                    break;
                case 'image':
                    options.caption.image = NomanicObject.urlpath + 'assets/' + NomanicObject.stripq(p[1]);
                    break;
                case 'alpha':
                    options.caption.alpha = parseFloat(p[1]);
                    break;
            }
        }
        return options;
    },
    parseoverlay: function(options, p) {
        var f, k, c = NomanicObject.splitter(p);
        for (f = 0; f < c.length; f++) {
            p = c[f].split('|');
            p[1] = p[1] ? p[1] : 1;
            switch (p[0]) {
                case 'color':
                    options.overlay.color = p[1];
                    break;
                case 'image':
                    options.overlay.image = NomanicObject.urlpath + 'assets/' + NomanicObject.stripq(p[1]);
                    break;
                case 'alpha':
                    options.overlay.alpha = parseFloat(p[1]);
                    break;
            }
        }
        return options;
    },
    DOMready: (function() {
        var win = window,
            doc = win.document,
            dce = doc.createElement,
            supportAEL = !!doc.addEventListener,
            queue = [],
            exec,
            loaded,
            fallback_onload,
            explorerTimer,
            readyStateTimer,
            isIE = (function() {
                var undef,
                    v = 3,
                    div = doc.createElement('div'),
                    all = div.getElementsByTagName('i');
                while (
                    div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
                    all[0]
                );
                return v > 4 ? v : undef;
            }());

        function process() {
            loaded = true;
            if (supportAEL) {
                doc.removeEventListener("DOMContentLoaded", process, false);
            }
            while ((exec = queue.shift())) {
                exec();
            }
        }
        return function(fn) {
            if (loaded) {
                return fn();
            }
            if (supportAEL) {
                doc.addEventListener("DOMContentLoaded", process, false);
            } else if (isIE < 9) {
                explorerTimer = win.setInterval(function() {
                    if (doc.body) {
                        try {
                            dce('div').doScroll('left');
                            win.clearInterval(explorerTimer);
                        } catch (e) {
                            return;
                        }
                        process();
                        return;
                    }
                }, 10);

                function checkReadyState() {
                    if (doc.readyState == 'complete') {
                        doc.detachEvent('onreadystatechange', checkReadyState);
                        win.clearInterval(explorerTimer);
                        win.clearInterval(readyStateTimer);
                        process();
                    }
                }
                doc.attachEvent('onreadystatechange', checkReadyState);
                readyStateTimer = win.setInterval(function() {
                    checkReadyState();
                }, 10);
            }
            fallback_onload = function() {
                process();
                if (supportAEL) {
                    doc.removeEventListener('load', fallback_onload, false);
                } else {
                    doc.detachEvent('onload', fallback_onload);
                }
            };
            if (supportAEL) {
                doc.addEventListener('load', fallback_onload, false);
            } else {
                doc.attachEvent('onload', fallback_onload);
            }
            queue.push(fn);
        };
    }()),
    hasClass: function(ele, cls) {
        return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    },
    addClass: function(ele, cls) {
        if (!NomanicObject.hasClass(ele, cls)) ele.className += " " + cls;
    },
    removeClass: function(ele, cls) {
        if (NomanicObject.hasClass(ele, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            ele.className = ele.className.replace(reg, ' ');
        }
    },
    //draw frame around chart
    getframe: function(NMC, x) {
        NMC.layout.frametitle = 0;
        var f, b, ln = '',
            self = NMC,
            wgutter = 10,
            mrg = [wgutter, wgutter, wgutter, wgutter],
            fr = (x || (x === 0)) ? x : (NomanicObject.cframe == -1 ? NMC.layout.frame : NomanicObject.cframe);
        NMC.settitle = function(t, s) {
            self.title = t;
            self.subtitle = s;
            self.showtitle(0);
            NomanicObject.objs[self.id] = self;
        }
        NMC.objects.div.style.border = null;
        NMC.brdrs = [0, 0, 0];
        if (fr == 1) {
            ln += '<div><img src="' + NomanicObject.urlpath + 'ims/g0.png" style="position:absolute;top:-7px;left:-7px;width:7px;height:7px;" />';
            ln += '<img src="' + NomanicObject.urlpath + 'ims/g2.png" style="position:absolute;top:-7px;right:-7px;width:7px;height:7px;" />';
            ln += '<img src="' + NomanicObject.urlpath + 'ims/g5.png" style="position:absolute;bottom:-7px;left:-7px;width:7px;height:7px;" />';
            ln += '<img src="' + NomanicObject.urlpath + 'ims/g7.png" style="position:absolute;bottom:-7px;right:-7px;width:7px;height:7px;" />';
            ln += '<div style="position:absolute;top:-7px;width:100%;height:7px;background:url(' + "'" + NomanicObject.urlpath + 'ims/g1.png' + "'" + ');"></div>';
            ln += '<div style="position:absolute;top:0px;left:-7px;width:7px;height:100%;background:url(' + "'" + NomanicObject.urlpath + 'ims/g3.png' + "'" + ');"></div>';
            ln += '<div style="position:absolute;top:0px;right:-7px;width:7px;height:100%;background:url(' + "'" + NomanicObject.urlpath + 'ims/g4.png' + "'" + ');"></div>';
            ln += '<div style="position:absolute;bottom:-7px;width:100%;height:7px;background:url(' + "'" + NomanicObject.urlpath + 'ims/g6.png' + "'" + ');"></div></div>';
            NMC.showtitle(0);
            NMC.settitle = function(t, s) {
                self.title = t;
                self.subtitle = s;
                self.showtitle(0);
                NomanicObject.objs[self.id] = self;
            }
            NMC.brdrs = [7, 7, 7];
            mrg = [7 + wgutter, 7 + wgutter, 7 + wgutter, 7 + wgutter];
        } else if (fr == 6) {
            ln += '<div style="textShadow:0 0 0px #454545;"><img src="' + NomanicObject.urlpath + 'ims/w0_0.png" style="position:absolute;top:-37px;left:-18px;width:18px;height:37px;" />';
            ln += '<img src="' + NomanicObject.urlpath + 'ims/w0_2.png" style="position:absolute;top:-37px;right:-19px;width:19px;height:37px;" />';
            ln += '<img src="' + NomanicObject.urlpath + 'ims/w0_8.png" style="position:absolute;bottom:-21px;left:-18px;width:18px;height:21px;" />';
            ln += '<img src="' + NomanicObject.urlpath + 'ims/w0_10.png" style="position:absolute;bottom:-21px;right:-19px;width:19px;height:21px;" />';
            ln += '<div style="position:absolute;top:-37px;width:100%;height:37px;background:url(' + "'" + NomanicObject.urlpath + 'ims/w0_1.png' + "'" + ');">';
            ln += '<div class="tbar blk w100 h100" style="overflow:hidden;color:#454545;">';
            ln += '<span id="tbartl' + NMC.pid + '" class="blk w100" style="margin-top:15px;overflow:hidden;text-align:center;font-size:14px;line-height:20px;">' + (NMC.title ? NMC.title : '') + '</span>';
            ln += NMC.allowclose ? '<img class="closer blk" style="top:0px;left:0px;cursor:pointer;" src="' + NomanicObject.urlpath + 'ims/w0_c.png?r=1"/><img class="blk" style="top:0px;left:18px;" src="' + NomanicObject.urlpath + 'ims/w0_b.png?r=1"/><img class="blk" style="top:0px;left:36px;" src="' + NomanicObject.urlpath + 'ims/w0_b.png?r=1"/>' : '';
            ln += '</div></div></div>';
            ln += '<div style="position:absolute;top:0px;left:-18px;width:18px;height:100%;background:url(' + "'" + NomanicObject.urlpath + 'ims/w0_3.png' + "'" + ');"></div>';
            ln += '<div style="position:absolute;top:0px;right:-19px;width:19px;height:100%;background:url(' + "'" + NomanicObject.urlpath + 'ims/w0_4.png' + "'" + ');"></div>';
            ln += '<div style="position:absolute;bottom:-21px;width:100%;height:21px;background:url(' + "'" + NomanicObject.urlpath + 'ims/w0_9.png' + "'" + ');"></div></div>';
            NMC.showtitle(0);
            NMC.settitle = function(t, s) {
                self.title = t;
                self.subtitle = s;
                self.showtitle(0);
                NomanicObject.ob('tbartl' + self.pid).innerHTML = (self.title ? self.title : '');
                NomanicObject.objs[self.id] = self;
            }
            NMC.brdrs = [19, 37, 21];
            mrg = [18 + wgutter, 19 + wgutter, 37 + wgutter, 21 + wgutter];
        } else if (fr == 3) {
            ln += '<div><img src="' + NomanicObject.urlpath + 'ims/w1_0.png" style="position:absolute;top:-55px;left:-10px;width:10px;height:55px;" />';
            ln += '<img src="' + NomanicObject.urlpath + 'ims/w1_2.png" style="position:absolute;top:-55px;right:-10px;width:10px;height:55px;" />';
            ln += '<img src="' + NomanicObject.urlpath + 'ims/w1_5.png" style="position:absolute;bottom:-10px;left:-10px;width:10px;height:10px;" />';
            ln += '<img src="' + NomanicObject.urlpath + 'ims/w1_7.png" style="position:absolute;bottom:-10px;right:-10px;width:10px;height:10px;" />';
            ln += '<div style="position:absolute;top:-55px;width:100%;height:55px;background:url(' + "'" + NomanicObject.urlpath + 'ims/w1_1.png' + "'" + ');"></div>';
            ln += '<div style="position:absolute;top:0px;left:-10px;width:10px;height:100%;background:url(' + "'" + NomanicObject.urlpath + 'ims/w1_3.png' + "'" + ');"></div>';
            ln += '<div style="position:absolute;top:0px;right:-10px;width:10px;height:100%;background:url(' + "'" + NomanicObject.urlpath + 'ims/w1_4.png' + "'" + ');"></div>';
            ln += '<div class="tbar' + NMC.pid + ' tbar" style="position:absolute;color:' + (NMC.layout.titlebar.color ? NMC.layout.titlebar.color : (NMC.layout.titlebar.background ? NomanicObject.getCon(NMC.layout.titlebar.background) : '#fff')) + ';top:-45px;width:100%;height:43px;' + (NMC.layout.titlebar.background ? 'background:' + NMC.layout.titlebar.background + ';' : '') + (NMC.layout.titlebar.image ? 'background-image:url(' + "'" + NMC.layout.titlebar.image + "'" + ');' : '') + 'line-height:43px;font-size:24px;overflow:hidden;">';
            ln += NMC.allowclose ? '<img class="closer" style="float:right;cursor:pointer;" src="' + NomanicObject.urlpath + 'ims/w1_c.png?rt=1"/>' : '';
            ln += '<span id="tbartl' + NMC.pid + '" style="padding-left:5px;width:90%;overflow:hidden;">' + (NMC.title ? NMC.title : '') + '</span></div>';
            ln += '<div style="position:absolute;bottom:-10px;width:100%;height:10px;background:url(' + "'" + NomanicObject.urlpath + 'ims/w1_6.png' + "'" + ');"></div></div>';
            NMC.showtitle(0);
            NMC.settitle = function(t, s) {
                self.title = t;
                self.subtitle = s;
                self.showtitle(0);
                NomanicObject.ob('tbartl' + self.pid).innerHTML = (self.title ? self.title : '');
                NomanicObject.objs[self.id] = self;
            }
            NMC.layout.frametitle = 1;
            NMC.brdrs = [10, 55, 10];
            mrg = [10 + wgutter, 10 + wgutter, 55 + wgutter, 10 + wgutter];
        } else if (fr == 4) {
            ln += '<div><img src="' + NomanicObject.urlpath + 'ims/w3_0.png" style="position:absolute;top:-18px;left:-18px;width:18px;height:18px;" />';
            ln += '<img src="' + NomanicObject.urlpath + 'ims/w3_2.png" style="position:absolute;top:-18px;right:-18px;width:18px;height:18px;" />';
            ln += '<img src="' + NomanicObject.urlpath + 'ims/w3_5.png" style="position:absolute;bottom:-57px;left:-18px;width:18px;height:57px;" />';
            ln += '<img src="' + NomanicObject.urlpath + 'ims/w3_7.png" style="position:absolute;bottom:-57px;right:-18px;width:18px;height:57px;" />';
            ln += '<div style="position:absolute;top:-18px;width:100%;height:18px;background:url(' + "'" + NomanicObject.urlpath + 'ims/w3_1.png' + "'" + ');">';
            ln += '</div>';
            ln += '<div style="position:absolute;top:0px;left:-18px;width:18px;height:100%;background:url(' + "'" + NomanicObject.urlpath + 'ims/w3_3.png' + "'" + ');"></div>';
            ln += '<div style="position:absolute;top:0px;right:-18px;width:18px;height:100%;background:url(' + "'" + NomanicObject.urlpath + 'ims/w3_4.png' + "'" + ');"></div>';
            ln += '<div style="position:absolute;bottom:-57px;width:100%;height:57px;background:url(' + "'" + NomanicObject.urlpath + 'ims/w3_6.png' + "'" + ');">';
            ln += '<div class="tbar blk w100 h100" style="overflow:hidden;color:' + (NMC.layout.titlebar.color ? NMC.layout.titlebar.color : (NMC.layout.titlebar.background ? NomanicObject.getCon(NMC.layout.titlebar.background) : '#575757')) + ';">';
            ln += '<span id="tbartl' + NMC.pid + '" class="blk" style="width:90000%;overflow:hidden;font-size:14px;font-weight:bold;margin-top:9px;">' + (NMC.title ? NMC.title : '') + '<br/><span style="font-size:10px;font-weight:normal;">' + (NMC.subtitle ? NMC.subtitle : '') + '</span></span>';
            ln += NMC.allowclose ? '<img class="closer blk" style="right:0px;cursor:pointer;" src="' + NomanicObject.urlpath + 'ims/w3_c.png?rt=1"/>' : '';
            ln += '</div></div></div>';
            NMC.showtitle(1);
            NMC.settitle = function(t, s) {
                self.title = t;
                self.subtitle = s;
                self.showtitle(1);
                NomanicObject.ob('tbartl' + self.pid).innerHTML = (self.title ? self.title : '') + '<br/><span style="font-size:10px;font-weight:normal;">' + (self.subtitle ? self.subtitle : '') + '</span>';
                NomanicObject.objs[self.id] = self;
            }
            NMC.layout.frametitle = 1;
            NMC.brdrs = [18, 18, 57];
            mrg = [3 + wgutter, 3 + wgutter, 22 + wgutter, 12 + wgutter];
        } else if (fr == 5) {
            ln += '<div><img src="' + NomanicObject.urlpath + 'ims/w4_0.png" style="position:absolute;top:-18px;left:-18px;width:18px;height:18px;" />';
            ln += '<img src="' + NomanicObject.urlpath + 'ims/w4_2.png" style="position:absolute;top:-18px;right:-18px;width:18px;height:18px;" />';
            ln += '<img src="' + NomanicObject.urlpath + 'ims/w4_5.png" style="position:absolute;bottom:-57px;left:-18px;width:18px;height:57px;" />';
            ln += '<img src="' + NomanicObject.urlpath + 'ims/w4_7.png" style="position:absolute;bottom:-57px;right:-18px;width:18px;height:57px;" />';
            ln += '<div style="position:absolute;top:-18px;width:100%;height:18px;background:url(' + "'" + NomanicObject.urlpath + 'ims/w4_1.png' + "'" + ');">';
            ln += '</div>';
            ln += '<div style="position:absolute;top:0px;left:-18px;width:18px;height:100%;background:url(' + "'" + NomanicObject.urlpath + 'ims/w4_3.png' + "'" + ');"></div>';
            ln += '<div style="position:absolute;top:0px;right:-18px;width:18px;height:100%;background:url(' + "'" + NomanicObject.urlpath + 'ims/w4_4.png' + "'" + ');"></div>';
            ln += '<div style="position:absolute;bottom:-57px;width:100%;height:57px;background:url(' + "'" + NomanicObject.urlpath + 'ims/w4_6.png' + "'" + ');">';
            ln += '<div class="tbar blk w100 h100" style="overflow:hidden;color:' + (NMC.layout.titlebar.color ? NMC.layout.titlebar.color : (NMC.layout.titlebar.background ? NomanicObject.getCon(NMC.layout.titlebar.background) : '#fff')) + ';">';
            ln += '<span id="tbartl' + NMC.pid + '" class="blk" style="width:90000%;overflow:hidden;font-size:14px;font-weight:bold;margin-top:9px;">' + (NMC.title ? NMC.title : '') + '<br/><span style="font-size:10px;font-weight:normal;">' + (NMC.subtitle ? NMC.subtitle : '') + '</span></span>';
            ln += NMC.allowclose ? '<img class="closer blk" style="right:0px;cursor:pointer;" src="' + NomanicObject.urlpath + 'ims/w4_c.png?rt=1"/>' : '';
            ln += '</div></div></div>';
            NMC.showtitle(1);
            NMC.settitle = function(t, s) {
                self.title = t;
                self.subtitle = s;
                self.showtitle(1);
                NomanicObject.ob('tbartl' + self.pid).innerHTML = (self.title ? self.title : '') + '<br/><span style="font-size:10px;font-weight:normal;">' + (self.subtitle ? self.subtitle : '') + '</span>';
                NomanicObject.objs[self.id] = self;
            }
            NMC.brdrs = [18, 18, 57];
            NMC.layout.frametitle = 1;
            mrg = [3 + wgutter, 3 + wgutter, 22 + wgutter, 12 + wgutter];
        } else if (fr == 2) {
            ln += '<div><img id="bshadow' + NMC.pid + '" style="position:absolute;bottom:-15px;width:100%;height:15px;" src="' + NomanicObject.urlpath + 'ims/bshadow2.png' + '"/></div>';
            NMC.objects.div.style.border = '1px solid #454545';
            NMC.showtitle(0);
            NMC.settitle = function(t, s) {
                self.title = t;
                self.subtitle = s;
                self.showtitle(0);
                NomanicObject.objs[self.id] = self;
            }
            NMC.brdrs = [0, 0, 15];
            mrg = [wgutter, 47 + wgutter, wgutter, wgutter];
        } else if (fr == 7) {
            var bc = 'background-color:' + (NMC.layout.titlebar.color ? NMC.layout.titlebar.color : (NMC.layout.titlebar.background ? NomanicObject.getCon(NMC.layout.titlebar.background) : '#fff')) + ';';
            ln += '<div><div style="' + bc + 'position:absolute;top:-10px;left:-10px;width:10px;height:10px;border-top:1px solid #454545;border-left:1px solid #454545;"></div>';
            ln += '<div style="' + bc + 'position:absolute;right:-10px;top:-10px;width:10px;height:10px;border-top:1px solid #454545;border-right:1px solid #454545;"></div>';
            ln += '<div style="' + bc + 'position:absolute;bottom:-10px;left:-10px;width:10px;height:10px;border-bottom:1px solid #454545;border-left:1px solid #454545;"></div>';
            ln += '<div style="' + bc + 'position:absolute;right:-10px;bottom:-10px;width:10px;height:10px;border-bottom:1px solid #454545;border-right:1px solid #454545;"></div>';
            ln += '<div style="' + bc + 'position:absolute;top:-10px;left:0px;width:100%;height:10px;border-top:1px solid #454545;"></div>';
            ln += '<div style="' + bc + 'position:absolute;left:0px;bottom:-10px;width:100%;height:10px;border-bottom:1px solid #454545;"></div>';
            ln += '<div style="' + bc + 'position:absolute;top:0px;left:-10px;width:10px;height:100%;border-left:1px solid #454545;"></div>';
            ln += '<div style="' + bc + 'position:absolute;right:-10px;top:0px;width:10px;height:100%;border-right:1px solid #454545;"></div>';
            ln += '<img id="bshadow' + NMC.pid + '" style="position:absolute;bottom:-30px;width:100%;height:20px;" src="' + NomanicObject.urlpath + 'ims/bshadow.png' + '"/>';
            ln += NMC.allowclose ? '<img class="closer blk" style="right:0px;bottom:-33px;cursor:pointer;" src="' + NomanicObject.urlpath + 'ims/closebut.png?rt=1"/>' : '';
            ln += '</div>';
            NMC.objects.div.style.border = '1px solid #454545';
            NMC.showtitle(0);
            NMC.settitle = function(t, s) {
                self.title = t;
                self.subtitle = s;
                self.showtitle(0);
                NomanicObject.objs[self.id] = self;
            }
            NMC.brdrs = [10, 10, 30];
            mrg = [wgutter, 47 + wgutter, wgutter, wgutter];
        } else if (fr == 8) {
            var bc = 'background-color:' + (NMC.layout.titlebar.background ? NMC.layout.titlebar.background : (NMC.layout.titlebar.background ? NomanicObject.getCon(NMC.layout.titlebar.background) : '#fff')) + ';';
            ln += '<div><img src="' + NomanicObject.urlpath + 'ims/w5_0.png" style="position:absolute;top:-18px;left:-19px;width:30px;height:30px;" />';
            ln += '<img src="' + NomanicObject.urlpath + 'ims/w5_2.png" style="position:absolute;top:-18px;right:-19px;width:30px;height:30px;" />';
            ln += '<img src="' + NomanicObject.urlpath + 'ims/w5_5.png" style="position:absolute;bottom:-59px;left:-19px;width:41px;height:72px;" />';
            ln += '<img src="' + NomanicObject.urlpath + 'ims/w5_7.png" style="position:absolute;bottom:-59px;right:-19px;width:41px;height:72px;" />';
            ln += '<div style="position:absolute;margin-left:11px;top:-18px;width:100%;height:30px;background:url(' + "'" + NomanicObject.urlpath + 'ims/w5_1.png' + "'" + ');">';
            ln += '</div>';
            ln += '<div style="position:absolute;top:12px;left:-19px;width:30px;height:100%;background:url(' + "'" + NomanicObject.urlpath + 'ims/w5_3.png' + "'" + ');"></div>';
            ln += '<div style="position:absolute;top:12px;right:-19px;width:30px;height:100%;background:url(' + "'" + NomanicObject.urlpath + 'ims/w5_4.png' + "'" + ');"></div>';
            ln += '<div style="position:absolute;margin-left:22px;bottom:-59px;width:100%;height:72px;background:url(' + "'" + NomanicObject.urlpath + 'ims/w5_6.png' + "'" + ');">';
            ln += '<div class="tbar blk w100" style="overflow:hidden;top:17px;height:32px;' + bc + 'color:' + (NMC.layout.titlebar.color ? NMC.layout.titlebar.color : (NMC.layout.titlebar.background ? NomanicObject.getCon(NMC.layout.titlebar.background) : '#fff')) + ';">';
            ln += '<span id="tbartl' + NMC.pid + '" class="blk w100" style="overflow:hidden;margin-left:10px;line-height:32px;font-size:16px;font-weight:bold;">' + (NMC.title ? NMC.title : '') + '<span style="font-size:13px;font-weight:normal;">' + (NMC.subtitle ? NMC.subtitle : '') + '</span></span>';
            ln += '<div class="blk w100 h100" style="background:url(' + "'" + NomanicObject.urlpath + 'ims/shad8.png' + "'" + ');"></div>';
            ln += '</div></div></div>';
            NMC.showtitle(1);
            NMC.framesz = function(NMC) {
                var o = NMC.objects.frame.children[0].children;
                NMC.objects.frame.style.zIndex = 9000;
                o[4].style.width = (NMC.objects.div.offsetWidth - 22) + 'px';
                o[7].style.width = (NMC.objects.div.offsetWidth - 44) + 'px';
                o[5].style.height = (NMC.objects.div.offsetHeight - 24) + 'px';
                o[6].style.height = (NMC.objects.div.offsetHeight - 24) + 'px';
            }
            NMC.settitle = function(t, s) {
                self.title = t;
                self.subtitle = s;
                self.showtitle(1);
                NomanicObject.ob('tbartl' + self.pid).innerHTML = (self.title ? self.title : '') + '<br/><span style="font-size:10px;font-weight:normal;">' + (self.subtitle ? self.subtitle : '') + '</span>';
                NomanicObject.objs[self.id] = self;
            }
            NMC.brdrs = [19, 18, 13];
            NMC.layout.frametitle = 1;
            mrg = [19 + wgutter, 19 + wgutter, 18 + wgutter, 59 + wgutter];
        }
        NMC.wxm = mrg[0] + mrg[1] - wgutter - wgutter;
        NMC.objects.frame.innerHTML = ln;
        b = NMC.objects.frame.getElementsByClassName('closer');
        NMC.objects.frame.style.pointerEvents = 'none';
        var self = NMC;
        for (f = 0; f < b.length; f++) {
            b[f].style.cursor = 'pointer';
            b[f].style.pointerEvents = 'auto';
            NomanicObject.addClick(self, b[f], function(e) {
                e.target.style.display = 'none';
                NomanicObject.closeframe(self, e.target);
            });
        }
        NomanicObject.setgridmode(NMC, NMC.gridmode);
        return NMC;
    },
    setgridmode: function(NMC, gm) {
        NMC.gridmode = (gm || (gm === 0)) ? gm : NMC.gridmode;
        if (NMC.gridmode || (NMC.gridmode === 0)) {
            var o = NMC.objects.div.parentNode;
            if (o.hasAttribute('idx')) {
                o.style.paddingLeft = (((NMC.gridmode) ? NMC.brdrs[0] : 0) + NMC.gridmode) + 'px';
                o.style.paddingRight = (((NMC.gridmode) ? NMC.brdrs[0] : 0) + NMC.gridmode) + 'px';
                o.style.paddingTop = (((NMC.gridmode) ? NMC.brdrs[1] : 0) + NMC.gridmode) + 'px';
                o.style.paddingBottom = (((NMC.gridmode) ? NMC.brdrs[2] : 0) + NMC.gridmode) + 'px';
            }
        }
        NomanicObject.objs[NMC.id] = NMC;
    },
    attach: function(ev, fn) {
        var f, iw;
        for (f = 0; f < NomanicObject.objs.length; f++) {
            iw = NomanicObject.objs[f].attach ? NomanicObject.objs[f].attach(ev, fn) : 0;
        }
    },
    closeframe: function(NMC, b) {
        NMC = NomanicObject.objs[NMC.id];
        var o;
        if (o = NomanicObject.ob('tbartl' + NMC.pid)) {
            o.style.display = 'none';
        }
        NMC.tween3 = NMC.tween3 ? NMC.tween3 : (new NomanicObject.tweenable());
        if (NMC.run3) {
            NMC.tween3.stop();
        }
        NMC.run3 = 1;
        NMC.tween3.create({
            duration: 1500,
            easing: NomanicObject.easer.easeOutQuad,
            target: [NMC],
            step: function(ar, tw) {
                ar[0].objects.div.style.opacity = (1 - tw);
                NomanicObject.ob('overlay00001').style.opacity = (1 - tw);
            },
            finish: function(ar, tw) {
                ar[0].run3 = 0;
                ar[0].objects.div.style.opacity = 0;
                if (ar[0].objects.div.parentNode.contains(ar[0].objects.div)) {
                    ar[0].objects.div.parentNode.removeChild(ar[0].objects.div);
                }
                var iw = ar[0].onclosing ? ar[0].onclosing(ar[0]) : (ar[0].onclose ? ar[0].onclose(ar[0]) : 0);
                var NMC = NomanicObject.destroy(ar[0]);
                ar[0].objects.div.innerHTML = '';
                NomanicObject.objs[NMC.id] = false;
            },
            autorun: 1
        });
    },
    //panels
    dopanels: function(NMC) {
        var hp = ((1 - NMC.panels[1] - NMC.panels[3]) * 100),
            wp = ((1 - NMC.panels[0] - NMC.panels[2]) * 100),
            hp2 = ((1 - NMC.panels[1] - NMC.panels[3] - NMC.panels[4] - NMC.panels[5]) * 100);
        NMC.objects.panels[1].style.height = (NMC.panels[1] * 100) + '%';
        NMC.objects.panels[1].style.width = '100%';
        NMC.objects.panels[3].style.height = (NMC.panels[3] * 100) + '%';
        NMC.objects.panels[3].style.width = '100%';
        NMC.objects.panels[0].style.width = (NMC.panels[0] * 100) + '%';
        NMC.objects.panels[0].style.top = (NMC.panels[1] * 100) + '%';
        NMC.objects.panels[0].style.height = hp + '%';
        NMC.objects.panels[2].style.width = (NMC.panels[2] * 100) + '%';
        NMC.objects.panels[2].style.top = (NMC.panels[1] * 100) + '%';
        NMC.objects.panels[2].style.height = hp + '%';
        NMC.objects.panels[5].style.left = (NMC.panels[0] * 100) + '%';
        NMC.objects.panels[5].style.top = (NMC.panels[1] * 100) + '%';
        NMC.objects.panels[5].style.width = wp + '%';
        NMC.objects.panels[5].style.height = (NMC.panels[4] * 100) + '%';
        NMC.objects.panels[6].style.left = (NMC.panels[0] * 100) + '%';
        NMC.objects.panels[6].style.bottom = (NMC.panels[3] * 100) + '%';
        NMC.objects.panels[6].style.width = wp + '%';
        NMC.objects.panels[6].style.height = (NMC.panels[5] * 100) + '%';
        NMC.objects.panels[4].style.left = (NMC.panels[0] * 100) + '%';
        NMC.objects.panels[4].style.top = ((NMC.panels[1] + NMC.panels[4]) * 100) + '%';
        NMC.objects.panels[4].style.width = wp + '%';
        NMC.objects.panels[4].style.height = hp2 + '%';
    },
    maintain: function(w0, h0, w1, h1) {
        var w = w0,
            h = w * (h1 / w1);
        if (h > h0) {
            h = h0;
            w = h * (w1 / h1);
        }
        return [(w0 - w) / 2, (h0 - h) / 2, w, h];
    },
    //resixers
    rsre: function(NMC, xbuf, maxh) {
        NMC = NMC ? NMC : this;
        var w = NMC.objects.div.offsetWidth,
            iw;
        if (!xbuf) {
            var iw = NMC.onbeforersr ? NMC.onbeforersr(NMC) : 0;
            var h10, f, b, o, s,
                h = NMC.filldiv ? NMC.objects.div.parentNode.offsetHeight : (NMC.layout.idh == -1 ? NMC.objects.div.offsetHeight : (w * (NMC.layout.idh / NMC.layout.idw))),
                rt = w / NMC.layout.idw,
                rt1 = h / (NMC.layout.idh == -1 ? NMC.objects.div.offsetHeight : NMC.layout.idh);
            if (NMC.layout.idh != -1) {
                if (NMC.layout.maintain) {
                    var nsz = NomanicObject.maintain(NMC.objects.div.parentNode.offsetWidth, NMC.objects.div.parentNode.offsetHeight, NMC.layout.idw, NMC.layout.idh);
                    NMC.objects.div.style.left = nsz[0] + 'px';
                    NMC.objects.div.style.top = nsz[1] + 'px';
                    NMC.objects.div.style.width = nsz[2] + 'px';
                    NMC.objects.div.style.height = nsz[3] + 'px';
                } else {
                    NMC.objects.div.style.height = h + 'px';
                }
            }
            if (NMC.modal) {
                NMC.objects.div.style.zIndex = 999999;
            } else {
                NMC.objects.div.style.zIndex = 6000;
            }
        } else {
            var h = NMC.objects.div.offsetHeight,
                rt = w / NMC.layout.idw,
                rt1 = h / (NMC.layout.idh == -1 ? NMC.objects.div.offsetHeight : NMC.layout.idh);
        }
        iw = NMC.framesz ? NMC.framesz(NMC) : 0;
        NomanicObject.dopanels(NMC);
        if (NMC.buttons.length > 0) {
            NMC.objects.hold.style.width = 160 + 'px';
            NMC.objects.iwrapper.style.width = (NMC.objects.wrapper.offsetWidth - 147) + 'px';
            NMC.objects.caption.style.width = (NMC.objects.wrapper.offsetWidth - 147) + 'px';
            NMC.objects.border0.style.width = (NMC.objects.wrapper.offsetWidth - 147) + 'px';
        }
        if (NMC.layout.frame == 7) {
            NMC.objects.bshadow = (!NMC.objects.bshadow) ? NomanicObject.ob('bshadow' + NMC.pid) : NMC.objects.bshadow;
            if (NMC.objects.bshadow) {
                NMC.objects.bshadow.style.height = ((w / 862) * 47) + 'px';
                NMC.objects.div.style.border = '1px solid #454545';
                NMC.objects.bshadow.style.bottom = (-(((w / 862) * 47) + 10)) + 'px';
            }
        }
        if (NMC.layout.showframeborder || NMC.layout.showchartborder) {
            h10 = Math.max(Math.floor(10 * rt), 10),
                b = NMC.objects.frh;
            for (f = 0; f < b.length; f++) {
                b[f].style.height = h10 + 'px';
            }
            b = NMC.objects.frw;
            for (f = 0; f < b.length; f++) {
                b[f].style.width = h10 + 'px';
            }
            b = NMC.objects.frh100;
            for (f = 0; f < b.length; f++) {
                (o = b[f].style).height = Math.floor(b[f].parentNode.parentNode.offsetHeight - h10 - h10) + 'px';
                o.top = h10 + 'px';
            }
            b = NMC.objects.frw100;
            for (f = 0; f < b.length; f++) {
                (o = b[f].style).width = Math.floor(NMC.objects.inwrapper.offsetWidth - h10 - h10) + 'px';
                o.left = h10 + 'px';
            }
        }
        NMC.objects.border0.style.display = (NMC.layout.showframeborder) ? 'block' : 'none';
        NMC.objects.border1.style.display = (NMC.layout.showchartborder) ? 'block' : 'none';
        if (NMC.layout.type == 'lightbox') {
            NMC.objects.div.style.marginLeft = -(w / 2) + 'px';
            NMC.objects.div.style.marginTop = -(h / 2) + 'px';
            if (NMC.center) {
                var sz = NomanicObject.vsz();
                NMC.objects.div.style.left = '50%';
                NMC.objects.div.style.top = window.pageYOffset + (sz[1] / 2);
            }
            if (!xbuf) {
                NomanicObject.redolightbox(NMC, NMC.objects.div, NMC.openfiller);
            }
        }
        if (NMC.mask) {
            NMC.objects.mask.style.backgroundImage = "url('" + NMC.mask.src + "')";
        }
        var cap;
        if (cap = NMC.objects.caption.firstChild) {
            cap.style.display = ((cap.offsetHeight > 0.9 * cap.parentNode.offsetHeight) && (cap.style.display == 'block')) ? 'none' : 'block';
        }
        iw = NMC.onafterrsr ? NMC.onafterrsr(NMC) : 0;
        return NMC;
    },
    //resize chart
    rsr: function(NMC, xbuf) {
        NMC = NMC ? NMC : this;
        var iw = NMC.onbeforersr ? NMC.onbeforersr(NMC) : 0;
        var o, wc = NMC.objects.canvas.offsetWidth,
            s, w = NMC.objects.div.offsetWidth,
            h = (NMC.layout.idh == -1 ? NMC.objects.div.parentNode.offsetHeight : (w * (NMC.layout.idh / NMC.layout.idw))),
            rt = w / NMC.layout.idw,
            rt1 = h / (NMC.layout.idh == -1 ? NMC.objects.div.offsetHeight : NMC.layout.idh),
            bdr = 0;
        if (NMC.layout.maintain) {
            var nsz = NomanicObject.maintain(NMC.objects.div.parentNode.offsetWidth, NMC.objects.div.parentNode.offsetHeight, NMC.layout.idw, NMC.layout.idh);
            NMC.objects.div.style.left = nsz[0] + 'px';
            NMC.objects.div.style.top = nsz[1] + 'px';
            NMC.objects.div.style.width = nsz[2] + 'px';
            NMC.objects.div.style.height = nsz[3] + 'px';
        } else {
            NMC.objects.div.style.height = h + 'px';
        }
        iw = NMC.framesz ? NMC.framesz(NMC) : 0;
        if (NMC.buttons.length > 0) {
            NMC.objects.hold.style.width = 160 + 'px';
            NMC.objects.iwrapper.style.width = (NMC.objects.wrapper.offsetWidth - 147) + 'px';
            NMC.objects.caption.style.width = (NMC.objects.wrapper.offsetWidth - 147) + 'px';
            NMC.objects.border0.style.width = (NMC.objects.wrapper.offsetWidth - 147) + 'px';
        }
        NomanicObject.dopanels(NMC);
        if (NMC.layout.frame == 5) {
            NMC.objects.bshadow = (!NMC.objects.bshadow) ? NomanicObject.ob('bshadow' + NMC.pid) : NMC.objects.bshadow;
            if (NMC.objects.bshadow) {
                NMC.objects.bshadow.style.height = ((w / 862) * 47) + 'px';
                NMC.objects.div.style.border = '1px solid #454545';
                NMC.objects.bshadow.style.bottom = (-(w / 862) * 47) + 'px';
            }
        }
        if (NMC.layout.showzoom && NMC.layout.vertical) {
            NMC.objects.axisy.style.display = "none";
            NMC.objects.xscroll.style.display = "block";
            NMC.objects.axisx.style.display = NMC.layout.showaxis ? "block" : "none";
            NMC.objects.yscroll.style.display = "block";
            NMC.scroll = [0, 1, NMC.layout.showaxis, 1];
        } else if (NMC.layout.showzoom) {
            NMC.objects.axisy.style.display = NMC.layout.showaxis ? "block" : "none";
            NMC.objects.yscroll.style.display = "block";
            NMC.objects.axisx.style.display = "none";
            NMC.objects.xscroll.style.display = "block";
            NMC.scroll = [NMC.layout.showaxis, 1, 0, 1];
        } else if (NMC.layout.vertical) {
            NMC.objects.axisy.style.display = "none";
            NMC.objects.xscroll.style.display = "none";
            NMC.objects.axisx.style.display = NMC.layout.showaxis ? "block" : "none";
            NMC.objects.yscroll.style.display = NMC.layout.showscroll ? "block" : "none";
            NMC.scroll = [0, 0, NMC.layout.showaxis, NMC.layout.showscroll];
        } else {
            NMC.objects.axisy.style.display = NMC.layout.showaxis ? "block" : "none";
            NMC.objects.xscroll.style.display = NMC.layout.showscroll ? "block" : "none";
            NMC.objects.axisx.style.display = "none";
            NMC.objects.yscroll.style.display = "none";
            NMC.scroll = [NMC.layout.showaxis, NMC.layout.showscroll, 0, 0];
        }
        var cl = NMC.layout.pencil.nink,
            pgrh,
            n = Math.min(Math.floor(bdr * rt), bdr),
            h2 = Math.min(Math.floor(2 * rt), 2),
            h4 = Math.min(Math.floor(4 * rt), 4),
            h10 = Math.min(Math.floor(10 * rt), 10),
            h12 = Math.min(Math.floor(12 * rt), 12),
            h14 = Math.min(Math.floor(14 * rt), 14),
            h18 = Math.min(Math.floor(18 * rt), 18),
            h20 = Math.min(Math.floor(20 * rt), 20),
            h26 = Math.min(Math.floor(26 * rt), 26),
            h32 = Math.min(Math.floor(32 * rt), 32),
            h34 = Math.min(Math.floor(34 * rt), 34),
            h36 = Math.min(Math.floor(36 * rt), 36),
            h30 = h36 - 4,
            h260 = Math.min(Math.floor(260 * rt), 260),
            w2 = Math.min(Math.floor(2 * rt1), 2),
            w5 = Math.min(Math.floor(5 * rt1), 5),
            w20 = Math.min(Math.floor(20 * rt1), 20),
            w36 = Math.min(Math.floor(36 * rt1), 36),
            w72 = Math.min(Math.floor(72 * rt1), 72),
            f,
            b = NMC.objects.iwrapper,
            pleft = NMC.objects.wrapper.offsetWidth * (NMC.layout.fullscreen ? 0 : 0.03),
            ptop = NMC.objects.wrapper.offsetHeight * (NMC.layout.fullscreen ? 0 : 0.03),
            pdiff = 0,
            pbottom = (NMC.buttons.length > 0 ? NMC.objects.iwrapper.offsetHeight : (NMC.objects.wrapper.offsetHeight)) * (NMC.layout.fullscreen ? 1 : 0.97),
            pright = (NMC.buttons.length > 0 ? NMC.objects.iwrapper.offsetWidth : (NMC.objects.wrapper.offsetWidth)) * (NMC.layout.fullscreen ? 1 : 0.97);
        if (cl != NMC.ocl) {
            b = NMC.objects.div.getElementsByClassName('brdr');
            for (f = 0; f < b.length; f++) {
                if (!NomanicObject.hasClass(b[f], 'done')) {
                    b[f].style.border = '1px solid ' + NMC.layout.pencil.nink;
                }
            }
            b = NMC.objects.div.getElementsByClassName('bcl');
            for (f = 0; f < b.length; f++) {
                b[f].style.backgroundColor = NMC.layout.pencil.nink;
            }
            NMC.objects.wrapper.style.color = NMC.layout.pencil.nink;
            NMC.objects.graph.style.color = NMC.layout.chart.nink ? NMC.layout.chart.nink : NMC.layout.pencil.nink;
            NMC.objects.t2.style.color = NMC.layout.pencil.nink;
            if (NMC.plot.neon) {
                NMC.objects.div.style.textShadow = '0 0 30px ' + NMC.layout.pencil.nink;
                NMC.objects.graph.style.textShadow = '0 0 30px ' + (NMC.layout.chart.nink ? NMC.layout.chart.nink : NMC.layout.pencil.nink);
            }
            NMC.ocl = cl;
        }
        if ((NMC.gtype != 2) && (NMC.layout.showtitle || NMC.layout.showmenu) && (!NMC.layout.titleover)) {
            NMC.objects.head.style.display = 'block';
            if (NMC.layout.showtitle) {
                (b = NMC.objects.head).style.height = h36 + 'px';
                b.style.left = (NMC.layout.fullscreen ? ((NMC.scroll[0]) ? (w36 + w5 + w5) : (w5 + w5)) : 0) + 'px';
                b.style.top = ptop + 'px';
                b.style.lineHeight = h36 + 'px';
                b.style.fontSize = h26 + 'px';
                NMC.objects.head.children[1].style.display = 'block';
            } else {
                NMC.objects.head.children[1].style.display = 'none';
            }
            if (NMC.layout.showmenu) {
                (b = NMC.objects.head.children[0]).style.display = 'block';
                b.style.fontSize = h18 + 'px';
                b.style.height = h26 + 'px';
                b.style.lineHeight = h26 + 'px';
                b.style.fontSize = h18 + 'px';
                b.children[0].style.marginLeft = w5 + 'px';
                b.children[0].style.marginTop = h4 + 'px';
                b.children[0].style.height = h18 + 'px';
            } else {
                NMC.objects.head.children[0].style.display = 'none';
            }
            if (!NMC.layout.titleover) {
                ptop += h36;
                pdiff += h36;
            }
        } else {
            NMC.objects.head.style.display = 'none';
        }
        if ((!NMC.layout.frametitle) && (NMC.layout.gtype == 2)) {
            (b = NMC.objects.t2).style.height = h36 + 'px';
            b.style.lineHeight = h36 + 'px';
            b.style.fontSize = h26 + 'px';
            b.style.display = 'block';
        } else {
            NMC.objects.t2.style.display = 'none';
        }
        if (NMC.scroll[2]) {
            (b = NMC.objects.axisx).style.height = h26 + 'px';
            b.style.top = ptop + 'px';
            b.style.fontSize = h12 + 'px';
            b.style.lineHeight = h26 + 'px';
            for (f = 0; f < b.children.length; f++) {
                b.children[f].style.marginLeft = (-b.children[f].offsetWidth / 2) + 'px';
            }
            ptop += h26;
            pdiff += h26;
        }
        (b = NMC.objects.lscroll).style.display = 'none';
        if (NMC.layout.showlegend < 1) {
            var s, hgt = (pbottom - ptop),
                wdt = (NMC.layout.showlegend * pright - pleft) + h4,
                ih = h34,
                chgt = 0,
                vlb = Math.floor(hgt / ih),
                nlb = NMC.legend.labels[NMC.cs].length;
            NMC.layout.showlscroll = 0;
            if (nlb > vlb) {
                NMC.layout.showlscroll = 1;
                b.style.display = 'block';
                b.style.height = (hgt - 2) + 'px';
                b.style.width = w36 + 'px';
                pright -= w36;
                wdt -= w36;
                b.style.top = ptop + 'px';
                b.style.left = pright + 'px';
                b.children[0].style.width = w20 + 'px';
                b.children[0].style.height = b.offsetHeight + 'px';
                b.children[0].style.right = '0px';
                b.children[0].children[0].style.width = w20 + 'px';
            }
            (b = NMC.objects.legend).style.height = hgt + 'px';
            b.style.display = 'block';
            b.style.top = ptop + 'px';
            b.style.width = (wdt - h4 - h4) + 'px';
            b.children[0].style.margin = h2 + 'px';
            pright -= wdt;
            b.style.left = (pright + h4 + h4) + 'px';
            for (f = 0; f < NMC.legend.labels[NMC.cs].length; f++) {
                s = b.children[0].children[f];
                s.style.height = h34 + 'px';
                s.style.top = chgt + 'px';
                s.children[0].style.fontSize = h18 + 'px';
                s.children[0].style.height = h18 + 'px';
                s.children[0].style.lineHeight = h20 + 'px';
                s.children[0].style.left = (h34 + h10) + 'px';
                s.children[0].style.top = h18 + 'px';
                s.children[0].style.width = (s.offsetWidth - h34 - h4 - h4) + 'px';
                s.children[0].style.textAlign = 'left';
                s.children[1].style.width = h26 + 'px';
                s.children[1].style.height = h26 + 'px';
                s.children[1].style.top = h4 + 'px';
                s.children[1].style.left = h4 + 'px';
                s.children[2].style.fontSize = h14 + 'px';
                s.children[2].style.height = h14 + 'px';
                s.children[2].style.lineHeight = h14 + 'px';
                s.children[2].style.left = (h34 + h4 + h4) + 'px';
                s.children[2].style.top = h4 + 'px';
                s.children[2].style.width = (s.offsetWidth - h36 - h4) + 'px';
                chgt += h34;
            }
            b.children[0].style.height = chgt + 'px';
            b.style.overflow = 'hidden';
            if (chgt < b.offsetHeight) {
                b.children[0].style.top = (NMC.objects.grapha.offsetHeight - chgt - h20) + 'px';
            } else {
                b.children[0].style.top = '0px';
            }
        } else if (NMC.layout.showlegend == 1) {
            NMC.legend.rows = Math.ceil(NMC.legend.labels[NMC.cs].length / NMC.legend.columns);
            var hgt = ((NMC.legend.rows * h26) + (h10 + h10));
            (b = NMC.objects.legend).children[0].style.margin = h10 + 'px';
            b.style.display = 'block';
            b.style.height = hgt + 'px';
            pbottom -= hgt;
            b.style.top = pbottom + 'px';
            for (f = 0; f < b.children[0].children.length; f++) {
                s = b.children[0].children[f];
                s.style.height = h30 + 'px';
                s.style.lineHeight = h12 + 'px';
                s.style.fontSize = h14 + 'px';
                (o = s.children[0].style).marginRight = w5 + 'px';
                o.fontSize = h12 + 'px';
                o.textAlign = 'right';
                (o = s.children[1].style).height = (h20) + 'px';
                o.width = (h20) + 'px';
                o.margin = h2 + 'px';
                s.children[2].style.marginLeft = w5 + 'px';
            }
            (o = b.children[0].style).height = '100%';
            o.width = (b.offsetWidth - h10 - h10) + 'px';
        } else {
            (b = NMC.objects.legend).children[0].style.display = 'none';
        }
        if (NMC.layout.spark) {
            NMC.objects.head.style.display = 'none';
        }
        if (NMC.scroll[1] && (!NMC.layout.spark)) {
            (b = NMC.objects.xscroll).style.height = (h26 - 2) + 'px';
            pbottom -= h26;
            pdiff += h26;
            b.style.top = pbottom + 'px';
            (o = b.children[0].style).height = (h20 - 2) + 'px';
            o.width = (b.offsetWidth - 2) + 'px';
            o.marginTop = h4 + 'px';
        }
        if (NMC.scroll[0]) {
            (b = NMC.objects.axisy).style.height = (pbottom - ptop) + 'px';
            (o = b.style).width = w36 + 'px';
            o.top = ptop + 'px';
            pleft += w36;
            o.fontSize = h12 + 'px';
            o.lineHeight = h26 + 'px';
        }
        if (NMC.scroll[3]) {
            (b = NMC.objects.yscroll).style.height = (pbottom - ptop - 2) + 'px';
            (o = b.style).width = w36 + 'px';
            pright -= w36;
            o.top = ptop + 'px';
            o.left = pright + 'px';
            (o = b.children[0].style).width = w20 + 'px';
            o.height = (b.offsetHeight - 2) + 'px';
            o.right = '0px';
            b.children[0].children[0].style.width = w20 + 'px';
        } else {
            NMC.objects.canvas.style.top = '0px';
        }
        var gh, gw;
        (b = NMC.objects.grapha.style).height = (gh = (pgrh = (pbottom - ptop - (NMC.layout.showgrid ? 2 : 0)))) + 'px';
        b.width = (gw = (pright - pleft - (NMC.layout.showgrid ? 2 : 0))) + 'px';
        b.top = ptop + 'px';
        b.left = pleft + 'px';
        (b = NMC.objects.graph.style).height = (gh * NMC.plot.scaley) + 'px';
        b.width = (gw * NMC.plot.scaley) + 'px';
        b.top = ((gh * (1 - NMC.plot.scaley)) / 2) + 'px';
        b.left = ((gw * (1 - NMC.plot.scalex)) / 2) + 'px';
        NMC = NMC.updateaxis(NMC);
        var cap;
        if (cap = NMC.objects.caption.firstChild) {
            cap.style.display = ((cap.offsetHeight > 0.9 * cap.parentNode.offsetHeight) && (cap.style.display == 'block')) ? 'none' : 'block';
        }
        var gh = NMC.objects.graph.offsetHeight;
        if (NMC.layout.floatingtags) {
            var ht = (57 / 500) * gh,
                wt = ht,
                ft = 0.2 * ht;
            for (f = 0; f < NMC.objects.tools.children.length; f++) {
                s = NMC.objects.tools.children[f];
                (o = s.style).width = wt + 'px';
                o.height = ht + 'px';
                o.lineHeight = ht + 'px';
                o.fontSize = ft + 'px';
                s.children[0].innerHTML = NomanicObject.getsvg(NomanicObject.tag, ht, '#454545', '#F8F8F8');
            }
        }
        if (NMC.scroll[2]) {
            (b = NMC.objects.axisx).style.width = (pright - pleft) + 'px';
        }
        if (NMC.scroll[1]) {
            (b = NMC.objects.xscroll).style.width = (pright - pleft) + 'px';
            b.style.left = pleft + 'px';
            (o = b.children[0].style).height = (b.offsetHeight - 3) + 'px';
            o.width = (b.offsetWidth - 2) + 'px';
        } else {
            NMC.objects.canvas.style.left = '0px';
        }
        if (NMC.layout.showlegend == 1) {
            (b = NMC.objects.legend).style.width = (pright - pleft) + 'px';
            b.style.left = pleft + 'px';
            b.children[0].style.width = (b.offsetWidth - h10 - h10) + 'px';
        }
        NMC.objects.border0.style.display = (NMC.layout.showframeborder) ? 'block' : 'none';
        NMC.objects.border1.style.display = (NMC.layout.showchartborder) ? 'block' : 'none';
        if (!xbuf) {
            NMC = NomanicObject.sortoutslider(NMC, 1);
            NMC = NomanicObject.sortoutzoomslider(NMC, 1);
            NMC = NomanicObject.sortoutzoomslider(NMC, 1, 1);
            NMC = NomanicObject.sortouttrayslider(NMC, 1);
            NMC = NomanicObject.rsr(NMC, 2);
        }
        NMC.height = h;
        NMC.width = NMC.height * NMC.canvasratio;
        if (NMC.layout.type == 'polar') {
            NMC.height = NMC.objects.graph.offsetHeight;
            NMC.width = NMC.objects.graph.offsetWidth;
        }
        NMC.objects.canvas.setAttribute('width', NMC.width);
        NMC.objects.canvas.setAttribute('height', NMC.height);
        NMC = NMC.redraw(NMC);
        NMC.showdata(NMC);
        if (NMC.layout.showframeborder || NMC.layout.showchartborder) {
            b = NMC.objects.frh;
            for (f = 0; f < b.length; f++) {
                b[f].style.height = h10 + 'px';
            }
            b = NMC.objects.frw;
            for (f = 0; f < b.length; f++) {
                b[f].style.width = h10 + 'px';
            }
            b = NMC.objects.frh100;
            for (f = 0; f < b.length; f++) {
                (o = b[f].style).height = Math.floor(b[f].parentNode.parentNode.offsetHeight - h10 - h10) + 'px';
                o.top = h10 + 'px';
            }
            b = NMC.objects.frw100;
            for (f = 0; f < b.length; f++) {
                (o = b[f].style).width = Math.floor(b[f].parentNode.parentNode.offsetWidth - h10 - h10) + 'px';
                o.left = h10 + 'px';
            }
        }
        iw = NMC.onafterrsr ? NMC.onafterrsr(NMC) : 0;
        return NMC;
    },
    //tweener
    tweenable: function() {
        this.stopped = false;
        this.create = function(options) {
            this.duration = options.duration;
            this.easing = options.easing;
            this.target = options.target;
            this.animate = options.step;
            this.abort = options.abort;
            this.finish = options.finish ? options.finish : (function() {});
            this.autorun = options.autorun ? this.start() : 0;
        }
        this.start = function() {
            this.d0 = new Date().getTime();
            this.stopped = false;
            this.run();
        }
        this.stop = function() {
            this.stopped = 1;
            var iw = this.abort ? this.abort(this.target, 0) : 0;
        }
        this.run = function() {
            var self = this,
                tdif = (new Date().getTime() - this.d0) / this.duration,
                i = (tdif > 1),
                iw = i ? this.animate(this.target, 1) + this.finish(this.target, 1) : this.animate(this.target, this.easing ? this.easing(tdif) : tdif);
            if (this.stopped) {
                return;
            }
            return i ? 0 : ((typeof window.requestTimeout === "function") ? requestTimeout(function() {
                self.run();
            }, 50) : setTimeout(function() {
                self.run();
            }, 50));
        }
    },
    easer: {
        cl: 0.3 / (2 * Math.PI) * Math.asin(1),
        pi3: (2 * Math.PI) / 0.3,
        easeInOutQuad: function(tw) {
            if ((tw /= 0.5) < 1) return (tw / 2);
            return -tw / 2 * ((tw - 1) * (tw - 2) - 1);
        },
        easeOutElastic: function(tw) {
            return ((tw == 0) || (tw == 1)) ? tw : (Math.pow(2, -10 * tw) * Math.sin((tw - NomanicObject.easer.cl) * NomanicObject.easer.pi3) + 1);
        },
        easeOutBounce: function(tw) {
            return (tw < 0.36364) ? (7.5625 * tw * tw) : ((tw < 0.7273) ? (7.5625 * (tw -= 0.5454) * tw + .75) : ((tw < 0.9091) ? (7.5625 * (tw -= 0.8182) * tw + .9375) : (7.5625 * (tw -= 0.95454) * tw + .984375)));
        },
        easeInOutSine: function(tw) {
            return -0.5 * (Math.cos(Math.PI * tw) - 1);
        },
        hexToRgb: function(hex) {
            var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
                hex1 = hex.replace(shorthandRegex, function(m, r, g, b) {
                    return r + r + g + g + b + b;
                }),
                result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex1);
            return result ? [
                parseInt(result[1], 16),
                parseInt(result[2], 16),
                parseInt(result[3], 16)
            ] : null;
        },
        rgbToHex: function(r, g, b) {
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        },
        interp: function(x0, x1, tw) {
            return (tw * (x1 - x0)) + x0;
        },
        interphex: function(h0, h1, tw) {
            var x0 = NomanicObject.easer.hexToRgb(h0),
                x1 = NomanicObject.easer.hexToRgb(h1);
            return NomanicObject.easer.rgbToHex(easer.interp(x0[0], x1[0], tw), easer.interp(x0[1], x1[1], tw), NomanicObject.easer.interp(x0[2], x1[2], tw));
        },
        nospline: function(t, p0, p1) {
            return {
                x: NomanicObject.easer.interp(p0.x, p1.x, t),
                y: NomanicObject.easer.interp(p0.y, p1.y, t)
            };
        },
        bezier1: function(t, p0, p1, cp0) {
            var t1 = (1 - t),
                t2 = t1 * t1,
                t3 = t1 * 2 * t,
                t4 = t * t;
            return {
                x: (t2 * p0.x + t3 * cp0.x + t4 * p1.x),
                y: (t2 * p0.y + t3 * cp0.y + t4 * p1.y)
            };
        },
        bezier2: function(t, p0, p1, cp0, cp1) {
            var t3, t2, cX = 3 * (cp0.x - p0.x),
                bX = 3 * (cp1.x - cp0.x) - cX,
                aX = p1.x - p0.x - cX - bX,
                cY = 3 * (cp0.y - p0.y),
                bY = 3 * (cp1.y - cp0.y) - cY,
                aY = p1.y - p0.y - cY - bY;
            return {
                x: ((aX * (t3 = Math.pow(t, 3))) + (bX * (t2 = Math.pow(t, 2))) + (cX * t) + p0.x),
                y: ((aY * t3) + (bY * t2) + (cY * t) + p0.y)
            };
        }
    },
    setbackground: function(NMC, im) {
        NMC.objects.iwrapper.style.backgroundImage = NomanicObject.lazyload(NMC.objects.iwrapper, NomanicObject.urlpath + 'assets/' + im);
        return NMC;
    },
    switchto: function(x, NMC) {
        var f;
        if (!NMC) {
            for (f = 0; f < NomanicObject.objs.length; f++) {
                NMC = NomanicObject.objs[f];
                if (NMC) {
                    NomanicObject.getframe(NMC, x);
                    NMC = NMC.rsr(NMC);
                    NomanicObject.objs[NMC.id] = NMC;
                }
            }
            return;
        }
        NomanicObject.getframe(NMC, x);
        NMC = NMC.rsr(NMC);
        NomanicObject.objs[NMC.id] = NMC;
        return;
    },
    redolegend: function(col, NMC) {
        return NMC;
    },
    //look and feel
    lkfeel: function(NMC, opts) {
        var b = (NMC.objects.div.getElementsByClassName('tbar')[0]),
            pl, ch, bck, fr;
        pl = opts.plot ? opts.plot : {};
        ch = opts.chart ? opts.chart : {};
        bck = opts.background ? opts.background : {};
        fr = opts.frame ? opts.frame : {};
        if (bck.image) {
            NMC.objects.iwrapper.style.backgroundImage = NomanicObject.lazyload(NMC.objects.iwrapper, bck.image);
        }
        if (bck.color) {
            NMC.objects.iwrapper.style.backgroundColor = bck.color;
        }
        if (bck.ink) {
            NMC.setink(bck.ink);
        }
        if (bck.shadow || (bck.shadow === 0)) {
            NMC.layout.showframeborder = bck.shadow;
        }
        if (fr.type || (fr.type === 0)) {
            NomanicObject.switchto(fr.type, NMC);
        }
        if (fr.color) {
            b.style.backgroundColor = fr.color;
        }
        if (fr.ink) {
            b.style.color = fr.ink;
        }
        NMC.rsr(NMC);
        return NMC;
    },
    lookandfeel: function(opts, NMC) {
        var f, NMC;
        if (NMC) {
            NMC = NomanicObject.lkfeel(NMC, opts);
            NMC = NMC.owner.lkfeel(NMC, opts);
            NMC.rsr(NMC);
            NomanicObject.objs[NMC.id] = NMC;
            return NMC;
        } else {
            for (f = 0; f < NomanicObject.objs.length; f++) {
                NMC = NomanicObject.objs[f];
                if (NMC) {
                    NMC = NomanicObject.lkfeel(NMC, opts);
                    NMC = NMC.owner.lkfeel(NMC, opts);
                    NomanicObject.objs[NMC.id] = NMC;
                }
            }
        }
    },
    rebuildlegend: function(col, pcol, ccol, gcol, lnes) {
        var NMC, f;
        for (f = 0; f < NomanicObject.objs.length; f++) {
            NMC = NomanicObject.objs[f];
            if (NMC) {
                NMC = NMC.owner.redolegend(col, pcol, ccol, gcol, lnes, NMC);
                NomanicObject.objs[NMC.id] = NMC;
            }
        }
        return;
    },
    bcolor: function(col, NMC) {
        NMC.layout.background.color = col;
        NMC.objects.iwrapper.style.backgroundColor = NMC.layout.background.color;
        if (NMC.layout.mask) {
            NomanicObject.makemask(NMC, NMC.layout.chart.color ? NMC.layout.chart.color : NMC.layout.background.color, NMC.layout.mask);
        }
        NMC = NMC.redraw(NMC);
        return NMC;
    },
    setbcolor: function(col, NMC) {
        var NMC, f;
        if (!NMC) {
            for (f = 0; f < NomanicObject.objs.length; f++) {
                NMC = NomanicObject.objs[f];
                if (NMC) {
                    NMC = NomanicObject.bcolor(col, NMC);
                    NomanicObject.objs[NMC.id] = NMC;
                }
            }
        } else {
            NMC = NomanicObject.bcolor(col, NMC);
            NomanicObject.objs[NMC.id] = NMC;
            return NMC;
        }
        return;
    },
    tcolor: function(col, NMC) {
        var b = (NMC.objects.div.getElementsByClassName('tbar')[0]);
        b.style.color = col;
        return NMC;
    },
    settcolor: function(col, NMC) {
        var NMC, f;
        if (!NMC) {
            for (f = 0; f < NomanicObject.objs.length; f++) {
                NMC = NomanicObject.objs[f];
                if (NMC) {
                    NMC = NomanicObject.tcolor(col, NMC);
                    NomanicObject.objs[NMC.id] = NMC;
                }
            }
        } else {
            NMC = NomanicObject.tcolor(col, NMC);
            NomanicObject.objs[NMC.id] = NMC;
            return NMC;
        }
        return;
    },
    setfshadow: function(x, NMC) {
        var NMC, f;
        if (!NMC) {
            for (f = 0; f < NomanicObject.objs.length; f++) {
                NMC = NomanicObject.objs[f];
                if (NMC) {
                    NMC.layout.showframeborder = x;
                    NMC = NMC.rsr();
                    NomanicObject.objs[NMC.id] = NMC;
                }
            }
        } else {
            NMC.layout.showframeborder = x;
            NMC = NMC.rsr();
            NomanicObject.objs[NMC.id] = NMC;
            return NMC;
        }
        return;
    },
    getobj: function(o) {
        return NomanicObject.objs[parseInt(NomanicObject.ob(o).getAttribute('idx'))];
    },
    //createbefore chart from options
    createbefore: function(NMC) {
        NMC = NomanicObject.objs[NMC.id];
        var self = NMC,
            inrln, j, f, o = NomanicObject.ob(NMC.container),
            ps;
        ps = NomanicObject.loadpanels(NMC, o);
        inrln = '<div id="panels' + NMC.pid + '" class="w100 h100" style="text-transform:none;line-height:1;pointer-events:all;box-sizing:border-box;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;-o-user-select: none;user-select: none;position:relative;font-family:Cabin;background-position:center;background-size:cover;"><div id="panelnorth' + NMC.pid + '" class="northpanel">' + ps[1] + '</div><div id="panelnorthsub' + NMC.pid + '" class="northpanelsub">' + ps[4] + '</div><div id="panelsouthsub' + NMC.pid + '" class="southpanelsub">' + ps[5] + '</div><div id="paneleast' + NMC.pid + '" class="eastpanel">' + ps[2] + '</div><div id="panelwest' + NMC.pid + '" class="westpanel">' + ps[0] + '</div><div id="wrapper' + NMC.pid + '" class="centerpanel" style="position:relative;font-family:Cabin;background-position:center;background-size:cover;"><div style="position:relative;" class="w100 h100"><div id="inwrapper' + NMC.pid + '" class="blk w100 h100"><div id="iwrapper' + NMC.pid + '" class="blk w100 h100" style="overflow:hidden;"><div id="b1' + NMC.pid + '" class="blk"><div class="blk w100 h100" style="width:90%;height:100%;"></div></div><div id="b6' + NMC.pid + '" class="blk w100" style="z-index:4000;pointer-events:none;"><div style="float:right;width:50%;height:100%;text-align:right;overflow:hidden;margin-right:3%;"><div style="float:right;"></div><span style="float:right;overflow:hidden;width:90%;"><div class="tr" style="position:relative;"></div></span></div><div style="position:absolute;width:56%;height:100%;overflow:hidden;left:3%;"></div></div><div id="b2' + NMC.pid + '" class="blk w100"></div><div id="b9a' + NMC.pid + '" class="blk w100 h100" style="overflow:hidden;"><div id="b9' + NMC.pid + '" class="blk w100 h100" style="overflow:hidden;"><div class="blk h100 w100"><div class="blk w100 h100"></div><canvas id="canvas' + NMC.pid + '" class="blk" style="margin:0px;left:0px;top:0px;"></canvas><div class="blk w100 h100" style="pointer-events:none;background-size:cover;background-position:center center;"><div class="blk w100 h100"></div><div class="blk w100 h100"></div></div><div class="blk w100 h100"></div><div class="blk w100 h100"></div><div id="t3' + NMC.pid + '" class="blk h100 w100" style="pointer-Events:none;overflow:hidden;"><div class="blk h100" style="background:#FFF;left:0px;"></div><div class="blk h100" style="background:#FFF;right:0px;"></div><div class="blk w100" style="background:#FFF;top:0px;"></div><div class="blk w100" style="background:#FFF;bottom:0px;"></div></div></div><div id="b15' + NMC.pid + '" class="blk w100" style="overflow:hidden;"></div></div></div><div id="b99' + NMC.pid + '" class="blk w100 h100" style="pointer-events:none;background-size:cover;background-position:center;"></div><div id="b98' + NMC.pid + '" class="blk w100 h100" style="pointer-events:none;background-size:cover;"></div><div id="b12' + NMC.pid + '" class="blk w100 h100" style="display:none;pointer-events: none;"><img class="blk frh frw" src="' + NomanicObject.urlpath + 'ims/fr0.png"><img class="blk frh frw100" src="' + NomanicObject.urlpath + 'ims/fr1.png"><img class="blk frh frw" style="right:0px;" src="' + NomanicObject.urlpath + 'ims/fr2.png"><img class="blk frw frh100" src="' + NomanicObject.urlpath + 'ims/fr3.png"><img class="blk frw frh100" style="right:0px;" src="' + NomanicObject.urlpath + 'ims/fr4.png"><img class="blk frh frw" style="bottom:0px;" src="' + NomanicObject.urlpath + 'ims/fr5.png"><img class="blk frh frw100" style="bottom:0px;" src="' + NomanicObject.urlpath + 'ims/fr6.png"><img class="blk frh frw" style="right:0px;bottom:0px;" src="' + NomanicObject.urlpath + 'ims/fr7.png"></div><div id="zoom' + NMC.pid + '" class="blk" style="pointer-events:none;left:10px;font-weight:normal;width:150px;height:30px;line-height:30px;font-size:15px;background:#000;color:#FFF;display:none;"><div id="zoom0' + NMC.pid + '" class="blk" style="pointer-events:auto;background:#FFF;left:66px;width:20px;height:15px;cursor:pointer;"></div><div id="zoom1' + NMC.pid + '" class="blk" style="cursor:pointer;pointer-events:auto;background:#FFF;top:15px;left:66px;width:20px;height:15px;"></div><img class="blk h100" src="' + NomanicObject.urlpath + 'ims/updown.png" style="left:66px;"><span id="zoom2' + NMC.pid + '" style="float:right;margin-right:5px;"></span><span style="margin-left:10px;">ZOOM</span></div><div id="b8' + NMC.pid + '" class="blk w100"><div class="blk w100 mt"></div></div><div id="b3' + NMC.pid + '" class="blk w100"><div class="blk w100" style=""><div class="blk bcl h100" style="width:25%;left:0px;"></div></div></div><div id="b4' + NMC.pid + '" class="blk"><div class="blk" style=""><div class="blk bcl w100" style="height:25%;top:0px;"></div></div></div><div id="b10' + NMC.pid + '" class="blk"><div class="blk" style=""><div class="blk bcl w100" style="height:25%;top:0px;"></div></div></div></div><div id="b140' + NMC.pid + '" class="blk w100 h100" style="pointer-events:none;overflow:hidden;"></div><div id="b11' + NMC.pid + '" class="blk w100 h100" style="pointer-events: none;display:none;"><img class="blk frh frw" src="' + NomanicObject.urlpath + 'ims/fr0.png"><img class="blk frh frw100" src="' + NomanicObject.urlpath + 'ims/fr1.png"><img class="blk frh frw" style="right:0px;" src="' + NomanicObject.urlpath + 'ims/fr2.png"><img class="blk frw frh100" src="' + NomanicObject.urlpath + 'ims/fr3.png"><img class="blk frw frh100" style="right:0px;" src="' + NomanicObject.urlpath + 'ims/fr4.png"><img class="blk frh frw" style="bottom:0px;" src="' + NomanicObject.urlpath + 'ims/fr5.png"><img class="blk frh frw100" style="bottom:0px;" src="' + NomanicObject.urlpath + 'ims/fr6.png"><img class="blk frh frw" style="right:0px;bottom:0px;" src="' + NomanicObject.urlpath + 'ims/fr7.png"></div><div id="b13' + NMC.pid + '" class="blk w100 h100" style="pointer-events:none;background-size:cover;"><div id="b13' + NMC.pid + '" class="blk w100 h100" style="pointer-events:none;opacity:0;background-image:url(' + NomanicObject.urlpath + 'ims/snow1.gif' + ');background-size:cover;"></div></div><div id="b14' + NMC.pid + '" class="blk w100 h100" style="pointer-events:none;background-size:cover;"></div><div id="hold' + NMC.pid + '" class="blk" style="right:0px;height:100%;overflow:hidden;"></div></div></div></div><div id="panelsouth' + NMC.pid + '" class="southpanel">' + ps[3] + '</div><div id="b0' + NMC.pid + '"></div></div>';
        o.innerHTML = inrln;
        NMC.cs = 0;
        NMC.ocl = -99;
        NMC.ctype = 0;
        NMC.setink = function(im) {
            var NMC = NomanicObject.setink(self, im);
            return NMC;
        };
        NMC.setcink = function(im) {
            var NMC = NomanicObject.setcink(self, im);
            return NMC;
        };
        NMC.setgink = function(im) {
            var NMC = NomanicObject.setgink(self, im);
            return NMC;
        };
        NMC.setbackground = function(im) {
            var NMC = NomanicObject.setbackground(self, im);
            return NMC;
        };
        NMC.fillcontent = function(opts) {
            var NMC = NomanicObject.fillcontent(self, opts.data, opts.callback);
            return NMC;
        };
        NMC.openfill = function(opts) {
            var NMC = NomanicObject.openfill(self, opts.data, opts.allowclick, opts.callback);
            return NMC;
        };
        NMC.lookandfeel = function(opts) {
            return NomanicObject.lookandfeel(opts, self);
        };
        NMC.snippetfill = function(opts) {
            if (self.switchanim) {
                NomanicObject.fader(0, 0, NMC.objects.grunge.children[0], 500);
            }
            var url = NomanicObject.urlpath + 'snippets/' + opts.snippet;
            NomanicObject.postAjax(url, opts, function(ln, opts) {
                NomanicObject.fillcontent(self, ln, opts.callback, opts.allowclick, false, opts.snippet);
            });
        };
        NMC.switchto = function(x) {
            var NMC = NomanicObject.switchto(self, x);
            return NMC;
        }
        NMC.setbcolor = function(x) {
            var NMC = NomanicObject.setbcolor(x, self);
            return NMC;
        }
        NMC.settcolor = function(x) {
            var NMC = NomanicObject.settcolor(x, self);
            return NMC;
        }
        NMC.getref = function() {
            return self.ref;
        };
        NMC.selx = NMC.layout.select ? NMC.layout.select : 0;
        NMC.layout.showscroll = 1;
        NMC.layout.titlebar = NMC.layout.titlebar ? NMC.layout.titlebar : {};
        if (NMC.layout.fullscreen) {
            NMC.layout.titleover = 1;
            NMC.layout.showmenu = 0;
            NMC.layout.showtitle = 0;
        }
        NMC.showtitle = function(n) {
            var NMC = NomanicObject.objs[self.id];
            if (NMC.layout.type == 'empty') {
                return;
            }
            if (NMC.layout.type == 'lightbox') {
                return;
            }
            NMC.objects.head.children[1].innerHTML = (n ? NMC.title : '');
        }
        NMC.scalex = NMC.plot.scalex;
        NMC.scaley = NMC.plot.scaley;
        NMC.plot.scalex = 0;
        NMC.plot.scaley = 0;
        NMC.layout.background = NMC.layout.background ? NMC.layout.background : {};
        NMC.layout.chart = NMC.layout.chart ? NMC.layout.chart : {};
        NMC.layout.pencil = NMC.layout.pencil ? NMC.layout.pencil : {};
        NMC.layout.showframeborder = NMC.layout.background.border;
        NMC.layout.showchartborder = NMC.layout.chart.border;
        if ((!NMC.layout.pencil.ink) && (NMC.layout.background.color)) {
            NMC.layout.pencil.ink = NomanicObject.getCon(NMC.layout.background.color);
        }
        NMC.legend.colors = [];
        NMC.legend.labels = [];
        for (f = 0; f < NMC.lpattern.length; f++) {
            if (NMC.lpattern[f]) {
                NMC = NomanicObject.makepattern(NMC, NMC.lpattern[f], f);
            }
        }
        return NMC;
    },
    update: function(ref, data, lines) {
        var NMC;
        if (NMC = NomanicObject.getNMC(ref)) {
            NMC.update(NMC, data, lines);
        }
    },
    resizeTimer: false,
    setink: function(NMC, cl) {
        NMC.layout.pencil.ink = cl;
        NMC.layout.pencil.nink = NMC.layout.pencil.darken ? NomanicObject.lighten(NMC.layout.pencil.ink, NMC.layout.pencil.darken) : NMC.layout.pencil.ink;
        NMC = NMC.rsr(NMC);
        NomanicObject.objs[NMC.id] = NMC;
    },
    setcink: function(NMC, cl) {
        NMC.layout.chart.ink = cl;
        NMC.layout.chart.nink = NMC.layout.chart.darken ? NomanicObject.lighten(NMC.layout.chart.ink, NMC.layout.chart.darken) : NMC.layout.chart.ink;
        NMC = NMC.rsr(NMC);
        NomanicObject.objs[NMC.id] = NMC;
    },
    setgink: function(NMC, cl) {
        NMC.layout.chart.gridcolor = cl;
        NMC = NMC.rsr(NMC);
        NomanicObject.objs[NMC.id] = NMC;
    },
    //createbefore chart from options
    createafter: function(NMC) {
        NMC = NomanicObject.loadcaption(NMC, 0);
        NMC = NomanicObject.loadbuttons(NMC);
        var f, self = NMC;
        NomanicObject.addResizeEvent(function() {
            self.rsr(self);
            requestTimeout(function() {
                self.rsr(self);
            }, 500);
        });
        NMC = NMC.rsr(NMC);
        if (NMC.plot.intro == 3) {
            NMC.objects.axisx.style.display = 'none';
            NMC.objects.axisy.style.display = 'none';
            NMC.objects.grid.style.display = 'none';
        }
        setTimeout(function() {
            var NMC = NomanicObject.objs[self.id];
            if (NMC.plot.intro) {
                NMC = NMC.owner.preintro(NMC);
            } else {
                NMC.plot.scalex = NMC.scalex;
                NMC.plot.scaley = NMC.scaley;
                NMC.objects.axisx.style.display = (NMC.layout.showaxis) ? 'block' : 'none';
                NMC.objects.axisy.style.display = (NMC.layout.showaxis) ? 'block' : 'none';
                NMC.objects.grid.style.display = (NMC.layout.showgrid) ? 'block' : 'none';
            }
            NMC = NMC.rsr(NMC);
            if (NMC.layout.mask) {
                NomanicObject.makemask(NMC, NMC.layout.chart.color ? NMC.layout.chart.color : NMC.layout.background.color, NMC.layout.mask);
            }
            NomanicObject.objs[NMC.id] = NMC;
            NomanicObject.fader(1, 0, NMC.div, 500);
        }, 50);
        NomanicObject.objs[NMC.id] = NMC;
        if (NMC.buttons.length > 0) {
            for (f = 0; f < NMC.buttons.length; f++) {
                NMC.caps[f] = 1;
            }
            NMC = NomanicObject.loadcaption(NMC, 0, NMC.buttons[0].captitle, NMC.buttons[0].capsubtitle);
        }
        var iw = NMC.onready ? NMC.onready(NMC) : 0;
        return NMC;
    },
    finally: function(NMC) {
        if (NMC.snippet) {
            NMC.child = NMC.snippetfill({
                snippet: NMC.snippet,
                allowclick: NMC.contentclick
            });
        } else if (NMC.openfiller) {
            NMC.child = NMC.openfill({
                data: NMC.openfill,
                allowclick: NMC.contentclick
            });
        }
        if (NMC.plot.intro) {
            NMC.objects.axisx.style.display = 'none';
            NMC.objects.axisy.style.display = 'none';
            NMC.objects.grid.style.display = 'none';
            NMC.owner.intro(NMC);
        }
        return NMC;
    }
}

//setup all components for charts
NomanicObject.setup();
