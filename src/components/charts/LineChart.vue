<template>
  <div
    id="chart-container"
    style="width: 100%; height: 280px; margin: auto"
  ></div>
</template>

<script>
var CanvasJS = require('../../assets/canvasjs.min.js');
CanvasJS = CanvasJS.Chart ? CanvasJS : window.CanvasJS;

export default {
  name: 'LineChart',
  props: {
    chartData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      chart: null,
      chartOptions: {
        data: [
          {
            type: 'line',
            indexLabelFontSize: 16,
            dataPoints: [
              { y: 3200, label: '2020' },
              { y: 800, label: '2019' },
            ],
          },
        ],
      },
    };
  },
  mounted() {
    this.chart = new CanvasJS.Chart('chart-container', this.chartOptions);
    this.chart.render();
  },
};
</script>
