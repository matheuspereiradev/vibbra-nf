import { Grid, Skeleton, Typography } from '@mui/material';
import * as React from 'react';
import Chart from 'react-google-charts';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import backendApi from '../services/backend.axios';
import Title from './Title';

export default function ChartBudgetAnnualPercentage() {
  const [yearFaturation, setYearFaturation] = React.useState(0);
  const [maximumAnnualBillingLimit, setMaximumAnnualBillingLimit] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    setIsLoading(true)
    backendApi.get(`reports/meibillingpercentage`)
      .then(({ data }) => {
        setYearFaturation(data.yearFaturation)
        setMaximumAnnualBillingLimit(data.maximumAnnualBillingLimit)
      })
      .catch(() => {
        Swal.fire(
          'Ops!',
          'Ocorreu um erro ao carregar gráfico de Quantidade de emição disponível, se persistir contate o suporte.',
          'error'
        )
      }).finally(() => {
        setIsLoading(false)
      })
  }, []);

  return (
    <>
      <Title>Quantidade de emição disponível</Title>
      {
        isLoading ?
          <Skeleton
            variant="rectangular"
            width={"100%"}
            height={"180px"}
          />
          :
          <>
            <Typography component="p" variant="h5">
              Disponível {(maximumAnnualBillingLimit - yearFaturation).toFixed(2)} R$
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              Orçamento anual: <b>{maximumAnnualBillingLimit.toFixed(2)} R$</b> <br />
              Valor emitido <b>{yearFaturation.toFixed(2)} R$</b>
            </Typography>
            <Chart
              chartType="PieChart"
              data={[
                ["Description", "Value"],
                ["Valor já emitido", yearFaturation],
                ["Valor disponível", maximumAnnualBillingLimit - yearFaturation],
              ]}
              width={"100%"}
              height={"180px"}
            />

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
