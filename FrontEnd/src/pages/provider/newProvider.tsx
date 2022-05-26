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
    corporateName: Yup.string()
        .max(40, 'Campo excede tamanho maximo de 40 caracteres')
        .min(15, 'Campo tem tamanho mínimo de 15 caracteres')
        .required('O campo não foi preenchido')
});
const initialValues = {
    name: '',
    corporateName: ''
};

function NewProvider() {
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
                put(`providers/${id}`, values)
            else
                post('providers', values)
        },
    });

    useEffect(() => {
        if (id && user) {
            get(`providers/find/${id}`, (data) => {
                formik.setValues({
                    name: data.name,
                    corporateName: data.corporateName
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
                            <Title>{id ? `Editar Fornecedor ${id}` : 'Cadastrar Fornecedor'}</Title>
                            <form onSubmit={formik.handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
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
                                    <Grid item xs={8}>
                                        <Typography>Razão Social</Typography>
                                        <TextField
                                            fullWidth
                                            id="corporateName"
                                            variant="standard"
                                            error={!!formik.errors.corporateName}
                                            onChange={formik.handleChange}
                                            value={formik.values.corporateName}
                                            helperText={formik.errors.corporateName}
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
