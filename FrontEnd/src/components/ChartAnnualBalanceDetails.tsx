import { Label } from '@mui/icons-material';
import { Divider, Grid, MenuItem, Select, Skeleton, Typography } from '@mui/material';
import * as React from 'react';
import Chart from 'react-google-charts';
import backendApi from '../services/backend.axios';
import Title from './Title';

const data = [
  ['Mês', 'Notas Fiscais', 'Despesas', 'Saldo'],
  ['2014', 1000, 400, 200],
  ['2015', 1170, 460, 250],
  ['2016', 660, 1120, 300],
  ['2017', 1030, 540, 350]
]

interface IDataGrouped {
  invoices: Array<any>
  expenditures: Array<any>
}

export default function GraphAnnualBalanceDetails() {
  const [year, setYear] = React.useState<number>(new Date().getFullYear());
  const [dataByCompetence, setDataByCompetence] = React.useState<IDataGrouped>();
  const [dataByPaymentDate, setDataByPaymentDate] = React.useState<IDataGrouped>();
  const [graphData, setGraphData] = React.useState<Array<[]>>([]);
  const [visualization, setVisualization] = React.useState<string>('dataByCompetence');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsLoading(true)
    getData();
  }, []);

  React.useEffect(() => {
    setIsLoading(true)
    getData();
  }, [year]);

  React.useEffect(() => {
    setIsLoading(true)
    drawGraph()
  }, [dataByCompetence, dataByPaymentDate, visualization])

  async function drawGraph() {
    if (!dataByCompetence && !dataByPaymentDate)
      return;
    const dataFormat: any[] = [['Mês', 'Notas Fiscais', 'Despesas', 'Saldo']];
    let month = 0;
    if (visualization === 'dataByCompetence')
      while (month < 12) {
        dataFormat.push([
          dataByCompetence?.expenditures[month].month,
          Number(dataByCompetence?.invoices[month].sum),
          Number(dataByCompetence?.expenditures[month].sum),
          Number(dataByCompetence?.invoices[month].sum) - Number(dataByCompetence?.expenditures[month].sum)
        ])
        month++;
      }
    else if (visualization === 'dataByPaymentDate')
      while (month < 12) {
        dataFormat.push([
          dataByPaymentDate?.expenditures[month].month,
          Number(dataByPaymentDate?.invoices[month].sum),
          Number(dataByPaymentDate?.expenditures[month].sum),
          Number(dataByPaymentDate?.invoices[month].sum) - Number(dataByPaymentDate?.expenditures[month].sum)
        ])
        month++;
      }
    setGraphData(dataFormat)
    setIsLoading(false)
  }

  async function getData() {
    const expenditures = await getExpenditures();
    const invoices = await getInvoices();

    setDataByCompetence({
      expenditures: expenditures.dataByCompetence,
      invoices: invoices.dataByCompetence
    });
    setDataByPaymentDate({
      expenditures: expenditures.dataByPaymentDate,
      invoices: invoices.dataByPaymentDate
    });
  }

  async function getExpenditures() {
    const { data } = await backendApi.get(`reports/montlyexpenditure?year=${year}&grouppedBy=all`);
    return data;
  }

  async function getInvoices() {
    const { data } = await backendApi.get(`reports/montlyinvoices?year=${year}&grouppedBy=all`);
    return data;

  }
  return (
    <>
      <Title>Balanço anual({year})</Title>
      <Typography style={{ fontWeight: 'bold' }}>Filtros:</Typography>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Typography>Ano:</Typography>
          <Select
            fullWidth
            id="demo-simple-select"
            value={year}
            onChange={(e) => { setYear(Number(e.target.value)) }}
          >
            {Array.from({ length: 6 }, (_, i) => i + 1).map((x) => {
              const year = new Date().getFullYear() - 5 + x;
              return <MenuItem key={year} value={year}>{year}</MenuItem>
            }
            )}
          </Select>
        </Grid>
        <Grid item xs={3}>
          <Typography>Agrupamento:</Typography>
          <Select
            id="select-visualization"
            value={visualization}
            fullWidth
            onChange={(e) => { setVisualization(e.target.value) }}
          >
            <MenuItem value='dataByCompetence'>Competência</MenuItem>
            <MenuItem value='dataByPaymentDate'>Data de recebimento/pagamento</MenuItem>
          </Select>

        </Grid>
      </Grid>
      <Divider sx={{ my: 1 }} />
      {
        isLoading ?
          <Skeleton
            variant="rectangular"
            width={"100%"}
            height={"200px"}
          />
          :
          <Chart
            chartType="ColumnChart"
            width="100%"
            height="400px"
            data={graphData}
            chartLanguage='pt'
          />
      }
    </>
  );
}
