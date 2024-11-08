import { useState } from "react";
import {getAllPerks} from "../../../api/PerkApiService.tsx";
import {Perk} from "../../../interfaces/PerkInterface.tsx";
import {PerkCard} from "./cards/PerkCard.tsx";
import useLoadoutStore from "../../../stores/LoadoutSlice.tsx";
import useCharacterStore from "../../../stores/CharacterSlice.tsx";
import {useQuery} from "react-query";
import {hasAvailableSpecialPoints} from "../../../util/PerkUtility.tsx";

import {Box, Grid2, Typography, TextField} from "@mui/material";

export const PerkSelectionGrid = () => {

    const [searchTerm, setSearchTerm] = useState('');

    const activeLoadout = useLoadoutStore(state => state.activeLoadout);
    const activePerkNames = activeLoadout?.perks?.map((perk) => perk.name.toLowerCase() || []);
    const addPerk = useCharacterStore(state => state.addPerk);

    const {data: perks} = useQuery<Perk[]>('perks', getAllPerks);

    const handlePerkClick =  async (perk: Perk) => {
        if (activeLoadout && hasAvailableSpecialPoints(perk, activeLoadout)){
            await addPerk(perk);
        } else {
            console.debug("Cannot add perk, not enough points available.")
        }
    }

    const filteredOptions = perks?.filter(perk =>
        perk.name.toLowerCase().includes(searchTerm.toLowerCase()) && !activePerkNames?.includes(perk.name.toLowerCase())
    );

    return (
        <>
            <Box sx={{ width: 500, maxWidth: '100%' }}>
                <TextField
                    fullWidth
                    label="Filter perks"
                    id="fullWidth"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoComplete="on"
                />
            </Box>

            <Grid2 container spacing={2} justifyContent="center">
                {filteredOptions && filteredOptions.length > 0 ? (
                    filteredOptions.map((perk) => (
                        <Grid2 key={perk.name}>
                            <PerkCard perk={perk} isDetailed={false}  addPerk={handlePerkClick}/>
                        </Grid2>
                    ))
                ) : (
                    <Grid2>
                        <Typography>No perks found</Typography>
                    </Grid2>
                )}
            </Grid2>
        </>
    );
};