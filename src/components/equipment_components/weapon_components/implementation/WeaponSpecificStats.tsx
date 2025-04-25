import { isRangedWeapon, isMeleeWeapon } from "./WeaponMethods";

import {TableRow, TableCell} from "@mui/material";

export function getRangedStatsRows(weapon: unknown) {
    if (weapon && isRangedWeapon(weapon))
    {
        return (
            <TableRow>
                <TableCell>Fire rate:</TableCell>
                <TableCell>{weapon.fireRate}</TableCell>
            </TableRow>
        );
    }
    return null;
}

export function getMeleeStatsRows(weapon: unknown) {
    if (weapon && isMeleeWeapon(weapon))
    {
        return null;
    }
    return null;
}