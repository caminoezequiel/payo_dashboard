'use client';
import { useState } from 'react';
import { InputFile } from '@/widgets';
import { Spinner, Typography } from '@/ui-kit';
import { useAppDispatch } from '@/redux/store';
import { createReport } from '@/redux/report-slice';

export function Uploader({ id, extension }: any) {
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: File) => {
    setFile(e);
    if (e) {
      setLoading(true);
      const fileReader = new FileReader();
      fileReader.onload = function(event) {
        dispatch(createReport(event?.target?.result));
        setTimeout(() => setLoading(false), 500);
      };
      fileReader.readAsText(e);
    }
  };

  return (
    <div className='flex flex-col gap-3'>
      {!file && <InputFile
        id={id}
        extension={extension}
        onChange={handleChange}
      />}
      {loading && <Spinner />}
      {file && !loading && <Typography className='text-md' color='blue-gray'>[{file.name}]</Typography>}
    </div>
  );
}