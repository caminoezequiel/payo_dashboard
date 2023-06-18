'use client';
import { Card, CardBody, CardFooter, CardHeader, Typography } from '@/components';
import Chart from 'react-apexcharts';
import { chartsConfig } from '@/configs';
import { format } from 'date-fns';
import { PayoneerReport } from '@/parser/payoneer/payoneer-report';

export interface StatisticsChartProps {
  report: PayoneerReport;
}

export function StatisticsChart({ report }: StatisticsChartProps) {
  const color = 'blue';
  const title = 'income';
  const description = 'income by date';
  const footer = false;

  const incomeData = report?.getIncomeItems()
    ?.map(r => ({ x: format(r.date, 'MM/dd/yyyy'), y: r.amount }));
  const spentData = report?.getSpentItems()
    ?.map(r => ({ x: format(r.date, 'MM/dd/yyyy'), y: r.amount }));

  const charts: any[] = [incomeData, spentData].map(data => ({
    type: 'bar',
    height: 250,
    series: [{
      name: 'income',
      data: data ?? [],
    }],
    options: {
      ...chartsConfig,
      title: {
        show: true,
      },
      colors: '#fff',
      plotOptions: {
        bar: {
          columnWidth: '16%',
          borderRadius: 5,
        },
      },
    },
  }));

  return (
    <div className='mt-20 mb-6'>
      <Typography varient='h2' className='text-2xl font-bold mb-6' color='blue-gray'>Statistics Charts</Typography>
      <div className='flex flex-row mb-10 mt-12 gap-3'>
        {charts.length && charts.map((chart, index) => (
          <Card key={index}>
            <CardHeader variant='gradient' color={color}>
              <Chart {...chart} />
            </CardHeader>
            <CardBody className='p-6'>
              <Typography variant='h6' color='blue-gray'>
                {title}
              </Typography>
              <Typography variant='small' className='font-normal text-blue-gray-600'>
                {description}
              </Typography>
            </CardBody>
            {footer && (
              <CardFooter className='border-t border-blue-gray-50 px-6 py-5'>
                {footer}
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}