import Grid2 from "@mui/material/Grid2";
import useLoadoutStore from "../../../stores/LoadoutSlice.tsx";
import {PerkCard} from "./cards/PerkCard.tsx";
import {Typography} from "@mui/material";
import {Perk} from "../../../interfaces/PerkInterface.tsx";
import useCharacterStore from "../../../stores/CharacterSlice.tsx";

export const PerkActiveGrid = () => {

    const perks = useLoadoutStore(state => state.activeLoadout?.perks);
    const removePerk = useCharacterStore(state => state.removePerk);
    const changeRank = useCharacterStore(state => state.changePerkRank);

    const handlePerkClick =  async (perk: Perk) => {
        await removePerk(perk);
    }

    const handleRankClick =  async (perk: Perk, newRank: number) => {
        if (newRank !== perk.currentRank && newRank <= perk.maxRank && newRank >= 1) {
            await changeRank(perk, newRank);
        }
    }

    return (
        <Grid2 container spacing={2} justifyContent="center">
            {perks && perks.length > 0 ? (
                perks.map((perk) => (
                    <Grid2 key={perk.name}>
                        <PerkCard perk={perk} isDetailed={true} removePerk={handlePerkClick} changeRank={handleRankClick}/>
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