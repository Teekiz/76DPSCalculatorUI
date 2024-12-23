import {Paper} from "@mui/material";
import {DataGrid, GridColDef, GridRowParams} from '@mui/x-data-grid';
import {Consumable} from "../../../interfaces/ConsumableInterface.tsx";
import {Selectable} from "../../../interfaces/SelectableInterface.tsx";

export const ConsumableTable = ({ consumables, handleConsumableClick }: {
    consumables: Consumable[]
    handleConsumableClick: (consumable: Selectable) => void;
    }) => {

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'consumableType', headerName: 'Type', width: 130 },
        { field: 'addictionType', headerName: 'Addiction', width: 130 },
    ];

    const rows = consumables.map((consumable: Consumable) => ({
            id: consumable.id,
            name: consumable.name,
            consumableType: consumable.consumableType,
            addictionType: consumable.addictionType
    }));

    const onRowClick = (params: GridRowParams) => {
        handleConsumableClick(params.row);
    };

    return (
        <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                onRowClick={onRowClick}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </Paper>
    );
}