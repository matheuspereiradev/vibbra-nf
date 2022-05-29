import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DashboardLayout } from '../../layouts/default';
import BasicListComponent from '../../sections/BasicListComponent';

export const expenditureColumns: GridColDef[] = [
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
];

function ExpendituresList() {

    return (
        <>
            <BasicListComponent
                label='Despesas'
                backendRoute='expenditures'
                frontendRoute='despesas'
                gridColumns={expenditureColumns}
            />
        </>
    );
}

export default ExpendituresList;
