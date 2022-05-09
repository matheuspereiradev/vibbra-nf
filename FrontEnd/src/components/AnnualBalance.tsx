import { Grid, MenuItem, Select, Skeleton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import Chart from 'react-google-charts';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import backendApi from '../services/backend.axios';
import Title from './Title';

interface IData {
  annualFaturetion: number,
  annualExpenditure: number
}

export default function AnnualBalance() {

  const [data, setData] = React.useState<IData>({
    annualExpenditure: 0,
    annualFaturetion: 0
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [year, setYear] = React.useState<number>(new Date().getFullYear());

  React.useEffect(() => {
    setIsLoading(true)

    backendApi.get(`reports/annualbalance?year=${year}`)
      .then(({ data }) => {
        setData(data)
      })
      .catch(() => {
        Swal.fire(
          'Ops!',
          'Ocorreu um erro ao carregar o dados do balanço anual, se persistir contate o suporte.',
          'error'
        )
      }).finally(() => {
        setIsLoading(false)
      })
  }, [year]);

  return (
    <>
      <Title>Balanço anual ({year})</Title>
      {
        isLoading ?
          <Skeleton
            variant="rectangular"
            width={"100%"}
            height={"180px"}
          />
          :
          <>

            <Select
              id="year-select"
              value={year}
              onChange={(e) => { setYear(Number(e.target.value)) }}
            >
              {Array.from({ length: 6 }, (_, i) => i + 1).map((x) => {
                const year = new Date().getFullYear() - 5 + x;
                return <MenuItem key={year} value={year}>{year}</MenuItem>
              }
              )}
            </Select>

            <Typography component="p" color={((Number(data.annualFaturetion) - Number(data.annualExpenditure)) < 0 ? "error.main" : "text.primary")} variant="h5">
              Balanço {(Number(data.annualFaturetion) - Number(data.annualExpenditure)).toFixed(2)} R$
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              Emitido: <b>{Number(data.annualFaturetion).toFixed(2)} R$</b> <br />
              Despesas <b>{Number(data.annualExpenditure).toFixed(2)} R$</b>
            </Typography>

            <div>
              <Link color="primary" to="/balanco">
                Ver detalhes
              </Link>
            </div>

          </>
      }
    </>
  );
}
