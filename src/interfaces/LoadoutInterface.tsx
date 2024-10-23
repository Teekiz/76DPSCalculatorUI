import { RangedWeaponDetails, MeleeWeaponDetails } from "../interfaces/WeaponInterfaces";
import { Perk } from "./PerkInterface";

export interface LoadoutsContextType {
    loadouts: Loadout[];
    setLoadouts: (loadouts: Loadout[]) => void;
}

export interface Loadout{
    loadoutID: number;
    weapon: RangedWeaponDetails | MeleeWeaponDetails | null;
    perks: Perk[];
};