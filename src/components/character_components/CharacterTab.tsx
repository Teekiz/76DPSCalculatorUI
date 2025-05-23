import PlayerStatsForm from "./player_components/implementation/PlayerStatsForm.tsx";
import Grid2 from "@mui/material/Grid2";
import {PerkSelectionGrid} from "./perk_components/implementation/PerkSelectionGrid.tsx";
import {PerkActiveGrid} from "./perk_components/implementation/PerkActiveGrid.tsx";
import {MutationActiveGrid} from "./mutation_components/implementation/MutationActiveGrid.tsx";
import {MutationSelectionGrid} from "./mutation_components/implementation/MutationSelectionGrid.tsx";


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
