import {animated, useSpring} from "@react-spring/web";
import {useState} from "react";
import {Box, Card, IconButton, Typography} from "@mui/material";
import {Close} from "@mui/icons-material";
import Grid2 from "@mui/material/Grid2";
import {Consumable} from "../../../interfaces/ConsumableInterface.tsx";

export const ConsumableCard = ({consumable, addConsumable, removeConsumable}: {
    consumable: Consumable,
    addConsumable?: (consumable: Consumable) => void,
    removeConsumable?:(consumable: Consumable) => void }) => {

    const standardBackgroundColour = "#ffffff";

    //animation
    const [springProps, set] = useSpring(() => ({ transform: 'scale(1)' }));
    const [isHovered, setIsHovered] = useState(false);

    return (
        <animated.div
            style={springProps}
            onMouseEnter={() => set({transform: 'scale(1.1)'})} // Scale up on hover
            onMouseLeave={() => set({transform: 'scale(1)'})} // Scale back on mouse leave
        >
            <Card sx={{width: 200, height: 300, display: "flex", flexDirection: "column", margin: 1}}
                  onClick={addConsumable ? () => addConsumable(consumable) : undefined}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}>

                {/* Close button to delete the perk */}
                {removeConsumable && isHovered && (
                    <IconButton
                        sx={{ position: "absolute", top: 8, right: 8 }} // Position the button in the top-right corner
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent click event from bubbling up to the Card
                            removeConsumable(consumable); // Call the delete function
                        }}
                    >
                        <Close />
                    </IconButton>
                )}

                <Box padding={2} height={75} display="flex"
                     alignItems="center">
                    <Grid2 container alignItems="center">
                        <Grid2>
                            <Typography
                                color="#ffffff"
                                style={{
                                    fontSize: consumable.name.length > 10 ? '0.8rem' : '1rem',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                                align="right"
                            >
                                {consumable.name.toUpperCase()}
                            </Typography>
                        </Grid2>
                    </Grid2>
                </Box>
                <Box padding={2} flexGrow={1} display="flex"
                     flexDirection="column" justifyContent="space-between">
                    <Box bgcolor={standardBackgroundColour} padding={1} borderRadius={1} marginBottom={1} flexGrow={1}>
                        <Typography variant="body2" noWrap={false} style={{height: '100%', overflowWrap: 'break-word'}}>
                            {consumable.consumableType}
                        </Typography>
                    </Box>
                </Box>
            </Card>
        </animated.div>
    );
}