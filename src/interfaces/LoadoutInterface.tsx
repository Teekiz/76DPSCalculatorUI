import { RangedWeaponDetails, MeleeWeaponDetails } from "../interfaces/WeaponInterfaces";
import { Perk } from "./PerkInterface";

export interface Loadout{
    loadoutID: number;
    weapon: RangedWeaponDetails | MeleeWeaponDetails | null;
    perks: Perk[];
};