import { Add, Delete, Save, SmsFailed } from '@mui/icons-material';
import { Button, Fab, Grid, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ProtectedPage from '../../components/ProtectedPage';
import Title from '../../components/Title';
import { useAuth } from '../../hooks/AuthContext';
import { IUser } from '../../interfaces/user.interface';
import { DashboardLayout } from '../../layouts/default';
import backendApi from '../../services/backend.axios';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

interface ICreateData {
    name: string,
    corporateName: string
}
function NewProvider() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<ICreateData>();
    const onSubmit = (data: ICreateData) => {
        if (id)
            updateProvider(data)
        else
            createNew(data)
    };

    async function createNew(data: any) {
        backendApi.post(`providers`, data).then(() => {
            Swal.fire(
                'Sucesso!',
                'Fornecedor cadastrada com sucesso.',
                'success'
            )
            navigate(-1)
        }).catch(() => {
            Swal.fire(
                'Ops!',
                'Ocorreu um erro ao salvar fornecedor, se persistir contate o suporte.',
                'error'
            )
        })
    }

    async function updateProvider(data: any) {
        backendApi.put(`providers/${id}`, data).then(() => {
            Swal.fire(
                'Sucesso!',
                'Fornecedor cadastrada com sucesso.',
                'success'
            )
            navigate(-1)
        }).catch(() => {
            Swal.fire(
                'Ops!',
                'Ocorreu um erro ao salvar fornecedor, se persistir contate o suporte.',
                'error'
            )
        })
    }

    useEffect(() => {
        if (id && user)
            backendApi.get(`providers/find/${id}`).then(({ data }) => {
                setValue('corporateName', data.corporateName)
                setValue('name', data.name)
            }).catch(() => {
                Swal.fire(
                    'Ops!',
                    'Ocorreu um erro ao carregar fornecedor, se persistir contate o suporte.',
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
                            <Title>{id ? `Editar Fornecedor ${id}` : 'Cadastrar Fornecedor'}</Title>
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
                                        <Typography>Razão Social</Typography>
                                        <TextField
                                            fullWidth
                                            id="comporate-name"
                                            variant="standard"
                                            {...register("corporateName", { required: true })}
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

export default NewProvider;
