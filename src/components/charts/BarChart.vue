<script>
import { Bar } from 'vue-chartjs';
import is from 'is_js';

export default {
  extends: Bar,
  props: ['data', 'labels', 'title'],
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
            labels: this.labels,
            datasets: [
              {
                data: this.data,
                label: this.title,
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
