(window.webpackJsonp=window.webpackJsonp||[]).push([[12,4],{307:function(t,e,n){var content=n(318);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(49).default)("499b57be",content,!0,{sourceMap:!1})},311:function(t,e,n){"use strict";n.r(e);var r=n(22),component=Object(r.a)({},(function(){this._self._c;return this._m(0)}),[function(){var t=this._self._c;return t("div",{staticClass:"mt-3"},[t("a",{attrs:{href:"https://px.a8.net/svt/ejp?a8mat=3T04H9+CAD38Y+2D8M+NVP2P",rel:"nofollow"}},[t("img",{attrs:{border:"0",width:"728",height:"90",alt:"",src:"https://www27.a8.net/svt/bgt?aid=230113197743&wid=001&eno=01&mid=s00000011047004011000&mc=1"}})]),this._v(" "),t("img",{attrs:{border:"0",width:"1",height:"1",src:"https://www15.a8.net/0.gif?a8mat=3T04H9+CAD38Y+2D8M+NVP2P",alt:""}})])}],!1,null,null,null);e.default=component.exports},317:function(t,e,n){"use strict";n(307)},318:function(t,e,n){var r=n(48)(!1);r.push([t.i,".vgt-wrap__footer .footer__navigation>button:first-of-type{margin-right:0}.vgt-wrap__footer .footer__navigation__page-btn{margin-left:0;padding:0}",""]),t.exports=r},331:function(t,e,n){"use strict";n.r(e);n(79);var r=n(8);n(31),n(11),n(23),n(24),n(202),n(50),n(43),n(51),n(28),n(32),n(52),n(53);function o(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return l(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return l(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0,r=function(){};return{s:r,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,d=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return c=t.done,t},e:function(t){d=!0,o=t},f:function(){try{c||null==n.return||n.return()}finally{if(d)throw o}}}}function l(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}var c={asyncData:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,o,l,c,d;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.$axios,r=t.$config,o=n.defaults.baseURL+"グループ一覧?",l={key:r.apiKey},c=new URLSearchParams(l),e.next=6,n.$get(o+c);case 6:return d=e.sent,e.abrupt("return",d);case 8:case"end":return e.stop()}}),e)})))()},data:function(){return{perPage:10,perPageChangeFlag:!1,totalPage:"",currentPage:"",windowWidth:"",compactMode:!1,columns:[{label:"グループ",field:"group"},{label:"TwitterID",field:"twitterId",tdClass:"twitter-id"},{label:"フォロワー",field:"follower",type:"number",firstSortType:"desc"},{label:"ツイート",field:"tweet",type:"number",firstSortType:"desc"},{label:"認証",field:this.certifFn,firstSortType:"desc"},{label:"解散休止予定",field:this.deleteFn,firstSortType:"desc"}],rows:[]}},mounted:function(){window.addEventListener("resize",this.resizeWindow),this.windowWidth=window.innerWidth,window.innerHeight<1080?this.perPage=10:this.perPage=20},created:function(){this.totalPage=Math.ceil(this.$data.values.length/this.perPage),this.currentPage=Math.floor(Math.random()*this.totalPage)+1;var t,e=!0,n=o(this.$data.values);try{for(n.s();!(t=n.n()).done;){var r=t.value;e?e=!1:this.rows.push({group:r[0],twitterId:r[5],follower:parseInt(r[7]),tweet:parseInt(r[8]),certif:r[9],delete:r[14]})}}catch(t){n.e(t)}finally{n.f()}},methods:{compactModeChange:function(){this.compactMode=!this.compactMode},onCellClick:function(t){if("twitterId"===t.column.field){var e="https://twitter.com/"+t.row.twitterId;window.open(e,"_blank")}},onPerPageChange:function(t){this.perPage=t.currentPerPage,this.perPageChangeFlag=!this.perPageChangeFlag,this.totalPage=t.total,this.perPageChangeFlag&&(this.currentPage=Math.floor(Math.random()*this.totalPage+1)+1)},randomView:function(){this.currentPage=Math.floor(Math.random()*this.totalPage+1)+1},certifFn:function(t){return t.certif?t.certif:"-"},deleteFn:function(t){return t.delete?t.delete:"-"},resizeWindow:function(){this.windowWidth=window.innerWidth}}},d=(n(317),n(22)),component=Object(d.a)(c,(function(){var t=this,e=t._self._c;return e("div",[e("button",{staticClass:"button mb-2",on:{click:t.randomView}},[t._v("ランダム表示")]),t._v(" "),e("button",{directives:[{name:"show",rawName:"v-show",value:t.windowWidth<=576,expression:"windowWidth <= 576"}],staticClass:"button mb-2",on:{click:t.compactModeChange}},[t._v("\n    表示切替\n  ")]),t._v(" "),e("vue-good-table",{attrs:{columns:t.columns,rows:t.rows,"compact-mode":t.compactMode,"pagination-options":{enabled:!0,perPage:t.perPage,setCurrentPage:t.currentPage,perPageDropdown:[10,20,50,100],dropdownAllowAll:!1,jumpFirstOrLast:!0,firstLabel:"",lastLabel:"",nextLabel:"次",prevLabel:"前",rowsPerPageLabel:"表示数",infoFn:function(t){return"".concat(t.currentPage," / ").concat(t.totalPage)}},"search-options":{enabled:!0,skipDiacritics:!0,placeholder:"検索"},"style-class":"vgt-table striped condensed"},on:{"on-cell-click":t.onCellClick,"on-per-page-change":t.onPerPageChange}}),t._v(" "),e("a8-group-under")],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{A8GroupUnder:n(311).default})}}]);