import useLoadoutStore from "../../../stores/LoadoutSlice.tsx";
import Grid2 from "@mui/material/Grid2";
import {Typography} from "@mui/material";
import useInventoryStore from "../../../stores/InventorySlice.tsx";
import {ConsumableTable} from "./ConsumableTable.tsx";
import {Selectable} from "../../../interfaces/SelectableInterface.tsx";
import {isConsumable} from "../../../util/implementationUtility/TypeguardUtility.tsx";

export const ConsumableActiveGrid = () => {

    const activeLoadout = useLoadoutStore(state => state.activeLoadout);
    const consumables = activeLoadout?.consumables;
    const removeConsumable = useInventoryStore(state => state.removeConsumable);

    const handleConsumableClick = async (consumable: Selectable) => {
        if (isConsumable(consumable)) {
            await removeConsumable(consumable);
        }
    }

    return (
        <Grid2 container spacing={2} justifyContent="center">
            {consumables && consumables.length > 0 ? (
                <ConsumableTable consumables={consumables} handleConsumableClick={handleConsumableClick}/>
            ) : (
                <Grid2>
                    <Typography>No Active Consumables</Typography>
                </Grid2>
            )}
        </Grid2>
    );
}