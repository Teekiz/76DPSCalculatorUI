import {useEffect, useState} from "react";
import {getAllPerks} from "../../../../api/PerkApiService.tsx";
import {Perk} from "../../../../interfaces/PerkInterface.tsx";

import {Grid2} from "@mui/material";
import {PerkCard} from "../cards/PerkCard.tsx";

export const PerkSelectionGrid = () => {
    const [perks, setPerks] = useState<Perk[]>([]);

    useEffect(() => {
        const fetchPerks = async () => {
            const fetchedPerks = await getAllPerks();
            setPerks(fetchedPerks);
        };

        fetchPerks();
    }, []);

    return (
        <Grid2 container spacing={2}>
            {perks.map((perk) => (
                <Grid2 key={perk.id}> {/* Change sizes based on your layout */}
                    <PerkCard perk={perk} isDetailed={true}/>
                </Grid2>
            ))}
        </Grid2>
    );
}