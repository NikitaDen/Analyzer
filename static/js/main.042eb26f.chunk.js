(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{100:function(e,t,n){e.exports=n.p+"static/media/nodata.2d46dca5.svg"},101:function(e,t,n){e.exports=n.p+"static/media/add.fc75b7e4.svg"},102:function(e,t,n){e.exports=n.p+"static/media/delete.fa5e6b6a.svg"},104:function(e,t,n){e.exports=n(199)},109:function(e,t,n){},110:function(e,t,n){},111:function(e,t,n){},135:function(e,t,n){},136:function(e,t,n){},195:function(e,t,n){},196:function(e,t,n){},197:function(e,t,n){},198:function(e,t,n){},199:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(34),s=n.n(c),i=(n(109),n(110),n(19)),l=(n(111),n(91)),o=n.n(l),u=n(92),m=n.n(u),p=n(93),d=n.n(p),f=n(12),g=n(7),E=function(e){return r.a.createElement("button",{disabled:e.disabled,className:e.className,onClick:e.func},r.a.createElement("img",{src:e.image,alt:""}),e.title?r.a.createElement("p",null,e.title):null)},h=n(95),b=n.n(h),v=Object(f.b)((function(e){return{isAuth:e.account.isAuth}}),{userLogoutThunkCreator:g.e})((function(e){return r.a.createElement("nav",null,r.a.createElement(i.b,{to:"/history"},r.a.createElement("p",null,"History"),r.a.createElement("img",{src:o.a,alt:""})),r.a.createElement(i.b,{to:"/analytics"},r.a.createElement("p",null,"Analytics"),r.a.createElement("img",{src:m.a,alt:""})),r.a.createElement(i.b,{to:"/settings"},r.a.createElement("p",null,"Settings"),r.a.createElement("img",{src:d.a,alt:""})),r.a.createElement("div",{className:"login-buttons"},e.isAuth?r.a.createElement(r.a.Fragment,null,r.a.createElement(E,{image:b.a,className:"button button--logout",func:function(){return e.userLogoutThunkCreator()},title:"Logout"})):null))})),y=n(4),O=n(8),j=n.n(O),x=n(15),C=n(6),_=n(11),w=n(16),N={expenses:[]},k=function(e){return{type:"ADD_EXPENSE",expense:e}},S=function(e){return{type:"DELETE_EXPENSE",id:e}},D=function(){return{type:"SET_EXPENSES"}},L=function(e){return{type:"GET_EXPENSES",expenses:e}},I=function(){return function(){var e=Object(x.a)(j.a.mark((function e(t){var n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t(Object(g.c)(!0)),e.next=3,w.get("https://analyzerserver.herokuapp.com/api/history/expenses",{withCredentials:!0});case 3:n=e.sent,t(Object(g.c)(!1)),t(L(n.data));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},T=function(e,t,n,a,r,c){return{type:"CHANGE_EXPENSE",id:e,name:t,category:n,spent:a,count:r,price:c}},A=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_EXPENSE":return Object(_.a)({},e,{expenses:[].concat(Object(C.a)(e.expenses),[Object(_.a)({},t.expense,{date:"".concat((new Date).toLocaleString()),id:Date.now()})])});case"DELETE_EXPENSE":return Object(_.a)({},e,{expenses:Object(C.a)(e.expenses.filter((function(e){return!t.id.includes(e.id)})))});case"SET_EXPENSES":return e;case"GET_EXPENSES":return Object(_.a)({},e,{expenses:Object(C.a)(t.expenses)});case"CHANGE_EXPENSE":return Object(_.a)({},e,{expenses:Object(C.a)(e.expenses.map((function(e){return e.id===t.id?Object(_.a)({},e,{name:t.name,category:t.category,count:t.count,spent:t.spent,price:t.price}):e})))});default:return e}},F=(n(135),n(48)),R=n.n(F),H=n(28),G=Object(f.b)((function(e){return{expenses:e.history.expenses,categories:e.settings.categories}}),{addExpense:k,setExpenses:D,getExpenses:L,changeExpense:T,getCategories:H.f,getExpensesThunkCreator:I,addExpenseThunkCreator:function(e){return function(){var t=Object(x.a)(j.a.mark((function t(n){return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n(Object(g.c)(!0)),t.next=3,w.post("https://analyzerserver.herokuapp.com/api/history/expenses",{name:e.name,category:e.category,count:e.count,spent:e.spent,price:e.price,date:"".concat((new Date).toLocaleString()),id:Date.now()},{withCredentials:!0});case 3:n(Object(g.c)(!1)),n(k(e));case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},getCategoriesThunkCreator:H.g})((function(e){var t=Object(a.useState)(""),n=Object(y.a)(t,2),c=n[0],s=n[1],i=Object(a.useState)(""),l=Object(y.a)(i,2),o=l[0],u=l[1],m=Object(a.useState)("0"),p=Object(y.a)(m,2),d=p[0],f=p[1],g=Object(a.useState)("1"),E=Object(y.a)(g,2),h=E[0],b=E[1],v=Object(a.useState)(!1),O=Object(y.a)(v,2),j=O[0],x=O[1];Object(a.useEffect)((function(){e.getExpensesThunkCreator(),e.getCategoriesThunkCreator()}),[]),Object(a.useEffect)((function(){e.categories.length&&u(e.categories[0].name)}),[e.categories]);return r.a.createElement(r.a.Fragment,null,e.showForm?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"form"},r.a.createElement("div",{className:"form__element"},r.a.createElement("label",{htmlFor:"name"},"Name"),r.a.createElement("input",{type:"text",className:j?"name name--error":"name",id:"name",value:c,onChange:function(e){s(e.target.value),x(!1)}})),r.a.createElement("div",{className:"form__element"},r.a.createElement("label",{htmlFor:"category"},"Category"),r.a.createElement("select",{value:o,onChange:function(e){return u(e.target.value)},name:"category",id:"category"},e.categories.map((function(e){return r.a.createElement("option",{key:e.name,value:e.name},e.name)})))),r.a.createElement("div",{className:"form__element"},r.a.createElement("label",{htmlFor:"count"},"Count"),r.a.createElement("input",{type:"number",id:"count",value:h,min:0,onChange:function(e){return b(e.target.value)}})),r.a.createElement("div",{className:"form__element"},r.a.createElement("label",{htmlFor:"price"},"Price"),r.a.createElement("input",{type:"number",id:"price",value:d,min:0,onChange:function(e){return f(e.target.value)}})),r.a.createElement("button",{className:"button button--addItem",onClick:function(){c?(e.addExpenseThunkCreator({category:o,count:h,name:c,price:d,spent:d*h}),s(""),b("1"),f("0")):x(!0)}},r.a.createElement("img",{src:R.a,alt:""})))):null)})),P=(n(39),n(136),n(37)),M=n.n(P),B=n(49),z=n.n(B),U=n(50),X=n.n(U),Y=function(e){var t=Object(a.useState)(!1),n=Object(y.a)(t,2),c=n[0],s=n[1];Object(a.useEffect)((function(){c?e.setFilterInRange(!0):e.setFilterInRange(!1)}),[c]);return r.a.createElement("div",{className:"filter__item filter__item--dates"},r.a.createElement("label",{htmlFor:"sort"},"Dates"),r.a.createElement("div",{className:"dates"},r.a.createElement("div",{className:"dates__element"},r.a.createElement("p",null,"From:"),r.a.createElement(M.a,{maxDate:e.dateHigher,onChange:e.onChangeDateLower,selected:e.dateLower})),r.a.createElement("div",{className:"dates__element"},r.a.createElement("p",null,"To:"),r.a.createElement(M.a,{minDate:e.dateLower,disabled:e.dateLower>e.dateHigher,onChange:e.onChangeDateHigher,selected:e.dateHigher}))),r.a.createElement("input",{onChange:function(){s(!c)},id:"dark-check",type:"checkbox"}),r.a.createElement("label",{className:"dark-mode",htmlFor:"dark-check"},r.a.createElement("div",{className:"toggle",style:c?{backgroundImage:"url(".concat(X.a,")"),backgroundColor:"#FF7777"}:{backgroundImage:"url(".concat(z.a,")")}})))},J=function(e){return r.a.createElement("div",{className:"filter__item filter__item--filter"},r.a.createElement("label",{htmlFor:"filter"},"Filter"),r.a.createElement("select",{value:e.filter,onChange:function(t){return e.setFilter(t.target.value)},name:"filter",id:"filter"},r.a.createElement("option",{value:"noFilter"},"No filter"),e.categories.map((function(e){return r.a.createElement("option",{key:e.name,value:e.name},e.name)}))))},V=function(e){return r.a.createElement("div",{className:"filter__item filter__item--sort"},r.a.createElement("label",{htmlFor:"sort"},"Sort"),r.a.createElement("select",{value:e.sort,onChange:function(t){return e.setSort(t.target.value)},name:"filter",id:"sort"},e.sortValues.map((function(e){return r.a.createElement("option",{key:e,value:e},e)}))))},W=function(e){return r.a.createElement("div",{className:"filter__item filter__item--direction"},r.a.createElement("label",{htmlFor:"sort"},"Direction"),r.a.createElement("select",{value:e.descending,onChange:function(t){return e.setDescending(t.target.value)},name:"descending"},r.a.createElement("option",{value:"noSort"},"No sort"),r.a.createElement("option",{value:"Ascending"},"Ascending"),r.a.createElement("option",{value:"Descending"},"Descending")))},$=function(e){return r.a.createElement("div",{className:"filter"},r.a.createElement(J,{filter:e.filter,categories:e.categories,setFilter:e.setFilter,setSort:e.setSort,setDescending:e.setDescending}),r.a.createElement(V,{sort:e.sort,sortValues:e.sortValues,setSort:e.setSort}),r.a.createElement(W,{descending:e.descending,setDescending:e.setDescending}),r.a.createElement(Y,{filterInRange:e.filterInRange,dateHigher:e.dateHigher,dateLower:e.dateLower,onChangeDateLower:e.onChangeDateLower,onChangeDateHigher:e.onChangeDateHigher,setFilterInRange:e.setFilterInRange}))},q=n(43),K=(n(196),n(98)),Q=n.n(K),Z=function(e){var t=Object(a.useState)(e.name),n=Object(y.a)(t,2),c=n[0],s=n[1],i=Object(a.useState)(!1),l=Object(y.a)(i,2),o=l[0],u=l[1],m=Object(a.useState)(e.category),p=Object(y.a)(m,2),d=p[0],f=p[1],g=Object(a.useState)(e.price),h=Object(y.a)(g,2),b=h[0],v=h[1],O=Object(a.useState)(e.spent),j=Object(y.a)(O,2),x=j[0],_=j[1],w=Object(a.useState)(e.count),N=Object(y.a)(w,2),k=N[0],S=N[1],D=Object(a.useState)(!1),L=Object(y.a)(D,2),I=L[0],T=L[1],A=Object(a.useState)(e.checkedAll),F=Object(y.a)(A,2),H=F[0],G=F[1];Object(a.useEffect)((function(){_(b*k)}),[k,b]),Object(a.useEffect)((function(){G(e.checkedAll)}),[e.checkedAll]),Object(a.useEffect)((function(){H?e.setChosenItems(Array.from(new Set([].concat(Object(C.a)(e.chosenItems),[e.id])))):(e.chosenItems.splice(e.chosenItems.indexOf(e.id),-1===e.chosenItems.indexOf(e.id)?0:1),e.setChosenItems(Object(C.a)(e.chosenItems)))}),[H]);return r.a.createElement("div",{className:H?"expense expense--chosen":"expense"},I?r.a.createElement(q.a,{className:"confirm",title:"Are you sure?",func:function(){e.deleteExpense(e.id)},close:function(){return T(!1)}}):null,o?r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null),r.a.createElement("input",{type:"text",onChange:function(e){s(e.currentTarget.value)},value:c}),r.a.createElement("select",{value:d,onChange:function(e){f(e.currentTarget.value)},name:"filter",id:"filter"},e.categories.map((function(e){return r.a.createElement("option",{key:e.name,value:e.name},e.name)}))),r.a.createElement("input",{type:"number",id:"price",value:b,min:0,onChange:function(e){return v(e.target.value)}}),r.a.createElement("input",{type:"number",id:"count",value:k,min:1,onChange:function(e){return S(e.target.value)}}),r.a.createElement("p",null,x),r.a.createElement("div",null,r.a.createElement("p",null,e.date)),r.a.createElement(E,{image:R.a,func:function(){e.changeExpenseThunkCreator(e.id,c,d,x,k,b),u(!1)},className:"button button--save"})):r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"checkbox-element"},r.a.createElement("input",{checked:H,onChange:function(){G(!H)},type:"checkbox"}),r.a.createElement("label",null,r.a.createElement("div",{className:"checked"}))),r.a.createElement("p",null,e.name),r.a.createElement("p",null,e.category),r.a.createElement("p",null,e.price),r.a.createElement("p",null,e.count),r.a.createElement("p",null,e.spent),r.a.createElement("div",null,r.a.createElement("p",null,e.date)),r.a.createElement(E,{image:Q.a,func:function(){u(!0)},className:"button button--edit"})))},ee=(n(89),n(33)),te=n.n(ee),ne=r.a.memo((function(e){return r.a.createElement("div",{className:"table__header"},r.a.createElement("div",{className:"checkbox-element"},r.a.createElement("input",{checked:e.checkedAll,onChange:e.chooseAllItems,type:"checkbox"}),r.a.createElement("label",null,r.a.createElement("div",{className:"checked"}))),r.a.createElement("div",{className:"table__header__item"},r.a.createElement("img",{src:te.a,alt:""}),r.a.createElement("p",null,"Name")),r.a.createElement("div",{className:"table__header__item"},r.a.createElement("img",{src:te.a,alt:""}),r.a.createElement("p",null,"Category")),r.a.createElement("div",{className:"table__header__item"},r.a.createElement("img",{src:te.a,alt:""}),r.a.createElement("p",null,"Price")),r.a.createElement("div",{className:"table__header__item"},r.a.createElement("img",{src:te.a,alt:""}),r.a.createElement("p",null,"Count")),r.a.createElement("div",{className:"table__header__item"},r.a.createElement("img",{src:te.a,alt:""}),r.a.createElement("p",null,"Spent")),r.a.createElement("div",{className:"table__header__item"},r.a.createElement("img",{src:te.a,alt:""}),r.a.createElement("p",null,"Date")))})),ae=n(99),re=n.n(ae),ce=n(100),se=n.n(ce),ie=n(56),le=n.n(ie),oe=(n(197),function(){return r.a.createElement("img",{className:"loader",src:le.a,alt:""})}),ue=function(e){var t=Object(a.useState)(!1),n=Object(y.a)(t,2),c=n[0],s=n[1];Object(a.useEffect)((function(){c&&e.filterInRange?e.setChosenItems(p.filter((function(t){return t.props.id<e.dateHigher&&t.props.id>e.dateLower})).length?p.filter((function(t){return t.props.id<e.dateHigher&&t.props.id>e.dateLower})).map((function(e){return e.props.id})):null):c&&!e.filterInRange?e.expenses.length&&"noFilter"!==e.filter&&"Descending"===e.descending?e.setChosenItems(Object(C.a)(u.filter((function(t){return t.category===e.filter})).map((function(e){return e.id})))):e.expenses.length&&"noFilter"!==e.filter&&"Descending"!==e.descending?e.setChosenItems(Object(C.a)(u.sort(o()).filter((function(t){return t.category===e.filter})).map((function(e){return e.id})).reverse())):"Descending"===e.descending?e.setChosenItems(Object(C.a)(u.map((function(e){return e.id})))):e.setChosenItems(Object(C.a)(u.map((function(e){return e.id})).reverse())):e.setChosenItems([])}),[c,e.filterInRange]);var i=function(e,t){return e.name>t.name?1:e.name<t.name?-1:0},l=function(e,t){return e.category>t.category?1:e.category<t.category?-1:0},o=function(){switch(e.sort){case"By Date":return function(e,t){return t.id-e.id};case"By Spent":return function(e,t){return t.spent-e.spent};case"By Categories":return l;case"By Name":return i;case"By Count":return function(e,t){return t.count-e.count};default:return function(e,t){return t.id-e.id}}},u=Object(C.a)(e.expenses).sort(o()),m=function(t){return r.a.createElement(Z,{id:t.id,key:t.id,categories:e.categories,name:t.name,category:t.category,chosenItems:e.chosenItems,setChosenItems:e.setChosenItems,checkedAll:c,count:t.count,price:t.price,spent:t.spent,date:t.date,changeExpense:e.changeExpense,deleteExpense:e.deleteExpense,setExpenses:e.setExpenses,changeExpenseThunkCreator:e.changeExpenseThunkCreator})},p=e.expenses.length&&"noFilter"!==e.filter&&"Descending"===e.descending?u.filter((function(t){return t.category===e.filter})).map((function(e){return m(e)})):e.expenses.length&&"noFilter"!==e.filter&&"Descending"!==e.descending?u.sort(o()).filter((function(t){return t.category===e.filter})).map((function(e){return m(e)})).reverse():"Descending"===e.descending?u.map((function(e){return m(e)})):u.map((function(e){return m(e)})).reverse(),d=Object(a.useCallback)((function(){s(!c)}),[c]);return r.a.createElement("div",{className:"table"},r.a.createElement(ne,{checkedAll:c,chooseAllItems:d}),e.isLoading?r.a.createElement(oe,null):null,e.filterInRange?p.filter((function(t){return t.props.id<e.dateHigher&&t.props.id>e.dateLower})).length?p.filter((function(t){return t.props.id<e.dateHigher&&t.props.id>e.dateLower})):r.a.createElement("div",{className:"empty"},r.a.createElement("p",null,"You don't have any data for this period"),r.a.createElement("img",{src:se.a,alt:""})):p,0!==e.expenses.length||e.filterInRange?null:r.a.createElement("div",{className:"empty"},r.a.createElement("p",null,"Add your first expense"),r.a.createElement("img",{src:re.a,alt:""})))},me=n(101),pe=n.n(me),de=n(102),fe=n.n(de),ge=n(30),Ee=Object(f.b)((function(e){return{expenses:e.history.expenses,categories:e.settings.categories,isAuth:e.account.isAuth,isLoading:e.account.isLoading}}),{addExpense:k,setExpenses:D,getExpenses:L,getUser:g.b,changeExpense:T,deleteExpense:S,getExpensesThunkCreator:I,deleteExpensesThunkCreator:function(e){return function(){var t=Object(x.a)(j.a.mark((function t(n){return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n(Object(g.c)(!0)),t.next=3,w.put("https://analyzerserver.herokuapp.com/api/history/delete",{id:e},{withCredentials:!0});case 3:n(Object(g.c)(!1)),n(S(e));case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},changeExpenseThunkCreator:function(e,t,n,a,r,c){return function(){var s=Object(x.a)(j.a.mark((function s(i){return j.a.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return i(Object(g.c)(!0)),s.next=3,w.put("https://analyzerserver.herokuapp.com/api/history/change",{name:t,category:n,count:r,spent:a,price:c,id:e},{withCredentials:!0});case 3:i(Object(g.c)(!1)),i(T(e,t,n,a,r,c));case 5:case"end":return s.stop()}}),s)})));return function(e){return s.apply(this,arguments)}}()}})((function(e){var t=Object(a.useState)("noFilter"),n=Object(y.a)(t,2),c=n[0],s=n[1],i=Object(a.useState)("By Date"),l=Object(y.a)(i,2),o=l[0],u=l[1],m=Object(a.useState)("Descending"),p=Object(y.a)(m,2),d=p[0],f=p[1],g=Object(a.useState)((new Date).setHours(0)),h=Object(y.a)(g,2),b=h[0],v=h[1],O=Object(a.useState)((new Date).setDate((new Date).getDate()+1)),j=Object(y.a)(O,2),x=j[0],C=j[1],_=Object(a.useState)(!1),w=Object(y.a)(_,2),N=w[0],k=w[1],S=Object(a.useState)(!1),D=Object(y.a)(S,2),L=D[0],I=D[1],T=Object(a.useState)([]),A=Object(y.a)(T,2),F=A[0],R=A[1],H=Object(a.useState)(!1),P=Object(y.a)(H,2),M=P[0],B=P[1];Object(a.useEffect)((function(){e.getUser()}),[]),Object(a.useEffect)((function(){e.getExpensesThunkCreator()}),[F]);var z=Object(a.useCallback)((function(){e.deleteExpensesThunkCreator(F),R([]),B(!1)}),[F]);return e.isAuth?r.a.createElement("div",{className:"history"},r.a.createElement("h2",null,"Your history"),M?r.a.createElement(q.a,{className:"confirm show",title:"Do you want delete ".concat(F?F.length:null," items?"),func:z,close:function(){return B(!1)}}):r.a.createElement(q.a,{className:"confirm",title:"Do you want delete ".concat(F?F.length:null," items?"),func:z,close:function(){return B(!1)}}),r.a.createElement($,{categories:e.categories,descending:d,setDescending:f,filter:c,setFilter:s,sort:o,setSort:u,sortValues:["By Date","By Spent","By Categories","By Name","By Count"],dateLower:b,dateHigher:x,onChangeDateLower:function(e){v(e)},onChangeDateHigher:function(e){C(e)},filterInRange:N,setFilterInRange:k}),r.a.createElement("div",{style:e.isLoading?{opacity:".5",pointerEvents:"none"}:{},className:"history__buttons"},r.a.createElement(E,{image:pe.a,func:function(){return I(!L)},className:"button button--add",title:""}),r.a.createElement(E,{image:fe.a,func:function(){F.length&&B(!0)},className:"button button--delete",title:"".concat(F.length)})),r.a.createElement(G,{showForm:L}),r.a.createElement(ue,{isLoading:e.isLoading,changeExpenseThunkCreator:e.changeExpenseThunkCreator,chosenItems:F,setChosenItems:R,categories:e.categories,filter:c,sort:o,descending:d,expenses:e.expenses,deleteExpense:e.deleteExpense,changeExpense:e.changeExpense,setExpenses:e.setExpenses,dateLower:b,dateHigher:x,filterInRange:N})):r.a.createElement(ge.a,{to:"login"})})),he=(n(198),function(e){var t=Object(a.useState)(!1),n=Object(y.a)(t,2),c=n[0],s=n[1];Object(a.useEffect)((function(){i(c)}),[c]);var i=function(t){e.setShowForPeriod(t),e.setShowMoreInfo(!1)};return r.a.createElement("div",{className:"period"},r.a.createElement("div",{className:"dates"},r.a.createElement("div",{className:"dates__element"},r.a.createElement("p",null,"From:"),r.a.createElement(M.a,{maxDate:e.dateHigher,onChange:function(t){e.setDateLower(t)},selected:e.dateLower})),r.a.createElement("div",{className:"dates__element"},r.a.createElement("p",null,"To:"),r.a.createElement(M.a,{minDate:e.dateLower,disabled:e.dateLower>e.dateHigher,onChange:function(t){e.setDateHigher(t)},selected:e.dateHigher}))),r.a.createElement("input",{onChange:function(){s(!c)},id:"dark-check",type:"checkbox"}),r.a.createElement("label",{className:"dark-mode",htmlFor:"dark-check"},r.a.createElement("div",{className:"toggle",style:c?{backgroundImage:"url(".concat(X.a,")"),backgroundColor:"#FF7777"}:{backgroundImage:"url(".concat(z.a,")")}})))}),be=function(e){return r.a.createElement("div",{className:"analytics__wrapper"},r.a.createElement("h3",null,e.title),r.a.createElement("div",{className:"analytics__info"},r.a.createElement("div",{className:"analytics__info__item"},r.a.createElement("h3",null,"Total spent:"),e.findTotalSpending()),r.a.createElement("div",{className:"analytics__info__item"},r.a.createElement("h3",null,"Most spent for:"),e.findBiggerSpent()),r.a.createElement("div",{className:"analytics__info__item"},r.a.createElement("h3",null,"Spending by categories:"),r.a.createElement("div",{className:"analytics__categories"},e.findSpentCategory())),e.showMoreInfo?r.a.createElement("div",{className:"analytics__info__item detail-info"},r.a.createElement("div",{className:"header"},r.a.createElement("p",null,"Name"),r.a.createElement("p",null,"Category"),r.a.createElement("p",null,"Price"),r.a.createElement("p",null,"Count"),r.a.createElement("p",null,"Spent"),r.a.createElement("p",null,"Date")),e.moreInfo.map((function(e){return r.a.createElement("div",{key:e.id,className:"more-info"},r.a.createElement("p",null,e.name),r.a.createElement("p",null,e.category),r.a.createElement("p",null,e.price),r.a.createElement("p",null,e.count),r.a.createElement("p",null,e.spent),r.a.createElement("p",null,e.date))}))):null,e.showExpensesPerDay?r.a.createElement("div",{className:"analytics__info__item"},r.a.createElement("h3",null,"Spending per day:"),e.findTotalSpending()/Math.ceil((e.dateHigher-e.dateLower)/864e5)):null))},ve=function(e){return r.a.createElement("div",null,r.a.createElement("p",null,e.spent),r.a.createElement("div",{onClick:e.func,style:{width:"1.5rem",height:"".concat(e.spent/e.sum*150,"px"),backgroundColor:"rgb(".concat(255*Math.random(),", ").concat(255*Math.random(),", ").concat(255*Math.random(),")")},className:"column"}),r.a.createElement("h5",null,e.category))},ye=Object(f.b)((function(e){return{expenses:e.history.expenses,categories:e.settings.categories,isAuth:e.account.isAuth}}),{getExpenses:L,getCategories:H.f,getExpensesThunkCreator:I,getCategoriesThunkCreator:H.g,addCategoriesThunkCreator:H.a})((function(e){var t=Object(a.useState)(new Date((new Date).getFullYear(),(new Date).getMonth(),(new Date).getDate(),0,0,0)),n=Object(y.a)(t,2),c=n[0],s=n[1],i=Object(a.useState)(new Date((new Date).getFullYear(),(new Date).getMonth(),(new Date).getDate()+1,0,0,0)),l=Object(y.a)(i,2),o=l[0],u=l[1],m=Object(a.useState)(!1),p=Object(y.a)(m,2),d=p[0],f=p[1],g=Object(a.useState)(!1),E=Object(y.a)(g,2),h=E[0],b=E[1],v=Object(a.useState)({}),O=Object(y.a)(v,2),j=O[0],x=O[1];Object(a.useEffect)((function(){e.getExpensesThunkCreator(),e.getCategoriesThunkCreator()}),[]);return e.isAuth?r.a.createElement("div",{className:"analytics"},r.a.createElement("h2",null,"Analytics"),r.a.createElement(he,{setShowMoreInfo:b,dateHigher:o,dateLower:c,setDateLower:s,setDateHigher:u,showForPeriod:d,setShowForPeriod:f}),d?r.a.createElement(be,{moreInfo:j,showMoreInfo:h,showExpensesPerDay:!0,dateLower:c,dateHigher:o,categories:e.categories,title:"Analytics for the time period",findTotalSpending:function(){return Object(C.a)(e.expenses).filter((function(e){return e.id>c&&e.id<o})).reduce((function(e,t){return e+t.spent}),0)},findSpentCategory:function(){var t=[];e.categories.forEach((function(n){return t.push({category:n.name,spent:Object(C.a)(e.expenses).filter((function(e){return e.id>c&&e.id<o&&e.category===n.name})).reduce((function(e,t){return e+t.spent}),0),expenses:Object(C.a)(e.expenses).filter((function(e){return e.id>c&&e.id<o&&e.category===n.name}))})}));var n=t.reduce((function(e,t){return e+t.spent}),0);return t.filter((function(e){return 0!==e.spent})).sort((function(e,t){return e.spent-t.spent})).map((function(e){return r.a.createElement(ve,{func:function(){b(!0),x(e.expenses)},key:e.category,spent:e.spent,category:e.category,sum:n})}))},findBiggerSpent:function(){return Object(C.a)(e.expenses).filter((function(t){return t.id>=c&&t.id<=o&&t.spent===Math.max.apply(Math,Object(C.a)(e.expenses.filter((function(e){return e.id>=c&&e.id<=o})).map((function(e){return e.spent}))))})).map((function(e){return r.a.createElement("div",{className:"biggest-spending",key:e.id},r.a.createElement("p",null,"Name:"),r.a.createElement("span",null,e.name),r.a.createElement("p",null,"Spent:"),r.a.createElement("span",null,e.spent),r.a.createElement("p",null,"Category:"),r.a.createElement("span",null,e.category),r.a.createElement("p",null,"Date:"),r.a.createElement("span",null,e.date),r.a.createElement("p",null,"Count:"),r.a.createElement("span",null,e.count))}))}}):r.a.createElement(be,{moreInfo:j,showMoreInfo:h,showExpensesPerDay:!1,dateLower:c,dateHigher:o,categories:e.categories,title:"Summary analytics",findTotalSpending:function(){return Object(C.a)(e.expenses).reduce((function(e,t){return e+t.spent}),0)},findSpentCategory:function(){var t=[];e.categories.forEach((function(n){return t.push({category:n.name,spent:Object(C.a)(e.expenses).filter((function(e){return e.category===n.name})).reduce((function(e,t){return e+t.spent}),0),expenses:Object(C.a)(e.expenses).filter((function(e){return e.category===n.name}))})}));var n=t.reduce((function(e,t){return e+t.spent}),0);return t.filter((function(e){return 0!==e.spent})).sort((function(e,t){return e.spent-t.spent})).map((function(e){return r.a.createElement(ve,{func:function(){b(!0),x(e.expenses)},key:e.category,spent:e.spent,category:e.category,sum:n})}))},findBiggerSpent:function(){return Object(C.a)(e.expenses).filter((function(t){return t.spent===Math.max.apply(Math,Object(C.a)(e.expenses.map((function(e){return e.spent}))))})).map((function(e){return r.a.createElement("div",{className:"biggest-spending",key:e.id},r.a.createElement("p",null,"Name:"),r.a.createElement("span",null,e.name),r.a.createElement("p",null,"Spent:"),r.a.createElement("span",null,e.spent),r.a.createElement("p",null,"Category:"),r.a.createElement("span",null,e.category),r.a.createElement("p",null,"Date:"),r.a.createElement("span",null,e.date),r.a.createElement("p",null,"Count:"),r.a.createElement("span",null,e.count))}))}})):r.a.createElement(ge.a,{to:"login"})})),Oe=n(22),je=(n(90),Object(Oe.d)(Object(f.b)((function(e){return{isAuth:e.account.isAuth,isLoading:e.account.isLoading,isLoginLoading:e.account.isLoginLoading}}),{userLoginThunkCreator:g.d,userLogoutThunkCreator:g.e,userRegisterThunkCreator:g.f,getUser:g.b}),ge.g)((function(e){var t=Object(a.useState)(""),n=Object(y.a)(t,2),c=n[0],s=n[1],i=Object(a.useState)(""),l=Object(y.a)(i,2),o=l[0],u=l[1];return Object(a.useEffect)((function(){e.getUser()}),[]),e.isAuth?r.a.createElement(ge.a,{to:"/history"}):r.a.createElement(r.a.Fragment,null,e.isLoginLoading?r.a.createElement(oe,null):r.a.createElement("div",{className:"login"},r.a.createElement("h3",null,"Login"),r.a.createElement("label",{htmlFor:"email"},"Email"),r.a.createElement("input",{type:"email",value:c,onChange:function(e){return s(e.target.value)}}),r.a.createElement("label",{htmlFor:"password"},"Password"),r.a.createElement("input",{type:"password",value:o,onChange:function(e){return u(e.target.value)}}),r.a.createElement("div",null,r.a.createElement("button",{className:"button",onClick:function(){return e.userLoginThunkCreator(c,o)}},"Login"),"or",r.a.createElement("button",{className:"button",onClick:function(){return e.history.push("register")}},"Register"))))}))),xe=Object(Oe.d)(Object(f.b)((function(e){return{isAuth:e.account.isAuth}}),{userLoginThunkCreator:g.d,userLogoutThunkCreator:g.e,userRegisterThunkCreator:g.f,getUser:g.b}),ge.g)((function(e){var t=Object(a.useState)(""),n=Object(y.a)(t,2),c=n[0],s=n[1],i=Object(a.useState)(""),l=Object(y.a)(i,2),o=l[0],u=l[1],m=Object(a.useState)(""),p=Object(y.a)(m,2),d=p[0],f=p[1];return Object(a.useEffect)((function(){e.getUser()}),[]),r.a.createElement("div",null,r.a.createElement("div",{className:"login"},r.a.createElement("h3",null,"Registration"),r.a.createElement("label",{htmlFor:"name"},"Name"),r.a.createElement("input",{id:"name",type:"text",value:c,onChange:function(e){return s(e.target.value)}}),r.a.createElement("label",{htmlFor:"name"},"Email"),r.a.createElement("input",{id:"email",type:"text",value:o,onChange:function(e){return u(e.target.value)}}),r.a.createElement("label",{htmlFor:"name"},"Password"),r.a.createElement("input",{id:"password",type:"password",value:d,onChange:function(e){return f(e.target.value)}}),r.a.createElement("div",null,r.a.createElement("button",{className:"button",onClick:function(){e.userRegisterThunkCreator(c,o,d),e.history.push("login")}},"Register"))))})),Ce=r.a.lazy((function(){return n.e(3).then(n.bind(null,208))})),_e=function(e){var t,n=(t=Ce,function(){return r.a.createElement(r.a.Suspense,{fallback:r.a.createElement("img",{src:le.a,alt:""})},r.a.createElement(t,null))});return r.a.createElement("div",{className:"App"},r.a.createElement(v,null),r.a.createElement("div",{className:"content"},r.a.createElement(ge.d,null,"// @ts-ignore",r.a.createElement(ge.b,{path:"/login",render:function(){return r.a.createElement(je,null)}}),"// @ts-ignore",r.a.createElement(ge.b,{path:"/register",render:function(){return r.a.createElement(xe,null)}}),r.a.createElement(ge.b,{path:"/history",render:function(){return r.a.createElement(Ee,null)}}),r.a.createElement(ge.b,{path:"/analytics",render:function(){return r.a.createElement(ye,null)}}),r.a.createElement(ge.b,{path:"/settings",render:function(){return r.a.createElement(n,null)}}),r.a.createElement(ge.a,{to:"/history"}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var we={},Ne=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:we,t=arguments.length>1?arguments[1]:void 0;return t.type,e},ke=n(103),Se=Object(Oe.c)({account:g.a,analytics:Ne,history:A,settings:H.c}),De=Object(Oe.e)(Se,Object(Oe.a)(ke.a));window.store=De;var Le=De;s.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(i.a,null,r.a.createElement(f.a,{store:Le},r.a.createElement(_e,null)))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},28:function(e,t,n){"use strict";n.d(t,"d",(function(){return u})),n.d(t,"f",(function(){return m})),n.d(t,"h",(function(){return p})),n.d(t,"b",(function(){return d})),n.d(t,"a",(function(){return f})),n.d(t,"g",(function(){return g})),n.d(t,"e",(function(){return E}));var a=n(8),r=n.n(a),c=n(15),s=n(6),i=n(11),l=n(16),o={categories:[]},u=function(e){return{type:"DELETE_CATEGORY",id:e}},m=function(e){return{type:"GET_CATEGORIES",categories:e}},p=function(){return{type:"SET_CATEGORIES"}},d=function(e,t){return{type:"ADD_CATEGORY",name:e,id:t}},f=function(e,t){return function(){var n=Object(c.a)(r.a.mark((function n(a){return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,l.post("https://analyzerserver.herokuapp.com/api/settings/categories",{name:e,id:t},{withCredentials:!0});case 2:a(d(e,t));case 3:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()},g=function(){return function(){var e=Object(c.a)(r.a.mark((function e(t){var n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.get("https://analyzerserver.herokuapp.com/api/settings/categories",{withCredentials:!0});case 2:n=e.sent,t(m(n.data));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},E=function(e){return function(){var t=Object(c.a)(r.a.mark((function t(n){return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l.put("https://analyzerserver.herokuapp.com/api/settings/delete",{id:e},{withCredentials:!0});case 2:n(u(e));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()};t.c=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_CATEGORIES":return e;case"GET_CATEGORIES":return Object(i.a)({},e,{categories:t.categories});case"ADD_CATEGORY":return Object(i.a)({},e,{categories:[].concat(Object(s.a)(e.categories),[{name:t.name,id:t.id}])});case"DELETE_CATEGORY":return Object(i.a)({},e,{categories:Object(s.a)(e.categories.filter((function(e){return e.id!==t.id})))});default:return e}}},33:function(e,t,n){e.exports=n.p+"static/media/separator.13ff7084.svg"},43:function(e,t,n){"use strict";var a=n(0),r=n.n(a);n(195);t.a=function(e){return r.a.createElement("div",{className:e.className},r.a.createElement("p",null,e.title),r.a.createElement("button",{className:"button button--confirm",onClick:e.func},"Yes"),r.a.createElement("button",{className:"button button--reject",onClick:e.close},"No"))}},48:function(e,t,n){e.exports=n.p+"static/media/save.33e01ffd.svg"},49:function(e,t,n){e.exports=n.p+"static/media/search.234c234c.svg"},50:function(e,t,n){e.exports=n.p+"static/media/clear.cbf86002.svg"},56:function(e,t,n){e.exports=n.p+"static/media/loading-1.7925e1a6.svg"},7:function(e,t,n){"use strict";n.d(t,"b",(function(){return u})),n.d(t,"c",(function(){return m})),n.d(t,"d",(function(){return d})),n.d(t,"f",(function(){return f})),n.d(t,"e",(function(){return g}));var a=n(8),r=n.n(a),c=n(15),s=n(11),i=n(16),l={isAuth:localStorage.getItem("isAuth")||!1,isLoading:!1,isLoginLoading:!1},o=function(e){return{type:"USER_LOGIN",isAuth:e}},u=function(){return{type:"GET_USER"}},m=function(e){return{type:"SHOW_LOADING",isLoading:e}},p=function(e){return{type:"LOGIN_LOADING",isLoading:e}},d=function(e,t){return function(){var n=Object(c.a)(r.a.mark((function n(a){var c;return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a(p(!0)),n.next=3,i.post("https://analyzerserver.herokuapp.com/api/user/login",{email:e,password:t},{withCredentials:!0});case 3:c=n.sent,a(p(!1)),c&&a(o(!0));case 6:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()},f=function(e,t,n){return function(){var a=Object(c.a)(r.a.mark((function a(c){return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,i.post("https://analyzerserver.herokuapp.com/api/user/register",{name:e,email:t,password:n},{withCredentials:!0});case 2:a.sent&&c(o(!1));case 4:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()},g=function(){return function(){var e=Object(c.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.post("https://analyzerserver.herokuapp.com/api/user/logout",null,{withCredentials:!0});case 2:e.sent&&t(o(!1));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()};t.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SHOW_LOADING":return Object(s.a)({},e,{isLoading:t.isLoading});case"LOGIN_LOADING":return Object(s.a)({},e,{isLoginLoading:t.isLoading});case"USER_LOGIN":return localStorage.setItem("isAuth",JSON.stringify(t.isAuth)),Object(s.a)({},e,{isAuth:t.isAuth});case"GET_USER":var n=JSON.parse(localStorage.getItem("isAuth"))||!1;return Object(s.a)({},e,{isAuth:n});default:return e}}},89:function(e,t,n){},90:function(e,t,n){},91:function(e,t,n){e.exports=n.p+"static/media/history.2ec496af.svg"},92:function(e,t,n){e.exports=n.p+"static/media/analytics.0e0ff751.svg"},93:function(e,t,n){e.exports=n.p+"static/media/settings.a4fe81f9.svg"},95:function(e,t,n){e.exports=n.p+"static/media/logout.8b4c5e56.svg"},98:function(e,t,n){e.exports=n.p+"static/media/edit.b79003c0.svg"},99:function(e,t,n){e.exports=n.p+"static/media/empty.7cc6dd27.svg"}},[[104,1,2]]]);
//# sourceMappingURL=main.042eb26f.chunk.js.map