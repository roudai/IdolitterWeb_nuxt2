(window.webpackJsonp=window.webpackJsonp||[]).push([[17,6],{339:function(t,e,r){var content=r(359);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(58).default)("d4216b1c",content,!0,{sourceMap:!1})},347:function(t,e,r){"use strict";r.r(e);var n=r(37),component=Object(n.a)({},(function(){this._self._c;return this._m(0)}),[function(){var t=this._self._c;return t("div",{staticClass:"mt-3"},[t("a",{attrs:{href:"https://px.a8.net/svt/ejp?a8mat=3T04H6+2DQFW2+2GMK+60H7L",rel:"nofollow"}},[t("img",{attrs:{border:"0",width:"728",height:"90",alt:"",src:"https://www29.a8.net/svt/bgt?aid=230113194144&wid=001&eno=01&mid=s00000011486001010000&mc=1"}})]),this._v(" "),t("img",{attrs:{border:"0",width:"1",height:"1",src:"https://www17.a8.net/0.gif?a8mat=3T04H6+2DQFW2+2GMK+60H7L",alt:""}})])}],!1,null,null,null);e.default=component.exports},358:function(t,e,r){"use strict";r(339)},359:function(t,e,r){var n=r(57)((function(i){return i[1]}));n.push([t.i,".vgt-wrap__footer .footer__navigation>button:first-of-type{margin-right:0}.vgt-wrap__footer .footer__navigation__page-btn{margin-left:0;padding:0}",""]),n.locals={},t.exports=n},374:function(t,e,r){"use strict";r.r(e);r(99),r(51),r(59),r(45),r(60),r(61);var n=r(32),o=r(6),l=(r(38),r(14),r(28),r(30),r(227),r(77),r(56),r(78),r(43),r(46),r(50),r(29),r(62),r(335),r(27));function c(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(!t)return;if("string"==typeof t)return d(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return d(t,e)}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var i=0,n=function(){};return{s:n,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,l=!0,c=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return l=t.done,t},e:function(t){c=!0,o=t},f:function(){try{l||null==r.return||r.return()}finally{if(c)throw o}}}}function d(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,r=new Array(e);i<e;i++)r[i]=t[i];return r}var f={asyncData:function(t){return Object(o.a)(regeneratorRuntime.mark((function e(){var r,n,o,l,c,d;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.$axios,n=t.$config,o=r.defaults.baseURL+"アイドル一覧?",l={key:n.apiKey},c=new URLSearchParams(l),e.next=6,r.$get(o+c);case 6:return d=e.sent,e.abrupt("return",d);case 8:case"end":return e.stop()}}),e)})))()},data:function(){return{idolList:[],created:!1,perPage:10,perPageChangeFlag:!1,totalPage:"",currentPage:"",windowWidth:"",compactMode:!1,columns:[{label:"グループ",field:"group",tdClass:"group-name"},{label:"名前",field:"name"},{label:"読み",field:"yomi"},{label:"TwitterID",field:"twitterId",tdClass:"twitter-id"},{label:"フォロワー",field:"follower",type:"number",firstSortType:"desc"},{label:"ツイート",field:"tweet",type:"number",firstSortType:"desc"},{label:"卒業解散予定",field:this.deleteFn,firstSortType:"desc"},{label:"検索用",field:"forSearch",hidden:!0},{label:"Twitter UID",field:"uid",hidden:!0,globalSearchDisabled:!1}],rows:[]}},mounted:function(){this.$refs["idol-table"].globalSearchTerm=this.$route.query.group,window.addEventListener("resize",this.resizeWindow),this.windowWidth=window.innerWidth,window.innerHeight<1080?this.perPage=10:this.perPage=20},beforeCreate:function(){var t=this;setTimeout(Object(o.a)(regeneratorRuntime.mark((function e(){var r,n,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=Object(l.l)(),n=t.$store.getters["auth/uid"],e.next=4,Object(l.j)(Object(l.g)(r,"users",n));case 4:o=e.sent,t.idolList=o.data().idol_list;case 6:case"end":return e.stop()}}),e)}))),0)},created:function(){var t=this;this.totalPage=Math.ceil(this.$data.values.length/this.perPage),this.currentPage=Math.floor(Math.random()*this.totalPage)+1;var e,r=!0,n="登録",o=c(this.$data.values);try{for(o.s();!(e=o.n()).done;){var l=e.value;r?r=!1:(void 0===l[11]&&(n=""),this.rows.push({add:n,group:l[0],twitterId:l[5],name:l[1]+" "+l[2],yomi:l[3]+" "+l[4],follower:parseInt(l[7]),tweet:parseInt(l[8]),delete:l[14],forSearch:this.setForSearch(l),uid:l[11]}),""===n&&(n="登録"))}}catch(t){o.e(t)}finally{o.f()}setTimeout((function(){t.$store.getters["auth/isLoggedIn"]&&t.columns.unshift({label:"",field:"add",tdClass:"add-text",sortable:!1})}),0),this.created=!0},methods:{compactModeChange:function(){this.compactMode=!this.compactMode},onCellClick:function(t){var e=this;return Object(o.a)(regeneratorRuntime.mark((function r(){var o,c,d,f,h,w,m;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if("twitterId"!==t.column.field){r.next=5;break}o="https://twitter.com/"+t.row.twitterId,window.open(o,"_blank"),r.next=38;break;case 5:if("group"!==t.column.field){r.next=9;break}e.$router.push({path:"/group",query:{group:e.replaceParams(t.row.group)}}),r.next=38;break;case 9:if("add"!==t.column.field){r.next=38;break}if(""!==t.row.add){r.next=12;break}return r.abrupt("return");case 12:if(void 0===e.idolList||!e.idolList.includes(t.row.uid)){r.next=15;break}return e.$errorDialog(e.$buefy,"登録済みです。"),r.abrupt("return");case 15:return c=Object(l.l)(),d=e.$store.getters["auth/uid"],f=t.row.uid,h=[],r.next=21,Object(l.k)(Object(l.d)(c,"users",d,"idol",f,"instax"));case 21:return r.sent.forEach((function(t){isNaN(h.total)?h.total=t.data().number:h.total+=t.data().number;var r="m"+e.$dayjs(t.data().date.toDate()).format("YYYYMM");isNaN(h[r])?h[r]=t.data().number:h[r]+=t.data().number})),Object.keys(h).length||(h.total=0),r.next=26,Object(l.t)(Object(l.g)(c,"users",d),{idol_list:Object(l.c)(f)});case 26:return r.next=28,Object(l.r)(Object(l.g)(c,"users",d,"idol",f),{name:t.row.name,group:t.row.group,twitterId:t.row.twitterId,instax_totalling:{total:h.total}});case 28:r.t0=regeneratorRuntime.keys(h);case 29:if((r.t1=r.t0()).done){r.next=37;break}if("total"===(w=r.t1.value)){r.next=35;break}return m="instax_totalling."+w,r.next=35,Object(l.t)(Object(l.g)(c,"users",d,"idol",f),Object(n.a)({},m,h[w]));case 35:r.next=29;break;case 37:e.$router.push("/mypage");case 38:case"end":return r.stop()}}),r)})))()},onPerPageChange:function(t){this.perPage=t.currentPerPage,this.perPageChangeFlag=!this.perPageChangeFlag,this.totalPage=t.total,this.perPageChangeFlag&&(this.currentPage=Math.floor(Math.random()*this.totalPage+1)+1)},randomView:function(){this.currentPage=Math.floor(Math.random()*this.totalPage+1)+1},clearSearch:function(){this.$refs["idol-table"].globalSearchTerm=""},deleteFn:function(t){return t.delete?t.delete:"-"},resizeWindow:function(){this.windowWidth=window.innerWidth},replaceParams:function(t){return t.includes("傾奇隊")?"傾奇隊":t.includes("仮面女子")?"仮面女子":t.includes("スリジエ：")?"スリジエ東京":t},setForSearch:function(t){var e="";return e=t[1]+t[2],e+=" "+t[3]+t[4],e+=" @"+t[5],e+=" "+t[0].replace(/\s+/g,"")},linkTweet:function(){var t=new URL("https://twitter.com/intent/tweet");t.searchParams.append("text","アイドル一覧"),t.searchParams.append("url","https://idolitter.net/idol"),t.searchParams.append("hashtags","アイドリッター"),window.open(t,"_blank")}}},h=f,w=(r(358),r(37)),component=Object(w.a)(h,(function(){var t=this,e=t._self._c;return t.created?e("div",[e("h5",[t._v("アイドル一覧")]),t._v(" "),e("button",{staticClass:"button mb-2",on:{click:t.randomView}},[t._v("ランダム表示")]),t._v(" "),e("button",{directives:[{name:"show",rawName:"v-show",value:t.windowWidth<=576,expression:"windowWidth <= 576"}],staticClass:"button mb-2",on:{click:t.compactModeChange}},[t._v("\n    表示切替\n  ")]),t._v(" "),e("button",{staticClass:"button mb-2",on:{click:t.clearSearch}},[t._v("検索クリア")]),t._v(" "),e("vue-good-table",{ref:"idol-table",attrs:{columns:t.columns,rows:t.rows,"compact-mode":t.compactMode,"pagination-options":{enabled:!0,perPage:t.perPage,setCurrentPage:t.currentPage,perPageDropdown:[10,20,50,100],dropdownAllowAll:!1,jumpFirstOrLast:!0,firstLabel:"",lastLabel:"",nextLabel:"次",prevLabel:"前",rowsPerPageLabel:"表示数",infoFn:function(t){return"".concat(t.currentPage," / ").concat(t.totalPage)}},"search-options":{enabled:!0,skipDiacritics:!0,placeholder:"検索"},"style-class":"vgt-table striped condensed"},on:{"on-cell-click":t.onCellClick,"on-per-page-change":t.onPerPageChange}}),t._v(" "),e("div",{staticClass:"mt-3"},[e("button",{staticClass:"button",staticStyle:{color:"#ffffff","background-color":"#1da1f2"},on:{click:t.linkTweet}},[e("b-icon",{attrs:{icon:"twitter"}}),t._v(" "),e("span",[t._v("ツイート")])],1)]),t._v(" "),e("a8-idol-under")],1):t._e()}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{A8IdolUnder:r(347).default})}}]);