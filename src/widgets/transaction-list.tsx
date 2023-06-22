import { format } from 'date-fns';
import { Button, Card, CardBody, CardHeader, Chip, Input, Typography } from '@/components';
import { PayoneerReport, PayoneerReportItem } from '@/parser/payoneer';
import { ArrowDownTrayIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

export function TransactionList({ report }: { report: PayoneerReport }) {
  const currency = null;
  let [items, setItems] = useState(report.getItems(currency));
  const columns = report.getFields();
  const handleSearch = (e: any) => {
    const value = (e?.target?.value || '').toLowerCase();
    if (value.length < 2) {
      setItems(report.getItems(currency));
      return;
    }

    setItems(report.getItems(currency).filter(i => (
      i.description.toLowerCase().includes(value) ||
      i.amount.toString().toLowerCase().includes(value) ||
      i.date.toISOString().toLowerCase().includes(value) ||
      i.currency.toLowerCase().includes(value)
    )));
  };

  return (
    <div className='mt-12'>
      <Typography varient='h2' className='text-2xl font-bold' color='blue-gray'>Transactions</Typography>
      <Card className='overflow-scroll h-full w-full mt-6'>
        <CardHeader floated={false} shadow={false} className='mt-4 rounded-none'>
          <SearchInput onChange={handleSearch} />
        </CardHeader>
        <CardBody>
          <TransactionTable items={items} columns={columns} />
        </CardBody>
      </Card>
    </div>
  );
}

export function SearchInput({ onChange }: any) {
  return (
    <div className='mt-2 mb-4 flex flex-col gap-8 md:flex-row justify-end'>
      <div className='flex w-full shrink-0 gap-2 md:w-max'>
        <div className='w-full md:w-96'>
          <Input label='Search' icon={<MagnifyingGlassIcon className='h-5 w-5' />} onChange={onChange} />
        </div>
      </div>
    </div>
  );
}

export function TransactionTable({ columns, items }: { columns: string[], items: PayoneerReportItem[] }) {
  return (
    <table className='w-full min-w-max table-auto text-left'>
      <thead>
      <tr>
        {columns.map((name, index) => (
          <th key={index} className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
            <Typography
              variant='small'
              color='blue-gray'
              className='font-normal leading-none opacity-70'
            >
              {name}
            </Typography>
          </th>
        ))}
      </tr>
      </thead>
      <tbody>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';
        return (
          <tr key={index}>
            <td className={classes}>
              <Typography variant='small' color='blue-gray' className='font-normal'>
                {format(item.date, 'dd/MM/yyyy')}
              </Typography>
            </td>
            <td className={classes}>
              <Typography variant='small' color='blue-gray' className='font-normal'>
                {item.description}
              </Typography>
            </td>
            <td className={classes}>
              <Typography variant='small' color='blue-gray' className='font-normal'>
                {item.amount.toFixed(2)}
              </Typography>
            </td>
            <td className={classes}>
              <Typography variant='small' color='blue-gray' className='font-normal'>
                {item.currency}
              </Typography>
            </td>
            <td className={classes}>
              <div className='w-max'>
                <Chip value={item.status} color='green' size='sm' variant='ghost' />
              </div>
            </td>
          </tr>
        );
      })}
      </tbody>
    </table>
  );
}