import {Selectable} from "../interfaces/SelectableInterface.tsx";
import {Consumable} from "../interfaces/ConsumableInterface.tsx";
import {Perk} from "../interfaces/PerkInterface.tsx";

export function isConsumable(consumable: Selectable): consumable is Consumable {
    return (consumable as Consumable).consumableType !== undefined && (consumable as Consumable).addictionType !== undefined;
}

export function isPerk(perk: Selectable): perk is Perk {
    return (perk as Perk).special !== undefined && (perk as Perk).currentRank !== undefined;
}
