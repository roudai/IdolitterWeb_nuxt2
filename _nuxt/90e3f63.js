(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{364:function(t,e,o){"use strict";o.r(e);o(77);var r={data:function(){return{show:!0,back:!1,provider:""}},created:function(){var t=this,e=this.$route.params.provider;"twitter"===e?this.provider="Twitter":"google"===e?this.provider="Google":"github"===e?this.provider="GitHub":this.show=!1,this.$store.dispatch("auth/login"),setTimeout((function(){t.back=!0}),5e3)}},n=o(28),component=Object(n.a)(r,(function(){var t=this,e=t._self._c;return e("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}]},[e("h5",[t._v(t._s(t.provider)+"でログインしています...")]),t._v(" "),e("nuxt-link",{directives:[{name:"show",rawName:"v-show",value:t.back,expression:"back"}],attrs:{to:"/auth/login"}},[t._v("ログインページに戻る")])],1)}),[],!1,null,null,null);e.default=component.exports}}]);