import {Selectable} from "../../../../interfaces/SelectableInterface";
import {SelectableCard} from "../../../shared_components/SelectableCard";
import {Box, Typography} from "@mui/material";
import {Mutation} from "../../../../interfaces/MutationInterface";

export const MutationCard = ({mutation, addMutation, removeMutation}: {
    mutation: Mutation,
    addMutation?: (mutation: Selectable) => void,
    removeMutation?:(mutation: Selectable) => void }) => {

    const standardBackgroundColour = "#ffffff";

    return (
        <SelectableCard
            selectable={mutation}
            primaryColour={standardBackgroundColour}
            addSelectable={addMutation}
            removeSelectable={removeMutation}
            titleContent={<h3>{mutation.name}</h3>}
            bodyContent={
                <Box padding={2} flexGrow={1} display="flex" flexDirection="column" justifyContent="space-between">
                    <Box bgcolor={standardBackgroundColour} padding={1} borderRadius={1} marginBottom={1} flexGrow={1}>
                        <Typography variant="body2" noWrap={false} style={{ height: '100%', overflowWrap: 'break-word' }}>
                            {mutation.description}
                        </Typography>
                    </Box>
                </Box>
            }
        />
    );
}