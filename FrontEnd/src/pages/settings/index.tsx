import { Save } from '@mui/icons-material';
import { Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';
import Title from '../../components/Title';
import { useAuth } from '../../hooks/AuthContext';
import { useBackend } from '../../hooks/BackendContext';
import { DashboardLayout } from '../../layouts/default';

const validationSchema = Yup.object({
    maximumAnnualBillingLimit: Yup.number()
        .min(1, 'Campo tem tamanho mínimo de 1 real')
        .required('O campo não foi preenchido'),
    notifyFrom: Yup.number()
        .min(1, 'Campo tem tamanho mínimo de 1%')
        .max(99,'O campo não exceder 99%'),
});

const initialValues = {
    sendEmailBillingAlerts: false,
    emailBillingAlerts: '',
    maximumAnnualBillingLimit: 0,
    notifyFrom: 0
};


function Settings() {
    const { user } = useAuth();
    const { put, get } = useBackend();

    const formik = useFormik({
        validateOnChange: false,
        validateOnBlur: false,
        initialValues,
        validationSchema,
        onSubmit: values => {
            put(`settings`, values)
        },
    });

    useEffect(() => {

        if (user) {
            get(`settings`, (data) => {
                formik.setValues({
                    emailBillingAlerts: data.emailBillingAlerts,
                    maximumAnnualBillingLimit: data.maximumAnnualBillingLimit,
                    notifyFrom: data.notifyFrom,
                    sendEmailBillingAlerts: data.sendEmailBillingAlerts
                })
            })
        }
    }, [user])


    return (
        <div className="App">
            <DashboardLayout titleKey='Teste'>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <>
                            <Title>Configurações</Title>
                            <Typography style={{ fontWeight: 'bold' }}>Configurações orçamento</Typography>
                            <br />
                            <form onSubmit={formik.handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={2}>
                                        <Typography>Orçamento anual</Typography>
                                        <TextField
                                            fullWidth
                                            type="number"
                                            id="maximumAnnualBillingLimit"
                                            inputProps={{
                                                step: ".01"
                                            }}
                                            variant="standard"
                                            error={!!formik.errors.maximumAnnualBillingLimit}
                                            onChange={formik.handleChange}
                                            value={formik.values.maximumAnnualBillingLimit}
                                            helperText={formik.errors.maximumAnnualBillingLimit}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    id="sendEmailBillingAlerts"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.sendEmailBillingAlerts}
                                                    checked={formik.values.sendEmailBillingAlerts}
                                                />
                                            }
                                            label="Enviar alertas para email"
                                        />

                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>Enviar notificação para o email</Typography>
                                        <TextField
                                            fullWidth
                                            id="emailBillingAlerts"
                                            variant="standard"
                                            error={!!formik.errors.emailBillingAlerts}
                                            onChange={formik.handleChange}
                                            value={formik.values.emailBillingAlerts}
                                            helperText={formik.errors.emailBillingAlerts}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography>Notificar apartir de(%)</Typography>
                                        <TextField
                                            fullWidth
                                            type="number"
                                            id="notifyFrom"
                                            variant="standard"
                                            error={!!formik.errors.notifyFrom}
                                            onChange={formik.handleChange}
                                            value={formik.values.notifyFrom}
                                            helperText={formik.errors.notifyFrom}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Button type="submit" fullWidth variant="contained" endIcon={<Save />}>
                                            Salvar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </>
                    </Paper>
                </Grid>
            </DashboardLayout>
        </div>
    );
}

export default Settings;
