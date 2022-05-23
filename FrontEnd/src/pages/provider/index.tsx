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
        <div className="App">
            <DashboardLayout titleKey='Teste'>
                <BasicListComponent 
                    backendRoute='providers'
                    frontendRoute='fornecedores'
                    gridColumns={columns}
                    label='Fornecedores'
                />
            </DashboardLayout>
        </div>
    );
}

export default ProviderList;
