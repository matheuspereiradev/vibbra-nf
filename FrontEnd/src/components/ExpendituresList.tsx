import { Delete, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams, ptBR as br } from '@mui/x-data-grid';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { DateFunctions } from '../helpers/dateFunctions';
import { IExpenditure } from '../interfaces/expenditures.interface';
import backendApi from '../services/backend.axios';
import Title from './Title';

interface Props {
  onlyMonth: boolean
}

export default function ExpendituresList({ onlyMonth }: Props) {
  const [expenditures, setExpenditures] = React.useState<IExpenditure[]>([]);
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'id',
      width: 60
    },
    {
      field: 'amount',
      headerName: 'Valor',
      width: 90
    },
    {
      field: 'competence',
      headerName: 'Competência',
      width: 90,
    },
    {
      field: 'provider',
      headerName: 'Fornecedor',
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.provider.name}`,
      width: 150,
    },
    {
      field: 'category',
      headerName: 'Categoria',
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.category.name}`,
      width: 150,
    },
    {
      field: 'description',
      headerName: 'Descrição',
      width: 150
    },
    {
      field: 'paymentDate',
      headerName: 'Dt Pagamento',
      valueGetter: (params: GridValueGetterParams) =>
        format(parseISO(String(params.row.paymentDate)), 'dd/MM/yyyy', {
          locale: ptBR,
        }),
      width: 100
    },
    {
      field: 'created_at',
      headerName: 'Dt Cadastro',
      valueGetter: (params: GridValueGetterParams) =>
        format(parseISO(String(params.row.created_at)), 'dd/MM/yyyy HH:mm', {
          locale: ptBR,
        }),
      width: 150
    },
    {
      field: 'edit',
      headerName: 'Editar',
      width: 70,
      sortable: false,
      filterable: false,
      hideable: false,
      renderCell: (params) =>
        <Link to={`/despesas/editar/${params.row.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
            text: "Deseja realmente excluir a despesa?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, excluir!'
          }).then((result) => {
            if (result.isConfirmed) {
              deleteExpenditure(params.row.id)
            }
          })

        }} aria-label="delete" color="error">
          <Delete />
        </IconButton>
    },
  ];

  React.useEffect(() => {
    if (onlyMonth)
      backendApi.get(`expenditures?competence=${DateFunctions.getCompetence(new Date())}`)
        .then(({ data }) => {
          setExpenditures(data)
        })
        .catch(() => {
          Swal.fire(
            'Ops!',
            'Ocorreu um erro ao carregar despesas, se persistir contate o suporte.',
            'error'
          )
        })
    else
      backendApi.get(`expenditures`)
        .then(({ data }) => {
          setExpenditures(data)
        })
        .catch(() => {
          Swal.fire(
            'Ops!',
            'Ocorreu um erro ao carregar despesas, se persistir contate o suporte.',
            'error'
          )
        });
  }, []);

  async function deleteExpenditure(id: number) {
    backendApi.delete(`expenditures/${id}`)
      .then(({ data }) => {
        setExpenditures(expenditures?.filter(exp => exp.id !== id))
        Swal.fire(
          'Excluido!',
          'Despesa excluida com sucesso.',
          'success'
        )
      })
      .catch(() => {
        Swal.fire(
          'Ops...',
          'Ocorreu um erro ao excluir o despesa.',
          'error'
        )
      })
  }

  return (
    <>
      <Title>Despesas lançadas {onlyMonth && 'na competência atual (' + DateFunctions.getCompetence(new Date()) + ')'}</Title>
      <DataGrid
        columnBuffer={5}
        rows={expenditures}
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
    </>
  )
}
