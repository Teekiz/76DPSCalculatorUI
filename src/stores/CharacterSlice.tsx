import {create} from "zustand";
import {Perk} from "../interfaces/PerkInterface.tsx";
import {Specials} from "../interfaces/SpecialsInterface.tsx";
import {devtools} from "zustand/middleware";
import {changeSpecialsStats} from "../api/PlayerApiService.tsx";
import {addPerk, changePerkRank, removePerk} from "../api/PerkApiService.tsx";
import useLoadoutStore from "./LoadoutSlice.tsx";

interface CharacterStore {
    changeSpecials: (specials: Specials) => Promise<void>;
    addPerk: (perk: Perk) => Promise<void>;
    removePerk: (perk: Perk) => Promise<void>;
    changePerkRank: (perk: Perk, rank: number) => Promise<void>;
}

const useCharacterStore = create<CharacterStore>()(
    devtools(() => ({
        changeSpecials: async (specials: Specials) => {
            const { activeLoadout } = useLoadoutStore.getState();

            if (activeLoadout && specials) {
                try {
                    await changeSpecialsStats(activeLoadout.loadoutID, specials);
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
                    console.error('Error updating specials:', error);
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
                    console.error('Error updating specials:', error);
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
    }), {name: "CharacterStore"})
);

export default useCharacterStore;