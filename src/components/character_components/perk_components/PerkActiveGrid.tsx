import Grid2 from "@mui/material/Grid2";
import useLoadoutStore from "../../../stores/LoadoutSlice.tsx";
import {PerkCard} from "./cards/PerkCard.tsx";
import {Typography} from "@mui/material";
import {Perk} from "../../../interfaces/PerkInterface.tsx";
import useCharacterStore from "../../../stores/CharacterSlice.tsx";

export const PerkActiveGrid = () => {

    const perks = useLoadoutStore(state => state.activeLoadout?.perks);
    const removePerk = useCharacterStore(state => state.removePerk);

    const handlePerkClick =  async (perk: Perk) => {
        await removePerk(perk);
    }

    return (
        <Grid2 container spacing={2} justifyContent="center">
            {perks && perks.length > 0 ? (
                perks.map((perk) => (
                    <Grid2 key={perk.name}>
                        <PerkCard perk={perk} isDetailed={true} removePerk={handlePerkClick} />
                    </Grid2>
                ))
            ) : (
                <Grid2>
                    <Typography>No Active Perks</Typography>
                </Grid2>
            )}
        </Grid2>
    );
}