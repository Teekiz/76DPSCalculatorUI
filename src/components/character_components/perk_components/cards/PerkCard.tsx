import {Perk} from "../../../../interfaces/PerkInterface.tsx";
import {PrimaryCardColour, SecondaryCardColour} from "./PerkCardDetails.tsx"
import {Box, Button, ButtonGroup, Card, CardHeader, Typography} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import {CardBody} from "react-bootstrap";
import {Star, StarOutline} from "@mui/icons-material";

export const PerkCard = ({perk, isDetailed}: { perk: Perk, isDetailed: boolean}) => {

    const standardBackgroundColour = "#ffffff";

    const rankColour = (value: number): boolean => {
        return value <= perk.currentRank;
    }

    return (
        <Card>
            <CardHeader>
                <Grid2 spacing={2}>
                    <Grid2>
                        <Box bgcolor={PrimaryCardColour(perk.special) } padding={2}>
                            <Box bgcolor={standardBackgroundColour} padding={2}>
                                <Typography>{perk.baseCost}</Typography>
                            </Box>
                            <Typography>{perk.name.toUpperCase()}</Typography>
                        </Box>
                    </Grid2>
                </Grid2>
            </CardHeader>

            <CardBody>
                <Box bgcolor={SecondaryCardColour(perk.special)} padding={2}>
                    {/* if the detailed version has been requested */}
                    {isDetailed ? <Box bgcolor={standardBackgroundColour} padding={1}>
                        <ButtonGroup>
                            {Array.from({ length: perk.maxRank }, (_, i) => (
                                <Button key={i + 1} aria-label={`Rank ${i + 1}`}>
                                    {/* if the button is lower than or equal to the current rank, fill it in, otherwise don't */}
                                    {rankColour(i + 1) ? <Star /> : <StarOutline />}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </Box> : ""}
                    <Box bgcolor={standardBackgroundColour} padding={1}>
                        <Typography>{perk.description}</Typography>
                    </Box>
                </Box>
            </CardBody>
        </Card>
    );
}