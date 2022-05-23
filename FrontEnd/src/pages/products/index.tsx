import { GridColDef } from '@mui/x-data-grid';
import { DashboardLayout } from '../../layouts/default';
import BasicListComponent from '../../sections/BasicListComponent';


function ProductList() {

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Nome',
            width: 200
        },
        {
            field: 'brandProduct',
            headerName: 'Marca',
            width: 200,
        },
        {
            field: 'purchasePrice',
            headerName: 'Vl. de compra',
            type: 'number',
            width: 110,
        },
        {
            field: 'salePrice',
            headerName: 'Vl. de venda',
            type: 'number',
            width: 110,
        },
        {
            field: 'barcode',
            headerName: 'Cd de Barras',
            width: 180,
        },
    ];

    return (
        <div className="App">
            <DashboardLayout titleKey='Teste'>
                <BasicListComponent 
                    backendRoute='products'
                    frontendRoute='produtos'
                    gridColumns={columns}
                    label='Produtos'
                />
            </DashboardLayout>
        </div>
    );
}

export default ProductList;
