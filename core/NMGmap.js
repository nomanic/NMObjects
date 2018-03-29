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

var NomanicGmap = {
    prop: 0.95,
    ref: 'child',
    setSelect: function(NMC, x) {
        if ((NMC.selx!=-1)&&(NMC.markersim[NMC.selx])) {
            NMC.markers[NMC.selx].setIcon(NMC.markersim[NMC.selx]);
        }
        NMC.selx=x;
        if (NMC.markershg[this.f]) {
            NMC.markers[this.f].setIcon(NMC.markershg[this.f]);
        }
        if (NMC.vis1==1) {
            NMC.directionsDisplay.setMap(null);
            o=NomanicObject.ob('b98' + NMC.pid).children[1];
            if (NMC.layout.showbuttons>3) {
                o.children[3].style.opacity=0;
            }
            NMC.vis1=0;
        }
        NomanicGmap.fitToMarkers(this.NMC,this.f);
        var iw = NMC.onselect ? NMC.onselect(NMC, NMC.selx) : 0;
        NomanicObject.objs[NMC.id] = NMC;
        return NMC;
    },
    dep: function() {
        moment().format();
    },
    setup: function() {
        NomanicGmap.mback=new Image();
        NomanicGmap.mback.src='data:image/png;base64,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';
        NomanicObject.register('NomanicGmap.create', ['gmap']);
        NomanicObject.addscript([['https://maps.googleapis.com/maps/api/js?key='+NomanicKeys.Google_Maps+'&libraries=places', 0]]);
        NomanicObject.addtype(NomanicGmap);
    },
    parsebase: function(options, p, dv) {
        var i, j, r, f, k, c = NomanicObject.splitter(p);
        options.plot.scalarx = 1;
        options.plot.scalary = 1;
        options.plot.scalex = 1;
        options.plot.scaley = 1;
        options.layout.center=[0,0];
        options.layout.zoom = 6;
        for (f = 0; f < c.length; f++) {
            k = c[f].split('|');
            k[1] = k[1] ? k[1] : 1;
            switch (k[0]) {
                case 'showzoom':
                    options.layout.showzoom = 1;
                    break;
                case 'showstreet':
                    options.layout.showstreet = 1;
                    break;
                case 'showbuttons':
                    options.layout.showbuttons = k[1]%5;
                    break;
                case 'select':
                    options.layout.select = parseInt(k[1]);
                    break;
                case 'style':
                    options.layout.style = NomanicObject.stripq(k[1]);
                    break;
                case 'center':
                    options.layout.center = NomanicObject.gary(NomanicObject.stripq(k[1]));
                    break;
                case 'zoom':
                    options.layout.zoom = parseInt(k[1]);
                    break;
                case 'home':
                    options.layout.home = NomanicObject.stripq(k[1]);
                    break;
                case 'lightbox':
                    options.layout.lightbox = NomanicObject.stripq(k[1]);
                    break;
            }
        }
        NomanicGmap.makehome(options.layout.home?options.layout.home:'#3E82F7');
        options = NomanicObject.parsebase(options, p, dv);
        if (options.container.hasAttribute('data')) {
            r = NomanicObject.splitter(options.container.getAttribute('data'), '{', '}');
            for (f = 0; f < r.length; f++) {
                options.plot.data[f] = {};
                c = NomanicObject.splitter(r[f]);
                for (j = 0; j < c.length; j++) {
                    k = c[j].split('|');
                    k[1] = k[1] ? k[1] : 1;
                    switch (k[0]) {
                        case 'image':
                            options.plot.data[f].icon = NomanicObject.stripq(k[1]);
                            break;
                        case 'size':
                            options.plot.data[f].size = parseInt(k[1]);
                            break;
                        case 'anchor':
                            options.plot.data[f].anchor = NomanicObject.gary(NomanicObject.stripq(k[1]));
                            break;
                        case 'address':
                            options.plot.data[f].address = NomanicObject.stripq(k[1]);
                            break;
                        case 'latlng':
                            options.plot.data[f].latlng = NomanicObject.gary(NomanicObject.stripq(k[1]));
                            break;
                        case 'icon':
                            options.plot.data[f].image = NomanicObject.stripq(k[1]);
                            break;
                        case 'colors':
                            k = NomanicObject.stripc(NomanicObject.stripq(k[1]));
                            options.plot.data[f].colors=[];
                            options.plot.data[f].high=[];
                            for (i = 0; i < k.length; i++) {
                                options.plot.data[f].colors[i] = NomanicObject.stripq(k[i]);
                                options.plot.data[f].high[i] = NomanicObject.stripq(k[i]);
                            }
                            break;
                        case 'high':
                            k = NomanicObject.stripc(NomanicObject.stripq(k[1]));
                            for (i = 0; i < k.length; i++) {
                                options.plot.data[f].high[i] = NomanicObject.stripq(k[i]);
                            }
                            break;
                    }
                }
            }
            if (options.datatype == 'inline') {
                options.done = 1;
            }
        }
        return options;
    },
    codeAddress:function(NMC,f,address) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode( { 'address' : address }, function( results, status ) {
            if( status == google.maps.GeocoderStatus.OK ) {
                NMC.setter--;
                NMC.markersp[f]=[results[0].geometry.location.lat(),results[0].geometry.location.lng()];
                if (NMC.setter===0) {
                    NomanicGmap.follow(NMC);
                }
            }
        } );
    },
    getowner: function(NMC) {
        switch (NMC.layout.type) {
            case 'gmap':
                return NomanicGmap;
        }
        return false;
    },
    makehome: function(col) {
        var im=new Image(),ctx, c = document.createElement('canvas');
        c.setAttribute('width', 24);
        c.setAttribute('height', 24);
        ctx = c.getContext('2d');
        ctx.beginPath();
        ctx.fillStyle = '#FFF';
        ctx.arc(12, 12, 12, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = col;
        ctx.arc(12, 12, 10, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
        NomanicGmap.markerhome={anchor:new google.maps.Point(12,12),url:c.toDataURL('image/png')};
    },
    makemarkericon: function(NMC, f, img) {
        var im = new Image(),
            sz = NMC.plot.data[f].size?NMC.plot.data[f].size:48, fr=sz/80,
            ctx, c = document.createElement('canvas');
        im.onload = function() {
            c.setAttribute('width', sz);
            c.setAttribute('height', sz);
            ctx = c.getContext('2d');
            ctx.drawImage(this, 0, 0,sz,sz);
            if (NMC.plot.data[f].anchor) {
                NMC.markersim[f]={anchor:new google.maps.Point(NMC.plot.data[f].anchor[0],NMC.plot.data[f].anchor[1]),url:c.toDataURL('image/png')};
            }
            else {
                NMC.markersim[f]=(c.toDataURL('image/png'));
            }
            NMC.setter--;
            if (NMC.setter===0) {
                NomanicGmap.follow(NMC);
            }
        }
        im.src = NomanicObject.urlpath+'assets/'+(img?img:'blank.png');
    },
    makemarker: function(NMC, f,high, cols, img) {
        var i, im = new Image(),
            sz = NMC.plot.data[f].size?NMC.plot.data[f].size:48, fr=sz/80,
            ctx, c = document.createElement('canvas'),
            ctx2, c2 = document.createElement('canvas'),
            ctx3, c3 = document.createElement('canvas');
        im.onload = function() {
            c.setAttribute('width', sz);
            c.setAttribute('height', sz);
            ctx = c.getContext('2d');
            c2.setAttribute('width', sz);
            c2.setAttribute('height', sz);
            ctx2 = c2.getContext('2d');
            c3.setAttribute('width', sz);
            c3.setAttribute('height', sz);
            ctx3 = c3.getContext('2d');
            ctx.fillStyle = cols[0];
            ctx.arc(40*fr, 35*fr, 25*fr, 0, Math.PI*2);
            ctx.fill();
            ctx2.drawImage(NomanicGmap.mback, 0, 0,sz,sz);
            ctx2.globalCompositeOperation = 'source-in';
            ctx2.fillStyle = cols[1];
            ctx2.fillRect(0, 0, sz, sz);
            ctx3.drawImage(this, 21*fr, 15*fr,40*fr,40*fr);
            ctx3.globalCompositeOperation = 'source-in';
            ctx3.rect(0, 0, sz, sz);
            ctx3.fillStyle = cols[2];
            ctx3.fill();
            var i=new Image();
            i.onload=function() {
                ctx.drawImage(this, 0, 0,sz,sz);
                var i2=new Image();
                i2.onload=function() {
                    ctx.drawImage(this, 0, 0,sz,sz);
                    (high?NMC.markershg:NMC.markersim)[f]=(c.toDataURL('image/png'));
                    NMC.setter--;
                    if (NMC.setter===0) {
                        NomanicGmap.follow(NMC);
                    }
                }
                i2.src=c3.toDataURL('image/png');
            }
            i.src=c2.toDataURL('image/png');
        }
        im.src = NomanicObject.urlpath+'assets/'+(img?img:'blank.png');
    },
    loadMap:function(NMC) {
        if (NMC.layout.style) {            
            NomanicObject.postAjax(NomanicObject.urlpath+'assets/'+NMC.layout.style,[NMC],function(txt,a) {
                NomanicGmap.drawMap(a[0],JSON.parse(txt));
            });
        }
        else {
            NomanicGmap.drawMap(NMC);
        }
    },
    fitToMarkers:function(NMC,x) {
        var bounds = new google.maps.LatLngBounds();
        if (x||(x===0)) {
            var latlng = NMC.markers[x].getPosition();
            bounds.extend(latlng);
        }
        else {
            for( var index in NMC.markers ) {
                var latlng = NMC.markers[index].getPosition();
                bounds.extend(latlng);
            }
        }
        if (NMC.homem&&NMC.vis) {
            var latlng = NMC.homem.getPosition();
            bounds.extend(latlng);
        }
        if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
           var extendPoint1 = new google.maps.LatLng(bounds.getNorthEast().lat() + 0.01, bounds.getNorthEast().lng() + 0.01);
           var extendPoint2 = new google.maps.LatLng(bounds.getNorthEast().lat() - 0.01, bounds.getNorthEast().lng() - 0.01);
           bounds.extend(extendPoint1);
           bounds.extend(extendPoint2);
        }
        NMC.map.fitBounds(bounds);
        if (x||(x===0)) {
            NMC.map.setCenter(NMC.markers[x].getPosition());
        }
    },
    getradius:function(NMC) {
        var bounds = NMC.map.getBounds(),
            center = bounds.getCenter(),
            ne = bounds.getNorthEast(),
            r = 3963.0,
            lat1 = center.lat() / 57.2958, 
            lon1 = center.lng() / 57.2958,
            lat2 = ne.lat() / 57.2958,
            lon2 = ne.lng() / 57.2958;
        return (r * Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)))*0.5;
    },
    drawMap:function(NMC,sty) {
        var f,o,ln='',myLatLng = {lat: NMC.layout.center[0], lng: NMC.layout.center[1]},
           opts={
            zoom: NMC.layout.zoom,
            center: myLatLng,
            panControl:true,
            zoomControl:NMC.layout.showzoom?true:false,
            scrollwheel: false,
            mapTypeControl:false,
            scaleControl:NMC.layout.showzoom?true:false,
            streetViewControl:NMC.layout.showstreet?true:false,
            overviewMapControl:true,
            rotateControl:true
        };
        if (sty) {            
            opts.styles=sty;
        }
        o=NomanicObject.ob('b98' + NMC.pid);
        o.innerHTML = '<div class="blk w100 h100"></div><div class="blk"></div>';
        o.style.pointerEvents='auto';
        NMC.map = new google.maps.Map(o.children[0],opts);

        for (f=0;f<NMC.markersp.length;f++) {
            if (NMC.plot.data[f].colors) {
                NMC.markers.push(new google.maps.Marker({
                  position: {lat: NMC.markersp[f][0], lng: NMC.markersp[f][1]},
                  icon: (f!=NMC.selx?NMC.markersim[f]:NMC.markershg[f]),
                  map: NMC.map
                }));
            }
            else if (NMC.plot.data[f].icon) {
                NMC.markers.push(new google.maps.Marker({
                  position: {lat: NMC.markersp[f][0], lng: NMC.markersp[f][1]},
                  icon: NMC.markersim[f],
                  map: NMC.map
                }));
            }
            else {
                NMC.markers.push(new google.maps.Marker({
                  position: {lat: NMC.markersp[f][0], lng: NMC.markersp[f][1]},
                  map: NMC.map
                }));
            }
            NMC.markers[f].NMC=NMC;
            NMC.markers[f].f=f+1-1;
            NMC.markers[f].addListener('click', function() {
                NomanicGmap.setSelect(this.NMC,this.f);
            });
        }
        NomanicGmap.fitToMarkers(NMC);
        o=NomanicObject.ob('b98' + NMC.pid).children[1];
        if (NMC.layout.showbuttons>0) {
           ln+='<img class="gbut Gooey_object" src="'+NomanicObject.urlpath+'ims/gmapzoom.png" style="float:left;margin-left:6px;margin-top:6px;cursor:pointer;"/>';
        }
        if (NMC.layout.showbuttons>1) {
           ln+='<img class="gbut Gooey_object" src="'+NomanicObject.urlpath+'ims/gmaphome.png" style="float:left;margin-left:6px;margin-top:6px;cursor:pointer;"/>';
        }
        if (NMC.layout.showbuttons>2) {
           ln+='<img class="gbut Gooey_object" src="'+NomanicObject.urlpath+'ims/gmapcar.png" style="float:left;margin-left:3px;margin-top:6px;cursor:pointer;"/>';
        }
        if (NMC.layout.showbuttons>3) {
           ln+='<img class="gbut Gooey_object" src="'+NomanicObject.urlpath+'ims/gmaproute.png" style="opacity:0;float:left;margin-left:3px;margin-top:6px;cursor:pointer;"/>';
        }
        o.innerHTML=ln;
        var b=o.getElementsByClassName('gbut');
        if (NMC.layout.showbuttons>0) {
           b[0].NMC=NMC;
           b[0].addEventListener("click", function(){
                var o,NMC=this.NMC;
                NomanicGmap.fitToMarkers(NMC);
           });
        }
        if (NMC.layout.showbuttons>1) {
           b[1].NMC=NMC;
           b[1].addEventListener("click", function(){
                var o,NMC=this.NMC;
                if (!NMC.homem) {return;}
                NMC.vis=1-NMC.vis;
                NMC.showhome(NMC,NMC.vis);
           });
        }
        if (NMC.layout.showbuttons>2) {
           b[2].NMC=NMC;
           b[2].addEventListener("click", function(){
                var NMC=this.NMC;
                NMC.showroute(NMC.vis1);
           });
        }
        if (NMC.layout.showbuttons>3) {
           b[3].NMC=NMC;
           b[3].addEventListener("click", function(){
                this.NMC.popup();
           });
        }
        var self=NMC;
        if (navigator.geolocation&&(location.protocol == 'https:')) {
            navigator.geolocation.getCurrentPosition(function(p) {NomanicGmap.showhome(self,p)},function(error) {NomanicGmap.showhomeip(error,self)},{maximumAge: 50000, timeout: 20000, enableHighAccuracy: true});
        }
        else {
            NomanicGmap.jsonp('http://ipinfo.io', function(data) {
              NomanicGmap.showhome(self,{coords:{latitude:parseFloat(data.loc.split(',')[0]),longitude:parseFloat(data.loc.split(',')[1])}});
            });
        }
        return NMC;
    },
    jsonp:function(url, callback) {
        var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
        window[callbackName] = function(data) {
            delete window[callbackName];
            document.body.removeChild(script);
            callback(data);
        };
        var script = document.createElement('script');
        script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
        document.body.appendChild(script);
    },
    showhomeip:function(error,NMC) {
      switch (error.code) {
        case error.TIMEOUT:
          console.log("Browser geolocation error !\n\nTimeout.");
          break;
        case error.PERMISSION_DENIED:
          if(error.message.indexOf("Only secure origins are allowed") == 0) {
            NomanicGmap.tryAPIGeolocation(NMC);
          }
          break;
        case error.POSITION_UNAVAILABLE:
          console.log("Browser geolocation error !\n\nPosition unavailable.");
          break;
      }
    },
    tryAPIGeolocation:function(NMC) {
        var self=NMC;
        NomanicObject.postAjax( "https://www.googleapis.com/geolocation/v1/geolocate?key="+NomanicKeys.Google_Maps,[],function(success) {
            NomanicGmap.showhome(self,{coords: {latitude: success.location.lat, longitude: success.location.lng}});
      },1)
    },
    showhome:function(NMC,p) {
        var opts = {
          strokeColor: NMC.layout.home?NMC.layout.home:'#3E82F7',
          strokeOpacity: 0.75,
          strokeWeight: 1,
          fillColor: NMC.layout.home?NMC.layout.home:'#3E82F7',
          fillOpacity: 0.35,
          map: NMC.map,
          center: {lat: p.coords.latitude, lng: p.coords.longitude},
          radius: NomanicGmap.getradius(NMC)*1000           
        };
        NMC.homec = new google.maps.Circle(opts);
        NMC.homem=new google.maps.Marker({
          position: {lat: p.coords.latitude, lng: p.coords.longitude},
          icon: NomanicGmap.markerhome,
          draggable:true,
          map: NMC.map
        });
        google.maps.event.addListener(NMC.homem, 'dragstart', function() {
            NMC.homec.setVisible(false);
            NMC.directionsDisplay.setMap(null);
            var o=NomanicObject.ob('b98' + NMC.pid).children[1];
            if (NMC.layout.showbuttons>3) {
                o.children[3].style.opacity=0;
            }
            NMC.vis1=0;
        });
        google.maps.event.addListener(NMC.homem, 'dragend', function() {
            NMC.homec.setCenter(NMC.homem.getPosition());
            NMC.homec.setVisible(true);
        });
        NMC.homem.setVisible(false);
        NMC.homec.setVisible(false);
        NMC.directionsService = new google.maps.DirectionsService;
        NMC.directionsDisplay = new google.maps.DirectionsRenderer({
            map: NMC.map, suppressMarkers: true, polylineOptions:{strokeColor:(NMC.layout.home?NMC.layout.home:'#3E82F7')}
        });
        NomanicObject.objs[NMC.id]=NMC;
        NomanicObject.processThem();
    },
    displayRoute:function(NMC){
        NMC.directionsDisplay.setMap(NMC.map);
        NMC.directionsService.route({
            origin: NMC.homem.getPosition(),
            destination: NMC.markers[NMC.selx].getPosition(),
            waypoints: [],
            travelMode: google.maps.TravelMode.DRIVING,
            avoidTolls: true
        },function(response, status){
            if (status === google.maps.DirectionsStatus.OK) {
                NMC.directionsDisplay.setDirections(response);
                var i,o=NomanicObject.ob('b98' + NMC.pid).children[1],myroute = NMC.directionsDisplay.getDirections().routes[0];
                if (NMC.layout.showbuttons>3) {
                    o.children[3].style.opacity=1;
                }
                NMC.vis1=1;
                NMC.txtDir = [];
                for (i=0; i<myroute.legs[0].steps.length; i++) {
                  NMC.txtDir.push(myroute.legs[0].steps[i].instructions);
                }
            }
        });
    },
    showroute:function(o,lns) {
        var pc,draggie,j,k,p,ln='',f;
        ln+='<div class="datatable blk w100 h100" style="background:#454545;overflow:hidden;font-family:Cabin;"><div class="scrollercont" style="position:absolute;width:16px;top:1px;right:1px;background:#AAA;"><div class="scroller" style="position:absolute;width:100%;background:url('+NomanicObject.urlpath+'ims/scry_1.gif);cursor:pointer;"><img src="'+NomanicObject.urlpath+'ims/scry_0.gif" class="blk"/><img src="'+NomanicObject.urlpath+'ims/scry_2.gif" class="blk" style="bottom:0px;"/></div></div><div class="scrollerpane" style="position:absolute;width:calc(100% - 18px);height:auto;">';
        for (f=0;f<lns.length;f++) {
            ln+='<div style="float:left;width:100%;height:auto;"><div style="float:left;width:40px;height:auto;"><span style="float:right;margin-top:4px;margin-right:10px;text-align:right;">'+(f+1)+'</span></div>';
            ln+='<div style="float:left;width: calc(100% - 40px);height:auto;"><span style="float:left;margin-top:4px;margin-bottom:4px;text-align:left;">'+lns[f]+'</span></div></div>';
        }
        ln+='</div></div>';
        o.innerHTML=ln;
        j=o.getElementsByClassName('scrollercont')[0];
        j.style.height=(o.offsetHeight-2)+'px';
        k=o.getElementsByClassName('scroller')[0];
        p=o.getElementsByClassName('scrollerpane')[0];
        pc=(j.offsetHeight/p.offsetHeight);
        pc=(pc>1)?1:pc;
        k.style.height=(pc*100)+'%';
        draggie = new Draggabilly(k, {
            containment: true
        });
        draggie.on('dragMove', function(event, pointer, moveVector) {
            var p=this.element.parentNode,pc,
                pane=p.parentNode.children[1];
            pc=this.position.y/(p.offsetHeight-this.element.offsetHeight);
            pane.style.top=-(pc*(pane.offsetHeight-p.offsetHeight))+'px';
        });
    },
    //create
    create: function(NMC) {
        var f,self = NMC;
        NMC.markersim=[];
        NMC.markershg=[];
        NMC.markersp=[];
        NMC.markers=[];
        NMC.pts=0;
        NMC.selx=NMC.layout.select?NMC.layout.select:0;
        NMC.vis1=0;
        NMC.setter=0;
        for (f=0;f<NMC.plot.data.length;f++) {
            if (!NMC.plot.data[f].latlng) {
                NMC.pts++;
                NMC.setter++;
                NomanicGmap.codeAddress(NMC,f,NMC.plot.data[f].address);
            }
            else {
                NMC.markersp[f]=NMC.plot.data[f].latlng;
            }
            if (NMC.plot.data[f].colors) {
                NMC.setter+=2;
                NomanicGmap.makemarker(NMC,f,0,NMC.plot.data[f].colors,NMC.plot.data[f].image);
                NomanicGmap.makemarker(NMC,f,1,NMC.plot.data[f].high,NMC.plot.data[f].image);
            }
            else if (NMC.plot.data[f].icon) {
                NMC.setter++;
                NomanicGmap.makemarkericon(NMC,f,NMC.plot.data[f].icon);
            }
            else {
                NMC.markershg[f]=false;
                NMC.markersim[f]=false;
            }
        }
        if (NMC.plot.data.length===0) {
            NomanicGmap.follow(NMC);
        }
    },
    follow: function(NMC) {
        var self = NMC;
        setTimeout(function() {
            var f,o, NMC = self;
            NMC = NomanicObject.createbefore(NMC);
            NMC.vis=0;
            NMC.rsr = NomanicObject.rsr;
            NMC.loadlegend=function(NMC) {return NMC;}
            NMC.updateaxis=function(NMC) {return NMC;}
            NMC.redraw=function(NMC) {return NMC;}
            NMC.showdata=function(NMC) {return NMC;}
            NMC.addClicks = function(NMC) {return NMC;}
            NMC.setselect = function(x) {
                return NomanicGmap.setSelect(self, x);
            }
            NMC.getselect = function() {
                return self.selx;
            }
            NMC.attach = function(evt, fn) {
                return NomanicObject.attacher(self, evt, fn);
            }
            NMC.fitToMarkers=function() {
                NomanicGmap.fitToMarkers(self);
            }
            NMC.showhome=function(x) {
                var o,NMC=self;
                if (!NMC.homem) {return;}
                NMC.vis=x;
                NMC.homem.setVisible(NMC.vis?true:false);
                NMC.homec.setVisible(NMC.vis?true:false);
                o=NomanicObject.ob('b98' + NMC.pid).children[1];
                if (NMC.vis===0) {
                    NMC.directionsDisplay.setMap(null);
                    NMC.vis1=0;
                    if (NMC.layout.showbuttons>3) {
                        o.children[3].style.opacity=NMC.vis;
                    }
                }
                if (NMC.layout.showbuttons>2) {
                    o.children[2].style.opacity=NMC.vis;
                }
                NMC.fitToMarkers();
                NomanicObject.objs[NMC.id]=NMC;
            }
            NMC.showroute=function(x) {
                var o,NMC=self;
                NMC.vis1=x;
                if (NMC.vis1===0) {
                    NomanicGmap.displayRoute(NMC);
                }
                else {
                    NMC.directionsDisplay.setMap(null);
                    o=NomanicObject.ob('b98' + NMC.pid).children[1];
                    if (NMC.layout.showbuttons>3) {
                        o.children[3].style.opacity=0;
                    }
                    NMC.vis1=0;
                }
                NomanicObject.objs[NMC.id]=NMC;
            }
            NMC.getroute=function() {
                return self.txtDir?self.txtDir:[];
            }
            NMC.popup=function() {
                var w=NomanicObject.ob(self.layout.lightbox),sz = NomanicObject.vsz(),e=[sz[0]/2,window.pageYOffset+(sz[1]/2)];
                NomanicObject.openlightbox(w,e,w.prt,false,function(NMC) {
                    NomanicObject.ob('b98' + NMC.pid).style.pointerEvents='auto';
                    NomanicGmap.showroute(NomanicObject.ob('b98' + NMC.pid),self.txtDir);
                });
            }
            NMC.layout.gtype = 1;
            NMC.layout.subtype = 1;
            NMC.mtype = 1;
            NMC = NomanicObject.loadlayout(NMC);
            if (!NMC.objects.wrapper) {
                return NMC;
            }
            NMC.canvasratio = (NMC.objects.graph.offsetWidth / NMC.objects.graph.offsetHeight);
            NMC.plot.donut = (NMC.plot.donut ? NMC.plot.donut : 0);
            NMC.plot.donuty = (NMC.plot.donuty ? NMC.plot.donuty : 0.8);
            switch (NMC.layout.type) {
                case 'gmap':
                    NMC.mtype = 2;
                    NMC.ctype = 1;
                    NMC.layout.showscroll = 1;
                    break;
            }
            NMC.czoom = 100;
            NMC = NomanicObject.createafter(NMC);
            NMC = NomanicObject.finally(NMC);
            NMC = NomanicGmap.loadMap(NMC);
        }, 50);
        return NMC;
    }
};

//set everything up
NomanicGmap.setup();
