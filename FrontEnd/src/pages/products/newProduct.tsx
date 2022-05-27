import { Save } from '@mui/icons-material';
import { Button, Grid, MenuItem, Paper, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import Title from '../../components/Title';
import { useAuth } from '../../hooks/AuthContext';
import { useBackend } from '../../hooks/BackendContext';
import { IMeansureUnit } from '../../interfaces/meansureunit.interface';
import { IProductType } from '../../interfaces/productTypes';
import { DashboardLayout } from '../../layouts/default';

const validationSchema = Yup.object({
    name: Yup.string()
        .max(45, 'Campo excede tamanho maximo de 45 caracteres')
        .min(3, 'Campo tem tamanho mínimo de 3 caracteres')
        .required('O campo não foi preenchido'),
    idType: Yup.string()
        .min(2, 'Campo é obrigatório')
        .required('O campo não foi preenchido'),
    idMeansureUnit: Yup.number()
        .min(1, 'Campo é obrigatório')
        .required('O campo não foi preenchido'),
});
const initialValues = {
    name: "",
    brandProduct: "",
    purchasePrice: 0,
    salePrice: 0,
    barcode: "",
    details: "",
    idType: "0",
    idMeansureUnit: 0,
    stockMin: 0
};

function NewProduct() {
    const { id } = useParams();
    const { user } = useAuth();

    const { post, put, get } = useBackend();
    const [meansureUnits, setMeansureUnits] = useState<IMeansureUnit[]>([])
    const [productTypes, setProductTypes] = useState<IProductType[]>([])

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
            get(`meansureunit`, (data: any) => {
                setMeansureUnits(data);
            });

            get(`producttype?types=PAC,PPD,INS`, (data: any) => {
                setProductTypes(data);
            });


            if (id)
                get(`products/find/${id}`, (data: any) => {
                    formik.setValues({
                        barcode: data.barcode,
                        brandProduct: data.brandProduct,
                        details: data.details,
                        idMeansureUnit: data.idMeansureUnit,
                        idType: data.idType,
                        name: data.name,
                        purchasePrice: data.purchasePrice,
                        salePrice: data.salePrice,
                        stockMin: data.stockMin
                    })
                });
        }
    }, [user, id])

    return (
        <div className="App">
            <DashboardLayout titleKey='Teste'>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <>
                            <Title>{id ? `Editar Produto ${id}` : 'Cadastrar Produto'}</Title>
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
                                    <Grid item xs={4}>
                                        <Typography>Código de barras</Typography>
                                        <TextField
                                            fullWidth
                                            id="barcode"
                                            variant="standard"
                                            error={!!formik.errors.barcode}
                                            onChange={formik.handleChange}
                                            value={formik.values.barcode}
                                            helperText={formik.errors.barcode}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography>Unidade de medida</Typography>
                                        <TextField
                                            id="idMeansureUnit"
                                            name="idMeansureUnit"
                                            select
                                            fullWidth
                                            variant="standard"
                                            error={!!formik.errors.idMeansureUnit}
                                            onChange={formik.handleChange}
                                            value={formik.values.idMeansureUnit}
                                            helperText={formik.errors.idMeansureUnit}
                                        >
                                            <MenuItem key={0} value={0}>
                                                Selecione
                                            </MenuItem>
                                            {meansureUnits?.map((um) => (
                                                <MenuItem key={um.id} value={um.id}>
                                                    {`${um.abbreviation} - ${um.name}`}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography>Tipo</Typography>
                                        <TextField
                                            id="idType"
                                            name="idType"
                                            select
                                            fullWidth
                                            variant="standard"
                                            error={!!formik.errors.idType}
                                            onChange={formik.handleChange}
                                            value={formik.values.idType}
                                            helperText={formik.errors.idType}
                                        >
                                            <MenuItem key="0" value="0">
                                                Selecione
                                            </MenuItem>
                                            {productTypes?.map((pt) => (
                                                <MenuItem key={pt.id} value={pt.id}>
                                                    {`${pt.id} - ${pt.name}`}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>Marca</Typography>
                                        <TextField
                                            fullWidth
                                            id="brandProduct"
                                            variant="standard"
                                            error={!!formik.errors.brandProduct}
                                            onChange={formik.handleChange}
                                            value={formik.values.brandProduct}
                                            helperText={formik.errors.brandProduct}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography>Valor Compra</Typography>
                                        <TextField
                                            fullWidth
                                            type="number"
                                            id="purchasePrice"
                                            error={!!formik.errors.purchasePrice}
                                            onChange={formik.handleChange}
                                            value={formik.values.purchasePrice}
                                            helperText={formik.errors.purchasePrice}
                                            variant="standard"
                                            inputProps={{
                                                step: ".01"
                                            }}
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
                                    <Grid item xs={2}>
                                        <Typography>Estoque Minímo</Typography>
                                        <TextField
                                            fullWidth
                                            type="number"
                                            inputProps={{
                                                step: ".01"
                                            }}
                                            id="stockMin"
                                            error={!!formik.errors.stockMin}
                                            onChange={formik.handleChange}
                                            value={formik.values.stockMin}
                                            helperText={formik.errors.stockMin}
                                            variant="standard"
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
            </DashboardLayout>
        </div>
    );
}

export default NewProduct;
