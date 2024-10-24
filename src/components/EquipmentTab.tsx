import { useState, useContext, useEffect } from 'react';
import { RangedWeaponDetails, MeleeWeaponDetails, WeaponBasic } from "../interfaces/WeaponInterfaces";
import { LoadoutIDContext, LoadoutsContext } from '../contexts/LoadoutContext';
import { getCurrentWeapon, setWeapon } from '../api/WeaponApiService';
import WeaponSearchComponent from './weapon_components/WeaponSearchComponents'
import WeaponStatsTable from './weapon_components/WeaponStatsTable';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function EquipmentTab()
{
    const [currentWeapon, setCurrentWeapon] = useState<RangedWeaponDetails | MeleeWeaponDetails | null>(null);
    const { activeLoadoutTab } = useContext(LoadoutIDContext); // Example context usage
    const { loadouts } = useContext(LoadoutsContext);

    // When the user changes the weapon, set the weapon and then update it
    const handleWeaponSelection = async (weapon: WeaponBasic) => {
        await setWeapon(weapon.weaponID, weapon.weaponName, activeLoadoutTab);
        const updatedWeapon = await getCurrentWeapon(activeLoadoutTab);
        setCurrentWeapon(updatedWeapon);
    };

    // Fetch the current weapon when the component mounts or when activeLoadoutTab changes
    useEffect(() => {
        const fetchWeapon = async () => {
            const weapon = await getCurrentWeapon(activeLoadoutTab); // Fetch the weapon
            setCurrentWeapon(weapon); // Update state with fetched weapon
        };

        fetchWeapon();
    }, [activeLoadoutTab]);

    return (
        <>
            <Row>
                <Col><WeaponSearchComponent weapon={currentWeapon} onWeaponSelect={handleWeaponSelection}/></Col>            
                <Col><WeaponStatsTable weapon={currentWeapon}/></Col>
            </Row>
        </>
    );
}