import { DeleteRounded, EditRounded, Visibility } from "@mui/icons-material";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../redux/store";
import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../../../../services";
import { CustomDialog, DataTable } from "../../../../components";
import { Box, IconButton } from "@mui/material";
import { ModalProductDetails } from "..";


export const DataTableProducts = ({ update }: { update: boolean }) => {
  const token = useSelector((state: AppStore) => state.user.Token);
  const [rows, setRows] = useState<any>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({ id: 0, name: '' });
  const [openDetails, setOpenDetails] = useState(false);

  const columns: GridColDef[] = [
    {
      field: 'imageUrl',
      headerName: 'Foto',
      width: 100,
      renderCell: (params) => {
        const id = params.row.id;
        return (
          <Box width='100%'>
            <img
              src={params.value ? params?.value : "/noImage.png"}
              alt=""
              style={{ width: '100%', borderRadius: '5px', cursor: 'pointer', objectFit: 'cover' }}
              onClick={handleDetails(id)}
            />
          </Box>
        )
      },
      align: 'center',
      sortable: false,
    },
    {
      field: 'name',
      headerName: 'Nombre',
      width: 150,
    },
    {
      field: 'description',
      headerName: 'Descripción',
      width: 250,
    },
    {
      field: 'color',
      headerName: 'Color',
      width: 100,
    },
    // {
    //   field: 'size',
    //   headerName: 'Tamaño',
    //   width: 100,
    // },
    // {
    //   field: 'stock',
    //   headerName: 'Stock',
    //   width: 100,
    // },
    {
      field: 'price',
      headerName: 'Precio',
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.price ? '$' : '-'} ${params.row.price || ''}`,
    },
    {
      field: 'actions', headerName: 'Acción', width: 120, sortable: false, renderCell: (params) => {
        const id = params.row.id;
        const name = params.row.name;
        // const description = params.row.description;
        // const unitOfMeasurement = params.row.unitOfMeasurement;
        return (
          <div className="actions">
            <IconButton size="small" onClick={handleDetails(id)}>{<Visibility />}</IconButton>
            <IconButton size="small" ><EditRounded /></IconButton>
            <IconButton onClick={() => handleDelete(id, name)} size="small" >{<DeleteRounded />}</IconButton>
          </div>
        )
      }
    },
  ];

  const handleDelete = (id: number, name: string) => {
    setSelectedRow({ ...selectedRow, id, name });
    setDialogOpen(true);
  }

  // const handleModify = (id: number, name: string, description: string, unitOfMeasurement: string) => {
  //   setSelectedRow({ id, name, description, unitOfMeasurement });
  //   // handlerOpen(true)
  // }

  const handleDetails = (id: number) => () => {
    setSelectedRow({ ...selectedRow, id });
    console.log(id)
    setOpenDetails(true);
  }

  const handleDialogAccept = async () => {
    await deleteProduct(String(selectedRow.id), token);
    updateTable()
    setDialogOpen(false);
  };

  const handleDialogCancel = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    updateTable();
  }, [update]);

  const updateTable = async () => {
    const response = await getProducts(token);
    if (response) {
      setRows(response);
    }
  }

  return (
    <div>
      <DataTable columns={columns} rows={rows} rowHeight={100} />
      <CustomDialog
        title={`Eliminar: ${selectedRow.name}`}
        text="Esta accion no se puede deshacer, ¿Desea continuar?"
        isOpen={dialogOpen}
        onAccept={handleDialogAccept}
        onCancel={handleDialogCancel}
      />
      <ModalProductDetails productId={selectedRow.id} handlerOpen={setOpenDetails} open={openDetails} />
    </div>
  )
}

