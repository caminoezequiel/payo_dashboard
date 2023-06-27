'use client';
import { selectCurrency, selectDateRange, useAppSelector } from '@/redux/store';
import { Card, CardBody, Typography } from '@/ui-kit';
import { PayoneerReport } from '@/report';

export interface StatisticsProps {
  report: PayoneerReport;
}

export function StatisticsCard({ report }: StatisticsProps) {
  const currency = useAppSelector(selectCurrency);
  const dateRange = useAppSelector(selectDateRange);
  const {
    income,
    spent,
    saved,
    spentRate,
    savedRate,
  } = report.getStats(currency, dateRange);

  let cardStats = [
    {
      title: 'Total Income',
      value: `${income.toFixed(2)}`,
    },
    {
      title: 'Total Spent',
      value: `${spent.toFixed(2)}`,
    },
    {
      title: 'Total Saved',
      value: `${saved.toFixed(2)}`,
    },
    {
      title: 'Spent Rate',
      value: `${spentRate.toFixed(2)}%`,
    },
    {
      title: 'Saved Rate',
      value: `${savedRate.toFixed(2)}%`,
    },
  ];

  return (
    <div className='mt-12'>
      <Typography varient='h2' className='text-2xl font-bold' color='blue-gray'>Statistics</Typography>
      <div className='grid xl:grid-cols-5 gap-4'>
        {cardStats.map(({ title, value }, index) => (
          <Card key={index} className='mt-6'>
            <CardBody>
              <Typography className='mb-2'>{title}</Typography>
              <Typography variant='h5' color='blue-gray'>{value}</Typography>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}