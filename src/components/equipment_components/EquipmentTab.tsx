import {WeaponBasic} from "../../interfaces/WeaponInterfaces.tsx";
import WeaponSearchComponent from './weapon_components/WeaponSearchComponents.tsx'
import WeaponStatsTable from './weapon_components/WeaponStatsTable.tsx';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useLoadoutStore from "../../stores/LoadoutsStore.tsx";


export default function EquipmentTab()
{
    const activeLoadout = useLoadoutStore(state => state.activeLoadout);
    const currentWeapon = useLoadoutStore(state => state.activeLoadout?.weapon);
    const changeWeapon = useLoadoutStore(state => state.actions.weaponActions.changeWeapon);

    // When the user changes the weapon, set the weapon and then update it
    const handleWeaponSelection = async (weapon: WeaponBasic) => {
        if (activeLoadout != null){
            await changeWeapon(weapon);
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