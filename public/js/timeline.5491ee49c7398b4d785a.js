(self.webpackChunklinkspace=self.webpackChunklinkspace||[]).push([[122],{37647:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>k});var s,i=n(17527),a=n(29369),r=n(95093),o=n.n(r),l=n(30410),c=n(60639),d=n.n(c);s=d().template,(d().templates=d().templates||{}).timelineitem=s({1:function(t,e,n,s,i){var a=t.lambda,r=t.escapeExpression,o=t.lookupProperty||function(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]};return"                <li>"+r(a(null!=e?o(e,"name"):e,e))+": "+r(a(null!=e?o(e,"value"):e,e))+"</li>\n"},compiler:[8,">= 4.3.0"],main:function(t,e,n,s,i){var a,r,o=null!=e?e:t.nullContext||{},l=t.hooks.helperMissing,c="function",d=t.escapeExpression,u=t.lookupProperty||function(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]};return'<div class="timeline-tippy"\n    data-tippy-sticky="true"\n    data-tippy-interactive="true"\n    data-tippy-content=\'<div>\n        <b>Record '+d(typeof(r=null!=(r=u(n,"current_id")||(null!=e?u(e,"current_id"):e))?r:l)===c?r.call(o,{name:"current_id",hash:{},data:i,loc:{start:{line:5,column:18},end:{line:5,column:32}}}):r)+'</b><br>\n        <ul class="list-unstyled">\n'+(null!=(a=u(n,"each").call(o,null!=e?u(e,"values"):e,{name:"each",hash:{},fn:t.program(1,i,0),inverse:t.noop,data:i,loc:{start:{line:7,column:12},end:{line:9,column:21}}}))?a:"")+'        </ul>\n        <a class = "moreinfo" data-record-id="'+d(typeof(r=null!=(r=u(n,"current_id")||(null!=e?u(e,"current_id"):e))?r:l)===c?r.call(o,{name:"current_id",hash:{},data:i,loc:{start:{line:11,column:46},end:{line:11,column:60}}}):r)+'">Read more</a> |\n        <a href="/edit/'+d(typeof(r=null!=(r=u(n,"current_id")||(null!=e?u(e,"current_id"):e))?r:l)===c?r.call(o,{name:"current_id",hash:{},data:i,loc:{start:{line:12,column:23},end:{line:12,column:37}}}):r)+'">Edit item</a>\n    </div>\'\n    data-tippy-animation="scale"\n    data-tippy-duration="0"\n    data-tippy-followCursor="initial"\n    data-tippy-arrow="true"\n    data-tippy-delay="[200, 200]"\n  >\n  '+d(typeof(r=null!=(r=u(n,"content")||(null!=e?u(e,"content"):e))?r:l)===c?r.call(o,{name:"content",hash:{},data:i,loc:{start:{line:20,column:2},end:{line:20,column:13}}}):r)+"\n</div>\n"},useData:!0});var u=n(74692);function m(t,e="height"){if(!t||!t.length)return 0;try{const n=t.css(e);return n?parseFloat(parseFloat(n.replace("px")).toFixed(4)):0}catch(t){return console.error("fatal error",t),0}}function p(t){const e=u(".vis-label:visible");let n=null;return e.each((function(){let e=u(this).offset().top;e=0===e?h(u(this)).y:e,Math.floor(e)===t&&(n=u(this))})),n?{node:n,text:n.find(".vis-inner").first().html()||""}:null}function h(t){const e=(t.css("-webkit-transform")||t.css("-moz-transform")||t.css("-ms-transform")||t.css("-o-transform")||t.css("transform")).replace(/[^0-9\-.,]/g,"").split(","),n=e[12]||e[4],s=e[13]||e[5];return{x:parseFloat(n),y:parseFloat(s)}}function f(t){let e=Math.floor(t.offset().top);const n=m(t,"height"),s=function(t){let e=[],n={},s=[];return t.find(".vis-item:visible").each((function(){let t=m(u(this),"top");const e=h(u(this));t=0===t?e.y:t,-1===u.inArray(t,s)&&s.push(t),n[t]||(n[t]=[]),n[t].push({node:u(this),label:u(this).find(".timeline-tippy").html().trim(),width:m(u(this),"width"),x:e.x,y:e.y,top:t,textColor:!!u(this).css("color")&&u(this).css("color"),backgroundColor:u(this).css("background-color")})})),s.sort((function(t,e){return t>e?1:-1})),u.each(s,(function(t,s){e.push(n[s])})),e}(t);return e=0===e?h(t).y:e,{node:t,top:e,height:n,label:p(e),itemRows:s}}function j(){const t=function(){const t=u(".vis-foreground .vis-group:visible"),e={};return t&&0!==t.length?(t.each((function(){if(u(this).html()){const t=f(u(this));e[t.top]=t}})),e):e}();0!==Object.keys(t).length&&function(t){const e=u("#html").first(),n=u(".vis-timeline").first(),s=u(".vis-time-axis.vis-foreground").first(),i=u(".vis-panel.vis-left").first(),a=s.find(".vis-text.vis-minor:not(.vis-measure)").first(),r=g(t)||!1,o=!!r&&g(r.itemRows),l=!!(o&&o[0]&&o[0].node)&&o[0].node,c=!!l&&l.find(".vis-item-content").first(),d=u(".vis-label:visible").first(),p=u(".vis-current-time"),f=m(d,"width")>0?"true":"false",j=m(n,"width"),v=u("#fit_to_page_width").prop("checked"),y=parseInt(u("#pdf_zoom").val(),10),b=e.data("url-js"),k=e.data("url-css"),w=1550,_=y/100>0?y/100:1,T=v&&w/j>0?w/j:1,z=v?T:_,F=m(l,"font-size"),C=m(l,"line-height"),$=m(s,"height"),O=m(i,"width"),D=m(l,"border-top-width"),S=m(c,"padding-top"),A=m(a,"padding-top"),P=p.length?h(p.first()).x:-1,U="{"+function(t){const e=t.find(".vis-text.vis-minor:not(.vis-measure)").first(),n=h(e).x;return"xAxis: {height: tableXAxisBarHeight,x: "+n+",major: "+function(t){const e=function(t){const e=t.find(".vis-text.vis-major:not(.vis-measure)");let n=[];e.each((function(){n.push({node:u(this),x:h(u(this)).x,x_end:!1})})),n.sort((function(t,e){return t.x>e.x?1:-1})),n.reverse();let s=!1;return u(n).each((function(t,e){n[t].x_end=s,s=n[t].x})),n.reverse(),n}(t);let n="";e&&e.length?u.each(e,(function(e,s){const i=s.node.find("div").first().html(),a=x(t,s.x,s.x_end,0===e);n+=(""===n?"":",")+'{text: "'+i+'", x: '+s.x+", minor: "+a+"}"})):n+='{text: "", x: '+majorObject.x+", minor: "+x(t)+"}";return"["+n+"]"}(t)+"}"}(s)+","+function(t){let e="";return u.each(t,(function(t,n){e+=(""===e?"":",")+'{label: "'+n.label.text+'", rows: ['+function(t){let e="";return u.each(t,(function(t,n){e+=(""===e?"":",")+"{items: ["+function(t){let e="";return u.each(t,(function(t,n){e+=(""===e?"":",")+"{x: "+n.x+", width: "+n.width+', text: "'+n.label.trim()+'", top: '+n.top+', textColor: "'+n.textColor+'", backgroundColor: "'+n.backgroundColor+'" }'})),e}(n)+"]}"})),e}(n.itemRows)+"]}"})),"groups: ["+e+"]"}(t)+"}";u("input#html").val(`<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8">\n    <title>Data</title>\n    <script type="application/javascript" src="${b}/jquery-3.5.1.min.js"><\/script>\n    <script type="application/javascript" src="${b}/pdf_printer.js"><\/script>\n    <link rel="stylesheet" type="text/css" href="${k}/pdf_printer.css">\n    <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans">\n  </head>\n  <body>\n    <script type="application/javascript">\n      const pagePrefix = "page_";\n      const pageHeight = 1086;\n      const pageWidth = 1550;\n      const pageScaleFactor = ${z};\n      const backgroundColor = "#fff";\n      const foregroundColor = "#333";\n      const xAxisMinorColor = "#ccc";\n      const xAxisTextColor = "#4d4d4d";\n      const currentTimeColor = "#ff7f6e";\n      const font = "Open Sans";\n      const fontSize = ${F} * pageScaleFactor;\n      const lineHeight = ${C} * pageScaleFactor;\n      const tableXAxisBarHeight = ${$} * pageScaleFactor;\n      const showYAxisBar = ${f};\n      const tableYAxisBarWidth = showYAxisBar ? ${O} * pageScaleFactor : 0;\n      const borderSize = ${D} * pageScaleFactor;\n      const padding = ${S} * pageScaleFactor;\n      const xAxisPadding = ${A} * pageScaleFactor;\n      const currentTimeX = ${P} * pageScaleFactor + tableYAxisBarWidth;\n      const currentTimeThickness = 2 * pageScaleFactor;\n      const pageData = ${U};\n      let pageNumber = 0;\n      let currentHeight = 0;\n      let canvas = null;\n      let context = null;\n\n      drawTimelinePdf();\n    <\/script>\n  </body>\n</html>`)}(t)}function g(t){return function(t,e=0){return t[Object.keys(t)[e]]||null}(t,0)}function x(t,e=!1,n=!1,s=!0){const i=t.find(".vis-text.vis-minor:not(.vis-measure)");let a="";return!1!==n&&(n-=1),u.each(i,(function(){const t=u(this),i=h(t);if(!1!==e){if(s&&!1!==n&&i.x>=n)return!0;if(!s&&(i.x<e||!1!==n&&i.x>=n))return!0}const r=m(t,"width"),o=t.html();a+=(""===a?"":",")+"{x: "+i.x+", width: "+r+', text: "'+o+'"}'})),"["+a+"]"}u(document).ready((function(){const t=u("#modal_pdf");if(t.length){const e=t.find("form").first(),n=u("#fit_to_page_width").first(),s=u("#pdf_zoom").first();n.change((function(){if(u(this).is(":checked"))s.data("original-value",s.val()),s.val(100),s.prop("disabled",!0);else{const t=parseInt(s.data("original-value"),10);s.val(t>0?t:100),s.prop("disabled",!1)}})),e.submit((function(){return j(),!0}))}}));var v=n(74692),y=n(48287).hp;class b extends i.uA{constructor(t){super(t),this.el=v(this.element),this.initTimeline()}initTimeline(){const t=v(this.element).find(".timeline__visualization"),e=t.data("records"),n=y.from(e,"base64"),s=JSON.parse(n);this.injectContrastingColor(s);const i=new a.PG(s);let r=t.data("groups");const l=y.from(r,"base64");r=JSON.parse(l);const c=!!t.data("dashboard"),u=v("body").data("layout-identifier"),m={margin:{item:{horizontal:-1}},moment:function(t){return o()(t).utc()},clickToUse:c,zoomFriction:10,template:d().templates.timelineitem,orientation:{axis:"both"}};t.data("min")&&(m.start=t.data("min")),t.data("max")&&(m.end=t.data("max")),t.data("width")&&(m.width=t.data("width")),t.data("height")&&(m.width=t.data("height")),t.data("rewind")||(m.editable={add:!1,updateTime:!0,updateGroup:!1,remove:!1},m.multiselect=!0);const p=new a.Kf(t.get(0),i,m);r.length>0&&p.setGroups(r);let h=!0;const f=this;let j,g;p.on("changed",(function(t){h&&(f.setupTippy(),h=!1)})),p.on("rangechanged",(function(e){if(!e.byUser)return g||(g=e.start.getTime()),void(j||(j=e.end.getTime()));if(e.start.getTime()>g&&e.end.getTime()<j)return void b(e);t.prev(".timeline__loader").show();let n=i.min("start");n=i.max("start");const s=n?new Date(n.start):void 0;n=i.min("end");const a=n?new Date(n.end):void 0;a&&!n.has_time&&a.setDate(a.getDate()-1),n=i.max("end"),n=i.min("single");const r=n?new Date(n.single):void 0;n=i.max("single");const o=n?new Date(n.single):void 0,l={};let c,d;l.min=a&&r?a<r?a:r:a||r,l.max=s&&o?s>o?s:o:s||o,l.min||(c=e.start.getTime(),d=e.end.getTime(),k(c,d)),e.start<l.min&&(c=e.start.getTime(),d=l.min.getTime(),k(c,d,"to")),e.end>l.max&&(c=l.max.getTime(),d=e.end.getTime(),k(c,d,"from")),(!j||j<e.end.getTime())&&(j=e.end.getTime()),(!g||g>e.start.getTime())&&(g=e.start.getTime()),t.prev(".timeline__loader").hide(),b(e)}));const x=v("body").data("csrf-token");function b(t){c||v.post({url:"/"+u+"/data_timeline?",data:"from="+t.start.getTime()+"&to="+t.end.getTime()+"&csrf_token="+x})}function k(e,n,s){let a="/"+u+"/data_timeline/10?from="+e+"&to="+n+"&exclusive="+s;c&&(a=a+"&dashboard=1&view="+t.data("view")),v.ajax({async:!1,url:a,dataType:"json",success:function(t){i.add(t)}})}return v("#tl_group").on("change",(function(){v(this).find(":selected").data("fixedvals")?v("#tl_all_group_values_div").show():v("#tl_all_group_values_div").hide()})).trigger("change"),p}setupTippy(){this.el.find("[data-tippy-content]").each(((t,e)=>{const n=new l.A(e),s=e.closest(".vis-group");n.initTippy(s)}))}snapToDay(t){const e=t.getUTCFullYear(),n=("0"+(t.getUTCMonth()+1)).slice(-2),s=("0"+t.getUTCDate()).slice(-2);return o().utc(""+e+n+s)}injectContrastingColor(t){const e=this;t.forEach((function(t){if(t.style&&"string"==typeof t.style){const n=t.style.match(/background-color:\s(#[0-9A-Fa-f]{6})/);if(n&&n[1]){const s=n[1];"dark"===e.lightOrDark(s)&&(t.style=`\n                ${t.style};\n                color: #FFFFFF;\n                text-shadow:-1px -1px 0.1em ${s},\n                  1px -1px 0.1em ${s},\n                  -1px 1px 0.1em ${s},\n                  1px 1px 0.1em ${s},\n                  1px 1px 2px ${s},\n                  0 0 1em ${s},\n                  0 0 0.2em ${s};`)}}}))}lightOrDark(t){const e=+("0x"+t.slice(1).replace(t.length<5&&/./g,"$&$&")),n=e>>16,s=e>>8&255,i=255&e;return Math.sqrt(n*n*.299+s*s*.587+i*i*.114)>150?"light":"dark"}}const k=b},35358:(t,e,n)=>{var s={"./af":25177,"./af.js":25177,"./ar":61509,"./ar-dz":41488,"./ar-dz.js":41488,"./ar-kw":58676,"./ar-kw.js":58676,"./ar-ly":42353,"./ar-ly.js":42353,"./ar-ma":24496,"./ar-ma.js":24496,"./ar-ps":6947,"./ar-ps.js":6947,"./ar-sa":82682,"./ar-sa.js":82682,"./ar-tn":89756,"./ar-tn.js":89756,"./ar.js":61509,"./az":95533,"./az.js":95533,"./be":28959,"./be.js":28959,"./bg":47777,"./bg.js":47777,"./bm":54903,"./bm.js":54903,"./bn":61290,"./bn-bd":17357,"./bn-bd.js":17357,"./bn.js":61290,"./bo":31545,"./bo.js":31545,"./br":11470,"./br.js":11470,"./bs":44429,"./bs.js":44429,"./ca":7306,"./ca.js":7306,"./cs":56464,"./cs.js":56464,"./cv":73635,"./cv.js":73635,"./cy":64226,"./cy.js":64226,"./da":93601,"./da.js":93601,"./de":77853,"./de-at":26111,"./de-at.js":26111,"./de-ch":54697,"./de-ch.js":54697,"./de.js":77853,"./dv":60708,"./dv.js":60708,"./el":54691,"./el.js":54691,"./en-au":53872,"./en-au.js":53872,"./en-ca":28298,"./en-ca.js":28298,"./en-gb":56195,"./en-gb.js":56195,"./en-ie":66584,"./en-ie.js":66584,"./en-il":65543,"./en-il.js":65543,"./en-in":9033,"./en-in.js":9033,"./en-nz":79402,"./en-nz.js":79402,"./en-sg":43004,"./en-sg.js":43004,"./eo":32934,"./eo.js":32934,"./es":97650,"./es-do":20838,"./es-do.js":20838,"./es-mx":17730,"./es-mx.js":17730,"./es-us":56575,"./es-us.js":56575,"./es.js":97650,"./et":3035,"./et.js":3035,"./eu":3508,"./eu.js":3508,"./fa":119,"./fa.js":119,"./fi":90527,"./fi.js":90527,"./fil":95995,"./fil.js":95995,"./fo":52477,"./fo.js":52477,"./fr":85498,"./fr-ca":26435,"./fr-ca.js":26435,"./fr-ch":37892,"./fr-ch.js":37892,"./fr.js":85498,"./fy":37071,"./fy.js":37071,"./ga":41734,"./ga.js":41734,"./gd":70217,"./gd.js":70217,"./gl":77329,"./gl.js":77329,"./gom-deva":32124,"./gom-deva.js":32124,"./gom-latn":93383,"./gom-latn.js":93383,"./gu":95050,"./gu.js":95050,"./he":11713,"./he.js":11713,"./hi":43861,"./hi.js":43861,"./hr":26308,"./hr.js":26308,"./hu":90609,"./hu.js":90609,"./hy-am":17160,"./hy-am.js":17160,"./id":74063,"./id.js":74063,"./is":89374,"./is.js":89374,"./it":88383,"./it-ch":21827,"./it-ch.js":21827,"./it.js":88383,"./ja":23827,"./ja.js":23827,"./jv":89722,"./jv.js":89722,"./ka":41794,"./ka.js":41794,"./kk":27088,"./kk.js":27088,"./km":96870,"./km.js":96870,"./kn":84451,"./kn.js":84451,"./ko":63164,"./ko.js":63164,"./ku":98174,"./ku-kmr":6181,"./ku-kmr.js":6181,"./ku.js":98174,"./ky":78474,"./ky.js":78474,"./lb":79680,"./lb.js":79680,"./lo":15867,"./lo.js":15867,"./lt":45766,"./lt.js":45766,"./lv":69532,"./lv.js":69532,"./me":58076,"./me.js":58076,"./mi":41848,"./mi.js":41848,"./mk":30306,"./mk.js":30306,"./ml":73739,"./ml.js":73739,"./mn":99053,"./mn.js":99053,"./mr":86169,"./mr.js":86169,"./ms":73386,"./ms-my":92297,"./ms-my.js":92297,"./ms.js":73386,"./mt":77075,"./mt.js":77075,"./my":72264,"./my.js":72264,"./nb":22274,"./nb.js":22274,"./ne":8235,"./ne.js":8235,"./nl":92572,"./nl-be":43784,"./nl-be.js":43784,"./nl.js":92572,"./nn":54566,"./nn.js":54566,"./oc-lnc":69330,"./oc-lnc.js":69330,"./pa-in":29849,"./pa-in.js":29849,"./pl":94418,"./pl.js":94418,"./pt":79834,"./pt-br":48303,"./pt-br.js":48303,"./pt.js":79834,"./ro":24457,"./ro.js":24457,"./ru":82271,"./ru.js":82271,"./sd":1221,"./sd.js":1221,"./se":33478,"./se.js":33478,"./si":17538,"./si.js":17538,"./sk":5784,"./sk.js":5784,"./sl":46637,"./sl.js":46637,"./sq":86794,"./sq.js":86794,"./sr":45719,"./sr-cyrl":3322,"./sr-cyrl.js":3322,"./sr.js":45719,"./ss":56e3,"./ss.js":56e3,"./sv":41011,"./sv.js":41011,"./sw":40748,"./sw.js":40748,"./ta":11025,"./ta.js":11025,"./te":11885,"./te.js":11885,"./tet":28861,"./tet.js":28861,"./tg":86571,"./tg.js":86571,"./th":55802,"./th.js":55802,"./tk":59527,"./tk.js":59527,"./tl-ph":29231,"./tl-ph.js":29231,"./tlh":31052,"./tlh.js":31052,"./tr":85096,"./tr.js":85096,"./tzl":79846,"./tzl.js":79846,"./tzm":81765,"./tzm-latn":97711,"./tzm-latn.js":97711,"./tzm.js":81765,"./ug-cn":48414,"./ug-cn.js":48414,"./uk":16618,"./uk.js":16618,"./ur":57777,"./ur.js":57777,"./uz":57609,"./uz-latn":72475,"./uz-latn.js":72475,"./uz.js":57609,"./vi":21135,"./vi.js":21135,"./x-pseudo":64051,"./x-pseudo.js":64051,"./yo":82218,"./yo.js":82218,"./zh-cn":52648,"./zh-cn.js":52648,"./zh-hk":1632,"./zh-hk.js":1632,"./zh-mo":31541,"./zh-mo.js":31541,"./zh-tw":50304,"./zh-tw.js":50304};function i(t){var e=a(t);return n(e)}function a(t){if(!n.o(s,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return s[t]}i.keys=function(){return Object.keys(s)},i.resolve=a,t.exports=i,i.id=35358}}]);