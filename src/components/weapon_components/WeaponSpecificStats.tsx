import { isRangedWeapon, isMeleeWeapon } from "./WeaponMethods";

export function getRangedStatsRows(weapon: any): JSX.Element | null {
    if (weapon && isRangedWeapon(weapon))
    {
        return (
            <tr>
                <td>Fire rate:</td>
                <td>{weapon.fireRate}</td>
            </tr>
        );
    }
    return null;
}

export function getMeleeStatsRows(weapon: any): JSX.Element | null {
    if (weapon && isMeleeWeapon(weapon))
    {
        return null;
    }
    return null;
}