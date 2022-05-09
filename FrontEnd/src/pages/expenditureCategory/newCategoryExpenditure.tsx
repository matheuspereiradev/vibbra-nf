import { Save } from '@mui/icons-material';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import ProtectedPage from '../../components/ProtectedPage';
import Title from '../../components/Title';
import { useAuth } from '../../hooks/AuthContext';
import { DashboardLayout } from '../../layouts/default';
import backendApi from '../../services/backend.axios';

interface ICreateData {
    name: string,
    description: string
}
function NewCategoryExpenditure() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<ICreateData>();
    const onSubmit = (data: ICreateData) => {
        if (id)
            updateCategory(data)
        else
            createNew(data)
    };
    async function updateCategory(data: any) {
        backendApi.put(`expenditures/categories/${id}`, data).then(() => {
            Swal.fire(
                'Sucesso!',
                'Categoria editada com sucesso.',
                'success'
            )
            navigate(-1)
        }).catch(() => {
            Swal.fire(
                'Ops!',
                'Ocorreu um erro ao salvar categoria, se persistir contate o suporte.',
                'error'
            )
        })
    }

    async function createNew(data: any) {
        backendApi.post(`expenditures/categories`, data).then(() => {
            Swal.fire(
                'Sucesso!',
                'Categoria cadastrada com sucesso.',
                'success'
            )
            navigate(-1)
        }).catch(() => {
            Swal.fire(
                'Ops!',
                'Ocorreu um erro ao salvar categoria, se persistir contate o suporte.',
                'error'
            )
        })
    }

    useEffect(() => {
        if (id && user)
            backendApi.get(`expenditures/categories/find/${id}`).then(({ data }) => {
                setValue("name", data.name)
                setValue("description", data.description)
            }).catch(() => {
                Swal.fire(
                    'Ops!',
                    'Ocorreu um erro ao carregar categoria, se persistir contate o suporte.',
                    'error'
                )
            })
    }, [id, user])

    return (
        <div className="App">
            <DashboardLayout titleKey='Teste'>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <>
                            <Title>Cadastrar Categoria de Despesa</Title>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <Typography>Nome</Typography>
                                        <TextField
                                            fullWidth
                                            id="name"
                                            variant="standard"
                                            {...register("name", { required: true, maxLength: 40 })}
                                        />
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography>Descrição</Typography>
                                        <TextField
                                            fullWidth
                                            id="descrition"
                                            variant="standard"
                                            {...register("description", { required: true, maxLength: 140 })}
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

export default NewCategoryExpenditure;
