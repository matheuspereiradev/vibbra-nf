import { Add, Delete, Edit, More, PlusOne } from '@mui/icons-material';
import { Button, Grid, IconButton, Paper } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar, ptBR as br } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Title from '../components/Title';
import backendApi from '../services/backend.axios';

interface IListComponent {
    gridColumns: GridColDef[],
    backendRoute: string,
    frontendRoute: string
}

function BasicListComponent({ gridColumns, backendRoute, frontendRoute }: IListComponent) {

    const columns = [
        ...gridColumns,
        {
            field: 'edit',
            headerName: 'Editar',
            width: 70,
            sortable: false,
            filterable: false,
            hideable: false,
            renderCell: (params: any) =>
                <Link to={`/${frontendRoute}/editar/${params.row.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
            renderCell: (params: any) =>
                <IconButton onClick={() => {
                    Swal.fire({
                        title: "Excluir",
                        text: "Deseja realmente excluir este registro?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Sim, excluir!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            deleteRow(params.row.id)
                        }
                    })

                }} aria-label="delete" color="error">
                    <Delete />
                </IconButton>
        },
    ]

    const [rows, setRows] = useState<any[]>([]);
    useEffect(() => {
        backendApi.get(backendRoute)
            .then(({ data }) => {
                setRows(data)
            })
            .catch(() => {
                Swal.fire(
                    'Ops!',
                    `Ocorreu um erro ao carregar registros, se persistir contate o suporte.`,
                    'error'
                )
            })
    }, []);

    async function deleteRow(id: number) {
        backendApi.delete(`${backendRoute}/${id}`)
            .then(({ data }) => {
                setRows(rows?.filter(row => row.id !== id))
                Swal.fire(
                    'Excluido!',
                    `registro excluido com sucesso.`,
                    'success'
                )
            })
            .catch(() => {
                Swal.fire(
                    'Ops...',
                    'Ocorreu um erro ao excluir o registro.',
                    'error'
                )
            })
    }

    return (

        <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: 500 }}>
                <>
                    <Title>Usuários</Title>

                    <DataGrid
                        columnBuffer={5}
                        rows={rows}
                        columns={columns}
                        pageSize={25}
                        rowsPerPageOptions={[25]}
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
                            <Link to={`/${frontendRoute}/cadastrar`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Button variant="contained" startIcon={<Add />}>Adicionar</Button>
                            </Link>
                        </Grid>

                    </Grid>
                </>
            </Paper>
        </Grid>
    );
}

export default BasicListComponent;
