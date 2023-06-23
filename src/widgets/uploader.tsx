'use client';
import { useState } from 'react';
import { InputFile } from '@/widgets';
import { Spinner, Typography } from '@/ui-kit';

export function Uploader({ id, accept, onFileLoad }: any) {
  const [file, setFile] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: any) => {
    setFile(e.target.files[0]);
    if (e.target.files[0]) {
      setLoading(true);
      const fileReader = new FileReader();
      fileReader.onload = function(event) {
        onFileLoad(event?.target?.result);
        setTimeout(() => setLoading(false), 500);
      };
      fileReader.readAsText(e.target.files[0]);
    }
  };

  return (
    <div className='flex flex-col gap-3'>
      <Typography varient='h2' className='text-2xl font-bold' color='blue-gray'>Report File</Typography>
      <div className='flex items-center'>
        {loading && <Spinner />}
        {!file && <InputFile
          id={id}
          type={'file'}
          accept={accept}
          onChange={handleChange}
        />}
        {file && !loading && <Typography className='text-md' color='blue-gray'>[{file.name}]</Typography>}
      </div>
    </div>
  );
}