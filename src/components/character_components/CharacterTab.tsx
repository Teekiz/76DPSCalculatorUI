import PlayerStatsForm from "./player_components/PlayerStatsForm.tsx";
import Grid2 from "@mui/material/Grid2";
import {PerkSelectionGrid} from "./perk_components/selection/PerkSelectionGrid.tsx";


export default function CharacterTab(){

    return (
    <>
        <Grid2 container spacing={2}>
            <Grid2>
                <PlayerStatsForm />
                <PerkSelectionGrid />
            </Grid2>
        </Grid2>
    </>
    );
}
