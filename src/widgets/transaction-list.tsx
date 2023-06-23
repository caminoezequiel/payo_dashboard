import { useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@/ui-kit';
import { PayoneerReport, ReportHelper } from '@/report';
import { PageSizeSelector, Searcher, TransactionTable } from '@/widgets';

export function TransactionList({ report }: { report: PayoneerReport }) {
  let [page, setPage] = useState(1);
  let [size, setSize] = useState(10);
  let [items, setItems] = useState(report.getItems(null));

  const columns = report.getFields();
  const currencies: string[] = ['ALL', ...report.getCurrencies()];

  const handleSearch = (filter: string, currency: string) => {
    const curr = currency === 'ALL' ? null : currency;
    if (filter.length <= 1) {
      setItems(report.getItems(curr));
      return;
    }
    setItems(report.search(filter, curr));
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
          <Searcher currencies={currencies} onChange={handleSearch} />
          <PageSizeSelector value={size} options={[10, 25, 50]} onChange={changeSize} />
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
