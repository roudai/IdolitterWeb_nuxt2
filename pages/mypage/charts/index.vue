<template>
  <div>
    <apex-charts
      :options="options"
      :series="series"
      :labels="labels"
      :width="350"
      :height="500"
    ></apex-charts>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: {
        chart: {
          type: 'donut',
        },
        labels: [
          '柴田 あいこ',
          '雨夜 憧',
          '来海 りか子',
          '佐藤 倫子',
          '雨夜 憧',
          '来海 りか子',
          '佐藤 倫子',
        ],
      },
      series: [15, 8, 10, 2, 10, 15, 20],
    }
  },
}
</script>
