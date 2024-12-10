import {Box, Typography} from "@mui/material";
import {Consumable} from "../../../interfaces/ConsumableInterface.tsx";
import {SelectableCard} from "../../shared_components/SelectableCard.tsx";
import {Selectable} from "../../../interfaces/SelectableInterface.tsx";

export const ConsumableCard = ({consumable, addConsumable, removeConsumable}: {
    consumable: Consumable,
    addConsumable?: (consumable: Selectable) => void,
    removeConsumable?:(consumable: Selectable) => void }) => {

    const standardBackgroundColour = "#ffffff";

    return (
        <SelectableCard
            selectable={consumable}
            primaryColour={standardBackgroundColour}
            addSelectable={addConsumable}
            removeSelectable={removeConsumable}
            titleContent={<h3>{consumable.name}</h3>}
            bodyContent={
                <Box padding={2} flexGrow={1} display="flex" flexDirection="column" justifyContent="space-between">
                    <Box bgcolor={standardBackgroundColour} padding={1} borderRadius={1} marginBottom={1} flexGrow={1}>
                        <Typography variant="body2" noWrap={false} style={{ height: '100%', overflowWrap: 'break-word' }}>
                            {consumable.consumableType}
                        </Typography>
                    </Box>
                </Box>
            }
        />
    );
}