import { PayoneerReportItem } from '@/parser/payoneer';
import { Chip, Typography } from '@/ui-kit';
import { format } from 'date-fns';

export interface TransactionTableProps {
  columns: string[],
  items: PayoneerReportItem[]
}

export function TransactionTable({ columns, items }: TransactionTableProps) {
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