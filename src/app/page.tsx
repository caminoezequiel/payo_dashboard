'use client';
import { ReportCard, StatisticsCard, StatisticsChart } from '@/widgets';
import { TransactionList } from '@/widgets/transaction-list';
import { selectReport, useAppSelector } from '@/redux/store';

export default function Dashboard() {
  const report = useAppSelector(selectReport);
  return (
    <div>
      <ReportCard report={report} />
      {report && <StatisticsCard report={report} />}
      {report && <StatisticsChart report={report} />}
      {report && <TransactionList report={report} />}
    </div>
  );
}
