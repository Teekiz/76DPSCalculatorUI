import {Perk} from "../interfaces/PerkInterface.tsx";
import {Loadout} from "../interfaces/LoadoutInterface.tsx";
import {Specials} from "../interfaces/SpecialsInterface.tsx";

//a function used to determine if there is enough points to add a perk, if the perk is existing, it 'removes' the perk for the check
export function hasAvailableSpecialPoints(perkToCheck: Perk, activeLoadout: Loadout, newRank? : number,): boolean {
    if (!activeLoadout || !activeLoadout.perks || !activeLoadout.player.specials) return false;

    const newPerk = {...perkToCheck, currentRank: newRank || perkToCheck.currentRank};

    const availablePoints = activeLoadout.player.specials[newPerk.special.toLowerCase() as keyof Specials] || 1;
    console.debug(calculateSpecialCost(newPerk));

    const usedPoints = activeLoadout.perks
        .filter(perk => perk.special === newPerk.special && perk.name !== newPerk.name)
        .reduce((total, perk) => total + calculateSpecialCost(perk), 0);

    return availablePoints - usedPoints >= calculateSpecialCost(newPerk);
}

export function calculateSpecialCost(perk: Perk): number {
    return perk.baseCost + perk.currentRank - 1;
}