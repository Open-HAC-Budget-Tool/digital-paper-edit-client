(this["webpackJsonp@pietrop/digital-paper-edit-client"]=this["webpackJsonp@pietrop/digital-paper-edit-client"]||[]).push([[6],{247:function(e,t,a){"use strict";a.r(t);var n=a(82),r=a.n(n),c=a(79),l=a(0),o=a.n(l),i=a(108),s=a.n(i),d=a(241),m=a(237),u=a(239),p=a(246),E=a(242),b=a(211),f=a(206),h=a(244),k=a(238),y=a(205),x=a.n(y),v=a(243),w=a(249),g=a(116),O=a.n(g),j=(a(119),a(75)),T=a(9),S=a(210),C=a(204),D=a(240),N=a(209),_=a(163),A=a.n(_),P=a(164),F=a.n(P),B=a(120),R=a(160),L=a.n(R),U=a(162),W=a.n(U);var I=function(e){var t=e.handleExport,a=e.optionalBtns,n=e.handleSetEditable,r=e.isEditable,i=e.isProcessing,s=Object(l.useState)(null),d=Object(c.a)(s,2),m=d[0],u=d[1],E=function(){u(null)};return o.a.createElement("div",{className:"side-buttons"},o.a.createElement(w.a,{title:'\n            Double click on a word to jump to the corresponding point in the media.\n\n            To find key words in transcript, click on "Edit" and "Find" or "Find in Page" in your browser\'s toolbar.\n            '},o.a.createElement("button",{color:"primary"},o.a.createElement(L.a,null))),o.a.createElement(w.a,{title:" Turn ".concat(r?"off":"on"," edit mode.  You can edit before exporting the transcript.")},o.a.createElement("button",{disabled:i,onClick:n},o.a.createElement(W.a,{color:r?"secondary":"white"}))),o.a.createElement(w.a,{title:"Export options"},o.a.createElement("button",{"aria-controls":"simple-menu","aria-haspopup":"true",onClick:function(e){u(e.currentTarget)}},o.a.createElement(A.a,null)," ",o.a.createElement(F.a,null))),o.a.createElement(N.a,{id:"simple-menu",anchorEl:m,keepMounted:!0,open:Boolean(m),onClose:E},o.a.createElement(p.a,{onClick:E,disabled:!0},o.a.createElement(k.a,{style:{color:"black"}},"Text Export")),o.a.createElement(p.a,{onClick:function(){t({type:"text",ext:"txt",speakers:!1,timecodes:!1,isDownload:!0}),E()}},o.a.createElement(k.a,{color:"primary"},"Text (",o.a.createElement("code",null,".txt"),")")),o.a.createElement(p.a,{onClick:function(){t({type:"text",ext:"txt",speakers:!0,timecodes:!1,isDownload:!0}),E()}},o.a.createElement(k.a,{color:"primary"},"Text (Speakers)")),o.a.createElement(p.a,{onClick:function(){t({type:"text",ext:"txt",speakers:!1,timecodes:!0,isDownload:!0}),E()}},o.a.createElement(k.a,{color:"primary"},"Text (Timecodes)")),o.a.createElement(p.a,{onClick:function(){t({type:"text",ext:"txt",speakers:!0,timecodes:!0,isDownload:!0}),E()}},o.a.createElement(k.a,{color:"primary"}," Text (Speakers & Timecodes)")),o.a.createElement(p.a,{onClick:function(){t({type:"text",ext:"txt",speakers:!0,timecodes:!0,atlasFormat:!0,isDownload:!0}),E()}},o.a.createElement(k.a,{color:"primary"}," Text (Atlas format)")),o.a.createElement(D.a,null),o.a.createElement(p.a,{onClick:function(){t({type:"word",ext:"docx",speakers:!1,timecodes:!1,isDownload:!0}),E()}},o.a.createElement(k.a,{color:"primary"}," ","Word (",o.a.createElement("code",null,".docx"),")")),o.a.createElement(p.a,{onClick:function(){t({type:"word",ext:"docx",speakers:!0,timecodes:!1,isDownload:!0}),E()}},o.a.createElement(k.a,{color:"primary"}," Word (Speakers)")),o.a.createElement(p.a,{onClick:function(){t({type:"word",ext:"docx",speakers:!1,timecodes:!0,isDownload:!0}),E()}},o.a.createElement(k.a,{color:"primary"}," Word (Timecodes)")),o.a.createElement(p.a,{onClick:function(){t({type:"word",ext:"docx",speakers:!0,timecodes:!0,isDownload:!0}),E()}},o.a.createElement(k.a,{color:"primary"}," Word (Speakers & Timecodes)")),o.a.createElement(p.a,{onClick:function(){t({type:"word",ext:"docx",speakers:!1,timecodes:!1,inlineTimecodes:!0,hideTitle:!0}),E()}},o.a.createElement(k.a,{color:"primary"}," Word (OHMS)")),o.a.createElement(D.a,null),o.a.createElement(p.a,{onClick:E,disabled:!0},o.a.createElement(k.a,{style:{color:"black"}},"Closed Captions Export")),B.a.map((function(e,a){var n=e.type,r=e.label,c=e.ext;return o.a.createElement(p.a,{key:a+r,onClick:function(){t({type:n,ext:c,isDownload:!0}),E()}},o.a.createElement(k.a,{color:"primary"},r," (",o.a.createElement("code",null,".",c),")"))})),o.a.createElement(D.a,null),o.a.createElement(p.a,{onClick:E,disabled:!0},o.a.createElement(k.a,{style:{color:"black"}},"Developer options")),o.a.createElement(p.a,{onClick:function(){t({type:"json-slate",ext:"json",speakers:!0,timecodes:!0,isDownload:!0}),E()}},o.a.createElement(k.a,{color:"primary"},"SlateJs (",o.a.createElement("code",null,".json"),")")),o.a.createElement(p.a,{onClick:function(){t({type:"json-digitalpaperedit",ext:"json",speakers:!0,timecodes:!0,isDownload:!0}),E()}},o.a.createElement(k.a,{color:"primary"},"DPE (",o.a.createElement("code",null,".json"),")"))),a)},z=a(81),J=a(165),M=a(212),G=a(166),V=a(167),H=(a(168),a(96)),K=a(208),X=a(95),Y=a(207),q=[.2,.25,.5,.75,1,1.25,1.5,1.75,2,2.25,2.5,3,3.5],Q=o.a.createRef();var Z=O()((function(e){e.play()}),1500);function $(e){var t=this,a=Object(l.useState)(0),n=Object(c.a)(a,2),i=n[0],y=n[1],g=Object(l.useState)(0),O=Object(c.a)(g,2),D=O[0],N=O[1],_=Object(l.useState)(1),A=Object(c.a)(_,2),P=A[0],F=A[1],B=Object(l.useMemo)((function(){return Object(S.d)(Object(C.a)(Object(j.i)()))}),[]),R=Object(l.useState)([]),L=Object(c.a)(R,2),U=L[0],W=L[1],$="boolean"!==typeof e.showSpeakers||e.showSpeakers,ee="boolean"!==typeof e.showTimecodes||e.showTimecodes,te=Object(l.useState)($),ae=Object(c.a)(te,2),ne=ae[0],re=(ae[1],Object(l.useState)(ee)),ce=Object(c.a)(re,2),le=ce[0],oe=(ce[1],Object(l.useState)([])),ie=Object(c.a)(oe,2),se=ie[0],de=ie[1],me=Object(l.useState)(!1),ue=Object(c.a)(me,2),pe=ue[0],Ee=ue[1],be=Object(l.useState)(null),fe=Object(c.a)(be,2),he=(fe[0],fe[1],Object(l.useState)(!1)),ke=Object(c.a)(he,2),ye=ke[0],xe=(ke[1],Object(l.useState)(!1)),ve=Object(c.a)(xe,2),we=ve[0],ge=ve[1],Oe=Object(l.useState)(!1),je=Object(c.a)(Oe,2),Te=je[0],Se=je[1],Ce=Object(l.useState)(!0),De=Object(c.a)(Ce,2),Ne=De[0],_e=De[1],Ae=Object(l.useState)(e.isEditable,[]),Pe=Object(c.a)(Ae,2),Fe=Pe[0],Be=Pe[1],Re=new URLSearchParams(Object(T.l)().search);Object(l.useEffect)((function(){document.body.style.cursor=we?"wait":"default"}),[we]),Object(l.useEffect)((function(){if(e.transcriptData){var t=Object(M.a)(e.transcriptData);W(t)}}),[e.transcriptData]),Object(l.useEffect)((function(){var e=Object(V.a)("speaker")(U);de(e)}),[U]),Object(l.useEffect)((function(){return Q&&Q.current&&(Q.current.playbackRate=P,Q.current.addEventListener("timeupdate",Ue),Re.get("ts")&&(Q.current.currentTime=Re.get("ts"))),function(){Q.current.removeEventListener("timeupdate",Ue)}}),[e.mediaUrl]),Object(l.useEffect)((function(){}),[i]);var Le=function(){return e.title?e.title:s.a.basename(e.mediaUrl).trim()},Ue=function(e){y(e.target.currentTime),N(Q.current.duration)},We=Object(l.useCallback)((function(e){switch(e.element.type){case"timedText":return o.a.createElement(Je,e);default:return o.a.createElement(Me,e)}}),[]),Ie=Object(l.useCallback)((function(e){var t=e.attributes,a=e.children;e.leaf;return o.a.createElement("p",Object.assign({onDoubleClick:Ge,className:"timecode text transcript","data-start":a.props.parent.start,"data-previous-timings":a.props.parent.previousTimings},t),a)}),[]),ze=function(e){S.b.findPath(B,e),e.speaker},Je=function(e){return ne||le?ne&&!le?(9,9):!ne&&le?(9,10):ne&&le&&(6,7):(12,12),o.a.createElement("div",Object.assign({className:"text-box"},e.attributes),o.a.createElement("div",{className:"top"},le&&o.a.createElement("div",{className:"p-t-2 text-truncate",contentEditable:!1},o.a.createElement("code",{contentEditable:!1,style:{cursor:"pointer"},className:"timecode text-muted unselectable timestamp",onClick:Ge,onDoubleClick:Ge,title:e.element.startTimecode,"data-start":e.element.start},e.element.startTimecode)),ne&&o.a.createElement("div",{className:"p-t-2 text-truncate",contentEditable:!1},o.a.createElement("p",{noWrap:!0,contentEditable:!1,className:"text-truncate text-muted unselectable speaker",style:{cursor:"pointer",width:"100%",textTransform:"uppercase"},title:e.element.speaker,onClick:ze.bind(t,e.element)},e.element.speaker))),o.a.createElement("div",{className:"bottom"},e.children))},Me=function(e){return o.a.createElement("p",e.attributes,e.children)},Ge=function(t){if(t.target.classList.contains("timecode")){var a=t.target.dataset.start;Q&&Q.current&&(Q.current.currentTime=parseFloat(a),Q.current.play(),e.handleAnalyticsEvents&&e.handleAnalyticsEvents("ste_handle_timed_text_click",{fn:"handleTimedTextClick",clickOrigin:"timecode",timeInSeconds:Q.current.currentTime}))}else if(t.target.dataset.slateString&&t.target.parentNode.dataset.start){var n=Y.a.getSelectionNodes(B,B.selection).startWord;if(Q&&Q.current&&n&&n.start)Q.current.currentTime=parseFloat(n.start),Q.current.play(),e.handleAnalyticsEvents&&e.handleAnalyticsEvents("ste_handle_timed_text_click",{fn:"handleTimedTextClick",clickOrigin:"word",timeInSeconds:Q.current.currentTime});else{var r=parseFloat(t.target.parentNode.dataset.start);Q&&Q.current&&r&&(Q.current.currentTime=parseFloat(r),Q.current.play(),e.handleAnalyticsEvents&&e.handleAnalyticsEvents("ste_handle_timed_text_click",{fn:"handleTimedTextClick",origin:"paragraph-fallback",timeInSeconds:Q.current.currentTime}))}}},Ve=function(){var e,t,a,n=arguments;return r.a.async((function(c){for(;;)switch(c.prev=c.next){case 0:if(e=n.length>0&&void 0!==n[0]&&n[0],Te||e){c.next=3;break}return c.abrupt("return",U);case 3:return c.next=5,r.a.awrap(Object(H.b)(U,e));case 5:if(t=c.sent,W(t),Se(!1),!e){c.next=11;break}return a=Object(G.a)(t),c.abrupt("return",a);case 11:return c.abrupt("return",t);case 12:case"end":return c.stop()}}))};return o.a.createElement("main",null,o.a.createElement(d.a,null),o.a.createElement(m.a,{elevation:3}),o.a.createElement("style",{scoped:!0},'/* Next words */\n             .timecode[data-previous-timings*="'.concat(Object(X.a)(i),"\"]{\n                  color:  #9E9E9E;\n              }\n              // NOTE: The CSS is here, coz if you put it as a separate index.css the current webpack does not bundle it with the component\n              /* TODO: Temporary, need to scope this to the component in a sensible way */\n              .editor-wrapper-container {\n                font-family: Roboto, sans-serif;\n              }\n              .editor-wrapper-container {\n                padding: 8px 16px;\n                height: 90vh;\n                overflow: auto;\n              }\n              /* https://developer.mozilla.org/en-US/docs/Web/CSS/user-select\n              TODO: only working in Chrome, not working in Firefox, and Safari - OSX\n              if selecting text, not showing selection\n              Commented out because it means cannot select speakers and timecode anymore\n              which is the intended default behavior but needs to come with export\n              functionality to export as plain text, word etc.. otherwise user won't be able\n              to get text out of component with timecodes and speaker names in the interim */\n              .unselectable {\n                -moz-user-select: none;\n                -webkit-user-select: none;\n                -ms-user-select: none;\n                user-select: none;\n              }\n              .timecode:hover {\n                text-decoration: underline;\n              }\n              .timecode.text:hover {\n                text-decoration: none;\n              }\n          ")),e.showTitle&&o.a.createElement(w.a,{title:e.title},o.a.createElement(u.a,{variant:"h5",noWrap:!0},e.title)),o.a.createElement("div",{className:"body-wrapper"},o.a.createElement("div",{className:"sidebar"},e.mediaUrl&&o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{style:{backgroundColor:"black"}},o.a.createElement("video",{ref:Q,src:e.mediaUrl,width:"100%",height:"auto",controls:!0,playsInline:!0})),o.a.createElement("div",{className:"timer"},o.a.createElement("p",null,o.a.createElement("code",{style:{color:"grey"}},Object(z.a)(i)),o.a.createElement("span",{style:{color:"grey"}}," "," | "),o.a.createElement("code",{style:{color:"grey"}},D?"".concat(Object(z.a)(D)):"00:00:00"),o.a.createElement(w.a,{title:"Seek back by ".concat(10," seconds")},o.a.createElement("button",{style:{border:"none",background:"none",paddingRight:"6px",color:"grey"},onClick:function(){if(Q&&Q.current){var t=Q.current.currentTime-10;Q.current.currentTime=t,e.handleAnalyticsEvents&&e.handleAnalyticsEvents("ste_handle_seek_back",{fn:"handleSeekBack",newCurrentTimeInSeconds:t,seekBackValue:10})}}},o.a.createElement(x.a,null)))),o.a.createElement("div",null,o.a.createElement(E.a,null,o.a.createElement(h.a,{labelId:"demo-simple-select-label",id:"demo-simple-select",value:P,onChange:function(t){var a=P,n=t.target.value,r=parseFloat(n);Q&&Q.current&&(Q.current.playbackRate=r,F(r),e.handleAnalyticsEvents&&e.handleAnalyticsEvents("ste_handle_set_playback_rate",{fn:"handleSetPlaybackRate",previousPlaybackRate:a,newPlaybackRate:r}))}},q.map((function(e,t){return o.a.createElement(p.a,{key:t+e,value:e}," ","x ",e)})))))),o.a.createElement("div",{style:{width:"100%"}},o.a.createElement(f.a,{size:"sm",className:"mb-3"},o.a.createElement(f.a.Prepend,null,o.a.createElement(f.a.Text,{id:"inputGroup-sizing-sm"},"Link at time")),o.a.createElement(b.a,{"aria-label":"Share URL @ time","aria-describedby":"inputGroup-sizing-sm",readOnly:!0,value:function(e){var t=new URL(window.location.toString());return t.search="","".concat(t.toString(),"?ts=").concat(e)}(i)}))),o.a.createElement("div",null,o.a.createElement(k.a,{color:"inherit",onClick:function(){Ee(!pe)}},o.a.createElement(u.a,{variant:"subtitle2",gutterBottom:!0},"Speakers")),o.a.createElement(v.a,{in:pe},se.map((function(e,t){return o.a.createElement(u.a,{variant:"body2",gutterBottom:!0,key:t+e,className:"text-truncate",title:e.toUpperCase()},e)}))))),o.a.createElement("div",null,e.children)),o.a.createElement(I,{handleExport:function(t){var a,n,c,l,o,i,s,d,m,u;return r.a.async((function(p){for(;;)switch(p.prev=p.next){case 0:if(a=t.type,n=t.ext,c=t.speakers,l=t.timecodes,o=t.inlineTimecodes,i=t.hideTitle,s=t.atlasFormat,d=t.isDownload,e.handleAnalyticsEvents&&e.handleAnalyticsEvents("ste_handle_export",{fn:"handleExport",type:a,ext:n,speakers:c,timecodes:l,inlineTimecodes:o,hideTitle:i,atlasFormat:s,isDownload:d}),p.prev=2,ge(!0),m=U,!l){p.next=9;break}return p.next=8,r.a.awrap(Ve());case 8:m=p.sent;case 9:if(!o){p.next=13;break}return p.next=12,r.a.awrap(Ve(o));case 12:m=p.sent;case 13:if(!Te||"json-slate"!==a){p.next=17;break}return p.next=16,r.a.awrap(Ve());case 16:m=p.sent;case 17:if(!Te||"json-digitalpaperedit"!==a){p.next=21;break}return p.next=20,r.a.awrap(Ve());case 20:m=p.sent;case 21:if(!Te||!Object(K.b)(a)){p.next=25;break}return p.next=24,r.a.awrap(Ve());case 24:m=p.sent;case 25:return u=Object(K.a)({slateValue:m,type:a,transcriptTitle:Le(),speakers:c,timecodes:l,inlineTimecodes:o,hideTitle:i,atlasFormat:s}),"json"===n&&(u=JSON.stringify(u,null,2)),"docx"!==n&&d&&Object(J.a)(u,"".concat(Le(),".").concat(n)),p.abrupt("return",u);case 29:return p.prev=29,ge(!1),p.finish(29);case 32:case"end":return p.stop()}}),null,null,[[2,,29,32]])},isEditable:Fe,handleSetEditable:function(){Be(!Fe)},isProcessing:we,isContentModified:Te,isContentSaved:Ne,setIsProcessing:ge,optionalBtns:e.optionalBtns}),o.a.createElement("div",{className:"transcripts"},o.a.createElement("p",{style:{marginBottom:"10px"}},"Double click on a word to jump to the corresponding point in the media."),o.a.createElement("p",{style:{marginBottom:"10px"}},'To find key words in transcript, click on "Edit" and "Find" or "Find in Page" in your browser\'s toolbar.'),0!==U.length?o.a.createElement(o.a.Fragment,null,o.a.createElement(m.a,{elevation:3},o.a.createElement("section",{className:"editor-wrapper-container"},o.a.createElement(S.c,{editor:B,value:U,onChange:function(t){return e.handleAutoSaveChanges&&(e.handleAutoSaveChanges(t),_e(!0)),W(t)}},o.a.createElement(S.a,{readOnly:!1,renderElement:We,renderLeaf:Ie,onKeyDown:function(t){var a;return r.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:if(Fe){n.next=3;break}return t.preventDefault(),n.abrupt("return");case 3:Se(!0),_e(!1),"Enter"===t.key&&(t.preventDefault(),a=Y.a.handleSplitParagraph(B),e.handleAnalyticsEvents&&e.handleAnalyticsEvents("ste_handle_split_paragraph",{fn:"handleSplitParagraph",isSuccess:a}),a&&Se(!1)),"Backspace"===t.key&&Y.a.handleDeleteInParagraph({editor:B,event:t})&&Se(!1),ye&&Q&&Q.current&&!Q.current.paused&&(Q.current.pause(),Z(Q.current));case 8:case"end":return n.stop()}}))}}))))):o.a.createElement("section",{className:"text-center"},"Loading"===e.status&&o.a.createElement("i",{className:"text-center"},"Loading...")||o.a.createElement("i",{className:"text-center"},"Pick a workshop to get started...")))))}t.default=$;$.defaultProps={showTitle:!1,showTimecodes:!0,showSpeakers:!0,autoSaveContentType:"digitalpaperedit",isEditable:!0}}}]);
//# sourceMappingURL=6.cf080de4.chunk.js.map