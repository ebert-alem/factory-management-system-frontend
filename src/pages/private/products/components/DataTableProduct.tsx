import { DeleteRounded, EditRounded, Visibility } from "@mui/icons-material";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../redux/store";
import { useEffect, useState } from "react";
import { MaterialType } from "../../../../models";
import { deleteProduct, getProducts } from "../../../../services";
import { CustomDialog, DataTable } from "../../../../components";
import { Box, Dialog, DialogContent, IconButton } from "@mui/material";

export const DataTableProducts = ({ update }: { update: boolean }) => {
  const token = useSelector((state: AppStore) => state.user.Token);
  const [rows, setRows] = useState<MaterialType[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({ id: '', name: ''});
  
  const [expandedImage, setExpandedImage] = useState('');

  const handleImageClick = (imageUrl: string) => {
    setExpandedImage(imageUrl);
  };

  const handleCloseImage = () => {
    setExpandedImage('');
  };

  const columns: GridColDef[] = [
    {
      field: 'imageUrl',
      headerName: 'Foto',
      width: 100,
      renderCell: (params) => (
        <Box width='100%'>
          <img
            src={params?.value}
            alt=""
            style={{ width: '100%', borderRadius: '5px', cursor: 'zoom-in', objectFit: 'cover'}}
            onClick={() => handleImageClick(params.value)}
          />
        </Box>
      ),
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
    {
      field: 'stock',
      headerName: 'Stock',
      width: 100,
    },
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
            <IconButton size="small" >{<Visibility />}</IconButton>
            <IconButton size="small" ><EditRounded /></IconButton>
            <IconButton onClick={() => handleDelete(id, name)} size="small" >{<DeleteRounded />}</IconButton>
          </div>
        )
      }
    },
  ];

  const handleDelete = (id: string, name: string) => {
    setSelectedRow({...selectedRow, id, name });
    setDialogOpen(true);
  }

  // const handleModify = (id: number, name: string, description: string, unitOfMeasurement: string) => {
  //   setSelectedRow({ id, name, description, unitOfMeasurement });
  //   // handlerOpen(true)
  // }

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
      {expandedImage && (
        <Dialog open={!!expandedImage} onClose={handleCloseImage}>
          <DialogContent>
            <img src={expandedImage} alt="Imagen del producto" style={{ maxWidth: '100%', maxHeight: '100vh', borderRadius: 6 }} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

