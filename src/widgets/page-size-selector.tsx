import { Tab, Tabs, TabsHeader, Typography } from '@/ui-kit';

export interface PagingSize {
  value: number,
  options: number[],
  onChange: (value: number) => void
}

export function PageSizeSelector({ value, options, onChange }: PagingSize) {
  return (<Tabs id='tabs_page_size' value={value} className='w-full md:w-max flex flex-row items-center'>
    <Typography variant='small' color='blue-gray' className='font-normal pr-2'>
      Page Size
    </Typography>
    <TabsHeader>
      {options.map((v, k) => (
        <Tab key={k} value={v} onClick={() => onChange(v)}>&nbsp;&nbsp;{v}&nbsp;&nbsp;</Tab>
      ))}
    </TabsHeader>
  </Tabs>);
}