<template>
  <div
    id="chart-container"
    style="width: 100%; height: 300px; margin: auto"
  ></div>
</template>

<script>
var CanvasJS = require('../../assets/canvasjs.min.js');
CanvasJS = CanvasJS.Chart ? CanvasJS : window.CanvasJS;

export default {
  name: 'DoughnutChart',
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
        exportFileName: 'Doughnut Chart',
        exportEnabled: true,
        animationEnabled: true,
        legend: {
          cursor: 'pointer',
          itemclick: 'explodePie',
        },
        data: [
          {
            type: 'doughnut',
            showInLegend: true,
            innerRadius: 50,
            indexLabel: '{name} - #percent%',
            toolTipContent: '<b>{name}:</b> {y} (#percent%)',
            dataPoints: this.chartData,
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
