'use client';

import { fi } from 'date-fns/locale';
import { offset } from '@floating-ui/core';

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
  private currencies: string[];

  constructor(
    public readonly names: string[],
    public readonly range: DateRange,
    public readonly items: PayoneerReportItem[],
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

  getItems(currency: string | null = 'USD', range: DateRange = this.range): PayoneerReportItem[] {
    return this.items
      .filter(i => !currency || i.currency === currency);
  }

  getIncomeItems(currency: string | null = 'USD', range: DateRange = this.range) {
    return this.getItems(currency, range)
      .filter(i => i.amount >= 0)
      .filter(i => i.date >= range.from && i.date <= range.until);
  }

  getSpentItems(currency: string | null = 'USD', range: DateRange = this.range) {
    return this.getItems(currency, range)
      .filter(i => i.amount < 0)
      .filter(i => i.date >= range.from && i.date <= range.until);
  }

  getStats(currency: string | null = 'USD', range: DateRange = this.range): ReportStats {
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

  search(value: string, currency: string | null = 'USD'): PayoneerReportItem[] {
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

  static paginate(items: PayoneerReportItem[], page = 1, size = 10): PayoneerReportItem[] {
    if (items.length < size) {
      return items;
    }
    const offset = page > 1 ? (page - 1) * size : 0;
    return items.slice(offset, offset + size);
  }
}
