import { Save } from '@mui/icons-material';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Title from '../../components/Title';
import { useAuth } from '../../hooks/AuthContext';
import { useBackend } from '../../hooks/BackendContext';
import { DashboardLayout } from '../../layouts/default';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    name: Yup.string()
        .max(40, 'Campo excede tamanho maximo de 40 caracteres')
        .min(3, 'Campo tem tamanho mínimo de 3 caracteres')
        .required('O campo não foi preenchido'),
    description: Yup.string()
        .max(100, 'Campo excede tamanho maximo de 100 caracteres')
        .min(15, 'Campo tem tamanho mínimo de 15 caracteres')
        .required('O campo não foi preenchido')
});
const initialValues = {
    name: '',
    description: ''
};

function NewCategoryExpenditure() {
    const { id } = useParams();
    const { user } = useAuth();
    const { post, put, get } = useBackend();

    const formik = useFormik({
        validateOnChange: false,
        validateOnBlur: false,
        initialValues,
        validationSchema,
        onSubmit: values => {
            if (id)
                put(`expenditures/categories/${id}`, values)
            else
                post('expenditures/categories', values)
        },
    });

    useEffect(() => {
        if (id && user) {
            get(`expenditures/categories/find/${id}`, (data) => {
                formik.setValues({
                    name: data.name,
                    description: data.description
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
                            <Title>Cadastrar Categoria de Despesa</Title>
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
                                        <Typography>Descrição</Typography>
                                        <TextField
                                            fullWidth
                                            id="descrition"
                                            variant="standard"
                                            error={!!formik.errors.description}
                                            onChange={formik.handleChange}
                                            value={formik.values.description}
                                            helperText={formik.errors.description}
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

export default NewCategoryExpenditure;
