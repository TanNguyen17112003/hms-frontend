import { ApexOptions } from 'apexcharts';
export const colorList = ['#0E1680', '#646ED8', '#CCD0F8'];
export const barChartOptions: ApexOptions = {
  chart: {
    type: 'bar',
    height: 350,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%'
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },

  yaxis: {
    title: {
      text: 'Number of Appointments'
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter: (val) => `${val} appointments`
    }
  },
  colors: colorList
};

export const radialChartOptions: ApexOptions = {
  chart: {
    type: 'radialBar'
  },
  plotOptions: {
    radialBar: {
      dataLabels: {
        name: {
          fontSize: '22px'
        },
        value: {
          fontSize: '16px'
        },
        total: {
          show: true,
          label: 'Total'
        }
      }
    }
  },
  colors: colorList
};
