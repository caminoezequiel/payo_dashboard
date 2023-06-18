import { PayoneerReport } from '@/parser/payoneer';
import { Typography } from '@/components';
import { format } from 'date-fns';

export function TransactionList({ report }: { report: PayoneerReport }) {
  const columns = report.getFields();
  const items = report.getItems();
  return (
    <div className='mt-20 mb-6'>
      <Typography varient='h2' className='text-2xl font-bold' color='blue-gray'>Transaction List</Typography>
      <table className='table-auto w-full'>
        <thead>
        <tr>{columns.map((name, index) => (<th key={index}>{name}</th>))}</tr>
        </thead>
        <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td>{format(item.date, 'dd/MM/yyyy')}</td>
            <td>{item.description}</td>
            <td>{item.amount.toFixed(2)}</td>
            <td>{item.currency}</td>
            <td>{item.status}</td>
          </tr>
        ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
}