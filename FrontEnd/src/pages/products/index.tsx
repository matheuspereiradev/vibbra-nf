import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
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
            width: 180,
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
            width: 150,
        },
        {
            field: 'meansureUnit',
            headerName: 'Und Medida',
            valueGetter: (params: GridValueGetterParams) => params.row.meansureUnit.abbreviation,
            width: 100
        },
        {
            field: 'type',
            headerName: 'Tipo',
            valueGetter: (params: GridValueGetterParams) => params.row.type.id,
            width: 70
        },
    ];

    return (
        <>
            <BasicListComponent
                backendRoute='products'
                frontendRoute='produtos'
                gridColumns={columns}
                label='Produtos'
                searchParams='types=PAC,PPD,INS'
            />
        </>
    );
}

export default ProductList;
