import Grid2 from "@mui/material/Grid2";
import useLoadoutStore from "../../../stores/LoadoutsStore.tsx";
import {PerkCard} from "./cards/PerkCard.tsx";
import {Typography} from "@mui/material";

export const PerkActiveGrid = () => {

    //const activeLoadout = useLoadoutStore(state => state.activeLoadout);
    const perks = useLoadoutStore(state => state.activeLoadout?.perks);

    return (
        <Grid2 container spacing={2} justifyContent="center">
            {perks && perks.length > 0 ? (
                perks.map((perk) => (
                    <Grid2 key={perk.name}>
                        <PerkCard perk={perk} isDetailed={true} />
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