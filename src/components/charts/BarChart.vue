<script>
import { Bar } from 'vue-chartjs';
import is from 'is_js';

export default {
  extends: Bar,
  // props: ['data', 'labels', 'title', 'bgColor', 'borderColor'],
  watch: {
    data: function() {
      this.init();
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (is.not.undefined(this.$refs.canvas)) {
        this.renderChart(
          {
            labels: ['2018', '2019', '2020'],
            datasets: [
              {
                data: [1500, 3000, 1200],
                label: 'Supports this year GH₵',
                borderColor: 'transparent',
                backgroundColor: '#F44335',
                barPercentage: 0.5,
                categoryPercentage: 1,
              },
            ],
          },
          {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            scales: {
              xAxes: [
                {
                  display: true,
                },
              ],
              yAxes: [
                {
                  display: false,
                },
              ],
            },
          }
        );
      }
    },
  },
};
</script>
