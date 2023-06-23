import { format } from 'date-fns';
import { ReportItem } from './payoneer-report';

export interface GroupItem {
  group: string,
  total: number
}

export class ReportHelper {
  static paginate(items: ReportItem[], page = 1, size = 10): ReportItem[] {
    if (items.length < size) {
      return items;
    }
    const offset = page > 1 ? (page - 1) * size : 0;
    return items.slice(offset, offset + size);
  }

  static groupByDate(items: ReportItem[], groupType: 'day' | 'month'): GroupItem[] {
    const result: GroupItem[] = [];
    const mapping = new Map<string, number>();
    const types = {
      'day': 'MM/dd/yyyy',
      'month': 'MM/yyyy',
    };

    items.forEach(item => {
      const key = format(item.date, types[groupType]);
      mapping.set(key, (mapping.get(key) ?? 0) + item.amount);
    });
    mapping.forEach((total, group) => result.push({ group, total: Math.round(total * 100) / 100 }));
    return result;
  }
}