import {Consumable} from "../interfaces/ConsumableInterface.tsx";
import {create} from "zustand/index";
import {devtools} from "zustand/middleware";
import useLoadoutStore from "./LoadoutSlice.tsx";
import {addConsumable, removeConsumable} from "../api/ConsumableApiService.tsx";

interface InventoryStore {
    addConsumable: (consumable: Consumable) => Promise<void>;
    removeConsumable: (consumable: Consumable) => Promise<void>;
}

const useInventoryStore = create<InventoryStore>()(
    devtools(() => ({
        addConsumable: async (consumableToAdd: Consumable) => {
            const { activeLoadout } = useLoadoutStore.getState();
            if (activeLoadout && consumableToAdd) {
                try {
                    await addConsumable(activeLoadout.loadoutID, consumableToAdd);
                    useLoadoutStore.setState((state) => ({
                        ...state,
                        activeLoadout: {
                            ...activeLoadout,
                            consumables: [...activeLoadout.consumables, consumableToAdd]
                        }
                    }));
                } catch (error) {
                    console.error('Error adding consumable:', error);
                }
            }
        },
        removeConsumable: async (consumableToRemove: Consumable) => {
            const { activeLoadout } = useLoadoutStore.getState();
            if (activeLoadout && consumableToRemove) {
                try {
                    await removeConsumable(activeLoadout.loadoutID, consumableToRemove);
                    useLoadoutStore.setState((state) => ({
                        ...state,
                        activeLoadout: {
                            ...activeLoadout,
                            consumables: activeLoadout.consumables.filter(consumable => consumable.name !== consumableToRemove.name)
                        }
                    }));
                } catch (error) {
                    console.error('Error removing consumable:', error);
                }
            }
        },
    }), { name: "inventoryStore" }),
);

export default useInventoryStore;