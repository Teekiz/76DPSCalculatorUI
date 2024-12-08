import Grid2 from "@mui/material/Grid2";
import {ConsumableActiveGrid} from "./consumable_components/ConsumableActiveGrid.tsx";
import {ConsumableSelectionGrid} from "./consumable_components/ConsumableSelectionGrid.tsx";
export default function InventoryTab(){

    return (
        <>
            <Grid2>
                <ConsumableActiveGrid />
                <ConsumableSelectionGrid />
            </Grid2>
        </>
    );
}