export const chartConfig = {
  chart: {
    width: '100%',
    height: '100%',
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    labels: {
      style: {
        colors: '#fff',
        fontSize: '10px',
        fontFamily: 'inherit',
        fontWeight: 300,
      },
    },
  },
  yaxis: {
    axisTicks: {
      show: false,
    },
    labels: {
      style: {
        colors: '#fff',
        fontSize: '10px',
        fontFamily: 'inherit',
        fontWeight: 300,
      },
    },
    tickAmount: 15,
    logarithmic: true,
  },
  grid: {
    show: false,
  },
  fill: {
    opacity: 0.8,
  },
  tooltip: {
    theme: 'dark',
  },
};

