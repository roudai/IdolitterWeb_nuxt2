(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{341:function(t,n,o){"use strict";o.r(n);o(49);var e={data:function(){return{name:""}},created:function(){this.name=this.$store.getters["auth/displayName"]},methods:{socialAuth:function(){this.$store.dispatch("auth/logout")}}},c=o(27),component=Object(c.a)(e,(function(){var t=this,n=t._self._c;return n("div",[n("h5",[t._v("マイページ")]),t._v(" "),n("div",[t._v(t._s(t.name))]),t._v(" "),n("button",{staticClass:"button is-info mb-2",on:{click:function(n){return t.socialAuth()}}},[t._v("\n    ログアウトする\n  ")])])}),[],!1,null,null,null);n.default=component.exports}}]);