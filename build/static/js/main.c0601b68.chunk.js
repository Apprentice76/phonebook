(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{42:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var r=n(17),c=n.n(r),a=n(8),u=n(4),o=n(2),i=n(0),s=function(e){return Object(i.jsxs)("div",{children:["filter shown with"," ",Object(i.jsx)("input",{value:e.keyword,onChange:e.stateUpdater})]})},d=function(e){var t=e.message,n=e.type;return null===t?null:Object(i.jsx)("div",{className:"".concat(n),children:t})},b=function(e){var t=e.submitAction,n=e.name,r=e.nameUpdater,c=e.number,a=e.numberUpdater;return Object(i.jsxs)("form",{onSubmit:t,children:[Object(i.jsxs)("div",{children:["name: ",Object(i.jsx)("input",{value:n,onChange:r})]}),Object(i.jsxs)("div",{children:["number:"," ",Object(i.jsx)("input",{value:c,onChange:a})]}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{type:"submit",children:"add"})})]})},f=n(3),j=n.n(f),p=n(5),l=n(6),m=n.n(l),h="/api/persons",v={getAll:function(){var e=Object(p.a)(j.a.mark((function e(){var t;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.a.get(h);case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),create:function(){var e=Object(p.a)(j.a.mark((function e(t){var n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.a.post(h,t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),remove:function(){var e=Object(p.a)(j.a.mark((function e(t){var n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.a.delete("".concat(h,"/").concat(t),{id:t});case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),update:function(){var e=Object(p.a)(j.a.mark((function e(t,n){var r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.a.put("".concat(h,"/").concat(t),n);case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},O=function(e){var t=e.name,n=e.number,r=e.delFunc;return Object(i.jsxs)("li",{className:"person",children:[t," ",n,Object(i.jsx)("button",{onClick:r,children:"delete"})]},t)},x=function(e){var t=e.db,n=e.keyword,r=e.setDb,c=e.setError;return Object(i.jsx)("div",{children:Object(i.jsx)("ul",{children:t.reduce((function(e,a){var u,o=Object(i.jsx)(O,{name:a.name,number:a.number,delFunc:(u=a.id,function(){var e=t.find((function(e){return e.id===u}));window.confirm("Delete ".concat(e.name))&&v.remove(e.id).then((function(){r(t.filter((function(t){return t.id!==e.id})))})).then((function(){setTimeout((function(){c({})}),5e3),c({text:"Deleted ".concat(e.name),type:"error"})})).catch((function(){setTimeout((function(){c({})}),5e3),c({text:"Information of ".concat(e.name," has already been removed from server"),type:"error"}),r(t.filter((function(e){return e.id!==u})))}))})},a.id);return""!==n?(a.name.toLowerCase().includes(n.toLowerCase())&&e.push(o),e):(e.push(o),e)}),[])})})},w=function(){var e=Object(o.useState)([]),t=Object(u.a)(e,2),n=t[0],r=t[1],c=Object(o.useState)(""),f=Object(u.a)(c,2),j=f[0],p=f[1],l=Object(o.useState)(""),m=Object(u.a)(l,2),h=m[0],O=m[1],w=Object(o.useState)(""),y=Object(u.a)(w,2),g=y[0],k=y[1],C=Object(o.useState)({}),U=Object(u.a)(C,2),A=U[0],S=U[1];Object(o.useEffect)((function(){v.getAll().then((function(e){r(e)}))}),[]);var D=function(){p(""),O("")};return Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Phonebook"}),Object(i.jsx)(d,{message:A.text,type:A.type}),Object(i.jsx)(s,{keyword:g,stateUpdater:function(e){return k(e.target.value)}}),Object(i.jsx)("h2",{children:"add a new"}),Object(i.jsx)(b,{submitAction:function(e){e.preventDefault();var t=n.find((function(e){return e.name===j}));if(t){if(window.confirm("".concat(j," is already added to phonebook, replace old number with a new one?"))){var c=Object(a.a)(Object(a.a)({},t),{},{number:h});v.update(t.id,c).then((function(e){r(n.map((function(n){return n.id===t.id?e:n})))})).then((function(){setTimeout((function(){S({})}),5e3),S({text:"Updated ".concat(t.name),type:"success"})}))}D()}else{var u={name:j.split(" ").map((function(e){return"".concat(e.trim().charAt(0).toUpperCase()).concat(e.trim().substring(1).toLowerCase())})).join(" "),number:h};v.create(u).then((function(){return r(n.concat(u))})).then((function(){return D()})).then((function(){setTimeout((function(){S({})}),5e3),S({text:"Added ".concat(j),type:"success"})})).catch((function(e){return console.log(e.message)})),D()}},name:j,nameUpdater:function(e){return p(e.target.value)},number:h,numberUpdater:function(e){return O(e.target.value)}}),Object(i.jsx)("h2",{children:"Numbers"}),Object(i.jsx)(x,{db:n,keyword:g,setDb:r,setError:S})]})};n(42);c.a.render(Object(i.jsx)(w,{}),document.getElementById("root"))}},[[43,1,2]]]);
//# sourceMappingURL=main.c0601b68.chunk.js.map