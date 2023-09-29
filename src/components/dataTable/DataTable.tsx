import { DataGrid, GridColDef, GridToolbar, esES } from '@mui/x-data-grid'
import './dataTable.scss'

type Props = {columns: GridColDef[], rows: any[]}

export const DataTable = (props: Props) => {



    return (
        <div className='dataTable'>
            <DataGrid
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                className='dataGrid'
                rows={props.rows}
                columns={props.columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                    }
                }}
                pageSizeOptions={[5, 10]}
                
                disableRowSelectionOnClick
                disableColumnFilter
                disableColumnSelector              
                
            />
        </div>
    )
}