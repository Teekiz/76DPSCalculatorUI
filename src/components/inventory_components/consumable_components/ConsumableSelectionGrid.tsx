import {useState} from "react";
import useLoadoutStore from "../../../stores/LoadoutSlice.tsx";
import {useQuery} from "react-query";
import {Box, Grid2, TextField, Typography} from "@mui/material";
import useInventoryStore from "../../../stores/InventorySlice.tsx";
import {Consumable} from "../../../interfaces/ConsumableInterface.tsx";
import {getAllConsumables} from "../../../api/ConsumableApiService.tsx";
import {ConsumableCard} from "./ConsumableCard.tsx";

export const ConsumableSelectionGrid = () => {

    const [searchTerm, setSearchTerm] = useState('');

    const activeLoadout = useLoadoutStore(state => state.activeLoadout);
    const activeConsumableNames = activeLoadout?.consumables?.map((consumable) => consumable.name.toLowerCase() || []);
    const addConsumable = useInventoryStore(state => state.addConsumable);

    const {data: consumables} = useQuery<Consumable[]>('consumables', getAllConsumables);

    const handleConsumableClick =  async (consumable: Consumable) => {
        if (activeLoadout){
            await addConsumable(consumable);
        } else {
            console.debug("Cannot add consumable.")
        }
    }

    const filteredOptions = consumables?.filter(consumables =>
        consumables.name.toLowerCase().includes(searchTerm.toLowerCase()) && !activeConsumableNames?.includes(consumables.name.toLowerCase())
    );

    return (
        <>
            <Box sx={{ width: 500, maxWidth: '100%' }}>
                <TextField
                    fullWidth
                    label="Filter consumables"
                    id="fullWidth"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoComplete="on"
                />
            </Box>

            <Grid2 container spacing={2} justifyContent="center">
                {filteredOptions && filteredOptions.length > 0 ? (
                    filteredOptions.map((consumable) => (
                        <Grid2 key={consumable.name}>
                            <ConsumableCard consumable={consumable}  addConsumable={handleConsumableClick}/>
                        </Grid2>
                    ))
                ) : (
                    <Grid2>
                        <Typography>No consumables found</Typography>
                    </Grid2>
                )}
            </Grid2>
        </>
    );
};