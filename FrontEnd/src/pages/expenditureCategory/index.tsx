import { Delete, Edit } from '@mui/icons-material';
import { Button, Grid, IconButton, Paper } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar, ptBR as br } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import ProtectedPage from '../../components/ProtectedPage';
import Title from '../../components/Title';
import { useAuth } from '../../hooks/AuthContext';
import { IExpenditureCategory } from '../../interfaces/categoryExpenditure.interface';
import { DashboardLayout } from '../../layouts/default';
import backendApi from '../../services/backend.axios';

function ExpenditureCategoryList() {

    const { user } = useAuth();
    const [expendituresCategories, setExpendituresCategories] = useState<IExpenditureCategory[]>([]);

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'id',
            width: 70
        },
        {
            field: 'name',
            headerName: 'Nome',
            width: 300
        },
        {
            field: 'description',
            headerName: 'Descrição',
            width: 400,
        },
        {
            field: 'edit',
            headerName: 'Editar',
            width: 70,
            sortable: false,
            filterable: false,
            hideable: false,
            renderCell: (params) =>
                <Link to={`/categoriasdedespesa/editar/${params.row.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                        text: "Deseja realmente excluir a categoria de despesa?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Sim, excluir!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            deleteCategory(params.row.id)
                        }
                    })

                }} aria-label="delete" color="error">
                    <Delete />
                </IconButton>
        },
    ];

    async function deleteCategory(id: number) {
        backendApi.delete(`expenditures/categories/${id}`)
            .then(({ data }) => {
                setExpendituresCategories(expendituresCategories?.filter(comp => comp.id !== id))
                Swal.fire(
                    'Excluido!',
                    'Categoria de despesa excluida com sucesso.',
                    'success'
                )
            })
            .catch(() => {
                Swal.fire(
                    'Ops...',
                    'Ocorreu um erro ao excluir o categoria de despesa.',
                    'error'
                )
            })
    }

    useEffect(() => {
        backendApi.get(`expenditures/categories`)
            .then(({ data }) => {
                setExpendituresCategories(data)
            })
            .catch(() => {
                Swal.fire(
                    'Ops!',
                    'Ocorreu um erro ao carregar categorias de despesas, se persistir contate o suporte.',
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
                            <Title>Categorias de despesas</Title>

                            <DataGrid
                                columnBuffer={5}
                                rows={expendituresCategories}
                                columns={columns}
                                pageSize={10}
                                rowsPerPageOptions={[10]}
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
                                    <Link to="/categoriasdedespesa/cadastrar" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <Button variant="contained">Adicionar nova</Button>
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

export default ExpenditureCategoryList;
