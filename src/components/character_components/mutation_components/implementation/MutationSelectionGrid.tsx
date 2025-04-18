import {useState} from "react";
import useLoadoutStore from "../../../../stores/LoadoutSlice";
import {useQuery} from "react-query";
import {Box, Grid2, TextField, Typography} from "@mui/material";
import {Selectable} from "../../../../interfaces/SelectableInterface";
import {isMutation} from "../../../../util/implementationUtility/TypeguardUtility";
import useCharacterStore from "../../../../stores/CharacterSlice";
import {Mutation} from "../../../../interfaces/MutationInterface";
import {getAllMutations} from "../../../../api/MutationApiService";
import {MutationCard} from "./MutationCard";

export const MutationSelectionGrid = () => {

    const [searchTerm, setSearchTerm] = useState('');

    const activeLoadout = useLoadoutStore(state => state.activeLoadout);
    const activeMutationsName = activeLoadout?.mutations?.map((mutation) => mutation.name.toLowerCase() || []);
    const addMutation = useCharacterStore(state => state.addMutation);

    const {data: mutations} = useQuery<Mutation[]>('mutations', getAllMutations);

    const handleMutationClick =  async (mutation: Selectable) => {
        if (activeLoadout && isMutation(mutation)){
            await addMutation(mutation);
        } else {
            console.debug("Cannot add mutation.")
        }
    }

    const filteredOptions = mutations?.filter(mutations =>
        mutations.name.toLowerCase().includes(searchTerm.toLowerCase()) && !activeMutationsName?.includes(mutations.name.toLowerCase())
    );

    return (
        <>
            <Box sx={{ width: 500, maxWidth: '100%' }}>
                <TextField
                    fullWidth
                    label="Filter mutations"
                    id="fullWidth"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoComplete="on"
                />
            </Box>

            <Grid2 container spacing={2} justifyContent="center">
                {filteredOptions && filteredOptions.length > 0 ? (
                    filteredOptions.map((mutation) => (
                        <Grid2 key={mutation.id}>
                            <MutationCard mutation={mutation}  addMutation={handleMutationClick}/>
                        </Grid2>
                    ))
                ) : (
                    <Grid2>
                        <Typography>No mutations found</Typography>
                    </Grid2>
                )}
            </Grid2>
        </>
    );
};