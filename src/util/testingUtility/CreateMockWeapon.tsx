import {MeleeWeaponDetails, RangedWeaponDetails} from "../../interfaces/WeaponInterfaces";

export const createMockWeapon = (dataTypeValue: string, damage?:{[level: number]: number}): RangedWeaponDetails | MeleeWeaponDetails | null => {
    const damageValue = damage ?? {};
    if (dataTypeValue.toUpperCase() === 'RANGED'){
        return {
            accuracy: 0,
            apCost: 0,
            criticalBonus: 0,
            damageType: "PHYSICAL",
            dataType: dataTypeValue,
            fireRate: 0,
            id: "weapon2",
            magazineSize: 0,
            name: "Weapon Two",
            range: 0,
            weaponType: "PISTOL",
            weaponDamageByLevel: damageValue
        };
    }
    else if (dataTypeValue.toUpperCase() === 'MELEE'){
        return {
            apCost: 0,
            criticalBonus: 0,
            damageType: "PHYSICAL",
            dataType: dataTypeValue,
            id: "weapon1",
            name: "Weapon One",
            weaponDamageByLevel: damageValue,
            weaponType: "BAT"
        };
    }
    return null;
};