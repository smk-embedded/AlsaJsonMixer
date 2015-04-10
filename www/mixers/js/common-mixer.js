"use strict";function ajgMasterVolume(a){function b(b,c,d){b.initWidget=function(a){void 0!==a&&(b.volumes=a)},b.setValue=function(c,d){var e=[];if(d){a.log("Master Volume value=%s",c,"handle=",d);for(var f=0;f<d.count;f++)e.push(c);b.callback(d.numid,e)}},b.masterid=d.id|"master-"+parseInt(1e3*Math.random()),b.$watch("initvalues",function(){b.initvalues&&b.initWidget(b.initvalues)})}var c='<div class="master-volume"> <knob-knob ng-repeat="volume in volumes"  title="{{volume.name}}" cbhandle="volume.channel" callback="setValue"   class="master-volume-knob valuecount-{{volume.channel.count}}" initvalues="volume.ctrl"></knob-knob></div>';return{template:c,scope:{callback:"=",initvalues:"="},restrict:"E",link:b}}var ngapp=angular.module("mixer-ui-app",["ngRoute","ui-notification","bzm-range-slider","mm.foundation","ajm-knob-knob","ajm-playback-switch","ajm-mixer-connect","ajm-monitor-gateway","ajm-matrix-route","ajm-matrix-fader","ajm-master-volume"]);ngapp.config(["$routeProvider","$locationProvider","$controllerProvider","$compileProvider","$filterProvider","$provide",function(a,b,c,d,e,f){ngapp.addController=c.register,ngapp.addDirective=d.directive,ngapp.routeProvider=a,ngapp.filterProvider=e,ngapp.provide=f,a.when("/",{templateUrl:"partials/mixer-connect.html"}).when("/scarlett",{templateUrl:"partials/scarlett-mixer.html",controller:"ScarlettMixerController as Scarlett",resolve:{deps:function(a,b){var c=a.defer(),d=["/mixers/dev/ScarlettMasterMod.js","/mixers/dev/ScarlettMixerMod.js","/mixers/dev/ScarlettCaptureMod.js"];return $script(d,function(){b.$apply(function(){c.resolve()})}),c.promise}}}).when("/scarlett-18i8-usb",{redirectTo:"/scarlett"}).otherwise({redirectTo:"/"})}]);var newModule=angular.module("ajm-knob-knob",[]);newModule.directive("knobKnob",["$log",function(a){function b(a,b,c,d){a.initWidget=function(b){void 0!==b&&(b.notMore&&(a.range=b.notMore-(b.notLess||0)),a.handle||(a.handle=b),a.setValue(a.initvalues.value,void 0))},a.setValue=function(b,c){if(!isNaN(b)){a.value=b;var d=a.value/a.range*360;a.rotate(d),c&&a.callback&&a.callback(b,a.cbhandle)}},a.rotate=function(b){var c=b%360;a.knobtop.css("transform","rotate("+c+"deg)")},a.toggleState=function(){a.actif?(a.actif=!1,b.removeClass("button-actif")):(a.actif=!0,b.addClass("button-actif"))},a.mouseEnter=function(b){a.enter=b?!0:!1},a.knobid=c.id|"knob-"+parseInt(1e3*Math.random()),a.knobtop=b.find("i"),a.notLess=c.notLess||0,a.notMore=c.notMore||100,a.range=a.notMore-a.notLess,a.masterid=c.id|"master-"+parseInt(1e3*Math.random()),a.$watch("initvalues",function(){a.initvalues&&a.initWidget(a.initvalues)})}var c='<div class="knob-knob" ng-mouseover="mouseEnter(1)" ng-mouseleave="mouseEnter(0)" ng-mousedown="toggleState()"> <i class="top"></i><div class="base"></div><range-slider ng-show="actif || enter" formatter="setValue" callback="setValue" initvalues="initvalues"></range-slider><span class="display-value">{{value}} </span></div>';return{template:c,scope:{callback:"=",initvalues:"=",inithook:"=",cbhandle:"="},restrict:"E",link:b}}]);var newModule=angular.module("ajm-master-volume",[]);newModule.directive("masterVolume",["$log",ajgMasterVolume]);var newModule=angular.module("ajm-matrix-fader",[]);newModule.directive("matrixFader",["$log","$timeout",function(a,b){function c(b,c,d,e){b.prefad=[],b.initWidget=function(a){if(a){var c=a[0],d=(c[0].notMore-c[0].notLess)/2;2==c[0].length&&(b.stereo=!0),b.BalanceModel={value:0,notMore:d/2,notLess:-1*d/2},b.MixerModel=a,b.ctrlById=[],b.sliderById=[],b.syncMix=[];for(var e=(2===a.length,2===a[0].length),f=0;f<a.length;f++){e&&(b.syncMix[f]=!0);for(var g=a[f],h=0;h<g.length;h++){{g[h]}b.ctrlById[g[h].channel.numid]=g[h].ctrl}}}},b.StereoMix=function(a,c){var d=angular.element(a.target);if(b.syncMix[c])b.syncMix[c]=!1,d.removeClass("pfl-button-actif"),Object.keys(b.sliderById).forEach(function(a,d){var e=b.sliderById[a].getCbHandle(),f=b.sliderById[a];e.idxin===c&&(f.updateClass("not-sync",!0),0!==e.idxout&&f.setDisable(!1))},b.sliderById);else{b.syncMix[c]=!0;var e=0;Object.keys(b.sliderById).forEach(function(a,d){var f=b.sliderById[a].getCbHandle(),g=b.sliderById[a];f.idxin===c&&(b.sliderById[a].updateClass("not-sync",!1),0==f.idxout?e=g.getValue():(g.setDisable(!0),g.setValue(e)))},b.sliderById),d.addClass("pfl-button-actif")}},b.SliderInit=function(a){var c=a.getCbHandle();b.sliderById[c.numid]=a},b.FaderSliderCB=function(c,d){var e=[];if(void 0==d)return c;if(b.prefad.PFLM)Object.keys(b.sliderById).forEach(function(a,d){var f=b.sliderById[a].getCbHandle(),g=b.sliderById[a];g.setValue(c),e.push(f.numid)},b.sliderById);else{var f=d.getCbHandle();if(e.push(f.numid),a.log("FaderSliderCB numid=",f.numid," value=",c,"handle=",f),b.syncMix[f.idxin]){var g=b.sliderById[f.numid+1];g.setValue(c),e.push(f.numid+1)}}return b.callback(e,c),c},b.PreFader=function(a,c){var d=angular.element(a.target);b.prefad[c]?(b.prefad[c]=!1,d.removeClass("pfl-button-actif")):(b.prefad[c]=!0,d.addClass("pfl-button-actif"))},b.knobResetCB=function(){b.rightBalanceModel=b.leftBalanceModel={value:0},b.rightBalanceModel=b.leftBalanceModel={value:0},b.actifKnob&&(b.actifKnob.toggleState(),b.actifKnob=null,b.sliderBalanceModel={disabled:!0})},b.knobToggleCB=function(a){a.toggleState()?(b.actifKnob&&b.actifKnob.toggleState(),b.actifKnob=a,b.sliderBalanceModel={disabled:!1,value:a.value}):(b.sliderBalanceModel={disabled:!0},b.actifKnob=!1)},b.inputid=d.id||"analog-in-"+parseInt(1e3*Math.random()),b.name=d.name||"NoName",b.label=d.label||"NoLabel",b.switchid=d.id|"switch-"+parseInt(1e3*Math.random()),b.$watch("initvalues",function(){b.initvalues&&b.initWidget(b.initvalues)})}return{templateUrl:"partials/matrix-fader.html",scope:{callback:"=",initvalues:"="},restrict:"E",link:c}}]);var newModule=angular.module("ajm-matrix-route",[]);newModule.directive("lineInput",["$log","$timeout",function(a,b){function c(a,b){var c=e.cloneNode(!1);return b.appendChild(c),c.label=a.name,c.textContent=a.name,c.value=a.id,c}function d(a,b,d){a.selectElem=b[0].firstChild,a.initWidget=function(b){a.channel=b,a.selection=b.value,a.selectElem.value=b.value},a.$watch("matrixLinesPool",function(){for(var d=b[0].firstChild,e=0;e<a.matrixLinesPool.length;e++){var f=c(a.matrixLinesPool[e],d);a.matrixLinesPool[e].options.push(f),a.matrixLinesPool[e].used?f.disabled=!0:a.channel&&a.channel.value===e&&(a.callback(a.channel,e,!0),f.selected=!0)}}),a.selected=function(){return a.selection=a.selectElem.value,void 0!==a.selection?a.matrixLinesPool[a.selection].used?void(a.selection=a.channel.value):void a.callback(a.channel,a.selection):void 0},a.$watch("initvalues",function(){a.initvalues&&a.initWidget(a.initvalues)})}var e=document.createElement("option"),f='<select title="{{channel.name}}" title={{channel.name}} class="ajm-stereo-input-linein" ng-click="selected()"></select>';return{template:f,scope:{channel:"=",callback:"=",matrixLinesPool:"=",initvalues:"="},restrict:"E",link:d}}]),newModule.directive("matrixRoute",["$log","$timeout",function(a,b){function c(a,b,c,d){a.leftLine="",a.rightLine="",a.prefad=[],a.initWidget=function(b){b&&(a.MatrixLines=b.lines,a.label=b.label,a.matrixLinesPool=b.matrixLinesPool)},a.selected=function(b,c,d){b&&(d||a.callback.free(b,c),a.callback.take(b,c),b.value=c)},a.init=function(){a.inputid=c.id||"matrix-"+parseInt(1e3*Math.random()),a.name=c.name||"NoName",a.label=c.label||"NoLabel",a.route=c.route||!1,a.source=c.source||!1,a.initvalues&&a.initWidget(a.initvalues)},a.init()}var d='<div class="small-1 columns ajm-stereo-input"><input ng-show="route" type="text" class="ajm-stereo-input-linein" value="{{label}}"><div class="ajm-matrix-volume-fader" ng-repeat="line in MatrixLines"><line-input class="ajm-select-{{$index}}"  matrix-lines-pool="matrixLinesPool" initvalues=line  callback="selected"></line-input></div><input ng-show="source" type="text" class="ajm-stereo-input-linein" value="{{label}}"></div>';return{template:d,scope:{callback:"=",initvalues:"="},restrict:"E",link:c}}]);var newModule=angular.module("ajm-mixer-connect",[]);newModule.directive("mixerConnect",["$log","$timeout","$http","$location","$route",function(a,b,c,d,e){function f(a,b,f){a.getCards=function(){var b={request:"card-get-all"},d=c.get("/jsonapi",{params:b});d.success(function(b,c,d,e){return"AJG_sndlist"!=b.ajgtype?void alert("AJM:FATAL ajm-mixer-connect response="+b):(a.online=1,void(a.sndcards=b.data))}),d.error(function(b,c,d){a.online=0})},a.selectCard=function(b){if(void 0==b)return void alert("AJM:Fatal invalid sndcard index [please report bug]");var c="/"+a.sndcards[b].name.toLowerCase().replace(/ /g,"-");!c in e.routes&&(c="/generic"),d.path(c).search("card","hw:"+a.sndcards[b].cardid)},a.title=f.title||"Sound Cards @ Gateway",a.icon=f.icon,a.getCards()}var g='<div class="ajm-mixer-connect"><div><i class="ajm-connect-title">{{title}}<i><ajm-monitor-status class="ajm-connect-status" icon={{icon}}"></ajm-monitor-status></div><div  ng-repeat="sndcard in sndcards"><div  title="{{sndcard.info}}"  ng-click="selectCard($index)"><div class="row ajm-connect-sndcard"><div class="small-10 columns"><span class="ajm-connect-name"> {{sndcard.name}} </span></div><div class="small-1 columns"><span class="ajm-connect-uid">  {{sndcard.uid}}  </span></div></div></div></div></div>';return{template:g,scope:{},restrict:"E",link:f}}]);var newModule=angular.module("ajm-monitor-gateway",[]);newModule.directive("ajgMonitorStatus",["$log","$timeout","$http","$location","Notification",function(a,b,c,d,e){function f(a){this.pingrate=1e3*a,this.elems=[],this.status;var d=this;this.register=function(a){this.elems.push(a),this.status?(a.addClass("ajm-online"),a.removeClass("ajm-offline")):(a.addClass("ajm-offline"),a.removeClass("ajm-online"))},this.online=function(){for(var a=0;a<this.elems.length;a++)this.elems[a].addClass("ajm-online"),this.elems[a].removeClass("ajm-offline")},this.offline=function(){for(var a=0;a<this.elems.length;a++)this.elems[a].addClass("ajm-offline"),this.elems[a].removeClass("ajm-online")},this.getping=function(){var a={request:"ping-get"},f=c.get("/jsonapi",{params:a});f.success(function(a,b,c,f){d.status||(e.success({message:"Alsa Server Back to Live",delay:3e3}),d.online()),d.status=1}),f.error(function(a,b,c){d.status&&(e.warning({message:"Alsa Server Lost",delay:5e3}),d.offline()),d.status=0}),b(d.getping,d.pingrate)},this.getping()}function g(a,b,c){a.init=function(){a.icon=c.icon||"fa-cog",a.hostname=d.host(),a.httpdport=d.port(),i.register(b)},a.init()}var h='<div class="ajm-monitor"><span class="ajm-monitor-gateway" ng-click="clicked($event)" >alsa://{{hostname}}:{{httpdport}}</span><i class="ajm-monitor-status fa fa-cog"></i></div>',i=new f(30);return{template:h,scope:{callback:"="},restrict:"E",link:g}}]);var newModule=angular.module("ajm-playback-switch",[]);newModule.directive("playbackSwitch",["$log",function(a,b){function c(a,b,c,d){a.initWidget=function(b){var c,d=[];if(void 0!==b){for(c=0;c<b.value.length;c++)d.push(e++);a.indexes=d,a["switch"]=b,a.extraclass=1===c?"playback-switch-master":""}},a.toggleState=function(b,c){var d=angular.element(b.target),e=a["switch"].value;e[c]?(e[c]=!1,d.removeClass("button-actif")):(e[c]=!0,d.addClass("button-actif")),a.callback(a["switch"].numid,a["switch"].value)},a.switchid=c.id|"switch-"+parseInt(1e3*Math.random()),a.$watch("initvalues",function(){a.initvalues&&a.initWidget(a.initvalues)})}var d='<div class="playback-switch" title="{{switch.name}}">   <span ng-repeat="count in indexes" ng-click="toggleState($event, $index)" class="playback-switch-button {{extraclass}}">{{count}}</span></div>',e=1;return{template:d,scope:{callback:"=",initvalues:"="},restrict:"E",link:c}}]);