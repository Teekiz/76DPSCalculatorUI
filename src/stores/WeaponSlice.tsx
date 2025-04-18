import {WeaponBasic} from "../interfaces/WeaponInterfaces";
import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {getCurrentWeapon, setWeapon} from "../api/WeaponApiService";
import useLoadoutStore from "./LoadoutSlice";

interface WeaponStore {
    changeWeapon: (weapon: WeaponBasic) => Promise<void>;
}

const useWeaponStore = create<WeaponStore>()(
    devtools(() => ({
        changeWeapon: async (weapon: WeaponBasic) => {
            const { activeLoadout } = useLoadoutStore.getState();
            if (activeLoadout) {
                try {
                    await setWeapon(weapon, activeLoadout.loadoutID);
                    const updatedWeapon = await getCurrentWeapon(activeLoadout.loadoutID);
                    useLoadoutStore.setState((state) => ({
                        ...state,
                        activeLoadout: {
                            ...activeLoadout,
                            weapon: updatedWeapon,
                        }
                    }));
                } catch (error) {
                    console.error('Error updating weapon:', error);
                }
            }
        },
    }), { name: "WeaponStore" })
);

export default useWeaponStore;

