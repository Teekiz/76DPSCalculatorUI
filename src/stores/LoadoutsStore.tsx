import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
import {Loadout} from "../interfaces/LoadoutInterface.tsx";
import {getAllLoadouts, getLoadout} from "../api/LoadoutApiService.tsx";
import {WeaponBasic} from "../interfaces/WeaponInterfaces.tsx";
import {getCurrentWeapon, setWeapon} from "../api/WeaponApiService.tsx";
import {Specials} from "../interfaces/SpecialsInterface.tsx";
import {changeSpecialsStats} from "../api/PlayerApiService.tsx";
import {Perk} from "../interfaces/PerkInterface.tsx";
import {addPerk, removePerk} from "../api/PerkApiService.tsx";

interface LoadoutsStoreState {
    loadouts: Loadout[];
    activeLoadout?: Loadout;
}

interface LoadoutsStoreActions {
    actions: {
        loadoutActions: {
            fetchLoadouts: () => Promise<void>;
            addLoadout: () => Promise<void>;
            removeLoadout: (id: number) => Promise<void>;
            changeActiveLoadout: (index: number) => void;
        },
        weaponActions: {
            changeWeapon: (weapon: WeaponBasic) => Promise<void>;
        }
        characterActions: {
            changeSpecials: (specials: Specials) => Promise<void>;
            addPerk: (perk: Perk) => Promise<void>;
            removePerk: (perk: Perk) => Promise<void>;
        }
    }
}

//Todo - split up possibly
const useLoadoutStore = create<LoadoutsStoreState & LoadoutsStoreActions>()(
    devtools(
        (set, get) => ({
            loadouts: [] as Loadout[],
            activeLoadout: undefined,
            actions: {
                loadoutActions: {
                    fetchLoadouts: async () => {
                        try {
                            const loadouts = await getAllLoadouts();
                            set(() => ({ loadouts }));

                            if (loadouts.length > 0){
                                set(() => ({activeLoadout: loadouts[0]}))
                            }

                        } catch (error) {
                            console.error("Failed to fetch loadouts:", error);
                        }
                    },
                    addLoadout: async () => {
                        const { loadouts } = get();
                        const length = loadouts.length;
                        try {
                            const newLoadout = await getLoadout(length+ 1); // Fetch the new loadout using the next ID

                            if (newLoadout) {
                                console.debug("Add loadout called", newLoadout); // Log the new loadout for debugging
                                set((state) => ({
                                    loadouts: [...state.loadouts, newLoadout], // Update the state with the new loadout
                                }));
                            //if this is the first loadout created, set the active loadout to 0
                            if (length === 0){set(() => ({
                                activeLoadout: newLoadout}))}
                            } else {
                                console.warn("No loadout returned from API for ID:", length + 1); // Handle case where no loadout is returned
                            }
                        } catch (error) {
                            console.error("Error adding loadout:", error); // Handle any errors that occurred during the fetch
                        }
                    },
                    removeLoadout: async (id: number) => {
                        set((state: { loadouts: Loadout[]; }) => ({
                            loadouts: state.loadouts.filter(loadout => loadout.loadoutID != id)
                        }))
                    },
                    changeActiveLoadout: (loadoutID: number) => {
                        const { loadouts, activeLoadout } = get();

                        // Find the new active loadout by loadoutID
                        const newActiveLoadout = loadouts.find(loadout => loadout.loadoutID === loadoutID);

                        if (newActiveLoadout) {
                            if (activeLoadout) {
                                set((state) => ({
                                    // Update the loadouts array with any changes to the previous active loadout
                                    loadouts: state.loadouts.map(loadout =>
                                        loadout.loadoutID === activeLoadout.loadoutID ? activeLoadout : loadout
                                    ),
                                    activeLoadout: newActiveLoadout // Set the new active loadout
                                }));
                            } else {
                                // If no active loadout currently, just set the new active loadout
                                set(() => ({
                                    activeLoadout: newActiveLoadout,
                                }));
                            }
                        } else {
                            console.warn("Invalid loadoutID:", loadoutID);
                        }
                    }
                },
                weaponActions: {
                    changeWeapon: async (weapon: WeaponBasic) => {
                        const { activeLoadout } = get();
                        console.debug("Change weapons called for: ", weapon);
                        if (activeLoadout) {
                            try {
                                await setWeapon(weapon, activeLoadout.loadoutID);
                                const updatedWeapon = await getCurrentWeapon(activeLoadout.loadoutID);
                                const updatedActiveLoadout = {
                                    ...activeLoadout,
                                    weapon: updatedWeapon,
                                };
                                set(() => ({activeLoadout: updatedActiveLoadout}))
                            } catch (error) {
                                console.error('Error updating weapon:', error);
                            }
                        }
                    },
                },
                characterActions: {
                    changeSpecials: async (specials: Specials) => {
                        const { activeLoadout } = get();
                        if (activeLoadout && specials) {
                            try {
                                await changeSpecialsStats(activeLoadout.loadoutID, specials);
                                const updatedActiveLoadout = {
                                    ...activeLoadout,
                                    player: {...activeLoadout.player, specials: specials}
                                };
                                set(() => ({activeLoadout: updatedActiveLoadout}))
                            } catch (error){
                                console.error('Error updating specials:', error);
                            }
                        }
                    },
                    addPerk: async (perkToAdd: Perk) => {
                        const { activeLoadout } = get();
                        if (activeLoadout && perkToAdd) {
                            try {
                                await addPerk(activeLoadout.loadoutID, perkToAdd);
                                const updatedActiveLoadout = {
                                    ...activeLoadout,
                                    perks: [...activeLoadout.perks, perkToAdd] // Adding the new perk to the existing perks array
                                };
                                set(() => ({activeLoadout: updatedActiveLoadout}))
                            } catch (error){
                                console.error('Error updating specials:', error);
                            }
                        }
                    },
                    removePerk: async (perkToRemove: Perk) => {
                        const { activeLoadout } = get();
                        if (activeLoadout && perkToRemove) {
                            try {

                                await removePerk(activeLoadout.loadoutID, perkToRemove);
                                const updatedPerks = activeLoadout.perks.filter(perk => perk.name !== perkToRemove.name);
                                const updatedActiveLoadout = {
                                    ...activeLoadout,
                                    perks: updatedPerks
                                };
                                set(() => ({ activeLoadout: updatedActiveLoadout }));
                            } catch (error){
                                console.error('Error updating specials:', error);
                            }
                        }
                    },
                },
            },
        }),
        { name: "LoadoutStore" }
    )
);

useLoadoutStore.getState().actions.loadoutActions.fetchLoadouts();

export default useLoadoutStore;



