(this["webpackJsonppomodoro-clock"]=this["webpackJsonppomodoro-clock"]||[]).push([[0],{10:function(e,t,n){},11:function(e,t,n){},12:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n(1),i=n.n(r),s=n(4),u=n.n(s),o=(n(10),n(2));var a=function(e){var t=e.type,n=e.length,r=e.changeTime;return Object(c.jsxs)("div",{className:"".concat(t,"Ctrl"),children:[Object(c.jsxs)("p",{id:"".concat(t,"-label"),children:[t," length"]}),Object(c.jsx)("button",{id:"".concat(t,"-decrement"),className:"minus",onClick:function(){return r(-60,t)},children:"-"}),Object(c.jsx)("span",{id:"".concat(t,"-length"),className:"time",children:n}),Object(c.jsx)("button",{id:"".concat(t,"-increment"),className:"plus",onClick:function(){return r(60,t)},children:"+"})]})};n(11);var l=function(){var e=Object(r.useState)(1500),t=Object(o.a)(e,2),n=t[0],s=t[1],u=Object(r.useState)(300),l=Object(o.a)(u,2),j=l[0],d=l[1],b=Object(r.useState)(1500),f=Object(o.a)(b,2),h=f[0],m=f[1],O=Object(r.useState)(!1),p=Object(o.a)(O,2),g=p[0],x=p[1],v=Object(r.useState)(!1),C=Object(o.a)(v,2),k=C[0],T=C[1],S=Object(r.useRef)(),N=Object(r.useRef)(),y=Object(r.useRef)(),w=Object(r.useRef)(),D=function(){var e=function(e,t){var n,c,r;return n=(new Date).getTime()+t,c=null,r=function(){return n+=t,c=setTimeout(r,n-(new Date).getTime()),e()},{cancel:function(){return clearTimeout(c)},timeoutID:c=setTimeout(r,n-(new Date).getTime())}}((function(){F()}),1e3);y.current=e},F=function(){s((function(e){return N.current=e,e-1})),N.current<=0&&(T((function(e){return w.current=e,!e})),y.current&&(y.current.cancel(),!0===w.current?(N.current=h,I()):!1===w.current&&(N.current=j,I()),s(N.current),D()))},R=function(e,t){if("break"===t){if(j>=3600&&e>0||j<=60&&e<0)return;d((function(t){return t+e}))}else if("session"===t){if(h>=3600&&e>0||h<=60&&e<0)return;m((function(t){return t+e})),g||s(h+e)}},B=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"display";if("display"===t){var n=Math.floor(e/60),c=e%60;return(n<10?"0"+n:n)+":"+(c<10?"0"+c:c)}if("control"===t){var r=Math.ceil(e/60);return r}},I=function(){S.current.currentTime=0,S.current.play()};return Object(c.jsxs)(i.a.Fragment,{children:[Object(c.jsx)("h1",{children:"FreeCodeCamp Pomodoro Clock App"}),Object(c.jsxs)("main",{children:[Object(c.jsx)("header",{children:Object(c.jsxs)("div",{className:"session",children:[Object(c.jsx)(a,{type:"break",length:B(j,"control"),changeTime:R}),Object(c.jsx)(a,{type:"session",length:B(h,"control"),changeTime:R})]})}),Object(c.jsxs)("section",{children:[Object(c.jsxs)("div",{className:"timer",children:[Object(c.jsx)("p",{id:"timer-label",className:"title",children:k?"Break":"Session"}),Object(c.jsx)("p",{id:"time-left",ref:N,children:B(n)}),Object(c.jsx)("span",{className:"fill","ng-style":"{'height':fillHeight, 'background':fillColor }"})]}),Object(c.jsxs)("div",{className:"timer_controls",children:[Object(c.jsx)("button",{id:"start_stop",onClick:function(){g?y.current.timeoutID&&(y.current.cancel(),x(!1)):(x(!0),D())},children:g?"Pause":"Start"}),Object(c.jsx)("button",{id:"reset",onClick:function(){return s(1500),d(300),m(1500),T(!1),x(!1),y.current&&y.current.cancel(),S.current.pause(),void(S.current.currentTime=0)},children:"Reset"})]})]})]}),Object(c.jsx)("audio",{id:"beep",preload:"auto",ref:S,src:"https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"})]})},j=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,13)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,i=t.getLCP,s=t.getTTFB;n(e),c(e),r(e),i(e),s(e)}))};u.a.render(Object(c.jsx)(i.a.StrictMode,{children:Object(c.jsx)(l,{})}),document.getElementById("root")),j()}},[[12,1,2]]]);
//# sourceMappingURL=main.53a8c56e.chunk.js.map