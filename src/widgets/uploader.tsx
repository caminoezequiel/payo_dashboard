'use client';
import { useState } from 'react';
import { InputFile } from '@/widgets';
import { Card, CardBody, Spinner, Typography } from '@/ui-kit';

export function Uploader({ id, extension, onFileLoad }: any) {
  const [file, setFile] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: File) => {
    setFile(e);
    if (e) {
      setLoading(true);
      const fileReader = new FileReader();
      fileReader.onload = function(event) {
        onFileLoad(event?.target?.result);
        setTimeout(() => setLoading(false), 500);
      };
      fileReader.readAsText(e);
    }
  };

  return (
    <div className='flex flex-col gap-3'>
      <Typography varient='h2' className='text-2xl font-bold' color='blue-gray'>Report File</Typography>
      <Card>
        <CardBody>
          {!file && <InputFile
            id={id}
            extension={extension}
            onChange={handleChange}
          />}
          {loading && <Spinner />}
          {file && !loading && <Typography className='text-md' color='blue-gray'>[{file.name}]</Typography>}
        </CardBody>
      </Card>

    </div>
  );
}