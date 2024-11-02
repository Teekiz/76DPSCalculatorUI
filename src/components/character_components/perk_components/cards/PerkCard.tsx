import {Perk} from "../../../../interfaces/PerkInterface.tsx";
import {PrimaryCardColour, SecondaryCardColour} from "./PerkCardDetails.tsx"
import {Box, Button, ButtonGroup, Card, Typography} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import {Star, StarOutline} from "@mui/icons-material";
import {animated, useSpring} from "@react-spring/web";

export const PerkCard = ({perk, isDetailed}: { perk: Perk, isDetailed: boolean}) => {

    const standardBackgroundColour = "#ffffff";

    const rankColour = (value: number): boolean => {
        return value <= perk.currentRank;
    }

    //animation
    const [springProps, set] = useSpring(() => ({ transform: 'scale(1)' }));

    return (
        <animated.div
            style={springProps}
            onMouseEnter={() => set({transform: 'scale(1.1)'})} // Scale up on hover
            onMouseLeave={() => set({transform: 'scale(1)'})} // Scale back on mouse leave
        >
            <Card sx={{width: 200, height: 300, display: "flex", flexDirection: "column", margin: 1}}>
                <Box bgcolor={PrimaryCardColour(perk.special)} padding={2} height={75} display="flex"
                     alignItems="center">
                    <Grid2 container alignItems="center">
                        <Grid2>
                            <Box bgcolor={standardBackgroundColour} width={30} height={30} display="flex"
                                 justifyContent="center" alignItems="center" borderRadius={1}>
                                <Typography align="center" variant="subtitle2">{perk.baseCost}</Typography>
                            </Box>
                        </Grid2>
                        <Grid2>
                            <Typography
                                color="#ffffff"
                                style={{
                                    fontSize: perk.name.length > 10 ? '0.8rem' : '1rem',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                                align="right"
                            >
                                {perk.name.toUpperCase()}
                            </Typography>
                        </Grid2>
                    </Grid2>
                </Box>
                <Box bgcolor={SecondaryCardColour(perk.special)} padding={2} flexGrow={1} display="flex"
                     flexDirection="column" justifyContent="space-between">
                    <Box bgcolor={standardBackgroundColour} padding={1} borderRadius={1} marginBottom={1} flexGrow={1}>
                        <Typography variant="body2" noWrap={false} style={{height: '100%', overflowWrap: 'break-word'}}>
                            {perk.description}
                        </Typography>
                    </Box>
                    {isDetailed && (
                        <Box bgcolor={standardBackgroundColour} padding={1} borderRadius={1} display="flex"
                             justifyContent="center">
                            <ButtonGroup>
                                {Array.from({ length: perk.maxRank }, (_, i) => (
                                    <Button key={`rank-${perk.id}-${i + 1}`} size={"small"} aria-label={`Rank ${i + 1}`}>
                                        {rankColour(i + 1) ? <Star fontSize={"small"} /> : <StarOutline fontSize={"small"} />}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </Box>
                    )}
                </Box>
            </Card>
        </animated.div>
    );
}