import { Tab, Tabs, TabsHeader, Typography } from '@/ui-kit';

export interface CurrencySelectorProps {
  id: string,
  value: string,
  items: string[],
  onChange: (value: string) => void,
}

export function CurrencySelector({ id, value, items, onChange }: CurrencySelectorProps) {
  return (
    <Tabs id={id} value={value} className='w-full md:w-max flex flex-row items-center'>
      <Typography variant='small' color='blue-gray' className='font-normal pr-2'>
        Currency
      </Typography>
      <TabsHeader>
        {items.map((value: any, k: number) => (
          <Tab key={k} value={value} onClick={() => onChange(value)}>
            &nbsp;&nbsp;{value}&nbsp;&nbsp;
          </Tab>
        ))}
      </TabsHeader>
    </Tabs>
  );
}