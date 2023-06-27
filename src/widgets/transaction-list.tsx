import { useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@/ui-kit';
import { PayoneerReport, ReportHelper } from '@/report';
import { PageSizeSelector, Searcher, TransactionTable } from '@/widgets';
import { selectCurrency, useAppSelector } from '@/redux/store';

export function TransactionList({ report }: { report: PayoneerReport }) {
  let currency = useAppSelector(selectCurrency);
  console.log('currency--', currency);
  let [page, setPage] = useState(1);
  let [size, setSize] = useState(10);
  let [filter, setFilter] = useState('');
  const items = report.search(filter, currency);

  const columns = report.getFields();

  const handleSearch = (value: string) => {
    setFilter(value);
  };

  const changePage = (page: number) => setPage(page);
  const changeSize = (size: number) => setSize(size);

  const list = ReportHelper.paginate(items, page, size);
  const pages = Math.ceil(items.length / size);

  return (
    <div className='mt-12'>
      <Typography varient='h2' className='text-2xl font-bold' color='blue-gray'>Transactions</Typography>
      <Card className='overflow-scroll h-full w-full mt-6'>
        <CardHeader className='flex flex-col sm:flex-row md:flex-row lg:flex-row p-2 gap-2 rounded-none'
                    floated={false}
                    shadow={false}>
          <Searcher onChange={handleSearch} />
          <PageSizeSelector value={size} options={[10, 25, 50, 100]} onChange={changeSize} />
        </CardHeader>
        <CardBody>
          <TransactionTable items={list} columns={columns} />
        </CardBody>
        <CardFooter className='flex items-center justify-between border-t border-blue-gray-50 p-4'>
          <Typography variant='small' color='blue-gray' className='font-normal'>
            Page {page} of {pages}
          </Typography>
          <div className='flex gap-2'>
            <Button variant='outlined' color='blue-gray' size='sm' onClick={() => changePage(page - 1)}
                    disabled={page <= 1}>
              Previous
            </Button>
            <Button variant='outlined' color='blue-gray' size='sm' onClick={() => changePage(page + 1)}
                    disabled={page >= pages}>
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
