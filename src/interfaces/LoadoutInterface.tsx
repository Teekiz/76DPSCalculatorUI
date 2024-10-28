import { RangedWeaponDetails, MeleeWeaponDetails } from "./WeaponInterfaces.tsx";
import { Perk } from "./PerkInterface";

export interface Loadout{
    loadoutID: number;
    weapon: RangedWeaponDetails | MeleeWeaponDetails | null;
    perks: Perk[];
}