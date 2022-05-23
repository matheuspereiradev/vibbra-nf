import { GridColDef } from '@mui/x-data-grid';
import { DashboardLayout } from '../../layouts/default';
import BasicListComponent from '../../sections/BasicListComponent';

function ExpenditureCategoryList() {

    const columns: GridColDef[] = [
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
    ];

    return (
        <div className="App">
            <DashboardLayout titleKey='Teste'>
                <BasicListComponent 
                    backendRoute='expenditures/categories'
                    frontendRoute='categoriasdedespesa'
                    gridColumns={columns}
                    label='Categorias de despesa'
                />
            </DashboardLayout>
        </div>
    );
}

export default ExpenditureCategoryList;
