import { Save } from '@mui/icons-material';
import { Button, Grid, MenuItem, Paper, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Title from '../../components/Title';
import { useAuth } from '../../hooks/AuthContext';
import { IMeansureUnit } from '../../interfaces/meansureunit.interface';
import { IProductType } from '../../interfaces/productTypes';
import { DashboardLayout } from '../../layouts/default';
import backendApi from '../../services/backend.axios';

interface ICreateData {
    name: string,
    brandProduct: string,
    purchasePrice: number,
    salePrice: number,
    idCompany: number,
    barcode: string,
    details: string,
    idType: string,
    idMeansureUnit: string,
    stockMin: number
}
function NewProduct() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<ICreateData>();

    const [meansureUnits, setMeansureUnits] = useState<IMeansureUnit[]>([])
    const [productTypes, setProductTypes] = useState<IProductType[]>([])

    const onSubmit = (data: ICreateData) => {
        if (id)
            updateProduct(data)
        else
            createNew(data)
    };

    async function createNew(data: any) {
        backendApi.post(`products`, data).then(() => {
            Swal.fire(
                'Sucesso!',
                'Produto cadastrado com sucesso.',
                'success'
            )
            navigate(-1)
        }).catch(() => {
            Swal.fire(
                'Ops!',
                'Ocorreu um erro ao salvar produto, se persistir contate o suporte.',
                'error'
            )
        })
    }

    async function updateProduct(data: any) {
        backendApi.put(`products/${id}`, data).then(() => {
            Swal.fire(
                'Sucesso!',
                'Produto cadastrado com sucesso.',
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
            backendApi.get(`products/find/${id}`).then(({ data }) => {
                setValue('barcode', data.barcode)
                setValue('brandProduct', data.brandProduct)
                setValue('details', data.details)
                setValue('name', data.name)
                setValue('purchasePrice', data.purchasePrice)
                setValue('salePrice', data.salePrice)
            }).catch(() => {
                Swal.fire(
                    'Ops!',
                    'Ocorreu um erro ao carregar produto, se persistir contate o suporte.',
                    'error'
                )
            })

        if (user) {
            backendApi.get(`meansureunit`).then(({ data }) => {
                setMeansureUnits(data);
            }).catch(() => {
                Swal.fire(
                    'Ops!',
                    'Ocorreu um erro ao carregar unidades de medida, se persistir contate o suporte.',
                    'error'
                )
            })
            backendApi.get(`producttype`).then(({ data }) => {
                setProductTypes(data);
            }).catch(() => {
                Swal.fire(
                    'Ops!',
                    'Ocorreu um erro ao carregar tipos de produto, se persistir contate o suporte.',
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
                            <Title>{id ? `Editar Produto ${id}` : 'Cadastrar Produto'}</Title>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <Typography>Nome</Typography>
                                        <TextField
                                            fullWidth
                                            id="name"
                                            variant="standard"
                                            {...register("name", { required: true, maxLength: 45 })}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>Código de barras</Typography>
                                        <TextField
                                            fullWidth
                                            id="barcode"
                                            variant="standard"
                                            {...register("barcode", { required: true })}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography>Unidade de medida</Typography>
                                        <TextField
                                            id="um"
                                            select
                                            fullWidth
                                            variant="standard"
                                            {...register("idMeansureUnit")}
                                        >
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
                                            id="pt"
                                            select
                                            fullWidth
                                            variant="standard"
                                            {...register("idType")}
                                        >
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
                                            {...register("brandProduct")}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography>Valor Compra</Typography>
                                        <TextField
                                            fullWidth
                                            type="number"
                                            id="purchase"
                                            variant="standard"
                                            inputProps={{
                                                step: ".01"
                                            }}
                                            {...register("purchasePrice")}
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
                                            id="sale"
                                            variant="standard"
                                            {...register("salePrice")}
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
                                            id="stock"
                                            variant="standard"
                                            {...register("stockMin")}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography>Detalhes</Typography>
                                        <TextField
                                            fullWidth
                                            id="details"
                                            variant="standard"
                                            {...register("details")}
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

export default NewProduct;
