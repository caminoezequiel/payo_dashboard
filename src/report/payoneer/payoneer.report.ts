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

export interface ReportItem {
  date: Date;
  description: string;
  amount: number;
  currency: string;
  status: string;
}

export class PayoneerReport {
  private currencies: string[];

  constructor(
    private readonly names: string[],
    private readonly range: DateRange,
    private readonly items: ReportItem[],
  ) {
    const unq = new Map();
    items.forEach(i => {
      unq.set(i.currency, i.currency);
    });
    this.currencies = [...unq.values() as any];
  }

  getFields(): string[] {
    return this.names;
  }

  getCurrencies(): string[] {
    return this.currencies;
  }

  getDateRange(): DateRange {
    return this.range;
  }

  getItems(currency: string | null = null, range: DateRange = this.range): ReportItem[] {
    return this.items
      .filter(i => !currency || i.currency === currency);
  }

  getIncomeItems(currency: string | null = null, range: DateRange = this.range) {
    return this.getItems(currency, range)
      .filter(i => i.amount >= 0)
      .filter(i => i.date >= range.from && i.date <= range.until);
  }

  getSpentItems(currency: string | null = null, range: DateRange = this.range) {
    return this.getItems(currency, range)
      .filter(i => i.amount < 0)
      .filter(i => i.date >= range.from && i.date <= range.until);
  }

  getStats(currency: string | null = null, range: DateRange | null = null): ReportStats {
    range = range ?? this.range;
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

  search(value: string, currency: string | null = 'USD'): ReportItem[] {
    const partial = this.getItems(currency);
    if (value?.length < 1) {
      return partial;
    }
    value = value.toLowerCase();
    return partial.filter(i => (
      i.description.toLowerCase().includes(value) ||
      i.amount.toString().includes(value) ||
      i.date.toISOString().toLowerCase().includes(value) ||
      i.currency.toLowerCase().includes(value)
    ));
  }
}
