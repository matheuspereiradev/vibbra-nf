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
        <>
                <BasicListComponent 
                    backendRoute='expenditures/categories'
                    frontendRoute='categoriasdedespesa'
                    gridColumns={columns}
                    label='Categorias de despesa'
                />
        </>
    );
}

export default ExpenditureCategoryList;
