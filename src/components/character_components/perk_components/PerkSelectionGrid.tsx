import {useEffect, useState} from "react";
import {getAllPerks} from "../../../api/PerkApiService.tsx";
import {Perk} from "../../../interfaces/PerkInterface.tsx";

import {Box, Grid2, Typography, TextField} from "@mui/material";
import {PerkCard} from "./cards/PerkCard.tsx";
import useLoadoutStore from "../../../stores/LoadoutSlice.tsx";
import useCharacterStore from "../../../stores/CharacterSlice.tsx";

export const PerkSelectionGrid = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [perks, setPerks] = useState<Perk[]>([]);
    const activePerkNames = useLoadoutStore(state =>
        state.activeLoadout?.perks)?.map((perk) => perk.name.toLowerCase() || []);
    const addPerk = useCharacterStore(state => state.addPerk);


    const handlePerkClick =  async (perk: Perk) => {
        await addPerk(perk);
    }

    useEffect(() => {
        const fetchPerks = async () => {
            const fetchedPerks = await getAllPerks();
            setPerks(fetchedPerks);
        };
        fetchPerks();
    }, []);

    const filteredOptions = perks.filter(perk =>
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
                {filteredOptions.length > 0 ? (
                    filteredOptions.map((perk) => (
                        <Grid2 key={perk.name}>
                            <PerkCard perk={perk} isDetailed={true}  addPerk={handlePerkClick}/>
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