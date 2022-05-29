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
        .max(45, 'Campo excede tamanho maximo de 45 caracteres')
        .min(3, 'Campo tem tamanho mínimo de 3 caracteres')
        .required('O campo não foi preenchido'),
    salePrice: Yup.number()
        .min(1, 'Valor mínimo de 1,00 R$')
        .required('O campo não foi preenchido'),
});
const initialValues = {
    name: "",
    salePrice: 0,
    details: "",
    idType: "SRV",
};

function NewService() {
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
                put(`products/${id}`, values)
            else
                post('products', values)
        },
    });

    useEffect(() => {
        if (user) {

            if (id)
                get(`products/find/${id}`, (data: any) => {
                    formik.setValues({
                        details: data.details,
                        idType: data.idType,
                        name: data.name,
                        salePrice: data.salePrice
                    })
                });
        }
    }, [user, id])

    return (
        <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <>
                    <Title>{id ? `Editar Serviço ${id}` : 'Cadastrar Serviço'}</Title>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={10}>
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
                            <Grid item xs={2}>
                                <Typography>Valor Venda</Typography>
                                <TextField
                                    fullWidth
                                    type="number"
                                    inputProps={{
                                        step: ".01"
                                    }}
                                    id="salePrice"
                                    variant="standard"
                                    error={!!formik.errors.salePrice}
                                    onChange={formik.handleChange}
                                    value={formik.values.salePrice}
                                    helperText={formik.errors.salePrice}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>Detalhes</Typography>
                                <TextField
                                    fullWidth
                                    id="details"
                                    variant="standard"
                                    error={!!formik.errors.details}
                                    onChange={formik.handleChange}
                                    value={formik.values.details}
                                    helperText={formik.errors.details}
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
    );
}

export default NewService;
