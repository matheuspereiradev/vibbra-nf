import { Save } from '@mui/icons-material';
import { Button, Grid, MenuItem, Paper, TextField, Typography } from '@mui/material';
import { format, parseISO } from 'date-fns';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import Title from '../../components/Title';
import { useAuth } from '../../hooks/AuthContext';
import { useBackend } from '../../hooks/BackendContext';
import { IExpenditureCategory } from '../../interfaces/categoryExpenditure.interface';
import { IProvider } from '../../interfaces/provider';
import { DashboardLayout } from '../../layouts/default';

const validationSchema = Yup.object({
    amount: Yup.number()
        .positive('O valor deve ser maior que 0')
        .min(0.1, 'Valor mínimo de 1 centavo')
        .required('O campo não foi preenchido'),
    description: Yup.string()
        .max(40, 'Campo excede tamanho maximo de 40 caracteres')
        .min(15, 'Campo tem tamanho mínimo de 15 caracteres')
        .required('O campo não foi preenchido'),
    idCategory: Yup.number()
        .min(1, 'Campo obrigatório'),
    idProvider: Yup.number()
        .min(1, 'Campo obrigatório'),
});

const initialValues = {
    amount: 0,
    competence: format(parseISO(String(new Date().toISOString())), 'yyyy-MM'),
    description: '',
    idCategory: 0,
    paymentDate: format(parseISO(String(new Date().toISOString())), 'yyyy-MM-dd'),
    idProvider: 0,
};

function NewExpenditure() {
    const { user } = useAuth();
    const { id } = useParams();
    const [providers, setProviders] = useState<IProvider[]>([]);
    const [categories, setCategories] = useState<IExpenditureCategory[]>([]);

    const { post, put, get } = useBackend();

    const formik = useFormik({
        validateOnChange: false,
        validateOnBlur: false,
        initialValues,
        validationSchema,
        onSubmit: values => {
            const competence = values.competence.split('-');
            values.competence = `${competence[1]}/${competence[0]}`;
            values.paymentDate = `${values.paymentDate} 00:00`

            if (id)
                put(`expenditures/${id}`, values)
            else
                post('expenditures', values)
        },
    });

    useEffect(() => {
        if (user) {
            get(`providers`, (data: any) => {
                setProviders(data);
            });

            get(`expenditures/categories`, (data: any) => {
                setCategories(data);
            });


            if (id)
                get(`expenditures/find/${id}`, (data: any) => {
                    const competence = data.competence.split('/');
                    formik.setValues({
                        amount: data.amount,
                        competence: `${competence[1]}-${competence[0]}`,
                        description: data.description,
                        idProvider: data.provider.id,
                        paymentDate: data.paymentDate.slice(0, 10),
                        idCategory: data.idCategory
                    })
                });
        }
    }, [user, id])

    return (
        <>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <>
                        <Title>{id ? `Editar Despesa ${id}` : 'Lançar Despesa'}</Title>
                        <form onSubmit={formik.handleSubmit}>
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
                                        error={!!formik.errors.amount}
                                        onChange={formik.handleChange}
                                        value={formik.values.amount}
                                        helperText={formik.errors.amount}
                                    />
                                </Grid>
                                <Grid item xs={7}>
                                    <Typography>Descrição</Typography>
                                    <TextField
                                        fullWidth
                                        id="description"
                                        variant="standard"
                                        error={!!formik.errors.description}
                                        onChange={formik.handleChange}
                                        value={formik.values.description}
                                        helperText={formik.errors.description}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography>Data de pagamento</Typography>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        id="paymentDate"
                                        variant="standard"
                                        error={!!formik.errors.paymentDate}
                                        onChange={formik.handleChange}
                                        value={formik.values.paymentDate}
                                        helperText={formik.errors.paymentDate}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography>Competência</Typography>
                                    <TextField
                                        fullWidth
                                        type="month"
                                        id="competence"
                                        variant="standard"
                                        error={!!formik.errors.competence}
                                        onChange={formik.handleChange}
                                        value={formik.values.competence}
                                        helperText={formik.errors.competence}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>Fornecedor</Typography>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        name="idProvider"
                                        id="idProvider"
                                        select
                                        value={formik.values.idProvider}
                                        onChange={formik.handleChange}
                                        error={!!formik.errors.idProvider}
                                        helperText={formik.errors.idProvider}
                                    >
                                        <MenuItem key="0" value={0}>
                                            Selecione um fornecedor
                                        </MenuItem>
                                        {providers?.map((provider) => (
                                            <MenuItem key={provider.id} value={provider.id}>
                                                {`${provider.name}`}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>Categoria</Typography>

                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        name="idCategory"
                                        id="idCategory"
                                        select
                                        value={formik.values.idCategory}
                                        onChange={formik.handleChange}
                                        error={!!formik.errors.idCategory}
                                        helperText={formik.errors.idCategory}
                                    >
                                        <MenuItem key={0} value={0}>
                                            Selecione uma categoria
                                        </MenuItem>
                                        {categories?.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.name}
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

export default NewExpenditure;
