import { GridColDef } from '@mui/x-data-grid';
import { DashboardLayout } from '../../layouts/default';
import BasicListComponent from '../../sections/BasicListComponent';


function ProviderList() {

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Nome',
            width: 200
        },
        {
            field: 'corporateName',
            headerName: 'Nome Empresarial',
            width: 200,
        }
    ];

    return (
        <>
            <BasicListComponent
                backendRoute='providers'
                frontendRoute='fornecedores'
                gridColumns={columns}
                label='Fornecedores'
            />
        </>
    );
}

export default ProviderList;
