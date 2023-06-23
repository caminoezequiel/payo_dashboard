import { useState } from 'react';
import { Input } from '@/ui-kit';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { CurrencySelector } from '@/widgets';

export interface SearcherProps {
  onChange: (currency: string, search: string) => void
  currencies: string[],
}

export function Searcher({ currencies, onChange }: SearcherProps) {
  let [filter, setFilter] = useState('');
  let [currency, setCurrency] = useState('ALL');
  const onCurrencyChange = (value: any) => {
    setCurrency(value);
    onChange(filter, value);
  };
  const onSearchChange = (e: any) => {
    const value = (e?.target?.value < 2) ? '' : e?.target?.value;
    setFilter(value);
    onChange(value, currency);
  };

  return (
    <>
      <div className='flex shrink-0 gap-2 lg:w-max'>
        <div className='w-full md:w-96'>
          <Input onChange={onSearchChange} label='Search' icon={<MagnifyingGlassIcon className='h-5 w-5' />} />
        </div>
      </div>
      <CurrencySelector id='searcher_curr' value={currency} items={currencies} onChange={onCurrencyChange} />
    </>
  );
}

