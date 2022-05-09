import { Button, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import ExpendituresList from '../../components/ExpendituresList';
import { DashboardLayout } from '../../layouts/default';

function ExpendituresListAll() {

    return (
        <div className="App">
            <DashboardLayout titleKey='Teste'>
                <Grid item xs={12} md={12} lg={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: 500,
                        }}
                    >
                        <ExpendituresList onlyMonth={false} />
                        <Grid container>
                            <Grid item xs={2}>
                                <Link to="/despesas/cadastrar" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Button fullWidth variant="contained">Lançar nova</Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </DashboardLayout>
        </div>
    );
}

export default ExpendituresListAll;
