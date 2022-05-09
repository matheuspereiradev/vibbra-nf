import { Delete, Edit } from '@mui/icons-material';
import { Button, Grid, IconButton, Paper } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams, ptBR as br } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Title from '../../components/Title';
import { useAuth } from '../../hooks/AuthContext';
import { IUser } from '../../interfaces/user.interface';
import { DashboardLayout } from '../../layouts/default';
import backendApi from '../../services/backend.axios';

function UserList() {

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'id',
            width: 70
        },
        {
            field: 'name',
            headerName: 'Nome',
            valueGetter: (params: GridValueGetterParams) =>
                `${params.row.name} ${params.row.surname}`,
            width: 300
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 300,
        },
        {
            field: 'edit',
            headerName: 'Editar',
            width: 70,
            sortable: false,
            filterable: false,
            hideable: false,
            renderCell: (params) =>
                <Link to={`/usuarios/editar/${params.row.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                        text: "Deseja realmente excluir o usuário?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Sim, excluir!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            deleteUser(params.row.id)
                        }
                    })

                }} aria-label="delete" color="error">
                    <Delete />
                </IconButton>
        },
    ];
    const { user } = useAuth();

    const [users, setUsers] = useState<IUser[]>([]);
    useEffect(() => {
        backendApi.get(`users`)
            .then(({ data }) => {
                setUsers(data)
            })
            .catch(() => {
                Swal.fire(
                    'Ops!',
                    'Ocorreu um erro ao carregar usuários, se persistir contate o suporte.',
                    'error'
                )
            })
    }, []);

    async function deleteUser(id: number) {
        backendApi.delete(`users/${id}`)
            .then(({ data }) => {
                setUsers(users?.filter(usr => usr.id !== id))
                Swal.fire(
                    'Excluido!',
                    'Usuário excluido com sucesso.',
                    'success'
                )
            })
            .catch(() => {
                Swal.fire(
                    'Ops...',
                    'Ocorreu um erro ao excluir o usuário.',
                    'error'
                )
            })
    }

    return (
        <div className="App">
            <DashboardLayout titleKey='Teste'>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: 500 }}>
                        <>
                            <Title>Usuários</Title>

                            <DataGrid
                                columnBuffer={5}
                                rows={users}
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
                                    <Link to="/usuarios/cadastrar" style={{ textDecoration: 'none', color: 'inherit' }}>
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

export default UserList;
