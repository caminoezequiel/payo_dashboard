import { Card, CardBody, Typography } from '@/ui-kit';
import { Uploader } from '@/widgets/uploader';
import { CurrencySelector } from '@/widgets/currency-selector';
import { PayoneerReport } from '@/report';
import { selectCurrencies, selectCurrency, useAppDispatch, useAppSelector } from '@/redux/store';
import { setCurrency } from '@/redux/report-slice';

export interface ReportCardInterface {
  report: PayoneerReport | null,
}

export function ReportCard({ report }: ReportCardInterface) {
  const dispatch = useAppDispatch();
  const currency = useAppSelector(selectCurrency) ?? 'ALL';
  const currencies = ['ALL', ...useAppSelector(selectCurrencies)];
  const onCurrencyChange = (value: string) => {
    dispatch(setCurrency((value == 'ALL') ? null : value));
  };

  return (
    <Card>
      <CardBody>
        <Typography varient='h2' className='text-2xl font-bold mb-2' color='blue-gray'>Report Detail</Typography>
        {!report && <Uploader id='reportFile' extension='csv' />}
        {report &&
          <CurrencySelector id='ReportCurrencySel' value={currency} items={currencies} onChange={onCurrencyChange} />
        }
      </CardBody>
    </Card>
  );
}