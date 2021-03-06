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
import { IExpenditureCategory } from '../../interfaces/categoryExpenditure.interface';
import { ICompany } from '../../interfaces/company.interface';
import { DashboardLayout } from '../../layouts/default';
import backendApi from '../../services/backend.axios';

interface ICreateData {
    amount: number,
    competence: string,
    description: string,
    idCompany: number,
    paymentDate: string
    idCategory: string,
}

function NewExpenditure() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<ICreateData>();
    const { user } = useAuth();
    const { id } = useParams();
    const [companies, setCompanies] = useState<ICompany[]>([]);
    const [categories, setCategories] = useState<IExpenditureCategory[]>([]);

    const onSubmit = (data: ICreateData) => {
        const competence = data.competence.split('-')
        data.competence = `${competence[1]}/${competence[0]}`;
        data.paymentDate = `${data.paymentDate} 00:00`
        if (id)
            updateExpenditure(data)
        else
            createNew(data)
    };
    console.log(errors);

    function createNew(data: any) {
        backendApi.post(`expenditures`, data).then(() => {
            Swal.fire(
                'Sucesso!',
                'Despesa cadastrada com sucesso!',
                'success'
            )
            navigate(-1)
        }).catch(() => {
            Swal.fire(
                'Ops!',
                'Ocorreu um erro ao salvar despesa, se persistir contate o suporte.',
                'error'
            )
        })
    }
    function updateExpenditure(data: any) {
        backendApi.put(`expenditures/${id}`, data).then(() => {
            Swal.fire(
                'Sucesso!',
                'Despesa cadastrada com sucesso!',
                'success'
            )
            navigate(-1)
        }).catch(() => {
            Swal.fire(
                'Ops!',
                'Ocorreu um erro ao salvar despesa, se persistir contate o suporte.',
                'error'
            )
        })
    }

    useEffect(() => {
        if (user) {
            backendApi.get(`companies`).then(({ data }) => {
                setCompanies(data);
            }).catch(() => {
                Swal.fire(
                    'Ops!',
                    'Ocorreu um erro ao carregar empresas, se persistir contate o suporte.',
                    'error'
                )
            })
            backendApi.get(`expenditures/categories`).then(({ data }) => {
                setCategories(data);
            }).catch(() => {
                Swal.fire(
                    'Ops!',
                    'Ocorreu um erro ao carregar categorias, se persistir contate o suporte.',
                    'error'
                )
            })
            if (id)
                backendApi.get(`expenditures/find/${id}`).then(({ data }) => {
                    const competence = data.competence.split('/');
                    setValue("amount", data.amount)
                    setValue("competence", `${competence[1]}-${competence[0]}`)
                    setValue("description", data.description)
                    setValue("idCategory", data.category.id)
                    // setValue("idCompany", 4)
                    setValue("paymentDate", data.paymentDate.slice(0, 10))
                }).catch(() => {
                    Swal.fire(
                        'Ops!',
                        'Ocorreu um erro ao carregar dados da despesa, se persistir contate o suporte.',
                        'error'
                    )
                })
        }
    }, [user, id, setValue])

    return (
        <div className="App">
            <DashboardLayout titleKey='Teste'>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <>
                            <Title>{id ? `Editar Despesa ${id}` : 'Lan??ar Despesa'}</Title>
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
                                        <Typography>Descri????o</Typography>
                                        <TextField
                                            fullWidth
                                            id="descricao"
                                            variant="standard"
                                            {...register("description", { required: true })}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography>Data de pagamento</Typography>
                                        <TextField
                                            fullWidth
                                            defaultValue={format(parseISO(String(new Date().toISOString())), 'yyyy-MM-dd')}
                                            type="date"
                                            id="paymentdate"
                                            variant="standard"
                                            {...register("paymentDate", { required: true })} />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography>Compet??ncia</Typography>
                                        <TextField
                                            fullWidth
                                            type="month"
                                            id="competence"
                                            defaultValue={format(parseISO(String(new Date().toISOString())), 'yyyy-MM')}
                                            variant="standard"
                                            {...register("competence", { required: true })} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>Empresa</Typography>
                                        <TextField
                                            id="company"
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
                                    <Grid item xs={6}>
                                        <Typography>Categoria</Typography>
                                        <TextField
                                            id="select-category"
                                            select
                                            fullWidth
                                            variant="standard"
                                            {...register("idCategory")}
                                        >
                                            {categories?.map((category) => (
                                                <MenuItem key={category.id} value={category.id}>
                                                    {category.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
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

export default NewExpenditure;
