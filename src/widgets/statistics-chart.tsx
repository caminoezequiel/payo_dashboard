'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import type { Props as ChartProps } from 'react-apexcharts';
import { Card, CardBody, CardHeader, Typography } from '@/ui-kit';
import { GroupType, PayoneerReport, ReportHelper } from '@/report';
import { CurrencySelector } from '@/widgets';
import { ChartBuilder } from '@/chart';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

export interface StatisticsChartProps {
  report: PayoneerReport;
}

export function StatisticsChart({ report }: StatisticsChartProps) {
  const color = 'blue';
  const currencies = report.getCurrencies();
  let [currency, setCurrency] = useState(currencies[0]);

  const spentData = ReportHelper
    .groupBy(report?.getSpentItems(currency), GroupType.MONTH)
    .map(r => ({
      x: r.group,
      y: -r.total, // convert to positive
    }));

  const incomeData = ReportHelper
    .groupBy(report?.getIncomeItems(currency), GroupType.DAY)
    .map(r => ({
      x: r.group,
      y: r.total,
    }));

  const charts: { title: string, chart: ChartProps }[] = [
    { title: 'Income by day', chart: ChartBuilder.build(incomeData) },
    { title: 'Expenses by month', chart: ChartBuilder.build(spentData) },
  ];

  return (
    <div className='mt-12'>
      <Typography varient='h2' className='text-2xl font-bold' color='blue-gray'>Statistics Charts</Typography>
      <CurrencySelector id='charts_currency_options' value={currency} items={currencies} onChange={setCurrency} />
      <div className='grid xl:grid-cols-2 gap-4 mb-10 mt-12'>
        {charts.map(({ title, chart }, index) => (
          <Card key={index}>
            <CardHeader variant='gradient' color={color}>
              <Chart {...chart} />
            </CardHeader>
            <CardBody className='p-6'>
              <Typography variant='h6' color='blue-gray'>
                {title}
              </Typography>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}