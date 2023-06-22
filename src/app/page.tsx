'use client';
import { useState } from 'react';
import { StatisticsCard, StatisticsChart, Uploader } from '@/widgets';
import { PayoneerParser, PayoneerReport } from '@/parser/payoneer';
import { TransactionList } from '@/widgets/transaction-list';

export default function Dashboard() {
  let [report, setReport]: [PayoneerReport | null, any] = useState(null);

  const onFileLoad = (content: string) => {
    if (content.length <= 0) {
      return;
    }
    setReport((new PayoneerParser()).parse(content));
  };
  return (
    <div>
      <Uploader id='reportFile' accept='.csv' onFileLoad={onFileLoad} />
      {report && <StatisticsCard report={report} />}
      {report && <StatisticsChart report={report} />}
      {report && <TransactionList report={report} />}
    </div>
  );
}
