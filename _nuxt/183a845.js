(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{144:function(t,e,n){"use strict";var r=n(3),o=n(213);n(310);r.a.use(o.a)},145:function(t,e,n){"use strict";var r=n(118),o=n.n(r);n(312);o.a.locale("ja"),e.a=function(t,e){t._app;e("dayjs",(function(t){return o()(t)}))}},146:function(t,e,n){"use strict";var r=n(214);e.a=function(t){var e=t.store;window.onNuxtReady((function(){Object(r.a)({key:"idolitter_key"})(e)}))}},199:function(t,e,n){var content=n(288);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(55).default)("2705ec69",content,!0,{sourceMap:!1})},201:function(t,e,n){var content=n(290);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(55).default)("092a5939",content,!0,{sourceMap:!1})},216:function(t,e,n){"use strict";var r={name:"DefaultLayout",data:function(){return{items:[{title:"Home",icon:"home",to:{name:"index"}},{title:"Inspire",icon:"lightbulb",to:{name:"inspire"}}]}}},o=(n(287),n(27)),component=Object(o.a)(r,(function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"main-content columns ml-0 mr-0"},[e("div",{staticClass:"container column is-12 pl-0 pr-0"},[e("nav-bar"),t._v(" "),e("div",{staticClass:"content m-3"},[e("Nuxt")],1),t._v(" "),e("footer-bar")],1)])])}),[],!1,null,null,null);e.a=component.exports;installComponents(component,{NavBar:n(313).default,FooterBar:n(314).default})},218:function(t,e,n){n(219),t.exports=n(220)},261:function(t,e,n){"use strict";n.r(e);n(30),n(191);e.default=function(t){var e=t.store,n=t.route,r=t.redirect;e.getters["auth/LoggedIn"]?n.path.match(/\/login/)&&r("/mypage"):r("/auth/login")}},287:function(t,e,n){"use strict";n(199)},288:function(t,e,n){var r=n(54)(!1);r.push([t.i,".group-name{color:#1a0dab!important;cursor:pointer}.twitter-id{color:#1b94e0!important;cursor:pointer}.add-text{color:#1a0dab!important;cursor:pointer;text-decoration:underline}table{display:block;overflow-x:scroll;white-space:nowrap;-webkit-overflow-scrolling:touch;width:100%;display:table}",""]),t.exports=r},289:function(t,e,n){"use strict";n(201)},290:function(t,e,n){var r=n(54)(!1);r.push([t.i,".bi-github[data-v-73785e9c]{margin-bottom:-.1em}",""]),t.exports=r},291:function(t,e,n){"use strict";n.r(e),n.d(e,"state",(function(){return l})),n.d(e,"mutations",(function(){return d})),n.d(e,"actions",(function(){return v})),n.d(e,"getters",(function(){return f}));var r=n(7),o=(n(36),n(88)),c=n(117),l=function(){return{isLoggedIn:!1,uid:"",user:"",displayName:""}},d={setLoginState:function(t,e){t.isLoggedIn=e},setUid:function(t,e){t.uid=e},setUser:function(t,e){t.user=e},setName:function(t,e){t.displayName=e}},v={login:function(t){var e=this,n=t.commit,l=Object(o.b)();Object(o.c)(l).then(function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(r){var o,l,d,v;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(null!==r){t.next=2;break}return t.abrupt("return");case 2:return o=r.user.providerData[0].uid,l=r.user.reloadUserInfo.screenName,d=r.user.displayName,n("setLoginState",!0),n("setUid",o),n("setUser",l),n("setName",d),v=Object(c.b)(e.$firebase),t.next=12,Object(c.c)(Object(c.a)(v,"users",o),{user:l,displayName:d});case 12:e.$router.push("/mypage");case 13:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){var e=t.code,n=t.message;console.log(e,n)}))},logout:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,c;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=t.commit,c=Object(o.b)(),n.next=4,Object(o.e)(c).then((function(){r("setLoginState",!1),r("setUid",""),r("setUser",""),r("setName",""),e.$router.push("/auth/login")})).catch((function(t){alert("logout:"+t)}));case 4:case"end":return n.stop()}}),n)})))()}},f={isLoggedIn:function(t){return!!t.isLoggedIn},uid:function(t){return t.uid},user:function(t){return t.user},displayName:function(t){return t.displayName}}},313:function(t,e,n){"use strict";n.r(e);var r=n(200),o={data:function(){return{nav_class:"",iconLogin:r.a,show:!0}},methods:{menuShow:function(){""===this.nav_class?this.nav_class="is-active":this.nav_class=""},toMypage:function(){console.log(this.$store.getters["auth/isLoggedIn"]),this.$store.getters["auth/isLoggedIn"]?this.$router.push("/mypage"):this.$router.push("/auth/login")}}},c=n(27),component=Object(c.a)(o,(function(){var t=this,e=t._self._c;return e("nav",{staticClass:"navbar is-dark",attrs:{role:"navigation","aria-label":"main navigation"}},[e("div",{staticClass:"navbar-brand ml-1"},[e("a",{staticClass:"navbar-burger ml-0",class:t.nav_class,attrs:{role:"button","aria-label":"menu","aria-expanded":"false","data-target":"navbarMenu"},on:{click:t.menuShow}},[e("span",{attrs:{"aria-hidden":"true"}}),t._v(" "),e("span",{attrs:{"aria-hidden":"true"}}),t._v(" "),e("span",{attrs:{"aria-hidden":"true"}})]),t._v(" "),e("a",{staticClass:"navbar-item has-text-info-light is-size-5",attrs:{href:"/"}},[t._v("\n      アイドリッター\n    ")])]),t._v(" "),e("div",{staticClass:"navbar-menu",class:t.nav_class,attrs:{id:"navbarMenu"}},[t._m(0),t._v(" "),e("div",{staticClass:"navbar-end"},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"navbar-item"},[e("button",{staticClass:"button mr-2",on:{click:t.toMypage}},[e("span",{staticClass:"icon is-small"},[e("svg",{attrs:{viewBox:"0 0 24 24"}},[e("path",{attrs:{d:t.iconLogin}})])])])])])])])}),[function(){var t=this,e=t._self._c;return e("div",{staticClass:"navbar-start"},[e("a",{staticClass:"navbar-item",attrs:{href:"/idol"}},[t._v(" アイドル一覧 ")]),t._v(" "),e("a",{staticClass:"navbar-item",attrs:{href:"/group"}},[t._v(" グループ一覧 ")]),t._v(" "),e("a",{staticClass:"navbar-item",attrs:{href:"/ranking"}},[t._v(" ランキング ")]),t._v(" "),e("a",{staticClass:"navbar-item",attrs:{href:"/history"}},[t._v(" 履歴 ")])])}],!1,null,null,null);e.default=component.exports},314:function(t,e,n){"use strict";n.r(e);var r={data:function(){return{now:"",copyright:"アイドリッター"}},created:function(){var t=new Date;this.now=t.getFullYear()}},o=(n(289),n(27)),component=Object(o.a)(r,(function(){var t=this,e=t._self._c;return e("footer",{staticClass:"footer"},[e("div",{staticClass:"content has-text-centered"},[t._v("\n    ©"+t._s(t.now)+" "+t._s(t.copyright)+"\n    "),e("a",{attrs:{href:"https://github.com/roudai/IdolitterWeb"}},[e("svg",{staticClass:"bi bi-github mr-2",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"black",viewBox:"0 0 16 16"}},[e("path",{attrs:{d:"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"}})])]),t._v(" "),e("div",{staticClass:"mt-2"},[e("nuxt-link",{attrs:{to:"/policy"}},[t._v("プライバシーポリシー")])],1)])])}),[],!1,null,"73785e9c",null);e.default=component.exports}},[[218,17,1,18]]]);