(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{307:function(t,n,e){var content=e(315);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(49).default)("b6db0e04",content,!0,{sourceMap:!1})},314:function(t,n,e){"use strict";e(307)},315:function(t,n,e){var r=e(48)(!1);r.push([t.i,"ul.none{padding-left:0}li.none{list-style:none;margin-left:-1rem}",""]),t.exports=r},324:function(t,n,e){"use strict";e.r(n);var r=e(8),v=(e(33),e(13),e(24),e(25),e(202),{asyncData:function(t){return Object(r.a)(regeneratorRuntime.mark((function n(){var e,r,v,_,l,o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e=t.$axios,r=t.$config,v=e.defaults.baseURL+"統計?",_={key:r.apiKey,range:"統計!B1:B2"},l=new URLSearchParams(_),n.next=6,e.$get(v+l);case 6:return o=n.sent,n.abrupt("return",o);case 8:case"end":return n.stop()}}),n)})))()},data:function(){return{idolNum:0,groupNum:0}},created:function(){this.idolNum=parseInt(this.$data.values[0]),this.groupNum=parseInt(this.$data.values[1])}}),_=(e(314),e(28)),component=Object(_.a)(v,(function(){var t=this,n=t._self._c;return n("div",[n("div",[t._v("Idolitterは、日本最大のアイドル情報データベースです。")]),t._v(" "),t._m(0),t._v(" "),n("h5",{staticClass:"mt-3"},[t._v("現在の登録データ数")]),t._v(" "),n("div",{staticClass:"m-3 is-size-5"},[t._v("\n    アイドル "),n("b",[t._v(t._s(t.idolNum)+" 人")])]),t._v(" "),n("div",{staticClass:"m-3 is-size-5"},[t._v("\n    グループ "),n("b",[t._v(t._s(t.groupNum)+" 組")])]),t._v(" "),n("h3",[n("nuxt-link",{attrs:{to:"idol"}},[t._v("アイドル一覧")])],1),t._v(" "),n("div",[t._v("登録されているアイドルを確認できます。")]),t._v(" "),t._m(1),t._v(" "),n("h3",[n("nuxt-link",{attrs:{to:"idol"}},[t._v("アイドル一覧")])],1),t._v(" "),n("div",[t._v("登録されているグループを確認できます。")]),t._v(" "),t._m(2),t._v(" "),n("h3",[n("nuxt-link",{attrs:{to:"ranking"}},[t._v("ランキング")])],1),t._v(" "),t._m(3),t._v(" "),n("h3",[n("nuxt-link",{attrs:{to:"history"}},[t._v("履歴")])],1),t._v(" "),t._m(4),t._v(" "),n("h3",[t._v("情報提供のお願い")]),t._v(" "),n("div",[t._v("\n    アイドルグループ、所属アイドルの情報を随時募集しています。スプレッドシートに記載されていない、または既に解散してしまったグループ、脱退、卒業、解雇等で既にいないメンバー、新メンバーの情報等募集しています。\n    下記投稿フォーム、またはツイッターアカウントへの返信、DM\n    でも情報提供をお待ちしています。\n  ")]),t._v(" "),t._m(5)])}),[function(){var t=this,n=t._self._c;return n("div",[t._v("\n    Twitterアカウント :\n    "),n("a",{attrs:{href:"https://twitter.com/Idol_itter",target:"_blank"}},[t._v("@idol_itter")])])},function(){var t=this,n=t._self._c;return n("div",[n("ul",[n("li",[t._v("\n        女性アイドルグループを対象としています。ただし、男性が女性として活動している場合はこの限りではありません。\n      ")]),t._v(" "),n("li",[t._v("\n        俗に言う地下アイドル、ライブアイドルと呼ばれる方達を対象としているため、48グループ等は含みません。また、アーティストや声優を名乗っており、アイドルと分類されない方たちも含まれているかもしれません。\n      ")]),t._v(" "),n("li",[t._v("\n        運営の方針でメンバーがTwitterの個人アカウントを所有していないグループは対象外となっています。また、ジュニアアイドル（メンバーが小学生以下しかいない等）、ソロアイドルも対象外としています。\n      ")]),t._v(" "),n("li",[t._v("\n        Twitterアカウント、名前の読み方はすべて手動で調べ上げているため、既に脱退しているメンバーが含まれている、新しいメンバーが含まれていない、名前の読み方が間違っている、という場合があります。\n      ")]),t._v(" "),n("li",[t._v("\n        グループを兼任している場合、重複を避けるためいずれかひとつだけのグループとして扱っています。\n      ")]),t._v(" "),n("li",[t._v("\n        フォロワー、ツイート数は、毎日0時過ぎに集計した時点のもののため、現在の数字とは異なる場合があります。\n      ")])])])},function(){var t=this._self._c;return t("div",[t("ul",[t("li",[this._v("\n        ツイッター公式アカウントがあるグループを対象としています。グループ内グループ等アイドル一覧では分割して登録されている場合でも、ひとつのグループとしている場合があります。\n      ")])])])},function(){var t=this,n=t._self._c;return n("div",[t._v("\n    前日のフォロワー数増ランキング、ツイート数増ランキングを100位まで見ることができます。\n    "),n("ul",[n("li",[t._v("\n        前日から3倍以上増えた場合、異常データとしてランキングから除外されます。\n      ")])])])},function(){var t=this,n=t._self._c;return n("div",[t._v("\n    Twitterアカウント名の変更、アカウントの削除（不明）、データの自動削除の履歴を見ることができます。\n    "),n("ul",[n("li",[t._v("\n        約 1 時間に 1 回、リスト内全アイドルの Twitter\n        アカウントが生存しているか、またはアカウント名が変わっているかを確認します。\n      ")]),t._v(" "),n("li",[t._v("\n        卒業解散予定日から14日過ぎたとき、または卒業解散予定日以降にアカウントの削除があった場合、「削除済」となりデータが削除されます。\n      ")])])])},function(){var t=this._self._c;return t("div",{staticClass:"mt-2"},[t("a",{attrs:{href:"https://docs.google.com/forms/d/e/1FAIpQLSeTQqBbtt936OCTaQeCRJgy4K_N78JF9JrtLcH8ZzZTSQ9I5g/viewform"}},[this._v("投稿フォーム")])])}],!1,null,null,null);n.default=component.exports}}]);