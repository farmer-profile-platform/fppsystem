<script>
import { Pie } from 'vue-chartjs';
import is from 'is_js';

export default {
  extends: Pie,
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
            labels: [
              'Seedling',
              'Farm Technology',
              'Farm Implements',
              'Farmer Capacity Training',
            ],
            datasets: [
              {
                data: [12, 20, 9, 18],
                borderColor: 'white',
                backgroundColor: ['#2CB96B', 'red', 'orange', '#4FC2AB'],
                borderWidth: 4,
                hoverBorderWidth: 6,
              },
            ],
          },
          {
            cutoutPercentage: 0,
            maintainAspectRatio: true,
            legend: {
              display: true,
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
