'use client';

export class DateRange {
  constructor(public from: Date, public until: Date) {
  }
}

export interface ReportStats {
  income: number;
  spent: number;
  saved: number;
  spentRate: number;
  savedRate: number;
}

export interface PayoneerReportItem {
  date: Date;
  description: string;
  amount: number;
  currency: string;
  status: string;
}

export class PayoneerReport {
  constructor(
    public readonly names: string[],
    public readonly range: DateRange,
    public readonly items: PayoneerReportItem[],
  ) {
  }

  getFields(): string[] {
    return this.names;
  }

  getItems(currency: string = 'USD', range: DateRange = this.range): PayoneerReportItem[] {
    return this.items
      .filter(i => !currency || i.currency === currency);
  }


  getIncomeItems(currency: string = 'USD', range: DateRange = this.range) {
    return this.getItems(currency, range)
      .filter(i => i.amount >= 0)
      .filter(i => i.date >= range.from && i.date <= range.until);
  }

  getSpentItems(currency: string = 'USD', range: DateRange = this.range) {
    return this.getItems(currency, range)
      .filter(i => i.amount < 0)
      .filter(i => i.date >= range.from && i.date <= range.until);
  }

  getStats(currency: string = 'USD', range: DateRange = this.range): ReportStats {
    const spentItems = this.getSpentItems(currency, range).map(i => i.amount);
    const incomeItems = this.getIncomeItems(currency, range).map(i => i.amount);

    const income = Math.round((incomeItems.reduce((t, v) => t + v, 0) ?? 0) * 100) / 100;
    const spent = Math.round((Math.abs(spentItems.reduce((t, v) => t + v, 0)) ?? 0) * 100) / 100;
    const saved = Math.round(((income - spent) ?? 0) * 100) / 100;
    let spentRate = 0;
    // avoid zero division
    if (income > 0 && spent > 0) {
      spentRate = Math.round(((spent * 100) / income) * 100) / 100;
    }
    const savedRate = Math.round((100 - spentRate) * 100) / 100;

    return {
      income,
      spent,
      saved,
      spentRate,
      savedRate,
    };
  }
}
