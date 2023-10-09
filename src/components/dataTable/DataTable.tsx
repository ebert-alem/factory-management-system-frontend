import { DataGrid, GridColDef, GridToolbar, esES } from '@mui/x-data-grid'
import './dataTable.scss'
import { Box } from '@mui/material'

type Props = {columns: GridColDef[], rows: any[]}

export const DataTable = (props: Props) => {
    return (
        <Box className='dataTable'>
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
                loading={props.rows.length === 0}
                disableRowSelectionOnClick
                disableColumnFilter
                disableColumnSelector              
                
            />
        </Box>
    )
}