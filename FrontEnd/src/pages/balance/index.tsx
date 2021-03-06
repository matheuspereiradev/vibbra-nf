import { Grid, Paper } from '@mui/material';
import GraphAnnualBalanceDetails from '../../components/ChartAnnualBalanceDetails';
import { useAuth } from '../../hooks/AuthContext';
import { DashboardLayout } from '../../layouts/default';

function BalanceDashboard() {
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

                        }}
                    >
                        <GraphAnnualBalanceDetails />
                    </Paper>
                </Grid>
            </DashboardLayout>
        </div>
    );
}

export default BalanceDashboard;
