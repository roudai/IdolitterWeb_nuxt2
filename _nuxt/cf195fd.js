(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{351:function(e,t,r){"use strict";r.r(t);r(49);var n=r(7),c=(r(36),r(43),r(14),r(74),r(91),r(94),r(75),r(39),r(93)),l={data:function(){return{created:!1,show:!0,name:"",group:"",selectDate:new Date,number:1,url:"",place:"",event:"",placeData:[],eventData:[]}},computed:{filteredPlaceArray:function(){var e=this;return this.placeData.filter((function(option){return option.toString().toLowerCase().includes(e.place.toLowerCase())}))},filteredEventArray:function(){var e=this;return this.eventData.filter((function(option){return option.toString().toLowerCase().includes(e.event.toLowerCase())}))}},beforeCreate:function(){var e=this;setTimeout(Object(n.a)(regeneratorRuntime.mark((function t(){var r,n,l,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=Object(c.h)(),n=e.$store.getters["auth/uid"],l=e.$route.params.uid,t.next=5,Object(c.f)(Object(c.e)(r,"users",n,"idol",l));case 5:return(o=t.sent).exists()?(e.group=o.data().group,e.name=o.data().name):e.show=!1,t.next=9,Object(c.g)(Object(c.i)(Object(c.c)(r,"instax")));case 9:t.sent.forEach((function(t){e.placeData.includes(t.data().place)||e.placeData.push(t.data().place),e.eventData.includes(t.data().event)||e.eventData.push(t.data().event)})),e.created=!0;case 12:case"end":return t.stop()}}),t)}))),0)},methods:{register:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r,n,l;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=Object(c.h)(),n=e.$store.getters["auth/uid"],l=e.$route.params.uid,t.next=5,Object(c.a)(Object(c.b)(r,"users",n,"idol",l,"instax"),{date:e.selectDate,number:e.number,url:e.url,place:e.place,event:e.event});case 5:e.$router.push("/mypage/"+l);case 6:case"end":return t.stop()}}),t)})))()},clearDate:function(){this.selectDate=null}}},o=r(27),component=Object(o.a)(l,(function(){var e=this,t=e._self._c;return e.created?t("div",[t("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],staticClass:"mb-3"},[t("h3",[e._v(e._s(e.name))]),e._v(" "),t("h4",[e._v(e._s(e.group))]),e._v(" "),t("b-field",{attrs:{label:"日付"}},[t("b-datepicker",{attrs:{locale:"ja-JP",placeholder:"日付を選択してください",icon:"calendar-today","icon-right":e.selectDate?"close-circle":"","icon-right-clickable":"","trap-focus":""},on:{"icon-right-click":e.clearDate},model:{value:e.selectDate,callback:function(t){e.selectDate=t},expression:"selectDate"}})],1),e._v(" "),t("b-field",{attrs:{label:"枚数"}},[t("b-numberinput",{attrs:{editable:!1,type:"is-light",min:"1",max:"100"},model:{value:e.number,callback:function(t){e.number=t},expression:"number"}})],1),e._v(" "),t("b-field",{attrs:{label:"会場名"}},[t("b-autocomplete",{attrs:{data:e.filteredPlaceArray,placeholder:"会場名",clearable:""},scopedSlots:e._u([{key:"empty",fn:function(){return[e._v("入力候補はありません")]},proxy:!0}],null,!1,1659253314),model:{value:e.place,callback:function(t){e.place=t},expression:"place"}})],1),e._v(" "),t("b-field",{attrs:{label:"イベント名"}},[t("b-autocomplete",{attrs:{data:e.filteredEventArray,placeholder:"イベント名",clearable:""},scopedSlots:e._u([{key:"empty",fn:function(){return[e._v("入力候補はありません")]},proxy:!0}],null,!1,1659253314),model:{value:e.event,callback:function(t){e.event=t},expression:"event"}})],1),e._v(" "),t("b-field",{attrs:{label:"URL"}},[t("b-input",{attrs:{placeholder:"https://"},model:{value:e.url,callback:function(t){e.url=t},expression:"url"}})],1)],1),e._v(" "),t("div",{staticClass:"buttons"},[t("b-button",{attrs:{type:"is-link is-light"},on:{click:e.register}},[e._v("登録")]),e._v(" "),t("b-button",{attrs:{type:"is-link is-light"},on:{click:function(t){return e.$router.go(-1)}}},[e._v("戻る")])],1)]):e._e()}),[],!1,null,null,null);t.default=component.exports}}]);