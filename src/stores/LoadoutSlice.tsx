import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
import {Loadout} from "../interfaces/LoadoutInterface.tsx";
import {fetchAllLoadouts, fetchLoadout} from "../api/LoadoutApiService.tsx";

interface LoadoutsStoreState {
    loadouts: Loadout[];
    activeLoadout?: Loadout;
}

interface LoadoutsStoreActions {
    fetchLoadouts: () => Promise<void>;
    addLoadout: () => Promise<void>;
    removeLoadout: (id: number) => Promise<void>;
    changeActiveLoadout: (index: number) => void;
}

const useLoadoutStore = create<LoadoutsStoreState & LoadoutsStoreActions>()(
    devtools(
        (set, get) => ({
            loadouts: [] as Loadout[],
            activeLoadout: undefined,
                    fetchLoadouts: async () => {
                        try {
                            const loadouts = await fetchAllLoadouts();
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
                            const newLoadout = await fetchLoadout(length+ 1); // Fetch the new loadout using the next ID

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

        }),
        { name: "LoadoutStore" }
    )
);

useLoadoutStore.getState().fetchLoadouts();

export default useLoadoutStore;



