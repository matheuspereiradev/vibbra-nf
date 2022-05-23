import { Button, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import InvoicesList from '../../components/InvoicesList';
import { DashboardLayout } from '../../layouts/default';

function InvoicesListAll() {

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
                        <InvoicesList onlyMonth={false} />
                        <Grid container>
                            <Grid item xs={2}>
                                <Link to="/nf/cadastrar" style={{ textDecoration: 'none', color: 'inherit' }}>
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

export default InvoicesListAll;
