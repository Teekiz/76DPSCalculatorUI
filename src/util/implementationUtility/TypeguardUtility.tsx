import {Selectable} from "../../interfaces/SelectableInterface";
import {Consumable} from "../../interfaces/ConsumableInterface";
import {Perk} from "../../interfaces/PerkInterface";
import {Mutation} from "../../interfaces/MutationInterface";

export function isConsumable(consumable: Selectable): consumable is Consumable {
    return (consumable as Consumable).consumableType !== undefined && (consumable as Consumable).addictionType !== undefined;
}

export function isPerk(perk: Selectable): perk is Perk {
    return (perk as Perk).special !== undefined && (perk as Perk).currentRank !== undefined;
}

export function isMutation(mutation: Selectable): mutation is Mutation {
    return (mutation as Mutation).description !== undefined;
}
