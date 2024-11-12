import {Perk} from "../interfaces/PerkInterface.tsx";
import {Loadout} from "../interfaces/LoadoutInterface.tsx";
import {Specials} from "../interfaces/SpecialsInterface.tsx";
import {Player} from "../interfaces/PlayerInterface.tsx";

//a function used to determine if there is enough points to add a perk, if the perk is existing, it 'removes' the perk for the check
export function hasAvailableSpecialPoints(perkToCheck: Perk, activeLoadout: Loadout, newRank? : number,): boolean {
    if (!activeLoadout || !activeLoadout.perks || !activeLoadout.player.specials) return false;

    const newPerk = {...perkToCheck, currentRank: newRank || perkToCheck.currentRank};
    const availablePoints = calculatePerkPointsAvailable(newPerk.special, activeLoadout.player);
    const usedPoints = calculatePerkPointsUsed(newPerk.special, activeLoadout.perks, newPerk);
    return availablePoints - usedPoints >= calculateSpecialCost(newPerk);
}

export function calculateSpecialCost(perk: Perk): number {
    return perk.baseCost + perk.currentRank - 1;
}

export function calculatePerkPointsUsed(special: string, perks: Perk[], perkToAdd?: Perk){
    const filterName = perkToAdd ? perkToAdd.name : "";
    return perks
        .filter(perk => perk.special === special && perk.name !== filterName)
        .reduce((total, perk) => total + calculateSpecialCost(perk), 0);
}

export function calculatePerkPointsAvailable(special: string, player: Player){
    return player.specials[special.toLowerCase() as keyof Specials] || 1;
}

export function getExcessPerksToRemoveFromMultipleSpecials(loadout: Loadout, specials: string[]){
    const excessPerksList: Perk[] = [];
    specials.forEach(special => {
        const excessPerks = getExcessPerksToRemove(loadout, special);
        excessPerksList.push(...excessPerks);
    });
    return excessPerksList;
}

//Returns a list of perks that need to be removed before all spaces are freed up.
export function getExcessPerksToRemove(loadout: Loadout, special: string): Perk[]{
    const perksUsed = loadout.perks.filter(perk => perk.special === special);
    const perksToBeRemoved: Perk[] = [];

    const pointsAvailable = calculatePerkPointsAvailable(special, loadout.player);
    let pointsUsed = calculatePerkPointsUsed(special, perksUsed);

    for (const perk of perksUsed.reverse()) {

        //if there is no excess perks, break the loop
        if (pointsAvailable >= pointsUsed) break;
            perksToBeRemoved.push(perk);
            pointsUsed -= calculateSpecialCost(perk);
    }

    return perksToBeRemoved;
}