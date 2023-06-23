'use client';
import { Card, CardBody, CardFooter, CardHeader, Typography } from '@/ui-kit';
import { chartsConfig } from '@/configs';
import { format } from 'date-fns';
import { PayoneerReport } from '@/parser/payoneer';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

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
    <div className='mt-12'>
      <Typography varient='h2' className='text-2xl font-bold' color='blue-gray'>Statistics Charts</Typography>
      <div className='grid xl:grid-cols-2 gap-4 mb-10 mt-12'>
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