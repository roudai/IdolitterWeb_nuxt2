(window.webpackJsonp=window.webpackJsonp||[]).push([[28,8,9],{348:function(e,t,r){"use strict";r.r(t);var n=r(37),component=Object(n.a)({},(function(){this._self._c;return this._m(0)}),[function(){var e=this,t=e._self._c;return t("div",{staticClass:"mt-3"},[t("a",{attrs:{href:"https://px.a8.net/svt/ejp?a8mat=3T04HB+4W8BUA+CO4+ZZ835",rel:"nofollow"}},[t("img",{attrs:{border:"0",width:"468",height:"60",alt:"",src:"https://www26.a8.net/svt/bgt?aid=230113199296&wid=001&eno=01&mid=s00000001642006043000&mc=1"}})]),e._v(" "),t("img",{attrs:{border:"0",width:"1",height:"1",src:"https://www13.a8.net/0.gif?a8mat=3T04HB+4W8BUA+CO4+ZZ835",alt:""}}),e._v(" "),t("a",{attrs:{href:"https://px.a8.net/svt/ejp?a8mat=3T04H9+BQ4COI+1SOW+1ZKY29",rel:"nofollow"}},[t("img",{attrs:{border:"0",width:"468",height:"60",alt:"",src:"https://www23.a8.net/svt/bgt?aid=230113197709&wid=001&eno=01&mid=s00000008384012023000&mc=1"}})]),e._v(" "),t("img",{attrs:{border:"0",width:"1",height:"1",src:"https://www18.a8.net/0.gif?a8mat=3T04H9+BQ4COI+1SOW+1ZKY29",alt:""}})])}],!1,null,null,null);t.default=component.exports},349:function(e,t,r){"use strict";r.r(t);var n=r(37),component=Object(n.a)({},(function(){this._self._c;return this._m(0)}),[function(){var e=this,t=e._self._c;return t("div",{staticClass:"mt-3"},[t("a",{attrs:{href:"https://px.a8.net/svt/ejp?a8mat=3T04H6+2N9DKI+51GI+BXIYP",rel:"nofollow"}},[t("img",{attrs:{border:"0",width:"468",height:"60",alt:"",src:"https://www29.a8.net/svt/bgt?aid=230113194160&wid=001&eno=01&mid=s00000023517002004000&mc=1"}})]),e._v(" "),t("img",{attrs:{border:"0",width:"1",height:"1",src:"https://www18.a8.net/0.gif?a8mat=3T04H6+2N9DKI+51GI+BXIYP",alt:""}}),e._v(" "),t("a",{attrs:{href:"https://px.a8.net/svt/ejp?a8mat=3T04H6+5JG8FM+2OM2+1HONM9",rel:"nofollow"}},[t("img",{attrs:{border:"0",width:"468",height:"60",alt:"",src:"https://www22.a8.net/svt/bgt?aid=230113194335&wid=001&eno=01&mid=s00000012521009017000&mc=1"}})]),e._v(" "),t("img",{attrs:{border:"0",width:"1",height:"1",src:"https://www14.a8.net/0.gif?a8mat=3T04H6+5JG8FM+2OM2+1HONM9",alt:""}})])}],!1,null,null,null);t.default=component.exports},377:function(e,t,r){"use strict";r.r(t);r(99);var n=r(6),l=(r(38),r(14),r(28),r(30),r(227),r(57),r(79),{asyncData:function(e){return Object(n.a)(regeneratorRuntime.mark((function t(){var r,n,l,o,c,d,w,h,m,f,v,_;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.$axios,n=e.$config,t.prev=1,l=r.defaults.baseURL+"取得差分?",o={key:n.apiKey,range:"取得差分!W1"},c=new URLSearchParams(o),t.next=7,r.$get(encodeURI(l)+c);case 7:return d=t.sent,w={key:n.apiKey,range:"取得差分!I2:N301"},h=new URLSearchParams(w),t.next=12,r.$get(encodeURI(l)+h);case 12:return m=t.sent,f={key:n.apiKey,range:"取得差分!P2:U301"},v=new URLSearchParams(f),t.next=17,r.$get(encodeURI(l)+v);case 17:return _=t.sent,t.abrupt("return",{process:d,follower:m,tweet:_});case 21:t.prev=21,t.t0=t.catch(1),console.log(t.t0.response.status),console.log(t.t0.response.data.message);case 25:case"end":return t.stop()}}),t,null,[[1,21]])})))()},data:function(){return{created:!1,process:"",windowWidth:"",columns_follower:[{label:"順位",field:"rank",type:"number"},{label:"TwitterName",field:"name"},{label:"TwitterID",field:"twitterId",tdClass:"twitter-id"},{label:"グループ",field:"group",tdClass:"group-name"},{label:"前フォロワー数",field:"oldNum",type:"number"},{label:"後フォロワー数",field:"newNum",type:"number"},{label:"フォロワー増減",field:"increase",type:"number"}],rows_follower:[],columns_tweet:[{label:"順位",field:"rank",type:"number"},{label:"TwitterName",field:"name"},{label:"TwitterID",field:"twitterId",tdClass:"twitter-id"},{label:"グループ",field:"group",tdClass:"group-name"},{label:"前ツイート数",field:"oldNum",type:"number"},{label:"後ツイート数",field:"newNum",type:"number"},{label:"ツイート増減",field:"increase",type:"number"}],rows_tweet:[]}},created:function(){this.process=this.$data.process.values[0][0],this.createRank(this.$data.follower.values,"follower"),this.createRank(this.$data.tweet.values,"tweet"),this.created=!0},methods:{createRank:function(e,t){for(var r=[],n=1,l=0,i=0;i<e.length&&!(n>100);i++){var o=e[i][3],c=e[i][4];0===o||c/o>=3||(r.push({rank:n,group:e[i][0],twitterId:e[i][1],name:e[i][2],oldNum:o,newNum:c,increase:e[i][5]}),e[i][5]===e[i+1][5]?l+=1:(n=n+l+1,l=0))}"follower"===t?this.rows_follower=r:"tweet"===t&&(this.rows_tweet=r)},compactModeChange:function(){this.compactMode=!this.compactMode},onCellClick:function(e){if("twitter-id"===e.column.tdClass){var t="https://twitter.com/"+e.row.twitterId;window.open(t,"_blank")}else"group"===e.column.field&&this.$router.push({path:"/group",query:{group:this.replaceParams(e.row.group)}})},replaceParams:function(e){return e.includes("傾奇隊")?"傾奇隊":e.includes("仮面女子")?"仮面女子":e.includes("スリジエ：")?"スリジエ東京":e}}}),o=r(37),component=Object(o.a)(l,(function(){var e=this,t=e._self._c;return e.created?t("div",["集計中"===e.process?t("div",{staticClass:"is-size-5 has-text-weight-semibold"},[e._v("\n    現在ランキング集計中です。\n  ")]):"失敗"===e.process?t("div",{staticClass:"is-size-5 has-text-weight-semibold"},[e._v("\n    不具合のため、\n    "),t("span",{domProps:{textContent:e._s(e.$dayjs().subtract(1,"day").format("YYYY年M月D日（dd）"))}}),e._v("\n    のランキングはありません。\n  ")]):t("div",[t("h5",[t("p",{domProps:{textContent:e._s(e.$dayjs().subtract(1,"day").format("YYYY年M月D日（dd）"))}})]),e._v(" "),t("h5",[e._v("フォロワー増加数ランキング")]),e._v(" "),t("vue-good-table",{ref:"ranking-table",attrs:{columns:e.columns_follower,rows:e.rows_follower,"sort-options":{enabled:!1},"pagination-options":{enabled:!0,perPage:10,setCurrentPage:1,perPageDropdownEnabled:!1,nextLabel:"次",prevLabel:"前",rowsPerPageLabel:"表示数",infoFn:function(e){return"".concat(e.currentPage," / ").concat(e.totalPage)}},"style-class":"vgt-table striped condensed"},on:{"on-cell-click":e.onCellClick}}),e._v(" "),t("a8-ranking-middle"),e._v(" "),t("h5",{staticClass:"mt-5"},[e._v("ツイート数ランキング")]),e._v(" "),t("vue-good-table",{ref:"ranking-table",attrs:{columns:e.columns_tweet,rows:e.rows_tweet,"sort-options":{enabled:!1},"pagination-options":{enabled:!0,perPage:10,setCurrentPage:1,perPageDropdownEnabled:!1,nextLabel:"次",prevLabel:"前",rowsPerPageLabel:"表示数",infoFn:function(e){return"".concat(e.currentPage," / ").concat(e.totalPage)}},"style-class":"vgt-table striped condensed"},on:{"on-cell-click":e.onCellClick}})],1),e._v(" "),t("a8-ranking-under")],1):e._e()}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{A8RankingMiddle:r(348).default,A8RankingUnder:r(349).default})}}]);