import { Input } from '@/ui-kit';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

export interface SearcherProps {
  onChange: (search: string) => void;
}

export function Searcher({ onChange }: SearcherProps) {
  const onSearchChange = (e: any) => {
    const value = (e?.target?.value < 2) ? '' : e?.target?.value;
    onChange(value);
  };

  return (
    <div className='flex shrink-0 gap-2 lg:w-max'>
      <div className='w-full md:w-96'>
        <Input onChange={onSearchChange} label='Search' icon={<MagnifyingGlassIcon className='h-5 w-5' />} />
      </div>
    </div>
  );
}

