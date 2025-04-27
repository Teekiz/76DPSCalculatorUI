import { useState} from 'react';
import { RangedWeaponDetails, MeleeWeaponDetails} from '../../../../interfaces/WeaponInterfaces';
import { getRangedStatsRows, getMeleeStatsRows } from './WeaponSpecificStats';
import { getDamageByLevel } from './WeaponMethods';

import {
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    Paper,
    TableCell, SelectChangeEvent,
} from '@mui/material';

export default function WeaponStatsTable({ weapon }: { weapon: RangedWeaponDetails | MeleeWeaponDetails | null | undefined }) {
    const [level, setLevel] = useState<number | null>(null);

    const handleLevelChange = (event: SelectChangeEvent) => {
        const level = event.target.value;
        setLevel(Number(level));
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={2}>
                            {weapon ? weapon.name : 'No Weapon Selected'}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={2}>
                            <FormControl fullWidth>
                                <InputLabel id="level-select-label">
                                    {level ? 'Level ' + level : 'Set level'}
                                </InputLabel>
                                <Select
                                    labelId="level-select-label"
                                    value={level?.toString() || ''}
                                    onChange={handleLevelChange}
                                    variant="outlined"
                                    fullWidth
                                >
                                    {weapon && weapon.weaponDamageByLevel ? (
                                        Object.keys(weapon.weaponDamageByLevel).length > 0 ? (
                                            Object.entries(weapon.weaponDamageByLevel).map(([level]) => (
                                                <MenuItem key={level} value={level}>
                                                    Level: {level}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem disabled>No damage available</MenuItem>
                                        )
                                    ) : (
                                        <MenuItem disabled>Please set weapon first</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Weapon type:</TableCell>
                        <TableCell>{weapon?.weaponType || ''}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Damage type:</TableCell>
                        <TableCell>{weapon?.damageType || ''}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Damage:</TableCell>
                        <TableCell>
                            {level && weapon ? getDamageByLevel(weapon, level) : ''}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>AP cost:</TableCell>
                        <TableCell>{weapon?.apCost || ''}</TableCell>
                    </TableRow>
                    {getRangedStatsRows(weapon)}
                    {getMeleeStatsRows(weapon)}
                </TableBody>
            </Table>
        </TableContainer>
    );

}