(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{42:function(t,e,n){},43:function(t,e,n){"use strict";n.r(e);var r=n(17),c=n.n(r),a=n(8),o=n(4),u=n(2),i=n(0),s=function(t){var e=t.note,n=t.toggle,r=e.important?"make not important":"make important";return Object(i.jsxs)("li",{className:"note",children:[e.content,Object(i.jsx)("button",{onClick:n,children:r})]})},l=function(t){var e=t.message;return null===e?null:Object(i.jsx)("div",{className:"error",children:e})},f=n(3),p=n.n(f),j=n(5),d=n(6),b=n.n(d),h="/api/notes",O={getAll:function(){var t=Object(j.a)(p.a.mark((function t(){var e;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,b.a.get(h);case 2:return e=t.sent,t.abrupt("return",e.data);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),create:function(){var t=Object(j.a)(p.a.mark((function t(e){var n;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,b.a.post(h,e);case 2:return n=t.sent,t.abrupt("return",n.data);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),update:function(){var t=Object(j.a)(p.a.mark((function t(e,n){var r;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,b.a.put("".concat(h,"/").concat(e),n);case 2:return r=t.sent,t.abrupt("return",r.data);case 4:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()},m=function(){var t=Object(u.useState)([]),e=Object(o.a)(t,2),n=e[0],r=e[1],c=Object(u.useState)(""),f=Object(o.a)(c,2),p=f[0],j=f[1],d=Object(u.useState)(!0),b=Object(o.a)(d,2),h=b[0],m=b[1],v=Object(u.useState)(null),x=Object(o.a)(v,2),g=x[0],w=x[1];Object(u.useEffect)((function(){console.log("effect"),O.getAll().then((function(t){console.log("fulfilled"),r(t)}))}),[]),console.log("render",n.length,"notes");var k=h?n:n.filter((function(t){return t.important}));return Object(i.jsxs)("div",{children:[Object(i.jsx)("h1",{children:"Notes"}),Object(i.jsx)(l,{message:g}),Object(i.jsx)("div",{children:Object(i.jsxs)("button",{onClick:function(){return m(!h)},children:["show ",h?"important":"all"]})}),Object(i.jsx)("ul",{children:k.map((function(t){return Object(i.jsx)(s,{note:t,toggle:(e=t.id,function(){var t=n.find((function(t){return t.id===e})),c=Object(a.a)(Object(a.a)({},t),{},{important:!t.important});O.update(e,c).then((function(t){r(n.map((function(n){return n.id===e?t:n}))),w("Note: Added '".concat(c.content,"' to server"))})).catch((function(){w("Note: '".concat(c.content,"' was already deleted from server")),setTimeout((function(){w(null)}),5e3),r(n.filter((function(t){return t.id!==e})))}))})},t.id);var e}))}),Object(i.jsxs)("form",{onSubmit:function(t){t.preventDefault();var e={content:p,date:(new Date).toISOString(),important:Math.random()<.5};""!==p&&O.create(e).then((function(t){console.log(t),r(n.concat(e)),j("")}))},children:[Object(i.jsx)("input",{placeholder:"a new note...",value:p,onChange:function(t){j(t.target.value)}}),Object(i.jsx)("button",{type:"submit",children:"save"})]})]})};n(42);c.a.render(Object(i.jsx)(m,{}),document.getElementById("root"))}},[[43,1,2]]]);
//# sourceMappingURL=main.794fc7bc.chunk.js.map