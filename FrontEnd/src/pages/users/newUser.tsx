import { Save } from '@mui/icons-material';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Title from '../../components/Title';
import { useAuth } from '../../hooks/AuthContext';
import { DashboardLayout } from '../../layouts/default';
import backendApi from '../../services/backend.axios';

interface ICreateData {
    name: string,
    surname: string,
    password: string,
    email: string
}
function NewUser() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<ICreateData>();
    const onSubmit = (data: ICreateData) => {
        if (id)
            updateUser(data)
        else
            createNew(data)
    };

    function createNew(data: any) {
        backendApi.post(`users`, data).then(() => {
            Swal.fire(
                'Sucesso!',
                'Usuário cadastrado com sucesso.',
                'success'
            )
            navigate(-1)
        }).catch(() => {
            Swal.fire(
                'Ops!',
                'Ocorreu um erro ao salvar usuário, se persistir contate o suporte.',
                'error'
            )
        })
    }
    function updateUser(data: any) {
        backendApi.put(`users/${id}`, data).then(() => {
            Swal.fire(
                'Sucesso!',
                'Usuário editado com sucesso.',
                'success'
            )
            navigate(-1)
        }).catch(() => {
            Swal.fire(
                'Ops!',
                'Ocorreu um erro ao salvar usuário, se persistir contate o suporte.',
                'error'
            )
        })
    }

    useEffect(() => {
        if (id && user) {
            backendApi.get(`users/find/${id}`).then(({ data }) => {
                setValue('email', data.email)
                setValue('name', data.name)
                setValue('surname', data.surname)
            }).catch(() => {
                Swal.fire(
                    'Ops!',
                    'Ocorreu um erro ao caregar usuário, se persistir contate o suporte.',
                    'error'
                )
            })
        }
    }, [id, user])

    return (
        <div className="App">
            <DashboardLayout titleKey='Teste'>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <>
                            <Title>Cadastrar Usuário</Title>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography>Nome</Typography>
                                        <TextField
                                            fullWidth
                                            id="name"
                                            variant="standard"
                                            {...register("name", { required: true, maxLength: 40 })} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>Sobrenome</Typography>
                                        <TextField
                                            fullWidth
                                            id="surname"
                                            variant="standard"
                                            {...register("surname", { required: true, maxLength: 40 })} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>Email</Typography>
                                        <TextField
                                            type="email"
                                            fullWidth
                                            id="email"
                                            variant="standard"
                                            {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>Senha</Typography>
                                        <TextField
                                            type="password"
                                            fullWidth
                                            id="password"
                                            variant="standard"
                                            {...register("password", { required: true, minLength: 6, maxLength: 12 })} />
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

export default NewUser;
