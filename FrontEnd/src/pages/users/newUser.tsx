import { Save } from '@mui/icons-material';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import Title from '../../components/Title';
import { useAuth } from '../../hooks/AuthContext';
import { useBackend } from '../../hooks/BackendContext';
import { DashboardLayout } from '../../layouts/default';

const validationSchema = Yup.object({
    name: Yup.string()
        .max(40, 'Campo excede tamanho maximo de 40 caracteres')
        .min(3, 'Campo tem tamanho mínimo de 3 caracteres')
        .required('O campo não foi preenchido'),
    surname: Yup.string()
        .max(40, 'Campo excede tamanho maximo de 40 caracteres')
        .min(3, 'Campo tem tamanho mínimo de 3 caracteres')
        .required('O campo não foi preenchido'),
    password: Yup.string()
        .max(40, 'Campo excede tamanho maximo de 40 caracteres')
        .min(8, 'Campo tem tamanho mínimo de 8 caracteres')
        .required('O campo não foi preenchido'),
    email: Yup.string()
        .email('Endereço de email inválido')
        .max(50, 'Campo excede tamanho maximo de 50 caracteres')
        .min(10, 'Campo tem tamanho mínimo de 10 caracteres')
        .required('O campo não foi preenchido'),
});
const initialValues = {
    name: '',
    surname: '',
    email: '',
    password: ''
};

function NewUser() {
    const { id } = useParams();
    const { user } = useAuth();
    const { post, put, get } = useBackend();

    const formik = useFormik({
        validateOnChange:false,
        validateOnBlur:false,
        initialValues,
        validationSchema,
        onSubmit: values => {
            if (id)
                put(`users/${id}`, values)
            else
                post('users', values)
        },
    });

    useEffect(() => {
        if (id && user) {
            get(`users/find/${id}`, (data) => {
                formik.setValues({
                    name: data.name,
                    email: data.email,
                    surname: data.surname,
                    password: ''
                })
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
                            <form onSubmit={formik.handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography>Nome</Typography>
                                        <TextField
                                            fullWidth
                                            id="name"
                                            variant="standard"
                                            error={!!formik.errors.name}
                                            onChange={formik.handleChange}
                                            value={formik.values.name}
                                            helperText={formik.errors.name}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>Sobrenome</Typography>
                                        <TextField
                                            fullWidth
                                            id="surname"
                                            variant="standard"
                                            error={!!formik.errors.surname}
                                            onChange={formik.handleChange}
                                            value={formik.values.surname}
                                            helperText={formik.errors.surname}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>Email</Typography>
                                        <TextField
                                            type="email"
                                            fullWidth
                                            id="email"
                                            variant="standard"
                                            error={!!formik.errors.email}
                                            onChange={formik.handleChange}
                                            value={formik.values.email}
                                            helperText={formik.errors.email}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>Senha</Typography>
                                        <TextField
                                            type="password"
                                            fullWidth
                                            id="password"
                                            variant="standard"
                                            error={!!formik.errors.password}
                                            onChange={formik.handleChange}
                                            value={formik.values.password}
                                            helperText={formik.errors.password}
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
            </DashboardLayout>
        </div>
    );
}

export default NewUser;
