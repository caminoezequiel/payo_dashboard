import { parse } from 'date-fns';
import { DateRange, PayoneerReport, PayoneerReportItem } from '@/parser/payoneer/payoneer-report';
import { PayoneerSanitizer } from '@/parser/payoneer/payoneer.sanitizer';

export class PayoneerParser {
  parse(content: string): PayoneerReport {
    const lines = content.split('\r\n').filter(l => l?.trim()?.length > 0);
    const names = (lines.shift() || '').split(',');
    const items = lines
      .map(PayoneerSanitizer.sanitize);

    return this.createReport(names, items);
  }

  private createReport(fieldNames: string[], lines: string[]): PayoneerReport {
    const items = lines
      .map(line => line.split(','))
      .map(this.createReportItem)
      .sort((a, b) => {
        return (a.date === b.date) ? 0 : (a.date < b.date) ? -1 : 1;
      });

    return new PayoneerReport(fieldNames, new DateRange(items[0].date, items[items.length - 1].date), items);
  }

  private createReportItem(item: string[]): PayoneerReportItem {
    return {
      date: parse(item[0], 'dd-MMM-yyyy', new Date()),
      description: item[1],
      amount: Number(item[2]),
      currency: item[3],
      status: item[4],
    };
  }
}

