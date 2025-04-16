import useLoadoutStore from "../../../../stores/LoadoutSlice.tsx";
import Grid2 from "@mui/material/Grid2";
import {Typography} from "@mui/material";
import {Selectable} from "../../../../interfaces/SelectableInterface.tsx";
import {isMutation} from "../../../../util/TypeguardUtility.tsx";
import useCharacterStore from "../../../../stores/CharacterSlice.tsx";
import {MutationCard} from "./MutationCard.tsx";

export const MutationActiveGrid = () => {

    const activeLoadout = useLoadoutStore(state => state.activeLoadout);
    const mutations = activeLoadout?.mutations;
    const removeMutation = useCharacterStore(state => state.removeMutation);

    const handleMutationClick = async (mutation: Selectable) => {
        if (isMutation(mutation)) {
            await removeMutation(mutation);
        }
    }

    return (
        <Grid2 container spacing={2} justifyContent="center">
            {mutations && mutations.length > 0 ? (
                mutations.map((mutation) => (
                    <Grid2 key={mutation.id}>
                        <MutationCard mutation={mutation} removeMutation={handleMutationClick}/>
                    </Grid2>
                ))
            ) : (
                <Grid2>
                    <Typography>No Active Mutations</Typography>
                </Grid2>
            )}
        </Grid2>
    );
}