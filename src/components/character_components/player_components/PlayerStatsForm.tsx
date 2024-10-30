import useLoadoutStore from "../../../stores/LoadoutsStore.tsx";
import {Specials} from "../../../interfaces/SpecialsInterface.tsx";

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
export default function PlayerStatsForm(){

    const player = useLoadoutStore(state => state.activeLoadout?.player);
    const specialAttributes = ["strength", "perception", "endurance", "charisma", "intelligence", "agility", "luck"];

    const handleInputChange = (key: string, value: number)=> {
        alert(key + value);
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
                        const value = player?.specials?.[key as keyof Specials] ?? 1; // Default value if player.specials is null

                        return (
                            <TableRow key={key}>
                                <TableCell>
                                    <Typography variant={"body2"}>{key.toUpperCase()}</Typography>
                                    <IconButton
                                    onClick={() => {alert(key)}}
                                    aria-label={`Increase ${key} by one point.`}
                                    size="large">
                                        <ArrowCircleLeftOutlined />
                                    </IconButton>
                                    <TextField
                                    type={"number"}
                                    defaultValue={value}
                                    value={value}
                                    onChange={(e) => handleInputChange(key, Number(e.target.value))}>
                                    </TextField>
                                    <IconButton
                                        onClick={() => {alert(key)}}
                                        aria-label={`Decrease ${key} by one point.`}
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