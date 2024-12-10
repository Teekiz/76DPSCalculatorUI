import {Perk} from "../../../../interfaces/PerkInterface.tsx";
import {PrimaryCardColour, SecondaryCardColour} from "./PerkCardDetails.tsx"
import {Box, Button, ButtonGroup, Typography} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import {Star, StarOutline} from "@mui/icons-material";
import {SelectableCard} from "../../../shared_components/SelectableCard.tsx";
import {Selectable} from "../../../../interfaces/SelectableInterface.tsx";

export const PerkCard = ({perk, isDetailed, addPerk, removePerk, changeRank}: {
    perk: Perk;
    isDetailed: boolean;
    addPerk?: (perk: Selectable) => void;
    removePerk?:(perk: Selectable) => void;
    changeRank?:(perk: Perk, newRank: number) => void;
    }) => {

    const standardBackgroundColour = "#ffffff";

    const rankColour = (value: number): boolean => {
        return value <= perk.currentRank;
    }

    return (
        <SelectableCard
            selectable={perk}
            primaryColour={PrimaryCardColour(perk.special)}
            addSelectable={addPerk}
            removeSelectable={removePerk}
            titleContent={
                <Box bgcolor={PrimaryCardColour(perk.special)} padding={2} height={75} display="flex" alignItems="center">
                    <Grid2 container alignItems="center">
                        <Grid2>
                            <Box bgcolor={standardBackgroundColour} width={30} height={30} display="flex" justifyContent="center" alignItems="center" borderRadius={1}>
                                <Typography align="center" variant="subtitle2">{perk.baseCost}</Typography>
                            </Box>
                        </Grid2>
                    </Grid2>
                </Box>
            }
            bodyContent={
                <Box bgcolor={SecondaryCardColour(perk.special)} padding={2} flexGrow={1} display="flex" flexDirection="column" justifyContent="space-between">
                    <Box bgcolor={standardBackgroundColour} padding={1} borderRadius={1} marginBottom={1} flexGrow={1}>
                        <Typography variant="body2" noWrap={false} style={{ height: '100%', overflowWrap: 'break-word' }}>
                            {perk.description}
                        </Typography>
                    </Box>
                    {isDetailed && (
                        <Box bgcolor={standardBackgroundColour} padding={1} borderRadius={1} display="flex" justifyContent="center">
                            <ButtonGroup>
                                {Array.from({ length: perk.maxRank }, (_, i) => (
                                    <Button
                                        key={`rank-${perk.id}-${i + 1}`}
                                        size={"small"}
                                        aria-label={`Rank ${i + 1}`}
                                        onClick={() => changeRank ? changeRank(perk, i + 1) : undefined}
                                    >
                                        {rankColour(i + 1) ? <Star fontSize={"small"} /> : <StarOutline fontSize={"small"} />}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </Box>
                    )}
                </Box>
            }
        />
    );
}