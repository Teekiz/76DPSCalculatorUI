import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
import {Loadout} from "../interfaces/LoadoutInterface.tsx";
import {getAllLoadouts, getLoadout} from "../api/LoadoutApiService.tsx";
import {WeaponBasic} from "../interfaces/WeaponInterfaces.tsx";
import {getCurrentWeapon, setWeapon} from "../api/WeaponApiService.tsx";

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
                        } catch (error) {
                            console.error("Failed to fetch loadouts:", error);
                        }
                    },
                    addLoadout: async () => {
                        const { loadouts } = get();
                        const length = loadouts.length;

                        try {
                            const newLoadout = await getLoadout(length + 1); // Fetch the new loadout using the next ID

                            if (newLoadout) {
                                console.debug("Add loadout called", newLoadout); // Log the new loadout for debugging
                                set((state) => ({
                                    loadouts: [...state.loadouts, newLoadout], // Update the state with the new loadout
                                }));
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
                    changeActiveLoadout: (index: number) => {
                        const { loadouts, activeLoadout } = get();

                        if (index >= 0 && index < loadouts.length) {
                            if (activeLoadout) {
                                set((state) => ({
                                    loadouts: state.loadouts.map(loadout =>
                                        loadout.loadoutID === activeLoadout.loadoutID
                                            ? activeLoadout
                                            : loadout
                                    ),
                                    activeLoadout: state.loadouts[index]
                                }));
                            } else {
                                set(() => ({
                                    activeLoadout: loadouts[index],
                                }));
                            }
                        } else {
                            console.warn("Invalid index for loadouts:", index);
                        }
                    }
                },
                weaponActions: {
                    changeWeapon: async (weapon: WeaponBasic) => {
                        const { activeLoadout } = get();
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
                }
            },
        }),
        { name: "LoadoutStore" }
    )
);

useLoadoutStore.getState().actions.loadoutActions.fetchLoadouts();

export default useLoadoutStore;



