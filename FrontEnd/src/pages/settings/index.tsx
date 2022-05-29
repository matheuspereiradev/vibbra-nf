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
        .max(99, 'O campo não exceder 99%'),
});
const validationSchemaCompany = Yup.object({
    name: Yup.string()
        .max(45, 'Campo excede quantidade máxima de 45 caracteres')
        .min(5, 'Campo tem tamanho mínimo de 5 caracteres')
        .required('O campo não foi preenchido'),
    corporateName: Yup.string()
        .max(45, 'Campo excede quantidade máxima de 45 caracteres')
        .min(5, 'Campo tem tamanho mínimo de 5 caracteres')
        .required('O campo não foi preenchido'),
    cnpj: Yup.string()
        .max(18, 'Campo excede quantidade máxima de 18 caracteres')
        .min(14, 'Campo tem tamanho mínimo de 14 caracteres')
        .required('O campo não foi preenchido'),
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
    const formikCompany = useFormik({
        validateOnChange: false,
        validateOnBlur: false,
        initialValues: {
            name: user?.company.name,
            corporateName: user?.company.corporateName,
            cnpj: user?.company.cnpj
        },
        validationSchema: validationSchemaCompany,
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

            formikCompany.setValues({
                name: user?.company.name,
                corporateName: user?.company.corporateName,
                cnpj: user?.company.cnpj
            })
        }
    }, [user])


    return (
        <>
            {
                user?.isOwner && <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <>
                            <Title>Configurações da empresa</Title>
                            <Typography style={{ fontWeight: 'bold' }}>Configurações orçamento</Typography>
                            <br />
                            <form onSubmit={formikCompany.handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <Typography>Nome</Typography>
                                        <TextField
                                            fullWidth
                                            id="name"
                                            variant="standard"
                                            error={!!formikCompany.errors.name}
                                            onChange={formikCompany.handleChange}
                                            value={formikCompany.values.name}
                                            helperText={formikCompany.errors.name}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>Razão Social</Typography>
                                        <TextField
                                            fullWidth
                                            id="corporateName"
                                            variant="standard"
                                            error={!!formikCompany.errors.corporateName}
                                            onChange={formikCompany.handleChange}
                                            value={formikCompany.values.corporateName}
                                            helperText={formikCompany.errors.corporateName}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>CNPJ</Typography>
                                        <TextField
                                            fullWidth
                                            id="cnpj"
                                            variant="standard"
                                            error={!!formikCompany.errors.cnpj}
                                            onChange={formikCompany.handleChange}
                                            value={formikCompany.values.cnpj}
                                            helperText={formikCompany.errors.cnpj}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button type="submit" fullWidth variant="contained" startIcon={<Save />}>
                                            Salvar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </>
                    </Paper>
                </Grid>
            }

            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <>
                        <Title>Configurações do sistema</Title>
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
                                    <Button type="submit" fullWidth variant="contained" startIcon={<Save />}>
                                        Salvar
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </>
                </Paper>
            </Grid>
        </>
    );
}

export default Settings;
