import { Save } from '@mui/icons-material';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Title from '../../components/Title';
import { useAuth } from '../../hooks/AuthContext';
import { DashboardLayout } from '../../layouts/default';
import backendApi from '../../services/backend.axios';

interface ISettingsData {
    sendEmailBillingAlerts: boolean,
    emailBillingAlerts: string,
    maximumAnnualBillingLimit: number,
    notifyFrom: number
}
function Settings() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm<ISettingsData>();
    const onSubmit = (data: ISettingsData) => {
        backendApi.put(`settings`, data).then(() => {
            Swal.fire(
                'Sucesso!',
                'Configurações alteradas com sucesso.',
                'success'
            )
        }).catch(() => {
            Swal.fire(
                'Ops!',
                'Ocorreu um erro ao salvar configurações, se persistir contate o suporte.',
                'error'
            )
        })
        console.log(data)
    };
    const { user } = useAuth();

    useEffect(() => {
        if (user)
            backendApi.get(`settings`).then(({ data }) => {
                setValue("emailBillingAlerts", data.emailBillingAlerts);
                setValue("maximumAnnualBillingLimit", data.maximumAnnualBillingLimit);
                setValue("sendEmailBillingAlerts", data.sendEmailBillingAlerts);
                setValue("notifyFrom", data.notifyFrom);
            }).catch(() => {
                Swal.fire(
                    'Ops!',
                    'Ocorreu um erro ao carregar configurações, se persistir contate o suporte.',
                    'error'
                )
            })
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
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid container spacing={2}>
                                    <Grid item xs={2}>
                                        <Typography>Orçamento anual</Typography>
                                        <TextField
                                            fullWidth
                                            type="number"
                                            id="standard-basic"
                                            inputProps={{
                                                step: ".01"
                                            }}
                                            variant="standard"
                                            {...register("maximumAnnualBillingLimit", { required: true })}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>Enviar alertas para email</Typography>
                                        <input
                                            type="checkbox"
                                            placeholder="Enviar alertas para email"
                                            {...register("sendEmailBillingAlerts", { required: true })}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>Enviar notificação para o email</Typography>
                                        <TextField
                                            fullWidth
                                            id="emailbillingalert"
                                            variant="standard"
                                            {...register("emailBillingAlerts", { required: true })}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography>Notificar apartir de(%)</Typography>
                                        <TextField
                                            fullWidth
                                            type="number"
                                            id="notify-from"
                                            variant="standard"
                                            {...register("notifyFrom", { required: true })}
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
