import { Delete, Edit } from '@mui/icons-material';
import { Button, Grid, IconButton, Paper } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar, ptBR as br } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Title from '../../components/Title';
import { useAuth } from '../../hooks/AuthContext';
import { IExpenditureCategory } from '../../interfaces/categoryExpenditure.interface';
import { DashboardLayout } from '../../layouts/default';
import backendApi from '../../services/backend.axios';


function ProviderList() {

    const { user } = useAuth();
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
            field: 'corporateName',
            headerName: 'Nome Empresarial',
            width: 200,
        },
        {
            field: 'edit',
            headerName: 'Editar',
            width: 70,
            sortable: false,
            filterable: false,
            hideable: false,
            renderCell: (params) =>
                <Link to={`/fornecedores/editar/${params.row.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                        text: "Deseja realmente excluir a empresa parceira?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Sim, excluir!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            deleteProvider(params.row.id)
                        }
                    })

                }} aria-label="delete" color="error">
                    <Delete />
                </IconButton>
        },
    ];


    async function deleteProvider(id: number) {
        backendApi.delete(`providers/${id}`)
            .then(({ data }) => {
                setCompanies(companies?.filter(comp => comp.id !== id))
                Swal.fire(
                    'Excluido!',
                    'Fornecedor excluida com sucesso.',
                    'success'
                )
            })
            .catch(() => {
                Swal.fire(
                    'Ops...',
                    'Ocorreu um erro ao excluir o fornecedor.',
                    'error'
                )
            })
    }

    const [companies, setCompanies] = useState<IExpenditureCategory[]>([]);
    useEffect(() => {
        backendApi.get(`providers`)
            .then(({ data }) => {
                setCompanies(data)
            })
            .catch(() => {
                Swal.fire(
                    'Ops!',
                    'Ocorreu um erro ao carregar fornecedores, se persistir contate o suporte.',
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
                            <Title>Fornecedores</Title>

                            <DataGrid
                                columnBuffer={5}
                                rows={companies}
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
                                    <Link to="/fornecedores/cadastrar" style={{ textDecoration: 'none', color: 'inherit' }}>
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

export default ProviderList;
