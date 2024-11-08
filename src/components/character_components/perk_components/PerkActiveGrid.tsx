import Grid2 from "@mui/material/Grid2";
import useLoadoutStore from "../../../stores/LoadoutSlice.tsx";
import {PerkCard} from "./cards/PerkCard.tsx";
import {Typography} from "@mui/material";
import {Perk} from "../../../interfaces/PerkInterface.tsx";
import useCharacterStore from "../../../stores/CharacterSlice.tsx";
import {hasAvailableSpecialPoints} from "../../../util/PerkUtility.tsx";

export const PerkActiveGrid = () => {

    const activeLoadout = useLoadoutStore(state => state.activeLoadout);
    const perks = activeLoadout?.perks;
    const removePerk = useCharacterStore(state => state.removePerk);
    const changeRank = useCharacterStore(state => state.changePerkRank);

    const handlePerkClick =  async (perk: Perk) => {
        await removePerk(perk);
    }

    const handleRankClick =  async (perk: Perk, newRank: number) => {
        if (activeLoadout && newRank !== perk.currentRank && newRank <= perk.maxRank && newRank >= 1 && hasAvailableSpecialPoints(perk, activeLoadout, newRank)) {
            await changeRank(perk, newRank);
        } else {
            console.debug("Cannot add perk, not enough points available.")
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