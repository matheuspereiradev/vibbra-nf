import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { DashboardLayout } from '../../layouts/default';
import BasicListComponent from '../../sections/BasicListComponent';


function ServicesList() {

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Nome',
            width: 400
        },
        {
            field: 'salePrice',
            headerName: 'Vl. de serviço',
            type: 'number',
            width: 110,
        },
        {
            field: 'type',
            headerName: 'Tipo',
            valueGetter: (params: GridValueGetterParams) => params.row.type.id,
            width: 70
        },
    ];

    return (
        <div className="App">
            <DashboardLayout titleKey='Teste'>
                <BasicListComponent
                    backendRoute='products'
                    frontendRoute='servicos'
                    gridColumns={columns}
                    label='Serviços'
                    searchParams='types=SRV'
                />
            </DashboardLayout>
        </div>
    );
}

export default ServicesList;
