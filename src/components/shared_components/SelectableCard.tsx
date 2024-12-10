
import {animated, useSpring} from "@react-spring/web";
import {useState} from "react";
import {Box, Card, IconButton, Typography} from "@mui/material";
import {Close} from "@mui/icons-material";
import Grid2 from "@mui/material/Grid2";
import {Selectable} from "../../interfaces/SelectableInterface.tsx";

export const SelectableCard = ({selectable, primaryColour, addSelectable, removeSelectable, titleContent, bodyContent}: {

    selectable: Selectable, //the object used to determine
    primaryColour: string,
    addSelectable?: (selectable: Selectable) => void,
    removeSelectable?:(selectable: Selectable) => void,
    titleContent?: React.ReactNode
    bodyContent?: React.ReactNode }) => {

    //animation
    const [springProps, set] = useSpring(() => ({ transform: 'scale(1)' }));
    const [isHovered, setIsHovered] = useState(false);

    return (
        <animated.div
            style={springProps}
            onMouseEnter={() => set({transform: 'scale(1.1)'})}
            onMouseLeave={() => set({transform: 'scale(1)'})}
        >
            <Card sx={{width: 200, height: 300, display: "flex", flexDirection: "column", margin: 1}}
                  onClick={addSelectable ? () => addSelectable(selectable) : undefined}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}>

                {/* Close button to delete the perk */}
                {removeSelectable && isHovered && (
                    <IconButton
                        sx={{ position: "absolute", top: 8, right: 8 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            removeSelectable(selectable);
                        }}
                    >
                        <Close />
                    </IconButton>
                )}

                <Box bgcolor={primaryColour} padding={2} height={75} display="flex"
                     alignItems="center">
                    <Grid2 container alignItems="center">
                        {titleContent}
                        <Grid2>
                            <Typography
                                color="#ffffff"
                                style={{
                                    fontSize: selectable.name.length > 10 ? '0.8rem' : '1rem',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                                align="right"
                            >
                                {selectable.name.toUpperCase()}
                            </Typography>
                        </Grid2>
                    </Grid2>
                </Box>
                {bodyContent}
            </Card>
        </animated.div>
    );
}