(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{344:function(e,t,r){"use strict";r.r(t);r(92);var n=r(7),o=(r(36),r(75),r(14),r(39),r(49),r(74),r(91),r(93)),l={data:function(){return{created:!1,name:"",perPage:10,perPageChangeFlag:!1,totalPage:"",currentPage:"",windowWidth:"",compactMode:!1,columns:[{label:"",field:"add",tdClass:"add-text",sortable:!1},{label:"",field:"edit",tdClass:"add-text",sortable:!1},{label:"枚数",field:"number",type:"number"},{label:"名前",field:"name",tdClass:"twitter-id"},{label:"グループ",field:"group",tdClass:"group-name"},{label:"TwitterID",field:"twitterId",hidden:!0},{label:"Twitter UID",field:"uid",hidden:!0,globalSearchDisabled:!1},{label:"",field:"delete",tdClass:"add-text",sortable:!1}],rows:[]}},beforeCreate:function(){var e=this;setTimeout(Object(n.a)(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=Object(o.h)(),n=e.$store.getters["auth/uid"],t.next=4,Object(o.g)(Object(o.b)(r,"users",n,"idol"));case 4:return t.sent.forEach((function(t){e.rows.push({add:"追加",edit:"参照",number:0,name:t.data().name,group:t.data().group,twitterId:t.data().twitterId,uid:t.id,delete:"削除"})})),t.next=8,Object(o.g)(Object(o.i)(Object(o.c)(r,"instax")));case 8:t.sent.forEach((function(t){var r=t.ref.parent.parent;e.rows.forEach((function(e){r.id===e.uid&&(e.number+=1)}))})),e.created=!0;case 11:case"end":return t.stop()}}),t)}))),0)},methods:{onCellClick:function(e){if("name"===e.column.field){var t="https://twitter.com/".concat(e.row.twitterId);window.open(t,"_blank")}else if("group"===e.column.field){if(""===e.row.group)return;this.$router.push({path:"/group",query:{group:this.replaceParams(e.row.group)}})}else"add"===e.column.field?this.$router.push("/mypage/add/"+e.row.uid):"edit"===e.column.field?this.$router.push("/mypage/"+e.row.uid):"delete"===e.column.field&&this.confirmDelete(e)},confirmDelete:function(e){var t=this;this.$buefy.dialog.confirm({title:"アイドルの情報を削除します",message:"登録しているチェキの情報もすべて削除され、復元はできません。『"+e.row.name+"』の情報を本当に削除してもよろしいですか？",cancelText:"キャンセル",confirmText:"OK",type:"is-danger",hasIcon:!0,onConfirm:function(){return t.deleteIdol(e)}})},confirmLogout:function(){var e=this;this.$buefy.dialog.confirm({message:"ログアウトしても良いですか？",cancelText:"キャンセル",confirmText:"OK",type:"is-primary",onConfirm:function(){return e.$store.dispatch("auth/logout")}})},deleteIdol:function(e){var t=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n,l,c;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n=Object(o.h)(),l=t.$store.getters["auth/uid"],c=e.row.uid,r.next=5,Object(o.d)(Object(o.e)(n,"users",l,"idol",c));case 5:t.$buefy.dialog.alert({message:"『"+e.row.name+"』の情報を削除しました。",onConfirm:function(){return location.reload()}});case 6:case"end":return r.stop()}}),r)})))()},replaceParams:function(e){return e.includes("傾奇隊")?"傾奇隊":e.includes("仮面女子")?"仮面女子":e.includes("スリジエ：")?"スリジエ東京":e}}},c=r(27),component=Object(c.a)(l,(function(){var e=this,t=e._self._c;return e.created?t("div",[t("h5",[e._v("マイページ")]),e._v(" "),t("vue-good-table",{ref:"idol-table",attrs:{columns:e.columns,rows:e.rows,"compact-mode":e.compactMode,"sort-options":{enabled:!0,initialSortBy:{field:"number",type:"desc"}},"pagination-options":{enabled:!0,perPage:e.perPage,setCurrentPage:e.currentPage,perPageDropdown:[5,10,30],dropdownAllowAll:!1,nextLabel:"次",prevLabel:"前",rowsPerPageLabel:"表示数",infoFn:function(e){return"".concat(e.currentPage," / ").concat(e.totalPage)}},"search-options":{enabled:!0,skipDiacritics:!0,placeholder:"検索"},"style-class":"vgt-table striped condensed"},on:{"on-cell-click":e.onCellClick}}),e._v(" "),t("div",{staticClass:"buttons mt-3"},[t("b-button",{attrs:{type:"is-primary is-light"},on:{click:function(t){return e.$router.push("/mypage/addnew")}}},[e._v("アイドル登録")]),e._v(" "),t("b-button",{attrs:{label:"ログアウトする",type:"is-info"},on:{click:e.confirmLogout}})],1)],1):e._e()}),[],!1,null,null,null);t.default=component.exports}}]);