import {create} from "zustand";
import {Perk} from "../interfaces/PerkInterface.tsx";
import {Specials} from "../interfaces/SpecialsInterface.tsx";
import {devtools} from "zustand/middleware";
import {changeSpecialsStats} from "../api/PlayerApiService.tsx";
import {addPerk, changePerkRank, removePerk} from "../api/PerkApiService.tsx";
import useLoadoutStore from "./LoadoutSlice.tsx";
import {changedSpecials} from "../util/PlayerUtility.tsx";
import {getExcessPerksToRemoveFromMultipleSpecials} from "../util/PerkUtility.tsx";
import {Mutation} from "../interfaces/MutationInterface.tsx";
import {addMutation, removeMutation} from "../api/MutationApiService.tsx";

interface CharacterStore {
    changeSpecials: (specials: Specials) => Promise<void>;
    addPerk: (perk: Perk) => Promise<void>;
    removePerk: (perk: Perk) => Promise<void>;
    changePerkRank: (perk: Perk, rank: number) => Promise<void>;
    addMutation: (mutation: Mutation) => Promise<void>;
    removeMutation: (mutation: Mutation) => Promise<void>;
}

const useCharacterStore = create<CharacterStore>()(
    devtools((_set, get) => ({
        changeSpecials: async (specials: Specials) => {
            const { activeLoadout } = useLoadoutStore.getState();
            if (activeLoadout && specials) {
                try {
                    await changeSpecialsStats(activeLoadout.loadoutID, specials);
                    const changedSpecialsList = changedSpecials(specials, activeLoadout.player.specials);

                    useLoadoutStore.setState((state) => ({
                        ...state,
                        activeLoadout: {
                            ...activeLoadout,
                            player: {
                                ...activeLoadout.player,
                                specials: specials
                            }
                        }
                    }));

                    //removes excessive perks once a change has taken place.
                    const updatedActiveLoadout = useLoadoutStore.getState().activeLoadout;
                    if (updatedActiveLoadout) {
                        const perksToRemove = getExcessPerksToRemoveFromMultipleSpecials(updatedActiveLoadout, changedSpecialsList);
                        perksToRemove.forEach(perk => {
                            get().removePerk(perk);
                        });
                    }
                } catch (error){
                    console.error('Error updating specials:', error);
                }
            }
        },
        addPerk: async (perkToAdd: Perk) => {
            const { activeLoadout } = useLoadoutStore.getState();
            if (activeLoadout && perkToAdd) {
                try {
                    await addPerk(activeLoadout.loadoutID, perkToAdd);
                    useLoadoutStore.setState((state) => ({
                        ...state,
                        activeLoadout: {
                            ...activeLoadout,
                            perks: [...activeLoadout.perks, perkToAdd]
                        }
                    }));
                } catch (error){
                    console.error('Error adding perk:', error);
                }
            }
        },
        removePerk: async (perkToRemove: Perk) => {
            const { activeLoadout } = useLoadoutStore.getState();
            if (activeLoadout && perkToRemove) {
                try {

                    await removePerk(activeLoadout.loadoutID, perkToRemove);
                    useLoadoutStore.setState((state) => ({
                        ...state,
                        activeLoadout: {
                            ...activeLoadout,
                            perks: activeLoadout.perks.filter(perk => perk.name !== perkToRemove.name)
                        }
                    }));
                } catch (error){
                    console.error('Error removing perk:', error);
                }
            }
        },

        changePerkRank: async (perkToChange: Perk, newRank: number) => {
            const { activeLoadout } = useLoadoutStore.getState();
            if (activeLoadout && perkToChange){
                try {
                    const updatedPerk = { ...perkToChange, currentRank: newRank };
                    await changePerkRank(activeLoadout.loadoutID, updatedPerk);

                    const updatedPerkList = activeLoadout.perks?.map(perk =>
                        perk.name === perkToChange.name ? updatedPerk : perk
                    ) || [];

                    useLoadoutStore.setState((state) => ({
                        ...state,
                        activeLoadout: {
                            ...activeLoadout,
                            perks: updatedPerkList
                        }
                    }));
                } catch (error){
                    console.error('Error updating perks:', error);
                }
            }
        },

        addMutation: async (mutationToAdd: Mutation) => {
            const { activeLoadout } = useLoadoutStore.getState();
            if (activeLoadout && mutationToAdd) {
                try {
                    await addMutation(activeLoadout.loadoutID, mutationToAdd);
                    useLoadoutStore.setState((state) => ({
                        ...state,
                        activeLoadout: {
                            ...activeLoadout,
                            mutations: [...activeLoadout.mutations, mutationToAdd]
                        }
                    }));
                } catch (error){
                    console.error('Error adding mutation:', error);
                }
            }
        },
        removeMutation: async (mutationToRemove: Mutation) => {
            const { activeLoadout } = useLoadoutStore.getState();
            if (activeLoadout && mutationToRemove) {
                try {

                    await removeMutation(activeLoadout.loadoutID, mutationToRemove);
                    useLoadoutStore.setState((state) => ({
                        ...state,
                        activeLoadout: {
                            ...activeLoadout,
                            mutations: activeLoadout.perks.filter(mutation => mutation.id !== mutationToRemove.id)
                        }
                    }));
                } catch (error){
                    console.error('Error removing mutation:', error);
                }
            }
        },
    }), {name: "CharacterStore"})
);

export default useCharacterStore;