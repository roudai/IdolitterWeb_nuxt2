(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{319:function(e,t,r){"use strict";var n=r(4),l=r(320).start;n({target:"String",proto:!0,forced:r(321)},{padStart:function(e){return l(this,e,arguments.length>1?arguments[1]:void 0)}})},320:function(e,t,r){var n=r(10),l=r(77),c=r(17),o=r(220),d=r(37),m=n(o),v=n("".slice),f=Math.ceil,h=function(e){return function(t,r,n){var o,h,x=c(d(t)),j=l(r),O=x.length,_=void 0===n?" ":c(n);return j<=O||""==_?x:((h=m(_,f((o=j-O)/_.length))).length>o&&(h=v(h,0,o)),e?x+h:h+x)}};e.exports={start:h(!1),end:h(!0)}},321:function(e,t,r){var n=r(76);e.exports=/Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(n)},355:function(e,t,r){"use strict";r.r(t);r(49);var n=r(34),l=r(7),c=(r(36),r(43),r(14),r(74),r(91),r(94),r(75),r(319),r(93)),o={data:function(){return{created:!1,show:!0,name:"",group:"",selectDate:new Date,number:1,initialDate:null,initialNumber:1,url:"",place:"",event:"",placeData:[],eventData:[]}},computed:{filteredPlaceArray:function(){var e=this;return void 0===this.placeData?null:this.placeData.filter((function(option){return option.toString().toLowerCase().includes(e.place.toLowerCase())}))},filteredEventArray:function(){var e=this;return void 0===this.eventData?null:this.eventData.filter((function(option){return option.toString().toLowerCase().includes(e.event.toLowerCase())}))}},beforeCreate:function(){var e=this;setTimeout(Object(l.a)(regeneratorRuntime.mark((function t(){var r,n,l,o,d,m;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=Object(c.h)(),n=e.$store.getters["auth/uid"],l=e.$route.params.uid,o=e.$route.params.instax,t.next=6,Object(c.f)(Object(c.e)(r,"users",n,"idol",l,"instax",o));case 6:return(d=t.sent).exists()?(e.selectDate=new Date(1e3*d.data().date.seconds),e.number=d.data().number,e.place=d.data().place,e.event=d.data().event,e.url=d.data().url,e.initialDate=e.selectDate,e.initialNumber=e.number):e.show=!1,t.next=10,Object(c.f)(Object(c.e)(r,"users",n));case 10:m=t.sent,e.placeData=m.data().place_list,e.eventData=m.data().event_list,e.created=!0;case 14:case"end":return t.stop()}}),t)}))),0)},methods:{register:function(){var e=this;return Object(l.a)(regeneratorRuntime.mark((function t(){var r,l,o,d,m,v;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=Object(c.h)(),l=e.$store.getters["auth/uid"],o=e.$route.params.uid,d=e.$route.params.instax,t.next=6,Object(c.l)(Object(c.e)(r,"users",l,"idol",o,"instax",d),{date:e.selectDate,number:e.number,url:e.url,place:e.place,event:e.event});case 6:return t.next=8,Object(c.m)(Object(c.e)(r,"users",l),{place_list:Object(c.b)(e.place),event_list:Object(c.b)(e.event)});case 8:return m="instax_totalling.m"+String(e.initialDate.getFullYear())+String(e.initialDate.getMonth()+1).padStart(2,"0"),t.next=11,Object(c.m)(Object(c.e)(r,"users",l,"idol",o),Object(n.a)({"instax_totalling.total":Object(c.i)(-e.initialNumber)},m,Object(c.i)(-e.initialNumber)));case 11:return v="instax_totalling.m"+String(e.selectDate.getFullYear())+String(e.selectDate.getMonth()+1).padStart(2,"0"),t.next=14,Object(c.m)(Object(c.e)(r,"users",l,"idol",o),Object(n.a)({"instax_totalling.total":Object(c.i)(e.number)},v,Object(c.i)(e.number)));case 14:e.$router.push("/mypage/"+o);case 15:case"end":return t.stop()}}),t)})))()},deleteDocument:function(){var e=this;this.$buefy.dialog.confirm({title:"チェキの情報を削除します",message:"情報の復元はできません。削除しても良いですか？",cancelText:"キャンセル",confirmText:"OK",type:"is-danger",hasIcon:!0,onConfirm:function(){return e.deleteInstax()}})},deleteInstax:function(){var e=this;return Object(l.a)(regeneratorRuntime.mark((function t(){var r,l,o,d,m;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=Object(c.h)(),l=e.$store.getters["auth/uid"],o=e.$route.params.uid,d=e.$route.params.instax,m="instax_totalling.m"+String(e.selectDate.getFullYear())+String(e.selectDate.getMonth()+1).padStart(2,"0"),t.next=7,Object(c.d)(Object(c.e)(r,"users",l,"idol",o,"instax",d));case 7:return t.next=9,Object(c.m)(Object(c.e)(r,"users",l,"idol",o),Object(n.a)({"instax_totalling.total":Object(c.i)(-e.initialNumber)},m,Object(c.i)(-e.number)));case 9:e.$buefy.dialog.alert({message:"削除しました。"}),e.$router.push("/mypage/"+o);case 11:case"end":return t.stop()}}),t)})))()},clearDate:function(){this.selectDate=null}}},d=r(27),component=Object(d.a)(o,(function(){var e=this,t=e._self._c;return e.created?t("div",[t("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],staticClass:"mb-3"},[t("h3",[e._v(e._s(e.name))]),e._v(" "),t("h4",[e._v(e._s(e.group))]),e._v(" "),t("b-field",{attrs:{label:"日付"}},[t("b-datepicker",{attrs:{locale:"ja-JP",placeholder:"日付を選択してください",icon:"calendar-today","icon-right":e.selectDate?"close-circle":"","icon-right-clickable":"","trap-focus":""},on:{"icon-right-click":e.clearDate},model:{value:e.selectDate,callback:function(t){e.selectDate=t},expression:"selectDate"}})],1),e._v(" "),t("b-field",{attrs:{label:"枚数"}},[t("b-numberinput",{attrs:{editable:!1,type:"is-light",min:"1",max:"100"},model:{value:e.number,callback:function(t){e.number=t},expression:"number"}})],1),e._v(" "),t("b-field",{attrs:{label:"会場名"}},[t("b-autocomplete",{attrs:{data:e.filteredPlaceArray,placeholder:"会場名",clearable:""},scopedSlots:e._u([{key:"empty",fn:function(){return[e._v("入力候補はありません")]},proxy:!0}],null,!1,1659253314),model:{value:e.place,callback:function(t){e.place=t},expression:"place"}})],1),e._v(" "),t("b-field",{attrs:{label:"イベント名"}},[t("b-autocomplete",{attrs:{data:e.filteredEventArray,placeholder:"イベント名",clearable:""},scopedSlots:e._u([{key:"empty",fn:function(){return[e._v("入力候補はありません")]},proxy:!0}],null,!1,1659253314),model:{value:e.event,callback:function(t){e.event=t},expression:"event"}})],1),e._v(" "),t("b-field",{attrs:{label:"URL"}},[t("b-input",{attrs:{placeholder:"https://"},model:{value:e.url,callback:function(t){e.url=t},expression:"url"}})],1)],1),e._v(" "),t("div",{staticClass:"buttons"},[t("b-button",{attrs:{type:"is-link is-light"},on:{click:e.register}},[e._v("更新")]),e._v(" "),t("b-button",{attrs:{type:"is-link is-light"},on:{click:e.deleteDocument}},[e._v("削除")]),e._v(" "),t("b-button",{attrs:{type:"is-link is-light"},on:{click:function(t){return e.$router.go(-1)}}},[e._v("戻る")])],1)]):e._e()}),[],!1,null,null,null);t.default=component.exports}}]);