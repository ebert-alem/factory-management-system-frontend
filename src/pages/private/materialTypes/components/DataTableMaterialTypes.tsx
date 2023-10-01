import { DeleteRounded, EditRounded, RestorePageRounded } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../redux/store";
import { useEffect, useState } from "react";
import { TypeOfMaterial } from "../../../../models";
import { getMaterialTypes } from "../../../../services";
import { DataTable } from "../../../../components";

const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nombre',
      width: 150,
    },
    {
      field: 'description',
      headerName: 'Descripción',
      width: 350,
    },
    {
      field: 'unitOfMeasurement',
      headerName: 'Unidad de medida',
      width: 150,
    },
    {
      field: 'actions', headerName: 'Acción', width: 100, sortable: false, renderCell: (params) => {
        return (
          <div className="actions">
            <button className="edit"><EditRounded /></button>
            <button className="delete">{!params.row.status ? <DeleteRounded /> : <RestorePageRounded />}</button>
          </div>
        )
      }
    },
  ];

  export const DataTableTypesOfMaterials = ({ update }: { update: boolean }) => {

    const token = useSelector((state: AppStore) => state.user.Token);
    const [rows, setRows] = useState<TypeOfMaterial[]>([]);
  
    useEffect(() => {
      updateTable();
    }, [update]);
  
    const updateTable = async () => {
      const response = await getMaterialTypes(token);
      setRows(response);
      console.log(response)
    }
  
    return (
      <div>
        <DataTable columns={columns} rows={rows} />
      </div>
    )
  }

