import PlayerStatsForm from "./player_components/PlayerStatsForm.tsx";
import Grid2 from "@mui/material/Grid2";
import {PerkSelectionGrid} from "./perk_components/PerkSelectionGrid.tsx";
import {PerkActiveGrid} from "./perk_components/PerkActiveGrid.tsx";
import {MutationActiveGrid} from "./mutation_components/MutationActiveGrid.tsx";
import {MutationSelectionGrid} from "./mutation_components/MutationSelectionGrid.tsx";


export default function CharacterTab(){

    return (
    <>
        <Grid2 container spacing={2}>
            <Grid2><PlayerStatsForm /></Grid2>
            <Grid2>
                <PerkActiveGrid />
                <PerkSelectionGrid />
                <MutationActiveGrid />
                <MutationSelectionGrid />
            </Grid2>
        </Grid2>
    </>
    );
}
