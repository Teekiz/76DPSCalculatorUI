import useLoadoutStore from "../../../stores/LoadoutSlice.tsx";
import Grid2 from "@mui/material/Grid2";
import {Typography} from "@mui/material";
import useInventoryStore from "../../../stores/InventorySlice.tsx";
import {Consumable} from "../../../interfaces/ConsumableInterface.tsx";
import {ConsumableCard} from "./ConsumableCard.tsx";

export const ConsumableActiveGrid = () => {

    const activeLoadout = useLoadoutStore(state => state.activeLoadout);
    const consumables = activeLoadout?.consumables;
    const removeConsumable = useInventoryStore(state => state.removeConsumable);

    const handleConsumableClick = async (consumable: Consumable) => {
        await removeConsumable(consumable);
    }

    return (
        <Grid2 container spacing={2} justifyContent="center">
            {consumables && consumables.length > 0 ? (
                consumables.map((consumable) => (
                    <Grid2 key={consumable.name}>
                        <ConsumableCard consumable={consumable} removeConsumable={handleConsumableClick}/>
                    </Grid2>
                ))
            ) : (
                <Grid2>
                    <Typography>No Active Consumables</Typography>
                </Grid2>
            )}
        </Grid2>
    );
}