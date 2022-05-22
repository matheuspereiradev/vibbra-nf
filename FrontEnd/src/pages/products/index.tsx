import { Delete, Edit } from '@mui/icons-material';
import { Button, Grid, IconButton, Paper } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar, ptBR as br } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Title from '../../components/Title';
import { IProducts } from '../../interfaces/products.interface';
import { DashboardLayout } from '../../layouts/default';
import backendApi from '../../services/backend.axios';


function ProductList() {

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'id',
            width: 70
        },
        {
            field: 'name',
            headerName: 'Nome',
            width: 200
        },
        {
            field: 'brandProduct',
            headerName: 'Marca',
            width: 200,
        },
        {
            field: 'purchasePrice',
            headerName: 'Vl. de compra',
            type: 'number',
            width: 110,
        },
        {
            field: 'salePrice',
            headerName: 'Vl. de venda',
            type: 'number',
            width: 110,
        },
        {
            field: 'barcode',
            headerName: 'Cd de Barras',
            width: 180,
        },
        {
            field: 'edit',
            headerName: 'Editar',
            width: 70,
            sortable: false,
            filterable: false,
            hideable: false,
            renderCell: (params) =>
                <Link to={`/produtos/editar/${params.row.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <IconButton aria-label="edit" color="primary">
                        <Edit />
                    </IconButton>
                </Link>
        },
        {
            field: 'delete',
            headerName: 'Excluir',
            width: 70,
            sortable: false,
            filterable: false,
            hideable: false,
            renderCell: (params) =>
                <IconButton onClick={() => {
                    Swal.fire({
                        title: "Excluir",
                        text: "Deseja realmente excluir o produto?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Sim, excluir!',
                        cancelButtonText: 'Cancelar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            deleteProduct(params.row.id)
                        }
                    })

                }} aria-label="delete" color="error">
                    <Delete />
                </IconButton>
        },
    ];


    async function deleteProduct(id: number) {
        backendApi.delete(`products/${id}`)
            .then(({ data }) => {
                setProducts(products?.filter(comp => comp.id !== id))
                Swal.fire(
                    'Excluido!',
                    'Produto excluido com sucesso.',
                    'success'
                )
            })
            .catch(() => {
                Swal.fire(
                    'Ops...',
                    'Ocorreu um erro ao excluir o produto.',
                    'error'
                )
            })
    }

    const [products, setProducts] = useState<IProducts[]>([]);
    useEffect(() => {
        backendApi.get(`products`)
            .then(({ data }) => {
                setProducts(data)
            })
            .catch(() => {
                Swal.fire(
                    'Ops!',
                    'Ocorreu um erro ao carregar produtos, se persistir contate o suporte.',
                    'error'
                )
            })
    }, []);

    return (
        <div className="App">
            <DashboardLayout titleKey='Teste'>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: 500 }}>
                        <>
                            <Title>Produtos</Title>

                            <DataGrid
                                columnBuffer={5}
                                rows={products}
                                columns={columns}
                                pageSize={20}
                                rowsPerPageOptions={[20]}
                                disableSelectionOnClick
                                density='compact'
                                localeText={br.components.MuiDataGrid.defaultProps.localeText}
                                components={{
                                    Toolbar: GridToolbar,
                                }}
                            />
                            <br />
                            <Grid container>
                                <Grid item xs={2}>
                                    <Link to="/produtos/cadastrar" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <Button variant="contained">Adicionar novo</Button>
                                    </Link>
                                </Grid>

                            </Grid>
                        </>
                    </Paper>
                </Grid>
            </DashboardLayout>
        </div>
    );
}

export default ProductList;
