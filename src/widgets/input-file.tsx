import { LegacyRef, useRef, useState } from 'react';
import { Button, Typography } from '@/ui-kit';
import { BsFiletypeCsv } from 'react-icons/bs';

export function InputFile(props: any) {
  const { id, extension, label, onChange, ...inputProps } = props;
  const inputRef = useRef<LegacyRef<HTMLInputElement>>(null);
  const inputAccept = `.${extension}`;
  const mimeType = `text/${extension}`;

  let [dragActive, setDragActive] = useState(false);
  const handleClick = () => {
    (inputRef?.current as any)?.click();
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e?.dataTransfer?.files && e?.dataTransfer?.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === mimeType) {
        onChange(file);
      }
    }
    setDragActive(false);
  };

  const handleInputChange = (e: any) => {
    if (e?.target?.files?.length > 0) {
      onChange(e.target.files[0]);
    }
  };

  return (
    <div id={`${id}_draggable`} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop}
         className='flex flex-col items-center p-4 w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none'
    >
      <BsFiletypeCsv className='w-6 h-6' />
      {dragActive && <Typography>Drop here</Typography>}
      {!dragActive && <Typography>Drop the CSV file or click on the button</Typography>}
      <Button size='sm' onClick={handleClick} className='mt-2'>Choose file</Button>
      <input ref={inputRef} type='file' accept={inputAccept} onChange={handleInputChange} {...inputProps}
             style={{ display: 'none' }} />
    </div>
  );
}