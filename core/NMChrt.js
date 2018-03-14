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

var NomanicGraph = {
    prop: 0.95,
    ref: 'child',
    //draw caps on lines, circles
    drawcaps: function(NMC, extra, cap, pts, r, lnw, fl) {
        NMC.ctx.save();
        var i, x, y, v = NMC.layout.vertical,
            ir = Math.floor(((5 / 766) * NMC.objects.canvas.offsetHeight) * 2),
            cw = lnw ? lnw : ir,
            ir = ir - (cw / 2),
            h4 = cw / 4,
            or = ir + (cw / 2);
        ir = ir > 0 ? ir : 0;
        var ex = ((lnw ? or : (cw * 2)) * 1.1) - (lnw ? or : (cw * 2));
        ex = (ex < 2) ? 2 : ex;
        NMC.ctx.fillStyle = fl ? fl : NMC.legend.ncolors[NMC.cs][r];
        NMC.ctx.beginPath();
        for (i = 0; i < pts.length; i += 2) {
            x = (v ? pts[i + 1] : (pts[i] + extra));
            y = (v ? (pts[i] + extra) : pts[i + 1]);
            if ((i == pts.length - 2) && (!extra)) {
                if (v) {
                    y = NMC.objects.panel.offsetHeight;
                } else {
                    x = NMC.objects.panel.offsetWidth;
                }
            }
            NMC.ctx.moveTo(x, y);
            switch (cap) {
                case 1:
                    NMC.ctx.arc(x, y, lnw ? or : (cw * 2), 0, NomanicObject.Pi2, true);
                    NMC.ctx.arc(x, y, lnw ? ir : cw, 0, NomanicObject.Pi2, false);
                    NMC.ctx.fill();
                    NMC.ctx.closePath();
                    break;
                case 2:
                    NMC.ctx.arc(x, y, lnw ? or : (cw * 2), 0, NomanicObject.Pi2, true);
                    NMC.ctx.moveTo(x = (v ? pts[i + 1] : pts[i]), y = (v ? pts[i] : pts[i + 1]));
                    NMC.ctx.arc(x, y, lnw ? 1.8 * or : (cw * 3.6), 0, NomanicObject.Pi2, true);
                    NMC.ctx.arc(x, y, lnw ? 1.3 * or : (cw * 2.6), 0, NomanicObject.Pi2, false);
                    NMC.ctx.fill();
                    NMC.ctx.closePath();
                    break;
                case 3:
                    NMC.ctx.arc(x, y, lnw ? or : (cw * 2), 0, NomanicObject.Pi2, true);
                    NMC.ctx.fill();
                    NMC.ctx.closePath();
                    break;
                case 4:
                    NMC.ctx.fillStyle = '#FFF';
                    NMC.ctx.arc(x, y, (lnw ? or : (cw * 2)) + ex, 0, NomanicObject.Pi2, true);
                    NMC.ctx.fill();
                    NMC.ctx.closePath();
                    break;
                case 6:
                    NMC.ctx.beginPath();
                    NMC.ctx.fillStyle = fl ? fl : NMC.legend.ncolors[NMC.cs][r];
                    NMC.ctx.arc(x, y, lnw ? or : (cw * 2), 0, NomanicObject.Pi2, true);
                    NMC.ctx.fill();
                    NMC.ctx.closePath();
                    break;
                case 5:
                    NMC.ctx.shadowOffsetX = h4;
                    NMC.ctx.shadowOffsetY = h4;
                    NMC.ctx.shadowBlur = h4 + h4;
                    NMC.ctx.shadowColor = "black";
                    NMC.ctx.fillStyle = '#FFF';
                    NMC.ctx.arc(x, y, (lnw ? or : (cw * 2)) + ex, 0, NomanicObject.Pi2, true);
                    NMC.ctx.fill();
                    NMC.ctx.closePath();
                    break;
                case 7:
                    NMC.ctx.beginPath();
                    NMC.ctx.fillStyle = fl ? fl : NMC.legend.ncolors[NMC.cs][r];
                    NMC.ctx.arc(x, y, lnw ? or : (cw * 2), 0, NomanicObject.Pi2, true);
                    NMC.ctx.fill();
                    NMC.ctx.closePath();
                    break;
            }
        }
        NMC.ctx.restore();
    },
    //look and feel
    lkfeel: function(NMC, opts) {
        var b = (NMC.objects.div.getElementsByClassName('tbar')[0]),
            pl, ch, bck, fr;
        pl = opts.plot ? opts.plot : {};
        ch = opts.chart ? opts.chart : {};
        bck = opts.background ? opts.background : {};
        fr = opts.frame ? opts.frame : {};
        if (pl.color) {
            NMC.plot.color = pl.color;
            NomanicGraph.buildlegend(NMC, NMC.cs, NMC.plot.data, false, 1);
        }
        if (pl.linecolors) {
            NomanicGraph.buildlegend(NMC, NMC.cs, NMC.plot.data, pl.linecolors, 1);
        }
        if (pl.neon || (pl.neon === 0)) {
            NMC.plot.neon = pl.neon;
            if (NMC.plot.neon) {
                NMC.objects.div.style.textShadow = '0 0 30px ' + NMC.layout.pencil.nink;
                NMC.objects.graph.style.textShadow = '0 0 30px ' + (NMC.layout.chart.nink ? NMC.layout.chart.nink : NMC.layout.pencil.nink);
            } else {
                NMC.objects.div.style.textShadow = null;
                NMC.objects.graph.style.textShadow = null;
            }
        }
        if (pl.opacityspread || (pl.opacityspread === 0)) {
            NMC.plot.opacityspread = pl.opacityspread;
        }
        if (ch.image) {
            NMC.objects.graph.style.backgroundImage = NomanicObject.lazyload(NMC.objects.graph, ch.image);
        }
        if (ch.color) {
            NMC.objects.graph.style.backgroundColor = ch.color;
        }
        if (ch.ink) {
            NMC.setcink(ccol);
        }
        if (ch.grid) {
            NMC.setgink(gcol);
        }
        if (ch.border || (ch.border === 0)) {
            NMC.layout.showchartborder = ch.border;
        }
        NMC.rsr(NMC);
        return NMC;
    },
    //draw legend
    drawlegend: function(NMC, dv, neon, dashed, cap, col) {
        dv.style.border = null;
        dv.style.backgroundColor = null;
        NomanicObject.addClass(dv, 'done');
        var l, c, j, ctx, w = dv.offsetWidth,
            alpha;
        dv.innerHTML = '<canvas width="' + w + '" height="' + w + '"></canvas>';
        ctx = dv.children[0].getContext("2d");
        ctx.translate(0.5, 0.5);
        ctx.save();
        ctx.strokeStyle = col;
        ctx.fillStyle = col;
        ctx.lineWidth = w / 8;
        if (neon) {
            if (NMC.plot.opacityspread && NMC.plot.color) {
                c = NomanicObject.hexToRgb(NMC.plot.color);
                alpha = 0.2;
            } else {
                c = NomanicObject.hexToRgb(col);
                alpha = 0.2;
            }
            for (j = 5; j >= 0; j--) {
                if (j === 0) {
                    ctx.strokeStyle = '#fff';
                } else {
                    ctx.strokeStyle = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + alpha + ')';
                }
                ctx.beginPath();
                if (dashed) {
                    ctx.setLineDash([w / 3, w / 3]);
                }
                ctx.lineWidth = (l = (w / 2) * (j / 5)) === 0 ? 1 : l;
                ctx.moveTo(0, w / 2);
                ctx.lineTo(w, w / 2);
                ctx.stroke();
                ctx.closePath();
                if (cap) {
                    ctx.beginPath();
                    ctx.moveTo(w / 2, w / 2);
                    ctx.arc(w / 2, w / 2, w / 4, 0, Math.PI * 2, false);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.fillStyle = NMC.layout.background.color;
                    ctx.moveTo(w / 2, w / 2);
                    ctx.arc(w / 2, w / 2, w / 8, 0, Math.PI * 2, false);
                    ctx.closePath();
                    ctx.stroke();
                }
            }
        } else {
            ctx.beginPath();
            if (dashed) {
                ctx.setLineDash([w / 3, w / 3]);
            }
            ctx.moveTo(0, w / 2);
            ctx.lineTo(w, w / 2);
            ctx.stroke();
            ctx.closePath();
            if (cap) {
                ctx.beginPath();
                ctx.moveTo(w / 2, w / 2);
                ctx.arc(w / 2, w / 2, w / 4, 0, Math.PI * 2, false);
                ctx.closePath();
                ctx.fill();
                ctx.beginPath();
                ctx.fillStyle = NMC.layout.background.color;
                ctx.moveTo(w / 2, w / 2);
                ctx.arc(w / 2, w / 2, w / 8, 0, Math.PI * 2, false);
                ctx.closePath();
                ctx.fill();
            }
        }
        ctx.restore();
    },
    drawmarker: function(NMC) {
        NMC.ctx.save();
        var t = NMC.layout.type == 'line';
        var c0 = NMC.layout.chart.nink ? NMC.layout.chart.nink : NMC.layout.background.nink;
        NMC.ctx.fillStyle = c0;
        NMC.ctx.beginPath();
        if (NMC.plot.neon) {
            NMC.ctx.shadowBlur = 40;
            NMC.ctx.shadowColor = c0;
        }
        if (NMC.layout.vertical) {
            NMC.ctx.moveTo(NMC.objects.canvas.offsetWidth - 3, (NMC.selx * NMC.bw) - (t ? (0.5 * NMC.bw) : 0) + (0.2 * NMC.bw));
            NMC.ctx.lineTo(NMC.objects.canvas.offsetWidth - 3 - (NMC.bw * 0.15), ((NMC.selx + 0.5) * NMC.bw) - (t ? (0.5 * NMC.bw) : 0));
            NMC.ctx.lineTo(NMC.objects.canvas.offsetWidth - 3, ((NMC.selx + 1) * NMC.bw) - (t ? (0.5 * NMC.bw) : 0) - (0.2 * NMC.bw));
        } else {
            NMC.ctx.moveTo((NMC.selx * NMC.bw) - (t ? (0.5 * NMC.bw) : 0) + (0.2 * NMC.bw), 3);
            NMC.ctx.lineTo(((NMC.selx + 0.5) * NMC.bw) - (t ? (0.5 * NMC.bw) : 0), 3 + (NMC.bw * 0.15));
            NMC.ctx.lineTo(((NMC.selx + 1) * NMC.bw) - (t ? (0.5 * NMC.bw) : 0) - (0.2 * NMC.bw), 3);
        }
        NMC.ctx.fill();
        NMC.ctx.closePath();
        NMC.ctx.restore();
    },
    //polar stuff
    NMCdrawPolarLine: function(NMC, NMCdat) {
        if (!NMC.objects) {
            return;
        }
        var ag, ag1, ak, extr = 0,
            iw, m, x0, y0, oy, j, x, y, i, r, f, pnts, pts, ptsa, dat = NMCdat,
            lw = Math.floor((15 / 766) * NMC.objects.graph.offsetHeight),
            h4 = Math.floor(lw / 3);
        var gh = NMC.objects.canvas.offsetHeight,
            gw = NMC.objects.canvas.offsetWidth,
            ghp = gh * NMC.plot.donuty,
            gwp = gw * NMC.plot.donuty,
            h = Math.floor(Math.abs((10 * (ghp / 200)) * (1 - (gwp / ghp)))),
            ph = ghp + h,
            pw = gwp,
            ghr = Math.floor(ghp / 2),
            gwr = Math.floor(gwp / 2),
            cx = Math.floor(gw / 2),
            cy = Math.floor(gh / 2),
            cl4, alpha, xcos, xsin, oz = 0,
            xPos, yPos, ang = 0,
            ang1 = -NomanicObject.PiHalf,
            ang0a = Math.sin(ang * Math.PI),
            ang0b = Math.cos(ang * Math.PI);
        var lr, sq = (gwr < ghr) ? gwr : ghr;
        NMC.cx = cx;
        NMC.cy = cy;
        ak = NMC.plot.data.length;
        NMC.ctx.restore();
        NMC.ctx.save();
        for (r = 0; r < dat.length; r++) {
            if ((NMC.legend.inuse[NMC.cs][ak + r] == 1) && (dat[r].fill)) {
                pnts = [];
                lr = dat[r].series.length;
                for (i = 0; i < lr; i++) {
                    xcos = (ag1 = ((dat[r].series[i] / NMC.absmax) * sq)) * Math.cos(ag = (((((i + 0.5) / lr)) * NomanicObject.Pi2) + ang1));
                    pnts.push(cx - (xsin = ag1 * Math.sin(ag)) * ang0a + xcos * ang0b);
                    pnts.push(cy + xcos * ang0a + xsin * ang0b);
                }
                pts = (dat[r].spline) ? NomanicGraph.getCurvePoints(pnts) : pnts;
                NMC.ctx.beginPath();
                NMC.ctx.moveTo(x0 = pts[0], y0 = pts[1]);
                for (i = 0; i < pts.length; i += 2) {
                    NMC.ctx.lineTo(pts[i], pts[i + 1]);
                }
                NMC.ctx.lineTo(x0, y0);
                if (NMC.plot.opacityspread && NMC.plot.color && (ak === 0)) {
                    var df = 0.8 / dat.length;
                    cl4 = NomanicObject.hexToRgb(NMC.plot.color);
                    alpha = (1 - (df * r));
                } else {
                    cl4 = NomanicObject.hexToRgb(NMC.legend.ncolors[NMC.cs][ak + r]);
                    alpha = 1;
                }
                var fill = NMC.pattern[ak + r] ? NMC.ctx.createPattern(NMC.pattern[ak + r], "repeat") : ('rgba(' + cl4[0] + ',' + cl4[1] + ',' + cl4[2] + ',' + (dat[r].alpha ? dat[r].alpha * alpha : alpha) + ')');
                NMC.ctx.fillStyle = fill;
                NMC.ctx.fill();
                NMC.ctx.closePath();
                if (NMC.plot.hint) {
                    NMC.ctx.beginPath();
                    NMC.ctx.moveTo(x0 = pts[0], y0 = pts[1]);
                    for (i = 0; i < pts.length; i += 2) {
                        NMC.ctx.lineTo(pts[i], pts[i + 1]);
                    }
                    NMC.ctx.lineTo(x0, y0);
                    NMC.ctx.fillStyle = NMC.hintfill;
                    NMC.ctx.fill();
                    NMC.ctx.closePath();
                }
            }
        }
        NMC.ctx.restore();
        NMC.ctx.save();
        NMC.ctx.lineWidth = lw / 2;
        for (r = 0; r < dat.length; r++) {
            if (NMC.legend.inuse[NMC.cs][ak + r] == 1) {
                pnts = [];
                x = 0;
                lr = dat[r].series.length;
                for (i = 0; i < lr; i++) {
                    xcos = (ag1 = ((dat[r].series[i] / NMC.absmax) * sq)) * Math.cos(ag = (((((i + 0.5) / lr)) * NomanicObject.Pi2) + ang1));
                    xsin = xsin = ag1 * Math.sin(ag);
                    pnts.push(cx - xsin * ang0a + xcos * ang0b);
                    pnts.push(cy + xcos * ang0a + xsin * ang0b);
                }
                if (NMC.plot.shadow) {
                    NMC.ctx.shadowOffsetX = h4;
                    NMC.ctx.shadowOffsetY = h4;
                    NMC.ctx.shadowBlur = h4 + h4;
                    NMC.ctx.shadowColor = "black";
                }
                NMC.ctx.strokeStyle = NMC.legend.ncolors[NMC.cs][ak + r];
                var v = 0,
                    extr = 0;
                pnts.push(pnts[0], pnts[1]);
                pts = (dat[r].spline && ((!dat[r].cap) || (dat[r].neon))) ? NomanicGraph.getCurvePoints(pnts) : pnts;
                NMC.ctx.save();
                if (dat[r].dashed) {
                    NMC.ctx.setLineDash([15, 15]);
                } else {
                    NMC.ctx.setLineDash([]);
                }
                var ex = (extr ? NMC.wbw / 2 : 0);
                if (dat[r].neon) {
                    if (NMC.plot.opacityspread && NMC.plot.color && (ak === 0)) {
                        var df = 0.8 / dat.length;
                        col = NomanicObject.hexToRgb(NMC.plot.color);
                        alpha = 0.2 * (1 - (df * r));
                    } else {
                        var col = NomanicObject.hexToRgb(NMC.legend.ncolors[NMC.cs][ak + r]);
                        alpha = 0.2;
                    }
                    for (j = 5; j >= 0; j--) {
                        if (j === 0) {
                            NMC.ctx.strokeStyle = '#fff';
                        } else {
                            NMC.ctx.strokeStyle = 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',' + alpha + ')';
                        }
                        NMC.ctx.lineCap = "round";
                        NMC.ctx.beginPath();
                        NMC.ctx.lineWidth = (j + 1) * 4 - 2;
                        NMC.ctx.moveTo((v ? pts[1] : (pts[0] + ex)), (v ? pts[0] + ex : pts[1]));
                        for (i = 2; i < pts.length - (extr ? 2 : 0); i += 2) {
                            x = (v ? pts[i + 1] : (pts[i] + ex));
                            y = (v ? pts[i] + ex : pts[i + 1]);
                            NMC.ctx.lineTo(x, y);
                        }
                        NMC.ctx.stroke();
                        NMC.ctx.closePath();
                        NomanicGraph.drawcaps(NMC, ex, dat[r].cap, pnts, ak + r, ex);
                        if (dat[r].cap > 3) {
                            NomanicGraph.drawcaps(NMC, ex, dat[r].cap + 2, pnts, ak + r, ex);
                        }
                    }
                } else {
                    NMC.ctx.strokeStyle = NMC.legend.ncolors[NMC.cs][ak + r];
                    if (dat[r].cap) {
                        pts = NomanicGraph.avoid(pts, pnts, Math.floor(((5 / 766) * NMC.objects.canvas.offsetHeight) * 2));
                        var pts2 = [];
                        for (j = 0; j < pts.length; j++) {
                            pts2[j] = [];
                            pts2[j].push([(v ? pts[j][1] : (pts[j][0] + ex)), (v ? pts[j][0] + ex : pts[j][1])]);
                            for (i = 2; i < pts[j].length; i += 2) {
                                x = (v ? pts[j][i + 1] : (pts[j][i] + ex));
                                y = (v ? pts[j][i] + ex : pts[j][i + 1]);
                                pts2[j].push([x, y]);
                            }
                        }
                        for (i = 0; i < pts2.length; i++) {
                            NMC.ctx.beginPath();
                            NMC.ctx.moveTo(pts2[i][0][0], pts2[i][0][1]);
                            for (x = 1; x < pts2[i].length; x++) {
                                NMC.ctx.lineTo(pts2[i][x][0], pts2[i][x][1]);
                            }
                            NMC.ctx.stroke();
                            NMC.ctx.closePath();
                        }
                        NomanicGraph.drawcaps(NMC, ex, dat[r].cap, pnts, ak + r, ex);
                        if (dat[r].cap > 3) {
                            NomanicGraph.drawcaps(NMC, ex, dat[r].cap + 2, pnts, ak + r, ex);
                        }
                    } else {
                        NMC.ctx.beginPath();
                        NMC.ctx.moveTo((v ? pts[1] : (pts[0] + ex)), (v ? pts[0] + ex : pts[1]));
                        for (i = 2; i < pts.length - (extr ? 2 : 0); i += 2) {
                            x = (v ? pts[i + 1] : (pts[i] + ex));
                            y = (v ? pts[i] + ex : pts[i + 1]);
                            NMC.ctx.lineTo(x, y);
                        }
                        NMC.ctx.stroke();
                        NMC.ctx.closePath();
                    }
                }
                NMC.ctx.restore();
                NMC.ctx.save();
                if (NMC.layout.showlegend) {
                    NomanicGraph.drawlegend(NMC, NMC.objects.legend.children[0].children[ak + r].children[1], dat[r].neon ? 1 : 0, dat[r].dashed ? 1 : 0, dat[r].cap ? 1 : 0, NMC.legend.ncolors[NMC.cs][ak + r]);
                }
            }
        }
        NMC.ctx.restore();
        NMC.ctx.save();
        return NMC;
    },
    polargrid: function(NMC, sz, mx, w, fill) {
        if (!NMC.objects) {
            return;
        }
        var gh = NMC.objects.canvas.offsetHeight,
            gw = NMC.objects.canvas.offsetWidth,
            ghp = gh * NMC.plot.donuty,
            gwp = gw * NMC.plot.donuty,
            h = Math.floor(Math.abs((10 * (ghp / 200)) * (1 - (gwp / ghp)))),
            ph = ghp + h,
            pw = gwp,
            ghr = Math.floor(ghp / 2),
            gwr = Math.floor(gwp / 2),
            cx = Math.floor(gw / 2),
            cy = Math.floor(gh / 2);
        var xcos, xsin, oz = 0,
            i, xPos, yPos, x0, y0, ang = 0,
            ang1 = -NomanicObject.PiHalf,
            ang0a = Math.sin(ang * Math.PI),
            ang0b = Math.cos(ang * Math.PI);
        var sq = (gwr < ghr) ? gwr : ghr,
            lr = NMC.plot.data[0] ? NMC.plot.data[0].series.length : NMC.plot.lines[0].series.length;
        NMC.ctx.strokeStyle = fill;
        if (NMC.plot.neon) {
            NMC.ctx.shadowBlur = 40;
            NMC.ctx.shadowColor = fill;
        }
        for (i = 0; i < mx + 1; i += NMC.tick) {
            NMC.ctx.beginPath();
            NMC.ctx.arc(cx, cy, (i / mx) * sq, 0, NomanicObject.Pi2);
            NMC.ctx.stroke();
            NMC.ctx.closePath();
        }
        for (i = 0; i < 1; i += (1 / lr)) {
            NMC.ctx.beginPath();
            NMC.ctx.moveTo(cx, cy);
            NMC.ctx.lineTo(cx - (xsin = sq * Math.sin((i * NomanicObject.Pi2) + ang1)) * ang0a + (xcos = sq * Math.cos((i * NomanicObject.Pi2) + ang1)) * ang0b, cy + xcos * ang0a + xsin * ang0b);
            NMC.ctx.stroke();
            NMC.ctx.closePath();
        }
        if (NMC.plot.marker) {
            NMC.ctx.save();
            i = (NMC.selx + 0.3) / lr;
            var fill, i1 = (NMC.selx + 0.5) / lr,
                i2 = (NMC.selx + 0.7) / lr,
                x4 = cx - (xsin = sq * Math.sin((i * NomanicObject.Pi2) + ang1)) * ang0a + (xcos = sq * Math.cos((i * NomanicObject.Pi2) + ang1)) * ang0b,
                y4 = cy + xcos * ang0a + xsin * ang0b,
                x5 = cx - (xsin = sq * Math.sin((i1 * NomanicObject.Pi2) + ang1)) * ang0a + (xcos = sq * Math.cos((i1 * NomanicObject.Pi2) + ang1)) * ang0b,
                y5 = cy + xcos * ang0a + xsin * ang0b,
                x6 = cx - (xsin = sq * Math.sin((i2 * NomanicObject.Pi2) + ang1)) * ang0a + (xcos = sq * Math.cos((i2 * NomanicObject.Pi2) + ang1)) * ang0b,
                y6 = cy + xcos * ang0a + xsin * ang0b,
                x2 = (1.14 * (x4 - cx)) + cx,
                y2 = (1.14 * (y4 - cy)) + cy,
                x3 = (1.08 * (x5 - cx)) + cx,
                y3 = (1.08 * (y5 - cy)) + cy,
                x7 = (1.14 * (x6 - cx)) + cx,
                y7 = (1.14 * (y6 - cy)) + cy;
            NMC.ctx.beginPath();
            fill = NMC.layout.chart.nink ? NMC.layout.chart.nink : NMC.layout.background.nink;
            NMC.ctx.fillStyle = fill;
            if (NMC.plot.neon) {
                NMC.ctx.shadowBlur = 40;
                NMC.ctx.shadowColor = fill;
            }
            NMC.ctx.moveTo(x2, y2);
            NMC.ctx.lineTo(x3, y3);
            NMC.ctx.lineTo(x7, y7);
            NMC.ctx.lineTo(x2, y2);
            NMC.ctx.fill();
            NMC.ctx.closePath();
            NMC.ctx.restore();
        }
    },
    polarslice: function(NMC, oy, ep, r, r1, r2, fill, half, ln, inner, frc) {
        if (!NMC.objects) {
            return;
        }
        if (NMC.plot.round && (!frc)) {
            var rd = (1 / NMC.plot.round);
            oy = Math.round(oy / rd) * rd;
            ep = Math.round(ep / rd) * rd;
        }
        var f, oyf, epf;
        if (NMC.plot.band && (!frc)) {
            for (f = 0; f < NMC.plot.band.length; f += 2) {
                if (oy >= (NMC.plot.band[f] * 0.999999999)) {
                    oyf = (oyf || (oyf === 0)) ? oyf : (f / 2);
                }
                if (ep <= (NMC.plot.band[f] * 0.999999999)) {
                    epf = (epf || (epf === 0)) ? epf : (f / 2);
                }
            }
            if (oyf == epf) {
                fill = NMC.plot.band[oyf + 1];
                NomanicGraph.bpolarslice(NMC, oy, ep, r, r1, r2, fill, half, ln, inner, frc);
            } else {
                var oye = oy,
                    epe = ep,
                    pf = oyf,
                    vp;
                while (oy < epe) {
                    if (oy >= (NMC.plot.band[pf + 2] * 0.999999999)) {
                        pf += 2;
                    }
                    fill = NMC.plot.band[pf + 1];
                    vp = (NMC.plot.band[(pf = (pf + 2))] * 0.999999999);
                    ep = (vp > epe) ? epe : vp;
                    NomanicGraph.bpolarslice(NMC, oy, ep, r, r1, r2, fill, half, ln, inner, frc);
                    oy = ep;
                }
            }
        } else {
            NomanicGraph.bpolarslice(NMC, oy, ep, r, r1, r2, fill, half, ln, inner, frc);
        }
    },
    bpolarslice: function(NMC, oy, ep, r, r1, r2, fill, half, ln, inner, frc) {
        if (NMC.plot.roundgap && (!frc)) {
            var lp, oye = oy,
                epe = ep,
                gp = (1 / NMC.plot.round);
            for (lp = oye; lp < epe; lp += gp) {
                oy = lp;
                ep = (oy + (gp * NMC.plot.roundgap));
                NomanicGraph.dpolarslice(NMC, oy, ep, r, r1, r2, fill, half, ln, inner);
            }
        } else {
            NomanicGraph.dpolarslice(NMC, oy, ep, r, r1, r2, fill, half, ln, inner);
        }
    },
    dpolarslice: function(NMC, oy, ep, r, r1, r2, fill, half, ln, inner) {
        var r1a = r1,
            r2a = r2,
            oya = oy,
            epa = ep;
        if (half != 1) {
            ep = ep > 1 ? 1 : ep;
            oy = oy < 0 ? 0 : oy;
        }
        if ((NMC.seg || (NMC.seg === 0)) && (NMC.seg != -1) && ((!NMC.egg3) && (!NMC.egg2))) {
            var s = r2 - r1,
                ir = r1,
                or = r2;
            r1 = ir + (NMC.plot.data[NMC.seg].idonut * s);
            r2 = ir + (NMC.plot.data[NMC.seg].odonut * s);
        } else if (NMC.seg == -1) {
            var s = r2 - r1,
                ir = r1,
                or = r2,
                s2 = ep - oy,
                s1 = 0.1 * s2;
            r1 = ir + (0.1 * s);
            r2 = ir + (0.9 * s);
            NMC.s2 = NMC.s2 ? NMC.s2 : s1;
            ep = ep - NMC.s2;
            oy = oy + NMC.s2;
        }
        var sqw, sqh,
            gh = NMC.objects.canvas.offsetHeight,
            gw = NMC.objects.canvas.offsetWidth,
            ghp = gh * NMC.plot.scalary,
            gwp = gw * NMC.plot.scalarx,
            h = Math.floor(Math.abs((10 * (ghp / 200)) * (1 - (gwp / ghp)))),
            ph = ghp + h,
            pw = gwp,
            ghr = Math.floor(ghp / 2),
            gwr = Math.floor(gwp / 2),
            cx = Math.floor(gw / 2),
            cy = Math.floor(gh / 2),
            xcos, xsin, oz = 0,
            o, i, xPos, yPos, x0, y0, ang = 0,
            ang1 = -NomanicObject.PiHalf,
            ang0a = Math.sin(ang * Math.PI),
            ang0b = Math.cos(ang * Math.PI);
        oy = half == 1 ? ((oy * Math.PI) - NomanicObject.PiHalf) : (half == 2 ? ((oy * 0.85 * NomanicObject.Pi2) + NomanicObject.PiHalf) : (oy * NomanicObject.Pi2));
        ep = half == 1 ? ((ep * Math.PI) - NomanicObject.PiHalf) : (half == 2 ? ((ep * 0.85 * NomanicObject.Pi2) + NomanicObject.PiHalf) : (ep * NomanicObject.Pi2));
        var oep = ((ep + oy) / 2),
            oym = oy,
            epm = ep;
        if (half == 1) {
            cy = 0.9 * gh;
            sqw = ((gwr < 0.9 * ghp) ? gwr : (0.9 * ghp));
            sqh = sqw;
        } else if (NMC.plot.egg !== 1) {
            sqw = (gwr < ghr) ? gwr : ghr;
            sqh = sqw;
        } else {
            sqw = ghr;
            sqh = gwr;
        }
        var spx = (xcos = NMC.plot.seperate * Math.cos(oep + ang1)) * ang0b - ((xsin = (NMC.plot.seperate * Math.sin(oep + ang1))) * ang0a),
            spy = xcos * ang0a + xsin * ang0b;
        cx += spx;
        cy += spy;
        NMC.ctx.beginPath();
        var sq2w = sqw * r2,
            pts = [],
            idx = [],
            x1, y1,
            sq2h = sqh * r2,
            sq1w = sqw * r1,
            sq1h = sqh * r1;
        idx.push(0);
        for (i = oy; i < ep; i += 0.01) {
            pts.push(cx - (xsin = (sq2w * Math.sin(i + ang1))) * ang0a + (xcos = sq2h * Math.cos(i + ang1)) * ang0b);
            pts.push((cy + r) + xcos * ang0a + xsin * ang0b);
        }
        idx.push(pts.length - 2);
        idx.push(pts.length);
        for (i = ep; i > oy; i -= 0.01) {
            pts.push(cx - (xsin = (sq1w * Math.sin(i + ang1))) * ang0a + (xcos = sq1h * Math.cos(i + ang1)) * ang0b);
            pts.push((cy + r) + xcos * ang0a + xsin * ang0b);
        }
        idx.push(pts.length - 2);
        NMC.ctx.save();
        NMC.ctx.beginPath();
        NomanicGraph.drawArc(NMC, pts, epa - oya, 0);
        if ((half == 2) && (oya === 0) && ((NMC.seg || (NMC.seg === 0)) && (NMC.seg != -1))) {
            if (NMC.plot.data[NMC.seg].icon) {
                o = NMC.objects.mask.children[1].children[NMC.seg].style;
                o.top = (y0 - ((x0 - x1) * 1.4)) + 'px';
                o.left = x1 + 'px';
                o.width = (x0 - x1) + 'px';
                o.height = (x0 - x1) + 'px';
            }
        }
        if (NMC.plot.neon) {
            NMC.ctx.shadowBlur = 40;
            NMC.ctx.shadowColor = fill;
        }
        NMC.ctx.fillStyle = fill;
        NMC.ctx.fill();
        NMC.ctx.closePath();
        NMC.ctx.fillStyle = '#454545';
        if (NMC.plot.egg) {
            for (i = 0; i < idx.length; i++) {
                NMC.ctx.fillRect(pts[idx[i]], pts[idx[i] + 1], 1, 1);
            }
        }
        if (NMC.seg == -1) {
            NMC.ctx.beginPath();
            NomanicGraph.drawArc(NMC, pts, epa - oya, 0);
            NMC.ctx.fillStyle = 'rgba(255,255,255,0.3)';
            NMC.ctx.fill();
            NMC.ctx.closePath();
        } else if (inner) {
            NMC.ctx.beginPath();
            NomanicGraph.drawArc(NMC, pts, epa - oya, 0);
            NMC.ctx.fillStyle = 'rgba(0,0,0,' + inner + ')';
            NMC.ctx.fill();
            NMC.ctx.closePath();
        }
        if (NMC.plot.outline && ln && (!NMC.noedge)) {
            NMC.ctx.strokeStyle = '#454545';
            NMC.ctx.beginPath();
            NomanicGraph.drawArc(NMC, pts, epa - oya, 0);
            NMC.ctx.stroke();
            NMC.ctx.closePath();
        }
        NMC.ctx.restore();
        if ((NMC.seg == -1) && (NMC.plot.shadow)) {
            NMC.ctx.save();
            NMC.ctx.beginPath();
            NMC.ctx.moveTo(x0 = pts[0], y0 = pts[1]);
            for (i = 0; i < pts.length; i += 2) {
                NMC.ctx.lineTo(pts[i], pts[i + 1]);
            }
            NMC.ctx.lineTo(x0, y0);
            NMC.ctx.clip();
            NMC.ctx.closePath();
            for (r = 0; r < 6; r++) {
                NMC.ctx.strokeStyle = 'rgba(69,69,69,' + shd(r / 6) + ')';
                NMC.ctx.beginPath();
                NomanicGraph.drawArc(NMC, pts, epa - oya, r);
                NMC.ctx.stroke();
                NMC.ctx.closePath();
            }
            NMC.ctx.restore();
        } else if (NMC.plot.shadow) {
            NMC.ctx.save();
            NMC.ctx.beginPath();
            NMC.ctx.moveTo(x0 = pts[0], y0 = pts[1]);
            for (i = 0; i < pts.length; i += 2) {
                NMC.ctx.lineTo(pts[i], pts[i + 1]);
            }
            NMC.ctx.lineTo(x0, y0);
            NMC.ctx.clip();
            NMC.ctx.closePath();
            for (r = 0; r < 6; r++) {
                NMC.ctx.strokeStyle = 'rgba(69,69,69,' + NomanicObject.shd(r / 6) + ')';
                NMC.ctx.beginPath();
                NomanicGraph.drawArc(NMC, pts, epa - oya, r);
                NMC.ctx.stroke();
                NMC.ctx.closePath();
            }
            NMC.ctx.restore();
        }
        if (NMC.plot.hint && (!NMC.egg3)) {
            NMC.ctx.save();
            NMC.ctx.beginPath();
            NomanicGraph.drawArc(NMC, pts, ep - oy, 0);
            NMC.ctx.fillStyle = NMC.hintfill;
            NMC.ctx.fill();
            NMC.ctx.closePath();
            NMC.ctx.restore();
        }
        if (NMC.plot.inset && ((NMC.seg || NMC.seg === 0) && (NMC.seg != -1))) {
            NMC.seg = -1;
            NomanicGraph.dpolarslice(NMC, oya, epa, r, r1a, r2a, fill, half, ln, inner);
        }
    },
    drawArc: function(NMC, pts, closed, r) {
        var i, x0, y0, n;
        if (closed != 1) {
            NMC.ctx.moveTo(x0 = pts[0] + r, y0 = pts[1] + r);
            for (i = 0; i < pts.length; i += 2) {
                NMC.ctx.lineTo(pts[i] + r, pts[i + 1] + r);
            }
            NMC.ctx.lineTo(x0, y0);
        } else {
            NMC.ctx.moveTo(x0 = pts[0] + r, y0 = pts[1] + r);
            for (i = 0; i < pts.length / 2; i += 2) {
                NMC.ctx.lineTo(pts[i] + r, pts[i + 1] + r);
            }
            n = pts.length / 2;
            NMC.ctx.moveTo(x0 = pts[n] + r, y0 = pts[n + 1] + r);
            for (i = n; i < pts.length; i += 2) {
                NMC.ctx.lineTo(pts[i] + r, pts[i + 1] + r);
            }
        }
    },
    //HalfPie chart functions
    NMCdrawHalfPie: function(NMC, frc, brd) {
        var col, col2, j, ep, oy, r, i, data = NMC.plot.data,
            ttl = 0,
            props = [],
            cols = [],
            gh = NMC.objects.canvas.offsetHeight,
            gw = NMC.objects.canvas.offsetWidth,
            ghp = gh * NMC.plot.scalary,
            gwp = gw * NMC.plot.scalarx,
            oy1 = -Math.abs((1 - NMC.plot.scalary) * ghp) / 2,
            ox1 = Math.abs((1 - NMC.plot.scalarx) * gwp) / 2,
            h = Math.floor(Math.abs((10 * (ghp / 200)) * (1 - (gwp / ghp))));
        NMC.gw = NMC.gw ? NMC.gw : -1;
        NMC.gh = NMC.gh ? NMC.gh : -1;
        if ((gh != NMC.gh) || (gw != NMC.gw)) {
            NMC.hintfill = NMC.ctx.createLinearGradient(0, 0, gw, gh);
            NMC.hintfill.addColorStop(0.0, 'rgba(0,0,0,0)');
            NMC.hintfill.addColorStop(1.0, 'rgba(0,0,0,0.4)');
        }
        NMC.ctx.clearRect(0, 0, NMC.objects.panel.offsetWidth, NMC.objects.panel.offsetHeight);
        NomanicGraph.doborder(NMC, ox1, oy1, gw, gh, brd);
        for (j = 0; j < data.length; j++) {
            ttl += (NMC.legend.inuse[NMC.cs][j] == 1) ? data[j].series[0] : 0;
        }
        for (j = 0; j < data.length; j++) {
            NMC.plot.data[j].totals[NMC.selx] = ttl;
        }
        props.push(0);
        for (j = 0; j < data.length; j++) {
            if (NMC.legend.inuse[NMC.cs][j] == 1) {
                props.push(data[j].series[0] / ttl);
                cols.push(j);
            }
        }
        NMC.ctx.restore();
        NMC.ctx.save();
        ttl = 0;
        for (j = 0; j < props.length; j++) {
            props[j] = (j == props.length - 1) ? (Math.round((1 - ttl) * 100) / 100) : (parseInt(props[j] * 100) / 100);
            ttl += props[j];
        }
        oy = 0;
        var t = NMC.plot.shadow,
            mxd = (NMC.plot.donuty - NMC.plot.donut) / (props.length + 2),
            r2 = (NMC.plot.outerring ? NMC.plot.donuty - 0.15 : NMC.plot.donuty);
        for (j = 1; j < props.length; j++) {
            ep = (oy + props[j]);
            oy = (oy < 0) ? 0 : oy;
            ep = (ep > 1) ? 1 : ep;
            if (NMC.pattern[j - 1]) {
                col = NMC.ctx.createPattern(NMC.pattern[j - 1], "repeat");
            } else if (NMC.plot.opacityspread && NMC.plot.color) {
                var df = 0.8 / data.length,
                    cl2 = NomanicObject.hexToRgb(NMC.plot.color),
                    col = 'rgba(' + cl2[0] + ',' + cl2[1] + ',' + cl2[2] + ',' + (1 - (df * (j - 1))) + ')';
            } else {
                col = NMC.legend.ncolors[NMC.cs][cols[j - 1]];
            }
            var r0 = NMC.plot.donut + ((r2 - NMC.plot.donut) * NMC.plot.data[j - 1].idonut),
                r1 = NMC.plot.donut + ((r2 - NMC.plot.donut) * NMC.plot.data[j - 1].odonut),
                mxd2 = (NMC.plot.egg2 || (NMC.plot.egg2 === 0)) ? NMC.plot.egg2 : r0,
                mxd3 = NMC.plot.egg3 ? NMC.plot.egg3 : r1;
            if (mxd3 > 1) {
                var sc = mxd3;
                mxd2 /= sc;
                r0 /= sc;
                r1 /= sc;
                mxd3 /= sc;
            }
            NMC.plot.shadow = 0;
            NMC.egg3 = 1;
            if (NMC.plot.egg2 || (NMC.plot.egg2 === 0)) {
                NMC.seg = j - 1;
                if (NMC.plot.eggcol2) {
                    NomanicGraph.polarslice(NMC, 0, 1, 0, mxd2, r0, NMC.plot.eggcol2, 1, 1, NMC.plot.eggshade2);
                } else if (!NMC.plot.eggcol2) {
                    NomanicGraph.polarslice(NMC, oy, ep, 0, mxd2, r0, col, 1, 1, NMC.plot.eggshade2);
                }
                NMC.seg = false;
            }
            NMC.egg2 = 1;
            NMC.egg3 = false;
            NMC.seg = j - 1;
            NMC.plot.shadow = t;
            NomanicGraph.polarslice(NMC, oy, ep, 0, r0, r1, col, 1, 1);
            NMC.plot.shadow = 0;
            NMC.seg = false;
            NMC.egg3 = 1;
            NMC.egg2 = false;
            if (NMC.plot.egg3) {
                if (NMC.plot.eggcol3) {
                    NomanicGraph.polarslice(NMC, 0, 1, 0, r1, mxd3, NMC.plot.eggcol3, 1, 1, NMC.plot.eggshade3);
                } else if (!NMC.plot.eggcol3) {
                    NomanicGraph.polarslice(NMC, oy, ep, 0, r1, mxd3, col, 1, 1, NMC.plot.eggshade3);
                }
            }
            if (NMC.plot.innerring && (NMC.plot.donut > 0)) {
                NMC.seg = j - 1;
                NomanicGraph.polarslice(NMC, oy, ep, 0, NMC.plot.donut - 0.17, NMC.plot.donut - 0.085, col, 1, 1);
                NMC.seg = false;
            }
            if (NMC.plot.outerring) {
                NMC.seg = j - 1;
                NomanicGraph.polarslice(NMC, oy, ep, 0, NMC.plot.donuty - 0.085, NMC.plot.donuty, col, 1, 1);
                NMC.seg = false;
            }
            NMC.egg3 = false;
            NMC.plot.shadow = t;
            oy = ep;
            NMC.ctx.restore();
            NMC.ctx.save();
        }
        NMC.showdata(NMC);
        return NMC;
    },
    //Pie chart functions
    NMCdrawPie: function(NMC, n, brd) {
        var j, lr = 0,
            data = NMC.plot.data;
        for (j = 0; j < data.length; j++) {
            if (NMC.legend.inuse[NMC.cs][j] == 1) {
                lr++;
            }
        }
        var col, col2, ep, oy, r, i,
            ttl = 0,
            props = [],
            cols = [],
            gh = NMC.objects.canvas.offsetHeight,
            gw = NMC.objects.canvas.offsetWidth,
            ghp = gh * NMC.plot.scalary,
            gwp = gw * NMC.plot.scalarx,
            oy1 = -Math.abs((1 - NMC.plot.scalary) * ghp) / 2,
            ox1 = Math.abs((1 - NMC.plot.scalarx) * gwp) / 2,
            h = Math.floor(Math.abs((10 * (ghp / 200)) * (1 - (gwp / ghp))));
        NMC.gw = NMC.gw ? NMC.gw : -1;
        NMC.gh = NMC.gh ? NMC.gh : -1;
        if ((gh != NMC.gh) || (gw != NMC.gw)) {
            NMC.hintfill = NMC.ctx.createLinearGradient(0, 0, gw, gh);
            NMC.hintfill.addColorStop(0.0, 'rgba(0,0,0,0)');
            NMC.hintfill.addColorStop(1.0, 'rgba(0,0,0,0.4)');
        }
        NMC.ctx.clearRect(0, 0, NMC.objects.panel.offsetWidth, NMC.objects.panel.offsetHeight);
        NomanicGraph.doborder(NMC, ox1, oy1, gw, gh, brd);
        if (!NMC.plot.egg) {
            h = 0;
        }
        for (j = 0; j < data.length; j++) {
            ttl += (NMC.legend.inuse[NMC.cs][j] == 1) ? data[j].series[0] : 0;
        }
        if (!n) {
            for (j = 0; j < data.length; j++) {
                NMC.plot.data[j].totals[NMC.selx] = ttl;
            }
        } else {
            ttl = (ttl > NMC.plot.data[0].totals[NMC.selx]) ? ttl : NMC.plot.data[0].totals[NMC.selx];
        }
        props.push(0);
        for (j = 0; j < data.length; j++) {
            if (NMC.legend.inuse[NMC.cs][j] == 1) {
                props.push(data[j].series[0] / ttl);
                cols.push(j);
            }
        }
        NMC.ctx.restore();
        NMC.ctx.save();
        ttl = 0;
        for (j = 0; j < props.length; j++) {
            props[j] = (j == props.length - 1) ? (n ? (parseInt(props[j] * 100) / 100) : (Math.round((1 - ttl) * 100) / 100)) : (parseInt(props[j] * 100) / 100);
            ttl += props[j];
        }
        var t = NMC.plot.shadow,
            mxd = (NMC.plot.donuty - NMC.plot.donut) / (props.length + 2),
            r2 = (NMC.plot.outerring ? NMC.plot.donuty - 0.15 : NMC.plot.donuty);
        NMC.egg2 = false;
        for (r = h; r > -(NMC.plot.stacked ? (lr * 5) : 1); r--) {
            oy = 0;
            for (j = 1; j < props.length; j++) {
                if (NMC.plot.stacked ? (r > -((lr - (j - 1)) * 5)) : 1) {
                    ep = (oy + props[j]);
                    ep = (ep > 1 ? 1 : ep);
                    var dark = 0;
                    if (NMC.plot.egg) {
                        dark = NMC.plot.stacked ? (r > -((lr - (j - 1)) * 5) + 1) ? 1 : 0 : (r > 0);
                    }
                    if (NMC.pattern[j - 1]) {
                        col = NMC.ctx.createPattern(NMC.pattern[j - 1], "repeat");
                    } else if (NMC.plot.opacityspread && NMC.plot.color) {
                        var df = 0.8 / data.length,
                            cl2 = NomanicObject.hexToRgb(dark ? (NomanicObject.lighten(NMC.plot.color, -0.3)) : NMC.plot.color),
                            col = 'rgba(' + cl2[0] + ',' + cl2[1] + ',' + cl2[2] + ',' + (1 - (df * (j - 1))) + ')';
                    } else {
                        col = dark ? (NomanicObject.lighten(NMC.legend.ncolors[NMC.cs][cols[j - 1]], -0.3)) : NMC.legend.ncolors[NMC.cs][cols[j - 1]];
                    }
                    var r0 = NMC.plot.donut + ((r2 - NMC.plot.donut) * NMC.plot.data[j - 1].idonut),
                        r1 = NMC.plot.donut + ((r2 - NMC.plot.donut) * NMC.plot.data[j - 1].odonut),
                        mxd2 = (NMC.plot.egg2 || (NMC.plot.egg2 === 0)) ? NMC.plot.egg2 : r0,
                        mxd3 = NMC.plot.egg3 ? NMC.plot.egg3 : r1;
                    if (mxd3 > 1) {
                        var sc = mxd3;
                        mxd2 /= sc;
                        r0 /= sc;
                        r1 /= sc;
                        mxd3 /= sc;
                    }
                    NMC.plot.shadow = 0;
                    NMC.egg3 = 1;
                    if (NMC.plot.egg2 || (NMC.plot.egg2 === 0)) {
                        NMC.seg = j - 1;
                        if (NMC.plot.eggcol2) {
                            NomanicGraph.polarslice(NMC, 0, 1, r, mxd2, r0, NMC.plot.eggcol2, 0, 1, NMC.plot.eggshade2);
                        } else if (!NMC.plot.eggcol2) {
                            NomanicGraph.polarslice(NMC, oy, ep, r, mxd2, r0, col, 0, 1, NMC.plot.eggshade2);
                        }
                        NMC.seg = false;
                    }
                    NMC.egg2 = 1;
                    NMC.egg3 = false;
                    NMC.noedge = ((r == h) || (NMC.plot.stacked ? r == -((lr - (j - 1)) * 5) + 1 : (r === 0))) ? 0 : 1;
                    NMC.seg = j - 1;
                    NMC.plot.shadow = t;
                    NomanicGraph.polarslice(NMC, oy, ep, r, r0, r1, col, 0, 1);
                    NMC.plot.shadow = 0;
                    NMC.seg = false;
                    NMC.egg2 = false;
                    NMC.egg3 = 1;
                    if (NMC.plot.egg3) {
                        if (NMC.plot.eggcol3) {
                            NomanicGraph.polarslice(NMC, 0, 1, r, r1, mxd3, NMC.plot.eggcol3, 0, 1, NMC.plot.eggshade3);
                        } else if (!NMC.plot.eggcol3) {
                            NomanicGraph.polarslice(NMC, oy, ep, r, r1, mxd3, col, 0, 1, NMC.plot.eggshade3);
                        }
                    }
                    if (NMC.plot.innerring && (NMC.plot.donut > 0)) {
                        NMC.seg = j - 1;
                        NomanicGraph.polarslice(NMC, oy, ep, r, NMC.plot.donut - 0.17, NMC.plot.donut - 0.085, col, 0, 1);
                        NMC.seg = false;
                    }
                    if (NMC.plot.outerring) {
                        NMC.seg = j - 1;
                        NomanicGraph.polarslice(NMC, oy, ep, r, NMC.plot.donuty - 0.085, NMC.plot.donuty, col, 0, 1);
                        NMC.seg = false;
                    }
                    NMC.plot.shadow = t;
                    NMC.egg3 = false;
                    oy = ep;
                    NMC.ctx.restore();
                    NMC.ctx.save();
                }
            }
        }
        NMC.showdata(NMC);
        return NMC;
    },
    //draw Polar Bar Chart
    NMCdrawPolar: function(NMC) {
        NMC.ctx.save();
        var dat = NMC.plot.data,
            fill,
            lr = dat[0] ? dat[0].series.length : 0,
            x, x1, w, av = [],
            sm = [],
            hp0 = 0,
            hpp0 = 0,
            r, f,
            gh = NMC.objects.graph.offsetHeight,
            gw = NMC.objects.graph.offsetWidth,
            ghp = (gh * NMC.plot.donuty),
            gwp = (gw * NMC.plot.donuty),
            oy1 = -Math.abs((1 - NMC.plot.scalary) * ghp) / 2,
            ox1 = Math.abs((1 - NMC.plot.scalarx) * gwp) / 2,
            v = NMC.layout.vertical,
            ys, sump = 0,
            sumn = 0,
            iw, yp0;
        NMC.gw = NMC.gw ? NMC.gw : -1;
        NMC.gh = NMC.gh ? NMC.gh : -1;
        if ((gh != NMC.gh) || (gw != NMC.gw)) {
            NMC.hintfill = NMC.ctx.createLinearGradient(0, 0, gw, gh);
            NMC.hintfill.addColorStop(0.0, 'rgba(0,0,0,0)');
            NMC.hintfill.addColorStop(1.0, 'rgba(0,0,0,0.4)');
        }
        NMC.ctx.clearRect(0, 0, NMC.objects.panel.offsetWidth, NMC.objects.panel.offsetHeight);
        NomanicGraph.doborder(NMC, ox1, oy1, gw, gh);
        if (NMC.layout.showgrid) {
            NomanicGraph.polargrid(NMC, NMC.tick, NMC.absmax, 1 / lr, NMC.layout.chart.gridcolor);
        }
        w = (1 / lr);
        for (f = 0; f < lr; f++) {
            sumn = 0;
            sump = 0;
            x = f / lr;
            x1 = (f + 1) / lr;
            for (r = 0; r < dat.length; r++) {
                if (NMC.legend.inuse[NMC.cs][r] == 1) {
                    var y = dat[r].series[f],
                        oy = sump / NMC.absmax,
                        ep = (sump + y) / NMC.absmax;
                    sump += y;
                    fill = ((NMC.selx === f) && NMC.plot.highlight) ? dat[r].high : NMC.legend.ncolors[NMC.cs][r];
                    NMC.seg = r;
                    NomanicGraph.polarslice(NMC, x, x1, 0, oy * NMC.plot.donuty, ep * NMC.plot.donuty, fill, false, 1);
                    NMC.seg = false;
                }
            }
            sm.push(sump);
            av.push(sump / 2);
        }
        if (NMC.plot.lines) {
            for (r = 0; r < NMC.plot.lines.length; r++) {
                if (NMC.plot.lines[r].average) {
                    NMC.plot.lines[r].series = av;
                }
                if (NMC.plot.lines[r].sum) {
                    NMC.plot.lines[r].series = sm;
                }
            }
            NMC = NomanicGraph.NMCdrawPolarLine(NMC, NMC.plot.lines);
        }
        return NMC;
    },
    drawRect: function(NMC, cap, x, y, w, h) {
        cap = (NMC.plot.stacked ? 0 : cap);
        switch (cap) {
            case 0:
                NMC.ctx.fillRect(x, y, w, h);
                break;
            case 1:
                NMC.ctx.beginPath();
                NMC.ctx.moveTo(x, y + h);
                NMC.ctx.lineTo(x + (0.5 * w), y);
                NMC.ctx.lineTo(x + w, y + h);
                NMC.ctx.lineTo(x, y + h);
                NMC.ctx.fill();
                NMC.ctx.closePath();
                break;
            case 2:
                var gauss = new NomanicGraph.Gaussian(0, 1);
                gauss.draw(NMC, x, y, w, h);
                break;
        }
        return cap;
    },
    //draw Bar Chart
    NMCdrawBar: function(NMC, frc, brd) {
        NomanicGraph.doscale(NMC, 1);
        NMC.wbw = NMC.bw;
        NMC.ctx.save();
        var av = [],
            sm = [],
            hp0 = 0,
            hpp0 = 0,
            r, f, dat = NMC.plot.data,
            cap,
            lr = dat.length,
            gw = NMC.objects.graph.offsetWidth,
            gh = NMC.objects.graph.offsetHeight,
            oy1 = -Math.abs((1 - NMC.plot.scalary) * gh) / 2,
            ox1 = Math.abs((1 - NMC.plot.scalarx) * gw) / 2,
            v = NMC.layout.vertical,
            ys, sump = 0,
            sumn = 0,
            iw, yp0, alpha;
        NMC.gw = NMC.gw ? NMC.gw : -1;
        NMC.gh = NMC.gh ? NMC.gh : -1;
        if ((gh != NMC.gh) || (gw != NMC.gw)) {
            NMC.hintfill = NMC.ctx.createLinearGradient(0, 0, gw, gh);
            NMC.hintfill.addColorStop(0.0, 'rgba(0,0,0,0)');
            NMC.hintfill.addColorStop(1.0, 'rgba(0,0,0,0.4)');
        }
        NMC.ctx.clearRect(0, 0, NMC.objects.panel.offsetWidth, NMC.objects.panel.offsetHeight);
        if (NMC.layout.showgrid) {
            NomanicGraph.plotgrid(NMC);
        }
        NomanicGraph.plotgrid(NMC);
        if ((!brd) && (NMC.layout.border)) {
            NMC.ctx.beginPath();
            NMC.ctx.linewidth = 1;
            NMC.ctx.strokeStyle = NMC.layout.chart.gridcolor;
            NMC.ctx.rect(0, 0, NMC.objects.panel.offsetWidth - 1, NMC.objects.panel.offsetHeight - 1);
            NMC.ctx.stroke();
            NMC.ctx.closePath();
        }
        NomanicGraph.doborder(NMC, ox1, oy1, gw, gh, brd);
        NMC.bw = (v ? (gh * NMC.plot.scalary) : (gw * NMC.plot.scalarx)) / NMC.barspp;
        NMC.legend.heights = [];
        for (r = 0; r < dat.length; r++) {
            NMC.legend.heights[r] = [];
        }
        ys = 's';
        for (f = 0; f < dat[0].series.length; f++) {
            hp0 = NomanicObject.converth(sumn, (v ? 0 : gh), (v ? gw : 0), NMC.absmin, NMC.absmax);
            hpp0 = NomanicObject.converth(sump, (v ? 0 : gh), (v ? gw : 0), NMC.absmin, NMC.absmax);
            yp0 = NomanicObject.converth(0, (v ? 0 : gh), (v ? gw : 0), NMC.absmin, NMC.absmax);
            sumn = 0;
            sump = 0;
            for (r = 0; r < dat.length; r++) {
                if (NMC.legend.inuse[NMC.cs][r] == 1) {
                    cap = dat[r].cap ? dat[r].cap : 0;
                    if (!NMC.plot.stacked) {
                        sumn = 0;
                        sump = 0;
                        hp0 = NomanicObject.converth(sumn, (v ? 0 : gh), (v ? gw : 0), NMC.absmin, NMC.absmax);
                        hpp0 = NomanicObject.converth(sump, (v ? 0 : gh), (v ? gw : 0), NMC.absmin, NMC.absmax);
                    }
                    var y = dat[r].series[f],
                        oy = y > 0 ? sump : sumn,
                        yp = NomanicObject.converth(y + oy, (v ? 0 : gh), (v ? gw : 0), NMC.absmin, NMC.absmax) + ((y + oy > 0 ? 1 : -1) * ((NMC.plot.seperate ? NMC.plot.seperate : 0))),
                        x0 = NomanicObject.converth((y > 0 ? sump : sumn), (v ? 0 : gh), (v ? gw : 0), NMC.absmin, NMC.absmax),
                        h = x0 - yp,
                        w, x;
                    if (NMC.plot.stacked) {
                        w = NMC.bw - (NMC.plot.seperatex ? NMC.plot.seperatex : 2);
                        x = (NMC.bw * f);
                    } else {
                        w = (NMC.bw / lr) - (NMC.plot.seperatex ? NMC.plot.seperatex : 2);
                        x = NMC.bw * f + (r * (NMC.bw / lr));
                    }
                    var fill = NMC.pattern[r] ? NMC.ctx.createPattern(NMC.pattern[r], 'repeat') : (((NMC.selx === f) && NMC.plot.highlight) ? dat[r].high : NMC.legend.ncolors[NMC.cs][r]);
                    alpha = (dat[r].alpha ? dat[r].alpha : 1);
                    if (alpha != 1) {
                        NMC.ctx.globalAlpha = alpha;
                    }
                    NMC.ctx.fillStyle = fill;
                    NMC.ctx.save();
                    if (NMC.plot.neon || dat[r].neon) {
                        NMC.ctx.shadowBlur = 40;
                        NMC.ctx.shadowColor = fill;
                    }
                    var xbp = (v ? yp : x) + ox1,
                        ybp = NomanicGraph.frm((v ? x : yp), gh, NMC.plot.scalary, oy1),
                        wbp = v ? (h * NMC.plot.scalary) : w,
                        hbp = v ? w : (h * NMC.plot.scalary);
                    cap = NomanicGraph.drawRect(NMC, cap, xbp, ybp, wbp, hbp);
                    NMC.ctx.globalAlpha = 1;
                    NMC.ctx.restore();
                    NMC.legend.heights[r].push([x + (w / 2) + ox1, NomanicGraph.frm(yp, gh, NMC.plot.scalary, oy1), x > 0.5 * gw ? 1 : 0]);
                    if (NMC.plot.hint) {
                        if (!isNaN(x)) {
                            NMC.ctx.fillStyle = NMC.hintfill;
                            NomanicGraph.drawRect(NMC, cap, xbp, ybp, wbp, hbp);
                        }
                    }
                    if (NMC.plot.outline && (cap === 0)) {
                        NMC.ctx.lineWidth = 1;
                        NMC.ctx.strokeStyle = '#454545';
                        NMC.ctx.strokeRect(xbp, ybp, wbp, hbp);
                    }
                    if (NMC.plot.shadow && (ys != 's') && (cap === 0)) {
                        NMC.ctx.fillStyle = 'rgba(45,45,45,0.3)';
                        if (y > 0) {
                            var y0 = (hpp0 < yp) ? yp : (yp + (hpp0 - yp)),
                                h0 = (hpp0 < yp) ? h : (h - (hpp0 - yp));
                            NomanicGraph.drawRect(NMC, cap, (v ? y0 : x) + ox1, NomanicGraph.frm((v ? x : y0), gh, NMC.plot.scalary, oy1), v ? h0 : (0.3 * w), v ? (0.3 * w) : (h0 * NMC.plot.scalary));
                        } else {
                            var hc = NomanicObject.converth(y + sumn, (v ? 0 : gh), (v ? gw : 0), NMC.absmin, NMC.absmax),
                                yc = NomanicObject.converth(sumn, (v ? 0 : gh), (v ? gw : 0), NMC.absmin, NMC.absmax),
                                h0 = (hp0 > hc) ? hc : hp0;
                            NomanicGraph.drawRect(NMC, cap, (v ? yc : x) + ox1, NomanicGraph.frm((v ? x : yc), gh, NMC.plot.scalary, oy1), v ? (h0 - yc) : (0.3 * w), v ? (0.3 * w) : ((h0 - yc) * NMC.plot.scalary));
                        }
                    }
                    NMC.ctx.restore();
                    iw = (y > 0) ? (sump = sump + y) : (sumn = sumn + y);
                    if (!NMC.plot.stacked) {
                        ys = [NomanicObject.converth(sumn, (v ? 0 : gh), (v ? gw : 0), NMC.absmin, NMC.absmax), NomanicObject.converth(sump, (v ? 0 : gh), (v ? gw : 0), NMC.absmin, NMC.absmax)];
                    }
                }
            }
            ys = [NomanicObject.converth(sumn, (v ? 0 : gh), (v ? gw : 0), NMC.absmin, NMC.absmax), NomanicObject.converth(sump, (v ? 0 : gh), (v ? gw : 0), NMC.absmin, NMC.absmax)];
            sm.push(sumn + sump);
            av.push(((sumn + sump) / 2));
        }
        if (NMC.plot.lines) {
            for (r = 0; r < NMC.plot.lines.length; r++) {
                if (NMC.plot.lines[r].average) {
                    NMC.plot.lines[r].series = av;
                }
                if (NMC.plot.lines[r].sum) {
                    NMC.plot.lines[r].series = sm;
                }
            }
            NMC = NomanicGraph.NMCdrawLine(NMC, NMC.plot.lines);
        }
        if (NMC.plot.marker) {
            NomanicGraph.drawmarker(NMC);
        }
        return NMC;
    },
    Gaussian: function(mean, std) {
        this.mean = mean;
        this.std = std;
        this.a = 1 / Math.sqrt(2 * Math.PI);
    },
    sGauss: function() {
        NomanicGraph.Gaussian.prototype = {
            addStd: function(v) {
                this.std += v;
            },
            get: function(x) {
                var f = this.a / this.std,
                    p = -1 / 2,
                    c = (x - this.mean) / this.std;
                p *= (c * c);
                return f * Math.pow(Math.E, p);
            },
            generateValues: function(start, end) {
                var LUT = [],
                    step = (Math.abs(start) + Math.abs(end)) / 100;
                for (var i = start; i < end; i += step) {
                    LUT.push(this.get(i));
                }
                return LUT;
            },
            draw: function(NMC, x1, y, w1, h) {
                var x = x1 + (w1 / 2) - (w1 * 3),
                    w = w1 * 6;
                var points = this.generateValues(-10, 10),
                    len = points.length;
                NMC.ctx.strokeStyle = "#454545";
                NMC.ctx.beginPath();
                var p0 = points[0] / 0.4;
                NMC.ctx.moveTo(x, y + (h - (h * p0)));
                points.forEach(function(p, i) {
                    if (i === 0) {
                        return;
                    }
                    p = p / 0.4;
                    NMC.ctx.lineTo(x + (w * i / len), y + (h - (h * p)));
                    p0 = p;
                });
                NMC.ctx.lineTo(x, y + (h - (h * p0)));
                if (NMC.plot.outline) {
                    NMC.ctx.stroke();
                }
                NMC.ctx.fill();
            }
        };
    },
    //Draw Line functions
    getCurvePoints: function(pts, tension, isClosed, numOfSegments) {
        tension = (typeof tension != 'undefined') ? tension : 0.5;
        isClosed = isClosed ? isClosed : false;
        numOfSegments = numOfSegments ? numOfSegments : 32;
        var _pts = [],
            res = [], // clone array
            t1x, t2x, t1y, t2y, // tension vectors
            c1, c2, c3, c4, // cardinal points
            st, t, i; // steps based on num. of segments
        _pts = pts.slice(0);
        if (isClosed) {
            _pts.unshift(pts[pts.length - 1]);
            _pts.unshift(pts[pts.length - 2]);
            _pts.unshift(pts[pts.length - 1]);
            _pts.unshift(pts[pts.length - 2]);
            _pts.push(pts[0]);
            _pts.push(pts[1]);
        } else {
            _pts.unshift(pts[1]); //copy 1. point and insert at beginning
            _pts.unshift(pts[0]);
            _pts.push(pts[pts.length - 2]); //copy last point and append
            _pts.push(pts[pts.length - 1]);
        }
        for (i = 2; i < (_pts.length - 4); i += 2) {
            for (t = 0; t <= numOfSegments; t++) {
                t1x = (_pts[i + 2] - _pts[i - 2]) * tension;
                t2x = (_pts[i + 4] - _pts[i]) * tension;
                t1y = (_pts[i + 3] - _pts[i - 1]) * tension;
                t2y = (_pts[i + 5] - _pts[i + 1]) * tension;
                st = t / numOfSegments;
                c1 = 2 * Math.pow(st, 3) - 3 * Math.pow(st, 2) + 1;
                c2 = -(2 * Math.pow(st, 3)) + 3 * Math.pow(st, 2);
                c3 = Math.pow(st, 3) - 2 * Math.pow(st, 2) + st;
                c4 = Math.pow(st, 3) - Math.pow(st, 2);
                res.push(c1 * _pts[i] + c2 * _pts[i + 2] + c3 * t1x + c4 * t2x);
                res.push(c1 * _pts[i + 1] + c2 * _pts[i + 3] + c3 * t1y + c4 * t2y);
            }
        }
        return res;
    },
    getdash: function(x1, y1, x2, y2, a) {
        var f, i;
        for (f = 0; f < 32; f++) {
            a.push(x1 + ((i = (f / 32)) * (x2 - x1)));
            a.push(y1 + (i * (y2 - y1)));
        }
        return a;
    },
    NMCdrawLines: function(NMC, frc, brd) {
        NMC = NomanicGraph.NMCdrawLine(NMC, false, brd);
        if (NMC.plot.lines) {
            NMC = NomanicGraph.NMCdrawLine(NMC, NMC.plot.lines, brd);
        }
        if (NMC.plot.marker) {
            NomanicGraph.drawmarker(NMC);
        }
        return NMC;
    },
    frm: function(y, gh, sy, oy1, debug) {
        return -oy1 + ((y / gh) * (gh * sy));
    },
    plotgrid: function(NMC) {
        var gh = NMC.objects.panel.offsetHeight,
            gw = NMC.objects.panel.offsetWidth,
            y, v = NMC.layout.vertical;
        if (NMC.layout.showgrid) {
            NMC.ctx.strokeStyle = NMC.layout.chart.gridcolor;
            if (NMC.layout.chart.griddashed) {
                NMC.ctx.setLineDash([5, 3]);
            } else {
                NMC.ctx.setLineDash([]);
            }
            NMC.ctx.beginPath();
            var yp = Math.floor(NMC.absmin / NMC.tick) * NMC.tick,
                n = 0,
                yt;
            while (yp < NMC.absmax) {
                y = NomanicObject.converth(yp, (v ? 0 : gh), (v ? gw : 0), NMC.absmin, NMC.absmax);
                if (v) {
                    NMC.ctx.moveTo(y, 0);
                    NMC.ctx.lineTo(y, gh);
                } else {
                    NMC.ctx.moveTo(0, y);
                    NMC.ctx.lineTo(gw, y);
                }
                yp += (NMC.tick / NMC.layout.chart.gridtick);
            }
            NMC.ctx.stroke();
            NMC.ctx.closePath();
            NMC.ctx.setLineDash([]);
            if (NMC.layout.chart.gridfill) {
                NMC.ctx.beginPath();
                yp = Math.floor(NMC.absmin / NMC.tick) * NMC.tick;
                NMC.ctx.fillStyle = NMC.layout.chart.gridfill;
                while (yp < NMC.absmax) {
                    y = NomanicObject.converth(yp, (v ? 0 : gh), (v ? gw : 0), NMC.absmin, NMC.absmax);
                    yt = NomanicObject.converth(yp + (NMC.tick / NMC.layout.chart.gridtick), (v ? 0 : gh), (v ? gw : 0), NMC.absmin, NMC.absmax);
                    if (v && (n % 2 === 0)) {
                        NMC.ctx.fillRect(yt, 0, y - yt, gh);
                    } else if (n % 2 === 0) {
                        NMC.ctx.fillRect(0, yt, gw, y - yt);
                    }
                    yp += (NMC.tick / NMC.layout.chart.gridtick);
                    n++;
                }
                NMC.ctx.stroke();
                NMC.ctx.closePath();
            }
            if (NMC.plot.grid) {
                NMC.ctx.beginPath();
                yp = 0;
                NMC.ctx.strokeStyle = NMC.layout.chart.gridcolor;
                if (NMC.layout.chart.griddashed) {
                    NMC.ctx.setLineDash([5, 3]);
                } else {
                    NMC.ctx.setLineDash([]);
                }
                while (yp < (v ? gh : gw)) {
                    if (v) {
                        NMC.ctx.moveTo(0, yp);
                        NMC.ctx.lineTo(gw, yp);
                    } else {
                        NMC.ctx.moveTo(yp, 0);
                        NMC.ctx.lineTo(yp, gh);
                    }
                    yp += ((NMC.wbw === 0 ? 1 : NMC.wbw) * NMC.plot.grid);
                }
                NMC.ctx.stroke();
                NMC.ctx.closePath();
            }
        }
    },
    NMCdrawLine: function(NMC, NMCdat, brd) {
        NMC.wbw = NMC.bw;
        var extr = 0,
            ak;
        if (!NMCdat) {
            NMC.ctx.clearRect(0, 0, NMC.objects.panel.offsetWidth, NMC.objects.panel.offsetHeight);
            if ((!brd) && (NMC.layout.border)) {
                NMC.ctx.beginPath();
                NMC.ctx.linewidth = 1;
                NMC.ctx.strokeStyle = NMC.layout.chart.gridcolor;
                NMC.ctx.rect(0, 0, NMC.objects.panel.offsetWidth - 1, NMC.objects.panel.offsetHeight - 1);
                NMC.ctx.stroke();
                NMC.ctx.closePath();
            }
            NomanicGraph.doscale(NMC, 1);
            NomanicGraph.doborder(NMC);
            NMC.legend.heights = [];
            ak = 0;
            NomanicGraph.plotgrid(NMC);
        } else {
            extr = 1;
            ak = NMC.plot.data.length;
        }
        var lr, col, alpha, cl4, pts2,
            iw,
            gh = NMC.objects.graph.offsetHeight,
            gw = NMC.objects.graph.offsetWidth,
            oy1 = -Math.abs((1 - NMC.plot.scalary) * gh) / 2,
            ox1 = Math.abs((1 - NMC.plot.scalarx) * gw) / 2,
            m, x0, y0, oy, j, x, y, i, v = NMC.layout.vertical,
            r, f, pnts, pts, ptsa, dat = NMCdat ? NMCdat : NMC.plot.data,
            lw = Math.floor((15 / 766) * NMC.objects.graph.offsetHeight),
            h4 = Math.floor(lw / 2);
        NMC.gw = NMC.gw ? NMC.gw : -1;
        NMC.gh = NMC.gh ? NMC.gh : -1;
        if ((gh != NMC.gh) || (gw != NMC.gw)) {
            NMC.hintfill = NMC.ctx.createLinearGradient(0, 0, gw, gh);
            NMC.hintfill.addColorStop(0.0, 'rgba(0,0,0,0)');
            NMC.hintfill.addColorStop(1.0, 'rgba(0,0,0,0.4)');
        }
        NMC.wbw = (NMC.layout.vertical ? (gh * NMC.plot.scalary) : (gw * NMC.plot.scalarx)) / NMC.barspp;
        NMC.ctx.save();
        NMC.ctx.lineWidth = 1;
        for (r = 0; r < dat.length; r++) {
            if ((NMC.legend.inuse[NMC.cs][ak + r] == 1) && (dat[r].fill)) {
                pnts = [];
                x = (((lr = dat[r].series.length) - 1) * NMC.wbw) + (extr ? NMC.wbw / 2 : 0);
                if (!NMCdat) {
                    for (i = lr - 1; i > -1; i--) {
                        pnts.push(Math.round(x));
                        oy = 0;
                        if ((r > 0) && NMC.plot.stacked && (!NMCdat)) {
                            for (j = 0; j < r; j++) {
                                oy += (NMC.legend.inuse[NMC.cs][j] == 1) ? dat[j].series[i] : 0;
                            }
                        }
                        y = NomanicObject.converth(((NMC.plot.stacked && (!NMCdat)) ? oy : 0), (v ? 0 : gh), (v ? gw : 0), NMC.absmin, NMC.absmax);
                        pnts.push(y);
                        x -= extr ? (NMC.wbw / 2) : NMC.wbw;
                    }
                } else {
                    pnts.push(x);
                    y = NomanicObject.converth(0, (v ? 0 : gh), (v ? gw : 0), NMC.absmin, NMC.absmax);
                    pnts.push(y);
                    pnts.push((extr ? (NMC.wbw / 2) : 0));
                    pnts.push(y);
                }
                pts2 = (dat[r].spline) ? NomanicGraph.getCurvePoints(pnts) : pnts;
                pnts = [];
                x = (extr ? NMC.wbw / 2 : 0);
                for (i = 0; i < dat[r].series.length; i++) {
                    pnts.push(Math.round(x));
                    oy = 0;
                    if ((r > 0) && (NMC.plot.stacked && (!NMCdat))) {
                        for (j = 0; j < r; j++) {
                            oy += (NMC.legend.inuse[NMC.cs][j] == 1) ? dat[j].series[i] : 0;
                        }
                    }
                    y = NomanicObject.converth(dat[r].series[i] + oy, (v ? 0 : gh), (v ? gw : 0), NMC.absmin, NMC.absmax);
                    pnts.push(y);
                    x += (NMC.wbw + ((gw - x < (NMC.wbw / 2)) ? (extr ? gw % (NMC.wbw / 2) : 0) : 0));
                }
                pts = (dat[r].spline) ? NomanicGraph.getCurvePoints(pnts) : pnts;
                NMC.ctx.save();
                NMC.ctx.beginPath();
                NMC.ctx.moveTo(x0 = (v ? pts2[1] : pts2[0]) + ox1, y0 = NomanicGraph.frm((v ? pts2[0] : pts2[1]), gh, NMC.plot.scalary, oy1));
                for (i = 0; i < pts2.length; i += 2) {
                    NMC.ctx.lineTo((v ? pts2[i + 1] : pts2[i]) + ox1, NomanicGraph.frm((v ? pts2[i] : pts2[i + 1]), gh, NMC.plot.scalary, oy1));
                }
                NMC.ctx.lineTo((v ? pts[1] : pts[0]) + ox1, NomanicGraph.frm((v ? pts[0] : pts[1]), gh, NMC.plot.scalary, oy1));
                for (i = 0; i < pts.length; i += 2) {
                    NMC.ctx.lineTo((v ? pts[i + 1] : pts[i]) + ox1, NomanicGraph.frm((v ? pts[i] : pts[i + 1]), gh, NMC.plot.scalary, oy1));
                }
                NMC.ctx.lineTo(x0, y0);
                if (NMC.pattern[r]) {
                    fill = NMC.ctx.createPattern(NMC.pattern[r], 'repeat');
                } else if (NMC.plot.opacityspread && NMC.plot.color && (ak === 0)) {
                    var df = 0.8 / dat.length;
                    cl4 = NomanicObject.hexToRgb(NMC.plot.color);
                    fill = ('rgba(' + cl4[0] + ',' + cl4[1] + ',' + cl4[2] + ',' + (dat[r].alpha ? dat[r].alpha * alpha : alpha) + ')');
                } else {
                    fill = NMC.legend.ncolors[NMC.cs][ak + r];
                }
                fill = dat[r].fill ? ((dat[r].fill == 1 ? fill : dat[r].fill)) : fill;
                alpha = (dat[r].alpha ? dat[r].alpha : 1);
                if (alpha != 1) {
                    NMC.ctx.globalAlpha = alpha;
                }
                NMC.ctx.fillStyle = fill;
                NMC.ctx.fill();
                NMC.ctx.closePath();
                if (alpha != 1) {
                    NMC.ctx.globalAlpha = 1;
                }
                if (NMC.plot.hint) {
                    NMC.ctx.beginPath();
                    NMC.ctx.moveTo(x0 = (v ? pts2[1] : pts2[0]) + ox1, y0 = NomanicGraph.frm((v ? pts2[0] : pts2[1]), gh, NMC.plot.scalary, oy1));
                    for (i = 0; i < pts2.length; i += 2) {
                        NMC.ctx.lineTo((v ? pts2[i + 1] : pts2[i]) + ox1, NomanicGraph.frm((v ? pts2[i] : pts2[i + 1]), gh, NMC.plot.scalary, oy1));
                    }
                    NMC.ctx.lineTo((v ? pts[1] : pts[0]) + ox1, NomanicGraph.frm((v ? pts[0] : pts[1]), gh, NMC.plot.scalary, oy1));
                    for (i = 0; i < pts.length; i += 2) {
                        NMC.ctx.lineTo((v ? pts[i + 1] : pts[i]) + ox1, NomanicGraph.frm((v ? pts[i] : pts[i + 1]), gh, NMC.plot.scalary, oy1));
                    }
                    NMC.ctx.lineTo(x0, y0);
                    NMC.ctx.fillStyle = NMC.hintfill;
                    NMC.ctx.fill();
                    NMC.ctx.closePath();
                }
                NMC.ctx.restore();
                NMC.ctx.save();
            }
            if (NMC.legend.inuse[NMC.cs][ak + r] == 1) {
                pnts = [];
                NMC.ctx.restore();
                NMC.ctx.save();
                x = 0;
                NMC.legend.heights[ak + r] = [];
                for (i = 0; i < dat[r].series.length; i++) {
                    pnts.push(x);
                    oy = 0;
                    if ((r > 0) && (NMC.plot.stacked && (!NMCdat))) {
                        for (j = 0; j < r; j++) {
                            oy += (NMC.legend.inuse[NMC.cs][j] == 1) ? dat[j].series[i] : 0;
                        }
                    }
                    y = NomanicObject.converth(dat[r].series[i] + oy, (v ? 0 : gh), (v ? gw : 0), NMC.absmin, NMC.absmax);
                    NMC.legend.heights[ak + r].push([x, y, x > 0.5 * gw ? 1 : 0]);
                    pnts.push(y);
                    x += NMC.wbw + ((gw - x < NMC.wbw) ? gw % NMC.wbw : 0);
                }
                NMC.ctx.lineWidth = lw / 2;
                if (NMC.plot.shadow) {
                    NMC.ctx.shadowOffsetX = h4;
                    NMC.ctx.shadowOffsetY = h4;
                    NMC.ctx.shadowBlur = h4 + h4;
                    NMC.ctx.shadowColor = "black";
                }
                pts = dat[r].spline ? NomanicGraph.getCurvePoints(pnts) : pnts;
                NMC.ctx.save();
                if (dat[r].dashed) {
                    NMC.ctx.setLineDash([15, 15]);
                } else {
                    NMC.ctx.setLineDash([]);
                }
                if (dat[r].line) {
                    fill = dat[r].line;
                } else if (NMC.pattern[r]) {
                    fill = NMC.ctx.createPattern(NMC.pattern[r], 'repeat');
                } else if (NMC.plot.opacityspread && NMC.plot.color && (ak === 0)) {
                    var df = 0.8 / dat.length;
                    cl4 = NomanicObject.hexToRgb(NMC.plot.color);
                    fill = ('rgba(' + cl4[0] + ',' + cl4[1] + ',' + cl4[2] + ',' + (dat[r].alpha ? dat[r].alpha * alpha : alpha) + ')');
                } else {
                    fill = NMC.legend.ncolors[NMC.cs][ak + r];
                }
                if (dat[r].neon) {
                    if (NMC.plot.opacityspread && NMC.plot.color && (ak === 0)) {
                        var df = 0.8 / dat.length;
                        col = NomanicObject.hexToRgb(NMC.plot.color);
                        alpha = (1 - (df * r)) * 0.2;
                    } else {
                        col = NomanicObject.hexToRgb(NMC.legend.ncolors[NMC.cs][ak + r]);
                        alpha = 0.2;
                    }
                    NMC.ctx.lineCap = "round";
                    if (dat[r].cap) {
                        pts = NomanicGraph.avoid(pts, pnts, Math.floor(((5 / 766) * gh) * 2), dat[r].spline);
                        var cx, cy, pts2 = [];
                        for (j = 0; j < pts.length; j++) {
                            pts2[j] = [];
                            pts2[j].push([(v ? pts[j][1] : pts[j][0]) + (extr ? NMC.wbw / 2 : 0), (v ? pts[j][0] : pts[j][1])]);
                            for (i = 2; i < pts[j].length; i += 2) {
                                x = (v ? pts[j][i + 1] : pts[j][i]) + (extr ? NMC.wbw / 2 : 0);
                                y = (v ? pts[j][i] : pts[j][i + 1]);
                                pts2[j].push([x, y]);
                            }
                        }
                        for (j = 5; j >= 0; j--) {
                            var fill = (j === 0) ? '#fff' : 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',0.2)';
                            NMC.ctx.strokeStyle = fill;
                            for (i = 0; i < pts2.length; i++) {
                                NMC.ctx.beginPath();
                                NMC.ctx.lineWidth = (j + 1) * 3 - 2;
                                NMC.ctx.moveTo(pts2[i][0][0] + ox1, NomanicGraph.frm(pts2[i][0][1], gh, NMC.plot.scalary, oy1));
                                for (x = 1; x < pts2[i].length; x++) {
                                    if ((cx = pts2[i][x][0]) && (cy = pts2[i][x][1])) {
                                        NMC.ctx.lineTo(cx + ox1, NomanicGraph.frm(cy, gh, NMC.plot.scalary, oy1));
                                    }
                                }
                                NMC.ctx.stroke();
                                NMC.ctx.closePath();
                            }
                            NomanicGraph.drawcaps(NMC, (extr ? NMC.wbw / 2 : 0), dat[r].cap, pnts, ak + r, (j + 1) * 3 - 2, fill);
                            if (dat[r].cap > 3) {
                                NomanicGraph.drawcaps(NMC, (extr ? NMC.wbw / 2 : 0), dat[r].cap + 2, pnts, ak + r, (j + 1) * 3 - 2, fill);
                            }
                        }
                    } else {
                        for (j = 5; j >= 0; j--) {
                            if (j === 0) {
                                NMC.ctx.strokeStyle = '#fff';
                            } else {
                                NMC.ctx.strokeStyle = 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',0.2)';
                            }
                            NMC.ctx.beginPath();
                            NMC.ctx.lineWidth = (j + 1) * 3 - 2;
                            NMC.ctx.moveTo((v ? pts[1] : pts[0]) + (extr ? NMC.bw / 2 : 0) + ox1, NomanicGraph.frm((v ? pts[0] : pts[1]), gh, NMC.plot.scalary, oy1));
                            for (i = 2; i < pts.length; i += 2) {
                                if ((x = (v ? pts[i + 1] : pts[i]) + (extr ? NMC.bw / 2 : 0)) && (y = (v ? pts[i] : pts[i + 1]))) {
                                    NMC.ctx.lineTo(x + ox1, NomanicGraph.frm(y, gh, NMC.plot.scalary, oy1));
                                }
                            }
                            NMC.ctx.stroke();
                            NMC.ctx.closePath();
                        }
                    }
                } else {
                    NMC.ctx.strokeStyle = fill;
                    if (dat[r].cap) {
                        pts = NomanicGraph.avoid(pts, pnts, Math.floor(((5 / 766) * NMC.objects.canvas.offsetHeight) * 2), dat[r].spline);
                        var cx, cy, pts2 = [];
                        for (j = 0; j < pts.length; j++) {
                            pts2[j] = [];
                            pts2[j].push([(v ? pts[j][1] : pts[j][0]) + (extr ? NMC.wbw / 2 : 0), (v ? pts[j][0] : pts[j][1])]);
                            for (i = 2; i < pts[j].length; i += 2) {
                                x = (v ? pts[j][i + 1] : pts[j][i]) + (extr ? NMC.wbw / 2 : 0);
                                y = (v ? pts[j][i] : pts[j][i + 1]);
                                pts2[j].push([x, y]);
                            }
                        }
                        for (i = 0; i < pts2.length; i++) {
                            if (dat[r].outline) {
                                NMC.ctx.beginPath();
                                NMC.ctx.lineWidth = (lw / 2) + 2;
                                NMC.ctx.strokeStyle = dat[r].fill ? (dat[r].fill == 1 ? '#A0A0A0' : dat[r].fill) : '#A0A0A0';
                                NMC.ctx.moveTo(pts2[i][0][0] + ox1, NomanicGraph.frm(pts2[i][0][1], gh, NMC.plot.scalary, oy1));
                                for (x = 1; x < pts2[i].length; x++) {
                                    if ((cx = pts2[i][x][0]) && (cy = pts2[i][x][1])) {
                                        if ((i == pts2.length - 1) && (!extr)) {
                                            if (v) {
                                                cy = NMC.objects.panel.offsetHeight;
                                            } else {
                                                cx = NMC.objects.panel.offsetWidth;
                                            }
                                        }
                                        NMC.ctx.lineTo(cx + ox1, NomanicGraph.frm(cy, gh, NMC.plot.scalary, oy1));
                                    }
                                }
                                NMC.ctx.stroke();
                                NMC.ctx.closePath();
                            }
                            NMC.ctx.beginPath();
                            NMC.ctx.lineWidth = (lw / 2);
                            NMC.ctx.strokeStyle = fill;
                            NMC.ctx.moveTo(pts2[i][0][0] + ox1, NomanicGraph.frm(pts2[i][0][1], gh, NMC.plot.scalary, oy1));
                            for (x = 1; x < pts2[i].length; x++) {
                                if ((cx = pts2[i][x][0]) && (cy = pts2[i][x][1])) {
                                    if ((i == pts2.length - 1) && (!extr)) {
                                        if (v) {
                                            cy = NMC.objects.panel.offsetHeight;
                                        } else {
                                            cx = NMC.objects.panel.offsetWidth;
                                        }
                                    }
                                    NMC.ctx.lineTo(cx + ox1, NomanicGraph.frm(cy, gh, NMC.plot.scalary, oy1));
                                }
                            }
                            NMC.ctx.stroke();
                            NMC.ctx.closePath();
                        }
                        NomanicGraph.drawcaps(NMC, extr, dat[r].cap, pnts, ak + r);
                        if (dat[r].cap > 3) {
                            NomanicGraph.drawcaps(NMC, extr, dat[r].cap + 2, pnts, ak + r);
                        }
                    } else {
                        if (dat[r].outline) {
                            NMC.ctx.beginPath();
                            NMC.ctx.lineWidth = (lw / 2) + 2;
                            NMC.ctx.strokeStyle = dat[r].fill ? (dat[r].fill == 1 ? '#A0A0A0' : dat[r].fill) : '#A0A0A0';
                            NMC.ctx.moveTo((v ? pts[1] : pts[0]) + (extr ? NMC.bw / 2 : 0) + ox1, NomanicGraph.frm((v ? pts[0] : pts[1]), gh, NMC.plot.scalary, oy1));
                            for (i = 2; i < pts.length; i += 2) {
                                if ((x = (v ? pts[i + 1] : pts[i]) + (extr ? NMC.bw / 2 : 0)) && (y = (v ? pts[i] : pts[i + 1]))) {
                                    if ((i == pts.length - 2) && (!extr)) {
                                        if (v) {
                                            y = NMC.objects.panel.offsetHeight;
                                        } else {
                                            x = NMC.objects.panel.offsetWidth;
                                        }
                                    }
                                    NMC.ctx.lineTo(x + ox1, NomanicGraph.frm(y, gh, NMC.plot.scalary, oy1));
                                }
                            }
                            NMC.ctx.stroke();
                            NMC.ctx.closePath();
                        }
                        NMC.ctx.beginPath();
                        NMC.ctx.lineWidth = (lw / 2);
                        NMC.ctx.strokeStyle = fill;
                        NMC.ctx.moveTo((v ? pts[1] : pts[0]) + (extr ? NMC.bw / 2 : 0) + ox1, NomanicGraph.frm((v ? pts[0] : pts[1]), gh, NMC.plot.scalary, oy1));
                        for (i = 2; i < pts.length; i += 2) {
                            if ((x = (v ? pts[i + 1] : pts[i]) + (extr ? NMC.bw / 2 : 0)) && (y = (v ? pts[i] : pts[i + 1]))) {
                                if ((i == pts.length - 2) && (!extr)) {
                                    if (v) {
                                        y = NMC.objects.panel.offsetHeight;
                                    } else {
                                        x = NMC.objects.panel.offsetWidth;
                                    }
                                }
                                NMC.ctx.lineTo(x + ox1, NomanicGraph.frm(y, gh, NMC.plot.scalary, oy1));
                            }
                        }
                        NMC.ctx.stroke();
                        NMC.ctx.closePath();
                    }
                }
                NMC.ctx.restore();
                NMC.ctx.save();
                if (NMC.layout.showlegend) {
                    NomanicGraph.drawlegend(NMC, NMC.objects.legend.children[0].children[ak + r].children[1], dat[r].neon ? 1 : 0, dat[r].dashed ? 1 : 0, dat[r].cap ? 1 : 0, NMC.legend.ncolors[NMC.cs][ak + r]);
                }
                NMC.ctx.restore();
            }
        }
        NMC.ctx.save();
        return NMC;
    },
    doscale: function(NMC, rc) {
        NMC = NomanicObject.objs[NMC.id];
        var b, gw = Math.floor(NMC.objects.grapha.offsetWidth),
            gh = Math.floor(NMC.objects.grapha.offsetHeight),
            sx = NMC.plot.scalex * (NMC.czoom / 100),
            sy = NMC.plot.scaley * (NMC.czoom / 100);
        NMC.oczoom = NMC.oczoom ? NMC.oczoom : -1;
        if (NMC.czoom != NMC.oczoom) {
            (b = NMC.objects.graph.style).height = Math.floor(gh * sy) + 'px';
            b.width = Math.floor(gw * sx) + 'px';
            if (NMC.czoom == 100) {
                b.top = Math.floor((gh * (1 - sy)) / 2) + 'px';
                b.left = Math.floor((gw * (1 - sx)) / 2) + 'px';
            } else {
                b.top = '0px';
                b.left = '0px';
            }
        }
        if (NMC.layout.floatingtags) {
            var ht = (57 / 500) * gw * (sx < sy ? sx : sy),
                wt = ht,
                f, s, o,
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
        if (rc) {
            NomanicGraph.rcnv(NMC, 1);
        }
    },
    doborder: function(NMC) {
        var gh = NMC.objects.graph.offsetHeight,
            gw = NMC.objects.graph.offsetWidth,
            oy1 = (NMC.objects.grapha.offsetHeight - gh) / 2,
            ox1 = (NMC.objects.grapha.offsetWidth - gw) / 2,
            v = NMC.layout.vertical,
            o = v ? NMC.objects.axisx : NMC.objects.axisy,
            tp = NomanicGraph.frm(0, gh, NMC.plot.scaley, oy1);
        if (v) {
            o.style.top = (tp + gh + 5) + 'px';
            o.style.left = (ox1 - o.offsetWidth - 5) + 'px';
            o.style.width = gw + 'px';
        } else {
            o.style.top = (NMC.objects.graph.offsetTop + NMC.objects.grapha.offsetTop) + 'px';
            o.style.left = (ox1) + 'px';
            o.style.height = (NMC.objects.graph.offsetHeight) + 'px';
        }
    },
    Vector: function(x, y) {
        this.x = x || 0;
        this.y = y || 0;
        this.add = function(vector) {
            return new NomanicGraph.Vector(this.x + vector.x, this.y + vector.y);
        };
        this.subtract = function(vector) {
            return new NomanicGraph.Vector(this.x - vector.x, this.y - vector.y);
        };
        this.multiply = function(vector) {
            return new NomanicGraph.Vector(this.x * vector.x, this.y * vector.y);
        };
        this.multiplyScalar = function(scalar) {
            return new NomanicGraph.Vector(this.x * scalar, this.y * scalar);
        };
        this.divide = function(vector) {
            return new NomanicGraph.Vector(this.x / vector.x, this.y / vector.y);
        };
        this.divideScalar = function(scalar) {
            return new NomanicGraph.Vector(this.x / scalar, this.y / scalar);
        };
        this.length = function() {
            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        };
        this.normalize = function() {
            return this.divideScalar(this.length());
        };
    },
    get_points: function(origin, radius, otherLineEndPoint) {
        var v = otherLineEndPoint.subtract(origin),
            lineLength = v.length();
        if (lineLength === 0) {
            return new NomanicGraph.Vector(NaN, NaN);
        }
        v = v.normalize();
        return origin.add(v.multiplyScalar(radius));
    },
    dist: function(origin, otherLineEndPoint, radius) {
        var v = otherLineEndPoint.subtract(origin),
            lineLength = v.length();
        return (Math.abs(lineLength) > radius) ? 1 : 0;
    },
    avoid: function(pts, pnts, cw, spline) {
        var chit, hit, find = 0,
            vpts, pts2 = [],
            f, j = 0,
            k = 0,
            pts;
        if (isNaN(pnts[1])) {
            return [pnts];
        }
        if (!spline) {
            for (f = 0; f < pnts.length - 2; f += 2) {
                pts2[j] = [];
                vpts = NomanicGraph.get_points(new NomanicGraph.Vector(pnts[f], pnts[f + 1]), cw * 2, new NomanicGraph.Vector(pnts[f + 2], pnts[f + 3]));
                pts2[j].push(vpts.x);
                pts2[j].push(vpts.y);
                vpts = NomanicGraph.get_points(new NomanicGraph.Vector(pnts[f + 2], pnts[f + 3]), cw * 2, new NomanicGraph.Vector(pnts[f], pnts[f + 1]));
                pts2[j].push(vpts.x);
                pts2[j].push(vpts.y);
                j++;
            }
        } else {
            chit = 0;
            f = 0;
            j = 0;
            pts2[j] = [];
            for (k = 0; k < pts.length; k += 2) {
                hit = NomanicGraph.dist(new NomanicGraph.Vector(pnts[f], pnts[f + 1]), new NomanicGraph.Vector(pts[k], pts[k + 1]), cw * 2);
                if (hit == 1) {
                    if (chit != hit) {
                        vpts = NomanicGraph.get_points(new NomanicGraph.Vector(pnts[f], pnts[f + 1]), cw * 2, new NomanicGraph.Vector(pts[k], pts[k + 1]));
                        pts2[j].push(vpts.x);
                        pts2[j].push(vpts.y);
                        f += 2;
                    } else {
                        pts2[j].push(pts[k]);
                        pts2[j].push(pts[k + 1]);
                    }
                    find = 1;
                } else if (find == 1) {
                    if (chit != hit) {
                        vpts = NomanicGraph.get_points(new NomanicGraph.Vector(pnts[f], pnts[f + 1]), cw * 2, new NomanicGraph.Vector(pts[k], pts[k + 1]));
                        pts2[j].push(vpts.x);
                        pts2[j].push(vpts.y);
                        j++;
                        pts2[j] = [];
                    }
                }
                chit = hit;
            }
        }
        return pts2;
    },
    //addClicks
    addClicks: function(NMC) {
        var self = NMC;
        NMC = NomanicObject.addClick(NMC, NMC.objects.panel, function(evt, self) {
            var NMC = NomanicObject.objs[self.id];
            var iw, f, rect = NMC.objects.canvas.getBoundingClientRect(),
                x = NMC.layout.vertical ? (evt.pageY - rect.top - window.pageYOffset) : (evt.pageX - rect.left - window.pageXOffset);
            switch (NMC.layout.type) {
                case 'line':
                    NMC.selx = (Math.abs(Math.round(((x + (NMC.wbw)) / NMC.wbw)) - 1));
                    if (NMC.plot.marker || NMC.plot.highlight) {
                        NMC = NMC.redraw(NMC);
                    }
                    NMC = NMC.showdata(NMC);
                    iw = NMC.onselect ? NMC.onselect(NMC, NMC.selx) : 0;
                    NomanicObject.objs[NMC.id] = NMC;
                    break;
                case 'bar':
                    NMC.selx = (Math.abs(Math.floor(x / NMC.wbw)));
                    if (NMC.plot.marker || NMC.plot.highlight) {
                        NMC = NMC.redraw(NMC);
                    }
                    NMC = NMC.showdata(NMC);
                    iw = NMC.onselect ? NMC.onselect(NMC, NMC.selx) : 0;
                    NomanicObject.objs[NMC.id] = NMC;
                    break;
            }
        });
        return NMC;
    },
    setSelect: function(NMC, x) {
        NMC.selx = x;
        if (NMC.plot.marker || NMC.plot.highlight) {
            NMC = NMC.redraw(NMC);
        }
        NMC = NMC.showdata(NMC);
        NomanicObject.objs[NMC.id] = NMC;
        return NMC;
    },
    //addClicksPolar
    addClicksPolar: function(NMC) {
        var self = NMC;
        NMC = NomanicObject.addClick(NMC, NMC.objects.panel, function(evt, self) {
            var NMC = NomanicObject.objs[self.id];
            var pos = {},
                offset = {},
                ref, container = NMC.objects.graph;
            ref = container.offsetParent;
            pos.x = !!evt.touches ? evt.touches[0].pageX : evt.pageX;
            pos.y = !!evt.touches ? evt.touches[0].pageY : evt.pageY;
            offset.left = container.offsetLeft;
            offset.top = container.offsetTop;
            while (ref) {
                offset.left += ref.offsetLeft;
                offset.top += ref.offsetTop;
                ref = ref.offsetParent;
            }
            var f, lr,
                y = (pos.y - offset.top),
                x = (pos.x - offset.left),
                ang = (Math.abs(((2 * Math.atan2(y - (NMC.cy - Math.sqrt(Math.abs(x - NMC.cx) * Math.abs(x - NMC.cx) + Math.abs(y - NMC.cy) * Math.abs(y - NMC.cy))), x - NMC.cx))) / (NomanicObject.Pi2)) * 360);
            ang = ((ang < 0) ? ang + 360 : ang) % 360;
            NMC.selx = Math.floor(ang / (360 / (NMC.plot.data[0] ? NMC.plot.data[0].series.length : (NMC.plot.lines[0].series.length))));
            if (NMC.plot.marker || NMC.plot.highlight) {
                NMC = NMC.redraw(NMC);
            }
            NMC = NMC.showdata(NMC);
            var iw = NMC.onselect ? NMC.onselect(NMC, NMC.selx) : 0;
            NomanicObject.objs[NMC.id] = NMC;
        });
        return NMC;
    },
    //create axis
    updateaxis: function(NMC, frc) {
        var gh = NMC.objects.graph.offsetHeight * NMC.plot.scalary,
            gw = NMC.objects.graph.offsetWidth * NMC.plot.scalarx,
            oy1 = (NMC.objects.graph.offsetHeight - gh) / 2,
            ox1 = (NMC.objects.graph.offsetWidth - gw) / 2,
            iw, k, f, min = 0,
            max = 0,
            dat = NMC.plot.data,
            sump = 0,
            sumn = 0,
            j, maxl = dat[0].series.length - (NMC.layout.type == 'line' ? 1 : 0),
            ft = NMC.plot.fit ? NMC.plot.fit : maxl,
            minbars = (ft == -1) ? maxl : ft,
            bw = ((NMC.layout.vertical ? gh : gw) / minbars),
            prb = (bw / (NMC.layout.vertical ? gh : gw)) * 100;
        NMC.barspp = minbars;
        for (j = 0; j < maxl; j++) {
            sump = 0;
            sumn = 0;
            for (f = 0; f < dat.length; f++) {
                k = dat[f].series[j];
                if (NMC.plot.stacked) {
                    iw = (k > 0) ? (sump = sump + k) : (sumn = sumn + k);
                } else {
                    sumn = (k < sumn) ? k : sumn;
                    sump = (k > sump) ? k : sump;
                }
            }
            min = (min < sumn) ? min : sumn;
            max = (max > sump) ? max : sump;
        }
        min = ((min === 0) ? 0 : min);
        max = (max === 0) ? 0 : max;
        if (NMC.plot.min || (NMC.plot.min === 0)) {
            min = NMC.plot.min;
            max = NMC.plot.max;
        }
        var markersy = [1, 2, 5, 10, 25, 50, 100, 200, 250, 500, 1000, 2000, 2500, 5000, 10000, 20000, 25000, 50000, 100000, 200000, 250000, 500000, 1000000, 2000000, 25000000, 50000000],
            h = gh ? gh : 400,
            gapy = h / (max - min),
            my = parseInt(h / gapy),
            n1 = 0,
            gapy1 = gapy,
            mn,
            mx,
            tick,
            pr;
        while (my > 8) {
            gapy1 = gapy * markersy[n1];
            my = parseInt(h / gapy1);
            n1++;
        }
        tick = markersy[n1];
        mn = parseInt(Math.abs(min) / tick);
        mn = -(((mn * tick) - min) > 0 ? mn + 1 : mn);
        mx = parseInt(max / tick);
        mx = ((mx * tick) - max) < 0 ? mx + 1 : mx;
        var ming = mn * tick * 1.1,
            maxg = mx * tick * 1.1,
            smin = ming % tick,
            smax = maxg % tick;
        smin = ((smin != 0) ? (parseInt(min / tick) * tick) - tick : ming);
        smax = ((smax != 0) ? (parseInt(max / tick) * tick) + tick : maxg);
        var max1 = smax,
            min1 = smin,
            sp = (smax - smin) / tick,
            cnt, ln = '',
            v = NMC.layout.vertical,
            o = v ? NMC.objects.axisx : NMC.objects.axisy,
            ymax = 1.1 * smax,
            ymin = 1.1 * smin;
        ymin = NMC.plot.yorigin ? 0 : ymin;
        min1 = NMC.plot.yorigin ? 0 : min1;
        if (NMC.plot.min || (NMC.plot.min === 0)) {
            ymin = NMC.plot.min;
            ymax = NMC.plot.max;
            min1 = ((ymin != 0) ? (parseInt(ymin / tick) * tick) - tick : ymin);
            max1 = ((ymax != 0) ? (parseInt(ymax / tick) * tick) + tick : ymax);
        }
        if ((NMC.absmin <= ymin) && (NMC.absmax >= ymax) && (!frc)) {
            NomanicGraph.rcnv(NMC);
            return NMC;
        }
        cnt = v ? min1 : max1;
        for (f = 0; f < sp + 1; f++) {
            pr = 100 - (((cnt - ymin) / (ymax - ymin)) * 100);
            if ((pr <= 100) && (pr >= 0)) {
                ln += '<span class="blk ' + (v ? 'xval h100 tc' : 'yval w100 tr') + '" style="' + (v ? '' : 'transform: translateY(-50%);') + (v ? 'left:' : 'top:') + (v ? 100 - pr : pr) + '%;">' + NomanicObject.abbrNum(cnt) + '&nbsp;</span>';
            }
            cnt += (v ? tick : -tick);
        }
        o.innerHTML = ln;
        NMC.canvasratio = ((bw * maxl) / (v ? gw : gh));
        NMC.bw = bw;
        NMC.wbw = NMC.bw;
        NMC.rt0 = NMC.bw / (v ? gw : gh);
        NMC.maxl = maxl;
        NMC.absmin = ymin;
        NMC.absmax = ymax;
        NMC.tick = tick;
        NomanicGraph.rcnv(NMC);
        return NMC;
    },
    rcnv: function(NMC, rc) {
        var wc, cn = NMC.objects.canvas.style,
            pn = NMC.objects.panel,
            gw = NMC.objects.graph.offsetWidth,
            gh = NMC.objects.graph.offsetHeight;
        NMC.wbw = (NMC.layout.vertical ? (gh * NMC.plot.scalary) : (gw * NMC.plot.scalarx)) / NMC.barspp;
        if (NMC.fixg) {
            NMC.height = gh;
            NMC.width = gw;
            cn.width = NMC.width + 'px';
            cn.height = NMC.height + 'px';
            pn.setAttribute('height', gh);
            pn.setAttribute('width', gw);
        } else if (NMC.layout.vertical) {
            wc = NMC.wbw * NMC.maxl;
            wc = wc > gh ? wc : gh;
            cn.height = wc + 'px';
            cn.width = gw + 'px';
            pn.setAttribute('height', wc);
            pn.setAttribute('width', gw);
        } else {
            wc = NMC.wbw * NMC.maxl;
            wc = wc > gw ? wc : gw;
            cn.width = wc + 'px';
            cn.height = gh + 'px';
            pn.setAttribute('width', wc);
            pn.setAttribute('height', gh);
        }
        if (!rc) {
            NomanicGraph.doscale(NMC);
        }
    },
    //create axis
    updateaxisPolar: function(NMC, frc) {
        var ln = '',
            iw, k, f, min = 0,
            max = 0,
            dat = NMC.plot.data,
            sump = 0,
            j, maxl = dat[0] ? dat[0].series.length : NMC.plot.lines[0].series.length,
            ft = maxl,
            minbars = maxl,
            bw = (360 / minbars);
        NMC.barspp = minbars;
        if (NMC.plot.data.length > 0) {
            for (j = 0; j < maxl; j++) {
                sump = 0;
                for (f = 0; f < dat.length; f++) {
                    sump += dat[f].series[j];
                }
                max = (max > sump) ? max : sump;
            }
        }
        if (NMC.plot.lines) {
            for (f = 0; f < NMC.plot.lines.length; f++) {
                if (NMC.plot.lines[f].series) {
                    for (j = 0; j < NMC.plot.lines[f].series.length; j++) {
                        sump = NMC.plot.lines[f].series[j];
                        max = (max > sump) ? max : sump;
                    }
                }
            }
        }
        max = (max === 0) ? 0.2 : max;
        var markersy = [1, 2, 5, 10, 25, 50, 100, 200, 250, 500, 1000, 2000, 2500, 5000, 10000, 20000, 25000, 50000, 100000, 200000, 250000, 500000, 1000000, 2000000, 25000000, 50000000];
        var mx, n1 = 0,
            my = max / markersy[n1],
            tick = markersy[n1];
        while (my > 5) {
            tick = markersy[(n1++)];
            my = max / tick;
        }
        mx = parseInt(max / tick);
        mx = ((mx * tick) - max) < 0 ? mx + 1 : mx;
        var maxg = mx * tick,
            smax = maxg % tick;
        smax = ((smax != 0) ? (parseInt(max / tick) * tick) + tick : maxg);
        var max1 = smax,
            sp = smax / tick,
            cnt, ln = '',
            ymax = smax;
        if ((NMC.absmax >= ymax) && (!frc)) {
            NomanicGraph.rcnv(NMC);
            return NMC;
        }
        NMC.canvasratio = ((bw * maxl) / NMC.objects.graph.offsetHeight);
        NMC.wbw = bw;
        NMC.maxl = maxl;
        NMC.absmax = ymax;
        NMC.tick = tick;
        NomanicGraph.rcnv(NMC);
        return NMC;
    },
    //update chart
    update: function(NMC, data, lines) {
        NMC = NomanicObject.objs[NMC.id];
        if (!NMC) {
            return;
        }
        if (NMC.introrunning) {
            return;
        }
        var f, n = Math.min(data.length, NMC.plot.data.length);
        for (f = 0; f < n; f++) {
            NMC.plot.data[f].series.push(data[f]);
            while (NMC.plot.fixed < NMC.plot.data[f].series.length) {
                NMC.plot.data[f].series.shift();
                if (f === 0) {
                    NMC.time = moment.unix(NMC.plot.timestart);
                    NMC.time.add(NMC.plot.timestep, NMC.plot.timeunit);
                    NMC.plot.timestart = NMC.time.unix();
                }
            }
        }
        if (lines && NMC.plot.lines) {
            n = Math.min(lines.length, NMC.plot.lines.length);
            for (f = 0; f < n; f++) {
                NMC.plot.lines[f].series.push(lines[f]);
                while (NMC.plot.fixed < NMC.plot.lines[f].series.length) {
                    NMC.plot.lines[f].series.shift();
                }
            }
        }
        var i, r, dat = NMC.plot.data,
            ttl = 0;
        for (i = dat[0].series.length - 1; i > -1; i--) {
            ttl = 0;
            for (r = 0; r < dat.length; r++) {
                NMC.plot.data[r].totals = NMC.plot.data[r].totals ? NMC.plot.data[r].totals : [];
                ttl += Math.abs(NMC.plot.data[r].series[i]);
            }
            for (r = 0; r < dat.length; r++) {
                NMC.plot.data[r].totals[i] = NMC.plot.stacked ? ttl : Math.abs(NMC.plot.data[r].series[i]);
            }
        }
        NMC = NMC.updateaxis(NMC);
        NMC = NMC.redraw(NMC);
        NMC.showdata(NMC);
        var iw = NMC.onupdate ? NMC.onupdate(NMC) : 0;
        NomanicObject.objs[NMC.id] = NMC;
    },
    //replace chart
    replaced: function(NMC, data, lines, anim, delay) {
        NMC = NomanicObject.objs[NMC.id];
        delay = (delay ? (delay > 500 ? delay : 750) : 750);
        if (!NMC) {
            return;
        }
        if (NMC.introrunning) {
            return;
        }
        NMC.tween2 = NMC.tween2 ? NMC.tween2 : (new NomanicObject.tweenable());
        if (NMC.run2) {
            NMC.tween2.stop();
        }
        NMC.run2 = 1;
        var clone = JSON.parse(JSON.stringify(NMC.plot));
        var clone2 = JSON.parse(JSON.stringify(NMC.plot));
        if (anim == 2) {
            var self = {};
            self.ar = [NMC, clone, data, Math.min(data.length, NMC.plot.data.length), clone2, lines, anim],
                NomanicObject.fader(1, 0, NMC.objects.grunge.children[0], delay - 500, function() {
                    var ar = self.ar,
                        tw = 1,
                        j, f, n = ar[3];
                    for (f = 0; f < n; f++) {
                        for (j = 0; j < ar[0].plot.data[f].series.length; j++) {
                            ar[0].plot.data[f].series[j] = ar[2][f][j];
                        }
                    }
                    if (ar[4] && ar[5]) {
                        n = Math.min(ar[4].lines.length, ar[5].length);
                        for (f = 0; f < n; f++) {
                            for (j = 0; j < NMC.plot.lines[f].series.length; j++) {
                                ar[0].plot.lines[f].series[j] = ar[5][f][j];
                            }
                        }
                    }
                    var i, r, dat = ar[0].plot.data,
                        ttl = 0,
                        lr = dat[0] ? dat[0].series.length : 0;
                    if (!ar[0].pie) {
                        for (i = lr - 1; i > -1; i--) {
                            ttl = 0;
                            for (r = 0; r < dat.length; r++) {
                                ar[0].plot.data[r].totals = ar[0].plot.data[r].totals ? ar[0].plot.data[r].totals : [];
                                ttl += Math.abs(ar[0].plot.data[r].series[i]);
                            }
                            for (r = 0; r < dat.length; r++) {
                                ar[0].plot.data[r].totals[i] = ar[0].plot.stacked ? ttl : Math.abs(ar[0].plot.data[r].series[i]);
                            }
                        }
                    }
                    ar[0].updateaxis(ar[0]);
                    ar[0] = ar[0].redraw(ar[0]);
                    ar[0].showdata(ar[0]);
                    NomanicObject.objs[ar[0].id] = ar[0];
                    NomanicObject.fader(0, 500, ar[0].objects.grunge.children[0], 500);
                });
        } else {
            NMC.tween2.create({
                duration: delay ? delay : (anim ? (anim == 3 ? 1500 : (anim == 2 ? 1000 : (NMC.pie ? 1000 : 1500))) : 1500),
                easing: NomanicObject.easer.easeInOutQuad,
                target: [NMC, clone, data, Math.min(data.length, NMC.plot.data.length), clone2, lines, anim, NMC.plot.scalarx, NMC.plot.scalary],
                step: function(ar, tw) {
                    var NMC = ar[0],
                        j, ang, y, f, n = ar[3];
                    if (ar[6] == 3) {
                        ang = ((90 + (tw * 360)) / 360) * NomanicObject.Pi2;
                        y = (Math.sin(ang) + 1) / 2;
                        ar[0].plot.scalarx = ar[7] * y;
                        ar[0].plot.scalary = ar[8] * y;
                    }
                    for (f = 0; f < n; f++) {
                        for (j = 0; j < ar[0].plot.data[f].series.length; j++) {
                            if (ar[6] == 3) {
                                if (ar[0].pie) {
                                    ar[0].plot.data[f].series[j] = tw > 0.5 ? ar[2][f][j] : ar[1].data[f].series[j];
                                } else {
                                    ar[0].plot.data[f].series[j] = NomanicObject.easer.interp(ar[1].data[f].series[j], ar[2][f][j], tw);
                                }
                            } else if (ar[0].pie) {
                                if (tw < 0.5) {
                                    ar[0].plot.data[f].series[j] = NomanicObject.easer.interp(ar[1].data[f].series[j], 0, 2 * tw);
                                } else {
                                    ar[0].plot.data[f].series[j] = NomanicObject.easer.interp(0, ar[2][f][j], 2 * tw);
                                }
                            } else {
                                ar[0].plot.data[f].series[j] = NomanicObject.easer.interp(ar[1].data[f].series[j], ar[2][f][j], tw);
                            }
                        }
                    }
                    if (ar[4] && ar[5]) {
                        n = Math.min(ar[4].lines.length, ar[5].length);
                        for (f = 0; f < n; f++) {
                            for (j = 0; j < ar[0].plot.lines[f].series.length; j++) {
                                ar[0].plot.lines[f].series[j] = NomanicObject.easer.interp(ar[4].lines[f].series[j], ar[5][f][j], tw);
                            }
                        }
                    }
                    if (ar[6] == 1) {
                        var i, r, dat = ar[0].plot.data,
                            ttl = 0,
                            lr = dat[0] ? dat[0].series.length : 0;
                        for (i = lr - 1; i > -1; i--) {
                            ttl = 0;
                            for (r = 0; r < dat.length; r++) {
                                NMC.plot.data[r].totals = NMC.plot.data[r].totals ? NMC.plot.data[r].totals : [];
                                ttl += Math.abs(NMC.plot.data[r].series[i]);
                            }
                            for (r = 0; r < dat.length; r++) {
                                NMC.plot.data[r].totals[i] = NMC.plot.stacked ? ttl : Math.abs(NMC.plot.data[r].series[i]);
                            }
                        }
                    }
                    ar[0].updateaxis(ar[0]);
                    ar[0].redraw(ar[0], ar[0].pie ? (ar[6] == 1 ? 1 : 0) : 0, (ar[6] == 3 ? 1 : 0));
                    if ((ar[6] == 3) && (ar[0].mtype == 2)) {
                        ar[0].objects.axisx.style.display = 'none';
                        ar[0].objects.axisy.style.display = 'none';
                        ar[0].objects.grid.style.display = 'none';
                    }
                    ar[0].showdata(ar[0]);
                    NomanicObject.objs[ar[0].id] = ar[0];
                    NMC = ar[0];
                    var iw = NMC.onupdate ? NMC.onupdate(NMC) : 0;
                },
                finish: function(ar, tw) {
                    var NMC = ar[0],
                        j, ang, y, f, n = ar[3];
                    tw = 1;
                    for (f = 0; f < n; f++) {
                        for (j = 0; j < ar[0].plot.data[f].series.length; j++) {
                            if (ar[6] == 3) {
                                ar[0].plot.data[f].series[j] = NomanicObject.easer.interp(ar[1].data[f].series[j], ar[2][f][j], tw);
                            } else if (ar[0].pie) {
                                if (tw < 0.5) {
                                    ar[0].plot.data[f].series[j] = NomanicObject.easer.interp(ar[1].data[f].series[j], 0, 2 * tw);
                                } else {
                                    ar[0].plot.data[f].series[j] = NomanicObject.easer.interp(0, ar[2][f][j], 2 * tw);
                                }
                            } else {
                                ar[0].plot.data[f].series[j] = NomanicObject.easer.interp(ar[1].data[f].series[j], ar[2][f][j], tw);
                            }
                        }
                    }
                    if (ar[4] && ar[5]) {
                        n = Math.min(ar[4].lines.length, ar[5].length);
                        for (f = 0; f < n; f++) {
                            for (j = 0; j < ar[0].plot.lines[f].series.length; j++) {
                                ar[0].plot.lines[f].series[j] = NomanicObject.easer.interp(ar[4].lines[f].series[j], ar[5][f][j], tw);
                            }
                        }
                    }
                    var i, r, dat = ar[0].plot.data,
                        ttl = 0,
                        lr = dat[0] ? dat[0].series.length : 0;
                    for (i = lr - 1; i > -1; i--) {
                        ttl = 0;
                        for (r = 0; r < dat.length; r++) {
                            NMC.plot.data[r].totals = NMC.plot.data[r].totals ? NMC.plot.data[r].totals : [];
                            ttl += Math.abs(NMC.plot.data[r].series[i]);
                        }
                        for (r = 0; r < dat.length; r++) {
                            NMC.plot.data[r].totals[i] = NMC.plot.stacked ? ttl : Math.abs(NMC.plot.data[r].series[i]);
                        }
                    }
                    ar[0].updateaxis(ar[0]);
                    ar[0].redraw(ar[0]);
                    if ((ar[6] == 3) && (ar[0].mtype == 2)) {
                        ar[0].objects.axisx.style.display = 'block';
                        ar[0].objects.axisy.style.display = 'block';
                        ar[0].objects.grid.style.display = 'block';
                    }
                    ar[0].showdata(ar[0]);
                    ar[0].run2 = 0;
                    NomanicObject.objs[ar[0].id] = ar[0];
                },
                autorun: 1
            });
        }
    },
    //intro stuff
    preintro: function(NMC) {
        NMC = NomanicObject.objs[NMC.id];
        if (!NMC) {
            return;
        }
        NMC.introrunning = 1;
        var anim = NMC.plot.intro;
        if (anim == 2) {
            NomanicObject.fader(1, 0, NMC.objects.grunge.children[0], 500);
        } else {
            var ar = [NMC, anim];
            if (ar[1] == 3) {
                ar[0].plot.scalex = 0;
                ar[0].plot.scaley = 0;
            }
            if (ar[1] != 3) {
                ar[0].updateaxis(ar[0]);
            }
            ar[0].redraw(ar[0], false, 1);
            if (ar[1] == 3) {
                ar[0].objects.axisx.style.display = 'none';
                ar[0].objects.axisy.style.display = 'none';
                ar[0].objects.grid.style.display = 'none';
            }
        }
        return NMC;
    },
    intro: function(NMC) {
        NMC = NomanicObject.objs[NMC.id];
        if (!NMC) {
            return;
        }
        NMC.objects.graph.style.color = null;
        NMC.tween2 = NMC.tween2 ? NMC.tween2 : (new NomanicObject.tweenable());
        if (NMC.run2) {
            NMC.tween2.stop();
        }
        NMC.run2 = 1;
        var anim = NMC.plot.intro,
            clone = JSON.parse(JSON.stringify(NMC.plot));
        if (anim == 2) {
            var self = NMC;
            NMC.plot.scalex = NMC.scalex;
            NMC.plot.scaley = NMC.scaley;
            self.objects.axisx.style.display = (self.layout.showaxis) ? 'block' : 'none';
            self.objects.axisy.style.display = (self.layout.showaxis) ? 'block' : 'none';
            self.objects.grid.style.display = (self.layout.showgrid) ? 'block' : 'none';
            NMC.rsr(NMC);
            NomanicObject.fader(0, NMC.idelay ? NMC.idelay : 1500, NMC.objects.grunge.children[0], 500, function() {
                self.introrunning = 0;
                NomanicObject.sortoutslider(self, 1);
                NomanicObject.sortoutzoomslider(self, 1);
                NomanicObject.sortoutzoomslider(self, 1, 1);
                NomanicObject.sortouttrayslider(self, 1);
                self.showdata(self);
            });
        } else {
            NMC.tween2.create({
                duration: NMC.idelay ? NMC.idelay : 1500,
                easing: NomanicObject.easer.easeInOutQuad,
                target: [NMC, anim, clone, NMC.scalex, NMC.scaley],
                step: function(ar, tw) {
                    var NMC = ar[0],
                        j, f, n;
                    if (ar[1] == 3) {
                        ar[0].plot.scalex = ar[3] * tw;
                        ar[0].plot.scaley = ar[4] * tw;
                    }
                    for (f = 0; f < n; f++) {
                        for (j = 0; j < ar[0].plot.data[f].series.length; j++) {
                            if (ar[6] == 3) {
                                if (ar[0].pie) {
                                    ar[0].plot.data[f].series[j] = ar[2].data[f].series[j];
                                } else {
                                    ar[0].plot.data[f].series[j] = NomanicObject.easer.interp(0, ar[2].data[f].series[j], tw);
                                }
                            } else if (ar[0].pie) {
                                if (tw < 0.5) {
                                    ar[0].plot.data[f].series[j] = NomanicObject.easer.interp(ar[2].data[f].series[j], 0, 2 * tw);
                                } else {
                                    ar[0].plot.data[f].series[j] = NomanicObject.easer.interp(0, ar[2].data[f].series[j], 2 * tw);
                                }
                            } else {
                                ar[0].plot.data[f].series[j] = NomanicObject.easer.interp(0, ar[2].data[f].series[j], tw);
                            }
                        }
                    }
                    if ((ar[0].plot.lines.length > 0) && (ar[2].lines.length > 0)) {
                        n = Math.min(ar[0].plot.lines.length, ar[2].lines.length);
                        for (f = 0; f < n; f++) {
                            for (j = 0; j < ar[2].lines[f].series.length; j++) {
                                ar[0].plot.lines[f].series[j] = NomanicObject.easer.interp(0, ar[2].lines[f].series[j], tw);
                            }
                        }
                    }
                    if ((ar[1] == 1) || (ar[0].pie)) {
                        var i, r, dat = ar[0].plot.data,
                            ttl = 0,
                            lr = dat[0] ? dat[0].series.length : 0;
                        for (i = lr - 1; i > -1; i--) {
                            ttl = 0;
                            for (r = 0; r < dat.length; r++) {
                                ar[0].plot.data[r].totals = ar[0].plot.data[r].totals ? ar[0].plot.data[r].totals : [];
                                ttl += Math.abs(NMC.plot.data[r].series[i]);
                            }
                            for (r = 0; r < dat.length; r++) {
                                ar[0].plot.data[r].totals[i] = ar[0].plot.stacked ? ttl : Math.abs(ar[0].plot.data[r].series[i]);
                            }
                        }
                    }
                    ar[0].updateaxis(ar[0], 1);
                    if (ar[1] == 3) {
                        ar[0].objects.axisx.style.display = 'none';
                        ar[0].objects.axisy.style.display = 'none';
                        ar[0].objects.grid.style.display = 'none';
                    }
                    ar[0].redraw(ar[0], false, 1);
                },
                finish: function(ar, tw) {
                    ar[0].plot.scalex = ar[3];
                    ar[0].plot.scaley = ar[4];
                    ar[0].updateaxis(ar[0], 1);
                    if (ar[1] == 3) {
                        ar[0].objects.axisx.style.display = (NMC.layout.showaxis) ? 'block' : 'none';
                        ar[0].objects.axisy.style.display = (NMC.layout.showaxis) ? 'block' : 'none';
                        ar[0].objects.grid.style.display = (NMC.layout.showgrid) ? 'block' : 'none';
                    }
                    NomanicObject.sortoutslider(ar[0], 1);
                    NomanicObject.sortoutzoomslider(ar[0], 1);
                    NomanicObject.sortoutzoomslider(ar[0], 1, 1);
                    NomanicObject.sortouttrayslider(ar[0], 1);
                    ar[0].showdata(ar[0]);
                    ar[0].redraw(ar[0]);
                    ar[0].run2 = 0;
                    NMC.introrunning = 0;
                    NomanicObject.objs[ar[0].id] = ar[0];
                },
                autorun: 1
            });
        }
    },
    dep: function() {
        moment().format();
    },
    setup: function() {
        NomanicObject.register('NomanicGraph.create', ['line', 'bar', 'polar', 'pie', 'halfpie']);
        NomanicObject.addscript([]);
        NomanicObject.addtype(NomanicGraph);
        NomanicGraph.sGauss();
    },
    //legend functions, and menu
    breakdown: function(NMC, s, units, perc) {
        var val, p = NomanicObject.replaceAll(s, '{', '');
        p = NomanicObject.replaceAll(p, '}', '').split('.');
        var a = p[0][0],
            b = p[0].substring(1),
            c = p[1] ? p[1] : '',
            dpl = c.length,
            d = b.length,
            ln = 'unknown';
        switch (a) {
            case 'a':
                ln = NMC.time.format("dddd Do MMMM YYYY");
                break;
            case 'b':
                ln = NMC.time.format("Do MMMM YYYY");
                break;
            case 'c':
                ln = NMC.time.format("MMMM YYYY");
                break;
            case 'Y':
                ln = NMC.time.format("YYYY");
                break;
            case 'f':
                return NMC.ongettag ? NMC.ongettag(units, perc, NMC.time.unix()) : '';
                break;
            case 'i':
                ln = NMC.time.format("HH:mm:ss");
                break;
            case 'g':
                ln = NMC.time.format("h:mma dddd Do MMMM YYYY");
                break;
            case 'M':
                ln = NMC.time.format('MMMM');
                break;
            case 'W':
                ln = NMC.time.format('W');
                break;
            case 'd':
                ln = NMC.time.format('dddd');
                break;
            case 'o':
                ln = NMC.time.format('o');
                break;
            case 'h':
                ln = NMC.time.format('H');
                break;
            case 't':
                ln = NMC.time.format('a');
                break;
            case 'm':
                ln = NMC.time.format('m');
                break;
            case 's':
                ln = NMC.time.format('s');
                break;
            case 'p':
                val = perc;
                ln = ((d === 0 ? val : (NomanicObject.padZero(Math.floor(val), d))) + (dpl === 0 ? '' : ((((val - Math.floor(val)).toFixed(dpl))) + '').substring(1)));
                break;
            case 'u':
                val = units;
                ln = ((d === 0 ? val : (NomanicObject.padZero(Math.floor(val), d))) + (dpl === 0 ? '' : ((((val - Math.floor(val)).toFixed(dpl))) + '').substring(1)));
                break;
            case 'k':
                ln = NomanicObject.abbrNum(parseInt(units));
                break;
        }
        return ln;
    },
    gettag: function(NMC, tag, units, perc) {
        return tag.replace(/\{[[a-zA-Z]{1}[0-9]{0,6}(?:\.\d+)?\}/gm, function(m, index) {
            return NomanicGraph.breakdown(NMC, m, units, perc);
        });
    },
    showdata: function(NMC) {
        var o, f, s, v, t, r, prc, packge = [],
            un, tag;
        if (NMC.layout.subtype == 2) {
            return;
        }
        NMC.time = moment.unix(NMC.plot.timestart);
        for (f = 0; f < NMC.objects.legend.children[0].children.length; f++) {
            s = NMC.objects.legend.children[0].children[f];
            o = s.children;
            if (!NMC.plot.data[f]) {
                t = 1;
                prc = 100;
                r = 0;
                un = NMC.plot.lines[f - NMC.plot.data.length].series[NMC.selx];
                tag = NMC.selx == -1 ? '' : NomanicGraph.gettag(NMC, NMC.plot.tagformat, un, prc);
                o[0].innerHTML = tag;
                o[1].style.opacity = NMC.selx == -1 ? 0 : 1;
                if (!NomanicObject.hasClass(o[1], 'done')) {
                    o[1].style.background = NMC.lpattern[r + f] ? 'url(' + NMC.lpattern[r + f] + ')' : NMC.legend.ncolors[NMC.cs][r + f];
                    NomanicObject.addClass(o[1], 'done');
                }
                o[2].style.innerHTML = NMC.selx == -1 ? '' : NMC.legend.labels[NMC.cs][r + f];
                packge[f] = NMC.selx == -1 ? false : [NMC.legend.ncolors[NMC.cs][r + f], NMC.legend.labels[NMC.cs][r + f], tag];
                s = NMC.objects.tools.children[r + f];
                if (NMC.layout.floatingtags) {
                    if (NMC.legend.inuse[NMC.cs][r + f] == 1) {
                        if (NMC.legend.heights[r + f]) {
                            v = NMC.legend.heights[r + f][NMC.selx];
                            s.children[1].innerHTML = NomanicObject.abbrNum(NMC.plot.lines[f - NMC.plot.data.length].series[NMC.selx]);
                            s.style.left = (NMC.layout.vertical ? (v[1] - (s.offsetWidth / 2)) : (v[0] - (s.offsetWidth / 2))) + 'px';
                            s.style.top = (NMC.layout.vertical ? (v[0] - (s.offsetHeight / 2)) : (v[1] - (s.offsetHeight / 2))) + 'px';
                        }
                    } else {
                        s.style.left = '-1000px';
                        s.style.top = '-1000px';
                    }
                }
            } else {
                t = NMC.plot.data[f].totals[NMC.selx];
                t = (t === 0) ? 1 : t;
                prc = (((NMC.legend.inuse[NMC.cs][f] == 1) ? Math.abs(NMC.plot.data[f].series[NMC.selx]) : 0) / t) * 100;
                un = NMC.plot.data[f].series[NMC.selx];
                tag = NMC.selx == -1 ? '' : NomanicGraph.gettag(NMC, NMC.plot.tagformat, un, prc);
                o[0].innerHTML = tag;
                o[1].style.opacity = NMC.selx == -1 ? 0 : 1;
                if (!NomanicObject.hasClass(o[1], 'done')) {
                    o[1].style.background = NMC.lpattern[f] ? 'url(' + NMC.lpattern[f] + ')' : NMC.legend.ncolors[NMC.cs][f];
                    NomanicObject.addClass(o[1], 'done');
                }
                o[2].style.innerHTML = NMC.selx == -1 ? '' : NMC.legend.labels[NMC.cs][f];
                packge[f] = NMC.selx == -1 ? false : [NMC.legend.ncolors[NMC.cs][f], NMC.legend.labels[NMC.cs][f], tag];
                s = NMC.objects.tools.children[f];
                if (NMC.layout.floatingtags) {
                    if (NMC.legend.inuse[NMC.cs][f] == 1) {
                        if (NMC.legend.heights[f]) {
                            v = NMC.legend.heights[f][NMC.selx];
                            s.children[1].innerHTML = NomanicObject.abbrNum(NMC.plot.data[f].series[NMC.selx]);
                            s.style.left = (NMC.layout.vertical ? (v[1] - (s.offsetWidth / 2)) : (v[0] - (s.offsetWidth / 2))) + 'px';
                            s.style.top = (NMC.layout.vertical ? (v[0] - (s.offsetHeight / 2)) : (v[1] - (s.offsetHeight / 2))) + 'px';
                        }
                    } else {
                        s.style.left = '-1000px';
                        s.style.top = '-1000px';
                    }
                }
            }
        }
        if (NMC.selx > 0) {
            NMC.time.add(NMC.selx * NMC.plot.timestep, NMC.plot.timeunit);
        }
        var menu = NMC.ongetmenu ? NMC.ongetmenu(NMC, un, prc, NMC.time.unix()) : (NomanicGraph.gettag(NMC, NMC.plot.menuformat, NMC.selx, 0));
        if (NMC.layout.showmenu) {
            menu = NMC.plot.menu ? NMC.plot.menu[NMC.selx] : menu;
            NMC.objects.head.children[0].children[1].children[0].innerHTML = menu;
        }
        NMC.menu = menu;
        var iw = (NMC.onshowdata) ? NMC.onshowdata(NMC, packge, menu) : 0;
        return NMC;
    },
    redolegend: function(col, pcol, ccol, gcol, lnes, NMC) {
        NMC.plot.color = col;
        NMC.setink(pcol);
        NMC.setcink(ccol);
        NMC.setgink(gcol);
        NomanicGraph.buildlegend(NMC, NMC.cs, NMC.plot.data, lnes, 1);
        NMC = NMC.rsr(NMC);
        return NMC;
    },
    buildlegend: function(NMC, cs, dat, lnes, frc) {
        var j, f, r, c = [],
            d = [],
            l = [];
        for (f = 0; f < dat.length; f++) {
            if (dat[f].color) {
                c.push(dat[f].color);
            }
            l.push(dat[f].label ? dat[f].label : '');
        }
        if ((c.length != dat.length) || frc) {
            if (NMC.plot.opacityspread) {
                c = [];
                var df = 0.8 / dat.length,
                    col = NomanicObject.hexToRgb(NMC.plot.color ? NMC.plot.color : NomanicObject.defcolor);
                for (f = 0; f < dat.length; f++) {
                    c[f] = 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',' + (1 - (df * f)) + ')';
                }
            } else {
                c = NomanicObject.generate(NMC.plot.color ? NMC.plot.color : NomanicObject.defcolor, dat.length);
            }
            if (frc) {
                for (f = 0; f < dat.length; f++) {
                    dat[f].color = c[f];
                }
            }
        }
        if (NMC.plot.highlight) {
            if (NMC.plot.opacityspread) {
                d = [];
                var df = 0.8 / dat.length,
                    col = NomanicObject.hexToRgb(NMC.plot.high ? NMC.plot.high : NomanicObject.defcolor);
                for (f = 0; f < dat.length; f++) {
                    d[f] = 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',' + (1 - (df * f)) + ')';
                }
            } else {
                d = NomanicObject.generate(NMC.plot.high ? NMC.plot.high : NomanicObject.defcolor, dat.length);
            }
            for (f = 0; f < dat.length; f++) {
                dat[f].high = d[f];
            }
        }
        if (NMC.plot.lines) {
            for (r = 0; r < NMC.plot.lines.length; r++) {
                l.push(NMC.plot.lines[r].label ? NMC.plot.lines[r].label : '');
                c.push(lnes && lnes[r] ? lnes[r] : (NMC.plot.lines[r].color ? NMC.plot.lines[r].color : ''));
            }
        }
        NMC.legend.colors[cs] = c;
        NMC.legend.labels[cs] = l;
        NMC.legend.ncolors = [];
        for (j = 0; j < NMC.legend.colors.length; j++) {
            NMC.legend.ncolors[j] = [];
            for (f = 0; f < NMC.legend.colors[j].length; f++) {
                NMC.legend.ncolors[j][f] = NMC.legend.darken ? NomanicObject.lighten(NMC.legend.colors[j][f], NMC.legend.darken) : NMC.legend.colors[j][f];
            }
        }
        NMC.layout.pencil.nink = NMC.layout.pencil.darken ? NomanicObject.lighten(NMC.layout.pencil.ink, NMC.layout.pencil.darken) : NMC.layout.pencil.ink;
        NMC.layout.chart.nink = NMC.layout.chart.darken ? NomanicObject.lighten(NMC.layout.chart.ink, NMC.layout.chart.darken) : (NMC.layout.chart.ink ? NMC.layout.chart.ink : NMC.layout.pencil.ink);
        return NMC;
    },
    loadlegend: function(NMC) {
        var f, s, ln = '',
            ln2 = '',
            self = NMC;
        NMC.legend.inuse = [];
        NMC.legend.inuse[NMC.cs] = [];
        if (NMC.layout.subtype == 2) {
            ln += '<div style="float:left;width:100%;"><div style="float:right;width:30%;height:100%;font-weight:bold;text-align:right;overflow:hidden;">' + (50 - (Math.random() * 100)).toFixed(2) + '</div><div class="brdr" child="' + f + '" style="opacity:0;float:left;background:' + NMC.legend.ncolors[NMC.cs][f] + ';"></div><div style="float:left;height:100%;width:50%;overflow:hidden;"></div></div>';
        } else {
            for (f = 0; f < NMC.legend.labels[NMC.cs].length; f++) {
                if (NMC.layout.showlegend < 1) {
                    ln += '<div class="blk w100 h100"><div class="blk" style="font-weight:bold;text-align:right;overflow:hidden;">' + (50 - (Math.random() * 100)).toFixed(2) + '</div><div class="blk brdr" child="' + f + '" style="background:' + NMC.legend.ncolors[NMC.cs][f] + ';"></div><div class="blk">' + NMC.legend.labels[NMC.cs][f] + '</div></div>';
                } else {
                    ln += '<div style="float:left;width:' + (100 / NMC.legend.columns) + '%;"><div style="float:right;width:30%;height:100%;font-weight:bold;text-align:right;overflow:hidden;">' + (50 - (Math.random() * 100)).toFixed(2) + '</div><div class="brdr" child="' + f + '" style="float:left;background:' + NMC.legend.ncolors[NMC.cs][f] + ';"></div><div style="float:left;height:100%;width:35%;overflow:hidden;">' + NMC.legend.labels[NMC.cs][f] + '</div></div>';
                }
                if (NMC.layout.floatingtags) {
                    ln2 += '<div class="blk tc" style="color:#F8F8F8;font-weight:bold;"><div class="blk"></div><div class="blk w100 h100 tc"></div></div>';
                }
                NMC.legend.inuse[NMC.cs][f] = 1;
            }
        }
        NMC.objects.legend.children[0].innerHTML = ln;
        for (f = 0; f < NMC.objects.legend.children[0].children.length; f++) {
            s = NMC.objects.legend.children[0].children[f];
            NMC = NomanicObject.addClick(NMC, s.children[1], function(evt, self) {
                NomanicGraph.togglelegend(evt, self);
            });
        }
        NMC.objects.tools.innerHTML = ln2;
        return NMC;
    },
    togglelegend: function(evt, self) {
        var NMC = NomanicObject.objs[self.id],
            idx = parseInt(evt.target.getAttribute('child'));
        NomanicGraph.showlegend(NMC, idx, 1 - NMC.legend.inuse[NMC.cs][idx]);
    },
    showlegend: function(NMC, idx, x) {
        NMC.legend.inuse[NMC.cs][idx] = x;
        NMC.objects.legend.children[0].children[idx].style.opacity = (x == 1 ? 1 : 0.3);
        NMC = NMC.rsr(NMC);
        NMC = NMC.showdata(NMC);
        var iw = NMC.ontogglelegend ? NMC.ontogglelegend(NMC, idx, x) : 0;
        NomanicObject.objs[NMC.id] = NMC;
    },
    getdata: function(NMC, x) {
        x = x ? x : NMC.selx;
        var f = 0,
            ar = [];
        for (f = 0; f < NMC.plot.data.length; f++) {
            ar.push([NMC.plot.data[f].series[x]]);
        }
        return ar;
    },
    getmenu: function(NMC) {
        return NMC.menu;
    },
    getlegend: function(NMC) {
        return {
            colors: NMC.legend.ncolors,
            labels: NMC.legend.labels,
            inuse: NMC.legend.inuse
        };
    },
    //parser
    parsebase: function(options, p, dv) {
        var i, j, r, f, k, c = NomanicObject.splitter(p);
        options.plot.donuty = 1;
        options.plot.seperate = 0;
        options.plot.scalarx = 1;
        options.plot.scalary = 1;
        options.plot.scalex = 1;
        options.plot.scaley = 1;
        for (f = 0; f < c.length; f++) {
            k = c[f].split('|');
            k[1] = k[1] ? k[1] : 1;
            switch (k[0]) {
                case 'legend':
                    options.legend.columns = parseInt(k[1]);
                    break;
                case 'datatype':
                    options.datatype = NomanicObject.stripq(k[1]);
                    break;
                case 'showaxis':
                    options.layout.showaxis = 1;
                    break;
                case 'intro':
                    k = NomanicObject.stripc(NomanicObject.stripq(k[1]));
                    options.plot.intro = parseInt(k[0]);
                    options.idelay = parseInt(k[1]);
                    break;
                case 'minmax':
                    k = NomanicObject.stripc(NomanicObject.stripq(k[1]));
                    options.plot.min = parseInt(k[0]);
                    options.plot.max = parseInt(k[1]);
                    break;
                case 'showgrid':
                    options.layout.showgrid = 1;
                    break;
                case 'showzoom':
                    options.layout.showzoom = 1;
                    break;
                case 'showmenu':
                    options.layout.showmenu = 1;
                    break;
                case 'menu':
                    options.plot.menu = NomanicObject.gsary(k[1]);
                    break;
                case 'showtitle':
                    options.layout.showtitle = 1;
                    break;
                case 'replacedelay':
                    options.rdelay = parseInt(k[1]);
                    break;
                case 'showlegend':
                    var c1 = parseFloat(k[1]);
                    c1 = (c1 > 1) ? 1 : c1;
                    options.layout.showlegend = c1;
                    break;
                case 'select':
                    options.layout.select = parseInt(k[1]);
                    break;
                case 'floatingtags':
                    options.layout.floatingtags = 1;
                    break;
                case 'stacked':
                    options.plot.stacked = 1;
                    break;
                case 'marker':
                    options.plot.marker = 1;
                    break;
                case 'hint':
                    options.plot.hint = 1;
                    break;
                case 'shadow':
                    options.plot.shadow = 1;
                    break;
                case 'yorigin':
                    options.plot.yorigin = 1;
                    break;
                case 'fullscreen':
                    options.layout.fullscreen = 1;
                    break;
                case 'vertical':
                    options.layout.vertical = 1;
                    break;
                case 'spark':
                    options.layout.spark = 1;
                    break;
                case 'outline':
                    options.plot.outline = 1;
                    break;
                case 'notext':
                    options.plot.notext = 1;
                    break;
                case 'fit':
                    options.plot.fit = parseInt(k[1]);
                    break;
                case 'fixed':
                    options.plot.fixed = parseInt(k[1]);
                    break;
                case 'grid':
                    options.plot.grid = parseInt(k[1]);
                    break;
                case 'round':
                    k = NomanicObject.stripc(NomanicObject.stripq(k[1]));
                    options.plot.round = parseInt(k[0]);
                    options.plot.roundgap = k[1] ? parseFloat(k[1]) : false;
                    break;
                case 'donut':
                    k = NomanicObject.stripc(NomanicObject.stripq(k[1]));
                    options.plot.donut = parseFloat(k[0]);
                    options.plot.donuty = k[1] ? parseFloat(k[1]) : 1;
                    break;
                case 'neon':
                    options.plot.neon = 1;
                    break;
                case '3d':
                    options.plot.egg = 1;
                    break;
                case '3d2':
                    k = NomanicObject.stripc(NomanicObject.stripq(k[1]));
                    options.plot.egg2 = parseFloat(k[0]);
                    options.plot.eggshade2 = k[1] ? parseFloat(k[1]) : 0.2;
                    options.plot.eggcol2 = k[2] ? NomanicObject.stripq(k[2]) : false;
                    break;
                case '3d3':
                    k = NomanicObject.stripc(NomanicObject.stripq(k[1]));
                    options.plot.egg3 = parseFloat(k[0]);
                    options.plot.eggshade3 = k[1] ? parseFloat(k[1]) : 0.2;
                    options.plot.eggcol3 = k[2] ? NomanicObject.stripq(k[2]) : false;
                    break;
                case 'number':
                    k = NomanicObject.stripc(NomanicObject.stripq(k[1]));
                    options.plot.number = [];
                    options.plot.number[0] = parseInt(k[0]);
                    options.plot.number[1] = NomanicObject.stripq(k[1]);
                    options.plot.number[2] = parseFloat(k[2]);
                    break;
                case 'band':
                    k = NomanicObject.stripc(NomanicObject.stripq(k[1]));
                    options.plot.band = [0];
                    for (i = 0; i < k.length; i += 2) {
                        options.plot.band[i + 1] = k[i] ? NomanicObject.stripq(k[i]) : false;
                        options.plot.band[i + 2] = k[i + 1] ? parseFloat(k[i + 1]) : 1;
                    }
                    break;
                case 'braid':
                    k = NomanicObject.stripc(NomanicObject.stripq(k[1]));
                    options.plot.braidgap = [];
                    for (i = 0; i < k.length; i += 4) {
                        options.plot.braidgap[i] = parseFloat(k[i]);
                        options.plot.braidgap[i + 1] = parseFloat(k[i + 1]);
                        options.plot.braidgap[i + 2] = parseFloat(k[i + 2]);
                        options.plot.braidgap[i + 3] = NomanicObject.stripq(k[i + 3]);
                    }
                    break;
                case 'scalar':
                    k = NomanicObject.stripc(NomanicObject.stripq(k[1]));
                    options.plot.scalex = parseFloat(k[0]);
                    options.plot.scaley = k[1] ? parseFloat(k[1]) : parseFloat(k[0]);
                    break;
                case 'outerring':
                    options.plot.outerring = 1;
                    break;
                case 'innerring':
                    options.plot.innerring = 1;
                    break;
                case 'inset':
                    options.plot.inset = 1;
                    break;
                case 'gridlines':
                    options.plot.gridlines = parseFloat(k[1]);
                    break;
                case 'color':
                    options.plot.color = k[1];
                    break;
                case 'seperate':
                    k = NomanicObject.stripc(NomanicObject.stripq(k[1]));
                    options.plot.seperate = parseInt(k[0]);
                    options.plot.seperatex = k[1] ? parseInt(k[1]) : false;
                    break;
                case 'opacityspread':
                    options.plot.opacityspread = 1;
                    break;
                case 'highlight':
                    options.plot.high = k[1];
                    options.plot.highlight = 1;
                    break;
                case 'menuformat':
                    options.plot.menuformat = NomanicObject.stripq(k[1]);
                    break;
                case 'timestart':
                    options.plot.timestart = parseInt(k[1]);
                    break;
                case 'timestep':
                    options.plot.timestep = parseInt(k[1]);
                    break;
                case 'timeunit':
                    options.plot.timeunit = NomanicObject.stripq(k[1]);
                    break;
                case 'tagformat':
                    options.plot.tagformat = NomanicObject.stripq(k[1]);
                    break;
            }
        }
        options = NomanicObject.parsebase(options, p, dv);
        if (options.container.hasAttribute('data')) {
            r = NomanicObject.splitter(options.container.getAttribute('data'), '{', '}');
            for (f = 0; f < r.length; f++) {
                options.plot.data[f] = {};
                options.plot.data[f].colors = [];
                options.plot.data[f].idonut = 0;
                options.plot.data[f].odonut = 1;
                c = NomanicObject.splitter(r[f]);
                for (j = 0; j < c.length; j++) {
                    k = c[j].split('|');
                    k[1] = k[1] ? k[1] : 1;
                    switch (k[0]) {
                        case 'series':
                            options.plot.data[f].series = NomanicObject.gary(k[1]);
                            break;
                        case 'icon':
                            options.plot.data[f].icon = NomanicObject.stripq(k[1]);
                            break;
                        case 'label':
                            options.plot.data[f].label = NomanicObject.stripq(k[1]);
                            break;
                        case 'color':
                            options.plot.data[f].color = k[1];
                            break;
                        case 'line':
                            options.plot.data[f].line = k[1];
                            break;
                        case 'spline':
                            options.plot.data[f].spline = 1;
                            break;
                        case 'cap':
                            options.plot.data[f].cap = k[1] ? parseInt(k[1]) : 1;
                            break;
                        case 'dashed':
                            options.plot.data[f].dashed = 1;
                            break;
                        case 'fill':
                            options.plot.data[f].fill = k[1];
                            break;
                        case 'outline':
                            options.plot.data[f].outline = 1;
                            break;
                        case 'neon':
                            options.plot.data[f].neon = 1;
                            break;
                        case 'image':
                            options.lpattern[f] = NomanicObject.urlpath + 'assets/' + NomanicObject.stripq(k[1]);
                            break;
                        case 'alpha':
                            options.plot.data[f].alpha = parseFloat(k[1]);
                            break;
                        case 'colors':
                            k = NomanicObject.stripc(NomanicObject.stripq(k[1]));
                            for (i = 0; i < k.length; i++) {
                                options.plot.data[f].colors[i] = NomanicObject.stripq(k[i]);
                            }
                            break;
                        case 'donut':
                            k = NomanicObject.stripc(NomanicObject.stripq(k[1]));
                            options.plot.data[f].idonut = parseFloat(k[0]);
                            options.plot.data[f].odonut = k[1] ? parseFloat(k[1]) : 1;
                            break;
                    }
                }
            }
        }
        if (options.container.hasAttribute('lines')) {
            r = NomanicObject.splitter(options.container.getAttribute('lines'), '{', '}');
            for (f = 0; f < r.length; f++) {
                options.plot.lines[f] = {};
                c = NomanicObject.splitter(r[f]);
                for (j = 0; j < c.length; j++) {
                    k = c[j].split('|');
                    k[1] = k[1] ? k[1] : 1;
                    switch (k[0]) {
                        case 'series':
                            options.plot.lines[f].series = NomanicObject.gary(k[1]);
                            break;
                        case 'label':
                            options.plot.lines[f].label = NomanicObject.stripq(k[1]);
                            break;
                        case 'color':
                            options.plot.lines[f].color = k[1];
                            break;
                        case 'line':
                            options.plot.data[f].line = k[1];
                            break;
                        case 'spline':
                            options.plot.lines[f].spline = 1;
                            break;
                        case 'cap':
                            options.plot.lines[f].cap = 1;
                            break;
                        case 'dashed':
                            options.plot.lines[f].dashed = 1;
                            break;
                        case 'average':
                            options.plot.lines[f].average = 1;
                            break;
                        case 'sum':
                            options.plot.lines[f].sum = 1;
                            break;
                        case 'fill':
                            options.plot.lines[f].fill = k[1];
                            break;
                        case 'outline':
                            options.plot.data[f].outline = 1;
                            break;
                        case 'neon':
                            options.plot.lines[f].neon = 1;
                            break;
                        case 'alpha':
                            options.plot.lines[f].alpha = parseFloat(k[1]);
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
    getowner: function(NMC) {
        switch (NMC.layout.type) {
            case 'line':
            case 'bar':
            case 'polar':
            case 'pie':
            case 'halfpie':
                return NomanicGraph;
        }
        return false;
    },
    parsecsv: function(o, ln) {
        var n = 0,
            f, s = 0,
            b = ln.match(/[^\r\n]+/g),
            b1 = [],
            b2 = [];
        for (f = 0; f < b.length; f++) {
            b[f] = NomanicObject.gary(b[f]);
        }
        if (o.plot.data) {
            s += o.plot.data.length;
        }
        if (o.plot.lines) {
            s += o.plot.lines.length;
        }
        if (s <= b.length) {
            if (o.plot.data) {
                for (f = 0; f < o.plot.data.length; f++) {
                    b1.push(b[n]);
                    n++;
                }
            }
            if (o.plot.lines) {
                for (f = 0; f < o.plot.lines.length; f++) {
                    b2.push(b[n]);
                    n++;
                }
            }
        }
        return [b1, b2];
    },
    loadcsv: function(o, ln) {
        var n = 0,
            f, s = 0,
            b = ln.match(/[^\r\n]+/g);
        for (f = 0; f < b.length; f++) {
            b[f] = NomanicObject.gary(b[f]);
        }
        if (o.plot.data) {
            s += o.plot.data.length;
        }
        if (o.plot.lines) {
            s += o.plot.lines.length;
        }
        if (s <= b.length) {
            if (o.plot.data) {
                for (f = 0; f < o.plot.data.length; f++) {
                    o.plot.data[f].series = b[n];
                    n++;
                }
            }
            if (o.plot.lines) {
                for (f = 0; f < o.plot.lines.length; f++) {
                    o.plot.lines[f].series = b[n];
                    n++;
                }
            }
        }
        o.done = 1;
        return o;
    },
    //create
    create: function(NMC) {
        var self = NMC;
        setTimeout(function() {
            var o, NMC = self;
            NMC.loadlegend = NomanicGraph.loadlegend;
            NMC.buildlegend = NomanicGraph.buildlegend;
            NMC.showdata = NomanicGraph.showdata;
            NMC.showlegend = function(idx, x) {
                var NMC = NomanicGraph.showlegend(self, idx, x);
                return NMC;
            }
            NMC = NomanicObject.createbefore(NMC);
            NMC = NMC.buildlegend(NMC, 0, NMC.plot.data);
            NMC.plot.tagformat = NMC.plot.tagformat ? NMC.plot.tagformat : ('{u}' + (NMC.plot.stacked ? ' [{p0.00}%]' : ''));
            NMC.plot.menuformat = NMC.plot.menuformat ? NMC.plot.menuformat : '{u}';
            NMC.plot.timestep = NMC.plot.timestep ? NMC.plot.timestep : 1;
            NMC.plot.timeunit = NMC.plot.timeunit ? NMC.plot.timeunit : 'd';
            var i, r, dat = NMC.plot.data,
                ttl = 0,
                lr = dat[0] ? dat[0].series.length : 0;
            NMC.plot.totals = 0;
            for (i = lr - 1; i > -1; i--) {
                ttl = 0;
                for (r = 0; r < dat.length; r++) {
                    NMC.plot.data[r].totals = NMC.plot.data[r].totals ? NMC.plot.data[r].totals : [];
                    ttl += Math.abs(NMC.plot.data[r].series[i]);
                }
                for (r = 0; r < dat.length; r++) {
                    NMC.plot.data[r].totals[i] = NMC.plot.stacked ? ttl : Math.abs(NMC.plot.data[r].series[i]);
                }
            }
            for (r = 0; r < dat.length; r++) {
                NMC.plot.totals += Math.abs(NMC.plot.data[r].series[0]);
            }
            NMC.rsr = NomanicObject.rsr;
            NMC.updateaxis = NomanicGraph.updateaxis;
            NMC.addClicks = (NMC.layout.type == 'polar') ? NomanicGraph.addClicksPolar : NomanicGraph.addClicks;
            NMC.getdata = function(x) {
                return NomanicGraph.getdata(self, x);
            }
            NMC.getmenu = function() {
                return NomanicGraph.getmenu(self);
            }
            NMC.setselect = function(x) {
                return NomanicGraph.setSelect(self, x);
            }
            NMC.getselect = function(x) {
                return self.selx;
            }
            NMC.getlegend = function() {
                return NomanicGraph.getlegend(self);
            }
            NMC.redolegend = function(col, pcol, ccol, gcol, lnes) {
                return NomanicGraph.redolegend(col, pcol, ccol, gcol, lnes, self);
            }
            NMC.attach = function(evt, fn) {
                return NomanicObject.attacher(self, evt, fn);
            }
            NMC.replace = function(opts, x, d) {
                if (opts.ajax) {
                    NomanicObject.postAjax(NomanicObject.urlpath + 'data/' + opts.ajax, [self, x, d], function(data, a) {
                        var b = NomanicGraph.parsecsv(a[0], data);
                        NomanicGraph.replaced(a[0], b[0], b[1], a[1], a[2]);
                    });
                } else {
                    NomanicGraph.replaced(self, opts.data ? opts.data : [], opts.lines ? opts.lines : [], x, d);
                }
                return self;
            };
            NMC.update = function(opts, x) {
                NomanicGraph.update(self, opts.data ? opts.data : [], opts.lines ? opts.lines : [], x);
                return self;
            };
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
                case 'line':
                    NMC.redraw = NomanicGraph.NMCdrawLines;
                    NMC.mtype = 2;
                    NMC.ctype = 1;
                    NMC.layout.showscroll = 1;
                    break;
                case 'bar':
                    NMC.redraw = NomanicGraph.NMCdrawBar;
                    NMC.mtype = 2;
                    NMC.ctype = 1;
                    NMC.layout.showscroll = 1;
                    break;
                case 'polar':
                    NMC.redraw = NomanicGraph.NMCdrawPolar;
                    NMC.updateaxis = NomanicGraph.updateaxisPolar;
                    NMC.layout.gtype = 1;
                    NMC.plot.egg = 0;
                    NMC.layout.floatingtags = 0;
                    NMC.layout.showaxis = 0;
                    NMC.layout.showscroll = 0;
                    NMC.plot.stacked = 1;
                    NMC.selx = 0;
                    NMC.ctype = 1;
                    NMC.fixg = 1;
                    break;
                case 'pie':
                    NMC.pie = 1;
                    NMC.redraw = NomanicGraph.NMCdrawPie;
                    NMC.layout.gtype = 2;
                    NMC.layout.floatingtags = 0;
                    NMC.layout.showaxis = 0;
                    NMC.layout.showgrid = 0;
                    NMC.layout.showscroll = 0;
                    NMC.layout.showmenu = 0;
                    NMC.selx = 0;
                    NMC.fixg = 1;
                    break;
                case 'halfpie':
                    NMC.pie = 1;
                    NMC.redraw = NomanicGraph.NMCdrawHalfPie;
                    NMC.plot.egg = 0;
                    NMC.layout.gtype = 2;
                    NMC.layout.floatingtags = 0;
                    NMC.layout.showaxis = 0;
                    NMC.layout.showgrid = 0;
                    NMC.layout.showscroll = 0;
                    NMC.layout.showmenu = 0;
                    NMC.selx = 0;
                    NMC.fixg = 1;
                    break;
            }
            NMC.czoom = 100;
            NMC = NomanicObject.sortoutslider(NMC, 1);
            NMC = NomanicObject.sortoutzoomslider(NMC, 1);
            NMC = NomanicObject.sortoutzoomslider(NMC, 1, 1);
            NMC.objects.tray.style.top = '0px';
            NMC = NomanicObject.sortouttrayslider(NMC, 1);
            NMC.objects.tray.style.top = '0px';
            NMC.objects.lscroller.style.top = '0px';
            NMC.showtitle(NMC.layout.showtitle);
            NMC = NomanicObject.createafter(NMC);
            NMC = NMC.updateaxis(NMC);
            NMC.canvasratio = (NMC.objects.graph.offsetWidth / NMC.objects.graph.offsetHeight);
            if (NMC.layout.showzoom) {
                (o = NMC.objects.yscroller).setAttribute('NMC', NMC.id);
                o.style.cursor = 'pointer';
                NMC.draggie3 = new Draggabilly(o, {
                    containment: true
                });
                NMC.draggie3.on('dragMove', function(event, pointer, moveVector) {
                    var NMC = NomanicObject.objs[parseInt((this.element).getAttribute('NMC'))];
                    NMC = NomanicObject.sortoutzoomslider(NMC, 1, 1);
                    NomanicObject.objs[NMC.id] = NMC;
                });
                (o = NMC.objects.xscroller).setAttribute('NMC', NMC.id);
                o.style.cursor = 'pointer';
                NMC.draggie4 = new Draggabilly(o, {
                    containment: true
                });
                NMC.draggie4.on('dragMove', function(event, pointer, moveVector) {
                    var NMC = NomanicObject.objs[parseInt((this.element).getAttribute('NMC'))];
                    NMC = NomanicObject.sortoutzoomslider(NMC, 1);
                    NomanicObject.objs[NMC.id] = NMC;
                });
            } else if (NMC.layout.vertical && (NMC.mtype == 2)) {
                (o = NMC.objects.yscroller).setAttribute('NMC', NMC.id);
                o.style.cursor = 'pointer';
                NMC.draggie = new Draggabilly(o, {
                    containment: true
                });
                NMC.draggie.on('dragMove', function(event, pointer, moveVector) {
                    var NMC = NomanicObject.objs[parseInt((this.element).getAttribute('NMC'))];
                    NMC = NomanicObject.sortoutslider(NMC, 1);
                    NomanicObject.objs[NMC.id] = NMC;
                });
            } else if (NMC.mtype == 2) {
                (o = NMC.objects.xscroller).setAttribute('NMC', NMC.id);
                o.style.cursor = 'pointer';
                NMC.draggie = new Draggabilly(o, {
                    containment: true
                });
                NMC.draggie.on('dragMove', function(event, pointer, moveVector) {
                    var NMC = NomanicObject.objs[parseInt((this.element).getAttribute('NMC'))];
                    NMC = NomanicObject.sortoutslider(NMC, 1);
                    NomanicObject.objs[NMC.id] = NMC;
                });
            }
            if (NMC.draggie) {
                NMC = NomanicObject.addMouse(NMC, NMC.objects.wrapper, (NMC.layout.vertical ? function(e, self) {
                    var NMC = NomanicObject.objs[self.id];
                    e = window.event || e;
                    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
                    e.preventDefault();
                    NMC.objects.yscroller.style.top = (NMC.objects.yscroller.offsetTop - (delta * NomanicObject.moused)) + 'px';
                    NMC = NomanicObject.sortoutslider(NMC, 2);
                    NomanicObject.objs[NMC.id] = NMC;
                } : function(e, self) {
                    var NMC = NomanicObject.objs[self.id];
                    e = window.event || e;
                    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
                    e.preventDefault();
                    NMC.objects.xscroller.style.left = (NMC.objects.xscroller.offsetLeft - (delta * NomanicObject.moused)) + 'px';
                    NMC = NomanicObject.sortoutslider(NMC, 2);
                    NomanicObject.objs[NMC.id] = NMC;
                }));
            }
            if (NMC.layout.showzoom) {
                NMC.objects.zoom.style.display = 'block';
                NMC.objects.zoomtx.innerHTML = NMC.czoom + '%';
                NomanicObject.addClick(NMC, NMC.objects.zoomup, function(e, NMC) {
                    NMC = NomanicObject.objs[NMC.id];
                    NMC.objects.zoomup.style.backgroundColor = '#F7CC30';
                    var self = NMC;
                    NMC.czoom = (Math.floor((NMC.czoom + 25) / 25) * 25);
                    NMC.czoom = (NMC.czoom > 2000 ? 2000 : NMC.czoom);
                    NMC.objects.zoomtx.innerHTML = NMC.czoom + '%';
                    NomanicObject.objs[NMC.id] = NMC;
                    NMC.redraw(NMC);
                    NMC = NomanicObject.sortoutslider(NMC, 1);
                    NMC = NomanicObject.sortoutzoomslider(NMC, 1);
                    NMC = NomanicObject.sortoutzoomslider(NMC, 1, 1);
                    requestTimeout(function() {
                        self.objects.zoomup.style.backgroundColor = '#FFF';
                    }, 500);
                });
                NomanicObject.addClick(NMC, NMC.objects.zoomdn, function(e, NMC) {
                    NMC = NomanicObject.objs[NMC.id];
                    NMC.objects.zoomdn.style.backgroundColor = '#F7CC30';
                    var self = NMC;
                    NMC.czoom = (Math.floor((NMC.czoom - 25) / 25) * 25);
                    NMC.czoom = (NMC.czoom < 100 ? 100 : NMC.czoom);
                    NMC.objects.zoomtx.innerHTML = NMC.czoom + '%';
                    NomanicObject.objs[NMC.id] = NMC;
                    NMC.redraw(NMC);
                    NMC = NomanicObject.sortoutslider(NMC, 1);
                    NMC = NomanicObject.sortoutzoomslider(NMC, 1);
                    NMC = NomanicObject.sortoutzoomslider(NMC, 1, 1);
                    requestTimeout(function() {
                        self.objects.zoomdn.style.backgroundColor = '#FFF';
                    }, 500);
                });
            }
            NMC = NomanicObject.finally(NMC);
            NomanicObject.processThem();
        }, 50);
        return NMC;
    }
};

//set everything up
NomanicGraph.setup();
