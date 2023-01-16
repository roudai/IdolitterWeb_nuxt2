<template>
  <div>
    <div>アイドリッターは、日本最大のアイドル情報データベースです。</div>
    <div>
      Twitterアカウント :
      <a href="https://twitter.com/Idol_itter" target="_blank">@idol_itter</a>
    </div>
    <h5 class="mt-3">現在の登録データ数</h5>
    <div class="m-3 is-size-5">
      アイドル <b>{{ idolNum }} 人</b>
    </div>
    <div class="m-3 is-size-5">
      グループ <b>{{ groupNum }} 組</b>
    </div>

    <h3><nuxt-link to="idol" class="is-underlined">アイドル一覧</nuxt-link></h3>
    <div>登録されているアイドルを確認できます。</div>
    <div>
      <ul>
        <li>
          女性アイドルグループを対象としています。ただし、男性が女性として活動している場合はこの限りではありません。
        </li>
        <li>
          現役で活動しているグループ・アイドルのみを対象としているため、解散、脱退等で活動終了した場合、削除されます。
        </li>
        <li>
          俗に言う地下アイドル、ライブアイドルと呼ばれる方達を対象としているため、48グループ等は含みません。また、アーティストや声優を名乗っており、アイドルと分類されない方たちも含まれているかもしれません。
        </li>
        <li>
          運営の方針でメンバーがTwitterの個人アカウントを所有していないグループは対象外となっています。また、ジュニアアイドル（メンバーが小学生以下しかいない等）、ソロアイドルも対象外としています。
        </li>
        <li>
          Twitterアカウント、名前の読み方はすべて手動で調べ上げているため、既に脱退しているメンバーが含まれている、新しいメンバーが含まれていない、名前の読み方が間違っている、という場合があります。
        </li>
        <li>
          グループを兼任している場合、重複を避けるためいずれかひとつだけのグループとして扱っています。
        </li>
        <li>
          フォロワー、ツイート数は、毎日0時過ぎに集計した時点のもののため、現在の数字とは異なる場合があります。
        </li>
      </ul>
    </div>

    <h3>
      <nuxt-link to="group" class="is-underlined">グループ一覧</nuxt-link>
    </h3>
    <div>登録されているグループを確認できます。</div>
    <div>
      <ul>
        <li>
          ツイッター公式アカウントがあるグループを対象としています。グループ内グループ等アイドル一覧では分割して登録されている場合でも、ひとつのグループとしている場合があります。
        </li>
      </ul>
    </div>

    <h3>
      <nuxt-link to="ranking" class="is-underlined">ランキング</nuxt-link>
    </h3>
    <div>
      前日のフォロワー数増ランキング、ツイート数増ランキングを100位まで見ることができます。
      <ul>
        <li>
          前日から3倍以上増えた場合、異常データとしてランキングから除外されます。
        </li>
      </ul>
    </div>

    <h3><nuxt-link to="history" class="is-underlined">履歴</nuxt-link></h3>
    <div>
      Twitterアカウント名の変更、アカウントの削除（不明）、データの自動削除の履歴を見ることができます。
      <ul>
        <li>
          約 1 時間に 1 回、リスト内全アイドルの Twitter
          アカウントが生存しているか、またはアカウント名が変わっているかを確認します。
        </li>
        <li>
          卒業解散予定日から14日過ぎたとき、または卒業解散予定日以降にアカウントの削除があった場合、「削除済」となりデータが削除されます。
        </li>
      </ul>
    </div>

    <h3>情報提供のお願い</h3>
    <div>
      アイドルグループ、所属アイドルの情報を随時募集しています。スプレッドシートに記載されていない、または既に解散してしまったグループ、脱退、卒業、解雇等で既にいないメンバー、新メンバーの情報等募集しています。
      下記投稿フォーム、またはツイッターアカウントへの返信、DM
      でも情報提供をお待ちしています。
    </div>
    <div class="m-4">
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSeTQqBbtt936OCTaQeCRJgy4K_N78JF9JrtLcH8ZzZTSQ9I5g/viewform"
        class="is-underlined"
        target="_blank"
        >投稿フォーム</a
      >
    </div>
    <a8-index-under></a8-index-under>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, $config }) {
    const baseUrl = $axios.defaults.baseURL + '統計?'
    const params = {
      key: $config.apiKey,
      range: '統計!B1:B2',
    }
    const queryParams = new URLSearchParams(params)
    const response = await $axios.$get(baseUrl + queryParams)
    return response
  },
  data() {
    return {
      idolNum: 0,
      groupNum: 0,
    }
  },
  created() {
    this.idolNum = parseInt(this.$data.values[0])
    this.groupNum = parseInt(this.$data.values[1])
  },
}
</script>

<style>
ul.none {
  padding-left: 0;
}

li.none {
  list-style: none;
  margin-left: -1rem;
}
</style>
