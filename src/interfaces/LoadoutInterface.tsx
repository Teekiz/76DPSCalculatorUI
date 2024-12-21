import { RangedWeaponDetails, MeleeWeaponDetails } from "./WeaponInterfaces.tsx";
import { Perk } from "./PerkInterface";
import {Player} from "./PlayerInterface.tsx";
import {Consumable} from "./ConsumableInterface.tsx";
import {Mutation} from "./MutationInterface.tsx";

export interface Loadout{
    loadoutID: number;
    player: Player;
    weapon: RangedWeaponDetails | MeleeWeaponDetails | null;
    perks: Perk[];
    consumables: Consumable[];
    mutations: Mutation[];
}