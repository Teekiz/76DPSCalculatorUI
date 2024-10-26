import {WeaponBasic} from "../interfaces/WeaponInterfaces";
import {getCurrentWeapon, setWeapon} from '../api/WeaponApiService';
import WeaponSearchComponent from './weapon_components/WeaponSearchComponents'
import WeaponStatsTable from './weapon_components/WeaponStatsTable';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useLoadoutStore from "../stores/LoadoutsStore.tsx";


export default function EquipmentTab()
{
    const activeLoadout = useLoadoutStore(state => state.activeLoadout);
    const currentWeapon = useLoadoutStore(state => state.activeLoadout?.weapon);

    console.debug(activeLoadout);
    console.debug(currentWeapon);

    // When the user changes the weapon, set the weapon and then update it
    const handleWeaponSelection = async (weapon: WeaponBasic) => {
        if (activeLoadout != null){
            await setWeapon(weapon, activeLoadout.loadoutID);
            activeLoadout.weapon = await getCurrentWeapon(activeLoadout.loadoutID);
        }
    };

    return (
        <>
            <Row>
                <Col><WeaponSearchComponent weapon={currentWeapon} onWeaponSelect={handleWeaponSelection}/></Col>
                <Col><WeaponStatsTable weapon={currentWeapon}/></Col>
            </Row>
        </>
    );
}