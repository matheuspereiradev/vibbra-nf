import { Save } from '@mui/icons-material';
import { Button, Grid, MenuItem, Paper, TextField, Typography } from '@mui/material';
import { format, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import ProtectedPage from '../../components/ProtectedPage';
import Title from '../../components/Title';
import { useAuth } from '../../hooks/AuthContext';
import { ICompany } from '../../interfaces/company.interface';
import { DashboardLayout } from '../../layouts/default';
import backendApi from '../../services/backend.axios';

interface ICreateData {
    amount: number,
    competence: string,
    description: string,
    idCompany: number,
    nfNumber: string,
    receiptDate: string
}
function NewInvoice() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { id } = useParams();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<ICreateData>();
    const onSubmit = (data: ICreateData) => {
        const competence = data.competence.split('-')
        data.competence = `${competence[1]}/${competence[0]}`;
        data.receiptDate = `${data.receiptDate} 00:00`
        if (id)
            updateInvoice(data)
        else
            createNew(data)
    };

    async function createNew(data: any) {
        backendApi.post(`invoices`, data).then(() => {
            Swal.fire(
                'Sucesso!',
                'Nota fiscal cadastrada com sucesso.',
                'success'
            )
            navigate(-1)
        }).catch(() => {
            Swal.fire(
                'Ops!',
                'Ocorreu um erro ao salvar Nota Fiscal, se persistir contate o suporte.',
                'error'
            )
        })
    }
    async function updateInvoice(data: any) {
        backendApi.put(`invoices/${id}`, data).then(() => {
            Swal.fire(
                'Sucesso!',
                'Nota fiscal editada com sucesso.',
                'success'
            )
            navigate(-1)
        }).catch(() => {
            Swal.fire(
                'Ops!',
                'Ocorreu um erro ao salvar Nota Fiscal, se persistir contate o suporte.',
                'error'
            )
        })
    }

    const [companies, setCompanies] = useState<ICompany[]>([]);

    useEffect(() => {
        if (user)
            backendApi.get(`companies`).then(({ data }) => {
                setCompanies(data);
            }).catch(() => {
                Swal.fire(
                    'Ops!',
                    'Ocorreu um erro ao carregar empresas, se persistir contate o suporte.',
                    'error'
                )
            })

        if (id)
            backendApi.get(`invoices/find/${id}`).then(({ data }) => {
                const competence = data.competence.split('/');
                setValue('amount', data.amount)
                setValue('competence', `${competence[1]}-${competence[0]}`)
                setValue('description', data.description)
                setValue('nfNumber', data.nfNumber)
                setValue('receiptDate', data.receiptDate.slice(0, 10))
            }).catch(() => {
                Swal.fire(
                    'Ops!',
                    'Ocorreu um erro ao carregar dados da NF, se persistir contate o suporte.',
                    'error'
                )
            })

    }, [user])

    return (
        <>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <>
                        <Title>{id ? `Editar Nota Fiscal ${id}` : 'Lançar Nota Fiscal'}</Title>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2}>
                                <Grid item xs={1}>
                                    <Typography>Valor</Typography>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        id="amount"
                                        inputProps={{
                                            step: ".01"
                                        }}
                                        variant="standard"
                                        {...register("amount", { required: true })}
                                    />
                                </Grid>
                                <Grid item xs={7}>
                                    <Typography>Número da NF</Typography>
                                    <TextField
                                        fullWidth
                                        id="nf-number"
                                        variant="standard"
                                        {...register("nfNumber", { required: true })}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography>Data recebimento</Typography>
                                    <TextField
                                        fullWidth
                                        defaultValue={format(parseISO(String(new Date().toISOString())), 'yyyy-MM-dd')}
                                        type="date"
                                        id="receipt-name"
                                        variant="standard"
                                        {...register("receiptDate", { required: true })} />
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography>Competência</Typography>
                                    <TextField
                                        fullWidth
                                        type="month"
                                        id="competence"
                                        defaultValue={format(parseISO(String(new Date().toISOString())), 'yyyy-MM')}
                                        variant="standard"
                                        {...register("competence", { required: true })} />
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography>Descrição</Typography>
                                    <TextField
                                        fullWidth
                                        id="description"
                                        variant="standard"
                                        {...register("description", { required: true })}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography>Empresa</Typography>
                                    <TextField
                                        id="select-company"
                                        select
                                        fullWidth
                                        variant="standard"
                                        {...register("idCompany")}
                                    >
                                        {companies?.map((company) => (
                                            <MenuItem key={company.cnpj} value={company.id}>
                                                {`${company.name} - ${company.cnpj}`}
                                            </MenuItem>
                                        ))}
                                    </TextField>

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

export default NewInvoice;
