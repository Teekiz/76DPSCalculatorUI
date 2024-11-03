import {WeaponBasic} from "../../interfaces/WeaponInterfaces.tsx";
import WeaponSearchComponent from './weapon_components/WeaponSearchComponents.tsx'
import WeaponStatsTable from './weapon_components/WeaponStatsTable.tsx';

import Grid2 from '@mui/material/Grid2';
import useLoadoutStore from "../../stores/LoadoutSlice.tsx";
import useWeaponStore from "../../stores/WeaponSlice.tsx";


export default function EquipmentTab()
{
    const activeLoadout = useLoadoutStore(state => state.activeLoadout);
    const currentWeapon = useLoadoutStore(state => state.activeLoadout?.weapon);
    const changeWeapon = useWeaponStore(state => state.changeWeapon);

    // When the user changes the weapon, set the weapon and then update it
    const handleWeaponSelection = async (weapon: WeaponBasic) => {
        if (activeLoadout != null){
            await changeWeapon(weapon);
        }
    };

    return (
        <>
            <Grid2 container spacing={2}>
                <Grid2>  {/* xs={12} md={6}*/}
                    <WeaponSearchComponent weapon={currentWeapon} onWeaponSelect={handleWeaponSelection} />
                </Grid2>
                <Grid2>  {/* xs={12} md={6}*/}
                    <WeaponStatsTable weapon={currentWeapon} />
                </Grid2>
            </Grid2>
        </>
    );
}