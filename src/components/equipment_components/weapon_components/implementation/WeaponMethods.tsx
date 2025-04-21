import { RangedWeaponDetails, MeleeWeaponDetails } from "../../../../interfaces/WeaponInterfaces";

//a function used to determine if a key matching the given level can be found, and if so, return the value (otherwise null)
export function getDamageByLevel(weapon: RangedWeaponDetails | MeleeWeaponDetails | null, level: number): number
{
    if(weapon != null && level in weapon.weaponDamageByLevel)
    {
        return weapon.weaponDamageByLevel[level];
    }
    return 0;
}

//returns true if ranged, false if melee
export function isRangedWeapon(weapon: any): weapon is RangedWeaponDetails {
    return weapon?.dataType === 'RANGED';
}

//returns true if melee, false if ranged,
export function isMeleeWeapon(weapon: any): weapon is MeleeWeaponDetails {
    return weapon?.dataType === 'MELEE';
}