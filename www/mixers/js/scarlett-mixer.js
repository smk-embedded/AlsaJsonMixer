"use strict";function scarletteCapture(a,b){function c(c,d,e,f){c.matrixSourcesPool=[],c.matrixRoutesPool=[],c.updatePool=function(a,b,c){a[b].used=c;for(var d=0;d<a[b].options.length;d++)a[b].options[d].disabled=c},c.takeLinePool=function(a,b,d){d!==b.value&&c.callback([b.numid],[d]),0==d||a[d].used||c.updatePool(a,d,!0)},c.freeLinePool=function(b,d,e){a.log("free pool",d),0!=e&&c.updatePool(b,e,!1),0!=e&&c.callback([d.numid],[0])},c.ProcessRouteSource=function(a){var b={name:a.name+" numid="+a.numid,actif:a.actif,numid:a.numid,value:a.value[0],line:a};return b},c.ProcessFader=function(a,b,c,d){var e={name:a.name+" numid="+a.numid,channel:{numid:a.numid,actif:a.actif,idxin:b,idxout:c,mixgrp:d},ctrl:{value:a.value,notLess:a.ctrl.min,notMore:a.ctrl.max,byStep:a.ctrl.step}};return e},c.initWidget=function(a){if(a){for(var b=[],d=[],e=[],f=a.sources[1].ctrl.enums,g=0;g<f.length;g++)c.matrixSourcesPool.push({id:g,name:f[g],used:!1,options:[]});for(var g=0;g<a.sources.length;g+=c.faderGroup){for(var h=[],i=[],j=[],k=0;k<c.faderGroup;k++)j.push(g+k+1),i.push(a.sources[g+k].numid),h.push(c.ProcessRouteSource(a.sources[g+k]));var l={uid:"Numid"+JSON.stringify(i),label:"Line "+JSON.stringify(j),name:"Capture Source "+JSON.stringify(j),matrixLinesPool:c.matrixSourcesPool,lines:h};b.push(l)}for(var m=a.routes[1].ctrl.enums,g=0;g<m.length;g++)c.matrixRoutesPool.push({id:g,name:m[g],used:!1,options:[]});for(var g=0;g<a.routes.length;g+=+c.faderGroup){for(var h=[],i=[],j=[],k=0;k<c.faderGroup;k++)j.push(g+k+1),i.push(a.routes[g+k].numid),h.push(c.ProcessRouteSource(a.routes[g+k]));var l={uid:"Numid"+JSON.stringify(i),label:"Route "+JSON.stringify(j),name:"Playback Route "+JSON.stringify(j),matrixLinesPool:c.matrixRoutesPool,lines:h};d.push(l)}for(var g=0;g<a.mixes.length;g+=c.mixerGroup){for(var n=[],o=[],k=0;k<c.mixerGroup;k++)n.push(a.mixes[g+k].name);for(var k=0;k<a.mixes[g].volumes.length;k+=c.faderGroup){for(var p=[],q=k;q<k+c.faderGroup;q++){for(var r=[],s=g;s<g+c.mixerGroup;s++)r.push(c.ProcessFader(a.mixes[s].volumes[q],q-k,s-g,g));p.push(r)}o.push(p)}var l={name:"Mix:"+n.toString(),mixvol:o};e.push(l)}c.matrixSources=b,c.matrixRoutes=d,c.matrixMixVols=e}},c.TabSelected=function(a){var d=a*c.mixerGroup;b.refreshPool(d)},c.MatrixPoolCB={take:function(a,b,d){c.takeLinePool(a,b,d)},free:function(a,b,d){c.freeLinePool(a,b,d)}},c.ActivateCtrlsCB=function(a,b){c.callback(a,[b])},c.mixerGroup=parseInt(e.mixerGroup)||2,c.faderGroup=parseInt(e.faderGroup)||2,c.$watch("initvalues",function(){c.initvalues&&c.initWidget(c.initvalues)})}return{templateUrl:"partials/scarlett-capture.html",scope:{callback:"=",initvalues:"="},restrict:"E",link:c}}function scarlettMaster(a){function b(a,b,c){a.matrixPlaybackPool=[],a.clockSourcesPool=[],a.usbSourcesPool=[],a.idxcounter=1,a.selectElem=b[0].firstChild,a.initWidget=function(b){var c;a.switches=b.switches;for(var d=[],e=0;e<b.volumes.length;e++)d.push(a.ProcessVolume(b.volumes[e],e));a.volumes=d,c=b.sources[0].ctrl.enums;for(var e=0;e<c.length;e++)a.matrixPlaybackPool.push({id:e,name:c[e],used:!1,options:[]});for(var f=[],e=0;e<b.sources.length;e++)f.push(a.ProcessSource(b.sources[e],a.matrixPlaybackPool));a.playSources=f,c=b.switches.clock.ctrl.enums;for(var e=0;e<c.length;e++)a.clockSourcesPool.push({id:e,name:c[e],used:!1,options:[]});a.clockSources=a.ProcessSource(b.switches.clock,a.clockSourcesPool),c=b.switches.usb.ctrl.enums;for(var e=0;e<c.length;e++)a.usbSourcesPool.push({id:e,name:c[e],used:!1,options:[]});a.usbSources=a.ProcessSource(b.switches.usb,a.usbSourcesPool),a.syncstatus=b.switches.syncon.value[0]},a.checkSyncStatus=function(){},a.updatePool=function(a,b,c){a[b].used=c;for(var d=0;d<a[b].options.length;d++)a[b].options[d].disabled=c},a.takeLinePool=function(b,c,d){d!==c.value&&a.callback([c.numid],[d]),0==d||b[d].used||a.updatePool(b,d,!0)},a.freeLinePool=function(b,c,d){d!==c.value&&a.updatePool(b,d,!1),0!=d&&a.callback([c.numid],[0])},a.ProcessSource=function(a,b){var c=a.name.split(" "),d={label:c[1]+"-"+c[2],uid:"SrcId:"+a.numid,matrixLinesPool:b,lines:[{actif:a.actif,numid:a.numid,name:a.name+" numid="+a.numid,value:a.value[0],line:a}]};return d},a.ProcessVolume=function(a,b){var c={channel:{idx:b,actif:a.actif,count:a.ctrl.count,numid:a.numid,name:a.name+" numid="+a.numid,uid:"VolId:"+a.numid},ctrl:{value:a.value,notLess:a.ctrl.min,notMore:a.ctrl.max,byStep:a.ctrl.step}};return c},a.ActivateCtrlsCB=function(b,c){a.callback([b],c)},a.switchid=c.id|"switch-"+parseInt(1e3*Math.random()),a.$watch("initvalues",function(){a.initvalues&&a.initWidget(a.initvalues)}),a.MatrixPoolCB={take:function(b,c,d){a.takeLinePool(b,c,d)},free:function(b,c,d){a.freeLinePool(b,c,d)}}}return{templateUrl:"partials/scarlett-master.html",scope:{callback:"=",initvalues:"=",syncstatus:"="},restrict:"E",link:b}}function ScarlettController(a,b,c,d,e,f,g){var h=this;h.SessionLabelPool=[],h.SessionLabelName={uid:"session",label:"current-session"},h.SessionLabelInfo={uid:"info",label:void 0},h.GetSessionsList=function(a){var b={request:"session-list",cardid:h.cardid},d=c.get("/jsonapi",{params:b});a>0&&g.reset(),a>1&&h.GetSndControls(),d.error(function(a,b,c){alert("Fail to upload session list [sndcard="+h.cardid+"from AlsaJsonGateway")}),d.success(function(a,b,c,d){return"AJG_message"===a.ajgtype?void("empty"==a.status?e.warning({message:a.info,delay:5e3}):e.error({message:a.info,delay:5e3})):"AJG_sessions"!=a.ajgtype?void alert("AJM:FAIL ScarlettMixerController not a AJG_sessions record sndcard="+h.cardid+", response="+JSON.stringify(a)):void(h.SessionsList=a.data)})},h.SessionLoad=function(a,b){if(a){var d={request:"session-load",cardid:h.cardid,session:a},i=c.get("/jsonapi",{params:d});i.error(function(b,c,d){alert("Fail to upload "+a+" from AlsaJsonGateway")}),i.success(function(a,c,d,i){if(h.sndcard=a.sndcard,"AJG_message"===a.ajgtype)return b.addClass("ajg-error"),b.removeClass("ajg-success"),void("empty"==a.status?e.warning({message:a.info,delay:5e3}):e.error({message:a.info,delay:5e3}));if("AJG_session"!==a.ajgtype)return void alert("AJM:FAIL ScarlettMixerController sndcard="+h.cardid+", response="+JSON.stringify(a));if(b.removeClass("ajg-error"),b.addClass("ajg-success"),a.data)for(var j=0;j<a.data.length;j++){var k=a.data[j];f.setValue(k.numid,k.value)}if(a.info){var l=a.info;if("AJG_infos"!=l.ajgtype||!l.data)return void alert("AJM:FAIL ScarlettMixerController sndcard="+h.cardid+", invalid info="+JSON.stringify(l));for(var j=0;j<l.data.length;j++){var k=l.data[j];g.setValue(k.uid,k.label)}}})}},h.GetSndControls=function(){var a={request:"ctrl-get-all",cardid:h.cardid},b=c.get("/jsonapi",{params:a});b.error(function(a,b,c){alert("Fail to get SndCard's controls from AlsaJsonGateway")}),b.success(function(a,b,c,d){h.sndcard=a.sndcard;var e,f,g,i=[],j=[],k=[],l=[],m=[],n=[],o=[],p=[];if("AJG_ctrls"!=a.ajgtype)return void alert("AJM:FATAL ScarlettMixerController sndcard="+h.cardid+", response="+JSON.stringify(a));for(var q=a.data,r=0;r<q.length;r++){var s=q[r],t=s.name.toLowerCase().split(" ");if("input"===t[0]&&"capture"===t[3]&&i.push(s),"matrix"===t[0]&&"playback"==t[3]&&k.push(s),"matrix"===t[0]&&"mix"===t[2]&&"volume"==t[5]){var u=t[3];j[u]||(j[u]={name:u.toUpperCase(),volumes:[]}),j[u].volumes.push(s)}"master"===t[0]&&"switch"===t[t.length-1]&&l.push(s),"master"===t[0]&&"volume"===t[t.length-1]&&o.push(s),"master"===t[0]&&"enum"===t[t.length-1]&&p.push(s),"input"===t[0]&&"pad"==t[2]&&n.push(s),"input"===t[0]&&"impedance"===t[2]&&m.push(s),"scarlett"===t[0]&&"usb-sync"===t[2]&&(e=s),"sample"===t[0]&&"sync"===t[2]&&(f=s),"sample"===t[0]&&"source"===t[2]&&(g=s)}var v=[];j&&Object.keys(j).forEach(function(a,b){v.push(j[a])},j),h.alsamixer={sources:i,routes:k,mixes:v},h.alsamaster={volumes:o,sources:p,switches:{master:l,pad:n,impedance:m,usb:e,syncon:f,clock:g}}})},h.SessionStore=function(){var a=g.getValue(h.SessionLabelName.uid),b=g.getValue(h.SessionLabelInfo.uid);if(void 0===b){var d=(new Date).toLocaleString(),f="AJG session created at "+d;h.LabelByUid.setValue(h.SessionLabelInfo.uid,f)}var i=g.getPool(),b={ajgtype:"AJG_infos",data:i},j={request:"session-store",cardid:h.cardid,session:a},k=c({method:"POST",url:"/jsonapi",params:j,data:JSON.stringify(b)});k.success(function(a,b,c,d){e.success({message:"Session Store on AlsaJsonGateway",delay:3e3})}),k.error(function(a,b,c){alert("Fail to Store Session onto AlsaJsonGateway status="+a)})},h.checkSyncStatus=function(){var a={request:"ctrl-get-one",cardid:h.cardid,numid:208},b=c.get("/jsonapi",{params:a});b.success(function(a,b,c,d){h.BoardSyncStatus=!a.data||a.data[0]?!1:a.data[0].value[0]})},h.SendAlsaCtrlsCB=function(a,b){var e={request:"ctrl-set-many",cardid:h.cardid,numids:JSON.stringify(a),value:JSON.stringify(b)},f=c.get("/jsonapi",{params:e});207===a[0]&&d(h.checkSyncStatus,1e3),f.success(function(a,b,c,d){}),f.error(function(a,b,c){alert("Fail to send Card Controls to AlsaJsonGateway")})},h.init=function(){h.cardid=b.search().card,h.GetSessionsList(),h.GetSndControls()},h.init()}ngapp.addDirective("scarlettCapture",["$log","CtrlByNumid",scarletteCapture]),ngapp.addDirective("scarlettMaster",["$log",scarlettMaster]),ngapp.addController("ScarlettMixerController",["$log","$location","$http","$timeout","Notification","CtrlByNumid","LabelByUid",ScarlettController]);