import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { DashboardLayout } from '../../layouts/default';
import BasicListComponent from '../../sections/BasicListComponent';

function UserList() {

    const columns: GridColDef[] = [
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
        }
    ];

    return (
        <div className="App">
            <DashboardLayout titleKey='Teste'>
                <BasicListComponent 
                    backendRoute='users'
                    frontendRoute='usuarios'
                    gridColumns={columns}
                    label='Usuários'
                />
            </DashboardLayout>
        </div>
    );
}

export default UserList;
