import {useEffect, useState, useRef} from "react";
import {debounce} from "lodash";
import useLoadoutStore from "../../../../stores/LoadoutSlice";
import {Specials} from "../../../../interfaces/SpecialsInterface";

import {
    IconButton,
    TextField,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    Paper,
    TableCell, Typography
} from '@mui/material';
import {ArrowCircleLeftOutlined, ArrowCircleRightOutlined } from '@mui/icons-material';
import useCharacterStore from "../../../../stores/CharacterSlice";

export default function PlayerStatsForm(){

    const player = useLoadoutStore(state => state.activeLoadout?.player);
    const changeSpecials = useCharacterStore(state => state.changeSpecials)
    const specialAttributes: Array<keyof Specials> = ["strength", "perception", "endurance", "charisma", "intelligence", "agility", "luck"];
    const [specialsCopy, setSpecialsCopy] = useState<Specials | null>(null);
    const [tempValue, setTempValue] = useState<number | undefined>(undefined); // a value used to capture any changes from user input (without commiting it)

    //creates a temp copy of the players special stats
    useEffect(() => {
        if (player?.specials) {
            setSpecialsCopy({ ...player.specials }); // Create a shallow copy of the specials
        }
    }, [player?.specials]); // Dependency array: runs when player.specials changes

    //called when changing the value
    const handleInputChange = (key: keyof Specials, value: number)=> {
        if (specialsCopy) {
            const validValue = validateValue(value) ? value : Math.min(15, Math.max(1, value));
            const updatedSpecials = { ...specialsCopy, [key]: validValue };
            setSpecialsCopy(updatedSpecials);
            debouncedSpecialUpdate(updatedSpecials);
        }
    }

    //called when clicking the button. instead of taking the user input, this takes the current value and updates it.
    const handleButtonClick = (key: keyof Specials, value: number)=> {
        if (specialsCopy) {
            const newValue = specialsCopy[key] + value;
            if (validateValue(newValue)) {
                const updatedSpecials = {...specialsCopy, [key]: newValue};
                setSpecialsCopy(updatedSpecials);
                debouncedSpecialUpdate(updatedSpecials);
            }
        }
    }

    //Debounce the API call
    const debouncedSpecialUpdate = useRef(
        debounce(async (updatedSpecials : Specials) => {
            await changeSpecials(updatedSpecials);
    }, 300)
    ).current;

    const validateValue = (value: number): boolean => {
        return !(value < 1 || value > 15);
    }

    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography>Player:</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {specialAttributes.map((key) => {
                        const value = specialsCopy?.[key] ?? 1; // Default value if player.specials is null

                        return (
                            <TableRow key={key}>
                                <TableCell>
                                    <Typography variant={"body2"}>{key.toUpperCase()}</Typography>
                                    <IconButton
                                    onClick={() => handleButtonClick(key, -1)}
                                    aria-label={`Decrease ${key} by one point.`}
                                    size="large">
                                    <ArrowCircleLeftOutlined />
                                    </IconButton>
                                    <TextField
                                    type={"number"}
                                    aria-label={`Change ${key} value.`}
                                    value={tempValue ?? value}
                                    onChange={(e) => setTempValue(Number(e.target.value))}
                                    onBlur={() => {
                                        if (tempValue !== undefined){
                                            handleInputChange(key, tempValue);
                                            setTempValue(undefined);
                                        }
                                    }} // Commit on blur, resetting default back to null
                                    >
                                    </TextField>
                                    <IconButton
                                        onClick={() => handleButtonClick(key, 1)}
                                        aria-label={`Increase ${key} by one point.`}
                                        size="large">
                                        <ArrowCircleRightOutlined />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>

                </Table>
        </TableContainer>
    );
}