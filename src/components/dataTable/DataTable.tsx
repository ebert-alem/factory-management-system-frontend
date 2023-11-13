import { DataGrid, GridColDef, GridToolbar, esES } from '@mui/x-data-grid'
import './dataTable.scss'
import { Box } from '@mui/material'

type Props = {columns: GridColDef[], rows: any[], rowHeight?: number, filter?: boolean}

export const DataTable = (props: Props) => {
    return (
        <Box className='dataTable' sx={{display: 'table', tableLayout:'fixed', width:'100%'}}>
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
                pageSizeOptions={[5, 7, 10, 15]}                
                disableRowSelectionOnClick
                disableColumnFilter={!props.filter}
                disableColumnSelector
                disableColumnMenu
                
                loading={props.rows.length === 0}
                sx={{ minHeight: 450, backgroundColor: 'info.main', border: 'none' }}
                {...props.rowHeight && { rowHeight: props.rowHeight }}
            />
        </Box>
    )
}