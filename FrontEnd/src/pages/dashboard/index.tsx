import { Button, Grid, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import AnnualBalance from '../../components/AnnualBalance';
import ChartBudgetAnnualPercentage from '../../components/ChartBudgetAnnualPercentage';
import ChartExpenditureByCategory from '../../components/ChartExpenditureByCategory';
import InvoicesList from '../../components/InvoicesList';
import { DateFunctions } from '../../helpers/dateFunctions';
import { useAuth } from '../../hooks/AuthContext';
import { DashboardLayout } from '../../layouts/default';
import BasicListComponent from '../../sections/BasicListComponent';
import { expenditureColumns } from '../expenditures';
function Dashboard() {
    const { user } = useAuth();

    return (
        <div className="App">
            <DashboardLayout titleKey='Teste'>
                <Grid item xs={12} md={12} lg={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 400,
                        }}
                    >
                        <InvoicesList onlyMonth={true} />
                        <Grid container>
                            <Grid item xs={2}>
                                <Link to="/nf/cadastrar" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Button variant="contained">Lançar nova</Button>
                                </Link>
                            </Grid>
                            <Grid item xs={2}>
                                <Link color="primary" to="/nf" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Button variant="text">Ver todas</Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <BasicListComponent
                        label='Despesas'
                        backendRoute='expenditures'
                        frontendRoute='despesas'
                        gridColumns={expenditureColumns}
                        searchParams={`competence=${DateFunctions.getCompetence(new Date())}`}
                    />
                </Grid>
                <Grid item xs={12} md={8} lg={7}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        <ChartExpenditureByCategory />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={5}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        <AnnualBalance />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8} lg={7}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <ChartBudgetAnnualPercentage />
                    </Paper>
                </Grid>
            </DashboardLayout>
        </div>
    );
}

export default Dashboard;
