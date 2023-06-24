'use client';
import { Card, CardBody, Typography } from '@/ui-kit';
import { PayoneerReport } from '@/report';
import { useState } from 'react';
import { CurrencySelector } from '@/widgets';

export interface StatisticsProps {
  report: PayoneerReport;
}

export function StatisticsCard({ report }: StatisticsProps) {
  const currencies = report.getCurrencies();
  const [currency, setCurrency] = useState(currencies[0]);
  const [stats, setStats] = useState(report.getStats(currency));
  const {
    income,
    spent,
    saved,
    spentRate,
    savedRate,
  } = stats;

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

  const onCurrencyChange = (value: string) => {
    setCurrency(value);
    setStats(report.getStats(value));
  };

  return (
    <div className='mt-12'>
      <Typography varient='h2' className='text-2xl font-bold' color='blue-gray'>Statistics</Typography>
      <CurrencySelector id='stats_currency_filter' value={currency} items={currencies} onChange={onCurrencyChange} />
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