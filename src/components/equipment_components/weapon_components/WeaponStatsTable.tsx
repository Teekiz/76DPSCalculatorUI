import { useState} from 'react';
import { RangedWeaponDetails, MeleeWeaponDetails} from '../../../interfaces/WeaponInterfaces.tsx';
import { getRangedStatsRows, getMeleeStatsRows } from './WeaponSpecificStats.tsx';
import { getDamageByLevel } from './WeaponMethods.tsx';

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
                    <TableRow>{weapon ? weapon.weaponName : 'No Weapon Selected'}</TableRow>
                </TableHead>
                <TableBody>
                    <FormControl fullWidth>
                        <TableRow>
                                <InputLabel id="level-select-label">{level ? 'Level ' + level : 'Set level'}</InputLabel>
                        </TableRow>
                        <TableRow>
                            <Select
                                labelId={"level-select-label"}
                                value={level?.toString()}
                                onChange={handleLevelChange}
                                fullWidth>

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
                        </TableRow>
                    </FormControl>
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
                        <TableCell>{level && weapon ? (getDamageByLevel(weapon, level)) : ('')}</TableCell>
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

        /*
        <Table striped bordered hover size='sm'>
          <thead>
            <tr>
              <th colSpan={2}>{weapon ? weapon.weaponName : 'No Weapon Selected'}</th>
            </tr>
          </thead>
          <tbody>
            <tr>

            <tr>

            </tr>
            <tr>

            </tr>
            <tr>

            </tr>

          </tbody>
        </Table>
        */

    );

}