(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{323:function(e,t,n){"use strict";n.r(t);n(79);var r=n(8),l=(n(33),n(13),n(24),n(25),n(202),{asyncData:function(e){return Object(r.a)(regeneratorRuntime.mark((function t(){var n,r,l,o,c,d,w,f,m,h,v,_;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.$axios,r=e.$config,l=n.defaults.baseURL+"取得差分?",o={key:r.apiKey,range:"取得差分!W1"},c=new URLSearchParams(o),t.next=6,n.$get(l+c);case 6:return d=t.sent,w={key:r.apiKey,range:"取得差分!I2:N301"},f=new URLSearchParams(w),t.next=11,n.$get(l+f);case 11:return m=t.sent,h={key:r.apiKey,range:"取得差分!P2:U301"},v=new URLSearchParams(h),t.next=16,n.$get(l+v);case 16:return _=t.sent,t.abrupt("return",{process:d,follower:m,tweet:_});case 18:case"end":return t.stop()}}),t)})))()},data:function(){return{process:"",windowWidth:"",columns_follower:[{label:"順位",field:"rank",type:"number"},{label:"TwitterName",field:"name"},{label:"TwitterID",field:"twitterId",tdClass:"twitter-id"},{label:"グループ",field:"group"},{label:"前フォロワー数",field:"oldNum",type:"number"},{label:"後フォロワー数",field:"newNum",type:"number"},{label:"フォロワー増減",field:"increase",type:"number"}],rows_follower:[],columns_tweet:[{label:"順位",field:"rank",type:"number"},{label:"TwitterName",field:"name"},{label:"TwitterID",field:"twitterId",tdClass:"twitter-id"},{label:"グループ",field:"group"},{label:"前ツイート数",field:"oldNum",type:"number"},{label:"後ツイート数",field:"newNum",type:"number"},{label:"ツイート増減",field:"increase",type:"number"}],rows_tweet:[]}},created:function(){this.process=this.$data.process.values[0][0],this.createRank(this.$data.follower.values,"follower"),this.createRank(this.$data.tweet.values,"tweet")},methods:{createRank:function(e,t){for(var n=[],r=1,l=0,i=0;i<e.length&&!(r>100);i++){var o=e[i][3],c=e[i][4];0===o||c/o>=3||(n.push({rank:r,group:e[i][0],twitterId:e[i][1],name:e[i][2],oldNum:o,newNum:c,increase:e[i][5]}),e[i][5]===e[i+1][5]?l+=1:(r=r+l+1,l=0))}"follower"===t?this.rows_follower=n:"tweet"===t&&(this.rows_tweet=n)},compactModeChange:function(){this.compactMode=!this.compactMode},onCellClick:function(e){if("twitter-id"===e.column.tdClass){var t="https://twitter.com/"+e.row.twitterId;window.open(t,"_blank")}}}}),o=n(28),component=Object(o.a)(l,(function(){var e=this,t=e._self._c;return t("div",["集計中"===e.process?t("div",{staticClass:"is-size-5 has-text-weight-semibold"},[e._v("\n    現在ランキング集計中です。\n  ")]):t("div",[t("h5",[t("p",{domProps:{textContent:e._s(e.$dayjs().subtract(1,"day").format("YYYY年M月D日（dd）"))}})]),e._v(" "),t("h5",[e._v("フォロワー数増ランキング")]),e._v(" "),t("vue-good-table",{attrs:{columns:e.columns_follower,rows:e.rows_follower,"sort-options":{enabled:!1},"pagination-options":{enabled:!0,perPage:10,setCurrentPage:1,perPageDropdownEnabled:!1,nextLabel:"次",prevLabel:"前",rowsPerPageLabel:"表示数",infoFn:function(e){return"".concat(e.currentPage," / ").concat(e.totalPage)}},"style-class":"vgt-table striped condensed"},on:{"on-cell-click":e.onCellClick}}),e._v(" "),t("h5",{staticClass:"mt-5"},[e._v("ツイート数増ランキング")]),e._v(" "),t("vue-good-table",{attrs:{columns:e.columns_tweet,rows:e.rows_tweet,"sort-options":{enabled:!1},"pagination-options":{enabled:!0,perPage:10,setCurrentPage:1,perPageDropdownEnabled:!1,nextLabel:"次",prevLabel:"前",rowsPerPageLabel:"表示数",infoFn:function(e){return"".concat(e.currentPage," / ").concat(e.totalPage)}},"style-class":"vgt-table striped condensed"},on:{"on-cell-click":e.onCellClick}})],1)])}),[],!1,null,null,null);t.default=component.exports}}]);