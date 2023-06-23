import type { Props as ChartProps } from 'react-apexcharts';
import { chartConfig } from './chart-config';

export class ChartBuilder {
  static build(data: { x: string, y: number }[]): ChartProps {
    return {
      type: 'bar',
      height: 250,
      series: [{
        data,
      }],
      options: {
        ...chartConfig,
        chart: {
          ...chartConfig?.chart,
        },
        colors: ['#fff'],
        plotOptions: {
          bar: {
            columnWidth: '50%',
            borderRadius: 3,
          },
        },
      },
    };
  }
}