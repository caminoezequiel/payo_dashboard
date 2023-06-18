import { LegacyRef, useRef } from 'react';
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components';

export function InputFile(props: any) {
  const { label, ...inputProps } = props;
  const fileInputRef = useRef<LegacyRef<HTMLInputElement>>(null);
  const handleClick = () => {
    (fileInputRef?.current as any)?.click();
  };
  return (
    <>
      <input ref={fileInputRef} {...inputProps} style={{ display: 'none' }} />
      <Button size='sm' onClick={handleClick}><ArrowUpTrayIcon className='w-6 h-6 text-white' /></Button>
    </>
  );
}