import { Skeleton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import Chart from 'react-google-charts';
import Swal from 'sweetalert2';
import backendApi from '../services/backend.axios';
import Title from './Title';


const options = {
  legend: { position: 'none' }
}

interface IData {
  id: number,
  name: string,
  sum: number
}

export default function ChartExpenditureByCategory() {
  const theme = useTheme();

  function formatData(data: IData[]) {
    const dataFormat: any = []
    data.forEach(d => {
      dataFormat.push([d.name, +d.sum])
    });
    console.log(dataFormat)

    setGraphData(dataFormat)
  }

  const [graphData, setGraphData] = React.useState<Array<[]>>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsLoading(true)

    backendApi.get(`reports/expenditurebycategory`)
      .then(({ data }) => {
        formatData(data)
      })
      .catch(() => {
        Swal.fire(
          'Ops!',
          'Ocorreu um erro ao carregar o grafico de Gastos por categoria, se persistir contate o suporte.',
          'error'
        )
      }).finally(() => {
        setIsLoading(false)
      })
  }, []);

  return (
    <>
      <Title>Gastos por categoria</Title>
      {
        isLoading ? <Skeleton
          variant="rectangular"
          width={"100%"}
          height={"180px"}
        /> :
          <Chart
            chartType="ColumnChart"
            data={[["Categoria", "Valor"], ...graphData]}
            options={options}
            width={"100%"}
            height={"180px"}
          />
      }

    </>
  );
}
